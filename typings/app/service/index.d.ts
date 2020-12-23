// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportContract = require('../../../app/service/contract');
import ExportList = require('../../../app/service/list');
import ExportNode = require('../../../app/service/node');
import ExportPresentable = require('../../../app/service/presentable');
import ExportProxy = require('../../../app/service/proxy');
import ExportRelease = require('../../../app/service/release');
import ExportResource = require('../../../app/service/resource');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    contract: AutoInstanceType<typeof ExportContract>;
    list: AutoInstanceType<typeof ExportList>;
    node: AutoInstanceType<typeof ExportNode>;
    presentable: AutoInstanceType<typeof ExportPresentable>;
    proxy: AutoInstanceType<typeof ExportProxy>;
    release: AutoInstanceType<typeof ExportRelease>;
    resource: AutoInstanceType<typeof ExportResource>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
