'use strict'

const Controller = require('egg').Controller

class ContractController extends Controller {

  async getMyContracts(ctx) {
    const params = Object.assign({ contractType: 3, isDefault: 1 }, ctx.query || {})

    const data = await ctx.service.contract.queryList(params)

    if (data && data.dataList.length) {
      const nodeIds = new Set()
      const presentableIds = new Set()
      data.dataList.forEach(contract => {
        nodeIds.add(contract.partyOne)
        presentableIds.add(contract.targetId)
        contract.presentableId = contract.targetId
      })

      const [ presentables, nodes ] = await Promise.all([
        ctx.service.list.queryList('/v1/presentables/list', {
          presentableIds: Array.from(presentableIds).join(','),
          projection: 'presentableId,presentableName,releaseInfo,userId,nodeId',
        }),
        ctx.service.node.queryList({ nodeIds: Array.from(nodeIds) }),
      ])

      ctx.helper.mergeBy(data.dataList, presentables, 'presentableId', 'presentableInfo')
      ctx.helper.mergeBy(data.dataList, nodes, {
        src: 'nodeId',
        target: 'partyOne',
      }, 'nodeInfo')
    }

    ctx.success(data)
  }
}

module.exports = ContractController
