#!/usr/bin/env node
const program = require('commander');
const prompt = require('./src/prompt.js');
program
  .version('0.0.1', '-v, --version')

program
  .command('init')
  .action(() => {
    prompt.init();
  })
program
  .command('add')
  .action(() => {
    prompt.add();
  })

program.parse(process.argv);
