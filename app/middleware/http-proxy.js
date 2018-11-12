'use strict';

const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const helper = require('../extend/helper');

module.exports = options => {
  const proxyHandler = k2c(httpProxy({
    target: options.target,
    changeOrigin: true,
    pathRewrite: options.pathRewrite || {},
    onProxyRes(proxyRes, req/* , res*/) {
      const origin = req.headers.origin;
      if (helper.isSafeOrigin(origin)) {
        proxyRes.headers['access-control-allow-origin'] = origin;
      }
    },
  }));

  return async function _proxyHandler(ctx, next) {
    const isPass = options.ignore.some(re => {
      return !!re.exec(ctx.request.path);
    });

    if (isPass || ctx.method === 'OPTIONS') {
      await next();
    } else {
      proxyHandler(ctx, next);
    }
  };
};
