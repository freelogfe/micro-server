# micro-server


> micro server for freelog ![](https://travis-ci.org/freelogfe/micro-server.svg?branch=master)




## QuickStart

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy
注意去掉``--daemon``参数，避免docker时无法正常启动。原因见[docker里为什么不能在后台运行程序](https://segmentfault.com/a/1190000009583997)，egg也是建议[前台运行](https://eggjs.org/zh-cn/core/deployment.html#%E5%90%AF%E5%8A%A8%E5%91%BD%E4%BB%A4)

```bash
$ npm start
$ npm stop
```



### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org