const extend = require('extend')
const is = require('is-type-of')

module.exports = {
  // this 是 helper 对象，在其中可以调用其他 helper 方法
  // this.ctx => context 对象
  // this.app => application 对象
  isStatusOk(res) {
    return res.status === 200
  },

  isDataError(res) {
    var data = res.data
    return data.ret !== 0
  },

  mergeResponse(responses) {
    for (let i = 0; i < responses.length; i++) {
      let res = responses[i]
      if (this.isDataError(res) || !this.isStatusOk(res)) {
        return res
      }
    }

    return responses.reduce((data, res) => {
      extend(true, data, res.data)
      return data
    }, {})
  },

  /**
   *
   * @param target
   * @param src
   * @param key {string|object}
   * @param mergeFn
   * @returns {*}
   */
  mergeBy(target, src, key, mergeFn) {
    if (!key) {
      throw new Error('need key parameter for mergeBy function')
    }

    var srcMap = {}
    var srcKey = key
    var targetKey

    if (is.string(key)) {
      srcKey = targetKey = key
    } else if (is.object(key)) { //key map
      srcKey = key.src
      targetKey = key.target
    }
    src.forEach((val) => {
      srcMap[val[srcKey]] = val
    })

    return target.map(val => {
      let srcVal = srcMap[val[targetKey]]
      if (srcVal) {
        if (is.function(mergeFn)) {
          val = mergeFn(val, srcVal)
        } else if (is.string(mergeFn)) {
          val[mergeFn] = srcVal
        } else {
          val = Object.assign(val, srcVal)
        }
      }

      return val
    })
  }
};
