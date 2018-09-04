'use strict';

const Controller = require('egg').Controller

class PresentableController extends Controller {
  async queryAuth(ctx) {
    const nodeId = ctx.checkQuery('nodeId').notEmpty().value
    var pids = ctx.checkQuery('pids').notEmpty().value

    ctx.validate()

    pids = pids.split(',')
    var result = {}

    for (let i = 0; i < pids.length; i++) {
      let pid = pids[i]
      let res = await ctx.curlRequest(`/api/v1/auths/presentable/${pid}.info?nodeId=${nodeId}`)
      let data = res.data;
      ['freelog-sub-resource-auth-token', 'freelog-sub-resourceids'].forEach(key => {
        data.data[key] = res.headers[key]
      })

      if (data.errcode) {
        data.data.errcode = data.errcode
        data.data.errMsg = data.msg
      }

      result[pid] = res.data.data
    }

    ctx.success(result)
  }
}

module.exports = PresentableController;
