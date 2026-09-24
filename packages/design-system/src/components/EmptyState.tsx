import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { tokens } from '../tokens';

const { colors, spacing, type: typeTokens } = tokens;

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: `${spacing['3xl']}px`,
        px: `${spacing.xl}px`,
      }}
    >
      {icon && (
        <Box sx={{ mb: `${spacing.base}px`, color: colors.text.muted }}>
          {icon}
        </Box>
      )}
      <Typography
        component="h2"
        sx={{
          fontSize: typeTokens.sectionHeading.size,
          fontWeight: typeTokens.sectionHeading.weight,
          lineHeight: `${typeTokens.sectionHeading.lineHeight}px`,
          color: colors.text.primary,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            fontSize: typeTokens.body.size,
            color: colors.text.secondary,
            mt: `${spacing.xs}px`,
            maxWidth: 400,
          }}
        >
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction} sx={{ mt: `${spacing.xl}px` }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
