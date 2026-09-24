import React from 'react';
import type { Preview } from '@storybook/react';
import { DashboardThemeProvider } from '../src/theme/DashboardThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <DashboardThemeProvider>
        <Story />
      </DashboardThemeProvider>
    ),
  ],
};

export default preview;
