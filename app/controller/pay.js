'use strict'

const Controller = require('egg').Controller

class PayController extends Controller {
  async orders(ctx) {
    const accountId = ctx.checkQuery('accountId').notEmpty().value
    const page = ctx.checkQuery('page').default(1).toInt().value
    const pageSize = ctx.checkQuery('pageSize').default(10).toInt().value

    ctx.validate()

    const res = await ctx.curlRequest('/v1/pay/accounts/tradeRecords', {
      data: { accountId, page, pageSize },
    })
    const data = res.data

    if (data.errcode || data.ret || !data.data) {
      ctx.error(data)
    } else {
      const relativeInfoMap = await this.queryRelativeInfo(data.data.dataList)
      data.data.dataList.forEach(item => {
        item.targetInfo = relativeInfoMap[item.correlativeInfo.ownerId] || {}
      })
      ctx.success(data.data)
    }
  }

  async queryRelativeInfo(list) {
    const accountsMap = {}
    const queryResultMap = {}

    list.forEach(item => {
      const info = item.correlativeInfo
      const accountType = info.accountType
      if (!accountsMap[accountType]) {
        accountsMap[accountType] = new Set()
      }
      accountsMap[accountType].add(info.ownerId)
    })

    const promises = Object.keys(accountsMap).map(async type => {
      const arr = Array.from(accountsMap[type])
      let promise
      switch (parseInt(type)) {
        case 1:
          promise = this.queryUsersInfo(arr)
          break
        case 2:
          promise = this.queryContractsInfo(arr)
          break
        case 3:
          promise = this.queryNodesInfo(arr)
          break
        case 4:
          promise = this.queryOrgsInfo(arr)
          break
        default:
          promise = Promise.resolve()
      }
      return promise
    })
    const res = await Promise.all(promises)

    res.forEach(queryResult => {
      Object.assign(queryResultMap, queryResult || {})
    })
    return queryResultMap
  }

  async queryContractsInfo(contractIds) {
    const { ctx } = this
    const list = await ctx.service.contract.queryListByIds({ contractIds })

    return this.array2obj(list, 'contractId')
  }

  async queryUsersInfo(userIds) {
    const { ctx } = this
    const list = await ctx.service.user.queryList({ userIds })
    return this.array2obj(list, 'userId')
  }

  async queryNodesInfo(nodeIds) {
    const { ctx } = this
    const list = await ctx.service.node.queryList({ nodeIds })
    return this.array2obj(list, 'nodeId')
  }

  async queryOrgsInfo() {
    return {}
  }

  array2obj(arr, key) {
    const obj = Object.create(null)
    arr.forEach(item => {
      obj[item[key]] = item
    })

    return obj
  }
}

module.exports = PayController
