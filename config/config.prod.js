'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    target: 'http://172.18.215.224:8895',
  }

  return config
}
