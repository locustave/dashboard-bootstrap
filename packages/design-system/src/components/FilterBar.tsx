import React from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../tokens';

const { spacing } = tokens;

export interface FilterBarProps {
  children: React.ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: `${spacing.sm}px`,
        mb: `${spacing.base}px`,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </Box>
  );
}
