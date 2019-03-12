#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const prompt = require('../src/prompt.js');
const Command = require('../src/command.js');

module.exports = function () {
  program
    .version('0.0.1', '-v, --version');

  program
    .command('init <project-name>')
    .description('create a new project')
    .action((projectName) => {
      const rootPath = path.join(process.cwd(), projectName);
      const command = new Command({ SITE_INIT_DIR:   rootPath });
      prompt.init().then((templateList) => {
        command.init(templateList);
      });
    });
  program
    .command('add [template]')
    .action((template) => {
      const command = new Command();
      if (template) command.add([template]);
      else prompt.add().then(templateList => {
        command.add(templateList);
      });
    });

  program.parse(process.argv);
}
