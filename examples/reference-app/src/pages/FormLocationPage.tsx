import React, { useState } from 'react';
import {
  FormShell,
  FormStack,
  Stepper,
  Field,
  FormSectionLabel,
  SuggestionChip,
  SuggestionGroup,
  Icon,
} from '@dashboard-bootstrap/design-system';

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

const suggestions = ['Manchester', 'Liverpool', 'Leeds', 'London', 'Newcastle'];

export default function FormLocationPage() {
  const [location, setLocation] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const toggleSuggestion = (s: string) => {
    setSelectedSuggestions((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <FormShell>
      <Stepper currentStep={0} steps={steps} />
      <FormStack>
        <Field
          label="Location:"
          placeholder="city, area..."
          value={location}
          onChange={setLocation}
          trailingIcon={<Icon name="map-pin" size="sm" />}
        />
        <div>
          <FormSectionLabel>SUGGESTIONS</FormSectionLabel>
          <SuggestionGroup>
            {suggestions.map((s) => (
              <SuggestionChip
                key={s}
                selected={selectedSuggestions.includes(s)}
                onClick={() => toggleSuggestion(s)}
              >
                {s}
              </SuggestionChip>
            ))}
          </SuggestionGroup>
        </div>
      </FormStack>
    </FormShell>
  );
}
