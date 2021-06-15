// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!
import 'egg';
import ExtendApplication from '../../../src/app/extend/application.js';
type ExtendApplicationType = typeof ExtendApplication;
declare module 'egg' {
  interface Application extends ExtendApplicationType { }
}