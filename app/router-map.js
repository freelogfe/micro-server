'use strict'

module.exports = {
  'get /v1/presentables/auth.json': 'presentable.queryAuth',
  'get /v1/getMyResources.json': 'resource.getMyResources',
  'get /v1/pay/orders.json': 'pay.orders',
}
