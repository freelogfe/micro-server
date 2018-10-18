'use strict';

const Controller = require('egg').Controller

class PayController extends Controller {

  /**
   *
   * @param ctx
   * @returns {Promise<void>}
   */

  async orders(ctx) {
    const accountId = ctx.checkQuery('accountId').notEmpty().value
    var page = ctx.checkQuery('page').default(1).toInt().value
    var pageSize = ctx.checkQuery('pageSize').default(10).toInt().value

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
    const {ctx} = this
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

    const res = await ctx.helper.parallel.each(Object.keys(accountsMap), async (type) => {
      let arr = Array.from(accountsMap[type])
      let promise
      switch (parseInt(type)) {
        case 1:
          promise = this.queryUsersInfo(arr);
          break;
        case 2:
          promise = this.queryContractsInfo(arr);
          break;
        case 3:
          promise = this.queryNodesInfo(arr);
          break;
        case 4:
          promise = this.queryOrgsInfo(arr);
          break;
        default:
          promise = Promise.resolve()
      }
      return promise
    })

    res.forEach(queryResult => {
      Object.assign(queryResultMap, queryResult || {})
    })
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
