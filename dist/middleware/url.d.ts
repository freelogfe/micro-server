import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Application, Context } from 'egg';
export declare class urlMiddleware implements IWebMiddleware {
    app: Application;
    resolve(): (ctx: Context, next: IMidwayWebNext) => Promise<void>;
}
