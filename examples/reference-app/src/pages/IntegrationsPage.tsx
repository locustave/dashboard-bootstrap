import React from 'react';
import { CatalogTemplate } from '@dashboard-bootstrap/templates';
import { catalogItems } from '../fixtures/data';

export default function IntegrationsPage() {
  return (
    <CatalogTemplate
      title="Integrations"
      description="Browse and connect third-party services"
      items={catalogItems}
      onItemClick={(item) => alert(`Selected: ${item.title}`)}
    />
  );
}
