module.exports = {
  'get /api/getResource.json': 'resource.index',
  'get /api/v1/presentables/auth': 'presentable.queryAuth',
  'get /api/v2/presentables/auth': 'presentable.queryAuth',
  'get /qi/v1/getMyResources.json': 'resource.getMyResources',
  'get /qi/v1/pay/orders.json': 'pay.orders',

}