import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CatalogTemplate } from './CatalogTemplate';

const items = [
  { id: '1', title: 'Slack', description: 'Team messaging' },
  { id: '2', title: 'GitHub', description: 'Code hosting' },
  { id: '3', title: 'Stripe', description: 'Payments' },
  { id: '4', title: 'SendGrid', description: 'Email delivery' },
];

const meta: Meta<typeof CatalogTemplate> = {
  title: 'Templates/CatalogTemplate',
  component: CatalogTemplate,
  args: { title: 'Integrations', items },
};

export default meta;
type Story = StoryObj<typeof CatalogTemplate>;

export const Default: Story = {};

export const Empty: Story = {
  args: { items: [], emptyState: <div>No integrations available</div> },
};
