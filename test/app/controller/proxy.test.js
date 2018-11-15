'use strict';

// https://github.com/visionmedia/supertest
// https://github.com/eggjs/egg-mock
const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  let cookies;

  function httpRequest(url, method) {
    method = method || 'get';
    assert(cookies);
    return app.httpRequest()[method](url)
      .set('cookie', cookies)
      .set('origin', 'http://qi.testfreelog.com')
      .set('host', 'qi.testfreelog.com')
  }

  function requestSuccess(body) {
    assert.equal(body.ret, 0);
    assert.equal(body.errcode, 0);
    assert(body.data);
  }

  it('测试转发代理请求成功', () => {
    return app.httpRequest()
      .get('/v1/userinfos/10001')
      .expect(({body}) => {
        // 未找到jwtStr信息
        assert(body.ret === 2);
        assert(body.errcode === 28);
      });
  });

  it('测试转发登录请求成功', () => {
    return app.httpRequest()
      .post('/v1/passport/login')
      .send({
        loginName: 'test@freelog.com',
        password: '123456',
      })
      .expect(200)
      .expectHeader('set-cookie')
      .expect(res => {
        cookies = res.headers['set-cookie'].pop().split(';')[0];
        assert(cookies.includes('authInfo='));
        requestSuccess(res.body);
        assert.equal(res.body.data.userId, 10001);
      });
  });

  it('test /v1/getMyResources.json', () => {
    return httpRequest('/v1/getMyResources.json')
      .expect(({body}) => {
        requestSuccess(body);
        assert(body.data.hasOwnProperty('dataList'));
        assert(Array.isArray(body.data.dataList));
        assert(body.data.hasOwnProperty('totalItem'));
      });
  });

  it('test /v1/pay/orders.json', () => {
    return httpRequest('/v1/pay/orders.json?accountId=feth20987414e94')
      .expect(({body}) => {
        requestSuccess(body);
        assert(body.data.hasOwnProperty('dataList'));
        assert(body.data.hasOwnProperty('totalItem'));
      });
  });

  it('test /v1/pay/orders.json', () => {
    return httpRequest('/v1/pay/orders.json')
      .expect(({body}) => {
        assert.equal(body.ret, 0);
        assert.equal(body.errcode, 83);
        assert(body.msg.includes('参数校验失败'))
      });
  });


  it('test options request', () => {
    return httpRequest('/v1/userinfos/10001', 'options')
      .expectHeader('access-control-allow-origin')
      .expectHeader('access-control-allow-methods')
      .expect(204);
  });

  it('test /v1/presentables/auth.json', () => {
    return httpRequest('/v1/presentables/auth.json?nodeId=10003&pids=5be928abbfb8f8002bce53ce')
      .expect(({body}) => {
        requestSuccess(body);
        assert(typeof body.data === 'object');
        assert.equal(body.msg, 'success');
      });
  });
});
