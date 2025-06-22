import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles.css';

const RootLayout = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col gap-4 border-r border-gray-200 p-2 w-32">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="flex flex-1 flex-col bg-red">
        <header className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">My App</h1>
        </header>

        <main className="flex flex-1">
          <React.Suspense fallback={null}>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
