'use strict'

const Controller = require('egg').Controller

class ContractController extends Controller {

  async getMyContracts(ctx) {
    const params = Object.assign({ isDefault: 1 }, ctx.query || {})

    const data = await ctx.service.contract.queryList(params)

    if (data && data.dataList.length) {
      const releaseIds = new Set()
      const presentableIds = new Set()
      const nodeIds = new Set()
      const userIds = new Set()

      for (const contract of data.dataList) {
        const { contractType, partyOne, partyTwo, targetId } = contract
        switch (contractType) {
          // 发行商to发行商
          case 1: {
            releaseIds.add(partyOne)
            releaseIds.add(partyTwo)
            break
          }
          // 节点商to发行
          case 2: {
            releaseIds.add(partyOne)
            nodeIds.add(partyTwo)
            break
          }
          // 用户to节点的presentable
          case 3: {
            presentableIds.add(targetId)
            nodeIds.add(partyOne)
            userIds.add(partyTwo)
            break
          }
          default:
        }
      }
      let releasesPromise = Promise.resolve([])
      let presentablesPromise = Promise.resolve([])
      let nodesPromise = Promise.resolve([])
      let usersPromise = Promise.resolve([])
      if (releaseIds.size > 0) {
        releasesPromise = ctx.service.release.queryList({
          releaseIds: Array.from(releaseIds),
          projection: 'releaseId,releaseName,previewImages,resourceType,userId,nodeId,username',
        })
      }
      if (presentableIds.size > 0) {
        presentablesPromise = ctx.service.list.queryList('/v1/presentables/list', {
          presentableIds: Array.from(presentableIds).join(','),
          projection: 'presentableId,presentableName,releaseInfo,userId,nodeId',
        })
      }
      if (nodeIds.size > 0) {
        nodesPromise = ctx.service.node.queryList({ nodeIds: Array.from(nodeIds).join(',') })
      }
      if (userIds.size > 0) {
        usersPromise = ctx.service.list.queryList('/v1/userinfos', {
          userIds: Array.from(userIds).join(','),
        })
      }

      const [ releases, presentables, nodes, users ] = await Promise.all([
        releasesPromise,
        presentablesPromise,
        nodesPromise,
        usersPromise,
      ])
      ctx.helper.mergeBy(data.dataList, presentables, { src: 'presentableId', target: 'targetId' }, 'presentableInfo')
      ctx.helper.mergeBy(data.dataList, releases, { src: 'releaseId', target: 'partyOne' }, 'releaseInfoOne')
      ctx.helper.mergeBy(data.dataList, releases, { src: 'releaseId', target: 'partyTwo' }, 'releaseInfoTwo')
      ctx.helper.mergeBy(data.dataList, nodes, { src: 'nodeId', target: 'nodeId' }, 'nodeInfo')
      ctx.helper.mergeBy(data.dataList, users, { src: 'userId', target: 'partyTwoUserId' }, 'userInfo')
    }
    ctx.success(data)
  }

  async getMyTerminatedContracts(ctx) {
    const params = Object.assign({}, ctx.query || {})
    const data = await ctx.service.list.queryList('/v1/contracts/terminatedContracts', params)
    ctx.success(data)
  }
}

module.exports = ContractController
