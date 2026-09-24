import React, { useState } from 'react';
import {
  FormShell,
  FormStack,
  Stepper,
  Field,
  FormSectionLabel,
  SelectableCard,
  SelectableCardGrid,
  Icon,
} from '@dashboard-bootstrap/design-system';

const steps = [
  { id: 'location', label: 'Job location' },
  { id: 'position', label: 'Job position' },
  { id: 'details', label: 'Personal details' },
];

const roles = [
  {
    id: '360-operator',
    title: '360 Operator',
    description: 'Operate and maintain 360 excavators for site excavation.',
    metadata: 'from £30 per hour',
  },
  {
    id: 'site-manager',
    title: 'Site Manager',
    description: 'Manage project plans, budgets, and schedules throughout project lifecycle.',
    metadata: 'from £35 per hour',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Manage construction projects & ensure adherence to plans.',
    metadata: 'from £42 per hour',
  },
  {
    id: 'steel-fixer',
    title: 'Steel Fixer',
    description: 'Install steel reinforcement bars in concrete structures.',
    metadata: 'from £28 per hour',
  },
];

export default function FormPositionPage() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <FormShell>
      <Stepper currentStep={1} steps={steps} />
      <FormStack>
        <Field
          label="Roles:"
          placeholder="job title, position..."
          value={search}
          onChange={setSearch}
          trailingIcon={<Icon name="search" size="sm" />}
        />
        <div>
          <FormSectionLabel>SUGGESTIONS</FormSectionLabel>
          <SelectableCardGrid columns={2}>
            {roles.map((role) => (
              <SelectableCard
                key={role.id}
                title={role.title}
                description={role.description}
                metadata={role.metadata}
                selected={selectedRole === role.id}
                onSelect={() => setSelectedRole(role.id)}
              />
            ))}
          </SelectableCardGrid>
        </div>
      </FormStack>
    </FormShell>
  );
}
