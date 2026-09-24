import React from 'react';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';

export interface PrimaryActionProps extends Omit<ButtonProps, 'variant' | 'color'> {
  children: React.ReactNode;
}

export function PrimaryAction({ children, ...props }: PrimaryActionProps) {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
}
