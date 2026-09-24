import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { tokens } from '../tokens';

const { colors, spacing } = tokens;

export type LoadingVariant = 'spinner' | 'skeleton';

export interface LoadingStateProps {
  variant?: LoadingVariant;
  rows?: number;
}

export function LoadingState({ variant = 'skeleton', rows = 3 }: LoadingStateProps) {
  if (variant === 'spinner') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: `${spacing['3xl']}px`,
        }}
      >
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${spacing.sm}px` }}>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={44}
          sx={{ borderRadius: `${tokens.radius.md}px` }}
        />
      ))}
    </Box>
  );
}
