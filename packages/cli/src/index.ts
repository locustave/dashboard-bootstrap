import { init } from './commands/init';
import { validate } from './commands/validate';
import { generate } from './commands/generate';
import { addPageCommand } from './commands/add-page';
import { doctor } from './commands/doctor';

function printUsage(): void {
  console.log(`Usage: dashboard-bootstrap <command> [options]

Commands:
  init                              Scaffold a new project with an empty manifest
  validate <file>                   Validate a manifest without generating
  generate <file> [--runnable]       Validate and generate project from manifest
  add-page <name> --template <type> --manifest <file>  Add page to manifest + regenerate
  doctor                            Check environment, deps, and compatibility`);
}

export function run(args: string[]): number {
  const command = args[0];

  switch (command) {
    case 'init': {
      const targetDir = args[1] || '.';
      return init(targetDir);
    }

    case 'validate': {
      const file = args[1];
      if (!file) {
        console.error('Usage: dashboard-bootstrap validate <file>');
        return 1;
      }
      return validate(file);
    }

    case 'generate': {
      const file = args[1];
      if (!file) {
        console.error('Usage: dashboard-bootstrap generate <file>');
        return 1;
      }
      const runnable = args.includes('--runnable');
      return generate(file, { runnable });
    }

    case 'add-page': {
      const name = args[1];
      const templateIdx = args.indexOf('--template');
      const template = templateIdx !== -1 ? args[templateIdx + 1] : undefined;
      const manifestIdx = args.indexOf('--manifest');
      const manifest = manifestIdx !== -1 ? args[manifestIdx + 1] : 'dashboard.yaml';

      if (!name || !template) {
        console.error('Usage: dashboard-bootstrap add-page <name> --template <type> [--manifest <file>]');
        return 1;
      }
      return addPageCommand(manifest, name, template);
    }

    case 'doctor':
      return doctor();

    case '--help':
    case '-h':
    case undefined:
      printUsage();
      return 0;

    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      return 1;
  }
}

export { init } from './commands/init';
export { validate } from './commands/validate';
export { generate } from './commands/generate';
export { addPageCommand } from './commands/add-page';
export { doctor } from './commands/doctor';
