'use strict'
module.exports = () => {
  const config = {}

  config.gatewayUrl = 'http://api.testfreelog.com'
  config.httpProxy = {
    // target: 'http://39.108.77.211:8895',
    target: 'http://api.testfreelog.com',
    // target: 'https://api.freelog.com',
  }

  return config
}
