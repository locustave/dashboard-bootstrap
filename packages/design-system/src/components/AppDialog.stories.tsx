import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppDialog } from './AppDialog';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof AppDialog> = {
  title: 'Interaction/AppDialog',
  component: AppDialog,
  args: {
    open: true,
    title: 'Confirm Action',
    onClose: () => {},
    children: <Typography>Are you sure you want to proceed?</Typography>,
  },
};

export default meta;
type Story = StoryObj<typeof AppDialog>;

export const Default: Story = {};
