const Service = require('egg').Service;

class ListService extends Service {
  async queryList(url, params) {
    const {ctx} = this
    const result = await ctx.curlRequest(url, {
      data: params
    })
    const data = result.data
    if (data.ret === 0 && data.errcode === 0) {
      return data.data
    } else {
      ctx.error(data)
    }
  }
}

module.exports = ListService;
