import React from 'react';
import { EmptyState, PageHeader, Icon } from '@dashboard-bootstrap/design-system';
import { ReferenceDrawer, ReferenceDrawerButton, useReferenceDrawer } from '../components/ReferenceDrawer';

export default function AnalyticsPage() {
  const drawer = useReferenceDrawer();

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Track usage, performance, and trends."
        actions={<ReferenceDrawerButton onClick={drawer.onOpen} />}
      />
      <EmptyState
        title="Welcome to Analytics"
        description="This is what your generated dashboard looks like out of the box. Add pages and navigation items via your dashboard.yaml manifest."
        icon={<Icon name="bar-chart" size="xl" />}
      />
      <ReferenceDrawer open={drawer.open} onClose={drawer.onClose} />
    </>
  );
}
