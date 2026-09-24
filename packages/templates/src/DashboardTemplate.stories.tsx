import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardTemplate } from './DashboardTemplate';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof DashboardTemplate> = {
  title: 'Templates/DashboardTemplate',
  component: DashboardTemplate,
  args: { title: 'Overview' },
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

export const Default: Story = {};

export const WithMetrics: Story = {
  args: {
    title: 'Dashboard',
    metrics: [
      { label: 'Revenue', value: '$48,352', trend: { direction: 'up', value: '+12.5%' } },
      { label: 'Users', value: '2,847', trend: { direction: 'up', value: '+8.2%' } },
      { label: 'Conversion', value: '3.24%', trend: { direction: 'down', value: '-0.4%' } },
    ],
    activity: <Typography variant="body2">Recent activity goes here</Typography>,
  },
};
