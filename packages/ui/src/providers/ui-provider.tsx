import { ReactNode } from 'react';

import { ThemeProvider } from '../components/theme-provider';

import '../styles/index.css';

interface UiProviderProps {
  children: ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
}

export const UiProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: UiProviderProps) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
};
