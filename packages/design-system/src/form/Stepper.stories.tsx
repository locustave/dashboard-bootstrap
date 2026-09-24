import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Form System/Stepper',
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: () => <Stepper currentStep={1} steps={steps} />,
};

export const FirstStep: Story = {
  render: () => <Stepper currentStep={0} steps={steps} />,
};

export const AllComplete: Story = {
  render: () => <Stepper currentStep={3} steps={steps} />,
};
