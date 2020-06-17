'use strict'

const { createProxyMiddleware } = require('http-proxy-middleware')
const k2c = require('koa2-connect')
const helper = require('../extend/helper')

module.exports = (options, app) => {
  const proxyHandler = k2c(createProxyMiddleware({
    target: options.target,
    changeOrigin: true,
    secure: false,
    xfwd: true,
    // pathRewrite: options.pathRewrite || {},
    onProxyRes(proxyRes, req) {
      const origin = req.headers.origin
      if (helper.isSafeOrigin(origin)) {
        proxyRes.headers['Access-Control-Allow-Origin'] = origin
        proxyRes.headers['Access-Control-Allow-Credentials'] = true
      }
    },
    onError(err, req, res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      res.end(`Middleware Proxy Error: ${err.toString()}`)
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
