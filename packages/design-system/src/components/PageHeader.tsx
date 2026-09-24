import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../tokens';

const { colors, spacing, type: typeTokens } = tokens;

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
}

export function PageHeader({ title, description, actions, tabs }: PageHeaderProps) {
  return (
    <Box sx={{ mb: `${spacing.xl}px` }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: typeTokens.pageTitle.size,
              fontWeight: typeTokens.pageTitle.weight,
              lineHeight: `${typeTokens.pageTitle.lineHeight}px`,
              letterSpacing: typeTokens.pageTitle.letterSpacing,
              color: colors.text.primary,
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              sx={{
                fontSize: typeTokens.body.size,
                fontWeight: typeTokens.body.weight,
                lineHeight: `${typeTokens.body.lineHeight}px`,
                color: colors.text.secondary,
                mt: `${spacing.xs}px`,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {actions && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.sm}px`, flexShrink: 0 }}>
            {actions}
          </Box>
        )}
      </Box>
      {tabs && <Box sx={{ mt: `${spacing.base}px` }}>{tabs}</Box>}
    </Box>
  );
}
