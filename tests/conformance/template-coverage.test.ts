import { describe, it, expect } from 'vitest';
import { TEMPLATE_NAMES } from '@dashboard-bootstrap/schema';
import * as templates from '@dashboard-bootstrap/templates';

const TEMPLATE_COMPONENT_MAP: Record<string, string> = {
  dashboard: 'DashboardTemplate',
  table: 'TableTemplate',
  detail: 'DetailTemplate',
  settings: 'SettingsTemplate',
  wizard: 'WizardTemplate',
  catalog: 'CatalogTemplate',
  builder: 'BuilderTemplate',
  'split-view': 'SplitViewTemplate',
  'empty-state': 'EmptyStateTemplate',
};

describe('Template Coverage', () => {
  it('every TemplateName in schema has a corresponding export in templates', () => {
    const templateExports = Object.keys(templates);

    for (const templateName of TEMPLATE_NAMES) {
      const expectedExport = TEMPLATE_COMPONENT_MAP[templateName];
      expect(
        templateExports,
        `Missing template export for "${templateName}" — expected "${expectedExport}"`,
      ).toContain(expectedExport);
    }
  });

  it('all template exports are functions (React components)', () => {
    for (const templateName of TEMPLATE_NAMES) {
      const exportName = TEMPLATE_COMPONENT_MAP[templateName];
      const component = (templates as Record<string, unknown>)[exportName];
      expect(typeof component, `${exportName} should be a function`).toBe('function');
    }
  });
});
