import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';
import { tokens } from '../tokens';

const { colors, spacing, radius, elevation, layout, icon } = tokens;

export type DialogSize = 'sm' | 'md' | 'lg';

const dialogWidths: Record<DialogSize, number> = {
  sm: layout.dialog.widthSm,
  md: layout.dialog.widthMd,
  lg: layout.dialog.widthLg,
};

export interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: DialogSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
  destructive?: boolean;
}

export function AppDialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  destructive = false,
}: AppDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={destructive ? undefined : onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: dialogWidths[size],
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: '85vh',
            borderRadius: `${radius.lg}px`,
            boxShadow: elevation.medium,
            display: 'flex',
            flexDirection: 'column',
          },
        },
        backdrop: {
          sx: {
            bgcolor: colors.background.overlay,
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          px: `${spacing.xl}px`,
          pt: `${spacing.xl}px`,
          pb: `${spacing.base}px`,
          flexShrink: 0,
        }}
      >
        <Box>
          {title && (
            <Typography
              component="h2"
              id="dialog-title"
              sx={{
                fontSize: tokens.type.sectionHeading.size,
                fontWeight: tokens.type.sectionHeading.weight,
                lineHeight: `${tokens.type.sectionHeading.lineHeight}px`,
                color: colors.text.primary,
              }}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              sx={{
                fontSize: tokens.type.body.size,
                color: colors.text.secondary,
                mt: `${spacing.xs}px`,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <X size={icon.md} />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: `${spacing.xl}px`, pb: `${spacing.xl}px` }}>
        {children}
      </Box>

      {/* Footer */}
      {footer && (
        <Box
          sx={{
            borderTop: `1px solid ${colors.border.default}`,
            px: `${spacing.xl}px`,
            py: `${spacing.base}px`,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: `${spacing.sm}px`,
            flexShrink: 0,
          }}
        >
          {footer}
        </Box>
      )}
    </Dialog>
  );
}
