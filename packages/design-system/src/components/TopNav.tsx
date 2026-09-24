import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../tokens';

const { colors, layout, type: typeTokens } = tokens;

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TopNavProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbClick?: (href: string) => void;
  actions?: React.ReactNode;
}

export function TopNav({ breadcrumbs, onBreadcrumbClick, actions }: TopNavProps) {
  return (
    <Box
      component="header"
      sx={{
        height: layout.header.height,
        display: 'flex',
        alignItems: 'center',
        px: `${layout.page.paddingX}px`,
        bgcolor: colors.background.surface,
        borderBottom: `1px solid ${colors.border.default}`,
        flexShrink: 0,
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Box component="nav" aria-label="Breadcrumb" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <Typography
                    component="span"
                    sx={{
                      fontSize: typeTokens.bodySmall.size,
                      color: colors.text.muted,
                      mx: '2px',
                    }}
                  >
                    /
                  </Typography>
                )}
                <Typography
                  component={crumb.href && !isLast ? 'a' : 'span'}
                  {...(crumb.href && !isLast
                    ? {
                        href: crumb.href,
                        onClick: (e: React.MouseEvent) => {
                          e.preventDefault();
                          onBreadcrumbClick?.(crumb.href!);
                        },
                      }
                    : {})}
                  sx={{
                    fontSize: typeTokens.bodySmall.size,
                    fontWeight: typeTokens.bodySmall.weight,
                    color: isLast ? colors.text.primary : colors.text.secondary,
                    textDecoration: 'none',
                    cursor: crumb.href && !isLast ? 'pointer' : 'default',
                    '&:hover': crumb.href && !isLast ? { color: colors.action.primary } : {},
                  }}
                >
                  {crumb.label}
                </Typography>
              </React.Fragment>
            );
          })}
        </Box>
      )}

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Actions (search, notifications, user avatar) */}
      {actions && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {actions}
        </Box>
      )}
    </Box>
  );
}
