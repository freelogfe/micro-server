'use strict'

const Service = require('egg').Service
const { createProxyMiddleware } = require('http-proxy-middleware')
const k2c = require('koa2-connect')
const helper = require('../extend/helper')

class ProxyService extends Service {
  /* 代理前端请求到后台服务器 */
  async handle(ctx, next) {
    const { app } = this
    k2c(createProxyMiddleware({
      target: app.config.httpProxy.target,
      secure: false,
      changeOrigin: true,
      onProxyRes(proxyRes, req) {
        const origin = req.headers.origin || '*'
        if (helper.isSafeOrigin(origin)) {
          proxyRes.headers['Access-Control-Allow-Origin'] = origin
          proxyRes.headers['Access-Control-Allow-Credentials'] = true
        } 
        let headers = []
        for(const [key,value] of Object.entries(proxyRes.headers)){
          headers.push(key)
        }
        let he = headers.join(',')
        proxyRes.headers['Access-Control-Allow-Headers'] = he
        proxyRes.headers['Access-Control-Expose-Headers'] = he
      },
      onError(e) {
        console.log('Service Proxy Error: ', e)
      },
    }))(ctx, next)
  }
}

module.exports = ProxyService
