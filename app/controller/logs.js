'use strict'

const Controller = require('egg').Controller
const fse = require('fs-extra')

class LogsController extends Controller {

  async index(ctx) {
    const errLogsString = fse.readFileSync(this.app.loggers.errorLogger.options.file).toString()
    ctx.body = errLogsString
  }
}

module.exports = LogsController
