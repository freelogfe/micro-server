'use strict'

const Controller = require('egg').Controller

class ResourceController extends Controller {
  async getMyResources(ctx) {
    const params = Object.assign({ contractType: 3, isDefault: 1 }, ctx.query || {})

    const data = await ctx.service.contract.queryList(params)
    if (data && data.dataList.length) {
      const nodeIds = new Set()
      const resourceIds = new Set()
      data.dataList.forEach(contract => {
        nodeIds.add(contract.partyOne)
        resourceIds.add(contract.resourceId)
      })

      const [ resources, nodes ] = await Promise.all([
        ctx.service.resource.queryList({ resourceIds: Array.from(resourceIds) }),
        ctx.service.node.queryList({ nodeIds: Array.from(nodeIds) }),
      ])

      ctx.helper.mergeBy(data.dataList, resources, 'resourceId', 'resourceInfo')
      ctx.helper.mergeBy(data.dataList, nodes, {
        src: 'nodeId',
        target: 'partyOne',
      }, 'nodeInfo')
    }

    ctx.success(data)
  }
}

module.exports = ResourceController
