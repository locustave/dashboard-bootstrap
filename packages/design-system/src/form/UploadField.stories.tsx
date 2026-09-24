import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UploadField } from './UploadField';
import Box from '@mui/material/Box';

const meta: Meta<typeof UploadField> = {
  title: 'Form System/UploadField',
  component: UploadField,
};

export default meta;
type Story = StoryObj<typeof UploadField>;

export const Default: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, p: 4 }}>
      <UploadField
        label="Certification"
        optional
        accept=".pdf,.jpg,.png"
        onFiles={(files) => console.log('Files:', files)}
      />
    </Box>
  ),
};
