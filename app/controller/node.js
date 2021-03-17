'use strict'

const Controller = require('egg').Controller
const validator = require('validator')
// const fse = require('fs-extra')

class NodeController extends Controller {

  async getAuthInfo(ctx) {
    this.ctx.logger.error(ctx.app.baseDir)
    const { domainName } = ctx.query
    const authInfo = await this.getNodeAuthInfo(domainName)
    ctx.success(authInfo)
  }

  async getNodeAuthInfo(domainName) {
    const ctx = this.ctx
    const nodeInfo = await this.getNodeInfo(domainName)
    if (nodeInfo == null) return null
    const { userId: __auth_user_id__ } = ctx.request
    const { nodeId: __auth_node_id__, nodeName: __auth_node_name__, pageBuildId: __page_build_id, isTestNode } = nodeInfo
    const pbAuthUrl = `${this.app.config.httpProxy.target}/v2/auths/${isTestNode ? 'testResources' : 'presentables'}/${__page_build_id}`

    const rResponse = await ctx.curl(pbAuthUrl, {
      headers: {
        cookie: ctx.headers.cookie,
      },
      dataType: 'original',
    })
    const [ contentType, __page_build_sub_releases, __page_build_entity_id ] = this.findValueByKeyIgnoreUpperLower(rResponse.res.headers, [ 'content-type', 'freelog-sub-dependencies', 'freelog-entity-nid' ])
    const nodeAuthInfo = { __auth_user_id__, __auth_node_id__, __auth_node_name__, __page_build_id, __page_build_entity_id }
    if (contentType.includes('application/json')) {
      const authRes = rResponse.data
      if (authRes.errcode === 3 && authRes.data.authCode === 505) {
        nodeAuthInfo.__auth_error_info__ = Object.assign(authRes.data.authResult, {
          'freelog-sub-dependencies': __page_build_sub_releases,
          'freelog-entity-nid': __page_build_entity_id,
        })
      } else {
        nodeAuthInfo.__auth_error_info__ = authRes.data.authResult
      }
    } else {
      nodeAuthInfo.__page_build_sub_releases = this.resolveSubReleases(__page_build_sub_releases)
    }
    return nodeAuthInfo
  }

  async getNodeInfo(domainName) {
    const ctx = this.ctx
    const isTest = /^t\./.test(domainName)
    const subNodeDomain = this.getSubNodeDomain(domainName)
    const nodeInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfo}/detail?nodeDomain=${subNodeDomain}`)
    if (nodeInfo && nodeInfo.nodeId) {
      if (isTest) {
        nodeInfo.isTestNode = true
        const testNodeResult = (await ctx.curl(`${this.app.config.httpProxy.target}/v2/testNodes/${nodeInfo.nodeId}`, {
          headers: {
            cookie: ctx.headers.cookie,
          },
          dataType: 'json',
        })).data
        if (testNodeResult.errcode === 0) {
          const testNodeRuleInfo = testNodeResult.data
          nodeInfo.pageBuildId = testNodeRuleInfo ? testNodeRuleInfo.themeId : ''
        }
      }
      return nodeInfo
    }
    return null
  }

  getSubNodeDomain(host) {
    return host.replace(/(\.freelog\.com|\.testfreelog\.com)/i, '').replace(/^t\./, '')
  }

  resolveSubReleases(subReleases) {
    let pageBuildSubReleases = []
    if (subReleases && validator.isBase64(subReleases)) {
      try {
        pageBuildSubReleases = Buffer.from(subReleases, 'base64').toString()
      } catch (e) {
        this.ctx.logger.error('subReleases解析错误', e, subReleases)
      }
    }
    return pageBuildSubReleases
  }

  findValueByKeyIgnoreUpperLower(object, keys) {
    const map = new Map()
    for (const [ key, value ] of Object.entries(object)) {
      map.set(key.toLowerCase(), value)
    }
    const result = []
    for (const key of keys) {
      result.push(map.get(key))
    }
    return result
  }
}

module.exports = NodeController
