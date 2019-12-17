(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{432:function(e,t,a){},434:function(e,t,a){"use strict";a.r(t),a.d(t,"RESOURCE_TYPES",function(){return s}),a.d(t,"RESOURCE_STATUS_MAP",function(){return r}),a.d(t,"RESOURCE_STATUS",function(){return i});var n=a(1),s={json:"json",widget:"widget",image:"image",audio:"audio",markdown:"markdown",page_build:"page_build",reveal_slide:"reveal_slide",license:"license",video:"video",catalog:"catalog"},r={unknown:0,unpublished:1,published:2,freeze:3},i=[{desc:n.a.t("config.resource.states[0]"),type:"danger",status:r.unknown},{desc:n.a.t("config.resource.states[1]"),type:"warning",status:r.unpublished},{desc:n.a.t("config.resource.states[2]"),type:"success",status:r.published},{desc:n.a.t("config.resource.states[3]"),type:"danger",status:r.freeze}]},456:function(e,t,a){"use strict";var n=a(432);a.n(n).a},459:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"fl-pagination"},[a("el-table",e._b({ref:"table",staticStyle:{width:"100%"},attrs:{"empty-text":e.emptyText},on:{"row-click":e.rowClickHandler,"selection-change":e.selectionChangeHandler}},"el-table",e.tableProps,!1),[e._t("list")],2),e._v(" "),0===e.tableProps.data.length?e._t("empty"):e._e(),e._v(" "),e.showFooter?a("div",{staticClass:"fl-pg-ft clearfix"},[e._t("footer"),e._v(" "),a("el-pagination",{staticClass:"fl-pg-info",attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],2):e._e()],2)};n._withStripped=!0;var s=a(6),r={name:"fl-pagination",props:{emptyText:{type:String,default:"暂无数据"},pagination:{type:Object,default:function(){return{pageSize:10}}},config:Object,rowClickHandler:{type:Function,default:function(){}},selectionChangeHandler:{type:Function,default:function(e){}},formatHandler:Function,showFooter:{type:Boolean,default:!0}},data:function(){return{total:8,tableProps:{data:[]},currentPage:1,pageSize:parseInt(window.sessionStorage.getItem("".concat(this.$route.fullPath,"_page_size")))||10,loading:!1}},watch:{pagination:{deep:!0,handler:function(){this.reload()}},pageSize:function(){this.reload()}},methods:{loadData:function(){if(!this.pagination.target)throw new Error("need pagination target param");var e={page:this.currentPage,pageSize:this.pageSize};return this.source=s.axios.CancelToken.source(),this.pagination.params&&Object.assign(e,this.pagination.params),this.$axios.get(this.pagination.target,{params:e,cancelToken:this.source.token}).then(function(e){if(e.data){if(0===e.data.ret&&0===e.data.errcode)return e.data.data;throw new Error(e.data.msg)}})},update:function(e){if(e&&e.dataList){this.total=e.totalItem||e.dataList.length;var t="function"==typeof this.formatHandler?this.formatHandler(e.dataList):e.dataList;this.tableProps.data=t}},reload:function(){this.currentPage=1,this.loading&&this.source&&(this.loading=!1,this.source.cancel("cancel")),this.load()},load:function(){var e=this;this.loading||(this.loading=!0,this.loadData().then(this.update.bind(this)).then(function(){e.loading=!1,window.sessionStorage.setItem("".concat(e.$route.fullPath,"_page_size"),e.pageSize)}).catch(function(t){t.message&&"cancel"===t.message||e.$error.showErrorMessage(t),e.loading=!1}))},handleSizeChange:function(e){this.pageSize=e},handleCurrentChange:function(e){this.currentPage=e,this.load()}},mounted:function(){Object.assign(this.tableProps,this.config),this.load()}},i=(a(456),a(3)),o=Object(i.a)(r,n,[],!1,null,null,null);o.options.__file="src/components/Pagination/index.vue";t.a=o.exports},475:function(e,t,a){"use strict";a.d(t,"c",function(){return s}),a.d(t,"b",function(){return r});var n=a(1),s=[{type:"free",template:"for public:\n  initial:\n    active\n    terminate\n  ",name:n.a.t("components.policyEditor.defaultPolicyNames.free")},{type:"charge",template:"for public:\n  escrow account acct\n  custom event acceptor.customEvent\n\n  initial:\n    recontractable\n    proceed to auth on acct exceed 1 feather\n  auth:\n    presentable\n    recontractable\n    active\n    proceed to refund on acct.confiscated\n  refund:\n    recontractable\n    proceed to finish on acct.refunded\n  finish:\n    recontractable\n    terminate\n  ",name:n.a.t("components.policyEditor.defaultPolicyNames.charge")}],r=[{type:"free",template:"for public:\n  initial:\n    active\n    terminate\n  ",name:n.a.t("components.policyEditor.defaultPolicyNames.free")},{type:"charge",template:"\n    for public:\n      escrow account acct\n      custom event acceptor.customEvent\n\n      initial:\n        proceed to auth on acct exceed 1 feather\n      auth:\n        presentable\n        active\n        proceed to refund on acct.confiscated\n      refund:\n        proceed to finish on acct.refunded\n      finish:\n        terminate",name:n.a.t("components.policyEditor.defaultPolicyNames.charge")}];t.a={release:s,presentable:r}},485:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.policies.length>0?a("el-tabs",e._l(e.policies,function(t){return a("el-tab-pane",{attrs:{label:t.policyName}},[a("div",{staticStyle:{height:"200px","overflow-y":"auto"}},[a("pre",{staticStyle:{"white-space":"pre-wrap"}},[e._v(e._s(t.policyText))])])])}),1):e._e(),e._v(" "),0===e.policies.length?a("div",{staticStyle:{"min-height":"200px",display:"flex","align-items":"center","justify-content":"center"}},[a("span",[e._v("暂无策略......")])]):e._e()],1)};n._withStripped=!0;var s={name:"PolicyTabs",props:{policies:{type:Array,validator:function(e){return e.every(function(e){return e.hasOwnProperty("policyId")&&e.hasOwnProperty("policyName")})},default:[]}},methods:{},mounted:function(){}},r=a(3),i=Object(r.a)(s,n,[],!1,null,"183c1c83",null);i.options.__file="src/components/PolicyTabs/index.vue";t.a=i.exports},684:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=["全部","已上线","未上线"]},703:function(e,t,a){},704:function(e,t,a){},705:function(e,t){e.exports=function(e){e.options.__i18n=e.options.__i18n||[],e.options.__i18n.push('{"zh-CN":{"createBtnText":"创建资源","createNewReleaseText":"创建新发行","resourceListTitle":"资源列表","releaseListTitle":"发行列表","presentablesListTitle":"节点发行列表","resourceList":{"name":"资源名称","type":"资源类型","allTypes":"全部类型","history":"历史发行","status":"发行情况","updateDate":"更新时间","createDate":"创建时间","operate":"操作","querying":"查询中...","noReleases":"暂无发行","releaseBtnText":"发行","saveBtnText":"保存","detailBtnText":"详情","editBtnText":"编辑","downloadBtnText":"下载源文件","releasesCount":["等","个发行..."],"messages":["没有符合条件的资源","您还没有创建任何资源。"],"releaseStatus":["未发行","已发行","全部"]},"releaseList":{"name":"发行名称","type":"发行类型","newVersion":"最新版本","allTypes":"全部类型","view":"查看","policy":"策略","policyTpls":"节点发行策略模版","updateDate":"更新时间","createDate":"创建时间","operate":"操作","editBtnText":"编辑","createBtnText":"创建Presentable","tips":["策略已下架"],"messages":["没有符合条件的发行","您还没有创建任何发行。","您还没有收藏任何发行。您在发行市场收藏的发行之后将会出现在这里。","取消成功！"],"status":["未上线","已上线"]},"presentablesList":{"name":"节点发行名称","type":"类型","tags":"标签","onlineStatus":"在线状态","operate":"操作","saveBtnText":"保存","upgradeBtnText":"升级","editBtnText":"编辑","createBtnText":"创建Presentable"}},"en":{"createBtnText":"Create Resource","createNewReleaseText":"Create a New Release","resourceListTitle":"Resource List","releaseListTitle":"Release List","presentablesListTitle":"Presentable List","resourceList":{"name":"Resource name","type":"Resource type","allTypes":"All types","history":"Release history","status":"Release status","updateDate":"Update date","createDate":"Create date","operate":"Operate","querying":"Querying...","noReleases":"No releases","releaseBtnText":"Release","saveBtnText":"save","detailBtnText":"detail","editBtnText":"Edit","downloadBtnText":"Download resource file","releasesCount":["There are "," releases..."],"messages":["There are no resources available","You have not created any resources."],"releaseStatus":["Not release","Relased","All"]},"releaseList":{"name":"Release name","type":"Release type","newVersion":"New version","allTypes":"All types","view":"view","policy":"policy","policyTpls":"presentable policy template","updateDate":"Update date","createDate":"Create date","operate":"Operate","editBtnText":"Edit","createBtnText":"create presentable","tips":["All policies has been off the shelves"],"messages":["There are no releases available","You have not created any releases.","You haven\'t collected any releases yet. You will appear here after the release of your collection in the release market.","Cancel Successful！"],"status":["offline","online"]},"presentablesList":{"name":"name","type":"type","tags":"tags","onlineStatus":"online status","operate":"Operate","saveBtnText":"save","upgradeBtnText":"upgrade","editBtnText":"edit"}}}'),delete e.options._Ctor}},933:function(e,t,a){"use strict";var n=a(703);a.n(n).a},934:function(e,t,a){"use strict";var n=a(704);a.n(n).a},935:function(e,t,a){"use strict";var n=a(705),s=a.n(n);t.default=s.a},965:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tool-release-list"},[a("div",{staticClass:"trl-header"},[a("h3",[a("span",[e._v(e._s(e.$t("releaseListTitle")))])]),e._v(" "),a("div",{staticClass:"trl-btn-group"},[e.selectedReleases.length?[a("el-button",{attrs:{type:"success"},on:{click:e.batchCreatePresentables}},[e._v("批量创建节点发行")])]:e._e(),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.refreshReleasesList}},[e._v("刷新列表")])],2)]),e._v(" "),a("f-pagination",{ref:"releaseslistRef",staticClass:"release-list-table",attrs:{config:e.tableConfig,formatHandler:e.formatHandler,pagination:e.paginationConfig,"empty-text":e.pagenationEmptyText,selectionChangeHandler:e.handleSelectionChange}},[a("template",{slot:"list"},[a("el-table-column",{attrs:{type:"selection",width:"45"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("releaseList.name")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"trl-item-name-box",on:{click:function(a){return e.goToReleaseDetail(t.row)}}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v(e._s(t.row.latestVersion.version))]),e._v(" "),a("div",{staticClass:"trl-item-name",attrs:{title:t.row.releaseName}},[e._v(e._s(t.row.releaseName))])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("releaseList.type"),width:"160"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-dropdown",{staticClass:"trl-types",on:{command:e.handleSelectType}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n              "+e._s(e.$t("releaseList.type"))+" "+e._s("all"===e.selectedType?"":" "+e.selectedType)),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.resourceTypes,function(t){return a("el-dropdown-item",{key:t.value,attrs:{command:t.value}},[e._v(e._s(t.label))])}),1)],1)]}},{key:"default",fn:function(t){return[a("div",{staticClass:"trl-item-type"},[e._v(" "+e._s(t.row.resourceType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("releaseList.policyTpls"),width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",e._l(e.presentablePolicyTpls,function(n){return a("el-radio",{key:n.type,staticClass:"p-tpl-radio",attrs:{label:n.type},model:{value:t.row.presentablePolicyType,callback:function(a){e.$set(t.row,"presentablePolicyType",a)},expression:"scope.row.presentablePolicyType"}},[e._v(e._s(n.name))])}),1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"节点选择",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticClass:"trl-node-select",attrs:{placeholder:"请选择签约节点"},model:{value:t.row.checkedNodeId,callback:function(a){e.$set(t.row,"checkedNodeId",a)},expression:"scope.row.checkedNodeId"}},e._l(e.nodes,function(e){return a("el-option",{key:e.nodeId,attrs:{disabled:-1!==t.row.rSubordinateNodesIds.indexOf(e.nodeId),label:e.nodeName+(-1!==t.row.rSubordinateNodesIds.indexOf(e.nodeId)?"（已签约）":""),value:e.nodeId}})}),1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("releaseList.operate"),width:"145"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{attrs:{to:t.row._toMangeDetailLink}},[a("el-button",{staticClass:"trl-item-edit-btn",attrs:{size:"mini"}},[e._v(e._s(e.$t("releaseList.editBtnText")))])],1),e._v(" "),""!==t.row.checkedNodeId?a("el-button",{staticClass:"trl-item-create-btn",attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.createPresentable(t.row)}}},[e._v(e._s(e.$t("releaseList.createBtnText")))]):e._e()]}}])})],1)],2)],1)};n._withStripped=!0;var s=a(87),r=a.n(s),i=a(86),o=a.n(i),l=a(88),c=a(459),u=a(485),d=a(434),p=a(684),f=a(475),h={name:"tool-release-list",props:{},components:{FPagination:c.a,FPolicyTabs:u.a},data:function(){var e=this.$route.query.resourceType;return{search:"",loader:null,tableConfig:{rowClassName:"release-row","cell-class-name":"rel-row-cell","show-header":!0},paginationConfig:{pageSize:20,reloadCount:0,target:"/v1/releases",params:{isSelf:1,resourceType:null!=e?e:void 0,keywords:void 0,status:void 0}},selectedType:null!=e?e:"all",pagenationEmptyText:"",checkedNodeId:"",selectedReleases:[]}},computed:o()({resourceTypes:function(){for(var e=[{label:this.$i18n.t("releaseList.allTypes"),value:"all"}],t=0,a=Object.entries(d.RESOURCE_TYPES);t<a.length;t++){var n=r()(a[t],2),s=n[0],i=n[1];e.push({label:s,value:i})}return e},releaseStatusArray:function(){return p.a.map(function(e,t){return{label:e,value:t}})},policyTplsMap:function(){var e={};return f.a.presentable.forEach(function(t){var a=t.type;e[a]=t}),e},presentablePolicyTpls:function(){return f.a.presentable}},Object(l.b)({session:"session",nodes:"nodes"})),watch:{query:function(){var e=this.$i18n,t=[e.t("releaseList.messages[0]"),e.t("releaseList.messages[1]"),e.t("releaseList.messages[2]")],a=t[0],n=t[1],s=t[2];""==this.query?(this.paginationConfig.params.keywords=void 0,this.pagenationEmptyText="myReleases"===this.type?n:s):(this.paginationConfig.params.keywords=this.query,this.pagenationEmptyText=a)}},mounted:function(){this.initView()},methods:{initView:function(){var e=this.$i18n.t("releaseList.messages[1]");this.paginationConfig.target="/v1/releases",this.pagenationEmptyText=e},formatHandler:function(e){var t=this;if(!e||!e.length)return[];var a={};(e=e.map(function(e){for(var n=e.releaseId,s=e.policies,r=void 0===s?[]:s,i=e.previewImages,o=e.latestVersion,l=(e.status,!1),c=0;c<r.length;c++)if(1===r[c].status){l=!0;break}return e.checkedNodeId="",e.isOnline=l,e._toDetailLink=e.releaseId?"/release/detail/".concat(n,"?version=").concat(o.version):"",e._toMangeDetailLink="/release/edit/".concat(n),e.previewImage=i&&i[0]||"",e.presentablePolicyType="free","myCollections"===t.type&&(e.updateDate=e.releaseUpdateDate,e.createDate=e.latestVersion.createDate),e.rSubordinateNodesIds=[],a[n]=e,e})).sort(function(e,t){return+new Date(t.updateDate)-+new Date(e.updateDate)});return this.fetchReleaseSubordinateNodes(e.map(function(e){return e.releaseId}).join(",")).then(function(e){0===e.errcode&&e.data.forEach(function(e){var t=e.releaseInfo.releaseId,n=e.nodeId;a[t].rSubordinateNodesIds.push(n)})}),e},refreshReleasesList:function(){this.$refs.releaseslistRef.reload()},goToReleaseDetail:function(e){this.$router.push(e._toDetailLink)},goToMangeDetailLink:function(e){this.$router.push(e._toMangeDetailLink)},handleSelectType:function(e){this.selectedType=e,this.$router.push({query:{resourceType:e}}),"all"===this.selectedType?this.paginationConfig.params.resourceType=void 0:this.paginationConfig.params.resourceType=this.selectedType},fetchReleaseSubordinateNodes:function(e){return this.$services.PresentablesService.get("list",{params:{releaseIds:e,userId:this.session.user.userId,projection:"nodeId,releaseInfo"}}).then(function(e){return e.data})},batchCreatePresentables:function(){var e=this,t=this.selectedReleases.length,a=0;t&&this.selectedReleases.forEach(function(n){e.createPresentable(n).finally(function(){t===++a&&e.refreshReleasesList()})})},createPresentable:function(e){var t=this,a=e.checkedNodeId,n=e.presentablePolicyType,s=(e.policies,e.username),r=e.latestVersion,i=e.releaseId,o=e.releaseName.replace(new RegExp("".concat(s,"/"),"i"),"").replace(/(\s*)/g,""),l=this.policyTplsMap[n],c=l.name,u=l.template,d=this.getResolveReleases(e),p={presentableName:o,nodeId:a,releaseId:i,policies:[{policyName:c,policyText:window.btoa(u)}],version:r.version,resolveReleases:d};return this.$services.PresentablesService.post(p).then(function(e){return e.data}).then(function(n){0===n.errcode?(t.$message.success("节点发行「".concat(n.data.presentableName,"」创建成功！")),e.rSubordinateNodesIds.push(a)):t.$message.error(n.msg)}).catch(function(e){t.$message.error(e)})},upgradePresentable:function(){var e=this,t=presentable,a=t.presentableId,n=t.releaseInfo,s=n.version,r=n.releaseId;this.$services.ReleaseService.get(r).then(function(e){return e.data}).then(function(e){var t=s;0===e.errcode&&(t=e.data.latestVersion.version);return t}).then(function(t){return e.$services.PresentablesService.put("".concat(a,"/switchPresentableVersion"),{version:t})}).then(function(e){return e.data}).then(function(t){0===t.errcode?e.$message({type:"success",message:"升级成功！"}):e.$message({type:"error",message:"升级失败！"})}).catch(this.$error.showErrorMessage)},getResolveReleases:function(e){var t=e.policies,a=e.releaseId,n=e.baseUpcastReleases,s=[{releaseId:a,contracts:t.map(function(e){return{policyId:e.policyId}})}];n.map(function(e){});return s},handleSelectionChange:function(e){this.selectedReleases=e}}},g=(a(933),a(934),a(3)),m=a(935),y=Object(g.a)(h,n,[],!1,null,"5a427fa1",null);"function"==typeof m.default&&Object(m.default)(y),y.options.__file="src/views/tools/releases-list.vue";t.default=y.exports}}]);