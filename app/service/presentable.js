'use strict'

const Service = require('egg').Service

class PresentableService extends Service {
  async requestPresentablesAuth(presentableIds) {
    const tmpPath = this.ctx.query.nodeType === 'test' ? 'testResources' : 'presentables'
    const promises = presentableIds.map(async pid => {
      return this.ctx.curlRequest(`/v1/auths/${tmpPath}/${pid}.auth`).then(resp => {
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

    arr.forEach(key => {
      if (resp.headers[key] != null) {
        if (key === 'freelog-sub-dependencies') {
          data.data['freelog-sub-releases'] = resp.headers[key]
        } else {
          data.data[key] = resp.headers[key]
        }
      }
    })

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
    return { dataList: list }
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
