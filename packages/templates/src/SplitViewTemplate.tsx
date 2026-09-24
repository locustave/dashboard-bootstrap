import React from 'react';
import { PageHeader, EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface SplitViewTemplateProps {
  title: string;
  description?: string;
  listPanel?: React.ReactNode;
  detailPanel?: React.ReactNode;
  hasSelection?: boolean;
  emptyDetailMessage?: string;
}

export function SplitViewTemplate({
  title,
  description,
  listPanel,
  detailPanel,
  hasSelection = false,
  emptyDetailMessage = 'Select an item to view details',
}: SplitViewTemplateProps) {
  if (!listPanel && !detailPanel) {
    return (
      <>
        <PageHeader title={title} description={description} />
        <EmptyState
          title={`This is the ${title} page`}
          description="Add a list panel and detail panel to build your split view."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title={title} description={description} />
      <Box
        sx={{
          display: 'flex',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          overflow: 'hidden',
          minHeight: 400,
        }}
      >
        {/* List panel */}
        <Box sx={{ width: '45%', borderRight: '1px solid', borderColor: 'divider', overflowY: 'auto' }}>
          {listPanel}
        </Box>

        {/* Detail panel */}
        <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: 'background.paper' }}>
          {hasSelection ? (
            detailPanel
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: '24px',
              }}
            >
              <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                {emptyDetailMessage}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
