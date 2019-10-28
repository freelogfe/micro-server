'use strict'

const Controller = require('egg').Controller

class PresentableController extends Controller {
  async queryAuth(ctx) {
    let pids = ctx.checkQuery('pids').notEmpty().value

    ctx.validate()

    pids = pids.split(',')
    const result = await this.queryPresentablesAuth(pids)

    ctx.success(result)
  }

  async queryPresentablesAuth(presentableIds) {
    const promises = presentableIds.map(async pid => {
      return this.ctx.curlRequest(`/v1/auths/presentables/${pid}.auth`).then(res => {
        return { pid, res }
      })
    })
    const result = {}
    const responses = await Promise.all(promises)
    responses.forEach(({ pid, res }) => {
      const data = res.data
      const arr = [ 'freelog-resource-type', 'freelog-sub-releases', 'freelog-meta' ]

      arr.forEach(key => {
        data.data[key] = res.headers[key]
      })

      if (data.errcode) {
        data.data.errcode = data.errcode
        data.data.errMsg = data.msg
      }
      result[pid] = res.data.data
    })
    return result
  }

  async queryPresentablesAuthList() {
    const ctx = this.ctx
    const res = await ctx.curlRequest('/v1/presentables', {
      data: Object.assign({}, ctx.query),
    })
    const data = res.data
    if (data.errcode || data.ret || !data.data) {
      ctx.error({ errcode: data.errcode, retcode: data.ret, msg: data.msg, data: data.data })
    } else {
      const presentablesList = data.data.dataList
      const presentablesIDs = presentablesList.map(p => p.presentableId)
      const presentablesAuthRessult = await this.queryPresentablesAuth(presentablesIDs)
      presentablesList.forEach(p => {
        p.authResult = presentablesAuthRessult[p.presentableId]
      })
      ctx.success(data.data)
    }
  }
}

module.exports = PresentableController
