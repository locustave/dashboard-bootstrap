import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Field, TextInput, FieldLabel } from './Field';
import { MapPin } from 'lucide-react';
import Box from '@mui/material/Box';

const meta: Meta<typeof Field> = {
  title: 'Form System/Field',
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Box sx={{ maxWidth: 600, p: 4 }}>
        <Field
          label="Location:"
          placeholder="city, area..."
          value={value}
          onChange={setValue}
          trailingIcon={<MapPin size={18} />}
        />
      </Box>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, p: 4 }}>
      <Field
        label="Email:"
        placeholder="you@example.com"
        value=""
        error="This field is required"
        required
      />
    </Box>
  ),
};

export const StandaloneTextInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Box sx={{ maxWidth: 400, p: 4 }}>
        <FieldLabel>Standalone label</FieldLabel>
        <TextInput
          placeholder="Type here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
    );
  },
};
