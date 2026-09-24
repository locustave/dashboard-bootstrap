import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppCard } from './AppCard';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof AppCard> = {
  title: 'Content/AppCard',
  component: AppCard,
  args: {
    title: 'Card Title',
    children: <Typography>Card content goes here</Typography>,
  },
};

export default meta;
type Story = StoryObj<typeof AppCard>;

export const Default: Story = {};
