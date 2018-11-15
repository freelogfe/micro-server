'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    target: 'https://api.freelog.com',
  }

  return config
}
