import { useState, useEffect, useCallback } from 'react';
import { pluginRegistry } from '../services/plugin-registry.service';
import { PluginConfig, PluginRegistryState } from '../types/plugin.types';

export function usePluginRegistry() {
  const [state, setState] = useState<PluginRegistryState>(
    pluginRegistry.getState()
  );

  useEffect(() => {
    return pluginRegistry.subscribe(setState);
  }, []);

  const registerPlugin = useCallback(
    async (plugin: Omit<PluginConfig, 'id'>) => {
      await pluginRegistry.registerPlugin(plugin);
    },
    []
  );

  const updatePlugin = useCallback(
    async (pluginId: string, plugin: Omit<PluginConfig, 'id'>) => {
      await pluginRegistry.updatePlugin(pluginId, plugin);
    },
    []
  );

  const unregisterPlugin = useCallback((pluginId: string) => {
    pluginRegistry.unregisterPlugin(pluginId);
  }, []);

  const togglePlugin = useCallback((pluginId: string, enabled: boolean) => {
    pluginRegistry.togglePlugin(pluginId, enabled);
  }, []);

  const loadPluginComponent = useCallback(async (plugin: PluginConfig) => {
    return await pluginRegistry.loadPluginComponent(plugin);
  }, []);

  return {
    ...state,
    registerPlugin,
    updatePlugin,
    unregisterPlugin,
    togglePlugin,
    loadPluginComponent,
    enabledPlugins: pluginRegistry.getEnabledPlugins(),
  };
}
