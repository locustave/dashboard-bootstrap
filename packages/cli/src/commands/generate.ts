import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parse } from 'yaml';
import { validateManifest } from '@dashboard-bootstrap/schema';
import { generate as runGenerate } from '@dashboard-bootstrap/generator';

export function generate(manifestPath: string, opts: { runnable?: boolean } = {}): number {
  let raw: string;
  try {
    raw = readFileSync(manifestPath, 'utf-8');
  } catch {
    console.error(`Could not read file: ${manifestPath}`);
    return 1;
  }

  let parsed: unknown;
  try {
    parsed = parse(raw);
  } catch {
    console.error('Failed to parse YAML.');
    return 1;
  }

  const validation = validateManifest(parsed);
  if (!validation.valid) {
    console.error('Manifest validation failed:');
    for (const error of validation.errors) {
      console.error(`  [${error.rule}] ${error.path}: ${error.message}`);
    }
    return 1;
  }

  const outputDir = resolve(dirname(manifestPath));

  try {
    const result = runGenerate(validation.manifest, { outputDir, manifestPath, runnable: opts.runnable });

    if (!result.success) {
      console.error('Generation failed.');
      return 2;
    }

    for (const warning of result.driftWarnings) {
      console.warn(`  drift: ${warning.path} — ${warning.message}`);
    }

    for (const file of result.files) {
      const icon = file.disposition === 'created' ? '+' : file.disposition === 'updated' ? '~' : '-';
      console.log(`  ${icon} ${file.path} (${file.category})`);
    }

    console.log(`Generated ${result.files.length} files.`);
    return 0;
  } catch (err) {
    console.error(`Generation error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}
