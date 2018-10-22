module.exports = appInfo => {
  const config = {};

  config.httpProxy = {
    target: 'http://api.testfreelog.com'
  }


  return config;
};
