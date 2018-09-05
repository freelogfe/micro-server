const is = require('is-type-of')

module.exports = () => {
  return async (ctx, next) => {
    const {retCodeEnum, errCodeEnum} = ctx.app
    try {
      ctx.request.identityInfo = {} //
      //bodyParserError为上层egg默认首个中间件bodyParser的异常
      if (ctx.request.bodyParserError) {
        throw Object.assign(ctx.request.bodyParserError, {
          retCode: retCodeEnum.success,
          errCode: errCodeEnum.paramValidateError,
          data: 'bodyParse数据转换异常,请检查传入的数据是否符合接口规范'
        })
      }

      ctx.errors = []

      await next()

      if (ctx.body === undefined && /^[2|3]{1}\d{2}$/.test(ctx.response.status)) {
        ctx.body = ctx.toBody(retCodeEnum.success, errCodeEnum.success, 'success', null)
      }
    } catch (e) {
      if (is.nullOrUndefined(e)) {
        e = new Error("not defined error")
      }
      if (!is.int(e.retCode)) {
        e.retCode = retCodeEnum.serverError
      }
      if (!is.int(e.errCode)) {
        e.errCode = errCodeEnum.autoSnapError
      }
      ctx.body = ctx.toBody(e.retCode, e.errCode, e.message || e.toString(), e.data)
    }
  }
}