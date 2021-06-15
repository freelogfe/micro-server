// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!
import 'egg';
import ExtendContext from '../../../src/app/extend/context.js';
type ExtendContextType = typeof ExtendContext;
declare module 'egg' {
  interface Context extends ExtendContextType { }
}