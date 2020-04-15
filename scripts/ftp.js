const path = require('path');
const fs = require('fs');
const Client = require('ftp');
const ftp = new Client();

/**
 * @param options
 * @param { String } options.html 本地html页面路径
 * @param { String } options.resource 本地静态资源文件夹路径
 * @param { String } options.ftpHtml 服务器html页面路径
 * @param { String } options.ftpResource 服务器静态资源文件夹路
 */
async function upload (options) {
  const HTML = fs.readFileSync(options.html);
  const RESOURCE = getFilePath(options.resource);
  const startTime = Date.now();
  try {
    // 上传html
    await put(HTML, options.ftpHtml);
    console.log('html页面上传成功');
    // 上传静态资源
    for (const k in RESOURCE) {
      const file = fs.readFileSync(RESOURCE[k].filePath);

      // 设置服务器对应的文件路径
      let destPath = path.join(options.ftpResource, RESOURCE[k].relativePath);
      // 将反斜杠转换成正斜杠
      destPath = destPath.replace(/\\/g, '/');

      // 上传
      await put(file, destPath);
      console.log(`${RESOURCE[k].fileName}上传成功`);
    }
    return Promise.resolve({
      time: Date.now() - startTime
    });
  } catch (err) {
    console.log(err);
    ftp.end();
  }
}

/**
 * 链接ftp
 * @param config
 * @param config.host
 * @param config.port
 * @param config.user
 * @param config.password
 */
function connect (config) {
  return new Promise((resolve, reject) => {
    ftp.connect(config);
    ftp.on('ready', () => {
      resolve(ftp);
    });
    ftp.on('error', (err) => {
      if (err) throw err;
      ftp.end();
    });
  });
}

function isFile (path) {
  const INDEX = path.lastIndexOf('/'); // lastIndexOf("/")  找到最后一个 / 的位置
  const NAME = path.substr(INDEX + 1); // substr() 截取剩余的字符，即得文件名xxx.doc
  const PARSE_NAME = NAME.split('.'); // 解析文件后缀
  return PARSE_NAME[1] !== undefined;
}

/**
 * 添加修改文件
 * @param file 本地文件路径
 * @param destPath 服务器文件路径
 */
async function put (file, destPath) {
  // 先创建此路径的文件夹
  await mkdir(destPath);
  return new Promise((resolve, reject) => {
    ftp.put(file, destPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * 创建文件夹
 * @param p 文件路径
 */
function mkdir (p) {
  return new Promise((resolve, reject) => {
    const info = path.parse(p);
    list(info.dir).then((res) => {
      // 文件夹存在不创建
      resolve();
    }).catch(() => {
      // 文件夹不存在，创建文件夹
      ftp.mkdir(info.dir, (err) => {
        if (err) throw err;
        resolve();
      });
    });
  });
}

/**
 * 获取文件列表
 * @param path 路径
 */
function list (path) {
  return new Promise((resolve, reject) => {
    ftp.list(path, async (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
}

function getFilePath (filePath) {
  const rootPath = filePath;
  const DIST = fs.readdirSync(filePath);
  const FILES = [];
  DIST.forEach(item => {
    const fullPath = path.resolve(__dirname, filePath, item);
    if (isFile(fullPath)) {
      FILES.push({
        filePath: fullPath
      });
    } else {
      FILES.push(...getFilePath(path.resolve(filePath, item)));
    }
  });
  FILES.forEach(item => {
    const info = path.parse(item.filePath);
    item.root = rootPath;
    item.relativePath = path.relative(rootPath, item.filePath);
    item.fileName = info.base;
  });
  return FILES;
}

module.exports = {
  connect,
  upload
};
