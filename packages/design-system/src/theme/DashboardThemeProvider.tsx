import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { dashboardTheme } from '../theme';
import { ThemeColorsProvider } from '../form/ThemeContext';
import type { ThemeColors } from '../form/presets';

export interface DashboardThemeProviderProps {
  children: React.ReactNode;
  themeColors?: ThemeColors;
}

export function DashboardThemeProvider({ children, themeColors }: DashboardThemeProviderProps) {
  const theme = useMemo(() => {
    if (!themeColors) return dashboardTheme;

    return createTheme(dashboardTheme, {
      palette: {
        primary: {
          main: themeColors.primary,
          dark: themeColors.primaryHover,
          light: themeColors.primarySoft,
        },
      },
    });
  }, [themeColors]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeColorsProvider themeColors={themeColors}>
        {children}
      </ThemeColorsProvider>
    </ThemeProvider>
  );
}
