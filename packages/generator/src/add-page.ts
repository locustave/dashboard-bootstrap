import { readFileSync, writeFileSync } from 'node:fs';
import { parse, stringify } from 'yaml';
import { validateManifest } from '@dashboard-bootstrap/schema';
import type { DashboardManifest } from '@dashboard-bootstrap/schema';
import type { AddPageOptions, GenerateResult } from './types';
import { generate } from './generate';

export function addPage(
  manifestPath: string,
  pageId: string,
  options: AddPageOptions,
): GenerateResult {
  // 1. Read manifest
  const raw = readFileSync(manifestPath, 'utf-8');
  const manifest = parse(raw) as DashboardManifest;

  // 2. Modify manifest — add page definition
  const route = options.route ?? `/${pageId}`;
  const label = options.label ?? pageId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const icon = options.icon ?? 'file';

  manifest.pages[pageId] = {
    route,
    template: options.template,
  };

  // Add navigation entry if not already present
  const hasNavEntry = manifest.navigation.some((item) => item.route === route);
  if (!hasNavEntry) {
    manifest.navigation.push({
      label,
      icon: icon as any,
      route,
    });
  }

  // 3. Validate updated manifest
  const result = validateManifest(manifest);
  if (!result.valid) {
    return {
      success: false,
      files: [],
      driftWarnings: [],
    };
  }

  // 4. Persist manifest
  writeFileSync(manifestPath, stringify(manifest), 'utf-8');

  // 5. Regenerate
  return generate(result.manifest, { outputDir: options.outputDir, manifestPath });
}
