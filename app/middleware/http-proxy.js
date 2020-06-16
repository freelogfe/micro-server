'use strict'

const httpProxy = require('http-proxy-middleware')
const k2c = require('koa2-connect')
const helper = require('../extend/helper')

module.exports = (options, app) => {
  const proxyHandler = k2c(httpProxy({
    target: options.target,
    changeOrigin: true,
    secure: false,
    pathRewrite: options.pathRewrite || {},
    onProxyReq(proxyReq, req) {
      app.logger.info(
        'Middleware Proxy Info: ',
        '\n====================\n', proxyReq.headers,
        '\n====================\n', req.headers)
    },
    onProxyRes(proxyRes, req/* , res*/) {
      const origin = req.headers.origin
      if (helper.isSafeOrigin(origin)) {
        proxyRes.headers['Access-Control-Allow-Origin'] = origin
        proxyRes.headers['Access-Control-Allow-Credentials'] = true
      }
    },
    onError(err, req) {
      app.logger.error(
        'Middleware Proxy Error: ',
        '\n====================\n', err,
        '\n====================\n', req.headers)
    },
  }))

  return async function _proxyHandler(ctx, next) {
    const isPass = options.ignore.some(re => !!re.exec(ctx.request.path))
    const isPublic = /^\/public\//.test(ctx.request.path)
    if (isPass || isPublic || ctx.method === 'OPTIONS') {
      await next()
    } else {
      proxyHandler(ctx, next)
    }
  }
}
