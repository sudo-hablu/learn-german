import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { theme as lightTheme } from '@/constants/theme';

// Create a dark theme by modifying specific colors
const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#58CC02',
    secondary: '#1CB0F6',
    accent: '#A560E8',
    success: '#78C800',
    warning: '#FFC800',
    error: '#FF4B4B',
    gray: {
      100: '#171717',
      200: '#262626',
      300: '#404040',
      400: '#525252',
      500: '#737373',
      600: '#A3A3A3',
      700: '#D4D4D4',
      800: '#E5E5E5',
      900: '#F7F7F7',
    },
    white: '#171717',
    black: '#FFFFFF',
  },
};

type Theme = typeof lightTheme;
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDark(!isDark);

  const value = {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};