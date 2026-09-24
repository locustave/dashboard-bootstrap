import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableTemplate } from './TableTemplate';

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
}

const columns = [
  { id: 'name' as const, label: 'Name' },
  { id: 'email' as const, label: 'Email' },
];

const rows: Row[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

const meta: Meta<typeof TableTemplate<Row>> = {
  title: 'Templates/TableTemplate',
  component: TableTemplate,
  args: { title: 'Users', columns, rows, getRowKey: (r: Row) => r.id },
};

export default meta;
type Story = StoryObj<typeof TableTemplate<Row>>;

export const Default: Story = {};

export const Empty: Story = {
  args: { rows: [], emptyTitle: 'No users', emptyDescription: 'Create your first user.' },
};
