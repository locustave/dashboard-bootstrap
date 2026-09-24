import { describe, it, expect } from 'vitest';
import { validateManifest } from '../validate';
import type { DashboardManifest } from '../types';

function validManifest(overrides?: Partial<DashboardManifest>): DashboardManifest {
  return {
    version: 1,
    application: { name: 'Test App' },
    navigation: [
      { label: 'Home', icon: 'home', route: '/' },
      { label: 'Users', icon: 'users', route: '/users' },
    ],
    pages: {
      home: { route: '/', template: 'dashboard' },
      users: { route: '/users', template: 'table' },
    },
    ...overrides,
  };
}

describe('validateManifest', () => {
  describe('valid manifests', () => {
    it('accepts a minimal valid manifest', () => {
      const result = validateManifest(validManifest());
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.manifest.application.name).toBe('Test App');
      }
    });

    it('accepts a manifest with capabilities', () => {
      const result = validateManifest({
        ...validManifest(),
        pages: {
          home: { route: '/', template: 'dashboard', capabilities: { metrics: true, charts: false } },
          users: { route: '/users', template: 'table', capabilities: { search: true } },
        },
      });
      expect(result.valid).toBe(true);
    });

    it('accepts nested navigation', () => {
      const result = validateManifest({
        ...validManifest(),
        navigation: [
          {
            label: 'Settings',
            icon: 'settings',
            route: '/settings',
            children: [
              { label: 'General', icon: 'cog', route: '/settings/general' },
              { label: 'Security', icon: 'shield', route: '/settings/security' },
            ],
          },
        ],
        pages: {
          settings: { route: '/settings', template: 'settings' },
          general: { route: '/settings/general', template: 'settings' },
          security: { route: '/settings/security', template: 'detail' },
        },
      });
      expect(result.valid).toBe(true);
    });

    it('accepts a manifest with application description', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'My App', description: 'A cool app' },
      });
      expect(result.valid).toBe(true);
    });

    it('accepts a string theme preset', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'Test', theme: 'orange' },
      });
      expect(result.valid).toBe(true);
    });

    it('accepts an object theme with preset and color overrides', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'Test', theme: { preset: 'blue', colors: { primary: '#000000' } } },
      });
      expect(result.valid).toBe(true);
    });

    it('accepts a theme with only preset in object form', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'Test', theme: { preset: 'teal' } },
      });
      expect(result.valid).toBe(true);
    });

    it('accepts sub-routes not directly in navigation', () => {
      const result = validateManifest({
        version: 1,
        application: { name: 'Test' },
        navigation: [{ label: 'Users', icon: 'users', route: '/users' }],
        pages: {
          users: { route: '/users', template: 'table' },
          userDetail: { route: '/users/detail', template: 'detail' },
        },
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('structural validation (JSON Schema)', () => {
    it('rejects null input', () => {
      const result = validateManifest(null);
      expect(result.valid).toBe(false);
    });

    it('rejects undefined input', () => {
      const result = validateManifest(undefined);
      expect(result.valid).toBe(false);
    });

    it('rejects empty object', () => {
      const result = validateManifest({});
      expect(result.valid).toBe(false);
    });

    it('rejects wrong version', () => {
      const result = validateManifest({ ...validManifest(), version: 2 });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.rule === 'schema')).toBe(true);
      }
    });

    it('rejects missing application name', () => {
      const result = validateManifest({ ...validManifest(), application: {} as any });
      expect(result.valid).toBe(false);
    });

    it('rejects empty navigation array', () => {
      const result = validateManifest({ ...validManifest(), navigation: [] });
      expect(result.valid).toBe(false);
    });

    it('rejects empty pages object', () => {
      const result = validateManifest({ ...validManifest(), pages: {} });
      expect(result.valid).toBe(false);
    });

    it('rejects invalid icon name', () => {
      const result = validateManifest({
        ...validManifest(),
        navigation: [{ label: 'Home', icon: 'nonexistent-icon', route: '/' }],
      });
      expect(result.valid).toBe(false);
    });

    it('rejects invalid template name', () => {
      const result = validateManifest({
        ...validManifest(),
        pages: {
          home: { route: '/', template: 'nonexistent-template' as any },
        },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects route not starting with /', () => {
      const result = validateManifest({
        ...validManifest(),
        navigation: [{ label: 'Home', icon: 'home', route: 'no-slash' }],
      });
      expect(result.valid).toBe(false);
    });

    it('rejects invalid theme preset name', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'Test', theme: 'neon' },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects theme with invalid color format', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'Test', theme: { preset: 'blue', colors: { primary: 'not-a-color' } } },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects theme as a number', () => {
      const result = validateManifest({
        ...validManifest(),
        application: { name: 'Test', theme: 42 as any },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects additional properties on root', () => {
      const result = validateManifest({ ...validManifest(), extra: 'field' });
      expect(result.valid).toBe(false);
    });
  });

  describe('semantic validation', () => {
    it('rejects duplicate page routes', () => {
      const result = validateManifest({
        ...validManifest(),
        pages: {
          page1: { route: '/same', template: 'dashboard' },
          page2: { route: '/same', template: 'table' },
        },
        navigation: [{ label: 'Same', icon: 'home', route: '/same' }],
      });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.rule === 'no-duplicate-routes')).toBe(true);
        expect(result.errors.filter((e) => e.rule === 'no-duplicate-routes')).toHaveLength(2);
      }
    });

    it('rejects invalid capability for template type', () => {
      const result = validateManifest({
        ...validManifest(),
        pages: {
          home: { route: '/', template: 'dashboard', capabilities: { 'invalid-cap': true } },
          users: { route: '/users', template: 'table' },
        },
      });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.rule === 'valid-capabilities')).toBe(true);
      }
    });

    it('accepts valid capabilities for their template type', () => {
      const result = validateManifest({
        ...validManifest(),
        pages: {
          home: { route: '/', template: 'dashboard', capabilities: { metrics: true } },
          users: { route: '/users', template: 'table', capabilities: { search: true, filters: true } },
        },
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('cross-reference validation', () => {
    it('rejects navigation route that references no page', () => {
      const result = validateManifest({
        version: 1,
        application: { name: 'Test' },
        navigation: [
          { label: 'Home', icon: 'home', route: '/' },
          { label: 'Orphan', icon: 'alert-circle', route: '/orphan' },
        ],
        pages: {
          home: { route: '/', template: 'dashboard' },
        },
      });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.rule === 'nav-routes-reference-pages')).toBe(true);
      }
    });

    it('rejects page route not reachable from navigation', () => {
      const result = validateManifest({
        version: 1,
        application: { name: 'Test' },
        navigation: [{ label: 'Home', icon: 'home', route: '/' }],
        pages: {
          home: { route: '/', template: 'dashboard' },
          unreachable: { route: '/unreachable', template: 'detail' },
        },
      });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.rule === 'navigable-routes')).toBe(true);
      }
    });

    it('rejects child routes that are not sub-routes of parent', () => {
      const result = validateManifest({
        version: 1,
        application: { name: 'Test' },
        navigation: [
          {
            label: 'Settings',
            icon: 'settings',
            route: '/settings',
            children: [
              { label: 'Bad Child', icon: 'alert-circle', route: '/other/path' },
            ],
          },
        ],
        pages: {
          settings: { route: '/settings', template: 'settings' },
          badChild: { route: '/other/path', template: 'detail' },
        },
      });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.rule === 'child-routes-under-parent')).toBe(true);
      }
    });

    it('accepts nav route that is parent of page routes', () => {
      const result = validateManifest({
        version: 1,
        application: { name: 'Test' },
        navigation: [{ label: 'Users', icon: 'users', route: '/users' }],
        pages: {
          usersList: { route: '/users', template: 'table' },
          userDetail: { route: '/users/detail', template: 'detail' },
        },
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('error structure', () => {
    it('returns errors with path, message, and rule fields', () => {
      const result = validateManifest({});
      expect(result.valid).toBe(false);
      if (!result.valid) {
        for (const error of result.errors) {
          expect(error).toHaveProperty('path');
          expect(error).toHaveProperty('message');
          expect(error).toHaveProperty('rule');
          expect(typeof error.path).toBe('string');
          expect(typeof error.message).toBe('string');
          expect(typeof error.rule).toBe('string');
        }
      }
    });
  });
});
