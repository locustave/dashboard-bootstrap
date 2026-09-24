import { describe, it, expect } from 'vitest';
import { CAPABILITIES, TEMPLATE_NAMES } from '@dashboard-bootstrap/schema';

describe('Capability Coverage', () => {
  it('every TemplateName has a CAPABILITIES entry', () => {
    for (const templateName of TEMPLATE_NAMES) {
      expect(
        CAPABILITIES[templateName],
        `Missing CAPABILITIES entry for template "${templateName}"`,
      ).toBeDefined();
    }
  });

  it('every CAPABILITIES entry is a non-empty array', () => {
    for (const templateName of TEMPLATE_NAMES) {
      const caps = CAPABILITIES[templateName];
      expect(Array.isArray(caps), `CAPABILITIES["${templateName}"] should be an array`).toBe(true);
      expect(caps.length, `CAPABILITIES["${templateName}"] should not be empty`).toBeGreaterThan(0);
    }
  });

  it('capability keys are kebab-case strings', () => {
    for (const templateName of TEMPLATE_NAMES) {
      for (const cap of CAPABILITIES[templateName]) {
        expect(cap, `Capability "${cap}" in "${templateName}" should be kebab-case`).toMatch(
          /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
        );
      }
    }
  });

  it('no duplicate capabilities within a template', () => {
    for (const templateName of TEMPLATE_NAMES) {
      const caps = CAPABILITIES[templateName];
      const unique = new Set(caps);
      expect(
        unique.size,
        `Template "${templateName}" has duplicate capabilities`,
      ).toBe(caps.length);
    }
  });
});
