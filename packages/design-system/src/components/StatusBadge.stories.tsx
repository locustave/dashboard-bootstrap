import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Content/StatusBadge',
  component: StatusBadge,
  args: { label: 'Active', variant: 'success' },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {};
