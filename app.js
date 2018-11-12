'use strict';

const koaValidate = require('koa-validate');

module.exports = app => {
  koaValidate(app);
  app.config.coreMiddleware.unshift('httpProxy');
};
