'use strict';
const Service = require('egg').Service;

class ContractService extends Service {
  async queryList(params) {
    const { ctx } = this;
    return await ctx.service.list.queryList('/v1/contracts', params);
  }

  async queryListByIds(params) {
    const { ctx } = this;

    if (Array.isArray(params.contractIds)) {
      params.contractIds = params.contractIds.join(',');
    }

    return await ctx.service.list.queryList('/v1/contracts/contractRecords', params);
  }
}

module.exports = ContractService;

