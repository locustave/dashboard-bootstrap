import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppForm } from './AppForm';
import { Page } from './Page';
import { Field, FormStack } from '../form';

const meta: Meta<typeof AppForm> = {
  title: 'Forms/AppForm',
  component: AppForm,
};

export default meta;
type Story = StoryObj<typeof AppForm>;

export const Default: Story = {
  render: () => (
    <Page>
      <AppForm>
        <FormStack>
          <Field label="Name:" placeholder="Enter your name" required />
          <Field label="Email:" placeholder="you@example.com" required />
          <Field label="Message:" placeholder="Your message" />
        </FormStack>
      </AppForm>
    </Page>
  ),
};
