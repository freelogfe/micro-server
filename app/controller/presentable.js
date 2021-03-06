'use strict'

const Controller = require('egg').Controller

class PresentableController extends Controller {
  async queryAuth(ctx) {
    let pids = ctx.checkQuery('pids').notEmpty().value
    ctx.validate()
    pids = pids.split(',')
    const result = await ctx.service.presentable.requestPresentablesAuth(pids)
    ctx.success(result)
  }

  async pagingGetPresentablesAuthList(ctx) {
    const params = Object.assign({}, ctx.query)
    let url
    if (params.nodeType === 'test') {
      if (params.page != null) {
        params.pageIndex = params.page
        Reflect.deleteProperty(params, 'page')
      }
      url = `/v1/testNodes/${params.nodeId}/testResources`
    } else {
      url = '/v1/presentables'
    }
    const res = await ctx.curlRequest(url, { data: params })
    if (res.data.errcode || res.data.ret || !res.data.data) {
      ctx.error(res.data)
    } else {
      let { page, pageSize, totalItem, dataList } = res.data.data
      dataList = await ctx.service.presentable.formatData(dataList)
      ctx.success({ page, pageSize, totalItem, dataList })
    }
  }

  async batchGetPresentablesAuthList(ctx) {
    const { nodeId } = ctx.params
    const params = Object.assign(ctx.query, { nodeId })
    ctx.validate()
    let res = null
    if (params.nodeType === 'test') {
      if (params.releaseIds) {
        params.entityIds = params.releaseIds
        Reflect.deleteProperty(params, 'releaseIds')
      }
      if (params.releaseNames) {
        params.entityNames = params.releaseNames
        Reflect.deleteProperty(params, 'releaseNames')
      }
      res = await ctx.curlRequest(`/v1/testNodes/${nodeId}/testResources/list`, { data: params })
    } else {
      res = await ctx.curlRequest('/v1/presentables/list', { data: params })
    }
    if (res.data.errcode || res.data.ret || !res.data.data) {
      ctx.error(res.data)
    } else {
      const dataList = await ctx.service.presentable.formatData(res.data.data)
      ctx.success({ dataList })
    }
  }

  async getPresentableInfo(ctx) {
    const { nodeType } = ctx.query
    const { presentableId } = ctx.params
    const tmpPath = nodeType === 'test' ? 'testResources' : 'presentables'
    try {
      const res = await ctx.curlRequest(`/v1/auths/${tmpPath}/${presentableId}.info`)
      ctx.service.presentable.resolveHeaders(res)
      const result = res.data
      if (result.errcode === 0) {
        let presentable = result.data
        if (nodeType === 'test') {
          presentable = ctx.service.presentable.resolveTestNodePresentable(presentable)
        }
        ctx.success(presentable)
      } else {
        const authResult = result.data.authResult
        if (nodeType === 'test') {
          const { isAuth, data } = authResult
          result.data.isAuth = isAuth
          result.data.data = {
            presentableInfo: data.testResourceInfo,
          }
        }
        Reflect.deleteProperty(result.data, 'errcode')
        Reflect.deleteProperty(result.data, 'authResult')
        ctx.success(result.data)
      }
    } catch (e) {
      console.log('e -', e)
      ctx.error({ msg: e })
    }
  }

  async getPresentableAuth(ctx) {
    const { nodeType } = ctx.query
    const { presentableId } = ctx.params
    const tmpPath = nodeType === 'test' ? 'testResources' : 'presentables'
    const res = await ctx.curlRequest(`/v1/auths/${tmpPath}/${presentableId}.auth`)
    ctx.service.presentable.resolveHeaders(res)
    ctx.success(res.data.data)
  }

  async getPresentableData(ctx) {
    const { nodeType } = ctx.query
    const { presentableId } = ctx.params
    let url = `/v1/auths/presentables/${presentableId}.file`
    if (nodeType === 'test') {
      url = `/v1/auths/testResources/${presentableId}.file`
    }
    await this.curlPresentableData(url)
  }

  async getPresentableSubDependData(ctx, next) {
    const { nodeType, entityNid } = ctx.query
    const { presentableId, subDependId } = ctx.params
    let url = `/v1/auths/presentables/${presentableId}/subDepend.file?entityNid=${entityNid}&subReleaseId=${subDependId}`
    if (nodeType === 'test') {
      url = `/v1/auths/testResources/${presentableId}/subDepend.file?subEntityId=${subDependId}&entityNid=${entityNid}`
    }
    await this.curlPresentableData(url, next)
  }

  async curlPresentableData(url, next) {
    const { ctx } = this
    ctx.request.url = url
    ctx.request.headers.accept = 'application/json, text/plain, */*'
    await ctx.service.proxy.handle(ctx, next)
  }
}

module.exports = PresentableController
