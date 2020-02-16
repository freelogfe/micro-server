'use strict'

const Controller = require('egg').Controller

class I18nManagement extends Controller {
  async getTrackedRepositories(ctx) {
    const result = await ctx.service.i18nManagement.trackRepository('freelogfe-web-repos')
    ctx.success(result)
  }
}

module.exports = I18nManagement
