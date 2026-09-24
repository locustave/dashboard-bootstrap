import { resolve, dirname } from 'node:path';
import { addPage as runAddPage } from '@dashboard-bootstrap/generator';
import type { TemplateName } from '@dashboard-bootstrap/schema';
import { TEMPLATE_NAMES } from '@dashboard-bootstrap/schema';

export function addPageCommand(
  manifestPath: string,
  pageName: string,
  template: string,
): number {
  if (!TEMPLATE_NAMES.includes(template as TemplateName)) {
    console.error(`Invalid template: ${template}`);
    console.error(`Valid templates: ${TEMPLATE_NAMES.join(', ')}`);
    return 1;
  }

  const outputDir = resolve(dirname(manifestPath));

  try {
    const result = runAddPage(manifestPath, pageName, {
      template: template as TemplateName,
      outputDir,
    });

    if (!result.success) {
      console.error('Failed to add page. Manifest validation failed after modification.');
      return 1;
    }

    for (const warning of result.driftWarnings) {
      console.warn(`  drift: ${warning.path} — ${warning.message}`);
    }

    for (const file of result.files) {
      const icon = file.disposition === 'created' ? '+' : file.disposition === 'updated' ? '~' : '-';
      console.log(`  ${icon} ${file.path} (${file.category})`);
    }

    console.log(`Page "${pageName}" added successfully.`);
    return 0;
  } catch (err) {
    console.error(`Error adding page: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}
