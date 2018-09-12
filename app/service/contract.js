const Service = require('egg').Service;

class ContractService extends Service {
  async queryList(params) {
    const {ctx} = this

    if (Array.isArray(params.contractIds)) {
      params.contractIds = params.contractIds.join(',')
    }
    const data = await ctx.service.list.queryList('/api/v1/contracts', params)
    return data
  }
}

module.exports = ContractService;
