import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, input, radius, spacing } = formTokens;

export interface FieldLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}

export function FieldLabel({ children, htmlFor, required }: FieldLabelProps) {
  return (
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
      {children}
      {required && (
        <Box component="span" sx={{ color: colors.error, ml: '2px' }}>*</Box>
      )}
    </Typography>
  );
}

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ error, style, ...props }, ref) {
    const tc = useThemeColors();
    return (
      <Box
        component="input"
        ref={ref}
        {...props}
        sx={{
          width: '100%',
          height: `${input.height}px`,
          px: `${input.paddingX}px`,
          border: `${input.borderWidth}px solid ${error ? colors.error : colors.border}`,
          borderRadius: `${radius.medium}px`,
          backgroundColor: colors.surface,
          fontSize: typography.inputText.size,
          fontWeight: typography.inputText.weight,
          fontFamily: typography.fontFamily,
          color: colors.textPrimary,
          outline: 'none',
          boxSizing: 'border-box',
          '&::placeholder': {
            color: colors.placeholder,
          },
          '&:hover': {
            borderColor: error ? colors.error : colors.borderStrong,
          },
          '&:focus': {
            borderColor: tc.primary,
            boxShadow: `0 0 0 1px ${tc.primary}`,
          },
          '&:disabled': {
            backgroundColor: '#F5F5F7',
            color: colors.disabled,
            cursor: 'not-allowed',
          },
          ...style,
        }}
      />
    );
  }
);

export interface FieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  trailingIcon?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export function Field({
  label,
  placeholder,
  value,
  onChange,
  trailingIcon,
  error,
  required,
  disabled,
  id,
}: FieldProps) {
  const tc = useThemeColors();
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          height: `${input.height}px`,
          border: `${input.borderWidth}px solid ${error ? colors.error : colors.border}`,
          borderRadius: `${radius.medium}px`,
          backgroundColor: colors.surface,
          px: `${input.paddingX}px`,
          '&:hover': {
            borderColor: error ? colors.error : colors.borderStrong,
          },
          '&:focus-within': {
            borderColor: tc.primary,
            boxShadow: `0 0 0 1px ${tc.primary}`,
          },
        }}
      >
        <FieldLabel htmlFor={fieldId} required={required}>
          {label}
        </FieldLabel>
        <Box
          component="input"
          id={fieldId}
          value={value}
          onChange={onChange ? (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          sx={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: typography.inputText.size,
            fontWeight: typography.inputText.weight,
            fontFamily: typography.fontFamily,
            color: colors.textPrimary,
            ml: `${spacing.md}px`,
            height: '100%',
            '&::placeholder': {
              color: colors.placeholder,
            },
            '&:disabled': {
              color: colors.disabled,
              cursor: 'not-allowed',
            },
          }}
        />
        {trailingIcon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: colors.textMuted,
              flexShrink: 0,
              ml: `${spacing.sm}px`,
            }}
          >
            {trailingIcon}
          </Box>
        )}
      </Box>
      {error && (
        <Typography
          sx={{
            fontSize: typography.smallMeta.size,
            color: colors.error,
            mt: `${spacing.xs}px`,
            fontFamily: typography.fontFamily,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
