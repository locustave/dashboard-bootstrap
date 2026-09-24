import React, { useState, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { tokens } from '../tokens';

const { colors } = tokens;

export type SortDirection = 'asc' | 'desc';

export interface ColumnDef<T> {
  id: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
}

export interface AppDataTableProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  onSort?: (columnId: string, direction: SortDirection) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  emptyState?: React.ReactNode;
  onRowClick?: (row: T) => void;
}

export function AppDataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowKey,
  onSort,
  sortColumn,
  sortDirection,
  emptyState,
  onRowClick,
}: AppDataTableProps<T>) {
  const handleSort = useCallback(
    (columnId: string) => {
      if (!onSort) return;
      const newDirection: SortDirection =
        sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(columnId, newDirection);
    },
    [onSort, sortColumn, sortDirection],
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} align={col.align || 'left'}>
                {col.sortable && onSort ? (
                  <TableSortLabel
                    active={sortColumn === col.id}
                    direction={sortColumn === col.id ? sortDirection : 'asc'}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && emptyState ? (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: 'center', py: 6 }}>
                {emptyState}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={getRowKey(row)}
                hover
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || 'left'}>
                    {col.render ? col.render(row) : (row[col.id] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
