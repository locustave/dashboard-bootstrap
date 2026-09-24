import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { PageHeader } from './PageHeader';
import { Page } from './Page';
import { Icon } from './Icon';

const meta: Meta<typeof EmptyState> = {
  title: 'States/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <Page>
      <PageHeader title="Overview" />
      <EmptyState
        title="Welcome to Overview"
        description="This is what your generated dashboard looks like out of the box. Add pages and navigation items via your dashboard.yaml manifest."
        icon={<Icon name="home" size="xl" />}
      />
    </Page>
  ),
};
