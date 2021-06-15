import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
// import { FreelogContext } from 'egg-freelog-base';
const fs = require('fs-extra')
const path = require('path')
// const pathToRegexp = require('path-to-regexp')

export type DefaultConfig = PowerPartial<EggAppConfig>;
// https://frcdn.oss-cn-shenzhen.aliyuncs.com/runtime/index.html
export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  // config.keys = appInfo.name + '_1621911302983_1743';
  config.keys = appInfo.name + '_1535620905039_1459'
  // add your config here
  config.middleware = [ 'errorAutoSnapHandler', 'jwtIdentityInfoHandler', 'urlMiddleware'];
  config.security = {
    csrf: {
      enable: false,
    },
  }
  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };
  config.jwtAuth = {
    cookieName: 'authInfo',
    privateKey: fs.readFileSync(path.join(appInfo.baseDir, './auth_key/private_key.pem')).toString(),
    publicKey: fs.readFileSync(path.join(appInfo.baseDir, './auth_key/public_key.pem')).toString(),
  }
  config.clientCredentialInfo = {
    clientId: 1004,
    publicKey: 'c8724fd977542b155abac77664093770',
    privateKey: 'e8739ff716660a4c942724d306216612',
  }
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
  }
  config.customLogger = {
    httpProxyLogger: {
      file: 'http-proxy.log',
    }
  }
  config.cors = {
    credentials: true,
    origin(ctx) {
      return ctx.request.headers.origin || '*'
    },
    exposeHeaders: 'freelog-resource-type,freelog-meta,freelog-system-meta,freelog-sub-dependencies,freelog-entity-nid',
  }
  return config;
};
