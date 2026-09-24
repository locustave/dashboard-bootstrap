import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Check } from 'lucide-react';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, input, radius, spacing } = formTokens;

export interface SummaryFieldProps {
  label: string;
  value: string;
  completed?: boolean;
  editable?: boolean;
  onEdit?: () => void;
}

export function SummaryField({ label, value, completed, editable, onEdit }: SummaryFieldProps) {
  const tc = useThemeColors();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: `${input.height}px`,
        border: `${input.borderWidth}px solid ${colors.border}`,
        borderRadius: `${radius.medium}px`,
        backgroundColor: colors.surface,
        px: `${input.paddingX}px`,
        cursor: editable ? 'pointer' : 'default',
        '&:hover': editable ? { borderColor: colors.borderStrong } : undefined,
      }}
      onClick={editable ? onEdit : undefined}
      role={editable ? 'button' : undefined}
      tabIndex={editable ? 0 : undefined}
      onKeyDown={editable ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit?.();
        }
      } : undefined}
    >
      <Typography
        sx={{
          fontSize: typography.inputLabel.size,
          fontWeight: typography.inputLabel.weight,
          color: colors.textPrimary,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          fontFamily: typography.fontFamily,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          flex: 1,
          fontSize: typography.inputText.size,
          fontWeight: typography.inputText.weight,
          color: colors.textPrimary,
          ml: `${spacing.md}px`,
          fontFamily: typography.fontFamily,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </Typography>
      {completed && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: tc.primary,
            flexShrink: 0,
            ml: `${spacing.sm}px`,
          }}
        >
          <Check size={18} strokeWidth={2.5} />
        </Box>
      )}
    </Box>
  );
}
