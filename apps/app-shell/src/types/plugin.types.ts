export interface PluginConfig {
  id: string;
  name: string;
  description?: string;
  version: string;
  url: string;
  moduleName: string;
  exposedModule: string;
  routes?: PluginRoute[];
  enabled: boolean;
  manifestUrl?: string;
  icon?: string;
}

export interface PluginRoute {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

export interface PluginRegistryState {
  plugins: Record<string, PluginConfig>;
  loading: boolean;
  error?: string;
}

export interface PluginManifest {
  name: string;
  version: string;
  description?: string;
  routes?: PluginRoute[];
  dependencies?: string[];
}
