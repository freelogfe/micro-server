'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/presentable.test.js', () => {

  it('test /v1/presentables/auth.json', () => {
    app.mockCookies({
      authInfo: 'eyJhbGciOiJSU0EtU0hBMjU2IiwidHlwIjoiSldUIn0=.eyJ1c2VySWQiOjEwMDAxLCJ1c2VyTmFtZSI6IiIsIm5pY2tuYW1lIjoidGVzdC0wMSIsImVtYWlsIjoidGVzdEBmcmVlbG9nLmNvbSIsIm1vYmlsZSI6IiIsImhlYWRJbWFnZSI6IiIsInRva2VuU24iOiJmMjk2YWIwMTEwMzE0NjBlOWRiNDkzNTVhNDJkNWNlZiIsInVzZXJSb2xlIjoxLCJzdGF0dXMiOjEsImNyZWF0ZURhdGUiOiIyMDE4LTAzLTA4VDA5OjM4OjMwLjAwMFoiLCJ1cGRhdGVEYXRlIjoiMjAxOC0wMy0wOFQwOTozODoyOS4wMDBaIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5mcmVlbG9nLmNvbSIsInN1YiI6IjEwMDAxIiwiYXVkIjoiZnJlZWxvZy13ZWJzaXRlIiwiZXhwIjoxNTQzMzAwNzM3LCJpYXQiOjE1NDIwMDQ3MzcsImp0aSI6ImYyOTZhYjAxMTAzMTQ2MGU5ZGI0OTM1NWE0MmQ1Y2VmIiwiZXhwaXJlIjoxNTQzMzAwNzM3fQ==.36e853356a05715d37b72a299d42f44cbacf38a1fa08bb06f178304f597b1568dd65cf1d2aa48ef405d90f0cab2aaa8baaaf05121d6a8c28ba67f152d37450c40daff527c991b39e59f24a3892e178e52a0fb31f9e45a2686176fee7b0296b0cf061816fbe233ad537b412c8d0190c22f9af4fe96e04603f3fa4566b8fb028ba',
    });
    return app.httpRequest()
      .get('/v1/presentables/auth.json?nodeId=10003&pids=5be928abbfb8f8002bce53ce')
      .set('host', 'qi.testfreelog.com') // 模拟
      .expect(({ body }) => {
        // console.log(body)
      });
  });
});
