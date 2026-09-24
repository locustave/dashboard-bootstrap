import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DashboardThemeProvider } from '../theme/DashboardThemeProvider';
import { resolveThemeColors } from '../form/presets';
import { Field, TextInput } from '../form/Field';
import { Stepper } from '../form/Stepper';
import { SummaryField } from '../form/SummaryField';
import { SuggestionChip, SuggestionGroup } from '../form/SuggestionChip';
import { SelectableCard, SelectableCardGrid } from '../form/SelectableCard';
import { UploadField } from '../form/UploadField';
import { FormShell, FormStack } from '../form/FormShell';
import { FormSectionLabel } from '../form/FormSectionLabel';
import { SuccessState } from '../form/SuccessState';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DashboardThemeProvider>{children}</DashboardThemeProvider>
);

const orangeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DashboardThemeProvider themeColors={resolveThemeColors('orange')}>{children}</DashboardThemeProvider>
);

// --- Field ---
describe('Field', () => {
  it('renders label and input', () => {
    render(<Field label="Name:" placeholder="Enter name" />, { wrapper });
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Field label="Email:" required />, { wrapper });
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('fires onChange', () => {
    const onChange = vi.fn();
    render(<Field label="Name:" value="" onChange={onChange} />, { wrapper });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('shows error message', () => {
    render(<Field label="Email:" error="Invalid email" />, { wrapper });
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('renders with custom theme without error', () => {
    render(<Field label="Name:" placeholder="Enter" />, { wrapper: orangeWrapper });
    expect(screen.getByText('Name:')).toBeInTheDocument();
  });
});

// --- TextInput ---
describe('TextInput', () => {
  it('renders as an input element', () => {
    render(<TextInput placeholder="Type here" />, { wrapper });
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('renders with custom theme without error', () => {
    render(<TextInput placeholder="Type" />, { wrapper: orangeWrapper });
    expect(screen.getByPlaceholderText('Type')).toBeInTheDocument();
  });
});

// --- Stepper ---
describe('Stepper', () => {
  const steps = [
    { id: 'location', label: 'Location' },
    { id: 'position', label: 'Position' },
    { id: 'details', label: 'Details' },
  ];

  it('renders all step labels', () => {
    render(<Stepper currentStep={0} steps={steps} />, { wrapper });
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Position')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('has navigation role', () => {
    render(<Stepper currentStep={1} steps={steps} />, { wrapper });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders with custom theme without error', () => {
    render(<Stepper currentStep={2} steps={steps} />, { wrapper: orangeWrapper });
    expect(screen.getByText('Location')).toBeInTheDocument();
  });
});

// --- SummaryField ---
describe('SummaryField', () => {
  it('renders label and value', () => {
    render(<SummaryField label="City:" value="New York" />, { wrapper });
    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('renders checkmark when completed', () => {
    const { container } = render(<SummaryField label="City:" value="NY" completed />, { wrapper });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('is clickable when editable', () => {
    const onEdit = vi.fn();
    render(<SummaryField label="City:" value="NY" editable onEdit={onEdit} />, { wrapper });
    fireEvent.click(screen.getByRole('button'));
    expect(onEdit).toHaveBeenCalled();
  });
});

// --- SuggestionChip ---
describe('SuggestionChip', () => {
  it('renders children text', () => {
    render(<SuggestionChip>Frontend</SuggestionChip>, { wrapper });
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<SuggestionChip onClick={onClick}>Click me</SuggestionChip>, { wrapper });
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('supports aria-pressed for selected state', () => {
    render(<SuggestionChip selected>Active</SuggestionChip>, { wrapper });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders with custom theme without error', () => {
    render(<SuggestionChip selected>Tag</SuggestionChip>, { wrapper: orangeWrapper });
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });
});

// --- SelectableCard ---
describe('SelectableCard', () => {
  it('renders title and description', () => {
    render(<SelectableCard title="Option A" description="First option" />, { wrapper });
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('First option')).toBeInTheDocument();
  });

  it('has radio role', () => {
    render(<SelectableCard title="Option A" />, { wrapper });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('fires onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<SelectableCard title="Option A" onSelect={onSelect} />, { wrapper });
    fireEvent.click(screen.getByRole('radio'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('shows aria-checked when selected', () => {
    render(<SelectableCard title="Option A" selected />, { wrapper });
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not fire onSelect when disabled', () => {
    const onSelect = vi.fn();
    render(<SelectableCard title="Option A" onSelect={onSelect} disabled />, { wrapper });
    fireEvent.click(screen.getByRole('radio'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders with custom theme without error', () => {
    render(<SelectableCard title="Test" selected />, { wrapper: orangeWrapper });
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

// --- SelectableCardGrid ---
describe('SelectableCardGrid', () => {
  it('renders as radiogroup', () => {
    render(
      <SelectableCardGrid>
        <SelectableCard title="A" />
        <SelectableCard title="B" />
      </SelectableCardGrid>,
      { wrapper },
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});

// --- UploadField ---
describe('UploadField', () => {
  it('renders label', () => {
    render(<UploadField label="Photo" />, { wrapper });
    expect(screen.getByText('Photo')).toBeInTheDocument();
  });

  it('shows optional text', () => {
    render(<UploadField label="File" optional />, { wrapper });
    expect(screen.getByText('(optional)')).toBeInTheDocument();
  });

  it('renders upload button', () => {
    render(<UploadField label="File" />, { wrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with custom theme without error', () => {
    render(<UploadField label="Doc" />, { wrapper: orangeWrapper });
    expect(screen.getByText('Doc')).toBeInTheDocument();
  });
});

// --- FormShell ---
describe('FormShell', () => {
  it('renders children', () => {
    render(
      <FormShell>
        <span data-testid="child">content</span>
      </FormShell>,
      { wrapper },
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

// --- FormStack ---
describe('FormStack', () => {
  it('renders children', () => {
    render(
      <FormStack>
        <span>A</span>
        <span>B</span>
      </FormStack>,
      { wrapper },
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});

// --- FormSectionLabel ---
describe('FormSectionLabel', () => {
  it('renders label text', () => {
    render(<FormSectionLabel>Priority</FormSectionLabel>, { wrapper });
    expect(screen.getByText('Priority')).toBeInTheDocument();
  });
});

// --- SuccessState ---
describe('SuccessState', () => {
  it('renders title', () => {
    render(<SuccessState title="All done!" />, { wrapper });
    expect(screen.getByText('All done!')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<SuccessState title="Done" description="Your submission is complete." />, { wrapper });
    expect(screen.getByText('Your submission is complete.')).toBeInTheDocument();
  });

  it('renders default icon SVG', () => {
    const { container } = render(<SuccessState title="Done" />, { wrapper });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom theme without error', () => {
    render(<SuccessState title="Done" />, { wrapper: orangeWrapper });
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
