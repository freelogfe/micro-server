'use strict';

const Controller = require('egg').Controller
const extend = require('extend')

class ResourceController extends Controller {
  async index(ctx) {
    const res1 = await this.proxyRequest('/api/v1/nodes/pagebuilds/78', {
      method: 'put',
      data: {
        nodeId: 10022,
        status: 1
      }
    })
    const res2 = await ctx.helper.proxyRequest(`/api/v1/nodes?ownerUserId=10005`)

    const result = ctx.helper.mergeResponse([res1, res2])
    ctx.status = result.status || 200
    ctx.set(result.headers)
    ctx.body = result.data
  }

  async update(ctx) {
    const result = await ctx.helper.proxyRequest(ctx.request.url)
    ctx.status = result.status || 200
    ctx.set(result.headers)
    ctx.body = result.data
  }
}

module.exports = ResourceController;
