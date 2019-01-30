#!/usr/bin/env node
const program = require('commander');
const prompt = require('../src/prompt.js');
const Command = require('../src/command.js');

const command = new Command();
program
  .version('0.0.1', '-v, --version');

program
  .command('init')
  .action(() => {
    prompt.init().then((templateList) => {
      command.init(templateList);
    });
  });
program
  .command('add [template]')
  .action((template) => {
    if (template) command.add([template]);
    else prompt.add().then(templateList => {
      command.add(templateList);
    });
  });

program.parse(process.argv);
