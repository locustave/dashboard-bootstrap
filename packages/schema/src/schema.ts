import { TEMPLATE_NAMES, ICON_NAMES, THEME_PRESET_NAMES } from './vocabulary';

/**
 * JSON Schema (draft 2020-12) for dashboard.yaml manifest v1.
 */
export const ManifestSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object' as const,
  required: ['version', 'application', 'navigation', 'pages'],
  additionalProperties: false,
  properties: {
    version: {
      type: 'integer' as const,
      const: 1,
    },
    application: {
      type: 'object' as const,
      required: ['name'],
      additionalProperties: false,
      properties: {
        name: { type: 'string' as const, minLength: 1 },
        description: { type: 'string' as const },
        companyName: { type: 'string' as const, minLength: 1 },
        logo: { type: 'string' as const, minLength: 1 },
        collapsedLogo: { type: 'string' as const, minLength: 1 },
        theme: {
          oneOf: [
            { type: 'string' as const, enum: [...THEME_PRESET_NAMES] },
            {
              type: 'object' as const,
              required: ['preset'],
              additionalProperties: false,
              properties: {
                preset: { type: 'string' as const, enum: [...THEME_PRESET_NAMES] },
                colors: {
                  type: 'object' as const,
                  additionalProperties: false,
                  properties: {
                    primary: { type: 'string' as const, pattern: '^#[0-9A-Fa-f]{6}$' },
                    primaryHover: { type: 'string' as const, pattern: '^#[0-9A-Fa-f]{6}$' },
                    primarySoft: { type: 'string' as const, pattern: '^#[0-9A-Fa-f]{6}$' },
                    complete: { type: 'string' as const, pattern: '^#[0-9A-Fa-f]{6}$' },
                  },
                },
              },
            },
          ],
        },
      },
    },
    navigation: {
      type: 'array' as const,
      minItems: 1,
      items: { $ref: '#/$defs/NavigationItem' },
    },
    pages: {
      type: 'object' as const,
      minProperties: 1,
      additionalProperties: { $ref: '#/$defs/PageDefinition' },
    },
  },
  $defs: {
    NavigationItem: {
      type: 'object' as const,
      required: ['label', 'icon', 'route'],
      additionalProperties: false,
      properties: {
        label: { type: 'string' as const, minLength: 1 },
        icon: { type: 'string' as const, enum: [...ICON_NAMES] },
        route: { type: 'string' as const, pattern: '^/' },
        children: {
          type: 'array' as const,
          items: { $ref: '#/$defs/NavigationItem' },
        },
        group: { type: 'string' as const, minLength: 1 },
        position: { type: 'string' as const, enum: ['top', 'bottom'] },
      },
    },
    PageDefinition: {
      type: 'object' as const,
      required: ['route', 'template'],
      additionalProperties: false,
      properties: {
        route: { type: 'string' as const, pattern: '^/' },
        template: { type: 'string' as const, enum: [...TEMPLATE_NAMES] },
        capabilities: {
          type: 'object' as const,
          additionalProperties: { type: 'boolean' as const },
        },
      },
    },
  },
} as const;
