/**
 * Theme color presets for dashboard-bootstrap.
 * Each preset defines the brand colors that flow through the entire design system.
 */

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primarySoft: string;
  complete: string;
  completeText: string;
}

const purple: ThemeColors = {
  primary: '#5425E5',
  primaryHover: '#461CCB',
  primarySoft: '#EEE9FF',
  complete: '#F6E65A',
  completeText: '#111111',
};

const orange: ThemeColors = {
  primary: '#E85D04',
  primaryHover: '#CC5203',
  primarySoft: '#FFF3E6',
  complete: '#F6E65A',
  completeText: '#111111',
};

const blue: ThemeColors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primarySoft: '#EFF6FF',
  complete: '#F6E65A',
  completeText: '#111111',
};

const green: ThemeColors = {
  primary: '#059669',
  primaryHover: '#047857',
  primarySoft: '#ECFDF5',
  complete: '#F6E65A',
  completeText: '#111111',
};

const red: ThemeColors = {
  primary: '#DC2626',
  primaryHover: '#B91C1C',
  primarySoft: '#FEF2F2',
  complete: '#F6E65A',
  completeText: '#111111',
};

const teal: ThemeColors = {
  primary: '#0D9488',
  primaryHover: '#0F766E',
  primarySoft: '#F0FDFA',
  complete: '#F6E65A',
  completeText: '#111111',
};

const pink: ThemeColors = {
  primary: '#DB2777',
  primaryHover: '#BE185D',
  primarySoft: '#FDF2F8',
  complete: '#F6E65A',
  completeText: '#111111',
};

export const themePresets: Record<string, ThemeColors> = {
  purple,
  orange,
  blue,
  green,
  red,
  teal,
  pink,
};

/**
 * Resolve a theme config into final colors.
 * Accepts a preset name string, an object with preset + overrides, or undefined (defaults to purple).
 */
export function resolveThemeColors(
  config?: string | { preset: string; colors?: Partial<ThemeColors> }
): ThemeColors {
  if (!config) return purple;

  const presetName = typeof config === 'string' ? config : config.preset;
  const base = themePresets[presetName] ?? purple;

  if (typeof config === 'object' && config.colors) {
    return { ...base, ...config.colors };
  }

  return base;
}
