const path = require('path');
const { connect, upload } = require('./ftp');
const argv = require('minimist')(process.argv.slice(2));
let isDev = false;
let isPro = false;

if (argv._.includes('dev')) {
  isDev = true;
}
if (argv._.includes('pro')) {
  isPro = true;
}

const connectConfig = {
  host: '服务器ip',
  port: '端口',
  user: '用户名',
  password: '密码'
};

connect(connectConfig).then((ftp) => {
  start(ftp);
});

function start (ftp) {
  const html = '本地html页面';
  const resource = '本地静态资源路径';
  let ftpHtml = '';
  let ftpResource = '';
  if (isDev && !isPro) {
    // 开发环境
    ftpHtml = '服务器html页面';
    ftpResource = '服务器静态资源路径';
  } else if (!isDev && isPro) {
    // 生产环境
    ftpHtml = '服务器html页面';
    ftpResource = '服务器静态资源路径';
  } else if (isDev && isPro) {
    uploadAll().then(res => {
      ftp.end();
    });
  } else {
    return;
  }
  upload({
    html,
    resource,
    ftpHtml,
    ftpResource
  }).then((res) => {
    console.log(`上传完成，用时：${res.time / 1000}s`);
    ftp.end();
  });
}

/**
 * 同时上传，未完成
 */
async function uploadAll () {
  const html = path.resolve(__dirname, '../dist/index.html');
  const resource = path.resolve(__dirname, '../dist');
  const devFtpHtml = '/zsh.wkan.cn/template/default/recommendHouse.tpl';
  const devFtpResource = '/zsh.wkan.cn/image/recommend/new';
  const proFtpHtml = '/zsh/template/default/recommendHouse.tpl';
  const proFtpResource = '/zsh/image/recommend/new';
  const devResource = await upload({
    html,
    resource,
    ftpHtml: devFtpHtml,
    ftpResource: devFtpResource
  });
  console.log(`测试环境上传完成，用时：${devResource.time / 1000}s`);
  const proRerource = await upload({
    html,
    resource,
    ftpHtml: proFtpHtml,
    ftpResource: proFtpResource
  });
  console.log(`正式环境上传完成，用时：${proRerource.time / 1000}s`);
  return Promise.resolve();
}
