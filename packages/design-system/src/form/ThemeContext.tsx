import React, { createContext, useContext } from 'react';
import type { ThemeColors } from './presets';
import { resolveThemeColors } from './presets';

const ThemeColorsContext = createContext<ThemeColors>(resolveThemeColors());

export function ThemeColorsProvider({
  themeColors,
  children,
}: {
  themeColors?: ThemeColors;
  children: React.ReactNode;
}) {
  const value = themeColors ?? resolveThemeColors();
  return (
    <ThemeColorsContext.Provider value={value}>
      {children}
    </ThemeColorsContext.Provider>
  );
}

export function useThemeColors(): ThemeColors {
  return useContext(ThemeColorsContext);
}
