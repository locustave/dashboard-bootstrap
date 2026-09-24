import React from 'react';
import { EmptyState, PageHeader, Icon } from '@dashboard-bootstrap/design-system';
import { ReferenceDrawer, ReferenceDrawerButton, useReferenceDrawer } from '../components/ReferenceDrawer';

export default function OverviewPage() {
  const drawer = useReferenceDrawer();

  return (
    <>
      <PageHeader
        title="Overview"
        description="A high-level summary of your application."
        actions={<ReferenceDrawerButton onClick={drawer.onOpen} />}
      />
      <EmptyState
        title="Welcome to Overview"
        description="This is what your generated dashboard looks like out of the box. Add pages and navigation items via your dashboard.yaml manifest."
        icon={<Icon name="home" size="xl" />}
      />
      <ReferenceDrawer open={drawer.open} onClose={drawer.onClose} />
    </>
  );
}
