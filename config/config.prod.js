module.exports = appInfo => {
  const config = {};

  config.httpProxy = {
    // target: 'http://172.18.215.224:8895/',
    // pathRewrite: {
    //   '^/api/v1': '/test/v1'
    // }
    target: 'http://112.74.140.101'
  }

  return config;
};