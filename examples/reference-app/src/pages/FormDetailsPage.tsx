import React, { useState } from 'react';
import {
  FormShell,
  FormStack,
  Stepper,
  SummaryField,
  Field,
  UploadField,
} from '@dashboard-bootstrap/design-system';

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

export default function FormDetailsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <FormShell>
      <Stepper currentStep={2} steps={steps} />
      <FormStack>
        <SummaryField label="Location:" value="London, Leeds" completed />
        <SummaryField label="Roles:" value="360 Operator, Steel Fixer" completed />
        <Field
          label="Name:"
          placeholder="e.g. John Smith"
          value={name}
          onChange={setName}
        />
        <Field
          label="Phone:"
          placeholder="e.g. 07891 123 456"
          value={phone}
          onChange={setPhone}
        />
        <UploadField
          label="Certification"
          optional
          accept=".pdf,.jpg,.png"
        />
      </FormStack>
    </FormShell>
  );
}
