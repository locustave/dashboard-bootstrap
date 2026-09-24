import Ajv2020 from 'ajv/dist/2020';
import { ManifestSchema } from './schema';
import { CAPABILITIES, TEMPLATE_NAMES, ICON_NAMES } from './vocabulary';
import type { DashboardManifest, NavigationItem, ValidationError, ValidationResult } from './types';
import type { TemplateName } from './vocabulary';

const ajv = new Ajv2020({ allErrors: true });
const structuralValidate = ajv.compile(ManifestSchema);

/**
 * Collect all routes from navigation items (recursively).
 */
function collectNavRoutes(items: NavigationItem[]): string[] {
  const routes: string[] = [];
  for (const item of items) {
    routes.push(item.route);
    if (item.children) {
      routes.push(...collectNavRoutes(item.children));
    }
  }
  return routes;
}

/**
 * Check for duplicate values in an array, returning indices of duplicates.
 */
function findDuplicates(values: string[]): Map<string, number[]> {
  const seen = new Map<string, number[]>();
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    const indices = seen.get(v);
    if (indices) {
      indices.push(i);
    } else {
      seen.set(v, [i]);
    }
  }
  const dupes = new Map<string, number[]>();
  for (const [k, indices] of seen) {
    if (indices.length > 1) {
      dupes.set(k, indices);
    }
  }
  return dupes;
}

/**
 * Semantic validation: checks that go beyond JSON Schema structural correctness.
 */
function semanticValidation(manifest: DashboardManifest): ValidationError[] {
  const errors: ValidationError[] = [];

  // Collect all page routes
  const pageEntries = Object.entries(manifest.pages);
  const pageRoutes = pageEntries.map(([, p]) => p.route);

  // Check for duplicate page routes
  const dupRoutes = findDuplicates(pageRoutes);
  for (const [route, indices] of dupRoutes) {
    for (const idx of indices) {
      const pageId = pageEntries[idx][0];
      errors.push({
        path: `pages.${pageId}.route`,
        message: `Duplicate route "${route}"`,
        rule: 'no-duplicate-routes',
      });
    }
  }

  // Check capabilities are valid for their template type
  for (const [pageId, page] of pageEntries) {
    if (!page.capabilities) continue;
    const templateName = page.template as TemplateName;
    const validCaps = CAPABILITIES[templateName];
    if (!validCaps) continue; // template validity already checked by schema

    for (const cap of Object.keys(page.capabilities)) {
      if (!validCaps.includes(cap)) {
        errors.push({
          path: `pages.${pageId}.capabilities.${cap}`,
          message: `Invalid capability "${cap}" for template "${templateName}". Valid capabilities: ${validCaps.join(', ')}`,
          rule: 'valid-capabilities',
        });
      }
    }
  }

  return errors;
}

/**
 * Cross-reference validation: checks relationships between navigation and pages.
 */
function crossReferenceValidation(manifest: DashboardManifest): ValidationError[] {
  const errors: ValidationError[] = [];

  const navRoutes = new Set(collectNavRoutes(manifest.navigation));
  const pageRoutes = new Set(Object.values(manifest.pages).map((p) => p.route));

  // Every navigation route should reference an existing page route
  // (or be a parent of a page route)
  for (const navRoute of navRoutes) {
    const hasDirectPage = pageRoutes.has(navRoute);
    const hasChildPage = [...pageRoutes].some(
      (pr) => pr.startsWith(navRoute + '/') || pr === navRoute,
    );
    if (!hasDirectPage && !hasChildPage) {
      errors.push({
        path: `navigation`,
        message: `Navigation route "${navRoute}" does not reference any page`,
        rule: 'nav-routes-reference-pages',
      });
    }
  }

  // Every page route should be navigable — either directly in navigation
  // or as a sub-route of a navigable route
  for (const [pageId, page] of Object.entries(manifest.pages)) {
    const isNavigable = navRoutes.has(page.route);
    const isSubRoute = [...navRoutes].some(
      (nr) => page.route.startsWith(nr + '/'),
    );
    if (!isNavigable && !isSubRoute) {
      errors.push({
        path: `pages.${pageId}.route`,
        message: `Page route "${page.route}" is not reachable from navigation`,
        rule: 'navigable-routes',
      });
    }
  }

  // Navigation children routes should be sub-routes of their parent
  function checkChildRoutes(items: NavigationItem[], parentPath: string): void {
    for (const item of items) {
      if (item.children) {
        for (const child of item.children) {
          if (!child.route.startsWith(item.route + '/') && child.route !== item.route) {
            errors.push({
              path: 'navigation',
              message: `Child route "${child.route}" is not a sub-route of parent "${item.route}"`,
              rule: 'child-routes-under-parent',
            });
          }
        }
        checkChildRoutes(item.children, item.route);
      }
    }
  }
  checkChildRoutes(manifest.navigation, '/');

  return errors;
}

/**
 * Validate a manifest input through structural (JSON Schema), semantic, and cross-reference layers.
 *
 * @param input - Unknown input to validate
 * @returns ValidationResult — either { valid: true, manifest } or { valid: false, errors }
 */
export function validateManifest(input: unknown): ValidationResult {
  // Structural validation via JSON Schema
  const valid = structuralValidate(input);
  if (!valid) {
    const errors: ValidationError[] = (structuralValidate.errors ?? []).map((err) => ({
      path: err.instancePath || '/',
      message: err.message ?? 'Unknown validation error',
      rule: 'schema',
    }));
    return { valid: false, errors };
  }

  // Input passes structural validation — safe to cast
  const manifest = input as DashboardManifest;

  // Semantic validation
  const semanticErrors = semanticValidation(manifest);

  // Cross-reference validation
  const crossRefErrors = crossReferenceValidation(manifest);

  const allErrors = [...semanticErrors, ...crossRefErrors];
  if (allErrors.length > 0) {
    return { valid: false, errors: allErrors };
  }

  return { valid: true, manifest };
}
