(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{430:function(e,t,a){},442:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"listView",staticClass:"fl-lazy-list-view"},[e.previewList.length?a("ul",{style:{paddingTop:e.lineTopHeight+"px",paddingBottom:e.lineBottomHeight+"px"}},[e._l(e.previewList,function(t,s){return a("li",{key:s,staticClass:"show-up",class:[e.itemClass]},[e._t("default",null,{data:t})],2)}),e._v(" "),e._t("append")],2):e._e(),e._v(" "),e.isLoading||0!==e.previewList.length?e._e():e._t("empty",[a("div",{staticStyle:{"font-size":"20px","text-align":"center"}},[e._v(e._s(e.$t("components.lazyListView.noContentTip")))])]),e._v(" "),e._t("loading",[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading>0,expression:"isLoading > 0"}],ref:"loading",staticClass:"load-more-gif",attrs:{"element-loading-text":e.$t("components.lazyListView.loadingTip"),"element-loading-background":"rgba(0,0,0,0)"}})])],2)};s._withStripped=!0;var r=a(444),i=a.n(r),n=window.innerHeight||document.documentElement.clientHeight;function c(e,t){var a,s,r,i=e.getBoundingClientRect(),c={top:0,left:0,bottom:n,right:window.innerWidth||document.documentElement.clientWidth};return t&&(c.top-=t.top||0,c.left-=t.left||0,c.bottom+=t.bottom||0,c.right+=t.right||0),a=i,s=c,(r={}).top=Math.max(a.top,s.top),r.bottom=Math.min(a.bottom,s.bottom),r.left=Math.max(a.left,s.left),r.right=Math.min(a.right,s.right),r.bottom>=r.top&&r.right>=r.left}var o={name:"fl-lazy-list-view",props:{list:{type:Array,required:!0,default:[],twoWays:!0},itemClass:{type:String,default:""},fetch:{type:Function}},data:function(){return{lastScrollTop:null,lineTopHeight:0,lineBottomHeight:0,previewList:[],displayCount:0,canLoadMore:!0,index:1,isLoading:0}},mounted:function(){this.initView(),this.$on("reload",this.refresh.bind(this))},beforeDestroy:function(){this.disconnect()},methods:{initView:function(){var e=this,t=this.$refs.loading,a=parseInt(n,10);this.reset();var s=function(){t.classList.add("hide")};this.observer=i()(t,{loaded:function(r){if(!1===e.canLoadMore)return s();var i=c(t,{bottom:a}),n=function(){e.isLoading+=1,e.load().then(function(){e.isLoading-=1,!1===e.canLoadMore?s():(r.dataset.loaded=!1,e.observer.observe(r))}).catch(function(t){console.log(t),e.isLoading-=1,s()})};i?n():e.canLoadMore&&e.index<2&&n()},rootMargin:"".concat(a,"px ").concat(a,"px"),threshold:.1}),this.observer.observe()},load:function(){var e=this,t=e.index;return e.index+=1,e.fetch(t).then(function(t){if(e.canLoadMore=t.canLoadMore,e.scrollHandler(t.dataList||[]),!1===e.canLoadMore)return Promise.reject()})},disconnect:function(){var e=this.observer&&this.observer.observer;e&&e.disconnect&&e.disconnect()},reset:function(){var e=this.$refs.loading;this.canLoadMore=!0,this.previewList=[],this.index=1,this.isLoading=0,e.classList.remove("hide"),e.dataset.loaded=!1},refresh:function(){var e=this.$refs.loading;this.reset(),this.observer.observe(e),this.observer.triggerLoad(e)},scrollHandler:function(e){this.previewList=this.previewList.concat(e)}},components:{}},l=(a(445),a(3)),d=Object(l.a)(o,s,[],!1,null,"f929dc2c",null);d.options.__file="src/components/LazyListView/index.vue";t.a=d.exports},444:function(e,t,a){
/*! lozad.js - v1.9.0 - 2019-02-09
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2019 Apoorv Saxena; Licensed MIT */
e.exports=function(){"use strict";var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},t="undefined"!=typeof document&&document.documentMode,a={rootMargin:"0px",threshold:0,load:function(e){if("picture"===e.nodeName.toLowerCase()){var a=document.createElement("img");t&&e.getAttribute("data-iesrc")&&(a.src=e.getAttribute("data-iesrc")),e.getAttribute("data-alt")&&(a.alt=e.getAttribute("data-alt")),e.appendChild(a)}if("video"===e.nodeName.toLowerCase()&&!e.getAttribute("data-src")&&e.children){for(var s=e.children,r=void 0,i=0;i<=s.length-1;i++)(r=s[i].getAttribute("data-src"))&&(s[i].src=r);e.load()}e.getAttribute("data-src")&&(e.src=e.getAttribute("data-src")),e.getAttribute("data-srcset")&&e.setAttribute("srcset",e.getAttribute("data-srcset")),e.getAttribute("data-background-image")&&(e.style.backgroundImage="url('"+e.getAttribute("data-background-image")+"')"),e.getAttribute("data-toggle-class")&&e.classList.toggle(e.getAttribute("data-toggle-class"))},loaded:function(){}};function s(e){e.setAttribute("data-loaded",!0)}var r=function(e){return"true"===e.getAttribute("data-loaded")};return function(){var t,i,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},o=e({},a,c),l=o.root,d=o.rootMargin,u=o.threshold,h=o.load,v=o.loaded,p=void 0;return window.IntersectionObserver&&(p=new IntersectionObserver((t=h,i=v,function(e,a){e.forEach(function(e){(0<e.intersectionRatio||e.isIntersecting)&&(a.unobserve(e.target),r(e.target)||(t(e.target),s(e.target),i(e.target)))})}),{root:l,rootMargin:d,threshold:u})),{observe:function(){for(var e=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return e instanceof Element?[e]:e instanceof NodeList?e:t.querySelectorAll(e)}(n,l),t=0;t<e.length;t++)r(e[t])||(p?p.observe(e[t]):(h(e[t]),s(e[t]),v(e[t])))},triggerLoad:function(e){r(e)||(h(e),s(e),v(e))},observer:p}}}()},445:function(e,t,a){"use strict";var s=a(430);a.n(s).a},470:function(e,t,a){},471:function(e,t,a){},472:function(e,t,a){},484:function(e,t,a){},512:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isloading,expression:"isloading"}],staticClass:"release-editor-contract-wrapper"},[e._m(0),e._v(" "),e.cTreeData&&e.contracts.length?a("div",{staticClass:"r-e-c-tree"},[a("div",{staticClass:"r-e-c-btn"},[e._v(e._s(e.release.releaseName))]),e._v(" "),a("div",{staticClass:"r-e-c-tree-cont"},e._l(e.cTreeData,function(t){return a("contract-tree",{staticClass:"first-level",attrs:{data:t,activeKey:e.activeKey},on:{"update:activeKey":function(t){e.activeKey=t},"update:active-key":function(t){e.activeKey=t},activate:e.showDetailContract,inactivate:e.hideDetailContract}})}),1)]):a("div",{staticClass:"r-e-c-empty-box"},[e._v("\n    未获取到有效的合同信息\n  ")]),e._v(" "),a("transition",{attrs:{name:"fade"}},[e.contractDetail?a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowDetailContract,expression:"isShowDetailContract"}],staticClass:"release-editor-box"},[a("i",{staticClass:"el-icon-close",on:{click:e.hideDetailContract}}),e._v(" "),a("el-tabs",{staticClass:"rec-tab",attrs:{type:"border-card"},on:{"tab-click":e.exchangeContractTab},model:{value:e.activeContractTab,callback:function(t){e.activeContractTab=t},expression:"activeContractTab"}},e._l(e.targetData.policies,function(t,s){return a("el-tab-pane",{key:"p"+s,attrs:{label:t.policyName,name:t.policyName}},[a("div",{staticClass:"r-e-info"},[a("h4",[e._v("合约详情")]),e._v(" "),a("div",{staticClass:"r-e-info-row"},[a("span",{staticClass:"r-e-i-label"},[e._v("发行名称")]),e._v(e._s(e.targetData.label)+"\n            ")]),e._v(" "),a("div",{staticClass:"r-e-info-row"},[a("span",{staticClass:"r-e-i-label"},[e._v("资源类型")]),e._v(e._s(e._f("pageBuildFilter")(e.targetData.resourceType))+"\n            ")]),e._v(" "),a("div",{staticClass:"r-e-info-row"},[a("span",{staticClass:"r-e-i-label"},[e._v("创建日期")]),e._v(e._s(e._f("fmtDate")(e.contractDetail.createDate))+"\n            ")]),e._v(" "),a("div",{staticClass:"r-e-info-row"},[a("span",{staticClass:"r-e-i-label"},[e._v("合同ID")]),e._v(e._s(e.contractDetail.contractId)+"\n            ")]),e._v(" "),a("div",{staticClass:"r-e-info-row"},[a("span",{staticClass:"r-e-i-label"},[e._v("甲方")]),e._v(e._s(e.contractDetail.partyOne)+"\n            ")]),e._v(" "),a("div",{staticClass:"r-e-info-row"},[a("span",{staticClass:"r-e-i-label"},[e._v("乙方")]),e._v(e._s(e.contractDetail.partyTwo)+"\n            ")])]),e._v(" "),a("div",{staticClass:"r-e-c-detail"},[a("h4",[e._v("合同信息")]),e._v(" "),a("div",{staticClass:"r-e-c-cont"},[a("contract-detail",{staticClass:"contract-policy-content",attrs:{contract:e.contractDetail,policyText:e.contractDetail.contractClause.policyText},on:{"update:contract":function(t){e.contractDetail=t},"update-contract":e.updateContractAfterEvent}})],1)])])}),1)],1):e._e()])],1)};s._withStripped=!0;var r=a(130),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tree-node",class:[]},[a("div",{staticClass:"node-content",class:[e.data.contractType]},[a("div",{staticClass:"node-key",class:{active:e.data.key===e.activeKey},on:{click:function(t){return e.tapNodeKey(e.data)}}},[e._m(0)]),e._v(" "),a("div",{staticClass:"node-label",on:{click:function(t){return e.tapNodeContent(e.data)}}},[e._v(e._s(e.data.label))])]),e._v(" "),a("transition",{attrs:{name:"fade"}},[e.data.children&&e.data.isShowChildren?a("div",{staticClass:"children-box"},e._l(e.data.children,function(t){return a("contract-tree",{attrs:{data:t,activeKey:e.childActiveKey},on:{"update:activeKey":function(t){e.childActiveKey=t},"update:active-key":function(t){e.childActiveKey=t},activate:e.showContract,inactivate:e.hideContract}})}),1):e._e()])],1)};i._withStripped=!0;var n={name:"contract-tree",props:{data:Object,activeKey:String},data:function(){return{childActiveKey:""}},watch:{activeKey:function(){this.childActiveKey=this.activeKey},childActiveKey:function(){this.$emit("update:activeKey",this.childActiveKey)}},methods:{tapNodeKey:function(e){this.activeKey!==e.key?(this.$emit("activate",e),this.$emit("update:activeKey",e.key)):(this.$emit("inactivate",e),this.$emit("update:activeKey",""))},showContract:function(e){this.$emit("activate",e)},hideContract:function(e){this.$emit("inactivate",e)},tapNodeContent:function(){}}},c=(a(608),a(3)),o=Object(c.a)(n,i,[function(){var e=this.$createElement,t=this._self._c||e;return t("i",{staticClass:"el-icon-tickets"},[t("i",{staticClass:"el-icon-setting"})])}],!1,null,"26bdc244",null);o.options.__file="src/views/release/contract/contract-tree.vue";var l=o.exports,d=a(455),u={name:"release-editor-contract",components:{ContractDetail:r.a,ContractTree:l},props:{release:Object,contracts:{type:Array,default:[]},depReleasesDetailList:{type:Array,default:[]}},data:function(){return{isShowDetailContract:!1,isloading:!1,cTreeData:[],contractDetail:null,targetData:null,activeContractTab:"",activeContractTabIndex:0,activeKey:"",activeRelease:null,releaseIdNameMap:{}}},computed:{contractsMap:function(){var e={};return this.contracts.forEach(function(t){e[t.contractId]=t}),e}},watch:{contracts:function(){this.reResolveTreeData()},depReleasesDetailList:function(){this.reResolveTreeData()}},methods:{reResolveTreeData:function(){for(var e=this,t=[],a=this.depReleasesDetailList,s="tree-node-i-",r=-1,i=0,n=function(n){var c=a[n],o=c.contracts,l=c.baseUpcastReleases,d=c.releaseId,u=c.releaseName,h=o&&o.length>0;h&&(i=0,t[++r]=e.getTreeNode(a[n],s+n)),e.releaseIdNameMap[d]=u,l.forEach(function(a){if(a.contracts&&a.contracts.length>0){var c=e.getTreeNode(a,s+n);h?(c.key=c.key+"-"+i,i++,t[r].children.push(c)):(i=0,t[++r]=c)}})},c=0;c<a.length;c++)n(c);this.cTreeData=t},getTreeNode:function(e,t){try{var a={key:t,isShowChildren:!0,children:[],label:e.releaseName,resourceType:e.resourceType,contracts:e.contracts,contractType:this.getNodeContractType(e.contracts),policies:e.policies}}catch(e){console.log("e --",e)}return a},getNodeContractType:function(e){var t=!1,a="";if(e&&e.length)for(var s=0;s<e.length;s++){var r=e[s].contractId,i=this.contractsMap[r];if(i){if("success"===(a=d.CONTRACT_STATUS_COLORS[i.status]?d.CONTRACT_STATUS_COLORS[i.status].type:""))return a;"warning"===a&&(t=!0)}}return t?"warning":a},updateContractAfterEvent:function(){},exchangeContractTab:function(e){this.activeContractTabIndex=+e.index,this.handlerContract(this.targetData)},showDetailContract:function(e){var t=this;e.contracts.length&&(this.activeContractTabIndex=0,this.targetData!==e&&this.isShowDetailContract?(this.isShowDetailContract=!1,setTimeout(function(){t.handlerContract(e)},300)):this.handlerContract(e))},handlerContract:function(e){var t=e.contracts[this.activeContractTabIndex].contractId;this.activeContractTab=e.policies[this.activeContractTabIndex].policyName;var a=this.contractsMap[t],s=a.partyOne,r=a.partyTwo;this.contractDetail=this.contractsMap[t],this.contractDetail.partyOne=this.releaseIdNameMap[s]||s,this.contractDetail.partyTwo=this.releaseIdNameMap[r]||r,this.isShowDetailContract=!0,this.targetData=e},hideDetailContract:function(){this.activeKey="",this.isShowDetailContract=!1}},created:function(){this.release&&this.release.releaseId&&(this.releaseIdNameMap[this.release.releaseId]=this.release.releaseName)}},h=(a(609),a(610),Object(c.a)(u,s,[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"r-e-c-tags"},[t("i",{staticClass:"el-icon-setting success"}),this._v(" "),t("i",{staticClass:"el-icon-setting error"}),this._v(" "),t("i",{staticClass:"el-icon-setting warning"})])}],!1,null,"97cd9e92",null));h.options.__file="src/views/release/contract/index.vue";t.a=h.exports},608:function(e,t,a){"use strict";var s=a(470);a.n(s).a},609:function(e,t,a){"use strict";var s=a(471);a.n(s).a},610:function(e,t,a){"use strict";var s=a(472);a.n(s).a},668:function(e,t,a){"use strict";var s=a(484);a.n(s).a},669:function(e,t,a){},670:function(e,t,a){},671:function(e,t){e.exports=function(e){e.options.__i18n=e.options.__i18n||[],e.options.__i18n.push('{"zh-CN":{"namePlaceholder":"请输入发行名称","version":"版本号","dialogTitle":"我的资源","policy":"授权策略","basicUpcast":"基础上抛","releaseId":"发行ID","releaseIntro":"发行简介","aboutRelease":"发行相关","aboutVersion":"版本相关","authManagement":"授权管理","contract":"授权链","addBtnText":"新增版本","saveBtnText":"保存","editBtnText":"编辑","cancelBtnText":"取消","addIntroBtnText":"添加简介","addPolicyBtnText":"添加策略","enabled":"已启用","disabled":"已停用","online":"已上线","notOnline":"未上线","tips":["无策略的发行不会出现在市场中","未添加策略","策略已停用","未命名策略"],"messages":["封面更新成功！","策略添加成功！","发行简介添加成功！","发行简介更新成功！","发行名称更新成功！"]},"en":{"namePlaceholder":"Please enter the release name","version":"Version","dialogTitle":"My resources","policy":"Authorization Policy ","basicUpcast":"Basic upcast","releaseId":"releaseID","releaseIntro":"Release Intro","aboutRelease":"About release","aboutVersion":"About Version","authManagement":"Authorization Management","contract":"contract","addBtnText":"Add new version","saveBtnText":"Save","editBtnText":"Edit","cancelBtnText":"Cancel","addIntroBtnText":"add the intro","addPolicyBtnText":"add the policy ","enabled":" enabled","disabled":" disabled","online":"Online","notOnline":"Not online","tips":["The release without a policy do not appear in the market","There are no policy","The policies are disabled","Policy unnamed"],"messages":["Release cover updated successfully!","Release policy added successfully!","Release intro added successfully!","Release intro updated successfully!","Release name updated successfully!"]}}'),delete e.options._Ctor}},715:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-input",{ref:"searchInputRef",staticClass:"r-e-w-search-input",attrs:{clearable:"",placeholder:e.$t("search.resourcePlaceholder")},on:{clear:e.clearSearchInputHandler},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchHandler(t)}},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}}),e._v(" "),a("lazy-list-view",{ref:"searchView",staticClass:"r-e-w-s-resource-list",attrs:{list:e.searchResources,height:60,fetch:e.searchDataHandler},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"r-e-w-s-r-item"},[a("span",{staticClass:"r-e-w-s-r-name"},[e._v(e._s(t.data.aliasName))]),e._v(" "),a("span",{staticClass:"r-e-w-s-r-type"},[e._v(e._s(e._f("pageBuildFilter")(t.data.resourceType)))]),e._v(" "),a("span",{staticClass:"r-e-w-s-r-date"},[e._v(e._s(e._f("fmtDate")(t.data.createDate)))]),e._v(" "),e.resourceMapReleases[t.data.resourceId]?a("span",{staticClass:"r-e-w-s-r-relase"},[e._v("已有发行")]):e._e(),e._v(" "),a("span",{staticClass:"r-e-w-s-r-select-btn",on:{click:function(a){return e.selectResource(t.data)}}},[e._v("选择")])])]}}])})],1)};s._withStripped=!0;var r={name:"resource-search",components:{LazyListView:a(442).a},data:function(){return{searchInput:"",searchResources:[],isFirstSearch:!0,resourceMapReleases:{}}},computed:{resourceProjection:function(){return["resourceId","resourceType","aliasName","createDate","status"].join(",")}},methods:{clearSearchInputHandler:function(){},searchHandler:function(){this.searchResources=[],this.$refs.searchView.refresh(),console.log(this.resourceMapReleases)},searchDataHandler:function(e){var t=this;return this.$services.ResourceService.get({params:Object.assign({keywords:encodeURIComponent(this.searchInput),page:e,pageSize:10,isSelf:1,projection:this.resourceProjection},this.searchScope)}).then(function(e){var a=e.getData()||{};0===e.data.errcode?(t.searchResources=t.searchResources.concat(a.dataList),a.dataList.length<10&&(a.canLoadMore=!1)):a.canLoadMore=!1;var s=a.dataList.map(function(e){return e.resourceId});return t.batchFetchReleaseList(s),a})},selectResource:function(e){this.$emit("select-resource",e)},batchFetchReleaseList:function(e){var t=this;return e=e.filter(function(e){return!t.resourceMapReleases[e.resourceId]}).join(","),this.$services.ResourceService.get("releases?resourceIds=".concat(e)).then(function(e){return e.data}).then(function(e){if(0===e.errcode){for(var a=e.data.length,s={},r=0;r<a;r++){s[e.data[r].resourceId]=e.data[r].releases.length>0}t.resourceMapReleases=Object.assign({},t.resourceMapReleases,s)}})}}},i=(a(668),a(3)),n=Object(i.a)(r,s,[],!1,null,"505db748",null);n.options.__file="src/views/resource/search/search.vue";t.a=n.exports},900:function(e,t,a){"use strict";var s=a(669);a.n(s).a},901:function(e,t,a){"use strict";var s=a(670);a.n(s).a},902:function(e,t,a){"use strict";var s=a(671),r=a.n(s);t.default=r.a},958:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return null!==e.release?a("div",{staticClass:"release-editor-wrapper"},[a("release-editor-layout",{attrs:{release:e.release,selectedVersion:e.selectedVersion,type:"edit"},on:{"update:release":function(t){e.release=t}}},[a("template",{slot:"about-version"},[a("div",{staticClass:"r-e-w-v-box"},[a("div",{staticClass:"re-wvb-header clearfix"},[a("div",{staticClass:"rew-v-selector"},[a("div",{staticClass:"rew-v-version-box"},[a("span",{staticClass:"rew-v-b-version"},[e._v(e._s(e.$t("version"))+e._s(e.release.resourceVersions[e.selectedVersionIndex].version))]),e._v(" "),a("span",{staticClass:"rew-v-b-name"},[a("router-link",{attrs:{target:"_blank",to:"/resource/detail/"+e.release.resourceVersions[e.selectedVersionIndex].resourceId}},[e._v(e._s(e.release.resourceVersions[e.selectedVersionIndex].aliasName)+"\n                  ")]),e._v("\n                | "+e._s(e._f("fmtDate")(e.release.resourceVersions[e.selectedVersionIndex].createDate)))],1),e._v(" "),a("i",{staticClass:"el-icon-arrow-down",class:{visible:e.isVersionSelectorVisible}})]),e._v(" "),a("div",{staticClass:"rew-v-list"},[a("ul",e._l(e.release.resourceVersions,function(t,s){return a("li",{key:"rew-v-l-item-"+t.version,staticClass:"rew-v-l-item",class:{selected:t.version===e.selectedVersion},on:{click:function(a){return a.stopPropagation(),e.exchangeVersion(t,s)}}},[a("i",{staticClass:"el-icon-check"}),e._v(" "),a("span",{staticClass:"rew-v-li-version"},[e._v(e._s(t.version))]),e._v(" "),a("span",{staticClass:"rew-v-li-name"},[e._v(e._s(t.aliasName))]),e._v(" "),a("span",{staticClass:"rew-v-li-date"},[e._v(e._s(e._f("fmtDate")(t.createDate)))])])}),0)])]),e._v(" "),a("div",{staticClass:"r-e-w-v-add-btn",on:{click:e.showResourceDialog}},[e._v(e._s(e.$t("addBtnText")))])]),e._v(" "),e.depReleasesList.length>0?a("div",{staticClass:"r-e-w-v-scheme"},[a("el-tabs",{attrs:{type:"card",closable:!1},on:{"tab-click":e.exchangeVTab},model:{value:e.vTabActiveName,callback:function(t){e.vTabActiveName=t},expression:"vTabActiveName"}},[a("el-tab-pane",{attrs:{label:e.$t("authManagement"),name:"scheme"}},[a("scheme-manage",{attrs:{type:"edit",release:e.release,baseUpcastReleases:e.release.baseUpcastReleases,depReleasesList:e.depReleasesList,depReleasesDetailList:e.depReleasesDetailList,releasesTreeData:e.releasesTreeData,contracts:e.contracts},on:{"update:depReleasesDetailList":function(t){e.depReleasesDetailList=t},"update:dep-releases-detail-list":function(t){e.depReleasesDetailList=t},"update:releasesTreeData":function(t){e.releasesTreeData=t},"update:releases-tree-data":function(t){e.releasesTreeData=t},"update-resolved-releases":e.updateResolvedReleases,"update-release-scheme":e.updateReleaseScheme,"policy-sign-immediately":e.signedImmediately,"update:contracts":function(t){e.contracts=t}}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:e.$t("contract"),name:"contract"}},[a("release-editor-contract",{attrs:{release:e.release,depReleasesDetailList:e.depReleasesDetailList,contracts:e.contracts}})],1)],1)],1):e._e()])])],2),e._v(" "),a("el-dialog",{staticClass:"r-e-w-search-dialog",attrs:{center:"",title:e.$t("dialogTitle"),width:"640px",visible:e.resourceDialogVisible},on:{"update:visible":function(t){e.resourceDialogVisible=t}}},[a("resource-search",{on:{"select-resource":e.addNewVersion}})],1)],1):e._e()};s._withStripped=!0;var r=a(427),i=a.n(r),n=a(134),c=a(742),o=a(512),l=a(715),d=a(442),u=a(522),h=a(26),v={name:"release-detail",components:{ReleaseEditorLayout:c.a,SchemeManage:u.a,ReleaseEditorContract:o.a,LazyListView:d.a,ResourceSearch:l.a},data:function(){return{release:null,targetResourceId:"",targetResourceDetail:null,vTabActiveName:"scheme",selectedVersion:"",selectedVersionIndex:0,isVersionSelectorVisible:!1,resourceDialogVisible:!1,contracts:[],depReleasesList:[],depReleasesDetailList:[],resolvedReleases:[],resignResolvedReleases:[],releasesTreeData:[],searchInput:"",searchResources:[]}},computed:{releaseId:function(){return this.$route.params.releaseId},resourceProjection:function(){return["resourceId","resourceType","aliasName","createDate","status"].join(",")}},watch:{targetResourceId:function(){this.fetchResourceDetail()}},methods:{fetchResourceDetail:function(){var e=this;this.$services.resource.get(this.targetResourceId).then(function(e){return e.data}).then(function(t){0===t.errcode?(e.targetResourceDetail=t.data,e.depReleasesList=e.targetResourceDetail?e.targetResourceDetail.systemMeta.dependencies:[]):e.$message({type:"error",message:t.msg})}).catch(function(t){return e.$message({type:"error",message:t.toString()})})},fetchReleaseDetail:function(){var e=this;this.$services.ReleaseService.get(this.releaseId).then(function(e){return e.data}).then(function(t){if(0===t.errcode){e.release=t.data;var a=e.release.latestVersion,s=a.resourceId,r=a.version;e.selectedVersion=e.release.selectedVersion=r,e.targetResourceId=s,e.targetResourceDetail=t.data.resourceInfo,e.formatReleaseData(),e.fetchEveryVersionRDetail()}})},formatReleaseData:function(){this.release.resourceVersions=this.release.resourceVersions.map(function(e){return e.createDate=Object(n.format)(e.createDate,"YYYY-MM-DD"),e})},fetchEveryVersionRDetail:function(){var e=this;this.$services.resource.get("list",{params:{resourceIds:this.release.resourceVersions.map(function(e){return e.resourceId}).join(","),projection:"aliasName,resourceId,resourceType,createDate,intro"}}).then(function(e){return e.data}).then(function(t){if(0===t.errcode){var a={};t.data=t.data.forEach(function(e){return a[e.resourceId]=e}),e.release.resourceVersions=e.release.resourceVersions.sort(h.e).map(function(e){return(e=Object.assign(e,a[e.resourceId])).createDate=Object(n.format)(e.createDate,"YYYY-MM-DD"),e})}else e.$message({type:"error",message:t.msg})}).catch(function(t){return e.$message({type:"error",message:t.toString()})})},exchangeVersion:function(e,t){this.targetResourceId=e.resourceId,this.selectedVersion=e.version,this.release.selectedVersion=e.version,this.selectedVersionIndex=t},exchangeVTab:function(e){this.vTabActiveName=e.name},showResourceDialog:function(){this.resourceDialogVisible=!0},addNewVersion:function(e){if(e.resourceType===this.release.resourceType){for(var t=this.release.resourceVersions,a=0;a<t.length;a++)if(t[a].resourceId===e.resourceId)return void this.$message({type:"warning",message:"不可用：所选资源与该发行版本".concat(t[a].version,"的资源相同"),duration:5e3});this.$router.push("/release/add?releaseId=".concat(this.release.releaseId,"&resourceId=").concat(e.resourceId))}else this.$message({type:"warning",message:"所选资源的类型必须为".concat(this.release.resourceType),duration:5e3})},updateResolvedReleases:function(e){this.resolvedReleases=e},signedImmediately:function(){this.updateReleaseScheme()},updateReleaseScheme:function(e){var t=this,a=this.resolvedReleases;this.$services.ReleaseService.put("".concat(this.releaseId,"/versions/").concat(this.selectedVersion),{resolveReleases:a}).then(function(e){return e.data}).then(function(a){if(0===a.errcode){var s=a.data.resolveReleases;t.updateSchemeContracts(s),t.$message({type:"success",message:e||"签约成功！"})}})},updateSchemeContracts:function(e){for(var t=this,a=e.length,s=this.contracts.map(function(e){return e.contractId}),r=[],n=0;n<a;n++){var c=e[n].contracts;(void 0===c?[]:c).forEach(function(e){e.contractId&&-1===s.indexOf(e.contractId)&&r.push(e.contractId)})}r.length&&this.$services.ContractRecords.get({params:{contractIds:r.join(",")}}).then(function(e){return e.data}).then(function(e){0===e.errcode&&(t.contracts=[].concat(i()(t.contracts),i()(e.data)))})}},created:function(){this.fetchReleaseDetail()}},p=(a(900),a(901),a(3)),f=a(902),g=Object(p.a)(v,s,[],!1,null,"0faeccaf",null);"function"==typeof f.default&&Object(f.default)(g),g.options.__file="src/views/release/edit/index.vue";t.default=g.exports}}]);