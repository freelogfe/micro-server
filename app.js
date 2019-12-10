'use strict'

const koaValidate = require('koa-validate')

module.exports = app => {
  koaValidate(app)
  app.config.coreMiddleware.unshift('httpProxy')
  console.log('config ---', app.config.cors, app.config.static, app.config.httpProxy)
}
