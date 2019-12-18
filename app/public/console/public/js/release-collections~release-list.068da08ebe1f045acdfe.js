(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{432:function(e,t,a){"use strict";a.r(t),a.d(t,"RESOURCE_TYPES",function(){return i}),a.d(t,"RESOURCE_STATUS_MAP",function(){return n}),a.d(t,"RESOURCE_STATUS",function(){return o});var s=a(2),i={json:"json",widget:"widget",image:"image",audio:"audio",markdown:"markdown",page_build:"page_build",reveal_slide:"reveal_slide",license:"license",video:"video",catalog:"catalog"},n={unknown:0,unpublished:1,published:2,freeze:3},o=[{desc:s.a.t("config.resource.states[0]"),type:"danger",status:n.unknown},{desc:s.a.t("config.resource.states[1]"),type:"warning",status:n.unpublished},{desc:s.a.t("config.resource.states[2]"),type:"success",status:n.published},{desc:s.a.t("config.resource.states[3]"),type:"danger",status:n.freeze}]},433:function(e,t,a){},436:function(e,t,a){},459:function(e,t,a){"use strict";var s=a(433);a.n(s).a},462:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"fl-pagination"},[a("el-table",e._b({ref:"table",staticStyle:{width:"100%"},attrs:{"empty-text":e.emptyText},on:{"row-click":e.rowClickHandler,"selection-change":e.selectionChangeHandler}},"el-table",e.tableProps,!1),[e._t("list")],2),e._v(" "),0===e.tableProps.data.length?e._t("empty"):e._e(),e._v(" "),e.showFooter?a("div",{staticClass:"fl-pg-ft clearfix"},[e._t("footer"),e._v(" "),a("el-pagination",{staticClass:"fl-pg-info",attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],2):e._e()],2)};s._withStripped=!0;var i=a(6),n={name:"fl-pagination",props:{emptyText:{type:String,default:"暂无数据"},pagination:{type:Object,default:function(){return{pageSize:10}}},config:Object,rowClickHandler:{type:Function,default:function(){}},selectionChangeHandler:{type:Function,default:function(e){}},formatHandler:Function,showFooter:{type:Boolean,default:!0}},data:function(){return{total:8,tableProps:{data:[]},currentPage:1,pageSize:parseInt(window.sessionStorage.getItem("".concat(this.$route.fullPath,"_page_size")))||10,loading:!1}},watch:{pagination:{deep:!0,handler:function(){this.reload()}},pageSize:function(){this.reload()}},methods:{loadData:function(){if(!this.pagination.target)throw new Error("need pagination target param");var e={page:this.currentPage,pageSize:this.pageSize};return this.source=i.axios.CancelToken.source(),this.pagination.params&&Object.assign(e,this.pagination.params),this.$axios.get(this.pagination.target,{params:e,cancelToken:this.source.token}).then(function(e){if(e.data){if(0===e.data.ret&&0===e.data.errcode)return e.data.data;throw new Error(e.data.msg)}})},update:function(e){if(e&&e.dataList){this.total=e.totalItem||e.dataList.length;var t="function"==typeof this.formatHandler?this.formatHandler(e.dataList):e.dataList;this.tableProps.data=t}},reload:function(){this.currentPage=1,this.loading&&this.source&&(this.loading=!1,this.source.cancel("cancel")),this.load()},load:function(){var e=this;this.loading||(this.loading=!0,this.loadData().then(this.update.bind(this)).then(function(){e.loading=!1,window.sessionStorage.setItem("".concat(e.$route.fullPath,"_page_size"),e.pageSize)}).catch(function(t){t.message&&"cancel"===t.message||e.$error.showErrorMessage(t),e.loading=!1}))},handleSizeChange:function(e){this.pageSize=e},handleCurrentChange:function(e){this.currentPage=e,this.load()}},mounted:function(){Object.assign(this.tableProps,this.config),this.load()}},o=(a(459),a(3)),l=Object(o.a)(n,s,[],!1,null,null,null);l.options.__file="src/components/Pagination/index.vue";t.a=l.exports},465:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fl-search-input-wrap"},[e.showInput?a("el-input",{ref:"input",staticClass:"search-input",style:{width:e.width},attrs:{size:"medium",placeholder:e.placeholder},on:{blur:e.hideInputHandler},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchHandler(t)}},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},on:{click:e.searchHandler},slot:"suffix"})]):a("el-button",{attrs:{type:"text"},on:{click:e.showInputHandler}},[a("i",{staticClass:"el-icon-search"})])],1)};s._withStripped=!0;var i={name:"freelog-search-input",data:function(){return{input:"",showInput:!1}},props:{showInputImmediately:{type:Boolean,default:!1},width:{type:String,default:function(){return"300px"}},placeholder:{type:String,default:""}},mounted:function(){this.showInput=this.showInputImmediately},methods:{showInputHandler:function(){var e=this;this.showInputImmediately||(this.showInput=!0),this.$nextTick(function(){e.$refs.input.focus()})},hideInputHandler:function(){this.showInputImmediately||(this.showInput=!1)},searchHandler:function(){this.showInputImmediately||(this.showInput=!0),this.$emit("search",this.input)}}},n=(a(466),a(3)),o=Object(n.a)(i,s,[],!1,null,"78583505",null);o.options.__file="src/components/SearchInput/index.vue";t.a=o.exports},466:function(e,t,a){"use strict";var s=a(436);a.n(s).a},487:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.policies.length>0?a("el-tabs",e._l(e.policies,function(t){return a("el-tab-pane",{attrs:{label:t.policyName}},[a("div",{staticStyle:{height:"200px","overflow-y":"auto"}},[a("pre",{staticStyle:{"white-space":"pre-wrap"}},[e._v(e._s(t.policyText))])])])}),1):e._e(),e._v(" "),0===e.policies.length?a("div",{staticStyle:{"min-height":"200px",display:"flex","align-items":"center","justify-content":"center"}},[a("span",[e._v("暂无策略......")])]):e._e()],1)};s._withStripped=!0;var i={name:"PolicyTabs",props:{policies:{type:Array,validator:function(e){return e.every(function(e){return e.hasOwnProperty("policyId")&&e.hasOwnProperty("policyName")})},default:[]}},methods:{},mounted:function(){}},n=a(3),o=Object(n.a)(i,s,[],!1,null,"183c1c83",null);o.options.__file="src/components/PolicyTabs/index.vue";t.a=o.exports},689:function(e,t,a){"use strict";a.d(t,"a",function(){return s});var s=["全部","已上线","未上线"]},690:function(e,t,a){},691:function(e,t,a){},692:function(e,t){e.exports=function(e){e.options.__i18n=e.options.__i18n||[],e.options.__i18n.push('{"zh-CN":{"createBtnText":"创建发行","dialogTitle":"我的资源","goToMarket":"前往发行市场","list":{"name":"发行名称","type":"发行类型","newVersion":"最新版本","allTypes":"全部类型","policy":"策略","policyCount":["等","个策略..."],"noPolicies":"no policies","view":"查看","updateDate":"更新时间","collectDate":"收藏时间","createDate":"创建时间","operate":"操作","editBtnText":"编辑","cancelCollectionBtnText":"取消收藏","tips":["策略已下架"],"messages":["没有符合条件的发行","您还没有创建任何发行。","您还没有收藏任何发行。您在发行市场收藏的发行之后将会出现在这里。","取消成功！"],"status":["全部","已上线","未上线"],"statusText":"状态"}},"en":{"createBtnText":"Create Release","dialogTitle":"My Resources","goToMarket":"Go to market","list":{"name":"Release name","type":"Release type","newVersion":"New version","allTypes":"All types","policy":"Policy","policyCount":["There are "," policies..."],"noPolicies":"No policies","view":"view","updateDate":"Update date","collectDate":"Collect Date","createDate":"Create date","operate":"Operate","editBtnText":"Edit","cancelCollectionBtnText":"cancel collection","tips":["All policies has been off the shelves"],"messages":["There are no releases available","You have not created any releases.","You haven\'t collected any releases yet. You will appear here after the release of your collection in the release market.","Cancel Successful！"],"status":["All","online","offline"],"statusText":"State"}}}'),delete e.options._Ctor}},754:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"release-list"},[a("f-pagination",{ref:"listRef",staticClass:"release-list-table",attrs:{config:e.tableConfig,formatHandler:e.formatHandler,pagination:e.paginationConfig,"empty-text":e.pagenationEmptyText}},[a("template",{slot:"list"},[a("el-table-column",{attrs:{label:e.$t("list.name")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"r-l-item-name-box",on:{click:function(a){return e.goToReleaseDetail(t.row)}}},[a("img",{staticClass:"r-l-item__img",class:{"resource-default-preview":!e.previewImage},attrs:{src:t.row.previewImage}}),e._v(" "),a("div",{staticClass:"r-l-item-name",attrs:{title:t.row.releaseName}},[e._v(e._s(t.row.releaseName))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("list.type"),width:"160"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-dropdown",{staticClass:"r-l-types",on:{command:e.handleSelectType}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n              "+e._s(e.$t("list.type"))+" "+e._s(e._f("pageBuildFilter")("all"===e.selectedType?"":""+e.selectedType))),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.resourceTypes,function(t){return a("el-dropdown-item",{key:t.value,attrs:{command:t.value}},[e._v(e._s(e._f("pageBuildFilter")(t.label)))])}),1)],1)]}},{key:"default",fn:function(t){return[a("div",{staticClass:"r-l-item-type"},[e._v(" "+e._s(e._f("pageBuildFilter")(t.row.resourceType)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("list.newVersion"),width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(" "+e._s(t.row.latestVersion.version))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("list.policy"),width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.policies.length?a("div",[a("el-popover",{attrs:{placement:"bottom-start",width:"370",trigger:"hover"}},[a("div",{attrs:{slot:"reference"},slot:"reference"},[a("div",{staticClass:"r-l-item-policy-row1"},[e._v("\n                  "+e._s(t.row.policies[0].policyName)+"\n                  "),"myReleases"===e.type?a("router-link",{staticClass:"r-l-item-policy-add",attrs:{to:t.row._toMangeDetailLink}},[a("i",{staticClass:"el-icon-plus"})]):e._e()],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.row.policies.length>1,expression:"scope.row.policies.length > 1"}],staticClass:"r-l-item-policy-row2"},[e._v(e._s(e.$t("list.policyCount[0]"))+e._s(t.row.policies.length)+e._s(e.$t("list.policyCount[1]")))])]),e._v(" "),a("f-policy-tabs",{attrs:{policies:t.row.policies}})],1)],1):a("div",{staticClass:"r-l-item-no-policy"},[e._v(e._s(e.$t("list.noPolicies")))])]}}])}),e._v(" "),"myReleases"===e.type?a("el-table-column",{attrs:{prop:"updateDate",label:e.$t("list.updateDate"),width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"r-l-item-date-row1"},[e._v(e._s(e._f("fmtDate")(t.row.updateDate)))]),e._v(" "),a("div",{staticClass:"r-l-item-date-row2"},[e._v(e._s(e.$t("list.createDate"))+" "+e._s(e._f("fmtDate")(t.row.createDate)))])]}}],null,!1,1982195430)}):a("el-table-column",{attrs:{prop:"collectionDate",label:e.$t("list.collectDate"),width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"r-l-item-date-row1"},[e._v(e._s(e._f("fmtDate")(t.row.collectionDate)))]),e._v(" "),a("div",{staticClass:"r-l-item-date-row2"},[e._v(e._s(e.$t("list.updateDate"))+" "+e._s(e._f("fmtDate")(t.row.updateDate)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"130"},scopedSlots:e._u([{key:"header",fn:function(t){return["myReleases"===e.type?a("el-dropdown",{staticClass:"r-l-status",on:{command:e.handleSelectReleaseStatus}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n              "+e._s(e.$t("list.statusText"))+" "+e._s(e.releaseStatusArray[e.selectedReleaseStatus].label)),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.releaseStatusArray,function(t){return a("el-dropdown-item",{key:t.value,attrs:{command:t.value}},[e._v(e._s(t.label)+"\n              ")])}),1)],1):a("span",{},[e._v("\n            "+e._s(e.releaseStatusArray[0].label)+"\n          ")])]}},{key:"default",fn:function(t){return[t.row.isOnline?a("div",{staticClass:"r-l-item-online"},[e._v(e._s(e.$t("list.status[1]")))]):a("div",{staticClass:"r-l-item-offline"},[e._v("\n            "+e._s(e.$t("list.status[2]"))+"\n            "),a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[t.row.policies.length>0?[e._v(" "+e._s(e.$t("list.tips[0]")))]:[e._v("\n                  "+e._s(e.$t("list.noPolicies"))+"\n                  "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.goToMangeDetailLink(t.row)}}},[e._v(e._s(e.$t("list.view")))])]],2),e._v(" "),a("i",{staticClass:"el-icon-warning"})])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("list.operate"),width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return["myReleases"===e.type?a("router-link",{attrs:{to:t.row._toMangeDetailLink}},[a("el-button",{staticClass:"r-l-item-edit-btn",attrs:{size:"mini"}},[e._v(e._s(e.$t("list.editBtnText")))])],1):e._e(),e._v(" "),"myCollections"===e.type?a("el-button",{staticClass:"r-l-item-cancel-favor-btn",attrs:{size:"mini"},on:{click:function(a){return e.cancelCollection(t.row)}}},[e._v(e._s(e.$t("list.cancelCollectionBtnText")))]):e._e()]}}])})],1)],2)],1)};s._withStripped=!0;var i=a(87),n=a.n(i),o=a(462),l=a(487),r=a(432),c=a(689),u={name:"release-items-list",components:{FPagination:o.a,FPolicyTabs:l.a},props:{type:{type:String,default:"myReleases"},query:String},data:function(){var e=this.$route.query.resourceType;return{search:"",loader:null,tableConfig:{rowClassName:"release-row","cell-class-name":"rel-row-cell","show-header":!0},paginationConfig:{reloadCount:0,target:"/v1/releases",params:{isSelf:1,resourceType:null!=e?e:void 0,keywords:void 0,status:void 0}},selectedType:null!=e?e:"all",pagenationEmptyText:"",selectedReleaseStatus:0}},computed:{resourceTypes:function(){for(var e=[{label:this.$i18n.t("list.allTypes"),value:"all"}],t=0,a=Object.entries(r.RESOURCE_TYPES);t<a.length;t++){var s=n()(a[t],2),i=s[0],o=s[1];e.push({label:i,value:o})}return e},releaseStatusArray:function(){var e="string"==typeof this.$i18n.t("list.status")?c.a:this.$i18n.t("list.status"),t=[];for(var a in e)t.push({label:e[a],value:+a});return t}},watch:{selectedReleaseStatus:function(){},query:function(){var e=this.$i18n,t=[e.t("list.messages[0]"),e.t("list.messages[1]"),e.t("list.messages[2]")],a=t[0],s=t[1],i=t[2];""==this.query?(this.paginationConfig.params.keywords=void 0,this.pagenationEmptyText="myReleases"===this.type?s:i):(this.paginationConfig.params.keywords=this.query,this.pagenationEmptyText=a)}},mounted:function(){this.initView()},methods:{initView:function(){var e=this.$i18n,t=[e.t("list.messages[1]"),e.t("list.messages[2]")],a=t[0],s=t[1];switch(this.type){case"myReleases":this.paginationConfig.target="/v1/releases",this.pagenationEmptyText=a;break;case"myCollections":this.paginationConfig.target="/v1/collections/releases",this.pagenationEmptyText=s}},formatHandler:function(e){var t=this;return e&&e.length?((e=e.map(function(e){for(var a=e.releaseId,s=e.policies,i=void 0===s?[]:s,n=e.previewImages,o=e.latestVersion,l=(e.status,!1),r=0;r<i.length;r++)if(1===i[r].status){l=!0;break}return e.policies=i,e.isOnline=l,e._toDetailLink=e.releaseId?"/release/detail/".concat(a,"?version=").concat(o.version):"",e._toMangeDetailLink="/release/edit/".concat(a),e.previewImage=n&&n[0]||"","myCollections"===t.type&&(e.updateDate=e.releaseUpdateDate,e.createDate=e.latestVersion.createDate),e})).sort(function(e,t){return+new Date(t.updateDate)-+new Date(e.updateDate)}),e):[]},cancelCollection:function(e){var t=this,a=this.$i18n;this.$services.collections.delete(e.releaseId).then(function(e){return e.data}).then(function(e){0===e.errcode&&(t.$message({type:"success",message:a.t("list.messages[3]")}),t.paginationConfig.reloadCount=t.paginationConfig.reloadCount+1)})},goToReleaseDetail:function(e){this.$router.push(e._toDetailLink)},goToMangeDetailLink:function(e){this.$router.push(e._toMangeDetailLink)},handleSelectType:function(e){this.selectedType=e,this.$router.push({query:{resourceType:e}}),"all"===this.selectedType?this.paginationConfig.params.resourceType=void 0:this.paginationConfig.params.resourceType=this.selectedType},handleSelectReleaseStatus:function(e){switch(console.log(e),this.selectedReleaseStatus=e,+this.selectedReleaseStatus){case 0:this.paginationConfig.params.status=void 0;break;case 1:this.paginationConfig.params.status=1;break;case 2:this.paginationConfig.params.status=0}}}},p=(a(923),a(924),a(3)),d=a(925),f=Object(p.a)(u,s,[],!1,null,"72247d86",null);"function"==typeof d.default&&Object(d.default)(f),f.options.__file="src/views/release/list/list.vue";t.a=f.exports},923:function(e,t,a){"use strict";var s=a(690);a.n(s).a},924:function(e,t,a){"use strict";var s=a(691);a.n(s).a},925:function(e,t,a){"use strict";var s=a(692),i=a.n(s);t.default=i.a}}]);