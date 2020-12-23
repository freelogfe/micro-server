'use strict'

const Service = require('egg').Service

class NodeService extends Service {
  async queryList(params) {
    const { ctx } = this

    if (Array.isArray(params.nodeIds)) {
      params.nodeIds = params.nodeIds.join(',')
    }
    return ctx.service.list.queryList('/v2/nodes/list', params)
  }
}

module.exports = NodeService
