'use strict'

// had enabled by egg
// exports.static = true;

exports.cors = {
  enable: true,
  package: 'egg-cors',
}

exports.eggFreelogBase = {
  enable: true,
  package: 'egg-freelog-base',
}

exports.static = true
