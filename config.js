const path = require('path');
const os = require('os');
module.exports = {
  NAME: 'site',
  // 从git下载到本机.site/template目录
  SITE_DOWNLOAD: path.join(os.homedir(), '/.site', '/template'),
  SITE_INIT_DIR: process.cwd(),
  SITE_CONTAINER: 'container',
  // 模版在仓库中的位置
  TEMPLATE_DIR: 'template',
  GIT_USER: 'sitejs',
  GIT_REMOTE: 'https://github.com',
  GIT_BRANCH: 'dev'
}
