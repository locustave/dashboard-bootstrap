import React from 'react';
import { PageHeader, AppCard, FilterBar, EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface CatalogItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface CatalogTemplateProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  items?: CatalogItem[];
  onItemClick?: (item: CatalogItem) => void;
  emptyState?: React.ReactNode;
}

export function CatalogTemplate({
  title,
  description,
  actions,
  filters,
  items = [],
  onItemClick,
  emptyState,
}: CatalogTemplateProps) {
  return (
    <>
      <PageHeader title={title} description={description} actions={actions} />
      {filters && <FilterBar>{filters}</FilterBar>}
      {items.length === 0 ? (
        emptyState || (
          <EmptyState
            title={`This is the ${title} page`}
            description="Add items to get started."
          />
        )
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {items.map((item) => (
            <AppCard
              key={item.id}
              interactive={!!onItemClick}
              onClick={() => onItemClick?.(item)}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {item.icon && (
                  <Box sx={{ flexShrink: 0, color: 'text.secondary' }}>{item.icon}</Box>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                    {item.badge}
                  </Box>
                  {item.description && (
                    <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: '4px' }}>
                      {item.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </AppCard>
          ))}
        </Box>
      )}
    </>
  );
}
