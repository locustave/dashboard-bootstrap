import type { TemplateName } from '@dashboard-bootstrap/schema';

const HEADER = '// @scaffold\n// This file was generated as a starting point. You own it — edit freely.\n';

const TEMPLATE_IMPORT_MAP: Record<TemplateName, string> = {
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

function pageComponentName(pageId: string): string {
  return pageId.charAt(0).toUpperCase() + pageId.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Page';
}

export function generateScaffoldPage(pageId: string, template: TemplateName): string {
  const componentName = pageComponentName(pageId);
  const templateComponent = TEMPLATE_IMPORT_MAP[template];
  const label = pageId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return `${HEADER}
import React from 'react';
import { ${templateComponent} } from '@dashboard-bootstrap/templates';

export default function ${componentName}() {
  return <${templateComponent} title="${label}" />;
}
`;
}

export { pageComponentName as scaffoldPageComponentName };
