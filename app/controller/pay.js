'use strict';

const Controller = require('egg').Controller

class PayController extends Controller {
  async orders(ctx) {
    const accountId = ctx.checkQuery('accountId').notEmpty().value
    var page = ctx.checkQuery('page').notEmpty().value
    var pageSize = ctx.checkQuery('pageSize').notEmpty().value

    ctx.validate()

    let res = await ctx.curlRequest(`/api/v1/pay/accounts/tradeRecords`, {
      data: {accountId, page, pageSize}
    })
    let data = res.data;

    if (data.errcode || data.ret) {
      ctx.error({errCode: data.errcode, retCode: data.ret, msg: data.msg, data: data.data})
    } else {
      let relativeInfoMap = await this.queryRelativeInfo(data.data.dataList)
      data.data.dataList.forEach(item => {
        item.targetInfo = relativeInfoMap[item.correlativeInfo.ownerId]
      })
      ctx.success(data.data)
    }
  }


  async queryRelativeInfo(list) {
    let accountsMap = {}
    let queryResultMap = {}

    list.forEach(item => {
      let info = item.correlativeInfo
      let accountType = info.accountType
      if (!accountsMap[accountType]) {
        accountsMap[accountType] = new Set()
      }
      accountsMap[accountType].add(info.ownerId)
    })

    for (let type in accountsMap) {
      let arr = Array.from(accountsMap[type])
      let queryResult
      switch (parseInt(type)) {
        case 1:
          queryResult = await this.queryUsersInfo(arr);
          break;
        case 2:
          queryResult = await this.queryContractsInfo(arr);
          break;
        case 3:
          queryResult = await this.queryNodesInfo(arr);
          break;
        case 4:
          queryResult = await this.queryOrgsInfo(arr);
          break;
        default:
          queryResult = {}
      }
      Object.assign(queryResultMap, queryResult)
    }
    return queryResultMap
  }

  async queryContractsInfo(contractIds) {
    const {ctx} = this
    let list = await ctx.service.contract.queryList({contractIds})
    return this.array2obj(list, 'contractId')
  }

  async queryUsersInfo(userIds) {
    const {ctx} = this
    let list = await ctx.service.user.queryList({userIds})
    return this.array2obj(list, 'userId')
  }

  async queryNodesInfo(nodeIds) {
    const {ctx} = this
    let list = await ctx.service.node.queryList({nodeIds})
    return this.array2obj(list, 'nodeId')
  }

  async queryOrgsInfo() {
    return {}
  }

  array2obj(arr, key) {
    let obj = Object.create(null)
    arr.forEach(item => {
      obj[item[key]] = item
    })

    return obj
  }
}

module.exports = PayController;
