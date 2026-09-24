/**
 * Form system design tokens.
 * Derived from the dashboard-bootstrap-form-system-spec.md reference image.
 * These extend (not replace) the main design system tokens.
 */

export const formTokens = {
  colors: {
    pageBackground: '#F2F2F7',
    surface: '#FFFFFF',

    textPrimary: '#111111',
    textSecondary: '#66666F',
    textMuted: '#A2A2AA',
    placeholder: '#A6A6AD',

    border: '#DDDEE3',
    borderStrong: '#C9CAD0',

    primary: '#5425E5',
    primaryHover: '#461CCB',
    primarySoft: '#EEE9FF',

    complete: '#F6E65A',
    completeText: '#111111',

    disabled: '#BABBC1',
    error: '#D92D20',
  },

  radius: {
    none: 0,
    small: 2,
    medium: 3,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    section: 40,
  },

  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',

    pageTitle: { size: 22, weight: 700, lineHeight: 1.35 },
    cardTitle: { size: 17, weight: 600, lineHeight: 1.35 },
    inputLabel: { size: 15, weight: 600, lineHeight: 1.4 },
    inputText: { size: 15, weight: 400, lineHeight: 1.4 },
    stepLabel: { size: 13, weight: 600, lineHeight: 1.4 },
    description: { size: 13, weight: 400, lineHeight: 1.4 },
    smallMeta: { size: 12, weight: 500, lineHeight: 1.4 },
    sectionLabel: { size: 11, weight: 600, lineHeight: 1.4, letterSpacing: '0.1em', textTransform: 'uppercase' as const },
  },

  input: {
    height: 48,
    paddingX: 16,
    borderWidth: 1,
  },

  stepper: {
    markerSize: 24,
    connectorWidth: 64,
    connectorHeight: 1,
  },

  card: {
    minHeight: 140,
    padding: 24,
    radioSize: 20,
  },

  upload: {
    height: 200,
    iconSize: 36,
  },

  shell: {
    maxWidth: 720,
    padding: {
      desktop: 40,
      tablet: 30,
      mobile: 20,
    },
  },
} as const;
