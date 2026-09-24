import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { resolveThemeColors, themePresets } from '../form/presets';
import type { ThemeColors } from '../form/presets';
import { ThemeColorsProvider, useThemeColors } from '../form/ThemeContext';
import { DashboardThemeProvider } from '../theme/DashboardThemeProvider';

// --- resolveThemeColors ---
describe('resolveThemeColors', () => {
  it('defaults to purple when no config provided', () => {
    const colors = resolveThemeColors();
    expect(colors.primary).toBe('#5425E5');
  });

  it('resolves a preset by name', () => {
    const colors = resolveThemeColors('orange');
    expect(colors.primary).toBe('#E85D04');
    expect(colors.primaryHover).toBe('#CC5203');
    expect(colors.primarySoft).toBe('#FFF3E6');
  });

  it('resolves all named presets', () => {
    for (const name of Object.keys(themePresets)) {
      const colors = resolveThemeColors(name);
      expect(colors.primary).toBeTruthy();
      expect(colors.primaryHover).toBeTruthy();
      expect(colors.primarySoft).toBeTruthy();
      expect(colors.complete).toBeTruthy();
      expect(colors.completeText).toBeTruthy();
    }
  });

  it('falls back to purple for unknown preset name', () => {
    const colors = resolveThemeColors('nonexistent');
    expect(colors.primary).toBe('#5425E5');
  });

  it('applies color overrides on top of preset', () => {
    const colors = resolveThemeColors({ preset: 'blue', colors: { primary: '#000000' } });
    expect(colors.primary).toBe('#000000');
    // Other values come from blue preset
    expect(colors.primaryHover).toBe('#1D4ED8');
    expect(colors.primarySoft).toBe('#EFF6FF');
  });

  it('uses preset base when no overrides provided in object form', () => {
    const colors = resolveThemeColors({ preset: 'teal' });
    expect(colors.primary).toBe('#0D9488');
  });

  it('returns all five required ThemeColors fields', () => {
    const fields: (keyof ThemeColors)[] = ['primary', 'primaryHover', 'primarySoft', 'complete', 'completeText'];
    for (const preset of Object.keys(themePresets)) {
      const colors = resolveThemeColors(preset);
      for (const field of fields) {
        expect(colors[field]).toBeDefined();
        expect(typeof colors[field]).toBe('string');
        expect(colors[field]).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
  });
});

// --- ThemeColorsProvider / useThemeColors ---
function ColorProbe() {
  const tc = useThemeColors();
  return <span data-testid="probe">{tc.primary}</span>;
}

describe('ThemeColorsProvider', () => {
  it('provides default purple colors without explicit themeColors', () => {
    render(
      <ThemeColorsProvider>
        <ColorProbe />
      </ThemeColorsProvider>,
    );
    expect(screen.getByTestId('probe').textContent).toBe('#5425E5');
  });

  it('provides custom colors from themeColors prop', () => {
    const orange = resolveThemeColors('orange');
    render(
      <ThemeColorsProvider themeColors={orange}>
        <ColorProbe />
      </ThemeColorsProvider>,
    );
    expect(screen.getByTestId('probe').textContent).toBe('#E85D04');
  });
});

describe('DashboardThemeProvider with themeColors', () => {
  it('passes theme colors to context', () => {
    const green = resolveThemeColors('green');
    render(
      <DashboardThemeProvider themeColors={green}>
        <ColorProbe />
      </DashboardThemeProvider>,
    );
    expect(screen.getByTestId('probe').textContent).toBe('#059669');
  });

  it('defaults to purple when no themeColors provided', () => {
    render(
      <DashboardThemeProvider>
        <ColorProbe />
      </DashboardThemeProvider>,
    );
    expect(screen.getByTestId('probe').textContent).toBe('#5425E5');
  });
});
