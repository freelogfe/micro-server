"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { FreelogContext } from 'egg-freelog-base';
const fs = require('fs-extra');
const path = require('path');
// https://frcdn.oss-cn-shenzhen.aliyuncs.com/runtime/index.html
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    // config.keys = appInfo.name + '_1621911302983_1743';
    config.keys = appInfo.name + '_1535620905039_1459';
    // add your config here
    config.middleware = ['errorAutoSnapHandler', 'jwtIdentityInfoHandler', 'urlMiddleware'];
    config.security = {
        csrf: {
            enable: false,
        },
    };
    config.midwayFeature = {
        // true 代表使用 midway logger
        // false 或者为空代表使用 egg-logger
        replaceEggLogger: true,
    };
    config.jwtAuth = {
        cookieName: 'authInfo',
        privateKey: fs.readFileSync(path.join(appInfo.baseDir, './auth_key/private_key.pem')).toString(),
        publicKey: fs.readFileSync(path.join(appInfo.baseDir, './auth_key/public_key.pem')).toString(),
    };
    config.clientCredentialInfo = {
        clientId: 1004,
        publicKey: 'c8724fd977542b155abac77664093770',
        privateKey: 'e8739ff716660a4c942724d306216612',
    };
    //   config.jwtAuth = {
    //     publicKey: `-----BEGIN PUBLIC KEY-----
    // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDR1CVtWu/jKC2xkZc50i/PHi8G
    // l+9bXUtYQNj+Pr7mSQi9qHB+xeBgoqgTzSXHPpZcNvYSI4X7Gc7JURPbhskgss+t
    // Wj01Gautann7hiCQY0UUpbvvoNPkyNTluC4KAjUazARda5isE9Na3CtU185EuQ7+
    // BMaN4BKSCPZWX/o1vQIDAQAB
    // -----END PUBLIC KEY-----`,
    //   };
    config.httpProxy = {
        withCredentials: true,
    };
    config.customLogger = {
        httpProxyLogger: {
            file: 'http-proxy.log',
        }
    };
    config.cors = {
        credentials: true,
        origin(ctx) {
            return ctx.request.headers.origin || '*';
        },
        exposeHeaders: 'freelog-resource-type,freelog-meta,freelog-system-meta,freelog-sub-dependencies,freelog-entity-nid',
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiRDovYXBwL21pY3JvLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLmRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBcUQ7QUFDckQsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQzlCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUk1QixnRUFBZ0U7QUFDaEUsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDckMsTUFBTSxNQUFNLEdBQUcsRUFBbUIsQ0FBQztJQUVuQyx1RUFBdUU7SUFDdkUsc0RBQXNEO0lBQ3RELE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQTtJQUNsRCx1QkFBdUI7SUFDdkIsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFFLHNCQUFzQixFQUFFLHdCQUF3QixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLEtBQUs7U0FDZDtLQUNGLENBQUE7SUFDRCxNQUFNLENBQUMsYUFBYSxHQUFHO1FBQ3JCLDBCQUEwQjtRQUMxQiw0QkFBNEI7UUFDNUIsZ0JBQWdCLEVBQUUsSUFBSTtLQUN2QixDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQ2hHLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0tBQy9GLENBQUE7SUFDRCxNQUFNLENBQUMsb0JBQW9CLEdBQUc7UUFDNUIsUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsa0NBQWtDO1FBQzdDLFVBQVUsRUFBRSxrQ0FBa0M7S0FDL0MsQ0FBQTtJQUNILHVCQUF1QjtJQUN2Qiw2Q0FBNkM7SUFDN0MsbUVBQW1FO0lBQ25FLG1FQUFtRTtJQUNuRSxtRUFBbUU7SUFDbkUsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3QixPQUFPO0lBQ0wsTUFBTSxDQUFDLFNBQVMsR0FBRztRQUNqQixlQUFlLEVBQUUsSUFBSTtLQUN0QixDQUFBO0lBQ0QsTUFBTSxDQUFDLFlBQVksR0FBRztRQUNwQixlQUFlLEVBQUU7WUFDZixJQUFJLEVBQUUsZ0JBQWdCO1NBQ3ZCO0tBQ0YsQ0FBQTtJQUNELE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixXQUFXLEVBQUUsSUFBSTtRQUNqQixNQUFNLENBQUMsR0FBRztZQUNSLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQTtRQUMxQyxDQUFDO1FBQ0QsYUFBYSxFQUFFLG9HQUFvRztLQUNwSCxDQUFBO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=