const fs = require('fs-extra');
const stringify = require('json-stable-stringify-without-jsonify');
const path = require('path');

class Conf {
  static wSite (config, filePath = '.site.js', cover = true) {
    if (!cover) {
      const oldConfig = Conf.rSite(filePath);
      if (oldConfig && oldConfig.template && config.template) config.template = [...config.template, ...oldConfig.template];
    }
    const content = `module.exports = ${stringify(config, { space: 4 })};`;
    fs.writeFileSync(filePath, content, 'utf8');
  }

  static rSite (filePath = '.site.js') {
    try {
      fs.accessSync(path, fs.constants.F_OK);
    } catch (error) {
      return null;
    }
    return require(filePath);
  }

  static rEnv (path = '.env') {
    try {
      fs.accessSync(path, fs.constants.F_OK);
    } catch (error) {
      return null;
    }
    return require('dotenv').config({path});
  }
  static wEnv (config, filePath = '.env') {
    let str = '';
    for (let key in config) {
      str += `${key}=${config[key]}\n`;
    }
    fs.appendFileSync(filePath, str, 'utf8');
  }
  static getEnvs (envPathList = []) {
    let envConfig = {};
    for (let dirPath of envPathList) {
      const obj = Conf.rEnv(dirPath);
      if (obj && obj.parsed) Object.assign(envConfig, obj.parsed);
    }
    return envConfig;
  }

}
module.exports = Conf;
