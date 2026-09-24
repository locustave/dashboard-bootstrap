import { describe, it, expect } from 'vitest';
import { ICON_NAMES } from '@dashboard-bootstrap/schema';
import { ICON_REGISTRY_KEYS } from '@dashboard-bootstrap/design-system';

describe('Icon Coverage', () => {
  it('every IconName in schema is handled by the Icon component registry', () => {
    const registrySet = new Set(ICON_REGISTRY_KEYS);

    const missing: string[] = [];
    for (const iconName of ICON_NAMES) {
      if (!registrySet.has(iconName)) {
        missing.push(iconName);
      }
    }

    expect(
      missing,
      `Icon registry is missing entries for: ${missing.join(', ')}`,
    ).toHaveLength(0);
  });

  it('schema ICON_NAMES count matches registry key count', () => {
    expect(ICON_NAMES.length).toBe(ICON_REGISTRY_KEYS.length);
  });
});
