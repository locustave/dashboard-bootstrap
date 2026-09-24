import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { validateManifest } from '@dashboard-bootstrap/schema';

export function validate(manifestPath: string): number {
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

  const result = validateManifest(parsed);

  if (result.valid) {
    console.log('Manifest is valid.');
    return 0;
  }

  console.error('Manifest validation failed:');
  for (const error of result.errors) {
    console.error(`  [${error.rule}] ${error.path}: ${error.message}`);
  }
  return 1;
}
