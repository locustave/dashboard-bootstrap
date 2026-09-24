import type { TemplateName, IconName, ThemePresetName } from './vocabulary';

/**
 * Page-level capabilities — template-specific feature flags.
 */
export type PageCapabilities = Record<string, boolean>;

/**
 * A single navigation item in the sidebar.
 */
export interface NavigationItem {
  label: string;
  icon: IconName;
  route: string;
  children?: NavigationItem[];
  /** Optional group label — items with the same group are rendered under a section heading. */
  group?: string;
  /** Where this item appears in the sidebar. Defaults to 'top'. */
  position?: 'top' | 'bottom';
}

/**
 * A page definition within the manifest.
 */
export interface PageDefinition {
  route: string;
  template: TemplateName;
  capabilities?: PageCapabilities;
}

/**
 * Theme color overrides — user can override any of these.
 */
export interface ThemeColorOverrides {
  primary?: string;
  primaryHover?: string;
  primarySoft?: string;
  complete?: string;
}

/**
 * Theme config — either a preset name string or an object with preset + overrides.
 */
export type ThemeConfig = ThemePresetName | {
  preset: ThemePresetName;
  colors?: ThemeColorOverrides;
};

/**
 * The full dashboard manifest (v1).
 */
export interface DashboardManifest {
  version: number;
  application: {
    name: string;
    description?: string;
    companyName?: string;
    logo?: string;
    collapsedLogo?: string;
    theme?: ThemeConfig;
  };
  navigation: NavigationItem[];
  pages: Record<string, PageDefinition>;
}

/**
 * A single validation error with path, message, and rule identifier.
 */
export interface ValidationError {
  path: string;
  message: string;
  rule: string;
}

/**
 * Result of manifest validation — discriminated union.
 */
export type ValidationResult =
  | { valid: true; manifest: DashboardManifest }
  | { valid: false; errors: ValidationError[] };
