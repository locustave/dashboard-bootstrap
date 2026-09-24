/**
 * Design tokens — the single source of truth for all visual values.
 * Values here must match docs/DESIGN_SYSTEM.md exactly.
 */

// ---------------------------------------------------------------------------
// 4.1 Colors
// ---------------------------------------------------------------------------

const neutral = {
  50: '#F8F9FA',
  100: '#F1F3F5',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
} as const;

const background = {
  app: neutral[50],
  surface: '#FFFFFF',
  surfaceHover: neutral[100],
  surfaceActive: neutral[100],
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

const text = {
  primary: neutral[900],
  secondary: neutral[500],
  muted: neutral[400],
  inverse: '#FFFFFF',
} as const;

const action = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryMuted: '#EFF6FF',
  secondary: neutral[900],
  secondaryHover: neutral[800],
} as const;

const border = {
  default: neutral[200],
  strong: neutral[300],
  focus: action.primary,
} as const;

const status = {
  success: '#059669',
  successMuted: '#ECFDF5',
  warning: '#D97706',
  warningMuted: '#FFFBEB',
  error: '#DC2626',
  errorMuted: '#FEF2F2',
  info: '#2563EB',
  infoMuted: '#EFF6FF',
} as const;

const chart = {
  1: '#2563EB',
  2: '#7C3AED',
  3: '#059669',
  4: '#D97706',
  5: '#DC2626',
  6: '#6B7280',
} as const;

const colors = {
  neutral,
  background,
  text,
  action,
  border,
  status,
  chart,
} as const;

// ---------------------------------------------------------------------------
// 4.2 Spacing (base-4 scale)
// ---------------------------------------------------------------------------

const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

// ---------------------------------------------------------------------------
// 4.3 Radius
// ---------------------------------------------------------------------------

const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// 4.4 Borders
// ---------------------------------------------------------------------------

const borderWidth = {
  default: 1,
  strong: 2,
} as const;

const borderColor = {
  default: neutral[200],
  strong: neutral[300],
  focus: action.primary,
  error: status.error,
} as const;

const borders = {
  width: borderWidth,
  color: borderColor,
} as const;

// ---------------------------------------------------------------------------
// 4.5 Elevation
// ---------------------------------------------------------------------------

const elevation = {
  none: 'none',
  low: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
  medium: '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  high: '0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
} as const;

// ---------------------------------------------------------------------------
// 4.6 Layout
// ---------------------------------------------------------------------------

const layout = {
  sidebar: { width: 240, collapsedWidth: 64 },
  header: { height: 56 },
  page: { paddingX: 32, paddingTop: 24 },
  section: { gap: 24 },
  content: { maxWidth: 'none' as const },
  contextPanel: { width: 400 },
  drawer: { widthSm: 400, widthMd: 560, widthLg: 720 },
  dialog: { widthSm: 400, widthMd: 560, widthLg: 720 },
} as const;

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ---------------------------------------------------------------------------
// 5. Typography
// ---------------------------------------------------------------------------

const font = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
} as const;

const type = {
  pageTitle: { size: 24, weight: 600, lineHeight: 32, letterSpacing: '-0.01em' },
  sectionHeading: { size: 18, weight: 600, lineHeight: 28, letterSpacing: '-0.01em' },
  cardTitle: { size: 16, weight: 600, lineHeight: 24, letterSpacing: '0' },
  subtitle: { size: 14, weight: 500, lineHeight: 20, letterSpacing: '0' },
  body: { size: 14, weight: 400, lineHeight: 20, letterSpacing: '0' },
  bodySmall: { size: 13, weight: 400, lineHeight: 18, letterSpacing: '0' },
  label: { size: 13, weight: 500, lineHeight: 18, letterSpacing: '0' },
  caption: { size: 12, weight: 400, lineHeight: 16, letterSpacing: '0' },
  overline: { size: 11, weight: 600, lineHeight: 16, letterSpacing: '0.05em' },
  tableHeader: { size: 12, weight: 600, lineHeight: 16, letterSpacing: '0.03em' },
  tableCell: { size: 14, weight: 400, lineHeight: 20, letterSpacing: '0' },
  button: { size: 14, weight: 500, lineHeight: 20, letterSpacing: '0' },
  buttonSmall: { size: 13, weight: 500, lineHeight: 18, letterSpacing: '0' },
  code: { size: 13, weight: 400, lineHeight: 20, letterSpacing: '0' },
} as const;

// ---------------------------------------------------------------------------
// 6. Iconography
// ---------------------------------------------------------------------------

const icon = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

export const tokens = {
  colors,
  spacing,
  radius,
  borders,
  elevation,
  layout,
  breakpoints,
  font,
  type,
  icon,
} as const;
