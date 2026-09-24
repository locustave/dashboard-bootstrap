import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'States/LoadingState',
  component: LoadingState,
  args: { variant: 'spinner' },
};

export default meta;
type Story = StoryObj<typeof LoadingState>;

export const Default: Story = {};
