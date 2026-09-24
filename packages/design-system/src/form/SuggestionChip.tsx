import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, radius, spacing } = formTokens;

export interface SuggestionChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function SuggestionChip({ children, selected, onClick, disabled }: SuggestionChipProps) {
  const tc = useThemeColors();
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: '14px',
        py: '8px',
        fontSize: typography.description.size,
        fontWeight: typography.description.weight,
        fontFamily: typography.fontFamily,
        lineHeight: typography.description.lineHeight,
        color: selected ? tc.primary : colors.textPrimary,
        backgroundColor: selected ? tc.primarySoft : colors.surface,
        border: `1px solid ${selected ? tc.primary : colors.border}`,
        borderRadius: `${radius.small}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        outline: 'none',
        whiteSpace: 'nowrap',
        '&:hover:not(:disabled)': {
          borderColor: selected ? tc.primary : colors.borderStrong,
        },
        '&:focus-visible': {
          borderColor: tc.primary,
          boxShadow: `0 0 0 1px ${tc.primary}`,
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          fontWeight: 'inherit',
          fontFamily: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export interface SuggestionGroupProps {
  children: React.ReactNode;
}

export function SuggestionGroup({ children }: SuggestionGroupProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${spacing.sm}px`,
      }}
    >
      {children}
    </Box>
  );
}
