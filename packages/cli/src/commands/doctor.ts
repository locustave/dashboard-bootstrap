import { execSync } from 'node:child_process';

interface Check {
  name: string;
  test: () => boolean;
}

function hasCommand(cmd: string): boolean {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkNodeVersion(): boolean {
  const version = process.versions.node;
  const major = parseInt(version.split('.')[0], 10);
  return major >= 20;
}

export function doctor(): number {
  const checks: Check[] = [
    { name: 'Node.js >= 20', test: checkNodeVersion },
    { name: 'pnpm available', test: () => hasCommand('pnpm') },
    { name: 'TypeScript available', test: () => hasCommand('tsc') },
  ];

  let allPassed = true;

  for (const check of checks) {
    const passed = check.test();
    const icon = passed ? '✓' : '✗';
    console.log(`  ${icon} ${check.name}`);
    if (!passed) allPassed = false;
  }

  if (allPassed) {
    console.log('\nEnvironment is ready.');
    return 0;
  } else {
    console.error('\nEnvironment issues detected.');
    return 3;
  }
}
