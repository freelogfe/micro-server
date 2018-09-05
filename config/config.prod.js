module.exports = appInfo => {
  const config = {};

  config.keys = appInfo.name + '_1535620905039_1459';

  config.middleware = ['errorHandler'];

  config.security = {
    csrf: {
      enable: false
    }
  }

  /**
   * 内部中间件没有处理到的异常,在此处统一处理
   */
  config.onerror = {
    all(err, ctx) {
      ctx.body = {
        ret: 0,
        errCode: 1,
        msg: '未处理的异常',
        data: err.stack || err.toString()
      }
    }
  }

  config.httpProxy = {
    target: 'http://172.18.215.224:8895/',
    pathRewrite: {
      '^/api/v1': '/test/v1'
    }
  }

  return config;
};