'use strict'
const Service = require('egg').Service

class ListService extends Service {
  async queryList(url, params) {
    const { ctx } = this

    params = Object.assign({
      identityType: 1,
    }, params)

    const result = await ctx.curlRequest(url, {
      data: params,
    })

    const data = result.data
    if (data.ret === 0 && data.errcode === 0) {
      return data.data
    }
    ctx.error(data)

  }
}

module.exports = ListService
