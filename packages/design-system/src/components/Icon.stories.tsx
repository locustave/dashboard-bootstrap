import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Foundation/Icon',
  component: Icon,
  args: { name: 'home', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};
