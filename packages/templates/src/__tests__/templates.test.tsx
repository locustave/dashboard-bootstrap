import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardThemeProvider } from '@dashboard-bootstrap/design-system';
import { DashboardTemplate } from '../DashboardTemplate';
import { TableTemplate } from '../TableTemplate';
import { DetailTemplate } from '../DetailTemplate';
import { SettingsTemplate } from '../SettingsTemplate';
import { WizardTemplate } from '../WizardTemplate';
import { CatalogTemplate } from '../CatalogTemplate';
import { BuilderTemplate } from '../BuilderTemplate';
import { SplitViewTemplate } from '../SplitViewTemplate';
import { EmptyStateTemplate } from '../EmptyStateTemplate';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DashboardThemeProvider>{children}</DashboardThemeProvider>
);

describe('DashboardTemplate', () => {
  it('renders title', () => {
    render(<DashboardTemplate title="Overview" />, { wrapper });
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders metrics', () => {
    render(
      <DashboardTemplate
        title="Dashboard"
        metrics={[
          { label: 'Revenue', value: '$12,345' },
          { label: 'Users', value: '1,234', trend: { direction: 'up', value: '+5%' } },
        ]}
      />,
      { wrapper },
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });

  it('renders activity section', () => {
    render(
      <DashboardTemplate title="Dashboard" activity={<div data-testid="activity">Feed</div>} />,
      { wrapper },
    );
    expect(screen.getByTestId('activity')).toBeInTheDocument();
  });
});

describe('TableTemplate', () => {
  const columns = [{ id: 'name', label: 'Name' }];
  const rows = [{ name: 'Alice' }, { name: 'Bob' }];

  it('renders title and data', () => {
    render(
      <TableTemplate title="Users" columns={columns} rows={rows} getRowKey={(r) => r.name} />,
      { wrapper },
    );
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders empty state when no rows', () => {
    render(
      <TableTemplate title="Users" columns={columns} rows={[]} getRowKey={(r) => r.name} emptyTitle="No users" />,
      { wrapper },
    );
    expect(screen.getByText('No users')).toBeInTheDocument();
  });

  it('renders filters', () => {
    render(
      <TableTemplate
        title="Users"
        columns={columns}
        rows={rows}
        getRowKey={(r) => r.name}
        filters={<input data-testid="filter" />}
      />,
      { wrapper },
    );
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });
});

describe('DetailTemplate', () => {
  it('renders title', () => {
    render(<DetailTemplate title="User Detail"><div>Content</div></DetailTemplate>, { wrapper });
    expect(screen.getByText('User Detail')).toBeInTheDocument();
  });

  it('renders sections', () => {
    render(
      <DetailTemplate
        title="User"
        sections={[
          { title: 'Profile', content: <div>Profile content</div> },
          { title: 'Settings', content: <div>Settings content</div> },
        ]}
      />,
      { wrapper },
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});

describe('SettingsTemplate', () => {
  const sections = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
  ];

  it('renders settings navigation', () => {
    render(
      <SettingsTemplate sections={sections} activeSection="general" onSectionChange={() => {}}>
        <div>Form</div>
      </SettingsTemplate>,
      { wrapper },
    );
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('calls onSectionChange', () => {
    const onChange = vi.fn();
    render(
      <SettingsTemplate sections={sections} activeSection="general" onSectionChange={onChange}>
        <div>Form</div>
      </SettingsTemplate>,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Security'));
    expect(onChange).toHaveBeenCalledWith('security');
  });
});

describe('WizardTemplate', () => {
  const steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];

  it('renders steps', () => {
    render(
      <WizardTemplate title="Setup" steps={steps} currentStep={0}>
        <div>Step content</div>
      </WizardTemplate>,
      { wrapper },
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('shows Back and Next buttons', () => {
    render(
      <WizardTemplate title="Setup" steps={steps} currentStep={1}>
        <div>Content</div>
      </WizardTemplate>,
      { wrapper },
    );
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows Complete on last step', () => {
    render(
      <WizardTemplate title="Setup" steps={steps} currentStep={2} isLastStep>
        <div>Content</div>
      </WizardTemplate>,
      { wrapper },
    );
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('disables Back on first step', () => {
    render(
      <WizardTemplate title="Setup" steps={steps} currentStep={0}>
        <div>Content</div>
      </WizardTemplate>,
      { wrapper },
    );
    expect(screen.getByText('Back')).toBeDisabled();
  });
});

describe('CatalogTemplate', () => {
  const items = [
    { id: '1', title: 'Item 1', description: 'First item' },
    { id: '2', title: 'Item 2' },
  ];

  it('renders items', () => {
    render(<CatalogTemplate title="Catalog" items={items} />, { wrapper });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(
      <CatalogTemplate title="Catalog" items={[]} emptyState={<div data-testid="empty">No items</div>} />,
      { wrapper },
    );
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('calls onItemClick', () => {
    const onClick = vi.fn();
    render(<CatalogTemplate title="Catalog" items={items} onItemClick={onClick} />, { wrapper });
    fireEvent.click(screen.getByText('Item 1'));
    expect(onClick).toHaveBeenCalledWith(items[0]);
  });
});

describe('BuilderTemplate', () => {
  it('renders toolbar and canvas', () => {
    render(
      <BuilderTemplate
        title="Builder"
        toolbar={<div data-testid="toolbar">Toolbar</div>}
        canvas={<div data-testid="canvas">Canvas</div>}
      />,
      { wrapper },
    );
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('renders properties panel', () => {
    render(
      <BuilderTemplate
        title="Builder"
        toolbar={<div>Toolbar</div>}
        canvas={<div>Canvas</div>}
        propertiesPanel={<div data-testid="props">Properties</div>}
      />,
      { wrapper },
    );
    expect(screen.getByTestId('props')).toBeInTheDocument();
  });
});

describe('SplitViewTemplate', () => {
  it('renders list and detail panels', () => {
    render(
      <SplitViewTemplate
        title="Messages"
        listPanel={<div data-testid="list">List</div>}
        detailPanel={<div data-testid="detail">Detail</div>}
        hasSelection
      />,
      { wrapper },
    );
    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });

  it('shows placeholder when no selection', () => {
    render(
      <SplitViewTemplate
        title="Messages"
        listPanel={<div>List</div>}
        detailPanel={<div>Detail</div>}
      />,
      { wrapper },
    );
    expect(screen.getByText('Select an item to view details')).toBeInTheDocument();
  });
});

describe('EmptyStateTemplate', () => {
  it('renders title and description', () => {
    render(
      <EmptyStateTemplate title="No workflows yet" description="Create your first workflow." />,
      { wrapper },
    );
    expect(screen.getByText('No workflows yet')).toBeInTheDocument();
    expect(screen.getByText('Create your first workflow.')).toBeInTheDocument();
  });

  it('renders action button', () => {
    const onAction = vi.fn();
    render(
      <EmptyStateTemplate title="No items" actionLabel="Create" onAction={onAction} />,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Create'));
    expect(onAction).toHaveBeenCalled();
  });
});
