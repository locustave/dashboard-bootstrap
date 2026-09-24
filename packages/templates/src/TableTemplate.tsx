import React from 'react';
import { PageHeader, FilterBar, AppDataTable, EmptyState } from '@dashboard-bootstrap/design-system';
import type { ColumnDef, SortDirection } from '@dashboard-bootstrap/design-system';

export interface TableTemplateProps<T extends Record<string, unknown>> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  columns?: ColumnDef<T>[];
  rows?: T[];
  getRowKey?: (row: T) => string | number;
  onSort?: (columnId: string, direction: SortDirection) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; onClick: () => void };
}

export function TableTemplate<T extends Record<string, unknown>>({
  title,
  description,
  actions,
  filters,
  columns = [],
  rows = [],
  getRowKey = ((row: T) => (row as Record<string, unknown>).id as string) as (row: T) => string | number,
  onSort,
  sortColumn,
  sortDirection,
  onRowClick,
  emptyTitle = 'No items yet',
  emptyDescription,
  emptyAction,
}: TableTemplateProps<T>) {
  if (columns.length === 0) {
    return (
      <>
        <PageHeader title={title} description={description} actions={actions} />
        <EmptyState
          title={`This is the ${title} page`}
          description="Define columns and provide data to populate this table."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title={title} description={description} actions={actions} />
      {filters && <FilterBar>{filters}</FilterBar>}
      <AppDataTable
        columns={columns}
        rows={rows}
        getRowKey={getRowKey}
        onSort={onSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onRowClick={onRowClick}
        emptyState={
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={emptyAction?.label}
            onAction={emptyAction?.onClick}
          />
        }
      />
    </>
  );
}
