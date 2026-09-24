import React from 'react';
import { PageHeader, EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';

export interface BuilderTemplateProps {
  title: string;
  toolbar?: React.ReactNode;
  canvas?: React.ReactNode;
  propertiesPanel?: React.ReactNode;
}

export function BuilderTemplate({
  title,
  toolbar,
  canvas,
  propertiesPanel,
}: BuilderTemplateProps) {
  if (!toolbar && !canvas) {
    return (
      <>
        <PageHeader title={title} />
        <EmptyState
          title={`This is the ${title} page`}
          description="Add a toolbar and canvas to build your editor."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title={title} />
      {toolbar && <Box sx={{ mb: '8px' }}>{toolbar}</Box>}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          overflow: 'hidden',
          minHeight: 400,
        }}
      >
        <Box sx={{ flex: 1, overflow: 'auto' }}>{canvas}</Box>
        {propertiesPanel && (
          <Box
            sx={{
              width: 400,
              borderLeft: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflowY: 'auto',
              p: '24px',
            }}
          >
            {propertiesPanel}
          </Box>
        )}
      </Box>
    </>
  );
}
