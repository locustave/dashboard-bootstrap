import React from 'react';
import Box from '@mui/material/Box';
import { formTokens } from './tokens';

const { colors, shell, spacing } = formTokens;

export interface FormShellProps {
  children: React.ReactNode;
}

export function FormShell({ children }: FormShellProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.pageBackground,
        display: 'flex',
        justifyContent: 'center',
        py: `${spacing.section}px`,
        px: `${spacing.lg}px`,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: shell.maxWidth,
          backgroundColor: colors.surface,
          borderRadius: '2px',
          px: {
            xs: `${shell.padding.mobile}px`,
            sm: `${shell.padding.tablet}px`,
            md: `${shell.padding.desktop}px`,
          },
          py: `${spacing.xxl}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export interface FormStackProps {
  children: React.ReactNode;
  gap?: number;
}

export function FormStack({ children, gap = spacing.xl }: FormStackProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${gap}px`,
      }}
    >
      {children}
    </Box>
  );
}
