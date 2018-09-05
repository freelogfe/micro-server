'use strict';

const Controller = require('egg').Controller
const httpProxy = require('http-proxy-middleware')
const k2c = require('koa2-connect');

class ProxyController extends Controller {
  /**
   * 代理前端请求到后台服务器
   * @param ctx
   * @param next
   */
  async handle(ctx, next) {
    const {app} = this;
    k2c(httpProxy({
      target: app.config.proxy.target,
      changeOrigin: true
    }))(ctx, next);

  }
}

module.exports = ProxyController;
