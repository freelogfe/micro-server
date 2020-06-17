'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    // target: 'http://api.testfreelog.com',
    target: 'http://120.78.136.120:30038',
    // target: 'http://api-gateway-service.development:6895',
  }

  return config
}
