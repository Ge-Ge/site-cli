const fs = require('fs-extra');
const path = require('path');
const config = require('../../config.js');
const simpleGit = require('simple-git/promise.js');
/**
 * @description 下载模板
 * @param name
 * @param to
 * @returns {Promise<*>}
 */
class Template {
  static async clone (name, to = config.SITE_DOWNLOAD) {
    try {
      fs.accessSync(to, fs.constants.F_OK);
    } catch (e) {
      fs.mkdirSync(config.SITE_DOWNLOAD, { recursive: true });
    }
    const exits = await Template.exists(name, to);
    if (exits) return simpleGit(to).pull('origin', config.GIT_BRANCH);
    return simpleGit(to).clone(`${config.GIT_REMOTE}/${config.GIT_USER}/${name}.git`, ['-b', config.GIT_BRANCH]);
  }

  static pull (name, to = config.SITE_DOWNLOAD) {
    return simpleGit(to).pull(`${config.GIT_REMOTE}/${config.GIT_USER}/${name}.git`);
  }

  static copy (name, to) {
    const target = path.join(config.SITE_DOWNLOAD, name, config.TEMPLATE_DIR);
    return fs.copy(target, to);
  }

  static async exists (name, to = config.SITE_DOWNLOAD) {
    const repoPath = path.join(to, name);
    try {
      fs.accessSync(repoPath, fs.constants.F_OK);
    } catch (e) {
      return false;
    }
    return simpleGit(repoPath).checkIsRepo();
  }
  // TODO 如果模板存在，则请除之前的模板
  static async add (templateName, cwd = process.cwd) {
    const projectName = templateName;
    const toDir = path.join(cwd, projectName);
    const exists = await Template.exists(projectName);
    if (!exists) {
      await Template.clone(projectName);
    }
    // 复制clone下来的template到cwd
    return Template.copy(projectName, toDir).then(() => { return toDir; });
  }

}

module.exports = Template;
