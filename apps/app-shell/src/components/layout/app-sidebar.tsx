'use client';

import * as React from 'react';
import * as Lucide from 'lucide-react';

import { NavPlatform } from '../nav/nav-platform';
import { NavSecondary } from '../nav/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@repo/ui';
import { Link } from 'react-router';
import { usePluginRegistry } from '../../hooks/use-plugin-registry';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Lucide.SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Home',
          url: '/dashboard',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Lucide.Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: Lucide.BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Lucide.Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Plugin Manager',
      url: '/plugins',
      icon: Lucide.Package,
    },
    {
      title: 'About',
      url: '/about',
      icon: Lucide.InfoIcon,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Lucide.Settings2,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Lucide.Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: Lucide.PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Lucide.Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar();

  const { enabledPlugins } = usePluginRegistry();

  console.log(enabledPlugins);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Lucide.Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        {enabledPlugins.length > 0 && (
          <NavPlatform
            projects={enabledPlugins.map((plugin) => ({
              name: plugin.name,
              url: plugin.routes?.[0]?.path || '',
              icon: plugin.icon
                ? React.createElement(
                    (Lucide as any)[plugin.icon] || Lucide.MinusIcon
                  )
                : React.createElement(Lucide.MinusIcon),
            }))}
          />
        )}
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => toggleSidebar()}>
              {state === 'collapsed' ? (
                <Lucide.ChevronRightIcon />
              ) : (
                <Lucide.ChevronLeftIcon />
              )}
              <span className="sr-only">Toggle sidebar</span>
              <span>{state === 'collapsed' ? 'Open' : 'Close'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
