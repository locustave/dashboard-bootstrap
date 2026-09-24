import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Content/MetricCard',
  component: MetricCard,
  args: { label: 'Revenue', value: '$48,352' },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {};
