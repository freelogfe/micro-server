'use strict';
const objectPath = require("object-path");
const routeMap = require('./router-map')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app;

  Object.keys(routeMap).forEach(key => {
    const [method, path] = key.split(' ')
    router[method](path, objectPath.get(app, routeMap[key]));
  });

  // router.get('/api/getResource.json', controller.resource.index);
  // router.get('/api/v1/presentables/auth', controller.presentable.queryAuth)
  // router.post('/api/v1/customStores/createOrUpdate', controller.resource.update);

  ["get", "post", "put", "delete", "options"].forEach(method => {
    router[method]('/api/*', controller.proxy.handle)
  })
};
