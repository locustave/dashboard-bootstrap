import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Page } from './Page';

const meta: Meta<typeof PageHeader> = {
  title: 'Shell/PageHeader',
  component: PageHeader,
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  render: () => (
    <Page>
      <PageHeader title="Overview" />
    </Page>
  ),
};
