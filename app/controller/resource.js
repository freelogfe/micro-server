'use strict';

const Controller = require('egg').Controller;

class ResourceController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = ResourceController;
