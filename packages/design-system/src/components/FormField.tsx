import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formTokens } from '../form/tokens';
import { useThemeColors } from '../form/ThemeContext';

const { colors, spacing, radius, typography } = formTokens;

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

export function FormField({ label, required, error, helpText, children, htmlFor }: FormFieldProps) {
  const tc = useThemeColors();
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.md}px` }}>
        <Typography
          component="label"
          htmlFor={htmlFor}
          sx={{
            fontSize: typography.inputLabel.size,
            fontWeight: typography.inputLabel.weight,
            lineHeight: typography.inputLabel.lineHeight,
            color: colors.textPrimary,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            fontFamily: typography.fontFamily,
          }}
        >
          {label}
          {required && (
            <Box component="span" sx={{ color: colors.error, ml: '2px' }}>
              *
            </Box>
          )}
        </Typography>
        <Box
          sx={{
            flex: 1,
            '& .MuiTextField-root': { width: '100%' },
            '& .MuiOutlinedInput-root': {
              borderRadius: `${radius.medium}px`,
              '& fieldset': {
                borderColor: colors.border,
              },
              '&:hover fieldset': {
                borderColor: colors.borderStrong,
              },
              '&.Mui-focused fieldset': {
                borderColor: tc.primary,
                borderWidth: 1,
                boxShadow: `0 0 0 1px ${tc.primary}`,
              },
            },
            '& .MuiOutlinedInput-input': {
              py: `${spacing.sm}px`,
              px: `${spacing.md}px`,
              fontSize: typography.inputText.size,
              fontFamily: typography.fontFamily,
              color: colors.textPrimary,
              '&::placeholder': {
                color: colors.placeholder,
                opacity: 1,
              },
            },
            '& .MuiInputBase-multiline': {
              py: 0,
            },
          }}
        >
          {children}
        </Box>
      </Box>
      {error ? (
        <Typography
          sx={{
            fontSize: typography.smallMeta.size,
            lineHeight: typography.smallMeta.lineHeight,
            color: colors.error,
            mt: `${spacing.xs}px`,
            fontFamily: typography.fontFamily,
          }}
        >
          {error}
        </Typography>
      ) : helpText ? (
        <Typography
          sx={{
            fontSize: typography.smallMeta.size,
            lineHeight: typography.smallMeta.lineHeight,
            color: colors.textSecondary,
            mt: `${spacing.xs}px`,
            fontFamily: typography.fontFamily,
          }}
        >
          {helpText}
        </Typography>
      ) : null}
    </Box>
  );
}
