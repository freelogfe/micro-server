module.exports = appInfo => {
  const config = {};

  config.httpProxy = {
    target: 'https://api.freelog.com'
  }

  return config;
};