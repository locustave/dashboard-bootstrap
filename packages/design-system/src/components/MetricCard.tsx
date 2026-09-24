import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppCard } from './AppCard';
import { tokens } from '../tokens';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const { colors, spacing, icon } = tokens;

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: TrendDirection;
    value: string;
  };
  onClick?: () => void;
}

const trendConfig = {
  up: { color: colors.status.success, Icon: TrendingUp },
  down: { color: colors.status.error, Icon: TrendingDown },
  neutral: { color: colors.text.secondary, Icon: Minus },
} as const;

export function MetricCard({ label, value, trend, onClick }: MetricCardProps) {
  return (
    <AppCard interactive={!!onClick} onClick={onClick}>
      <Typography
        sx={{
          fontSize: tokens.type.caption.size,
          fontWeight: tokens.type.caption.weight,
          lineHeight: `${tokens.type.caption.lineHeight}px`,
          color: colors.text.secondary,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          color: colors.text.primary,
          mt: `${spacing.xs}px`,
        }}
      >
        {value}
      </Typography>
      {trend && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: `${spacing.xs}px`,
            mt: `${spacing.xs}px`,
          }}
        >
          {React.createElement(trendConfig[trend.direction].Icon, {
            size: icon.sm,
            color: trendConfig[trend.direction].color,
          })}
          <Typography
            sx={{
              fontSize: tokens.type.bodySmall.size,
              fontWeight: tokens.type.bodySmall.weight,
              color: trendConfig[trend.direction].color,
            }}
          >
            {trend.value}
          </Typography>
        </Box>
      )}
    </AppCard>
  );
}
