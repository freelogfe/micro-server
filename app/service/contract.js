'use strict';
const Service = require('egg').Service;

class ContractService extends Service {
  async queryList(params) {
    const { ctx } = this;
    let data;
    if (Array.isArray(params.contractIds)) {
      params.contractIds = params.contractIds.join(',');
    }

    if (params.contractIds) {
      data = await ctx.service.list.queryList('/v1/contracts/contractRecords', params);
    } else {
      data = await ctx.service.list.queryList('/v1/contracts', params);
    }
    return data;
  }
}

module.exports = ContractService;

