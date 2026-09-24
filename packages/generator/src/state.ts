import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';

export interface FileState {
  category: 'system-generated' | 'scaffold';
  hash?: string;
  createdAt: string;
}

export interface GeneratorState {
  generatorVersion: string;
  schemaVersion: number;
  manifestHash: string;
  files: Record<string, FileState>;
}

const STATE_DIR = '.dashboard-bootstrap';
const STATE_FILE = 'state.json';
const GENERATOR_VERSION = '0.1.0';

export function getStatePath(outputDir: string): string {
  return join(outputDir, STATE_DIR, STATE_FILE);
}

export function readState(outputDir: string): GeneratorState | null {
  const statePath = getStatePath(outputDir);
  if (!existsSync(statePath)) {
    return null;
  }
  const raw = readFileSync(statePath, 'utf-8');
  return JSON.parse(raw) as GeneratorState;
}

export function writeState(outputDir: string, state: GeneratorState): void {
  const statePath = getStatePath(outputDir);
  mkdirSync(dirname(statePath), { recursive: true });
  writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n', 'utf-8');
}

export function createInitialState(manifestHash: string): GeneratorState {
  return {
    generatorVersion: GENERATOR_VERSION,
    schemaVersion: 1,
    manifestHash,
    files: {},
  };
}

export function contentHash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}
