import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DetailTemplate } from './DetailTemplate';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof DetailTemplate> = {
  title: 'Templates/DetailTemplate',
  component: DetailTemplate,
  args: { title: 'Alice Johnson' },
};

export default meta;
type Story = StoryObj<typeof DetailTemplate>;

export const Default: Story = {
  args: {
    children: <Typography>Detail content</Typography>,
  },
};

export const WithSections: Story = {
  args: {
    sections: [
      { title: 'Profile', content: <Typography>Name, email, role</Typography> },
      { title: 'Activity', content: <Typography>Recent login, sessions</Typography> },
    ],
  },
};
