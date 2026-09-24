import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, isAbsolute } from 'node:path';
import type { DashboardManifest } from '@dashboard-bootstrap/schema';
import { validateManifest } from '@dashboard-bootstrap/schema';
import type { GenerateOptions, GenerateResult, FileEntry, DriftWarning } from './types';
import { readState, writeState, createInitialState, contentHash } from './state';
import type { GeneratorState } from './state';
import { generateRoutes, pageComponentName } from './templates/routes';
import { generateNavigation } from './templates/navigation';
import { generateDashboardConfig } from './templates/dashboard-config';
import { generateScaffoldPage } from './templates/scaffold-page';
import { generatePackageJson, generateIndexHtml, generateViteConfig, generateTsConfig, generateMainTsx, generateAppTsx } from './templates/project-shell';
import { generateClaudeMd } from './templates/claude-md';
import { generateDesignMd } from './templates/design-md';
import { generateThemeConfig } from './templates/theme-config';

function ensureContained(outputDir: string, filePath: string): void {
  const resolved = resolve(outputDir, filePath);
  const resolvedRoot = resolve(outputDir);
  if (!resolved.startsWith(resolvedRoot + '/') && resolved !== resolvedRoot) {
    throw new Error(`Path escapes output root: ${filePath}`);
  }
}

function writeFileContained(outputDir: string, relativePath: string, content: string): void {
  ensureContained(outputDir, relativePath);
  const fullPath = join(outputDir, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content, 'utf-8');
}

function readFileIfExists(outputDir: string, relativePath: string): string | null {
  const fullPath = join(outputDir, relativePath);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

export function generate(manifest: DashboardManifest, options: GenerateOptions): GenerateResult {
  const { outputDir } = options;
  const files: FileEntry[] = [];
  const driftWarnings: DriftWarning[] = [];

  // 1. Read existing state
  const priorState = readState(outputDir);
  const manifestJson = JSON.stringify(manifest);
  const manifestHashValue = contentHash(manifestJson);
  const state: GeneratorState = priorState ?? createInitialState(manifestHashValue);
  state.manifestHash = manifestHashValue;

  // 2. Write system-generated files
  const systemFiles: Array<{ path: string; content: string }> = [
    { path: 'src/generated/routes.generated.tsx', content: generateRoutes(manifest) },
    { path: 'src/generated/navigation.generated.ts', content: generateNavigation(manifest) },
    { path: 'src/generated/dashboard.generated.ts', content: generateDashboardConfig(manifest) },
    { path: 'src/generated/theme.generated.ts', content: generateThemeConfig(manifest) },
  ];

  if (options.runnable) {
    systemFiles.push(
      { path: 'package.json', content: generatePackageJson(manifest) },
      { path: 'index.html', content: generateIndexHtml(manifest) },
      { path: 'vite.config.ts', content: generateViteConfig() },
      { path: 'tsconfig.json', content: generateTsConfig() },
      { path: 'src/main.tsx', content: generateMainTsx() },
      { path: 'src/App.tsx', content: generateAppTsx(manifest) },
    );
  }

  for (const file of systemFiles) {
    const newHash = contentHash(file.content);
    const priorFileState = state.files[file.path];

    // Drift detection: check if on-disk content differs from stored hash
    if (priorFileState?.category === 'system-generated' && priorFileState.hash) {
      const existing = readFileIfExists(outputDir, file.path);
      if (existing !== null) {
        const onDiskHash = contentHash(existing);
        if (onDiskHash !== priorFileState.hash) {
          driftWarnings.push({
            path: file.path,
            message: `File was modified externally (expected hash ${priorFileState.hash.slice(0, 8)}..., found ${onDiskHash.slice(0, 8)}...). Overwriting with generated content.`,
          });
        }
      }
    }

    const existed = priorFileState != null;
    writeFileContained(outputDir, file.path, file.content);
    state.files[file.path] = {
      category: 'system-generated',
      hash: newHash,
      createdAt: priorFileState?.createdAt ?? new Date().toISOString(),
    };
    files.push({
      path: file.path,
      category: 'system-generated',
      disposition: existed ? 'updated' : 'created',
    });
  }

  // 3. Write project docs (scaffold — never overwrite)
  const docFiles: Array<{ path: string; content: string }> = [
    { path: 'CLAUDE.md', content: generateClaudeMd(manifest) },
    { path: 'DESIGN.md', content: generateDesignMd() },
  ];

  for (const doc of docFiles) {
    const existsOnDisk = readFileIfExists(outputDir, doc.path) !== null;
    const trackedAsScaffold = state.files[doc.path]?.category === 'scaffold';

    if (existsOnDisk || trackedAsScaffold) {
      files.push({
        path: doc.path,
        category: 'scaffold',
        disposition: 'skipped',
      });
    } else {
      writeFileContained(outputDir, doc.path, doc.content);
      state.files[doc.path] = {
        category: 'scaffold',
        createdAt: new Date().toISOString(),
      };
      files.push({
        path: doc.path,
        category: 'scaffold',
        disposition: 'created',
      });
    }
  }

  // 4. Write scaffold pages (never overwrite)
  for (const [pageId, page] of Object.entries(manifest.pages)) {
    const comp = pageComponentName(pageId);
    const scaffoldPath = `src/pages/${comp}.tsx`;
    const existsOnDisk = readFileIfExists(outputDir, scaffoldPath) !== null;
    const trackedAsScaffold = state.files[scaffoldPath]?.category === 'scaffold';

    if (existsOnDisk || trackedAsScaffold) {
      files.push({
        path: scaffoldPath,
        category: 'scaffold',
        disposition: 'skipped',
      });
    } else {
      const content = generateScaffoldPage(pageId, page.template);
      writeFileContained(outputDir, scaffoldPath, content);
      state.files[scaffoldPath] = {
        category: 'scaffold',
        createdAt: new Date().toISOString(),
      };
      files.push({
        path: scaffoldPath,
        category: 'scaffold',
        disposition: 'created',
      });
    }
  }

  // 5. Write updated state
  writeState(outputDir, state);

  return { success: true, files, driftWarnings };
}
