(function(e,n){"object"===typeof exports&&"object"===typeof module?module.exports=n():"function"===typeof define&&define.amd?define([],n):"object"===typeof exports?exports["freelog-markdown-app"]=n():e["freelog-markdown-app"]=n()})(window,(function(){return function(e){function n(n){for(var r,a,i=n[0],c=n[1],s=n[2],f=0,l=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(n);while(l.length)l.shift()();return u.push.apply(u,s||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,i=1;i<t.length;i++){var c=t[i];0!==o[c]&&(r=!1)}r&&(u.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},o={app:0},u=[];function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="/";var i=window["webpackJsonp_freelog-markdown"]=window["webpackJsonp_freelog-markdown"]||[],c=i.push.bind(i);i.push=n,i=i.slice();for(var s=0;s<i.length;s++)n(i[s]);var p=c;return u.push([0,"chunk-vendors"]),t()}({0:function(e,n,t){e.exports=t("56d7")},2395:function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n),t.d(n,"bootstrap",(function(){return h})),t.d(n,"mount",(function(){return v})),t.d(n,"unmount",(function(){return y}));var r=t("1da1"),o=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("96cf"),t("2b0e")),u=t("2f62");o["a"].use(u["a"]);var a=new u["a"].Store({state:{},mutations:{},actions:{},modules:{}}),i=(t("83f4"),t("8c4f")),c=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"theme-main"}},[t("div",{attrs:{id:"freelog-single"}})])}],p={name:"freelog-document-app",data:function(){return{mount:!1}},computed:{},methods:{getSub:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var n,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.freelogApp.getPresentables({resourceType:"widget"});case 2:n=e.sent,t=n.data.data.dataList,t.some((function(e,n){if(1===n)return!0;window.freelogApp.mountWidget({id:e.resourceInfo.resourceId,presentableId:e.presentableId,name:e.presentableName,resourceId:e.resourceInfo.resourceId},document.getElementById("freelog-single"))}));case 5:case"end":return e.stop()}}),e)})))()}},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:!e.mount&&e.getSub(),e.mount=!0;case 2:case"end":return n.stop()}}),n)})))()}},f=p,l=(t("7c55"),t("2877")),d=Object(l["a"])(f,c,s,!1,null,null,null),m=d.exports;o["a"].config.productionTip=!1,o["a"].use(i["a"]);var w=null;function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.container;w=new o["a"]({store:a,render:function(e){return e(m)}}).$mount(n?n.querySelector("#app"):"#app")}function h(){return b.apply(this,arguments)}function b(){return b=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] vue app bootstraped");case 1:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function v(e){return _.apply(this,arguments)}function _(){return _=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] props from main framework",n),g(n);case 2:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}function y(){return O.apply(this,arguments)}function O(){return O=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:w.$destroy(),w.$el.innerHTML="",w=null;case 3:case"end":return e.stop()}}),e)}))),O.apply(this,arguments)}window.__POWERED_BY_FREELOG__||g()},"7c55":function(e,n,t){"use strict";t("2395")},"83f4":function(e,n,t){window.__POWERED_BY_FREELOG__&&(t.p=window.__INJECTED_PUBLIC_PATH_BY_FREELOG__)}})}));
//# sourceMappingURL=app.8a0e3188.js.map