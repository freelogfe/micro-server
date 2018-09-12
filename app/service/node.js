const Service = require('egg').Service;

class NodeService extends Service {
  async queryList(params) {
    const {ctx} = this

    if (Array.isArray(params.nodeIds)) {
      params.nodeIds = params.nodeIds.join(',')
    }
    const data = await ctx.service.list.queryList('/api/v1/nodes/list', params)
    return data
  }
}

module.exports = NodeService;
