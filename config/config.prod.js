'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    target: 'http://api.freelog.com',
  }

  return config
}
