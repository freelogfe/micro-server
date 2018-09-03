'use strict';

const Controller = require('egg').Controller;
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');

module.exports = (options, app) => {
  const proxyHandler = k2c(httpProxy({
    target: app.config.proxy.target,
    changeOrigin: true
  }))
  console.log(options)

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