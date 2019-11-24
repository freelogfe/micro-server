'use strict'

const Controller = require('egg').Controller

class ProxyController extends Controller {

  /* 预检请求处理 */
  async preflight(ctx) {
    if (ctx.helper.isSafeOrigin(ctx.request.headers.origin)) {
      ctx.set('access-control-allow-origin', ctx.request.headers.origin)
      ctx.set('access-control-allow-methods', 'GET,POST,OPTIONS,DELETE,PUT')
      ctx.set('access-control-allow-headers', 'Content-Type,method')
      ctx.set('access-control-expose-headers', 'freelog-meta,freelog-resource-type,freelog-sub-releases,freelog-system-meta')
      ctx.status = 204
    } else {
      ctx.status = 403
    }
  }
}

module.exports = ProxyController
