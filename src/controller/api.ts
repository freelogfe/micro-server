import { Inject, Controller, App, All, Provide } from '@midwayjs/decorator';
import { Context, Application } from 'egg';
import { UserService } from '../service/user';

@Provide()
@Controller('/')
export class APIController {
  @Inject()
  ctx: Context;
  @App()
  app: Application;
  @Inject()
  userService: UserService;

  @All('/v1/*')
  async v1() {
    await this.ctx.proxyRequest(this.app.config.gatewayUrl);
  }
  @All('/v2/*')
  async v2() {
    await this.ctx.proxyRequest(this.app.config.gatewayUrl);
  }
}
