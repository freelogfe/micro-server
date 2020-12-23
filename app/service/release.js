'use strict'

const Service = require('egg').Service

class ReleaseService extends Service {
  async queryList(params) {
    const { ctx } = this
    if (Array.isArray(params.releaseIds)) {
      params.releaseIds = params.releaseIds.join(',')
    }
    return ctx.service.list.queryList('/v2/resources/list', params)
  }
}

module.exports = ReleaseService
