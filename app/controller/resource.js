'use strict';

const Controller = require('egg').Controller

class ResourceController extends Controller {
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
