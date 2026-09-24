import React from 'react';
import { PageHeader, AppCard, EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';

export interface DetailSection {
  title: string;
  content: React.ReactNode;
}

export interface DetailTemplateProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
  sections?: DetailSection[];
  children?: React.ReactNode;
}

export function DetailTemplate({
  title,
  description,
  actions,
  tabs,
  sections,
  children,
}: DetailTemplateProps) {
  return (
    <>
      <PageHeader title={title} description={description} actions={actions} tabs={tabs} />
      {sections
        ? sections.map((section, i) => (
            <Box key={i} sx={{ mb: '24px' }}>
              <AppCard title={section.title}>{section.content}</AppCard>
            </Box>
          ))
        : children || (
            <EmptyState
              title={`This is the ${title} page`}
              description="Add sections or content to populate this detail view."
            />
          )}
    </>
  );
}
