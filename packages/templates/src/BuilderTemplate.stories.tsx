import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BuilderTemplate } from './BuilderTemplate';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const meta: Meta<typeof BuilderTemplate> = {
  title: 'Templates/BuilderTemplate',
  component: BuilderTemplate,
  args: {
    title: 'Workflow Builder',
    toolbar: <Box sx={{ p: 1 }}><Typography variant="body2">Toolbar</Typography></Box>,
    canvas: <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><Typography color="text.secondary">Canvas area</Typography></Box>,
  },
};

export default meta;
type Story = StoryObj<typeof BuilderTemplate>;

export const Default: Story = {};

export const WithProperties: Story = {
  args: {
    propertiesPanel: <Box sx={{ p: 2 }}><Typography variant="subtitle2">Properties</Typography></Box>,
  },
};
