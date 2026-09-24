import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WizardTemplate } from './WizardTemplate';
import Typography from '@mui/material/Typography';

const steps = [{ label: 'Account' }, { label: 'Settings' }, { label: 'Review' }];

const meta: Meta<typeof WizardTemplate> = {
  title: 'Templates/WizardTemplate',
  component: WizardTemplate,
  args: {
    title: 'Setup',
    steps,
    currentStep: 0,
    children: <Typography>Step content goes here</Typography>,
  },
};

export default meta;
type Story = StoryObj<typeof WizardTemplate>;

export const FirstStep: Story = {};
export const MiddleStep: Story = { args: { currentStep: 1 } };
export const LastStep: Story = { args: { currentStep: 2, isLastStep: true } };
