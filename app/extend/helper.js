const extend = require('extend')

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
  }
};
