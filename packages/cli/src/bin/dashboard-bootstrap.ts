#!/usr/bin/env -S node --import tsx/esm

import { run } from '../index.js';

const exitCode = run(process.argv.slice(2));
process.exit(exitCode);
