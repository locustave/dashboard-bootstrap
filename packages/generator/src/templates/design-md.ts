export function generateDesignMd(): string {
  return `# Design System Reference

This document defines the visual language for this project. All UI must follow these rules.

---

## Visual Language

- White surfaces on light lavender background (\`#F2F2F7\`)
- Thin neutral borders (\`#DDDEE3\`)
- No shadows, no gradients, no glassmorphism
- Strong whitespace, typography-driven hierarchy
- Purple primary/action color (\`#5425E5\`)
- Yellow completed state (\`#F6E65A\`)
- Dark charcoal text (\`#111111\`)
- Compact, rectangular controls
- Border radius: 0–4px only

---

## Design Tokens

All values are centralized. Never hardcode.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| \`primary\` | \`#5425E5\` | Buttons, focus rings, active states |
| \`primaryHover\` | \`#461CCB\` | Button hover |
| \`primarySoft\` | \`#EEE9FF\` | Selected chip bg, icon badge bg |
| \`textPrimary\` | \`#111111\` | Headings, labels, input text |
| \`textSecondary\` | \`#66666F\` | Descriptions, metadata |
| \`textMuted\` | \`#A2A2AA\` | Placeholders, disabled, pending steps |
| \`border\` | \`#DDDEE3\` | Input borders, card borders, dividers |
| \`borderStrong\` | \`#C9CAD0\` | Hover borders |
| \`complete\` | \`#F6E65A\` | Completed step marker |
| \`error\` | \`#D92D20\` | Error borders, error text |
| \`surface\` | \`#FFFFFF\` | Cards, inputs, form shells |
| \`pageBackground\` | \`#F2F2F7\` | Full-page form backgrounds |

### Spacing

| Token | Value |
|-------|-------|
| \`xs\` | 4px |
| \`sm\` | 8px |
| \`md\` | 12px |
| \`lg\` | 16px |
| \`xl\` | 24px |
| \`xxl\` | 32px |
| \`section\` | 40px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| \`none\` | 0 | — |
| \`small\` | 2px | Chips, badges, form shell |
| \`medium\` | 3px | Inputs, cards, buttons |

**Never use radius > 4px.** No pill shapes.

### Typography

Font: \`Inter\`, fallback \`Helvetica Neue, Arial, sans-serif\`

| Role | Size | Weight |
|------|------|--------|
| Page title | 22px | 700 |
| Card title | 17px | 600 |
| Input label | 15px | 600 |
| Input text | 15px | 400 |
| Step label | 13px | 600 |
| Description | 13px | 400 |
| Small metadata | 12px | 500 |
| Section label | 11px | 600, uppercase, tracked |

---

## Component Catalog

### Layout

| Component | Usage |
|-----------|-------|
| \`AppShell\` | Root layout with sidebar |
| \`Page\` | Page wrapper |
| \`PageHeader\` | Page title + description + optional actions |
| \`FormShell\` | Standalone form page (720px max, lavender bg) |
| \`FormStack\` | Vertical field stack with consistent gap |

### Forms

| Component | Usage |
|-----------|-------|
| \`Field\` | Primary input — inline label + input in bordered container |
| \`TextInput\` | Standalone input (no inline label) |
| \`FieldLabel\` | Standalone label |
| \`FormField\` | Legacy MUI-compatible field (for MUI TextField children) |
| \`SummaryField\` | Read-only completed value with checkmark |
| \`FormSectionLabel\` | Uppercase section divider (e.g., "SUGGESTIONS") |

### Selection

| Component | Usage |
|-----------|-------|
| \`SelectableCard\` | Option card with custom radio indicator |
| \`SelectableCardGrid\` | 2-column responsive grid of selectable cards |
| \`SuggestionChip\` | Rectangular toggle chip |
| \`SuggestionGroup\` | Horizontal wrap layout for chips |

### Workflow

| Component | Usage |
|-----------|-------|
| \`Stepper\` | Horizontal step progress (pending/active/completed) |
| \`SuccessState\` | Centered completion message with icon |
| \`UploadField\` | Dashed-border drag-and-drop file upload |

### Interaction

| Component | Usage |
|-----------|-------|
| \`AppDrawer\` | **All forms, edits, and detail views.** Slide-in panel. |
| \`AppDialog\` | Confirmations only (delete, discard). Never for forms. |
| \`PrimaryAction\` | Primary page action button |

### Data

| Component | Usage |
|-----------|-------|
| \`AppDataTable\` | Sortable data table |
| \`AppCard\` | Content card |
| \`MetricCard\` | KPI display |
| \`StatusBadge\` | Status indicator |
| \`FilterBar\` | Filter controls |
| \`SearchInput\` | Search field |
| \`MetadataBadge\` | Small metadata tag on cards |

### States

| Component | Usage |
|-----------|-------|
| \`EmptyState\` | Empty page/section placeholder |
| \`LoadingState\` | Loading indicator |
| \`ErrorState\` | Error display |

---

## Patterns

### Form in a Drawer

\`\`\`tsx
<AppDrawer
  open={open}
  onClose={handleClose}
  title="Create Item"
  subtitle="Fill in the details below."
  icon="plus"
  actions={[
    { label: 'Cancel', onClick: handleClose, variant: 'secondary' },
    { label: 'Create', onClick: handleSubmit, variant: 'primary' },
  ]}
>
  <FormStack>
    <Field label="Name:" placeholder="Enter name" value={name} onChange={setName} required />
    <Field label="Email:" placeholder="you@example.com" value={email} onChange={setEmail} />
  </FormStack>
</AppDrawer>
\`\`\`

### Multi-Step Standalone Form

\`\`\`tsx
<FormShell>
  <Stepper currentStep={currentStep} steps={steps} />
  <FormStack>
    <Field label="Location:" placeholder="city, area..." value={location} onChange={setLocation} />
    <FormSectionLabel>SUGGESTIONS</FormSectionLabel>
    <SuggestionGroup>
      <SuggestionChip selected={selected} onClick={toggle}>London</SuggestionChip>
    </SuggestionGroup>
  </FormStack>
</FormShell>
\`\`\`

### Selection Cards

\`\`\`tsx
<SelectableCardGrid columns={2}>
  <SelectableCard
    title="Option A"
    description="Description of this option."
    metadata="from $10/mo"
    selected={choice === 'a'}
    onSelect={() => setChoice('a')}
  />
</SelectableCardGrid>
\`\`\`

---

## Don't

- Don't use MUI \`TextField\`, \`Select\`, \`Radio\`, \`Checkbox\` for user-facing UI
- Don't use \`AppDialog\` for forms — use \`AppDrawer\`
- Don't hardcode colors, spacing, or font sizes
- Don't use border-radius > 4px
- Don't add shadows or gradients
- Don't install Bootstrap, Chakra, or Tailwind
- Don't create one-off styled components — extend the design system
- Don't use pill-shaped buttons or inputs
- Don't use native browser form control appearances
`;
}
