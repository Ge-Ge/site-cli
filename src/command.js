'use strict';
const Template = require('./utils/template.js');
const makeConfig = require('./utils/makeConfig.js');
const path = require('path');
const fs = require('fs-extra');
const defaultConfig = require('../config.js');

class Command {

  constructor (config) {
    this.config = Object.assign({}, defaultConfig, config);
  }

  _exec (templateList, cover = true) {
    const promises = templateList.map(async (key) => {
      return Template.add(key, path.join(this.config.SITE_INIT_DIR, this.config.SITE_CONTAINER));
    });
    return Promise.all(promises).then(res => {
      const envConfig = makeConfig.getEnvs(res.map(item => path.join(item, '.env')));
      const envPath = path.join(this.config.SITE_INIT_DIR, '.env');
      const configPath = path.join(this.config.SITE_INIT_DIR, '.site.js');
      makeConfig.wEnv(envConfig, envPath, cover);
      makeConfig.wSite({ template: templateList },configPath , cover);
      return res;
    });
  }
  /**
   * @param templateList 模板列表
   * @param cwd 初始化时，模板及配置文件存放路径
   */
  init (templateList = []) {
    fs.mkdirSync(this.config.SITE_DOWNLOAD, { recursive: true });
    return this._exec(templateList, true);
  }

  /**
   *
   * @param templateList 模板列表
   * @param cwd 添加模板时，模板及配置文件存放路径
   */
  add (templateList = []) {
    return this._exec(templateList, false);
  }

}

module.exports = Command;
