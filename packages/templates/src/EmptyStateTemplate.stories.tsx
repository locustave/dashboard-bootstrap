import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyStateTemplate } from './EmptyStateTemplate';

const meta: Meta<typeof EmptyStateTemplate> = {
  title: 'Templates/EmptyStateTemplate',
  component: EmptyStateTemplate,
  args: { title: 'No workflows yet' },
};

export default meta;
type Story = StoryObj<typeof EmptyStateTemplate>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Create your first workflow to automate tasks.' },
};

export const WithAction: Story = {
  args: {
    title: 'Getting Started',
    description: 'Welcome! Create your first project.',
    actionLabel: 'Create Project',
    onAction: () => {},
  },
};
