'use strict';

const {app, mock, assert} = require('egg-mock/bootstrap');

describe('test/app/controller/pay.test.js', () => {

  it('test /v1/pay/orders.json', () => {
    return app.httpRequest()
      .get('/v1/pay/orders.json?accountId=feth20987414e94')
      .set('host', 'qi.testfreelog.com') //模拟
      .expect(({body}) => {
        // console.log(body)
      });
  });
});
