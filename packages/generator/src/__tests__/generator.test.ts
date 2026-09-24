import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { stringify } from 'yaml';
import type { DashboardManifest } from '@dashboard-bootstrap/schema';
import { generate } from '../generate';
import { addPage } from '../add-page';
import { readState, contentHash } from '../state';

function createTestManifest(): DashboardManifest {
  return {
    version: 1,
    application: { name: 'Test App', description: 'A test application' },
    navigation: [
      { label: 'Overview', icon: 'home', route: '/overview' },
      { label: 'Users', icon: 'users', route: '/users' },
    ],
    pages: {
      overview: { route: '/overview', template: 'dashboard' },
      users: { route: '/users', template: 'table' },
    },
  };
}

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'gen-test-'));
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('generate', () => {
  it('creates system-generated files', () => {
    const manifest = createTestManifest();
    const result = generate(manifest, { outputDir: tempDir });

    expect(result.success).toBe(true);
    const systemFiles = result.files.filter((f) => f.category === 'system-generated');
    expect(systemFiles).toHaveLength(4);
    expect(systemFiles.map((f) => f.path)).toEqual([
      'src/generated/routes.generated.tsx',
      'src/generated/navigation.generated.ts',
      'src/generated/dashboard.generated.ts',
      'src/generated/theme.generated.ts',
    ]);
    systemFiles.forEach((f) => expect(f.disposition).toBe('created'));
  });

  it('creates scaffold files for each page', () => {
    const manifest = createTestManifest();
    const result = generate(manifest, { outputDir: tempDir });

    const scaffolds = result.files.filter((f) => f.category === 'scaffold');
    expect(scaffolds).toHaveLength(4);
    expect(scaffolds.map((f) => f.path).sort()).toEqual([
      'CLAUDE.md',
      'DESIGN.md',
      'src/pages/OverviewPage.tsx',
      'src/pages/UsersPage.tsx',
    ]);
    scaffolds.forEach((f) => expect(f.disposition).toBe('created'));
  });

  it('writes state.json', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const state = readState(tempDir);
    expect(state).not.toBeNull();
    expect(state!.generatorVersion).toBe('0.1.0');
    expect(state!.schemaVersion).toBe(1);
    expect(Object.keys(state!.files)).toHaveLength(8); // 4 system + 2 pages + 2 docs
  });

  it('generates routes file with correct imports', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/generated/routes.generated.tsx'), 'utf-8');
    expect(content).toContain('// @generated');
    expect(content).toContain("import { default as OverviewPage } from '../pages/OverviewPage'");
    expect(content).toContain("import { default as UsersPage } from '../pages/UsersPage'");
    expect(content).toContain("path: '/overview'");
    expect(content).toContain("path: '/users'");
  });

  it('generates navigation file', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/generated/navigation.generated.ts'), 'utf-8');
    expect(content).toContain('// @generated');
    expect(content).toContain("label: 'Overview'");
    expect(content).toContain("icon: 'home'");
    expect(content).toContain("label: 'Users'");
  });

  it('generates dashboard config file', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/generated/dashboard.generated.ts'), 'utf-8');
    expect(content).toContain('// @generated');
    expect(content).toContain("name: 'Test App'");
    expect(content).toContain("template: 'dashboard'");
    expect(content).toContain("template: 'table'");
  });

  it('generates theme config with default purple preset', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/generated/theme.generated.ts'), 'utf-8');
    expect(content).toContain('// @generated');
    expect(content).toContain("primary: '#5425E5'");
    expect(content).toContain("primaryHover: '#461CCB'");
    expect(content).toContain("primarySoft: '#EEE9FF'");
  });

  it('generates theme config with named preset', () => {
    const manifest = createTestManifest();
    manifest.application.theme = 'orange';
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/generated/theme.generated.ts'), 'utf-8');
    expect(content).toContain("primary: '#E85D04'");
    expect(content).toContain("primaryHover: '#CC5203'");
  });

  it('generates theme config with preset + color overrides', () => {
    const manifest = createTestManifest();
    manifest.application.theme = { preset: 'blue', colors: { primary: '#111111' } };
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/generated/theme.generated.ts'), 'utf-8');
    expect(content).toContain("primary: '#111111'");
    // Other blue values should remain
    expect(content).toContain("primaryHover: '#1D4ED8'");
  });

  it('generates scaffold files with @scaffold header', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const content = readFileSync(join(tempDir, 'src/pages/OverviewPage.tsx'), 'utf-8');
    expect(content).toContain('// @scaffold');
    expect(content).toContain('DashboardTemplate');
    expect(content).toContain('export default function OverviewPage');
  });
});

describe('idempotent generation', () => {
  it('produces the same result on second run', () => {
    const manifest = createTestManifest();
    const result1 = generate(manifest, { outputDir: tempDir });
    const result2 = generate(manifest, { outputDir: tempDir });

    expect(result2.success).toBe(true);
    // System files should be "updated" on second run
    const system2 = result2.files.filter((f) => f.category === 'system-generated');
    system2.forEach((f) => expect(f.disposition).toBe('updated'));
    // Scaffold files should be "skipped" on second run
    const scaffolds2 = result2.files.filter((f) => f.category === 'scaffold');
    scaffolds2.forEach((f) => expect(f.disposition).toBe('skipped'));
  });

  it('produces identical file content on second run', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });
    const routes1 = readFileSync(join(tempDir, 'src/generated/routes.generated.tsx'), 'utf-8');

    generate(manifest, { outputDir: tempDir });
    const routes2 = readFileSync(join(tempDir, 'src/generated/routes.generated.tsx'), 'utf-8');

    expect(routes1).toBe(routes2);
  });
});

describe('drift detection', () => {
  it('warns when system-generated file is modified externally', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    // Modify a system-generated file externally
    const routesPath = join(tempDir, 'src/generated/routes.generated.tsx');
    writeFileSync(routesPath, '// manually modified\n', 'utf-8');

    const result = generate(manifest, { outputDir: tempDir });
    expect(result.driftWarnings).toHaveLength(1);
    expect(result.driftWarnings[0].path).toBe('src/generated/routes.generated.tsx');
    expect(result.driftWarnings[0].message).toContain('modified externally');
  });

  it('overwrites drifted file with generated content', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const routesPath = join(tempDir, 'src/generated/routes.generated.tsx');
    writeFileSync(routesPath, '// manually modified\n', 'utf-8');

    generate(manifest, { outputDir: tempDir });
    const content = readFileSync(routesPath, 'utf-8');
    expect(content).toContain('// @generated');
    expect(content).not.toContain('// manually modified');
  });

  it('does not warn when system-generated file is unchanged', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const result = generate(manifest, { outputDir: tempDir });
    expect(result.driftWarnings).toHaveLength(0);
  });
});

describe('scaffold protection', () => {
  it('never overwrites existing scaffold files', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    // Modify scaffold
    const scaffoldPath = join(tempDir, 'src/pages/OverviewPage.tsx');
    writeFileSync(scaffoldPath, '// user customized\nexport default function OverviewPage() { return null; }\n', 'utf-8');

    const result = generate(manifest, { outputDir: tempDir });
    const scaffold = result.files.find((f) => f.path === 'src/pages/OverviewPage.tsx');
    expect(scaffold?.disposition).toBe('skipped');

    const content = readFileSync(scaffoldPath, 'utf-8');
    expect(content).toContain('// user customized');
  });

  it('skips scaffold even if untracked but file exists on disk', () => {
    const manifest = createTestManifest();

    // Pre-create a file at the scaffold location before any generation
    mkdirSync(join(tempDir, 'src/pages'), { recursive: true });
    writeFileSync(join(tempDir, 'src/pages/OverviewPage.tsx'), '// pre-existing\n', 'utf-8');

    const result = generate(manifest, { outputDir: tempDir });
    const scaffold = result.files.find((f) => f.path === 'src/pages/OverviewPage.tsx');
    expect(scaffold?.disposition).toBe('skipped');
  });
});

describe('filesystem containment', () => {
  it('rejects paths that escape the output root', () => {
    const manifest: DashboardManifest = {
      version: 1,
      application: { name: 'Test' },
      navigation: [{ label: 'Home', icon: 'home', route: '/home' }],
      pages: {
        '../../../etc/passwd': { route: '/home', template: 'dashboard' },
      },
    };

    expect(() => generate(manifest, { outputDir: tempDir })).toThrow('Path escapes output root');
  });
});

describe('state management', () => {
  it('tracks system-generated files with hashes', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const state = readState(tempDir);
    const routeEntry = state!.files['src/generated/routes.generated.tsx'];
    expect(routeEntry.category).toBe('system-generated');
    expect(routeEntry.hash).toBeDefined();
    expect(routeEntry.createdAt).toBeDefined();
  });

  it('tracks scaffold files without hashes', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const state = readState(tempDir);
    const scaffoldEntry = state!.files['src/pages/OverviewPage.tsx'];
    expect(scaffoldEntry.category).toBe('scaffold');
    expect(scaffoldEntry.createdAt).toBeDefined();
  });

  it('updates manifest hash on each generation', () => {
    const manifest = createTestManifest();
    generate(manifest, { outputDir: tempDir });

    const state1 = readState(tempDir);
    const hash1 = state1!.manifestHash;

    manifest.application.name = 'Updated App';
    generate(manifest, { outputDir: tempDir });

    const state2 = readState(tempDir);
    expect(state2!.manifestHash).not.toBe(hash1);
  });
});

describe('addPage', () => {
  it('adds a page to the manifest and generates files', () => {
    const manifest = createTestManifest();
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify(manifest), 'utf-8');

    // First generate
    generate(manifest, { outputDir: tempDir });

    // Add a new page
    const result = addPage(manifestPath, 'settings', {
      template: 'settings',
      route: '/settings',
      label: 'Settings',
      icon: 'settings',
      outputDir: tempDir,
    });

    expect(result.success).toBe(true);

    // Verify manifest was updated
    const updatedRaw = readFileSync(manifestPath, 'utf-8');
    expect(updatedRaw).toContain('settings');

    // Verify scaffold was created
    const scaffoldExists = existsSync(join(tempDir, 'src/pages/SettingsPage.tsx'));
    expect(scaffoldExists).toBe(true);

    // Verify routes were regenerated
    const routes = readFileSync(join(tempDir, 'src/generated/routes.generated.tsx'), 'utf-8');
    expect(routes).toContain('SettingsPage');
  });

  it('does not overwrite existing scaffold files when adding page', () => {
    const manifest = createTestManifest();
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify(manifest), 'utf-8');
    generate(manifest, { outputDir: tempDir });

    // Customize a scaffold
    const overviewPath = join(tempDir, 'src/pages/OverviewPage.tsx');
    writeFileSync(overviewPath, '// custom code\n', 'utf-8');

    // Add page (triggers regeneration)
    addPage(manifestPath, 'reports', {
      template: 'table',
      route: '/reports',
      outputDir: tempDir,
    });

    // Original scaffold should be preserved
    const content = readFileSync(overviewPath, 'utf-8');
    expect(content).toBe('// custom code\n');
  });
});
