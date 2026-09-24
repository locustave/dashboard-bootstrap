import js from '@eslint/js';
import tseslint from 'typescript-eslint';

// Governance: prevent direct MUI/Lucide/icon-library imports outside design-system
const fullRestrictions = {
  patterns: [
    {
      group: ['@mui/material', '@mui/material/**', '@mui/icons-material', '@mui/icons-material/**', '@mui/system', '@mui/system/**'],
      message: 'Import from @dashboard-bootstrap/design-system instead of using MUI directly.',
    },
    {
      group: ['lucide-react', 'lucide-react/**'],
      message: 'Import from @dashboard-bootstrap/design-system instead of using Lucide directly.',
    },
    {
      group: ['react-icons', 'react-icons/**', '@heroicons/react', '@heroicons/react/**', '@fortawesome/*'],
      message: 'Only Lucide React (via @dashboard-bootstrap/design-system) is approved.',
    },
  ],
};

// Reference app may use MUI layout primitives (Box, Typography) but not Lucide/icon libraries
const iconOnlyRestrictions = {
  patterns: [
    {
      group: ['lucide-react', 'lucide-react/**'],
      message: 'Import from @dashboard-bootstrap/design-system instead of using Lucide directly.',
    },
    {
      group: ['react-icons', 'react-icons/**', '@heroicons/react', '@heroicons/react/**', '@fortawesome/*'],
      message: 'Only Lucide React (via @dashboard-bootstrap/design-system) is approved.',
    },
  ],
};

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      '**/*.stories.tsx',
      '**/__tests__/**',
      // Library packages that are allowed to use MUI/Lucide directly
      'packages/design-system/**',
      'packages/schema/**',
      // Templates compose design-system + MUI layout primitives by design
      'packages/templates/**',
      // Non-code directories
      'tests/**',
      'skills/**',
      'keel/**',
      'docs/**',
      '.agent/**',
      '.storybook/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
    },
  },
  // Generator: no direct MUI/Lucide/icon-library imports
  {
    files: ['packages/generator/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', fullRestrictions],
    },
  },
  // CLI: no direct MUI/Lucide/icon-library imports
  {
    files: ['packages/cli/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', fullRestrictions],
    },
  },
  // Reference app: no direct Lucide/icon-library imports (MUI allowed for layout)
  {
    files: ['examples/reference-app/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', iconOnlyRestrictions],
    },
  },
);
