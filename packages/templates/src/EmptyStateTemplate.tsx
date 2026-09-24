import React from 'react';
import { EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';

export interface EmptyStateTemplateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyStateTemplate({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateTemplateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
      }}
    >
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    </Box>
  );
}
