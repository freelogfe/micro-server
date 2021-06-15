import { Application, Context } from 'egg';
export declare class HomeController {
    app: Application;
    ctx: Context;
    home(): Promise<void>;
    static(): Promise<void>;
}
