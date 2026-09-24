import React from 'react';
import Typography from '@mui/material/Typography';
import { formTokens } from './tokens';

const { colors, typography, spacing } = formTokens;

export interface FormSectionLabelProps {
  children: React.ReactNode;
}

export function FormSectionLabel({ children }: FormSectionLabelProps) {
  return (
    <Typography
      sx={{
        fontSize: typography.sectionLabel.size,
        fontWeight: typography.sectionLabel.weight,
        lineHeight: typography.sectionLabel.lineHeight,
        letterSpacing: typography.sectionLabel.letterSpacing,
        textTransform: typography.sectionLabel.textTransform,
        color: colors.textSecondary,
        mt: `${spacing.sm}px`,
        mb: `${spacing.md}px`,
        fontFamily: typography.fontFamily,
      }}
    >
      {children}
    </Typography>
  );
}
