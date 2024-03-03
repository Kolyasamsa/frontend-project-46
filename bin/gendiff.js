#!/usr/bin/env node

import { program } from 'commander';
import getDiff from '../src/getDifference.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const result = getDiff(filepath1, filepath2)
    console.log(result)
  })

program.parse();