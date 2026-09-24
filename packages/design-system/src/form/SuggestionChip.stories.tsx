import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionChip, SuggestionGroup } from './SuggestionChip';
import { FormSectionLabel } from './FormSectionLabel';
import Box from '@mui/material/Box';

const meta: Meta<typeof SuggestionChip> = {
  title: 'Form System/SuggestionChip',
  component: SuggestionChip,
};

export default meta;
type Story = StoryObj<typeof SuggestionChip>;

const suggestions = ['Manchester', 'Liverpool', 'Leeds', 'London', 'Newcastle'];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Leeds']);
    const toggle = (s: string) =>
      setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

    return (
      <Box sx={{ p: 4 }}>
        <FormSectionLabel>SUGGESTIONS</FormSectionLabel>
        <SuggestionGroup>
          {suggestions.map((s) => (
            <SuggestionChip key={s} selected={selected.includes(s)} onClick={() => toggle(s)}>
              {s}
            </SuggestionChip>
          ))}
        </SuggestionGroup>
      </Box>
    );
  },
};
