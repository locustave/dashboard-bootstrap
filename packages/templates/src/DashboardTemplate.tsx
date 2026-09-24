import React from 'react';
import { PageHeader, MetricCard, AppCard, EmptyState } from '@dashboard-bootstrap/design-system';
import type { TrendDirection } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';

export interface MetricItem {
  label: string;
  value: string | number;
  trend?: { direction: TrendDirection; value: string };
}

export interface DashboardTemplateProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  metrics?: MetricItem[];
  charts?: React.ReactNode;
  activity?: React.ReactNode;
}

export function DashboardTemplate({
  title,
  description,
  actions,
  metrics,
  charts,
  activity,
}: DashboardTemplateProps) {
  const hasContent = (metrics && metrics.length > 0) || charts || activity;

  return (
    <>
      <PageHeader title={title} description={description} actions={actions} />
      {!hasContent && (
        <EmptyState
          title={`This is the ${title} page`}
          description="Add metrics, charts, or an activity feed to populate this dashboard."
        />
      )}
      {metrics && metrics.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, 1fr)`,
            gap: '24px',
            mb: '24px',
          }}
        >
          {metrics.map((m, i) => (
            <MetricCard key={i} label={m.label} value={m.value} trend={m.trend} />
          ))}
        </Box>
      )}
      {charts && (
        <Box sx={{ mb: '24px' }}>
          {charts}
        </Box>
      )}
      {activity && (
        <AppCard title="Recent Activity">
          {activity}
        </AppCard>
      )}
    </>
  );
}
