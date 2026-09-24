import { describe, it, expect } from 'vitest';
import { dashboardTheme } from '../theme';
import { tokens } from '../tokens';

describe('dashboardTheme', () => {
  it('sets primary palette to action.primary', () => {
    expect(dashboardTheme.palette.primary.main).toBe(tokens.colors.action.primary);
  });

  it('sets background default to background.app', () => {
    expect(dashboardTheme.palette.background.default).toBe(tokens.colors.background.app);
  });

  it('sets background paper to background.surface', () => {
    expect(dashboardTheme.palette.background.paper).toBe(tokens.colors.background.surface);
  });

  it('sets text primary to text.primary token', () => {
    expect(dashboardTheme.palette.text.primary).toBe(tokens.colors.text.primary);
  });

  it('uses Inter font family', () => {
    expect(dashboardTheme.typography.fontFamily).toContain('Inter');
  });

  it('maps h1 to pageTitle spec', () => {
    expect(dashboardTheme.typography.h1?.fontSize).toBe(tokens.type.pageTitle.size);
    expect(dashboardTheme.typography.h1?.fontWeight).toBe(tokens.type.pageTitle.weight);
  });

  it('maps h2 to sectionHeading spec', () => {
    expect(dashboardTheme.typography.h2?.fontSize).toBe(tokens.type.sectionHeading.size);
  });

  it('maps h3 to cardTitle spec', () => {
    expect(dashboardTheme.typography.h3?.fontSize).toBe(tokens.type.cardTitle.size);
  });

  it('disables button text transform', () => {
    expect(dashboardTheme.typography.button?.textTransform).toBe('none');
  });

  it('sets base spacing to 4 (base-4 scale)', () => {
    expect(dashboardTheme.spacing(1)).toBe('4px');
  });

  it('sets default border radius to radius.md', () => {
    expect(dashboardTheme.shape.borderRadius).toBe(tokens.radius.md);
  });

  it('sets divider color to border.default', () => {
    expect(dashboardTheme.palette.divider).toBe(tokens.colors.border.default);
  });

  it('sets error palette from status tokens', () => {
    expect(dashboardTheme.palette.error.main).toBe(tokens.colors.status.error);
  });

  it('sets success palette from status tokens', () => {
    expect(dashboardTheme.palette.success.main).toBe(tokens.colors.status.success);
  });
});
