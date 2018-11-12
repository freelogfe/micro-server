'use strict';

const Controller = require('egg').Controller;

class PresentableController extends Controller {

  /**
   * @param ctx
   * @returns {Promise<void>}
   */
  async queryAuth(ctx) {
    const nodeId = ctx.checkQuery('nodeId').notEmpty().value;
    let pids = ctx.checkQuery('pids').notEmpty().value;

    ctx.validate();

    pids = pids.split(',');
    const result = {};
    const responses = await ctx.helper.parallel.each(pids, async pid => {
      const lazyFn = ctx.curlRequest(`/v1/auths/presentable/${pid}.info?nodeId=${nodeId}`);
      return lazyFn.then(res => {
        return { pid, res };
      });
    });

    responses.forEach(({ pid, res }) => {
      const data = res.data;
      [ 'freelog-sub-resource-auth-token', 'freelog-sub-resourceids' ].forEach(key => {
        data.data[key] = res.headers[key];
      });

      if (data.errcode) {
        data.data.errcode = data.errcode;
        data.data.errMsg = data.msg;
      }

      result[pid] = res.data.data;
    });

    ctx.success(result);
  }
}

module.exports = PresentableController;
