import { Context, Application } from 'egg';
import { UserService } from '../service/user';
export declare class APIController {
    ctx: Context;
    app: Application;
    userService: UserService;
    v1(): Promise<void>;
    v2(): Promise<void>;
}
