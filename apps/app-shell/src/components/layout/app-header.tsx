import { SidebarTrigger, useSidebar } from '@repo/ui';

function AppHeader() {
  const { isMobile } = useSidebar();
  return isMobile ? (
    <header className="flex justify-between items-center p-2 shadow w-full">
      <SidebarTrigger />
      <h1 className="text-xl font-bold">My App</h1>
    </header>
  ) : (
    <header className="p-2 w-full"></header>
  );
}

export default AppHeader;
