'use strict';
const inquirer = require('inquirer');
class Prompt {
  static add () {
    const questions = [
      {
        type: 'checkbox',
        message: '选择需要添加的模板',
        name: 'template',
        choices: [
          new inquirer.Separator(' = 数据库 = '),
          {
            name: 'mysql'
          },
          new inquirer.Separator(' = http服务 = '),
          {
            name: 'nginx'
          },
          new inquirer.Separator(' = 缓存 ='),
          {
            name: 'redis'
          }
        ],
        validate: function (answer) {
          if (answer.length < 1) {
            return 'You must choose at least one template.';
          }
          return true;
        }
      }
    ];
    return inquirer.prompt(questions).then(answers => {
      return answers.template;
    });
  }
  static init () {
    const questions = [
      {
        type: 'list',
        name: 'db',
        message: '选择数据库',
        choices: ['Mysql', { name: 'mongo', disabled: '暂不支持' }, { name: 'PostgreSQL', disabled: '暂不支持' }, { name: '不需要' }],
        filter: function (val) {
          return val.toLowerCase();
        }
      },
      {
        type: 'list',
        name: 'server',
        message: '选择服务器',
        choices: ['Nginx', { name: 'Apache', disabled: '暂不支持' }],
        filter: function (val) {
          return val.toLowerCase();
        }
      },
      {
        type: 'list',
        name: 'cache',
        message: '选择缓存',
        choices: ['redis', { name: 'memcached', disabled: '暂不支持' }],
        filter: function (val) {
          return val.toLowerCase();
        }
      },
    ];
    return inquirer.prompt(questions).then(answers => {
      const list = [];
      for (let key in answers) {
        if (answers.hasOwnProperty(key)) list.push(answers[key]);
      }
      return list;
    });
  }
}
module.exports = Prompt;
