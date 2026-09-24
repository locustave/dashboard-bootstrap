import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardThemeProvider } from '../theme/DashboardThemeProvider';
import { AppForm } from '../components/AppForm';
import { FormField } from '../components/FormField';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Icon, ICON_REGISTRY_KEYS } from '../components/Icon';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DashboardThemeProvider>{children}</DashboardThemeProvider>
);

// --- AppForm ---
describe('AppForm', () => {
  it('renders children', () => {
    render(
      <AppForm>
        <input data-testid="input" />
      </AppForm>,
      { wrapper },
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders as a form element', () => {
    const { container } = render(<AppForm>fields</AppForm>, { wrapper });
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('calls onSubmit and prevents default', () => {
    const onSubmit = vi.fn();
    render(
      <AppForm onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </AppForm>,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });
});

// --- FormField ---
describe('FormField', () => {
  it('renders label', () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>,
      { wrapper },
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <FormField label="Name" required>
        <input />
      </FormField>,
      { wrapper },
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows help text', () => {
    render(
      <FormField label="Email" helpText="We will never share your email.">
        <input />
      </FormField>,
      { wrapper },
    );
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument();
  });

  it('shows error text instead of help text', () => {
    render(
      <FormField label="Email" helpText="Help" error="Invalid email">
        <input />
      </FormField>,
      { wrapper },
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });

  it('renders children (input)', () => {
    render(
      <FormField label="Name">
        <input data-testid="field-input" />
      </FormField>,
      { wrapper },
    );
    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });
});

// --- EmptyState ---
describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No items yet" />, { wrapper });
    expect(screen.getByText('No items yet')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<EmptyState title="No items" description="Create your first item." />, { wrapper });
    expect(screen.getByText('Create your first item.')).toBeInTheDocument();
  });

  it('renders action button', () => {
    const onAction = vi.fn();
    render(
      <EmptyState title="No items" actionLabel="Create Item" onAction={onAction} />,
      { wrapper },
    );
    fireEvent.click(screen.getByText('Create Item'));
    expect(onAction).toHaveBeenCalled();
  });

  it('renders icon slot', () => {
    render(
      <EmptyState title="Empty" icon={<span data-testid="icon">icon</span>} />,
      { wrapper },
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

// --- LoadingState ---
describe('LoadingState', () => {
  it('renders skeleton rows by default', () => {
    const { container } = render(<LoadingState />, { wrapper });
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(3);
  });

  it('renders custom number of skeleton rows', () => {
    const { container } = render(<LoadingState rows={5} />, { wrapper });
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(5);
  });

  it('renders spinner variant', () => {
    const { container } = render(<LoadingState variant="spinner" />, { wrapper });
    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });
});

// --- ErrorState ---
describe('ErrorState', () => {
  it('renders default title', () => {
    render(<ErrorState />, { wrapper });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<ErrorState title="Connection lost" />, { wrapper });
    expect(screen.getByText('Connection lost')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ErrorState description="Please check your connection." />, { wrapper });
    expect(screen.getByText('Please check your connection.')).toBeInTheDocument();
  });

  it('renders retry button', () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />, { wrapper });
    fireEvent.click(screen.getByText('Try again'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('renders custom retry label', () => {
    render(<ErrorState onRetry={() => {}} retryLabel="Reload" />, { wrapper });
    expect(screen.getByText('Reload')).toBeInTheDocument();
  });
});

// --- Icon ---
describe('Icon', () => {
  it('renders a known icon', () => {
    const { container } = render(<Icon name="home" />, { wrapper });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('returns null for unknown icon name', () => {
    const { container } = render(<Icon name="nonexistent-icon-xyz" />, { wrapper });
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders at sm size (16px)', () => {
    const { container } = render(<Icon name="home" size="sm" />, { wrapper });
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('height')).toBe('16');
  });

  it('renders at md size (20px) by default', () => {
    const { container } = render(<Icon name="home" />, { wrapper });
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.getAttribute('height')).toBe('20');
  });

  it('renders at lg size (24px)', () => {
    const { container } = render(<Icon name="home" size="lg" />, { wrapper });
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('registry covers all schema ICON_NAMES', () => {
    // This is a conformance check — all schema IconName values must be in the registry
    const schemaIconNames = [
      'activity', 'alert-circle', 'alert-triangle', 'archive', 'arrow-down', 'arrow-left',
      'arrow-right', 'arrow-up', 'bar-chart', 'bell', 'book', 'bookmark', 'box', 'briefcase',
      'building', 'calendar', 'check', 'check-circle', 'chevron-down', 'chevron-left',
      'chevron-right', 'chevron-up', 'circle', 'clipboard', 'clock', 'cloud', 'code', 'cog',
      'copy', 'credit-card', 'database', 'dollar-sign', 'download', 'edit', 'external-link',
      'eye', 'file', 'file-text', 'filter', 'flag', 'folder', 'globe', 'grid', 'hash', 'heart',
      'help-circle', 'home', 'image', 'inbox', 'info', 'key', 'layers', 'layout', 'link', 'list',
      'lock', 'log-out', 'mail', 'map', 'map-pin', 'menu', 'message-circle', 'minus', 'monitor',
      'more-horizontal', 'more-vertical', 'package', 'paperclip', 'pause', 'percent', 'phone',
      'pie-chart', 'play', 'plus', 'plus-circle', 'power', 'printer', 'refresh-cw', 'save',
      'search', 'send', 'server', 'settings', 'share', 'shield', 'shopping-cart', 'slash',
      'sliders', 'smartphone', 'star', 'stop-circle', 'sun', 'tag', 'target', 'terminal',
      'thumbs-down', 'thumbs-up', 'trash', 'trending-down', 'trending-up', 'truck', 'unlock',
      'upload', 'user', 'user-plus', 'users', 'x', 'x-circle', 'zap',
    ];

    for (const name of schemaIconNames) {
      expect(ICON_REGISTRY_KEYS).toContain(name);
    }
  });
});
