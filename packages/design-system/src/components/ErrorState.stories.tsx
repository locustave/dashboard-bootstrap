import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'States/ErrorState',
  component: ErrorState,
  args: { title: 'Something went wrong' },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};
