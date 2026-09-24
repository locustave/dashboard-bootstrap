import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryAction } from './PrimaryAction';

const meta: Meta<typeof PrimaryAction> = {
  title: 'Shell/PrimaryAction',
  component: PrimaryAction,
  args: { children: 'Create New', onClick: () => {} },
};

export default meta;
type Story = StoryObj<typeof PrimaryAction>;

export const Default: Story = {};
