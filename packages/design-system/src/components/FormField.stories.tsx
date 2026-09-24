import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import TextField from '@mui/material/TextField';
import { Page } from './Page';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <Page>
      <FormField label="Email:" required>
        <TextField size="small" fullWidth placeholder="you@example.com" />
      </FormField>
    </Page>
  ),
};
