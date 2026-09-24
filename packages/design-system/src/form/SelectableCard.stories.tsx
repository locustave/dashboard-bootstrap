import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectableCard, SelectableCardGrid } from './SelectableCard';
import Box from '@mui/material/Box';

const meta: Meta<typeof SelectableCard> = {
  title: 'Form System/SelectableCard',
  component: SelectableCard,
};

export default meta;
type Story = StoryObj<typeof SelectableCard>;

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

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>('site-manager');

    return (
      <Box sx={{ maxWidth: 720, p: 4 }}>
        <SelectableCardGrid columns={2}>
          {roles.map((role) => (
            <SelectableCard
              key={role.id}
              title={role.title}
              description={role.description}
              metadata={role.metadata}
              selected={selected === role.id}
              onSelect={() => setSelected(role.id)}
            />
          ))}
        </SelectableCardGrid>
      </Box>
    );
  },
};
