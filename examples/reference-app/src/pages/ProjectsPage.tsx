import React from 'react';
import { EmptyState, PageHeader, Icon } from '@dashboard-bootstrap/design-system';
import { ReferenceDrawer, ReferenceDrawerButton, useReferenceDrawer } from '../components/ReferenceDrawer';

export default function ProjectsPage() {
  const drawer = useReferenceDrawer();

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage and organize your projects."
        actions={<ReferenceDrawerButton onClick={drawer.onOpen} />}
      />
      <EmptyState
        title="Welcome to Projects"
        description="This is what your generated dashboard looks like out of the box. Add pages and navigation items via your dashboard.yaml manifest."
        icon={<Icon name="folder" size="xl" />}
      />
      <ReferenceDrawer open={drawer.open} onClose={drawer.onClose} />
    </>
  );
}
