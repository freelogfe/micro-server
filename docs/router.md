## router
路由统一在 ``app/router-map.js``中进行定义


定义规则``method path controller_method``，如下

```js
module.exports = {
  'get /qi/v1/pay/orders.json': 'pay.orders'
}
```

对应于

```js
app.router.get('/qi/v1/pay/orders.json', app.controller.pay.orders)
```