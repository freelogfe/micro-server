const Service = require('egg').Service;

class ListService extends Service {
  async queryList(url, params) {
    const {ctx} = this
    const result = await ctx.curlRequest(url, {
      data: params
    })

    const data =  result.data
    return (data.ret === 0 && data.errcode === 0)? data.data : {}
  }
}

module.exports = ListService;
