import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SuccessState } from './SuccessState';
import { FormShell } from './FormShell';
import { Stepper } from './Stepper';

const meta: Meta<typeof SuccessState> = {
  title: 'Form System/SuccessState',
  component: SuccessState,
};

export default meta;
type Story = StoryObj<typeof SuccessState>;

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

export const Default: Story = {
  render: () => (
    <FormShell>
      <Stepper currentStep={3} steps={steps} />
      <SuccessState
        title="We've received your application!"
        description="We will process it and reach out to you in a few days."
      />
    </FormShell>
  ),
};
