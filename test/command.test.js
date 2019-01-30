'use strict';
const assert = require('power-assert');
const Command = require('../src/command.js');
const makeConfig = require('../src/utils/makeConfig.js');
const path = require('path');
const fs = require('fs-extra');


describe('command', function () {
  const testPath = path.join(process.cwd(), '__tests__');
  const command = new Command({ SITE_INIT_DIR:  testPath, SITE_CONTAINER: 'container' });

  describe('#init()', function () {
    const init = async function () {
      const list = ['nginx'];
      await command.init(list);
      assert(!fs.accessSync(path.join(testPath, '.site.js'), fs.constants.F_OK));
      assert(!fs.accessSync(path.join(testPath, '.env'), fs.constants.F_OK));
      assert(!fs.accessSync(path.join(testPath, command.config.SITE_CONTAINER, '/nginx'), fs.constants.F_OK));
    };
    describe('#init() 不存在 .site目录 与 模板', async function () {
      it('init时 .env .site.js 以及模板文件夹是否建立成功', async function () {
        this.timeout(0);
        await fs.remove(command.config.SITE_DOWNLOAD);
        await init();
      });
    });
    describe('#init() 存在 .site目录 与 模板', function () {
      it('init时 .env .site.js 以及模板文件夹是否建立成功', async function () {
        await init();
      });
    });
  });

  describe('#add()', function () {
    it('init后，添加模板', async function () {
      this.timeout(0);
      const list = ['mysql'];
      await command.add(list);
      assert(!fs.accessSync(path.join(testPath, command.config.SITE_CONTAINER, '/mysql'), fs.constants.F_OK));
      const newSiteConfig = makeConfig.rSite(path.join(testPath, '.site.js'));
      assert(newSiteConfig.template.includes(list[0]));
    });
  });
});
