'use strict'

// method path controller
module.exports = {
  'get /v1/presentables/auth.json': 'presentable.queryAuth',
  'get /v1/presentables/authList': 'presentable.pagingGetPresentablesAuthList',
  'get /v1/:nodeId/presentables/authList': 'presentable.batchGetPresentablesAuthList',
  'get /v1/presentable/:presentableId/info': 'presentable.getPresentableInfo',
  'get /v1/presentable/:presentableId/auth': 'presentable.getPresentableAuth',
  'get /v1/presentable/:presentableId/data': 'presentable.getPresentableData',
  'get /v1/presentable/:presentableId/data/subDepend/:subDependId': 'presentable.getPresentableSubDependData',
  'get /v1/getMyResources.json': 'resource.getMyResources',
  'get /v1/myContracts/list': 'contract.getMyContracts',
  'get /v1/myTerminatedContracts/list': 'contract.getMyTerminatedContracts',
  'get /v1/pay/orders.json': 'pay.orders',
  'get /v1/microServer/logs/error': 'logs.index',
}
