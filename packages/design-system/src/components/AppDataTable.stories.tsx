import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppDataTable } from './AppDataTable';

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { id: 'name' as const, label: 'Name' },
  { id: 'email' as const, label: 'Email' },
  { id: 'role' as const, label: 'Role' },
];

const rows: Row[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Carol', email: 'carol@example.com', role: 'Viewer' },
];

const meta: Meta<typeof AppDataTable<Row>> = {
  title: 'Content/AppDataTable',
  component: AppDataTable,
  args: { columns, rows, getRowKey: (r: Row) => r.id },
};

export default meta;
type Story = StoryObj<typeof AppDataTable<Row>>;

export const Default: Story = {};
