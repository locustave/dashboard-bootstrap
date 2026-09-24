import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';
import { tokens } from '../tokens';
import { formTokens } from '../form/tokens';
import { useThemeColors } from '../form/ThemeContext';
import { Icon } from './Icon';
import type { IconSize } from './Icon';

const { colors, spacing, elevation, type: typeTokens, icon: iconTokens } = tokens;
const ft = formTokens;

export type DrawerSize = 'sm' | 'md' | 'lg';

const drawerWidths: Record<DrawerSize, number> = {
  sm: 480,
  md: 740,
  lg: 960,
};

export interface DrawerAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: string;
  disabled?: boolean;
}

export interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string;
  iconSize?: IconSize;
  size?: DrawerSize;
  children: React.ReactNode;
  actions?: DrawerAction[];
  /** @deprecated Use actions prop instead. Raw footer node for custom layouts. */
  footer?: React.ReactNode;
}

export function AppDrawer({
  open,
  onClose,
  title,
  subtitle,
  icon: iconName,
  iconSize = 'lg',
  size = 'md',
  children,
  actions,
  footer,
}: AppDrawerProps) {
  const tc = useThemeColors();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: drawerWidths[size],
            maxWidth: '100vw',
            boxShadow: elevation.high,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: colors.background.surface,
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: `${spacing.md}px`,
          px: `${spacing.xl}px`,
          pt: `${spacing.xl}px`,
          pb: `${spacing.base}px`,
          borderBottom: `1px solid ${colors.border.default}`,
          flexShrink: 0,
        }}
      >
        {iconName && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: `${ft.radius.medium}px`,
              bgcolor: tc.primarySoft,
              color: tc.primary,
              flexShrink: 0,
              mt: '2px',
            }}
          >
            <Icon name={iconName} size={iconSize} />
          </Box>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: typeTokens.sectionHeading.size,
              fontWeight: typeTokens.sectionHeading.weight,
              lineHeight: `${typeTokens.sectionHeading.lineHeight}px`,
              letterSpacing: typeTokens.sectionHeading.letterSpacing,
              color: colors.text.primary,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                fontSize: typeTokens.body.size,
                fontWeight: typeTokens.body.weight,
                lineHeight: `${typeTokens.body.lineHeight}px`,
                color: colors.text.secondary,
                mt: `${spacing.xxs}px`,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="Close drawer"
          size="small"
          sx={{
            color: colors.text.secondary,
            '&:hover': { color: colors.text.primary },
          }}
        >
          <X size={iconTokens.md} />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: `${spacing.xl}px`, py: `${spacing.xl}px` }}>
        {children}
      </Box>

      {/* Footer */}
      {(actions || footer) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: `${spacing.md}px`,
            borderTop: `1px solid ${colors.border.default}`,
            px: `${spacing.xl}px`,
            py: `${spacing.base}px`,
            flexShrink: 0,
          }}
        >
          {footer ?? actions?.map((action) => (
            <Button
              key={action.label}
              onClick={action.onClick}
              disabled={action.disabled}
              variant={action.variant === 'primary' ? 'contained' : 'outlined'}
              disableElevation
              startIcon={action.icon ? <Icon name={action.icon} size="sm" /> : undefined}
              sx={{
                textTransform: 'none',
                fontWeight: typeTokens.button.weight,
                fontSize: typeTokens.button.size,
                fontFamily: ft.typography.fontFamily,
                borderRadius: `${ft.radius.medium}px`,
                px: `${spacing.lg}px`,
                py: `${spacing.sm}px`,
                ...(action.variant === 'primary'
                  ? {
                      bgcolor: tc.primary,
                      color: '#FFFFFF',
                      '&:hover': { bgcolor: tc.primaryHover },
                    }
                  : {
                      borderColor: ft.colors.border,
                      color: ft.colors.textPrimary,
                      '&:hover': {
                        borderColor: ft.colors.borderStrong,
                        bgcolor: colors.background.surfaceHover,
                      },
                    }),
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}
    </Drawer>
  );
}
