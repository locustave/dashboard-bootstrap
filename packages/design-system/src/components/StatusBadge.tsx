import React from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../tokens';

const { colors, spacing, radius } = tokens;

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface StatusBadgeProps {
  label: string;
  variant: StatusVariant;
  showDot?: boolean;
}

const variantStyles: Record<StatusVariant, { color: string; bg: string; dot: string }> = {
  success: { color: colors.status.success, bg: colors.status.successMuted, dot: colors.status.success },
  warning: { color: colors.status.warning, bg: colors.status.warningMuted, dot: colors.status.warning },
  error: { color: colors.status.error, bg: colors.status.errorMuted, dot: colors.status.error },
  info: { color: colors.status.info, bg: colors.status.infoMuted, dot: colors.status.info },
  neutral: { color: colors.text.secondary, bg: colors.neutral[100], dot: colors.neutral[400] },
};

export function StatusBadge({ label, variant, showDot = false }: StatusBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${spacing.xs}px`,
        px: `${spacing.sm}px`,
        py: `${spacing.xxs}px`,
        borderRadius: `${radius.full}px`,
        bgcolor: styles.bg,
        color: styles.color,
        fontSize: tokens.type.caption.size,
        fontWeight: 500,
        lineHeight: `${tokens.type.caption.lineHeight}px`,
      }}
    >
      {showDot && (
        <Box
          component="span"
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: styles.dot,
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </Box>
  );
}
