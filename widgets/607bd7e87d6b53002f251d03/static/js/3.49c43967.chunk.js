(this["webpackJsonp_freelog-novel-react"]=this["webpackJsonp_freelog-novel-react"]||[]).push([[3],{37:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}r.d(t,"a",(function(){return s}))},40:function(e,t,r){"use strict";r.r(t);var n=r(7),c=r.n(n),s=r(37),a=r(9),o=r(17),l=r(0),i=r(1),b=function(e){var t=["\u96f6","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d"],r=["","\u5341","\u767e","\u5343","\u4e07"];e=parseInt(e);var n=function(e){for(var n=e.toString().split("").reverse(),c="",s=0;s<n.length;s++)c=(0==s&&0==n[s]||s>0&&0==n[s]&&0==n[s-1]?"":t[n[s]]+(0==n[s]?r[0]:r[s]))+c;return c},c=Math.floor(e/1e4),s=e%1e4;return s.toString().length<4&&(s="0"+s),c?n(c)+"\u4e07"+n(s):n(e)},p=r(2),f=Object(l.lazy)((function(){return r.e(4).then(r.bind(null,39))}));t.default=Object(i.f)((function(e){var t=e.match.params.id,r=Object(l.useState)({}),n=Object(o.a)(r,2),i=n[0],u=n[1],d=Object(l.useState)([]),j=Object(o.a)(d,2),h=j[0],O=j[1];Object(l.useEffect)(Object(a.a)(c.a.mark((function e(){var r,n,a,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.freelogApp.getPresentablesSearch({presentableIds:t});case 2:return r=e.sent,e.next=5,window.freelogApp.getResourceInfoById(t);case 5:return n=e.sent,console.log(n),u(Object(s.a)(Object(s.a)({},r.data.data[0]),{},{intro:n.data.data.intro})),e.next=10,window.freelogApp.getPresentables({resourceType:"chapter",tags:r.data.data[0].presentableName,isLoadVersionProperty:1});case 10:a=e.sent,o=a.data.data.dataList,console.log(o),o.sort((function(e,t){var r=0,n=1;try{r=parseInt(e.versionProperty.chapter),n=parseInt(t.versionProperty.chapter)}catch(c){console.log("chapter \u8bbe\u7f6e\u9519\u8bef "+e.presentableName+" \u6216\u8005 "+t.presentableName)}return r-n})),o=o.map((function(e,t){return e.chapterIndex="\u7b2c"+b(t+1)+"\u7ae0",e})),O(a.data.data.dataList||[]);case 16:case"end":return e.stop()}}),e)}))),[]);var x=Object(l.useState)(!1),m=Object(o.a)(x,2),v=m[0],g=m[1],w=Object(l.useState)(!1),y=Object(o.a)(w,2),N=y[0],P=y[1],S=Object(l.useState)(!1),I=Object(o.a)(S,2),k=I[0],D=I[1];return Object(p.jsxs)("div",{className:"flex-column w-100x h-100x over-h",children:[N?Object(p.jsx)(f,{current:v,setVisible:function(e){P(!!e)}}):"",Object(p.jsx)("div",{className:"bg-white bb-1 px-20 py-15 flex-row shrink-0",children:Object(p.jsxs)("div",{onClick:function(){e.history.push("/")},onTouchStart:function(){console.log(23232),D(!0)},onTouchEnd:function(){D(!1)},className:"text-ellipsis flex-row align-center"+(k?" fc-nav-active":""),children:[Object(p.jsx)("div",{className:"mr-5 fs-40 pb-5"+(k?"":" fc-less"),children:"<"})," ",Object(p.jsx)("div",{className:"fs-30 text-ellipsis flex-1 lh-55",children:i.presentableName})]})}),Object(p.jsx)("div",{className:"flex-1 over-h w-100x",children:Object(p.jsxs)("div",{className:"flex-column h-100x y-auto w-100x",children:[Object(p.jsxs)("div",{className:"flex-column bb-1",children:[Object(p.jsx)("div",{className:"fw-bold fs-35 py-20 bg-less px-20",children:"\u7b80\u4ecb"}),Object(p.jsx)("div",{className:"fs-30 px-30 py-20 mb-20 lh-50",children:i.intro?Object(p.jsx)("p",{className:"",children:i.intro}):Object(p.jsx)("span",{className:"fc-less f-italic",children:"\u6682\u65e0"})})]}),Object(p.jsxs)("div",{className:"flex-column",children:[Object(p.jsxs)("div",{className:"fw-bold fs-35 py-20 px-20 bg-less",children:["\u7ae0\u8282\uff08\u5171",h.length,"\u7ae0\uff09"]}),h.map((function(e,t){return Object(p.jsx)("div",{className:"fs-30 pl-40 pr-10 py-30 bb-1 text-pre-wrap",onClick:function(){g({bookInfo:i,chapters:h,chapterIndex:t}),P(!0)},children:e.chapterIndex+"      "+e.presentableName},t)}))]}),Object(p.jsx)("div",{className:"fc-less w-100x mb-20 mt-10 text-center f-italic fs-30",children:"\u5230\u5e95\u5566...."})]})})]})}))}}]);
//# sourceMappingURL=3.49c43967.chunk.js.map