import React from 'react';
import {
  FormShell,
  Stepper,
  SuccessState,
} from '@dashboard-bootstrap/design-system';

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

export default function FormCompletePage() {
  return (
    <FormShell>
      <Stepper currentStep={3} steps={steps} />
      <SuccessState
        title="We've received your application!"
        description="We will process it and reach out to you in a few days."
      />
    </FormShell>
  );
}
