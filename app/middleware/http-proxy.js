'use strict';

const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');

module.exports = (options, app) => {
  const proxyHandler = k2c(httpProxy({
    target: options.target,
    changeOrigin: true,
    pathRewrite: options.pathRewrite || {}
  }))

  return async function _proxyHandler(ctx, next) {
    var isPass = options.ignore.some(re => {
      return !!re.exec(ctx.request.path)
    })

    // if (app.config.env === 'local') {
    //   console.log('app.config.env', app.config.env,ctx.request.header.origin)
    //   ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    // }
    // ctx.set('access-control-allow-origin', ctx.request.header.origin)
    if (isPass) {
      await next()
    } else {
      proxyHandler(ctx, next);
    }
  }
}