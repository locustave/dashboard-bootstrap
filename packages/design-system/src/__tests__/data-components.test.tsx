import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardThemeProvider } from '../theme/DashboardThemeProvider';
import { AppCard } from '../components/AppCard';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { FilterBar } from '../components/FilterBar';
import { SearchInput } from '../components/SearchInput';
import { AppDataTable } from '../components/AppDataTable';
import { AppDrawer } from '../components/AppDrawer';
import { AppDialog } from '../components/AppDialog';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DashboardThemeProvider>{children}</DashboardThemeProvider>
);

// --- AppCard ---
describe('AppCard', () => {
  it('renders children', () => {
    render(<AppCard><div data-testid="child">Content</div></AppCard>, { wrapper });
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<AppCard title="Revenue">Content</AppCard>, { wrapper });
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders title as h3', () => {
    render(<AppCard title="Revenue">Content</AppCard>, { wrapper });
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Revenue');
  });

  it('handles click when interactive', () => {
    const onClick = vi.fn();
    render(<AppCard interactive onClick={onClick}>Click me</AppCard>, { wrapper });
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});

// --- MetricCard ---
describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="Revenue" value="$12,345" />, { wrapper });
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  it('renders trend when provided', () => {
    render(
      <MetricCard label="Users" value="1,234" trend={{ direction: 'up', value: '+12%' }} />,
      { wrapper },
    );
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('renders without trend', () => {
    render(<MetricCard label="Orders" value="567" />, { wrapper });
    expect(screen.getByText('567')).toBeInTheDocument();
  });
});

// --- StatusBadge ---
describe('StatusBadge', () => {
  it('renders label', () => {
    render(<StatusBadge label="Active" variant="success" />, { wrapper });
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it.each(['success', 'warning', 'error', 'info', 'neutral'] as const)(
    'renders %s variant',
    (variant) => {
      render(<StatusBadge label={variant} variant={variant} />, { wrapper });
      expect(screen.getByText(variant)).toBeInTheDocument();
    },
  );

  it('renders with dot', () => {
    const { container } = render(
      <StatusBadge label="Active" variant="success" showDot />,
      { wrapper },
    );
    // Dot is a small span element
    expect(container.querySelectorAll('span').length).toBeGreaterThan(1);
  });
});

// --- FilterBar ---
describe('FilterBar', () => {
  it('renders children', () => {
    render(
      <FilterBar>
        <button data-testid="filter1">Filter 1</button>
        <button data-testid="filter2">Filter 2</button>
      </FilterBar>,
      { wrapper },
    );
    expect(screen.getByTestId('filter1')).toBeInTheDocument();
    expect(screen.getByTestId('filter2')).toBeInTheDocument();
  });
});

// --- SearchInput ---
describe('SearchInput', () => {
  it('renders with placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Search users..." />, { wrapper });
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />, { wrapper });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('shows clear button when value exists', () => {
    render(<SearchInput value="query" onChange={() => {}} />, { wrapper });
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears on clear button click', () => {
    const onChange = vi.fn();
    render(<SearchInput value="query" onChange={onChange} />, { wrapper });
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(onChange).toHaveBeenCalledWith('');
  });
});

// --- AppDataTable ---
describe('AppDataTable', () => {
  const columns = [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email' },
  ];
  const rows = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];

  it('renders column headers', () => {
    render(
      <AppDataTable columns={columns} rows={rows} getRowKey={(r) => r.name} />,
      { wrapper },
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(
      <AppDataTable columns={columns} rows={rows} getRowKey={(r) => r.name} />,
      { wrapper },
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('renders empty state when no rows', () => {
    render(
      <AppDataTable
        columns={columns}
        rows={[]}
        getRowKey={(r) => r.name}
        emptyState={<div data-testid="empty">No data</div>}
      />,
      { wrapper },
    );
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('calls onSort when sortable header clicked', () => {
    const onSort = vi.fn();
    render(
      <AppDataTable columns={columns} rows={rows} getRowKey={(r) => r.name} onSort={onSort} />,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Name'));
    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('calls onRowClick when row clicked', () => {
    const onRowClick = vi.fn();
    render(
      <AppDataTable columns={columns} rows={rows} getRowKey={(r) => r.name} onRowClick={onRowClick} />,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });
});

// --- AppDrawer ---
describe('AppDrawer', () => {
  it('renders title and content when open', () => {
    render(
      <AppDrawer open onClose={() => {}} title="Details">
        <div data-testid="drawer-content">Drawer body</div>
      </AppDrawer>,
      { wrapper },
    );
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
  });

  it('has close button', () => {
    render(
      <AppDrawer open onClose={() => {}} title="Details">
        Content
      </AppDrawer>,
      { wrapper },
    );
    expect(screen.getByLabelText('Close drawer')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <AppDrawer open onClose={onClose} title="Details">
        Content
      </AppDrawer>,
      { wrapper },
    );
    fireEvent.click(screen.getByLabelText('Close drawer'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders footer when provided', () => {
    render(
      <AppDrawer open onClose={() => {}} footer={<button>Save</button>}>
        Content
      </AppDrawer>,
      { wrapper },
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});

// --- AppDialog ---
describe('AppDialog', () => {
  it('renders title and content when open', () => {
    render(
      <AppDialog open onClose={() => {}} title="Confirm">
        <div data-testid="dialog-content">Are you sure?</div>
      </AppDialog>,
      { wrapper },
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <AppDialog open onClose={() => {}} title="Delete" description="This cannot be undone.">
        Content
      </AppDialog>,
      { wrapper },
    );
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  it('has close button', () => {
    render(
      <AppDialog open onClose={() => {}} title="Test">
        Content
      </AppDialog>,
      { wrapper },
    );
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <AppDialog open onClose={onClose} title="Test">
        Content
      </AppDialog>,
      { wrapper },
    );
    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders footer', () => {
    render(
      <AppDialog open onClose={() => {}} footer={<button>Delete</button>}>
        Content
      </AppDialog>,
      { wrapper },
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
