import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../tokens';

const { colors, spacing, radius, elevation } = tokens;

export interface AppCardProps {
  children: React.ReactNode;
  title?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function AppCard({ children, title, interactive = false, onClick }: AppCardProps) {
  return (
    <Box
      onClick={interactive ? onClick : undefined}
      sx={{
        bgcolor: colors.background.surface,
        border: `1px solid ${colors.border.default}`,
        borderRadius: `${radius.lg}px`,
        boxShadow: elevation.none,
        p: `${spacing.xl}px`,
        ...(interactive
          ? {
              cursor: 'pointer',
              '&:hover': {
                bgcolor: colors.background.surfaceHover,
                borderColor: colors.border.strong,
              },
            }
          : {}),
      }}
    >
      {title && (
        <Typography
          component="h3"
          sx={{
            fontSize: tokens.type.cardTitle.size,
            fontWeight: tokens.type.cardTitle.weight,
            lineHeight: `${tokens.type.cardTitle.lineHeight}px`,
            color: colors.text.primary,
            mb: `${spacing.base}px`,
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}
