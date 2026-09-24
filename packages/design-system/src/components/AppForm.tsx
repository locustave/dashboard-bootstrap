import React from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../tokens';

const { spacing } = tokens;

export interface AppFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export function AppForm({ children, onSubmit }: AppFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.lg}px`,
      }}
    >
      {children}
    </Box>
  );
}
