# Dashboard Bootstrap CLI — Form UI Component Pack Specification

## Purpose

This specification defines a reusable form and workflow UI component pack for a **Dashboard Bootstrap CLI** that rapidly scaffolds polished admin dashboards for new SaaS products.

The goal is not to build a one-off form. The goal is to make this form system a reusable part of the CLI's generated dashboard design system so Claude Code, Codex, or another code agent can generate consistent SaaS admin interfaces from the same primitives.

The attached reference image should be treated as the visual source of truth for this component pack.

---

# 1. Product Context

The Dashboard Bootstrap CLI generates reusable dashboard foundations for new SaaS applications.

This form component pack should become one of the standard generated UI modules alongside common dashboard primitives such as:

- navigation
- sidebars
- cards
- tables
- metrics
- filters
- forms
- settings pages
- onboarding flows
- multi-step workflows
- upload screens
- confirmation states

The form pack should be suitable for:

- onboarding
- configuration flows
- admin setup
- policy creation
- integrations
- user provisioning
- wizard-style experiences
- data collection
- resource creation

The output must be generic enough to work across many SaaS ideas.

---

# 2. Core Objective

Create a reusable component library that matches the attached reference UI as closely as practical.

The final generated components should reproduce the same:

- typography
- spacing
- borders
- input sizing
- horizontal steppers
- selection cards
- labels
- chips
- upload areas
- confirmation states
- color treatment
- interaction density
- visual restraint

Do not redesign, modernize, or reinterpret the visual language unless technically necessary.

The reference image is the visual contract.

---

# 3. CLI Integration Requirements

This should be generated as a reusable package/module, not buried inside a single form feature.

Recommended structure:

```text
packages/
  design-system/
    src/
      tokens/
      form/
      layout/
      icons/

apps/
  reference-app/
    src/
      examples/
        form-location.tsx
        form-position.tsx
        form-details.tsx
        form-success.tsx
```

If the CLI uses a single-app architecture, use:

```text
src/
  components/
    ui/
    form/
  styles/
    tokens/
  examples/
    forms/
```

The CLI should be able to scaffold these components into a new dashboard project as a coherent form system.

---

# 4. Visual Design Language

The reference UI uses a clean, minimal SaaS/application form style.

Important characteristics:

- white surfaces
- very light gray/lavender page background
- thin neutral borders
- little to no shadow
- strong whitespace
- typography-driven hierarchy
- purple active/action color
- yellow completed state
- dark charcoal primary text
- muted gray secondary text
- compact, rectangular controls

Avoid:

- heavy shadows
- gradients
- glassmorphism
- oversized rounded corners
- pill-shaped input fields
- bright saturated surfaces
- framework-default appearance
- generic Material UI or Bootstrap aesthetics

---

# 5. Design Tokens

Centralize all values.

Example:

```ts
export const dashboardFormTheme = {
  colors: {
    pageBackground: "#F2F2F7",
    surface: "#FFFFFF",

    textPrimary: "#111111",
    textSecondary: "#66666F",
    textMuted: "#A2A2AA",
    placeholder: "#A6A6AD",

    border: "#DDDEE3",
    borderStrong: "#C9CAD0",

    primary: "#5425E5",
    primaryHover: "#461CCB",
    primarySoft: "#EEE9FF",

    complete: "#F6E65A",
    completeText: "#111111",

    disabled: "#BABBC1",
    error: "#D92D20",
  },

  radius: {
    none: 0,
    small: 2,
    medium: 4,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    section: 40,
  },

  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
};
```

Exact values may be tuned after comparison against the reference image.

Do not introduce a large-radius visual system.

Most visible components should remain in the 0–4px radius range.

---

# 6. Typography

Preferred:

```text
Inter
```

Fallback:

```text
Helvetica Neue
Arial
sans-serif
```

Recommended scale:

```text
Major heading: 20–24px / 600–700
Card title: 17–18px / 600–700
Input label: 14–15px / 600
Input text: 15–16px / 400
Step label: 13–14px / 500–600
Description: 13–14px / 400
Small metadata: 12–13px / 500
Section label: 11px / 600 / uppercase / tracked
```

Line height:

```text
1.35–1.5
```

---

# 7. Required Component Library

At minimum, generate:

```text
Stepper
Step
StepConnector

Field
FieldLabel
TextInput

SummaryField

SuggestionChip
SuggestionGroup

SelectableCard
SelectableCardGrid

MetadataBadge

UploadField

FormSection
FormSectionLabel

FormShell
FormStack

SuccessState
```

Expose through a single barrel export:

```ts
components/form/index.ts
```

or package export:

```ts
packages/design-system/src/form/index.ts
```

---

# 8. Component Architecture

Recommended:

```text
form/
  FormShell/
  FormSection/
  FormStack/

  Stepper/
    Stepper.tsx
    Step.tsx
    StepConnector.tsx

  Field/
    Field.tsx
    FieldLabel.tsx
    TextInput.tsx

  SummaryField/

  SuggestionChip/
  SuggestionGroup/

  SelectableCard/
  SelectableCardGrid/

  MetadataBadge/

  UploadField/

  SuccessState/

  index.ts
```

Prefer small reusable primitives and composition over large monolithic screens.

---

# 9. Stepper

Example API:

```tsx
<Stepper
  currentStep={1}
  steps={[
    { id: "location", label: "Job location" },
    { id: "position", label: "Job position" },
    { id: "details", label: "Personal details" }
  ]}
/>
```

Support:

```text
pending
active
completed
```

Active:

- circular purple marker
- white number
- stronger label
- approximately 20px circle

Completed:

- yellow circular marker
- dark checkmark

Pending:

- gray circular marker
- muted label

Connector:

```text
1px high
60–90px wide on desktop
neutral gray
vertically centered to step marker
```

Responsive connector lengths should reduce at narrower widths.

---

# 10. Primary Field

Example:

```tsx
<Field
  label="Location:"
  placeholder="city, area..."
  trailingIcon={<MapPin />}
/>
```

Approximate visual specification:

```text
height: 52px
background: white
border: 1px solid light gray
radius: 0–3px
horizontal padding: 16px
```

Inline label/value layout where appropriate:

```text
Location:    city, area...
```

Label:

```text
font-weight: 600
```

Placeholder:

```text
muted gray
```

Trailing icon:

```text
16–18px
gray
right aligned
```

Focus:

```text
border-color: primary purple
subtle 1px focus ring
```

No large glow effects.

---

# 11. Summary Field

Example:

```tsx
<SummaryField
  label="Location:"
  value="London, Leeds"
  completed
/>
```

Visual form:

```text
Location: London, Leeds                         ✓
```

Use same general dimensions as an input.

Support:

```ts
completed?: boolean
editable?: boolean
```

Use purple for the completion mark in summary rows.

---

# 12. Suggestion Chips

Example:

```tsx
<SuggestionChip>Manchester</SuggestionChip>
```

Style:

```text
rectangular
white background
thin gray border
minimal radius
compact typography
```

Approximate:

```css
padding: 6px 12px;
font-size: 13px;
border: 1px solid #ddd;
border-radius: 2px;
background: white;
```

States:

```text
hover -> slightly stronger border
selected -> purple border + very pale purple background
```

Do not use pill styling.

---

# 13. Form Section Label

Example:

```tsx
<FormSectionLabel>SUGGESTIONS</FormSectionLabel>
```

Style:

```text
font-size: 11px
font-weight: 600
letter-spacing: 0.1em
text-transform: uppercase
dark gray
margin-bottom: ~12px
```

---

# 14. Selectable Card

Example:

```tsx
<SelectableCard
  title="Project Manager"
  description="Manage construction projects & ensure adherence to plans."
  metadata="from £42 per hour"
  selected={false}
/>
```

Layout:

```text
-------------------------------------------------
| Project Manager                       ○       |
|                                               |
| Manage construction projects & ensure        |
| adherence to plans.                           |
|                                               |
| ▣ from £42 per hour                           |
-------------------------------------------------
```

Card:

```text
background: white
border: 1px solid #DDDEE3
radius: 0–3px
min-height: ~130px
padding: 20px
```

Title:

```text
17–18px
600–700
```

Description:

```text
13px
secondary gray
line-height ~1.4
```

Selection indicator:

```text
18–20px circular outline
top right
gray border
```

Selected:

```text
purple card border
purple radio border
purple inner dot
```

Do not use native browser radio styling visually.

---

# 15. Metadata Badge

Example:

```text
▣ from £42 per hour
```

Style:

```text
very light gray background
12px
600
4px 7px padding
1–2px radius
small icon before value
```

Keep it understated.

---

# 16. Card Grid

Example:

```tsx
<SelectableCardGrid columns={2}>
  ...
</SelectableCardGrid>
```

Desktop:

```text
2 columns
16px gap
```

Mobile/tablet:

```text
1 column when needed
```

Cards should preserve comfortable width rather than becoming cramped.

---

# 17. Upload Field

Example:

```tsx
<UploadField
  label="Certification"
  optional
  accept=".pdf,.jpg,.png"
/>
```

Structure:

```text
Certification (optional)

------------------------------------------------
|                                              |
|                 upload icon                  |
|                                              |
|              Click to upload                 |
|              or drag and drop                |
|                                              |
------------------------------------------------
```

Style:

```text
height: ~200px
border: 1px dashed #BFC0C6
background: white
```

Icon:

```text
purple
32–40px
```

Primary upload action:

```text
underlined
```

Hover:

```text
purple border
very subtle purple background
```

Keep corners nearly square.

---

# 18. Form Shell

Recommended:

```css
max-width: 720px;
padding: 40px;
background: white;
```

Page:

```css
background: #F2F2F7;
```

Responsive padding:

```text
desktop: 40px
tablet: 28–32px
mobile: 20px
```

---

# 19. Success State

Example:

```tsx
<SuccessState
  title="We've received your application!"
  description="We will process it and reach out to you shortly."
/>
```

Layout:

```text
Stepper

                success icon

       We've received your application!

        Secondary description text
```

Center aligned.

Title:

```text
22–24px
700
```

Description:

```text
15–16px
muted gray
```

Success icon:

```text
purple primary shape
yellow accent details
```

Prefer a custom SVG over a generic unrelated icon.

---

# 20. Interaction States

Every interactive component must support:

```text
default
hover
focus
active
selected
disabled
error
```

Keep interactions subtle.

Example focus:

```css
border-color: #5425E5;
box-shadow: 0 0 0 1px #5425E5;
```

Error:

```text
red border
small error text below
```

Validation states should not cause unexpected layout jumps.

---

# 21. Accessibility

Requirements:

- proper label associations
- keyboard navigation
- visible focus states
- ARIA where appropriate
- `aria-selected`
- proper radio-group semantics
- upload area keyboard support
- sufficient contrast

Visual fidelity must not come at the expense of accessibility.

---

# 22. Responsive Behavior

Breakpoints:

```text
desktop >= 1024px
tablet 768–1023px
mobile < 768px
```

On mobile:

```text
card grid -> 1 column
form padding -> 20px
stepper connectors -> shorter
long step labels may wrap
```

Keep the same form language instead of replacing the stepper with a totally different component.

---

# 23. Component APIs

Use controlled components.

Example:

```tsx
<Field
  label="Name:"
  value={name}
  onChange={setName}
/>
```

```tsx
<SelectableCard
  title="Site Manager"
  description="Manage project plans, budgets, and schedules throughout project lifecycle."
  metadata="from £32 per hour"
  selected={role === "site-manager"}
  onSelect={() => setRole("site-manager")}
/>
```

```tsx
<Stepper
  currentStep={1}
  steps={[
    { id: "location", label: "Job location" },
    { id: "position", label: "Job position" },
    { id: "details", label: "Personal details" }
  ]}
/>
```

---

# 24. Reference Implementation

Build a reference/demo implementation using the component library.

Required examples:

```text
Form / Location
Form / Position
Form / Personal Details
Form / Complete
```

These should reproduce the attached screenshot as closely as possible.

The reference implementation acts as:

- visual documentation
- manual QA target
- regression test fixture
- component usage example
- future CLI template validation

---

# 25. Visual Regression Testing

If Playwright exists, create screenshot tests.

Recommended:

```text
form-location.spec.ts
form-position.spec.ts
form-details.spec.ts
form-complete.spec.ts
```

Capture:

```text
1440px desktop
768px tablet
390px mobile
```

Use stable snapshots.

---

# 26. Existing Stack First

Before coding:

1. Inspect the repository.
2. Identify existing frontend architecture.
3. Identify existing CSS/styling system.
4. Identify existing tokens.
5. Identify existing reusable components.
6. Reuse existing infrastructure wherever it can achieve the target visual style.

Preference order for styling:

```text
1. Existing project styling system
2. CSS Modules
3. Tailwind, only if already present
4. styled-components / Emotion, only if already present
```

Do not introduce a new styling framework just for this feature.

---

# 27. Implementation Rules

Do not:

- install Bootstrap
- use stock Material UI styling
- use stock Chakra UI form styling
- make all components heavily rounded
- use native radio button appearance
- hardcode the entire example into one page
- create duplicate one-off components per screen
- modify unrelated dashboard architecture

The reference visual should override framework defaults.

---

# 28. Pixel-Matching Priority

Prioritize:

```text
1. Layout
2. Spacing
3. Typography
4. Component dimensions
5. Borders
6. Colors
7. Icons
8. Animation
```

The UI should visually resemble the reference before adding decorative behavior.

---

# 29. Dashboard Bootstrap CLI Requirements

This component set should be designed for CLI reuse.

The generator should be able to include the form pack through a template or option such as:

```bash
dashboard-bootstrap create my-app --with-forms
```

or:

```bash
dashboard-bootstrap add form-system
```

Do not implement CLI command syntax unless the repository already defines the command model.

Instead, structure files so they are easy for the existing generator to copy or compose.

Recommended template grouping:

```text
templates/
  design-system/
    form-system/
      components/
      tokens/
      examples/
      tests/
```

Generated code should not contain references to the job application example except inside reference/demo fixtures.

Core components must remain generic.

---

# 30. Generic Naming Requirement

Avoid domain-specific component names such as:

```text
JobRoleCard
JobLocationField
ApplicationStepper
CertificationUploader
```

Prefer:

```text
SelectableCard
Field
Stepper
UploadField
SummaryField
SuccessState
```

The Dashboard Bootstrap CLI must be able to reuse these components across arbitrary SaaS domains.

---

# 31. Future Dashboard Compatibility

The form system should visually fit beside future bootstrap components such as:

```text
DataTable
MetricCard
FilterBar
PageHeader
Sidebar
TopNav
SettingsPanel
EmptyState
CommandBar
Modal
Drawer
Tabs
ActivityFeed
AuditLog
```

Keep token naming and architecture general enough that this visual system can evolve into the broader Dashboard Bootstrap design system.

---

# 32. Expected Deliverables

Produce:

```text
Reusable form component library
Centralized design tokens
TypeScript interfaces
Responsive behavior
Accessibility support
Reference implementation
Visual regression tests if Playwright exists
Examples/docs
Clean barrel exports
CLI/template-ready file organization
```

---

# 33. Definition of Done

The work is complete when:

- all form primitives are reusable
- none of the main screens depend on one-off visual implementations
- the reference screenshot can be recreated from the library
- the components are domain-neutral
- the package can be copied/scaffolded by Dashboard Bootstrap CLI
- desktop visual fidelity is strong
- mobile behavior is usable
- accessibility is preserved
- tokens are centralized
- no unnecessary dependency was added
- lint passes
- typecheck passes
- tests pass
- visual snapshots pass where available

---

# 34. Agent Execution Instructions

Do not start by coding.

First:

1. Inspect the repository architecture.
2. Inspect the Dashboard Bootstrap CLI template/generator structure.
3. Identify the current frontend framework and styling system.
4. Identify whether a design-system package already exists.
5. Review the attached reference image carefully.
6. Map the image into reusable primitives.
7. Produce a concise implementation plan.
8. List files to create and modify.
9. Identify any compatibility risks.
10. Then implement.

Do not expand scope into unrelated dashboard components.

Do not redesign the supplied visual style.

Treat the reference image as the visual contract.

Primary success criteria:

```text
Reusable architecture
+
high visual fidelity
+
CLI portability
+
domain neutrality
```

---

# 35. Agent Reminder

This is part of a **Dashboard Bootstrap CLI**, not a single application.

Build it so future generated SaaS dashboards can consume this form system without knowing anything about the original job application screenshot.

The screenshot is an example of the desired visual language, not the product domain.
