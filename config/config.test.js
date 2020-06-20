'use strict'
module.exports = () => {
  const config = {}

  config.gatewayUrl = 'http://api-gateway-service.development:6895'
  config.httpProxy = {
    // target: 'http://api.testfreelog.com',
    target: 'http://api-gateway-service.development:6895',
  }

  return config
}
