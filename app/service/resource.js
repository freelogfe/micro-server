'use strict'

const Service = require('egg').Service

class ResourceService extends Service {
  async queryList(params) {
    const { ctx } = this
    if (Array.isArray(params.resourceIds)) {
      params.resourceIds = params.resourceIds.join(',')
    }
    return ctx.service.list.queryList('/v1/resources/list', params)
  }
}

module.exports = ResourceService
