'use strict';
const Template = require('./utils/template.js');
const makeConfig = require('./utils/makeConfig.js');
const path = require('path');

class Command {

  /**
   * @param templateList 模板列表
   * @param cwd 初始化时，模板及配置文件存放路径
   */
  static init (templateList, cwd = process.cwd()) {
    const promises = templateList.map(async (key) => {
      return Template.add(key, cwd);
    });
    Promise.all(promises).then(res => {
      const envConfig = makeConfig.getEnvs(res);
      makeConfig.wEnv(envConfig, path.join(cwd, '.env'));
      makeConfig.wSite({
        template: templateList
      }, path.join(cwd, '.site.js'), true);
    });
  }

  /**
   *
   * @param templateList 模板列表
   * @param cwd 添加模板时，模板及配置文件存放路径
   */
  static add (templateList = [], cwd = process.cwd()) {
    const promises = templateList.map(async (key) => {
      return Template.add(key, cwd);
    });
    Promise.all(promises).then(res => {
      const envConfig = makeConfig.getEnvs(res);
      makeConfig.wEnv(envConfig, path.join(cwd, '.env'));
      makeConfig.wSite({
        template: templateList
      }, path.join(cwd, '.site.js'), false);
    });
  }

}

module.exports = Command;
