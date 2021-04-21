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
  'get /v1/presentable/:presentableId/info/subDepend/:subDependId': 'presentable.getPresentableSubDependInfo',
  'get /v1/getMyResources.json': 'resource.getMyResources',
  'get /v1/myContracts/list': 'contract.getMyContracts',
  'get /v1/myTerminatedContracts/list': 'contract.getMyTerminatedContracts',
  'get /v1/pay/orders.json': 'pay.orders',
  'get /v1/microServer/logs/app': 'logs.index',
  'get /v1/microServer/logs/error': 'logs.errorLogs',
  'get /v1/microServer/logs/core': 'logs.coreLogs',
  'get /v1/nodes/authInfo': 'node.getAuthInfo',
  'get /v2/widgets/:resourceId/:a/:b/:c/:d': 'widget.staticFile',
  'get /v2/widgets/:resourceId/:a/:b/:c': 'widget.staticFile',
  'get /v2/widgets/:resourceId/:a/:b': 'widget.staticFile',
  'get /v2/widgets/:resourceId/:a': 'widget.staticFile',  
  'get /v2/widgets/:resourceId': 'widget.home',
}
