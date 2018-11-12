'use strict';

const Controller = require('egg').Controller;
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');

class ProxyController extends Controller {
  /* 代理前端请求到后台服务器 */
  async handle(ctx, next) {
    const { app } = this;
    k2c(httpProxy({
      target: app.config.proxy.target,
      changeOrigin: true,
    }))(ctx, next);
  }

  /* 预检请求处理 */
  async preflight(ctx) {
    if (ctx.helper.isSafeOrigin(ctx.request.headers.origin)) {
      ctx.set('access-control-allow-origin', ctx.request.headers.origin);
      ctx.set('access-control-allow-methods', 'GET,POST,OPTIONS,DELETE,PUT');
      ctx.set('access-control-allow-headers', 'Content-Type,method');
      ctx.status = 204;
    } else {
      ctx.status = 403;
    }
  }
}

module.exports = ProxyController;
