import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SettingsTemplate } from './SettingsTemplate';
import Typography from '@mui/material/Typography';

const sections = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
];

const meta: Meta<typeof SettingsTemplate> = {
  title: 'Templates/SettingsTemplate',
  component: SettingsTemplate,
  args: {
    sections,
    activeSection: 'general',
    onSectionChange: () => {},
    children: <Typography>Settings form content</Typography>,
  },
};

export default meta;
type Story = StoryObj<typeof SettingsTemplate>;

export const Default: Story = {};
