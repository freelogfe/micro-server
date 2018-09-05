'use strict';

const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');

module.exports = (options, app) => {
  const proxyHandler = k2c(httpProxy({
    target: app.config.proxy.target,
    changeOrigin: true,
    pathRewrite: options.pathRewrite || {}
  }))

  return async function _proxyHandler(ctx, next) {
    var isPass = options.ignore.some(re => {
      return !!re.exec(ctx.request.path)
    })
    if (isPass) {
      await next()
    } else {
      proxyHandler(ctx, next);
    }
  }
}