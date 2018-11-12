'use strict';

const extend = require('extend');
const is = require('is-type-of');
const _ = require('lodash');
const retCodeEnum = require('../enum/ret-code');
const errCodeEnum = require('../enum/error-code');

module.exports = {

  /* 定义成功返回的API数据结构 */
  success(data) {
    this.body = this.toBody(retCodeEnum.success, errCodeEnum.success, 'success', data);
    return this;
  },

  /* 定义错误返回的API数据结构 */
  error(params) {
    let { msg, errCode, retCode, data } = params;
    const message = msg || 'proxy内部异常';

    errCode = is.undefined(errCode) ? params.errcode : errCode;
    retCode = is.undefined(retCode) ? params.ret : retCode;

    throw Object.assign(new Error(message), {
      retCode: retCode ? retCode : retCodeEnum.success,
      errCode: errCode ? errCode : errCodeEnum.apiError,
      data: !is.undefined(data) ? data : is.error(arguments[0]) ? arguments[0].data : undefined,
    });
  },

  /* 校验参数,有错误就抛出异常 */
  validate() {
    if (!this.errors || !this.errors.length) {
      return this;
    }

    const msg = `参数校验失败,details:${JSON.stringify(this.errors)}`;
    this.error({
      msg,
      errCode: errCodeEnum.paramValidateError,
    });
  },

  /* 构建API返回数据格式 */
  toBody(ret, errCode, msg, data) {
    const result = {
      ret: is.int32(ret) ? ret : retCodeEnum.success,
      errcode: is.int32(errCode) ? errCode : errCodeEnum.success,
      msg: is.string(msg) || is.number(msg) ? msg.toString() : 'success',
      data: is.nullOrUndefined(data) ? null : data,
    };
    return result;
  },

  /* 获取内部REST-API数据 */
  async curlRequest(url, options) {
    const { app } = this;
    const req = this.request;

    url = url[0] === '/' ? (app.config.httpProxy.target + url) : url;
    options = options || {};

    options = extend(true, {
      method: req.method,
      headers: this.headers,
      dataType: 'json',
      timeout: 1e4,
    }, options);

    if (!options.data && !_.isEmpty(req.body)) {
      options.data = req.body;
    }
    debugger

    const result = await this.curl(url, options);
    return result;
  },

  /**
   * 获取配置
   */
  get config() {
    return this.app.config;
  },
};
