import React, { useState } from 'react';
import {
  AppDrawer,
  Field,
  FormStack,
  FormSectionLabel,
  SuggestionChip,
  SuggestionGroup,
  SelectableCard,
  SelectableCardGrid,
  UploadField,
  PrimaryAction,
  Icon,
} from '@dashboard-bootstrap/design-system';
import type { DrawerAction } from '@dashboard-bootstrap/design-system';

export function useReferenceDrawer() {
  const [open, setOpen] = useState(false);
  return {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  };
}

export function ReferenceDrawerButton({ onClick }: { onClick: () => void }) {
  return (
    <PrimaryAction onClick={onClick} startIcon={<Icon name="plus" size="sm" />}>
      New Item
    </PrimaryAction>
  );
}

export function ReferenceDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const handleSave = () => {
    setName('');
    setEmail('');
    setLocation('');
    setPriority('');
    setTags(new Set());
    onClose();
  };

  const actions: DrawerAction[] = [
    { label: 'Cancel', onClick: onClose, variant: 'secondary' },
    { label: 'Create', onClick: handleSave, variant: 'primary', icon: 'check', disabled: !name },
  ];

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Create New Item"
      subtitle="Fill out the details below to add a new item."
      icon="plus"
      size="md"
      actions={actions}
    >
      <FormStack>
        <Field
          label="Name:"
          placeholder="Enter item name"
          value={name}
          onChange={setName}
          required
        />
        <Field
          label="Email:"
          placeholder="contact@example.com"
          value={email}
          onChange={setEmail}
        />
        <Field
          label="Location:"
          placeholder="Choose location"
          value={location}
          onChange={setLocation}
        />

        <div>
          <FormSectionLabel>Priority</FormSectionLabel>
          <SelectableCardGrid columns={2}>
            <SelectableCard
              title="Low"
              description="No immediate action needed"
              selected={priority === 'Low'}
              onSelect={() => setPriority('Low')}
            />
            <SelectableCard
              title="Medium"
              description="Address in the current sprint"
              selected={priority === 'Medium'}
              onSelect={() => setPriority('Medium')}
            />
            <SelectableCard
              title="High"
              description="Resolve within 24 hours"
              selected={priority === 'High'}
              onSelect={() => setPriority('High')}
            />
            <SelectableCard
              title="Critical"
              description="Immediate attention required"
              selected={priority === 'Critical'}
              onSelect={() => setPriority('Critical')}
            />
          </SelectableCardGrid>
        </div>

        <div>
          <FormSectionLabel>Tags</FormSectionLabel>
          <SuggestionGroup>
            {['Frontend', 'Backend', 'DevOps', 'Mobile', 'Data', 'Security'].map((t) => (
              <SuggestionChip
                key={t}
                selected={tags.has(t)}
                onClick={() => toggleTag(t)}
              >
                {t}
              </SuggestionChip>
            ))}
          </SuggestionGroup>
        </div>

        <UploadField label="Attachment" optional accept="image/*,.pdf" />
      </FormStack>
    </AppDrawer>
  );
}
