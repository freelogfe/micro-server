class AsyncParallel {
  constructor() {
    this.reset()
  }

  push(fn) {
    this.asyncFns.push(fn)
  }

  async run() {
    var ret = await Promise.all(this.asyncFns)
    this.reset()
    return ret
  }


  reset() {
    this.asyncFns = []
  }

  async each(list, fn) {
    this.reset()
    for (let i = 0; i < list.length; i++) {
      let asyncFn = fn(list[i], i)
      this.asyncFns.push(asyncFn)
    }

    return await this.run()
  }
}

module.exports = new AsyncParallel()