import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import type { SidebarSection } from './Sidebar';
import { PageHeader } from './PageHeader';
import { EmptyState } from './EmptyState';
import { Icon } from './Icon';

const sections: SidebarSection[] = [
  {
    items: [
      { label: 'Overview', icon: 'home', route: '/' },
      { label: 'Projects', icon: 'folder', route: '/projects' },
      { label: 'Models', icon: 'box', route: '/models' },
      { label: 'Analytics', icon: 'bar-chart', route: '/analytics' },
    ],
  },
];

const bottomSections: SidebarSection[] = [
  {
    items: [
      { label: 'Settings', icon: 'settings', route: '/settings' },
    ],
  },
];

const meta: Meta<typeof AppShell> = {
  title: 'Shell/AppShell',
  component: AppShell,
  args: {
    sections,
    bottomSections,
    activeRoute: '/',
    logoConfig: { companyName: 'My App' },
    children: (
      <>
        <PageHeader title="Overview" />
        <EmptyState
          title="Welcome to Overview"
          description="This is what your generated dashboard looks like out of the box. Add pages and navigation items via your dashboard.yaml manifest."
          icon={<Icon name="home" size="xl" />}
        />
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {};
