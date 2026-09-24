import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppDrawer } from './AppDrawer';
import { Field, FormStack } from '../form';

const meta: Meta<typeof AppDrawer> = {
  title: 'Interaction/AppDrawer',
  component: AppDrawer,
};

export default meta;
type Story = StoryObj<typeof AppDrawer>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Create Event',
    subtitle: 'Fill in the details below to create a new event.',
    icon: 'calendar',
    onClose: () => {},
    actions: [
      { label: 'Cancel', onClick: () => {}, variant: 'secondary' },
      { label: 'Create Event', onClick: () => {}, variant: 'primary', icon: 'plus' },
    ],
    children: (
      <FormStack>
        <Field label="Event name:" placeholder="Enter event name" required />
        <Field label="Date:" placeholder="Select a date" />
        <Field label="Time:" placeholder="Select a time" />
        <Field label="Location:" placeholder="Choose location" />
        <Field label="Description:" placeholder="Add a description" />
        <Field label="Add guests:" placeholder="contact@example.com" />
      </FormStack>
    ),
  },
};
