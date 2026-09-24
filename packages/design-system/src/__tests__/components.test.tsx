import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardThemeProvider } from '../theme/DashboardThemeProvider';
import { AppShell } from '../components/AppShell';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Page } from '../components/Page';
import { PageHeader } from '../components/PageHeader';
import { PrimaryAction } from '../components/PrimaryAction';
import type { SidebarSection } from '../components/Sidebar';
import React from 'react';

const testSections: SidebarSection[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: <span data-testid="icon-dashboard">D</span>, route: '/' },
      { label: 'Users', icon: <span data-testid="icon-users">U</span>, route: '/users' },
    ],
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DashboardThemeProvider>{children}</DashboardThemeProvider>
);

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(
      <Sidebar sections={testSections} />,
      { wrapper },
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders section labels', () => {
    render(
      <Sidebar sections={testSections} />,
      { wrapper },
    );
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('highlights active route', () => {
    render(
      <Sidebar sections={testSections} activeRoute="/users" />,
      { wrapper },
    );
    const usersItem = screen.getByText('Users').closest('[role="button"]');
    expect(usersItem).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNavigate when item clicked', () => {
    const onNavigate = vi.fn();
    render(
      <Sidebar sections={testSections} onNavigate={onNavigate} />,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Users'));
    expect(onNavigate).toHaveBeenCalledWith('/users');
  });

  it('toggles collapse', () => {
    const onCollapseToggle = vi.fn();
    render(
      <Sidebar sections={testSections} onCollapseToggle={onCollapseToggle} />,
      { wrapper },
    );
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));
    expect(onCollapseToggle).toHaveBeenCalled();
  });

  it('hides labels when collapsed', () => {
    render(
      <Sidebar sections={testSections} collapsed />,
      { wrapper },
    );
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Main')).not.toBeInTheDocument();
  });

  it('renders nested navigation items', () => {
    const nestedSections: SidebarSection[] = [
      {
        items: [
          {
            label: 'Settings',
            icon: <span>S</span>,
            route: '/settings',
            children: [
              { label: 'General', icon: <span>G</span>, route: '/settings/general' },
            ],
          },
        ],
      },
    ];
    render(
      <Sidebar sections={nestedSections} />,
      { wrapper },
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
    // Children should be hidden until expanded
    expect(screen.queryByText('General')).not.toBeInTheDocument();
    // Click to expand
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <Sidebar sections={testSections} footer={<div data-testid="footer">Footer</div>} />,
      { wrapper },
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

describe('TopNav', () => {
  it('renders breadcrumbs', () => {
    render(
      <TopNav breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]} />,
      { wrapper },
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders separator between breadcrumbs', () => {
    render(
      <TopNav breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]} />,
      { wrapper },
    );
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('calls onBreadcrumbClick', () => {
    const onBreadcrumbClick = vi.fn();
    render(
      <TopNav
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
        onBreadcrumbClick={onBreadcrumbClick}
      />,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Home'));
    expect(onBreadcrumbClick).toHaveBeenCalledWith('/');
  });

  it('renders actions slot', () => {
    render(
      <TopNav actions={<button data-testid="search">Search</button>} />,
      { wrapper },
    );
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('has breadcrumb navigation landmark', () => {
    render(
      <TopNav breadcrumbs={[{ label: 'Home' }]} />,
      { wrapper },
    );
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });
});

describe('Page', () => {
  it('renders children', () => {
    render(
      <Page><div data-testid="content">Content</div></Page>,
      { wrapper },
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('renders as main element', () => {
    render(
      <Page><div>Content</div></Page>,
      { wrapper },
    );
    expect(document.querySelector('main')).toBeInTheDocument();
  });
});

describe('PageHeader', () => {
  it('renders title', () => {
    render(
      <PageHeader title="Users" />,
      { wrapper },
    );
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders title as h1', () => {
    render(
      <PageHeader title="Users" />,
      { wrapper },
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Users');
  });

  it('renders description', () => {
    render(
      <PageHeader title="Users" description="Manage your users" />,
      { wrapper },
    );
    expect(screen.getByText('Manage your users')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(
      <PageHeader title="Users" actions={<button data-testid="action">Add User</button>} />,
      { wrapper },
    );
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  it('renders tabs slot', () => {
    render(
      <PageHeader title="Users" tabs={<div data-testid="tabs">Tabs</div>} />,
      { wrapper },
    );
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
});

describe('PrimaryAction', () => {
  it('renders as a button', () => {
    render(
      <PrimaryAction>Create User</PrimaryAction>,
      { wrapper },
    );
    expect(screen.getByRole('button', { name: 'Create User' })).toBeInTheDocument();
  });

  it('handles click', () => {
    const onClick = vi.fn();
    render(
      <PrimaryAction onClick={onClick}>Save</PrimaryAction>,
      { wrapper },
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(
      <PrimaryAction disabled>Create</PrimaryAction>,
      { wrapper },
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('AppShell', () => {
  it('renders sidebar, top nav, and content', () => {
    render(
      <AppShell sections={testSections}>
        <div data-testid="page-content">Hello</div>
      </AppShell>,
      { wrapper },
    );
    expect(screen.getByLabelText('Sidebar navigation')).toBeInTheDocument();
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(document.querySelector('main')).toBeInTheDocument();
  });

  it('renders breadcrumbs in top nav', () => {
    render(
      <AppShell
        sections={testSections}
        breadcrumbs={[{ label: 'Home' }]}
      >
        <div>Content</div>
      </AppShell>,
      { wrapper },
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('passes sidebar header and footer', () => {
    render(
      <AppShell
        sections={testSections}
        sidebarHeader={<div data-testid="header">Logo</div>}
        sidebarFooter={<div data-testid="footer">Settings</div>}
      >
        <div>Content</div>
      </AppShell>,
      { wrapper },
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
