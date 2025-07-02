import { SidebarProvider, ThemeProvider } from '@repo/ui';
import Cookies from 'js-cookie';

export const RootProviders = ({ children }: { children: React.ReactNode }) => {
  const defaultOpen = Cookies.get('sidebar_state') === 'true';

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
    </ThemeProvider>
  );
};
