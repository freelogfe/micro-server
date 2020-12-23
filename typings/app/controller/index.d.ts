// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportContract = require('../../../app/controller/contract');
import ExportLogs = require('../../../app/controller/logs');
import ExportNode = require('../../../app/controller/node');
import ExportPay = require('../../../app/controller/pay');
import ExportPresentable = require('../../../app/controller/presentable');
import ExportProxy = require('../../../app/controller/proxy');
import ExportResource = require('../../../app/controller/resource');

declare module 'egg' {
  interface IController {
    contract: ExportContract;
    logs: ExportLogs;
    node: ExportNode;
    pay: ExportPay;
    presentable: ExportPresentable;
    proxy: ExportProxy;
    resource: ExportResource;
  }
}
