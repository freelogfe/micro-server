(function(e,n){"object"===typeof exports&&"object"===typeof module?module.exports=n():"function"===typeof define&&define.amd?define([],n):"object"===typeof exports?exports["freelog-markdown-app"]=n():e["freelog-markdown-app"]=n()})(window,(function(){return function(e){function n(n){for(var r,i,a=n[0],c=n[1],p=n[2],f=0,l=[];f<a.length;f++)i=a[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&l.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);s&&s(n);while(l.length)l.shift()();return u.push.apply(u,p||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==o[c]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},u=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/";var a=window["webpackJsonp_freelog-markdown"]=window["webpackJsonp_freelog-markdown"]||[],c=a.push.bind(a);a.push=n,a=a.slice();for(var p=0;p<a.length;p++)n(a[p]);var s=c;return u.push([0,"chunk-vendors"]),t()}({0:function(e,n,t){e.exports=t("56d7")},2395:function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n),t.d(n,"bootstrap",(function(){return h})),t.d(n,"mount",(function(){return v})),t.d(n,"unmount",(function(){return _}));var r=t("1da1"),o=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("96cf"),t("2b0e")),u=t("2f62");o["a"].use(u["a"]);var i=new u["a"].Store({state:{},mutations:{},actions:{},modules:{}}),a=(t("83f4"),t("8c4f")),c=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"theme-main"},[t("div",{attrs:{id:"freelog-single"}})])}],s={name:"freelog-document-app",data:function(){return{mount:!1}},computed:{},methods:{getSub:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var n,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(window.freelogApp),e.next=3,window.freelogApp.getSelfId(window);case 3:return n=e.sent,e.next=6,window.freelogApp.getSubDep(n);case 6:t=e.sent,console.log(n,t,document.getElementById("freelog-single")),t.subDeps.some((function(e,r){if(1===r)return!0;console.log(212341243,e),window.freelogApp.mountWidget(e,document.getElementById("freelog-single"),{presentableId:n,entityNid:t.entityNid,subDependId:e.id,resourceInfo:{resourceId:e.id}},"")}));case 9:case"end":return e.stop()}}),e)})))()}},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:!e.mount&&e.getSub(),e.mount=!0;case 2:case"end":return n.stop()}}),n)})))()}},f=s,l=(t("7c55"),t("2877")),d=Object(l["a"])(f,c,p,!1,null,null,null),m=d.exports;o["a"].config.productionTip=!1,o["a"].use(a["a"]);var g=null;function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.container;g=new o["a"]({store:i,render:function(e){return e(m)}}).$mount(n?n.querySelector("#app"):"#app")}function h(){return b.apply(this,arguments)}function b(){return b=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] vue app bootstraped");case 1:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function v(e){return y.apply(this,arguments)}function y(){return y=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] props from main framework",n),w(n);case 2:case"end":return e.stop()}}),e)}))),y.apply(this,arguments)}function _(){return O.apply(this,arguments)}function O(){return O=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:g.$destroy(),g.$el.innerHTML="",g=null;case 3:case"end":return e.stop()}}),e)}))),O.apply(this,arguments)}window.__POWERED_BY_FREELOG__||w()},"7c55":function(e,n,t){"use strict";t("2395")},"83f4":function(e,n,t){window.__POWERED_BY_FREELOG__&&(t.p=window.__INJECTED_PUBLIC_PATH_BY_FREELOG__)}})}));
//# sourceMappingURL=app.3d11f15f.js.map