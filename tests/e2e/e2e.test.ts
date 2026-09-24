import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { run } from '@dashboard-bootstrap/cli';

const TEST_MANIFEST = `version: 1
application:
  name: E2E Test Dashboard
  description: E2E test

navigation:
  - label: Overview
    icon: home
    route: /
  - label: Users
    icon: users
    route: /users
  - label: Settings
    icon: settings
    route: /settings

pages:
  overview:
    route: /
    template: dashboard
  users:
    route: /users
    template: table
  settings:
    route: /settings
    template: settings
`;

describe('Full Standalone E2E Acceptance', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'db-e2e-'));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('init creates dashboard.yaml', () => {
    const result = run(['init', tmpDir]);
    expect(result).toBe(0);

    const manifestPath = join(tmpDir, 'dashboard.yaml');
    expect(existsSync(manifestPath)).toBe(true);

    const content = readFileSync(manifestPath, 'utf-8');
    expect(content).toContain('version: 1');
    expect(content).toContain('My Dashboard');
  });

  it('init fails if dashboard.yaml already exists', () => {
    run(['init', tmpDir]);
    const result = run(['init', tmpDir]);
    expect(result).toBe(1);
  });

  it('validate succeeds for a valid manifest', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');

    const result = run(['validate', manifestPath]);
    expect(result).toBe(0);
  });

  it('validate fails for an invalid manifest', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, 'version: 99\n', 'utf-8');

    const result = run(['validate', manifestPath]);
    expect(result).toBe(1);
  });

  it('generate produces routes, pages, and navigation', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');

    const result = run(['generate', manifestPath]);
    expect(result).toBe(0);

    // System-generated files exist
    expect(existsSync(join(tmpDir, 'src/generated/routes.generated.tsx'))).toBe(true);
    expect(existsSync(join(tmpDir, 'src/generated/navigation.generated.ts'))).toBe(true);
    expect(existsSync(join(tmpDir, 'src/generated/dashboard.generated.ts'))).toBe(true);

    // Scaffold page files exist
    expect(existsSync(join(tmpDir, 'src/pages/OverviewPage.tsx'))).toBe(true);
    expect(existsSync(join(tmpDir, 'src/pages/UsersPage.tsx'))).toBe(true);
    expect(existsSync(join(tmpDir, 'src/pages/SettingsPage.tsx'))).toBe(true);

    // State file exists
    expect(existsSync(join(tmpDir, '.dashboard-bootstrap/state.json'))).toBe(true);
  });

  it('routes file contains correct page imports and route entries', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');
    run(['generate', manifestPath]);

    const routes = readFileSync(join(tmpDir, 'src/generated/routes.generated.tsx'), 'utf-8');
    expect(routes).toContain('@generated');
    expect(routes).toContain("import { default as OverviewPage }");
    expect(routes).toContain("import { default as UsersPage }");
    expect(routes).toContain("import { default as SettingsPage }");
    expect(routes).toContain("path: '/'");
    expect(routes).toContain("path: '/users'");
    expect(routes).toContain("path: '/settings'");
  });

  it('navigation file contains correct nav items', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');
    run(['generate', manifestPath]);

    const nav = readFileSync(join(tmpDir, 'src/generated/navigation.generated.ts'), 'utf-8');
    expect(nav).toContain('@generated');
    expect(nav).toContain("label: 'Overview'");
    expect(nav).toContain("label: 'Users'");
    expect(nav).toContain("label: 'Settings'");
    expect(nav).toContain("icon: 'home'");
    expect(nav).toContain("icon: 'users'");
  });

  it('scaffold pages use the correct template', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');
    run(['generate', manifestPath]);

    const overview = readFileSync(join(tmpDir, 'src/pages/OverviewPage.tsx'), 'utf-8');
    expect(overview).toContain('@scaffold');
    expect(overview).toContain('DashboardTemplate');

    const users = readFileSync(join(tmpDir, 'src/pages/UsersPage.tsx'), 'utf-8');
    expect(users).toContain('TableTemplate');

    const settings = readFileSync(join(tmpDir, 'src/pages/SettingsPage.tsx'), 'utf-8');
    expect(settings).toContain('SettingsTemplate');
  });

  it('scaffold files survive regeneration (scaffold protection)', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');

    // First generation
    run(['generate', manifestPath]);

    // Modify a scaffold file
    const scaffoldPath = join(tmpDir, 'src/pages/OverviewPage.tsx');
    const customContent = '// @scaffold\n// Custom user code that must survive regeneration\nexport default function OverviewPage() { return <div>Custom</div>; }\n';
    writeFileSync(scaffoldPath, customContent, 'utf-8');

    // Regenerate
    const result = run(['generate', manifestPath]);
    expect(result).toBe(0);

    // Verify scaffold file was NOT overwritten
    const afterRegen = readFileSync(scaffoldPath, 'utf-8');
    expect(afterRegen).toBe(customContent);
  });

  it('drift detection: modified system-generated file is restored on regeneration', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');

    // First generation
    run(['generate', manifestPath]);

    const routesPath = join(tmpDir, 'src/generated/routes.generated.tsx');
    const originalContent = readFileSync(routesPath, 'utf-8');

    // Tamper with a system-generated file
    writeFileSync(routesPath, '// TAMPERED CONTENT\n' + originalContent, 'utf-8');

    // Regenerate
    const result = run(['generate', manifestPath]);
    expect(result).toBe(0);

    // Verify system-generated file was restored (overwritten with generated content)
    const afterRegen = readFileSync(routesPath, 'utf-8');
    expect(afterRegen).toBe(originalContent);
    expect(afterRegen).not.toContain('TAMPERED');
  });

  it('state tracks file categories correctly', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');
    run(['generate', manifestPath]);

    const stateRaw = readFileSync(join(tmpDir, '.dashboard-bootstrap/state.json'), 'utf-8');
    const state = JSON.parse(stateRaw);
    expect(state).not.toBeNull();

    // System-generated files
    expect(state.files['src/generated/routes.generated.tsx'].category).toBe('system-generated');
    expect(state.files['src/generated/navigation.generated.ts'].category).toBe('system-generated');
    expect(state.files['src/generated/dashboard.generated.ts'].category).toBe('system-generated');

    // Scaffold files
    expect(state.files['src/pages/OverviewPage.tsx'].category).toBe('scaffold');
    expect(state.files['src/pages/UsersPage.tsx'].category).toBe('scaffold');
    expect(state.files['src/pages/SettingsPage.tsx'].category).toBe('scaffold');

    // System-generated files have hashes, scaffold files don't
    expect(state.files['src/generated/routes.generated.tsx'].hash).toBeDefined();
    expect(state.files['src/pages/OverviewPage.tsx'].hash).toBeUndefined();
  });

  it('idempotent regeneration produces identical output', () => {
    const manifestPath = join(tmpDir, 'dashboard.yaml');
    writeFileSync(manifestPath, TEST_MANIFEST, 'utf-8');

    run(['generate', manifestPath]);
    const routesFirst = readFileSync(join(tmpDir, 'src/generated/routes.generated.tsx'), 'utf-8');
    const navFirst = readFileSync(join(tmpDir, 'src/generated/navigation.generated.ts'), 'utf-8');

    run(['generate', manifestPath]);
    const routesSecond = readFileSync(join(tmpDir, 'src/generated/routes.generated.tsx'), 'utf-8');
    const navSecond = readFileSync(join(tmpDir, 'src/generated/navigation.generated.ts'), 'utf-8');

    expect(routesSecond).toBe(routesFirst);
    expect(navSecond).toBe(navFirst);
  });
});
