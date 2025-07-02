import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { PluginConfig, PluginRegistryState } from '../types/plugin.types';

class PluginRegistryService {
  private state: PluginRegistryState = {
    plugins: {},
    loading: false,
    error: undefined,
  };

  private listeners: Set<(state: PluginRegistryState) => void> = new Set();

  constructor() {
    this.loadInitialPlugins();
  }

  /**
   * Subscribe to plugin registry state changes
   */
  subscribe(listener: (state: PluginRegistryState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current plugin registry state
   */
  getState(): PluginRegistryState {
    return { ...this.state };
  }

  /**
   * Get all registered plugins
   */
  getPlugins(): Record<string, PluginConfig> {
    return { ...this.state.plugins };
  }

  /**
   * Get enabled plugins only
   */
  getEnabledPlugins(): PluginConfig[] {
    return Object.values(this.state.plugins).filter((plugin) => plugin.enabled);
  }

  /**
   * Register a new plugin
   */
  async registerPlugin(pluginConfig: Omit<PluginConfig, 'id'>): Promise<void> {
    const id = this.generatePluginId(pluginConfig.name);

    try {
      this.updateState({ loading: true, error: undefined });

      // Register the remote with module federation
      await registerRemotes([
        {
          name: pluginConfig.moduleName,
          entry: pluginConfig.url,
        },
      ]);

      // Test loading the plugin to validate it works
      await this.validatePlugin(pluginConfig);

      const fullConfig: PluginConfig = {
        ...pluginConfig,
        id,
      };

      this.updateState({
        plugins: {
          ...this.state.plugins,
          [id]: fullConfig,
        },
        loading: false,
      });

      this.persistPlugins();
    } catch (error) {
      this.updateState({
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to register plugin',
      });
      throw error;
    }
  }

  /**
   * Update an existing plugin
   */
  async updatePlugin(
    pluginId: string,
    updatedConfig: Omit<PluginConfig, 'id'>
  ): Promise<void> {
    const existingPlugin = this.state.plugins[pluginId];
    if (!existingPlugin) {
      throw new Error(`Plugin with ID ${pluginId} not found`);
    }

    try {
      this.updateState({ loading: true, error: undefined });

      // If URL or module name changed, we need to re-register the remote
      if (
        updatedConfig.url !== existingPlugin.url ||
        updatedConfig.moduleName !== existingPlugin.moduleName
      ) {
        await registerRemotes([
          {
            name: updatedConfig.moduleName,
            entry: updatedConfig.url,
          },
        ]);

        // Test loading the updated plugin to validate it works
        await this.validatePlugin(updatedConfig);
      }

      const fullConfig: PluginConfig = {
        ...updatedConfig,
        id: pluginId, // Keep the same ID
      };

      this.updateState({
        plugins: {
          ...this.state.plugins,
          [pluginId]: fullConfig,
        },
        loading: false,
      });

      this.persistPlugins();
    } catch (error) {
      this.updateState({
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to update plugin',
      });
      throw error;
    }
  }

  /**
   * Unregister a plugin
   */
  unregisterPlugin(pluginId: string): void {
    const { [pluginId]: removed, ...remainingPlugins } = this.state.plugins;

    this.updateState({
      plugins: remainingPlugins,
    });

    this.persistPlugins();
  }

  /**
   * Enable or disable a plugin
   */
  togglePlugin(pluginId: string, enabled: boolean): void {
    const plugin = this.state.plugins[pluginId];
    if (!plugin) return;

    this.updateState({
      plugins: {
        ...this.state.plugins,
        [pluginId]: {
          ...plugin,
          enabled,
        },
      },
    });

    this.persistPlugins();
  }

  /**
   * Load a plugin component dynamically
   */
  async loadPluginComponent(plugin: PluginConfig) {
    try {
      const module = (await loadRemote(
        `${plugin.moduleName}/${plugin.exposedModule}`
      )) as any;
      return module.default || module;
    } catch (error) {
      console.error(`Failed to load plugin ${plugin.name}:`, error);
      throw error;
    }
  }

  /**
   * Validate that a plugin can be loaded
   */
  private async validatePlugin(
    pluginConfig: Omit<PluginConfig, 'id'>
  ): Promise<void> {
    try {
      const module = (await loadRemote(
        `${pluginConfig.moduleName}/${pluginConfig.exposedModule}`
      )) as any;
      if (!module && !module.default) {
        throw new Error('Plugin does not export a valid component');
      }
    } catch (error) {
      throw new Error(
        `Plugin validation failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Load plugins from localStorage
   */
  private loadInitialPlugins(): void {
    try {
      const stored = localStorage.getItem('plugin-registry');
      if (stored) {
        const plugins = JSON.parse(stored);
        this.updateState({ plugins });
      }
    } catch (error) {
      console.error('Failed to load plugins from storage:', error);
    }
  }

  /**
   * Persist plugins to localStorage
   */
  private persistPlugins(): void {
    try {
      localStorage.setItem(
        'plugin-registry',
        JSON.stringify(this.state.plugins)
      );
    } catch (error) {
      console.error('Failed to persist plugins:', error);
    }
  }

  /**
   * Generate a unique plugin ID
   */
  private generatePluginId(name: string): string {
    const base = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let id = base;
    let counter = 1;

    while (this.state.plugins[id]) {
      id = `${base}-${counter}`;
      counter++;
    }

    return id;
  }

  /**
   * Update state and notify listeners
   */
  private updateState(updates: Partial<PluginRegistryState>): void {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const pluginRegistry = new PluginRegistryService();
