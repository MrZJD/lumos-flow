const path = require('path');
const os = require('os');
const esbuild = require('esbuild');
const static = require('koa-static');
const Koa = require('koa');
const fse = require('fs-extra');
const livereload = require('livereload');
const config = require('../build.config');
const cheerio = require('cheerio');

// alias
const resolve = (...args) => path.resolve(__dirname, '..', ...args);

const app = new Koa();

const log = console.log;
log.info = console.info;
log.error = console.error;
log.debug = console.debug;

const targetDir = resolve(config.dist);
const htmlPath = resolve(config.devServer.template);

const getIPAddress = () => {
  const network = os.networkInterfaces();

  const ips = Object.values(network).map(iface => {
    return iface.filter((item) => {
      return item.family === 'IPv4' && !item.internal;
    })
  }).flat();

  return ips;
}

const port = config.devServer.port || 3000;
const host = getIPAddress();

const generateHtml = async () => {
  const content = await fse.readFile(htmlPath, 'utf8');
  const $ = cheerio.load(content);

  $('head').append('<link rel="stylesheet" href="./index.css">');
  $('body').append(`<script src="http://127.0.0.1:35729/livereload.js?snipver=1"></script><script src="./index.js"></script>`);

  await fse.outputFile(resolve(targetDir, 'index.html'), $.html());
}

async function main() {
  // 生成模版html
  generateHtml();

  // livereload
  const lrserver = livereload.createServer();
  lrserver.watch(targetDir);

  // static server
  app.use(
    static(targetDir)
  );

  // 未匹配资源 => SPA
  app.use(async (ctx, next) => {
    return await static(targetDir)(Object.assign(ctx, { path: '/' }), next);
  });

  app.listen(port, () => {
    log.info(`HTTP Server: \nhttp://127.0.0.1:${port} \nhttp://${host.map(item => `${item.address}:${port} \n`)}`)
  });

  // start esbuild
  esbuild.build({
    entryPoints: config.entry,
    sourcemap: config.sourcemap,
    bundle: config.bundle,
    // outfile: config.outfile,
    target: config.target,
    loader: { '.csv': 'file' },
    outdir: targetDir,
    watch: {
      onRebuild(error, result) {
        if (error) {
          log.error('watch build failed: ', error);
          return;
        }
  
        log('\x1B[36m%s\x1B[39m', 'watch build success');
      }
    }
  }).catch(err => {
    console.log(err)
  });
}

main();
