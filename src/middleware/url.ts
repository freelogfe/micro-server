import { App, Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Application, Context } from 'egg';

@Provide()
export class urlMiddleware implements IWebMiddleware {
  @App()
  app: Application;
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      if (ctx.request.header.origin) {
        ctx.baseUrl =
          ctx.request.header.origin.indexOf('.testfreelog.com') > -1
            ? 'api.testfreelog.com'
            : 'api.freelog.com';
      }
      ctx.publicPath =
        this.app.config.env === 'local'
          ? 'http://localhost:3000'
          : 'https://frcdn.oss-cn-shenzhen.aliyuncs.com/runtime';
      await next();
    };
  }
}
