import { describe, it, expect } from 'vitest';
import { TEMPLATE_NAMES, ICON_NAMES, CAPABILITIES } from '../vocabulary';

describe('vocabulary', () => {
  it('exports all 9 template names', () => {
    expect(TEMPLATE_NAMES).toHaveLength(9);
    expect(TEMPLATE_NAMES).toContain('dashboard');
    expect(TEMPLATE_NAMES).toContain('table');
    expect(TEMPLATE_NAMES).toContain('detail');
    expect(TEMPLATE_NAMES).toContain('settings');
    expect(TEMPLATE_NAMES).toContain('wizard');
    expect(TEMPLATE_NAMES).toContain('catalog');
    expect(TEMPLATE_NAMES).toContain('builder');
    expect(TEMPLATE_NAMES).toContain('split-view');
    expect(TEMPLATE_NAMES).toContain('empty-state');
  });

  it('exports ICON_NAMES as a non-empty array of strings', () => {
    expect(ICON_NAMES.length).toBeGreaterThan(0);
    for (const name of ICON_NAMES) {
      expect(typeof name).toBe('string');
    }
  });

  it('includes common icon names', () => {
    expect(ICON_NAMES).toContain('home');
    expect(ICON_NAMES).toContain('settings');
    expect(ICON_NAMES).toContain('user');
    expect(ICON_NAMES).toContain('search');
  });

  it('has CAPABILITIES defined for every template name', () => {
    for (const name of TEMPLATE_NAMES) {
      expect(CAPABILITIES[name]).toBeDefined();
      expect(Array.isArray(CAPABILITIES[name])).toBe(true);
      expect(CAPABILITIES[name].length).toBeGreaterThan(0);
    }
  });

  it('ICON_NAMES has no duplicates', () => {
    const unique = new Set(ICON_NAMES);
    expect(unique.size).toBe(ICON_NAMES.length);
  });

  it('TEMPLATE_NAMES has no duplicates', () => {
    const unique = new Set(TEMPLATE_NAMES);
    expect(unique.size).toBe(TEMPLATE_NAMES.length);
  });
});
