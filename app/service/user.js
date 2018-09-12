const Service = require('egg').Service;

class UserService extends Service {
  async queryList(params) {
    const {ctx} = this
    if (Array.isArray(params.userIds)) {
      params.userIds = params.userIds.join(',')
    }

    const data = await ctx.service.list.queryList('/api/v1/userinfos', params)
    return data
  }
}

module.exports = UserService;
