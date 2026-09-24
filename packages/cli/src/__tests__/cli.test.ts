import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { stringify } from 'yaml';
import { run } from '../index';

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'cli-test-'));
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
  vi.restoreAllMocks();
});

describe('help', () => {
  it('prints usage with --help', () => {
    const code = run(['--help']);
    expect(code).toBe(0);
    expect(console.log).toHaveBeenCalled();
  });

  it('prints usage with no args', () => {
    const code = run([]);
    expect(code).toBe(0);
  });

  it('returns 1 for unknown command', () => {
    const code = run(['unknown-command']);
    expect(code).toBe(1);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Unknown command'));
  });
});

describe('init', () => {
  it('creates dashboard.yaml in target directory', () => {
    const code = run(['init', tempDir]);
    expect(code).toBe(0);
    expect(existsSync(join(tempDir, 'dashboard.yaml'))).toBe(true);
  });

  it('does not overwrite existing dashboard.yaml', () => {
    writeFileSync(join(tempDir, 'dashboard.yaml'), 'existing', 'utf-8');
    const code = run(['init', tempDir]);
    expect(code).toBe(1);
    expect(readFileSync(join(tempDir, 'dashboard.yaml'), 'utf-8')).toBe('existing');
  });

  it('creates valid YAML manifest', () => {
    run(['init', tempDir]);
    const content = readFileSync(join(tempDir, 'dashboard.yaml'), 'utf-8');
    expect(content).toContain('version: 1');
    expect(content).toContain('My Dashboard');
  });
});

describe('validate', () => {
  it('returns 0 for valid manifest', () => {
    const manifest = {
      version: 1,
      application: { name: 'Test' },
      navigation: [{ label: 'Home', icon: 'home', route: '/home' }],
      pages: { home: { route: '/home', template: 'dashboard' } },
    };
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify(manifest), 'utf-8');

    const code = run(['validate', manifestPath]);
    expect(code).toBe(0);
  });

  it('returns 1 for invalid manifest', () => {
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify({ version: 'bad' }), 'utf-8');

    const code = run(['validate', manifestPath]);
    expect(code).toBe(1);
  });

  it('returns 1 for missing file', () => {
    const code = run(['validate', join(tempDir, 'nonexistent.yaml')]);
    expect(code).toBe(1);
  });

  it('returns 1 when no file specified', () => {
    const code = run(['validate']);
    expect(code).toBe(1);
  });
});

describe('generate', () => {
  it('generates files from valid manifest', () => {
    const manifest = {
      version: 1,
      application: { name: 'Test' },
      navigation: [{ label: 'Home', icon: 'home', route: '/home' }],
      pages: { home: { route: '/home', template: 'dashboard' } },
    };
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify(manifest), 'utf-8');

    const code = run(['generate', manifestPath]);
    expect(code).toBe(0);
    expect(existsSync(join(tempDir, 'src/generated/routes.generated.tsx'))).toBe(true);
    expect(existsSync(join(tempDir, 'src/pages/HomePage.tsx'))).toBe(true);
  });

  it('returns 1 for invalid manifest', () => {
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify({ version: 'bad' }), 'utf-8');

    const code = run(['generate', manifestPath]);
    expect(code).toBe(1);
  });

  it('returns 1 when no file specified', () => {
    const code = run(['generate']);
    expect(code).toBe(1);
  });
});

describe('add-page', () => {
  it('adds a page and generates files', () => {
    const manifest = {
      version: 1,
      application: { name: 'Test' },
      navigation: [{ label: 'Home', icon: 'home', route: '/home' }],
      pages: { home: { route: '/home', template: 'dashboard' } },
    };
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify(manifest), 'utf-8');

    // First generate
    run(['generate', manifestPath]);

    // Add page
    const code = run(['add-page', 'users', '--template', 'table', '--manifest', manifestPath]);
    expect(code).toBe(0);
    expect(existsSync(join(tempDir, 'src/pages/UsersPage.tsx'))).toBe(true);
  });

  it('returns 1 for invalid template', () => {
    const manifestPath = join(tempDir, 'dashboard.yaml');
    writeFileSync(manifestPath, stringify({ version: 1, application: { name: 'T' }, navigation: [], pages: {} }), 'utf-8');

    const code = run(['add-page', 'users', '--template', 'invalid', '--manifest', manifestPath]);
    expect(code).toBe(1);
  });

  it('returns 1 when missing required args', () => {
    const code = run(['add-page']);
    expect(code).toBe(1);
  });
});

describe('doctor', () => {
  it('returns 0 when environment is healthy', () => {
    const code = run(['doctor']);
    expect(code).toBe(0);
  });
});
