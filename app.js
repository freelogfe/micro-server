'use strict'

const koaValidate = require('koa-validate')

module.exports = async app => {
  koaValidate(app)
  app.config.coreMiddleware.unshift('httpProxy')
  console.log(app.config.env)
}
