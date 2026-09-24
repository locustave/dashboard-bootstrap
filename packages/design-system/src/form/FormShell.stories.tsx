import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormShell, FormStack } from './FormShell';
import { Stepper } from './Stepper';
import { Field } from './Field';
import { FormSectionLabel } from './FormSectionLabel';
import { SuggestionChip, SuggestionGroup } from './SuggestionChip';
import { MapPin } from 'lucide-react';

const meta: Meta<typeof FormShell> = {
  title: 'Form System/FormShell',
  component: FormShell,
};

export default meta;
type Story = StoryObj<typeof FormShell>;

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

const suggestions = ['Manchester', 'Liverpool', 'Leeds', 'London', 'Newcastle'];

export const Default: Story = {
  render: () => {
    const [location, setLocation] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (s: string) =>
      setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

    return (
      <FormShell>
        <Stepper currentStep={0} steps={steps} />
        <FormStack>
          <Field
            label="Location:"
            placeholder="city, area..."
            value={location}
            onChange={setLocation}
            trailingIcon={<MapPin size={18} />}
          />
          <div>
            <FormSectionLabel>SUGGESTIONS</FormSectionLabel>
            <SuggestionGroup>
              {suggestions.map((s) => (
                <SuggestionChip key={s} selected={selected.includes(s)} onClick={() => toggle(s)}>
                  {s}
                </SuggestionChip>
              ))}
            </SuggestionGroup>
          </div>
        </FormStack>
      </FormShell>
    );
  },
};
