const Service = require('egg').Service;

class ResourceService extends Service {
  async find() {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }
}

module.exports = ResourceService;
