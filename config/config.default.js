'use strict'
const pathToRegexp = require('path-to-regexp')
const routeMap = require('../app/router-map')

module.exports = appInfo => {
  const config = {}

  config.keys = appInfo.name + '_1535620905039_1459'

  config.middleware = [ 'errorHandler' ]

  config.security = {
    csrf: {
      enable: false,
    },
  }

  /**
   * 内部中间件没有处理到的异常,在此处统一处理
   */
  config.onerror = {
    all(err, ctx) {
      ctx.body = {
        ret: 0,
        errCode: 1,
        msg: '未处理的异常',
        data: err.stack || err.toString(),
      }
    },
  }

  config.httpProxy = {
    ignore: Object.keys(routeMap).map(key => {
      return pathToRegexp(key.split(' ')[1])
    }),
  }

  config.cors = {
    origin(ctx) {
      return ctx.request.headers.origin || '*'
    },
    exposeHeaders: 'freelog-meta,freelog-resource-type,freelog-sub-releases,freelog-system-meta,freelog-sub-dependencies,freelog-entity-nid',
  }

  config.assets = {
    publicPath: '/public/',
  }

  return config
}
