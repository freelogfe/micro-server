(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["freelog-markdown-app"]=t():e["freelog-markdown-app"]=t()})(window,(function(){return function(e){function t(t){for(var r,a,i=t[0],c=t[1],p=t[2],f=0,l=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);s&&s(t);while(l.length)l.shift()();return u.push.apply(u,p||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},u=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var i=window["webpackJsonp_freelog-markdown"]=window["webpackJsonp_freelog-markdown"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var p=0;p<i.length;p++)t(i[p]);var s=c;return u.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"bootstrap",(function(){return h})),n.d(t,"mount",(function(){return v})),n.d(t,"unmount",(function(){return y}));var r=n("1da1"),o=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("96cf"),n("2b0e")),u=n("2f62");o["a"].use(u["a"]);var a=new u["a"].Store({state:{},mutations:{},actions:{},modules:{}}),i=(n("83f4"),n("8c4f")),c=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"theme-main"}},[n("div",{attrs:{id:"freelog-single"}})])}],s={name:"freelog-document-app",data:function(){return{mount:!1}},computed:{},methods:{getSub:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.freelogApp.getPresentables({resourceType:"widget"});case 2:t=e.sent,n=t.data.data.dataList,n.some((function(e,t){if(1===t)return!0;window.freelogApp.mountWidget({id:e.presentableId,name:e.presentableName},document.getElementById("freelog-single"))}));case 5:case"end":return e.stop()}}),e)})))()}},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:!e.mount&&e.getSub(),e.mount=!0;case 2:case"end":return t.stop()}}),t)})))()}},f=s,l=(n("7c55"),n("2877")),d=Object(l["a"])(f,c,p,!1,null,null,null),m=d.exports;o["a"].config.productionTip=!1,o["a"].use(i["a"]);var w=null;function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.container;w=new o["a"]({store:a,render:function(e){return e(m)}}).$mount(t?t.querySelector("#app"):"#app")}function h(){return b.apply(this,arguments)}function b(){return b=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] vue app bootstraped");case 1:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function v(e){return _.apply(this,arguments)}function _(){return _=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] props from main framework",t),g(t);case 2:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}function y(){return O.apply(this,arguments)}function O(){return O=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:w.$destroy(),w.$el.innerHTML="",w=null;case 3:case"end":return e.stop()}}),e)}))),O.apply(this,arguments)}window.__POWERED_BY_FREELOG__||g()},"7c55":function(e,t,n){"use strict";n("2395")},"83f4":function(e,t,n){window.__POWERED_BY_FREELOG__&&(n.p=window.__INJECTED_PUBLIC_PATH_BY_FREELOG__)}})}));
//# sourceMappingURL=app.9f980ac7.js.map