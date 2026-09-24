import React from 'react';
import { EmptyStateTemplate } from '@dashboard-bootstrap/templates';

export default function GettingStartedPage() {
  return (
    <EmptyStateTemplate
      title="Welcome to Dashboard Bootstrap"
      description="This is a reference application demonstrating all available page templates. Explore the navigation to see each pattern in action."
      actionLabel="View Documentation"
      onAction={() => alert('Opening docs...')}
    />
  );
}
