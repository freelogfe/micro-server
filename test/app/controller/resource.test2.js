'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test /app/controller/resource.test.js', () => {
  let cookies;

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
        console.log(cookies);
        assert(cookies.includes('authInfo='));
        assert.equal(res.body.ret, 0);
        assert.equal(res.body.errcode, 0);
        assert.equal(res.body.data.userId, 10001);
      });
  });


  it('test /v1/getMyResources.json', () => {
    return app.httpRequest()
      .get('/v1/getMyResources.json')
      .set('Cookie', cookies)
      .set('host', 'qi.testfreelog.com') // 模拟
      .expect(({ body }) => {
        console.log(body);
      });
  });
});
