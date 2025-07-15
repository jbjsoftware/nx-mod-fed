import React from 'react';
import { pluginRegistry } from './plugin-registry.service';
import { LayoutDashboard, Network } from 'lucide-react';

/**
 * Initialize the plugin registry with existing remotes
 */
export async function initializePluginRegistry() {
  try {
    // Register dashboard as a plugin
    await pluginRegistry.registerPlugin({
      name: 'Dashboard',
      description: 'Main dashboard module',
      version: '1.0.0',
      url: 'http://localhost:4201/remoteEntry.js',
      moduleName: 'dashboard',
      exposedModule: 'Module',
      enabled: true,
      routes: [
        {
          path: '/dashboard',
          label: 'Dashboard',
          icon: React.createElement(LayoutDashboard, { size: 16 }),
        },
      ],
    });

    // Register connections as a plugin
    await pluginRegistry.registerPlugin({
      name: 'Connections',
      description: 'Network connections management module',
      version: '1.0.0',
      url: 'http://localhost:4203/remoteEntry.js',
      moduleName: 'connections',
      exposedModule: 'Module',
      enabled: true,
      routes: [
        {
          path: '/connections',
          label: 'Connections',
          icon: React.createElement(Network, { size: 16 }),
        },
      ],
    });

    console.log('Plugin registry initialized successfully');
  } catch (error) {
    console.error('Failed to initialize plugin registry:', error);
  }
}

// Auto-initialization disabled for testing
// Uncomment to enable auto-initialization of existing remotes
if (typeof window !== 'undefined') {
  const hasInitialized = localStorage.getItem('plugin-registry-initialized');
  if (!hasInitialized) {
    initializePluginRegistry().then(() => {
      localStorage.setItem('plugin-registry-initialized', 'true');
    });
  }
}
