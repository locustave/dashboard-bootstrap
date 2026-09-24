import React from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../tokens';

const { colors, layout } = tokens;

export interface PageProps {
  children: React.ReactNode;
  variant?: 'default' | 'full-bleed';
}

export function Page({ children, variant = 'default' }: PageProps) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        bgcolor: colors.background.app,
        overflowY: 'auto',
        ...(variant === 'default'
          ? {
              px: `${layout.page.paddingX}px`,
              pt: `${layout.page.paddingTop}px`,
              pb: `${layout.page.paddingX}px`,
            }
          : {}),
      }}
    >
      {children}
    </Box>
  );
}
