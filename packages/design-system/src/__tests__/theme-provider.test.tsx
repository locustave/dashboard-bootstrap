import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardThemeProvider } from '../theme/DashboardThemeProvider';

describe('DashboardThemeProvider', () => {
  it('renders children', () => {
    render(
      <DashboardThemeProvider>
        <div data-testid="child">Hello</div>
      </DashboardThemeProvider>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('applies MUI theme to child components', () => {
    render(
      <DashboardThemeProvider>
        <button data-testid="btn">Click</button>
      </DashboardThemeProvider>,
    );
    expect(screen.getByTestId('btn')).toBeInTheDocument();
  });
});
