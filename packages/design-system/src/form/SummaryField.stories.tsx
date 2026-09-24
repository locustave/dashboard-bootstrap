import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SummaryField } from './SummaryField';
import Box from '@mui/material/Box';

const meta: Meta<typeof SummaryField> = {
  title: 'Form System/SummaryField',
  component: SummaryField,
};

export default meta;
type Story = StoryObj<typeof SummaryField>;

export const Default: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SummaryField label="Location:" value="London, Leeds" completed />
      <SummaryField label="Roles:" value="360 Operator, Steel Fixer" completed />
    </Box>
  ),
};
