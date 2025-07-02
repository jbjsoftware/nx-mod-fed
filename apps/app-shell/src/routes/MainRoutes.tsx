import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from 'react-router-dom';
import RootLayout from './RootLayout';
import AboutPage from '../pages/about/about';
import SettingsPage from '../pages/settings/containers/settings';
import PluginManager from '../pages/plugin-manager/containers/plugin-manager';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { usePluginRegistry } from '../hooks/use-plugin-registry';

// const Dashboard = React.lazy(async () => {
//   const module = (await loadRemote('dashboard/Module')) as any;
//   return { default: module.default || module };
// });

// const Products = React.lazy(async () => {
//   const module = (await loadRemote('products/Module')) as any;
//   return { default: module.default || module };
// });

// Cache for plugin components to prevent recreation on every render
const pluginComponentCache = new Map<string, React.LazyExoticComponent<any>>();

const DynamicPluginRoute: React.FC<{ plugin: any }> = ({ plugin }) => {
  const pluginKey = `${plugin.moduleName}/${plugin.exposedModule}`;

  // Get or create cached plugin component
  let PluginComponent = pluginComponentCache.get(pluginKey);

  if (!PluginComponent) {
    PluginComponent = React.lazy(async () => {
      try {
        console.log(`Loading plugin: ${plugin.name} (${pluginKey})`);
        const module = (await loadRemote(pluginKey)) as any;
        return { default: module.default || module };
      } catch (error) {
        console.error(`Failed to load plugin ${plugin.name}:`, error);
        return {
          default: () => (
            <div className="error-container">
              <h3>Plugin Load Error</h3>
              <p>Failed to load plugin: {plugin.name}</p>
              <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
          ),
        };
      }
    });

    pluginComponentCache.set(pluginKey, PluginComponent);
  }

  return (
    <React.Suspense
      fallback={
        <div className="plugin-loading">
          <p>Loading {plugin.name}...</p>
        </div>
      }
    >
      <PluginComponent key={pluginKey} />
    </React.Suspense>
  );
};

const PluginCatchAll: React.FC = () => {
  const { enabledPlugins } = usePluginRegistry();
  const location = useLocation();
  const currentPath = location.pathname;

  // Find matching plugin route
  for (const plugin of enabledPlugins) {
    if (plugin.routes) {
      for (const route of plugin.routes) {
        if (route.path === currentPath) {
          return <DynamicPluginRoute plugin={plugin} />;
        }
      }
    }
  }

  // No plugin route found
  return (
    <div className="error-container">
      <h3>Page Not Found</h3>
      <p>The requested page could not be found.</p>
    </div>
  );
};

export default function MainRoutes() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <RootLayout />,
          children: [
            {
              path: '/',
              element: <div>Home</div>,
            },
            // {
            //   path: '/',
            //   element: <Dashboard />,
            // },
            {
              path: '/about',
              element: <AboutPage />,
            },
            {
              path: '/settings',
              element: <SettingsPage />,
            },
            {
              path: '/plugins',
              element: <PluginManager />,
            },
            // {
            //   path: '/products',
            //   element: <Products />,
            // },
            {
              path: '*',
              element: <PluginCatchAll />,
            },
          ],
        },
      ])}
    />
  );
}
