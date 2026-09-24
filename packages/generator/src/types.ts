import type { DashboardManifest, TemplateName } from '@dashboard-bootstrap/schema';

export interface GenerateOptions {
  /** Absolute path to the project output root. */
  outputDir: string;
  /** Path to the dashboard.yaml manifest file. */
  manifestPath?: string;
  /** When true, emit a complete runnable Vite project (package.json, index.html, etc.). */
  runnable?: boolean;
}

export type FileCategory = 'system-generated' | 'scaffold';
export type FileDisposition = 'created' | 'updated' | 'skipped';

export interface FileEntry {
  path: string;
  category: FileCategory;
  disposition: FileDisposition;
}

export interface DriftWarning {
  path: string;
  message: string;
}

export interface GenerateResult {
  success: boolean;
  files: FileEntry[];
  driftWarnings: DriftWarning[];
}

export interface AddPageOptions {
  /** Template type for the new page. */
  template: TemplateName;
  /** Route path for the new page. */
  route?: string;
  /** Navigation label. */
  label?: string;
  /** Icon name for navigation. */
  icon?: string;
  /** Absolute path to the project output root. */
  outputDir: string;
}
