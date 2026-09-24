import type { DashboardManifest } from '@dashboard-bootstrap/schema';

export function generateClaudeMd(manifest: DashboardManifest): string {
  const appName = manifest.application.name;

  return `# ${appName}

This project was bootstrapped with **Dashboard Bootstrap CLI**.

## Read First

Read \`DESIGN.md\` before making any UI changes. It is the design system contract for this project.

## Stack

- React 19 + TypeScript
- MUI 6 (layout primitives only — do not use MUI's default visual styling)
- Vite
- pnpm

## Rules

### Imports

Always import UI components from the design system:

\`\`\`ts
import { Field, FormStack, AppDrawer, Stepper } from '@dashboard-bootstrap/design-system';
\`\`\`

Never import raw MUI components for user-facing UI. Use MUI \`Box\` and \`Typography\` only as layout primitives with \`sx\` overrides.

### Forms

- All form inputs must use \`Field\` from the design system — never raw \`<input>\`, MUI \`TextField\`, or \`<select>\`.
- All forms must be wrapped in \`FormStack\` for consistent vertical spacing.
- All form/edit/detail flows must open in an \`AppDrawer\` — never a modal or dialog.
- \`AppDialog\` is only for confirmations (delete, discard, etc.).
- Multi-step flows use \`FormShell\` + \`Stepper\` for standalone pages.

### Styling

- Never hardcode colors, spacing, font sizes, or border-radius values.
- Use \`formTokens\` from \`@dashboard-bootstrap/design-system\` for form-related values.
- Use \`tokens\` from \`@dashboard-bootstrap/design-system\` for layout/page-level values.
- Primary action color is purple (\`#5425E5\`), not blue.
- Border radius must stay in the 0–4px range. No pill shapes. No large rounded corners.
- No shadows, gradients, or glassmorphism.

### Components

- Use \`PageHeader\` for every page (title + description).
- Use \`EmptyState\` when a page has no content yet.
- Use \`SelectableCard\` + \`SelectableCardGrid\` for option selection — not radio buttons.
- Use \`SuggestionChip\` for tag/filter selection — not checkboxes.
- Use \`SummaryField\` for read-only completed values in forms.
- Use \`UploadField\` for file uploads — not native file inputs.

### Don't

- Don't install Bootstrap, Chakra, or Tailwind.
- Don't use native browser form controls visually.
- Don't add new color values without adding them to tokens.
- Don't create one-off styled components — extend the design system instead.
- Don't use \`AppDialog\` for forms or editing.

## File Structure

\`\`\`
src/
  pages/          ← page components (you own these)
  generated/      ← auto-generated files (do not edit)
  App.tsx          ← app shell (generated, editable)
  main.tsx         ← entry point (generated)
\`\`\`

## Commands

\`\`\`bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm preview      # preview production build
\`\`\`
`;
}
