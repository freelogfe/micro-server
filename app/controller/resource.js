'use strict';

const Controller = require('egg').Controller

class ResourceController extends Controller {
  //请求合并demo
  async index(ctx) {
    const res1 = await ctx.curlRequest('/api/v1/nodes/pagebuilds/78', {
      method: 'put',
      data: {
        nodeId: 10022,
        status: 1
      }
    })
    const res2 = await ctx.curlRequest(`/api/v1/nodes?ownerUserId=10005`)

    const result = ctx.helper.mergeResponse([res1, res2])
    ctx.status = result.status || 200
    ctx.set(result.headers)
    ctx.body = result.data
  }

  //手动转发请求
  async update(ctx) {
    const result = await ctx.curlRequest(ctx.request.url)
    ctx.status = result.status || 200
    ctx.set(result.headers)
    ctx.body = result.data
  }
}

module.exports = ResourceController;
