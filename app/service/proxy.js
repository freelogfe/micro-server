'use strict'

const Service = require('egg').Service
const httpProxy = require('http-proxy-middleware')
const k2c = require('koa2-connect')

class ProxyService extends Service {
  /* 代理前端请求到后台服务器 */
  async handle(ctx, next) {
    const { app } = this
    k2c(httpProxy({
      target: app.config.httpProxy.target,
      changeOrigin: true,
    }))(ctx, next)
  }
}

module.exports = ProxyService
