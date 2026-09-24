import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplitViewTemplate } from './SplitViewTemplate';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const meta: Meta<typeof SplitViewTemplate> = {
  title: 'Templates/SplitViewTemplate',
  component: SplitViewTemplate,
  args: {
    title: 'Messages',
    listPanel: (
      <Box>
        {['Message 1', 'Message 2', 'Message 3'].map((m) => (
          <Box key={m} sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2">{m}</Typography>
          </Box>
        ))}
      </Box>
    ),
    detailPanel: <Box sx={{ p: 2 }}><Typography>Message detail</Typography></Box>,
  },
};

export default meta;
type Story = StoryObj<typeof SplitViewTemplate>;

export const NoSelection: Story = {};

export const WithSelection: Story = {
  args: { hasSelection: true },
};
