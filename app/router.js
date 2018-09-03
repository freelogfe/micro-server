'use strict';

const pathToRegexp = require('path-to-regexp')


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app;
  // const customRouter = {
  //   'get /api/getResource.json': controller.resource.index,
  //   'get /api/v1/presentables/auth': controller.presentable.queryAuth
  // }
  // var ignorePaths = []
  // Object.keys(customRouter).forEach(key => {
  //   const [method, path] = key.split(' ')
  //   ignorePaths.push(pathToRegexp(path))
  //   router[method](path, customRouter[key]);
  // })
  //
  //
  // const httpProxy = app.middleware.httpProxy({
  //   ignore: ignorePaths
  // }, app);

  router.get('/api/getResource.json', controller.resource.index);
  router.get('/api/v1/presentables/auth', controller.presentable.queryAuth);
  router.post('/api/v1/customStores/createOrUpdate', controller.resource.update);

  ["get", "post", "put", "delete", "options"].forEach(method => {
    router[method]('/api/*', controller.proxy.handle)
  })
};
