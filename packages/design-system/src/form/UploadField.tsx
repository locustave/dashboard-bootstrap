import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Upload } from 'lucide-react';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, radius, spacing, upload } = formTokens;

export interface UploadFieldProps {
  label?: string;
  optional?: boolean;
  accept?: string;
  onFiles?: (files: FileList) => void;
  disabled?: boolean;
}

export function UploadField({ label, optional, accept, onFiles, disabled }: UploadFieldProps) {
  const tc = useThemeColors();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      onFiles?.(e.dataTransfer.files);
    }
  }, [disabled, onFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFiles?.(e.target.files);
    }
  }, [onFiles]);

  return (
    <Box>
      {label && (
        <Typography
          sx={{
            fontSize: typography.inputLabel.size,
            fontWeight: typography.inputLabel.weight,
            color: colors.textPrimary,
            mb: `${spacing.md}px`,
            fontFamily: typography.fontFamily,
          }}
        >
          {label}
          {optional && (
            <Box component="span" sx={{ color: colors.textMuted, fontWeight: 400, ml: '4px' }}>
              (optional)
            </Box>
          )}
        </Typography>
      )}
      <Box
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        sx={{
          height: upload.height,
          border: `1px dashed ${isDragging ? tc.primary : '#BFC0C6'}`,
          borderRadius: `${radius.medium}px`,
          backgroundColor: isDragging ? tc.primarySoft : colors.surface,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: `${spacing.sm}px`,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          outline: 'none',
          '&:hover:not(:disabled)': {
            borderColor: tc.primary,
            backgroundColor: tc.primarySoft,
          },
          '&:focus-visible': {
            borderColor: tc.primary,
            boxShadow: `0 0 0 1px ${tc.primary}`,
          },
        }}
      >
        <Upload size={upload.iconSize} color={tc.primary} />
        <Typography
          sx={{
            fontSize: typography.description.size,
            color: colors.textSecondary,
            fontFamily: typography.fontFamily,
          }}
        >
          <Box
            component="span"
            sx={{
              color: tc.primary,
              textDecoration: 'underline',
              fontWeight: 500,
            }}
          >
            Click to upload
          </Box>
          {' '}or drag and drop
        </Typography>
      </Box>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
    </Box>
  );
}
