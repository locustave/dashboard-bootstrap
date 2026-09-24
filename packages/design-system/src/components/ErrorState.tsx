import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AlertCircle } from 'lucide-react';
import { tokens } from '../tokens';

const { colors, spacing, icon, type: typeTokens } = tokens;

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  retryLabel = 'Try again',
}: ErrorStateProps) {
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
      <Box sx={{ mb: `${spacing.base}px` }}>
        <AlertCircle size={icon.lg} color={colors.status.error} />
      </Box>
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
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry} sx={{ mt: `${spacing.xl}px` }}>
          {retryLabel}
        </Button>
      )}
    </Box>
  );
}
