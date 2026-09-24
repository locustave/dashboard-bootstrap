import { describe, it, expect } from 'vitest';
import { tokens } from '../tokens';

describe('tokens', () => {
  describe('colors.neutral', () => {
    it('has all 10 shades from DESIGN_SYSTEM.md', () => {
      expect(tokens.colors.neutral[50]).toBe('#F8F9FA');
      expect(tokens.colors.neutral[100]).toBe('#F1F3F5');
      expect(tokens.colors.neutral[200]).toBe('#E5E7EB');
      expect(tokens.colors.neutral[300]).toBe('#D1D5DB');
      expect(tokens.colors.neutral[400]).toBe('#9CA3AF');
      expect(tokens.colors.neutral[500]).toBe('#6B7280');
      expect(tokens.colors.neutral[600]).toBe('#4B5563');
      expect(tokens.colors.neutral[700]).toBe('#374151');
      expect(tokens.colors.neutral[800]).toBe('#1F2937');
      expect(tokens.colors.neutral[900]).toBe('#111827');
    });
  });

  describe('colors.background', () => {
    it('matches DESIGN_SYSTEM.md semantic roles', () => {
      expect(tokens.colors.background.app).toBe('#F8F9FA');
      expect(tokens.colors.background.surface).toBe('#FFFFFF');
      expect(tokens.colors.background.surfaceHover).toBe('#F1F3F5');
      expect(tokens.colors.background.surfaceActive).toBe('#F1F3F5');
      expect(tokens.colors.background.overlay).toBe('rgba(0, 0, 0, 0.5)');
    });
  });

  describe('colors.action', () => {
    it('matches DESIGN_SYSTEM.md action colors', () => {
      expect(tokens.colors.action.primary).toBe('#2563EB');
      expect(tokens.colors.action.primaryHover).toBe('#1D4ED8');
      expect(tokens.colors.action.primaryMuted).toBe('#EFF6FF');
    });
  });

  describe('colors.status', () => {
    it('matches DESIGN_SYSTEM.md status colors', () => {
      expect(tokens.colors.status.success).toBe('#059669');
      expect(tokens.colors.status.successMuted).toBe('#ECFDF5');
      expect(tokens.colors.status.warning).toBe('#D97706');
      expect(tokens.colors.status.warningMuted).toBe('#FFFBEB');
      expect(tokens.colors.status.error).toBe('#DC2626');
      expect(tokens.colors.status.errorMuted).toBe('#FEF2F2');
      expect(tokens.colors.status.info).toBe('#2563EB');
      expect(tokens.colors.status.infoMuted).toBe('#EFF6FF');
    });
  });

  describe('colors.chart', () => {
    it('has 6 chart colors', () => {
      expect(tokens.colors.chart[1]).toBe('#2563EB');
      expect(tokens.colors.chart[2]).toBe('#7C3AED');
      expect(tokens.colors.chart[3]).toBe('#059669');
      expect(tokens.colors.chart[4]).toBe('#D97706');
      expect(tokens.colors.chart[5]).toBe('#DC2626');
      expect(tokens.colors.chart[6]).toBe('#6B7280');
    });
  });

  describe('spacing', () => {
    it('follows base-4 scale from DESIGN_SYSTEM.md', () => {
      expect(tokens.spacing.xxs).toBe(2);
      expect(tokens.spacing.xs).toBe(4);
      expect(tokens.spacing.sm).toBe(8);
      expect(tokens.spacing.md).toBe(12);
      expect(tokens.spacing.base).toBe(16);
      expect(tokens.spacing.lg).toBe(20);
      expect(tokens.spacing.xl).toBe(24);
      expect(tokens.spacing['2xl']).toBe(32);
      expect(tokens.spacing['3xl']).toBe(48);
      expect(tokens.spacing['4xl']).toBe(64);
    });
  });

  describe('radius', () => {
    it('matches DESIGN_SYSTEM.md radius values', () => {
      expect(tokens.radius.sm).toBe(4);
      expect(tokens.radius.md).toBe(8);
      expect(tokens.radius.lg).toBe(12);
      expect(tokens.radius.xl).toBe(16);
      expect(tokens.radius.full).toBe(9999);
    });
  });

  describe('elevation', () => {
    it('has none for resting surfaces', () => {
      expect(tokens.elevation.none).toBe('none');
    });

    it('has shadow values for floating elements', () => {
      expect(tokens.elevation.low).toContain('rgba');
      expect(tokens.elevation.medium).toContain('rgba');
      expect(tokens.elevation.high).toContain('rgba');
    });
  });

  describe('layout', () => {
    it('matches DESIGN_SYSTEM.md layout values', () => {
      expect(tokens.layout.sidebar.width).toBe(240);
      expect(tokens.layout.sidebar.collapsedWidth).toBe(64);
      expect(tokens.layout.header.height).toBe(56);
      expect(tokens.layout.page.paddingX).toBe(32);
      expect(tokens.layout.page.paddingTop).toBe(24);
      expect(tokens.layout.section.gap).toBe(24);
      expect(tokens.layout.contextPanel.width).toBe(400);
    });
  });

  describe('typography', () => {
    it('has correct page title spec', () => {
      expect(tokens.type.pageTitle.size).toBe(24);
      expect(tokens.type.pageTitle.weight).toBe(600);
      expect(tokens.type.pageTitle.lineHeight).toBe(32);
    });

    it('has correct body spec', () => {
      expect(tokens.type.body.size).toBe(14);
      expect(tokens.type.body.weight).toBe(400);
      expect(tokens.type.body.lineHeight).toBe(20);
    });

    it('has correct font families', () => {
      expect(tokens.font.sans).toContain('Inter');
      expect(tokens.font.mono).toContain('JetBrains Mono');
    });
  });

  describe('icon sizes', () => {
    it('matches DESIGN_SYSTEM.md icon sizes', () => {
      expect(tokens.icon.sm).toBe(16);
      expect(tokens.icon.md).toBe(20);
      expect(tokens.icon.lg).toBe(24);
    });
  });
});
