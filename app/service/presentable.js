'use strict'

const Service = require('egg').Service

class PresentableService extends Service {
  async requestPresentablesAuth(presentableIds) {
    const tmpPath = this.ctx.query.nodeType === 'test' ? 'testResources' : 'presentables'
    const promises = presentableIds.map(async pid => {
      return this.ctx.curlRequest(`/v2/auths/${tmpPath}/${pid}/result`).then(resp => {
        return { pid, resp }
      })
    })
    const result = {}
    const responses = await Promise.all(promises)
    responses.forEach(({ pid, resp }) => {
      const data = this.resolveHeaders(resp)
      result[pid] = data.data
    })
    return result
  }

  resolveHeaders(resp) {
    const arr = [ 'freelog-sub-releases', 'freelog-sub-dependencies', 'freelog-resource-type', 'freelog-meta', 'freelog-system-meta', 'freelog-entity-nid' ]
    const data = resp.data
    data.data = data.data != null ? data.data : {}

    const customHeaders = {}
    arr.forEach(key => {
      const val = resp.headers[key]
      if (val != null) {
        customHeaders[key] = val
        if (key === 'freelog-sub-releases') {
          data.data['freelog-sub-dependencies'] = val
        } else {
          data.data[key] = val
        }
      }
    })

    this.ctx.set(customHeaders)
    if (data.errcode) {
      data.data.errcode = data.errcode
      data.data.errMsg = data.msg
    }
    return data
  }

  async formatData(dataList) {
    const ctx = this.ctx
    let list = []
    if (ctx.query.nodeType === 'test') {
      list = dataList.map(p => this.resolveTestNodePresentable(p))
    } else {
      list = dataList
    }
    const presentablesIDs = list.map(p => p.presentableId)
    const presentablesAuthRessult = await this.requestPresentablesAuth(presentablesIDs)
    list.forEach(p => {
      p.authResult = presentablesAuthRessult[p.presentableId]
    })
    return list
  }

  resolveTestNodePresentable(presentable) {
    const {
      previewImages = [], nodeId, userId, intro, differenceInfo, resourceType, updateDate, createDate, originInfo, resolveReleases,
      testResourceId: presentableId,
      testResourceName: presentableName,
    } = presentable
    const { onlineStatusInfo: { isOnline }, userDefinedTagInfo: {
      tags: userDefinedTags,
    } } = differenceInfo
    const data = {
      presentableId, presentableName, previewImages, intro, isOnline, resourceType, userDefinedTags, originInfo, resolveReleases,
      nodeId, userId, updateDate, createDate,
    }
    if (originInfo.type === 'release') {
      const { id: releaseId, name: releaseName, version } = originInfo
      data.releaseInfo = { releaseId, releaseName, version }
    }
    return data
  }
}

module.exports = PresentableService
