import React from 'react';
import { Outlet } from 'react-router';

import '../styles.css';

import AppHeader from '../components/layout/app-header';

import { AppSidebar } from '../components/layout/app-sidebar';
import { SidebarInset } from '@repo/ui';

const RootLayout = () => {
  return (
    <div className="flex flex-row h-screen w-full ">
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col p-4 pt-0 w-full">
            <React.Suspense fallback={null}>
              <Outlet />
            </React.Suspense>
          </div>
        </SidebarInset>
      </div>
    </div>
  );
};

export default RootLayout;
