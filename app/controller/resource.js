'use strict';

const Controller = require('egg').Controller
const _ = require('lodash')

class ResourceController extends Controller {
  //请求合并demo
  async index(ctx) {
    const res1 = await ctx.curlRequest('/v1/nodes/pagebuilds/78', {
      method: 'put',
      data: {
        nodeId: 10022,
        status: 1
      }
    })
    const res2 = await ctx.curlRequest(`/v1/nodes?ownerUserId=10005`)

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


  async getMyResources(ctx) {
    var params = Object.assign({contractType: 3}, ctx.query || {})
    var data = await ctx.service.contract.queryList(params)
    if (data && data.dataList.length) {
      let nodeIds = new Set()
      let resourceIds = new Set()
      data.dataList.forEach((contract) => {
        nodeIds.add(contract.partyOne)
        resourceIds.add(contract.resourceId)
      })

      let resources = await ctx.service.resource.queryList({resourceIds: Array.from(resourceIds)})
      let nodes = await ctx.service.node.queryList({nodeIds: Array.from(nodeIds)})

      ctx.helper.mergeBy(data.dataList, resources, 'resourceId', 'resourceInfo')
      ctx.helper.mergeBy(data.dataList, nodes, {
        src: 'nodeId',
        target: 'partyOne'
      }, 'nodeInfo')
    }
    ctx.success(data)
  }
}

module.exports = ResourceController;
