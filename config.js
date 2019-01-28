const path = require('path');
const os = require('os');
module.exports = {
  NAME: 'site',
  SITE_DOWNLOAD: path.join(os.homedir(), '/.site', '/template'),
  // 模版在仓库中的位置
  TEMPLATE_DIR: 'template',
  GIT_USER: 'sitejs',
  GIT_REMOTE: 'https://github.com',
  GIT_BRANCH: 'dev'
}
