import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { stringify } from 'yaml';

const EMPTY_MANIFEST = {
  version: 1,
  application: {
    name: 'My Dashboard',
    description: 'A new dashboard application',
  },
  navigation: [],
  pages: {},
};

export function init(targetDir: string = '.'): number {
  const manifestPath = join(targetDir, 'dashboard.yaml');

  if (existsSync(manifestPath)) {
    console.error('dashboard.yaml already exists in this directory.');
    return 1;
  }

  mkdirSync(targetDir, { recursive: true });
  writeFileSync(manifestPath, stringify(EMPTY_MANIFEST), 'utf-8');
  console.log('Created dashboard.yaml');
  console.log('Edit the manifest to define your dashboard, then run: dashboard-bootstrap generate dashboard.yaml');
  return 0;
}
