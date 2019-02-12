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
      console.log(`拉取${key} 中...\n`);
      return Template.add(key, path.join(this.config.SITE_INIT_DIR, this.config.SITE_CONTAINER)).then(path => {
        console.log(`拉取${key} 完成...\n`);
        return path;
      });
    });
    return Promise.all(promises).then(pathList => {
      // 写入.env配置
      const envConfig = makeConfig.getEnvs(pathList.map(item => path.join(item, '.env')));
      const COMPOSE_PATH_SEPARATOR = envConfig['COMPOSE_PATH_SEPARATOR'] || process.platform === 'win32'? ';' : ':';
      const COMPOSE_FILE = templateList.map(temp => path.join(this.config.SITE_CONTAINER, temp, 'docker-compose.yml')).join(COMPOSE_PATH_SEPARATOR);
      const envPath = path.join(this.config.SITE_INIT_DIR, '.env');
      if (!cover) {
        let oldConfig = makeConfig.rEnv(envPath).parsed;
        envConfig['COMPOSE_FILE'] = `${oldConfig['COMPOSE_FILE']}${COMPOSE_PATH_SEPARATOR}${COMPOSE_FILE}`;
      } else {
        envConfig['COMPOSE_FILE'] = `docker-compose.yml${COMPOSE_PATH_SEPARATOR}${COMPOSE_FILE}`;
      }
      makeConfig.wEnv(envConfig, envPath, cover);
      // 写入.site.js配置
      const configPath = path.join(this.config.SITE_INIT_DIR, '.site.js');
      makeConfig.wSite({ template: templateList },configPath , cover);
      return pathList;
    });
  }
  /**
   * @param templateList 模板列表
   * @param cwd 初始化时，模板及配置文件存放路径
   */
  init (templateList = []) {
    fs.mkdirSync(this.config.SITE_INIT_DIR, { recursive: true });
    fs.mkdirSync(this.config.SITE_DOWNLOAD, { recursive: true });
    makeConfig.wYml(path.join(this.config.SITE_INIT_DIR, 'docker-compose.yml'));
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
