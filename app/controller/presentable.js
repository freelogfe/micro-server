'use strict';

const Controller = require('egg').Controller

class PresentableController extends Controller {
  async queryAuth(ctx) {
    const nodeId = ctx.query.nodeId
    const pids = ctx.query.pids.split(',')
    var result = {}

    for (let i = 0; i < pids.length; i++) {
      let pid = pids[i]
      let res = await ctx.helper.proxyRequest(`/api/v1/auths/presentable/${pid}.info?nodeId=${nodeId}`)
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

    ctx.body = {
      ret: 0,
      errcode: 0,
      msg: '',
      data: result
    }
  }
}

module.exports = PresentableController;
