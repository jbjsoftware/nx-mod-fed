import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import AboutPage from '../pages/about/about';
import SettingsPage from '../pages/settings/settings';
import { loadRemote } from '@module-federation/enhanced/runtime';

const Dashboard = React.lazy(() => loadRemote('dashboard/Module') as any);
const Products = React.lazy(() => loadRemote('products/Module') as any);

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
              element: <Dashboard />,
            },
            {
              path: '/about',
              element: <AboutPage />,
            },
            {
              path: '/settings',
              element: <SettingsPage />,
            },
            {
              path: '/products',
              element: <Products />,
            },
          ],
        },
      ])}
    />
  );
}
