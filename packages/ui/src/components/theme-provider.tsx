import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeConfig = {
  mode: Theme;
  radius: string;
  primaryColor: string;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  radius: string;
  primaryColor: string;
  setTheme: (theme: Theme) => void;
  setRadius: (radius: string) => void;
  setPrimaryColor: (color: string) => void;
  resetToDefaults: () => void;
};

const defaultConfig: ThemeConfig = {
  mode: 'system',
  radius: '0.625rem',
  primaryColor: 'slate',
};

const primaryColors = {
  slate: {
    light: 'oklch(0.205 0 0)',
    dark: 'oklch(0.922 0 0)',
  },
  blue: {
    light: 'oklch(0.454 0.214 264.052)',
    dark: 'oklch(0.583 0.225 264.376)',
  },
  green: {
    light: 'oklch(0.434 0.161 155.233)',
    dark: 'oklch(0.565 0.174 155.233)',
  },
  red: {
    light: 'oklch(0.577 0.245 27.325)',
    dark: 'oklch(0.704 0.191 22.216)',
  },
  orange: {
    light: 'oklch(0.645 0.246 16.439)',
    dark: 'oklch(0.769 0.188 70.08)',
  },
  purple: {
    light: 'oklch(0.488 0.243 264.376)',
    dark: 'oklch(0.627 0.265 303.9)',
  },
};

const initialState: ThemeProviderState = {
  theme: 'system',
  radius: '0.625rem',
  primaryColor: 'slate',
  setTheme: () => null,
  setRadius: () => null,
  setPrimaryColor: () => null,
  resetToDefaults: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...defaultConfig, ...parsed };
      } catch {
        return {
          ...defaultConfig,
          mode:
            (localStorage.getItem('vite-ui-theme') as Theme) || defaultTheme,
        };
      }
    }
    return { ...defaultConfig, mode: defaultTheme };
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Apply theme mode
    root.classList.remove('light', 'dark');
    if (config.mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(config.mode);
    }

    // Apply radius
    root.style.setProperty('--radius', config.radius);

    // Apply primary color
    const currentTheme =
      config.mode === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : config.mode;

    const colorConfig =
      primaryColors[config.primaryColor as keyof typeof primaryColors];
    if (colorConfig) {
      root.style.setProperty('--primary', colorConfig[currentTheme]);
    }
  }, [config]);

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem(storageKey, JSON.stringify(newConfig));
  };

  const value = {
    theme: config.mode,
    radius: config.radius,
    primaryColor: config.primaryColor,
    setTheme: (theme: Theme) => updateConfig({ mode: theme }),
    setRadius: (radius: string) => updateConfig({ radius }),
    setPrimaryColor: (primaryColor: string) => updateConfig({ primaryColor }),
    resetToDefaults: () => {
      setConfig(defaultConfig);
      localStorage.setItem(storageKey, JSON.stringify(defaultConfig));
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export { primaryColors };
