const Service = require('egg').Service;

class ResourceService extends Service {
  async find() {
    const {ctx} = this
  }

  async queryList(params) {
    const {ctx} = this
    if (Array.isArray(params.resourceIds)) {
      params.resourceIds = params.resourceIds.join(',')
    }
    const data = await ctx.service.list.queryList('/v1/resources/list', params)
    return data
  }
}

module.exports = ResourceService;
