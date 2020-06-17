'use strict'

const Controller = require('egg').Controller
const fse = require('fs-extra')

class LogsController extends Controller {

  async index(ctx) {
    const appLogsString = fse.readFileSync(this.app.loggers.logger.options.file).toString()
    ctx.body = appLogsString
  }

  async errorLogs(ctx) {
    const errLogsString = fse.readFileSync(this.app.loggers.errorLogger.options.file).toString()
    ctx.body = errLogsString
  }

  async coreLogs(ctx) {
    const coreLogsString = fse.readFileSync(this.app.loggers.coreLogger.options.file)
    ctx.body = coreLogsString
  }

  async userNodeDataApiDebug(ctx) {
    const response1 = await ctx.curl(this.app.config.httpProxy.target + '/v1/storages/buckets/.UserNodeData/objects/80000070/customPick?fields=name,version')
    ctx.body = response1.headers
  }
}

module.exports = LogsController
