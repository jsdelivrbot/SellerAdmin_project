webpackJsonp([45],{"5D8B":function(t,e,i){var o=i("ZVdT");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);i("rjj0")("6df2a280",o,!0)},FTgw:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("pFYg"),n=i.n(o),a=i("SJI6"),s={computed:Object(a.mapGetters)(["hotelQueryRecommendList","recommendTypeList","hotelIntroduceTypeList","parentHotelQueryRecommendList","showChildHotelQueryRecommendList"]),data:function(){return{introduceTypeList:[],props:{label:"ht_it_Name",value:"ht_it_ID",children:"SubList"},showChildChild:!1,TypeID:"",showChild:!1,ParentID:"",isLoading:!1,hotelID:"",total:0,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ht_ht_hotelID:"",ht_hi_IntroduceType:""}},addRecommendDialog:!1,formLabelWidth:"120px",updateRecommendDialog:!1}},created:function(){if(this.hotelID=sessionStorage.getItem("hotelID"),!this.hotelID)return this.$router.push({name:"HotelDetil"}),void this.$notify({message:"请先添加酒店信息!",position:"top-left",type:"error"});this.initData(),this.initType()},methods:{jump:function(t){console.log(t.ht_it_IntroduceTypePName),"青旅酒店"==t.ht_it_IntroduceTypePName?window.open("http://hly.1000da.com.cn/index.html#/hotelQingLv/10","_blank"):"古镇酒店"==t.ht_it_IntroduceTypePName?window.open("http://hly.1000da.com.cn/index.html#/hotelAncientTown/11","_blank"):"亲子酒店"==t.ht_it_IntroduceTypePName?window.open("http://hly.1000da.com.cn/index.html#/hotelParentChildTour/12","_blank"):"依山酒店"==t.ht_it_IntroduceTypePName?window.open("http://hly.1000da.com.cn/index.html#/hotelMountaineering/13","_blank"):"最美客栈"==t.ht_it_IntroduceTypePName?window.open("http://hly.1000da.com.cn/index.html#/hotelInn/14","_blank"):"情侣酒店"==t.ht_it_IntroduceTypePName&&window.open("http://hly.1000da.com.cn/index.html#/hotelLovers/15","_blank")},initType:function(){this.$store.dispatch("initHotelIntroduceType",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:""})},changeParent:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_it_ID:"",ht_it_Name:"",ht_it_ParentID:this.ParentID};this.$store.dispatch("initParentHotelQueryRecommend",e).then(function(e){e?t.showChild=!0:(t.addOptions.data.ht_hi_IntroduceType=t.ParentID,t.showChild=!1)})},changeShowChild:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_it_ID:"",ht_it_Name:"",ht_it_ParentID:this.TypeID};this.$store.dispatch("initShowChildHotelQueryRecommend",e).then(function(e){e?t.showChildChild=!0:(t.addOptions.data.ht_hi_IntroduceType=t.TypeID,t.showChildChild=!1)})},handleCurrentChange:function(t){this.initData(t)},initData:function(t){var e=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_hi_ID:"",ht_ht_hotelID:this.hotelID,ht_hi_IntroduceType:"",page:"1",rows:"5"};this.isLoading=!0,this.$store.dispatch("initHotelQueryRecommend",i).then(function(t){e.total=t,e.isLoading=!1},function(t){e.$notify({message:t,type:"error"})})},addButton:function(){for(var t in this.addOptions.data)if("object"==n()(this.addOptions.data[t]))for(var e in this.addOptions.data[t])this.addOptions.data[t][e]="";else this.addOptions.data[t]="";this.TypeID="",this.ParentID="",this.showChild=!1,this.showChildChild=!1;var i=this.addOptions.data;for(var o in i)i[o]="";this.$store.commit("setTranstionFalse"),this.addRecommendDialog=!0},addRecommendSubmit:function(){var t=this;this.addOptions.data.ht_ht_hotelID=this.hotelID,this.addOptions.data.ht_hi_IntroduceType=this.introduceTypeList[this.introduceTypeList.length-1],this.$store.dispatch("AddHotelQueryRecommend",this.addOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.addRecommendDialog=!1},Delete:function(t){var e=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{ht_hi_ID:t}};this.$store.dispatch("DeleteHotelQueryRecommend",i).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[i("div",{staticClass:"title clearfix",staticStyle:{padding:"20px"}},[i("h1",[t._v("酒店推荐信息")]),i("br"),i("br"),t._v(" "),i("el-button",{staticStyle:{float:"right","margin-right":"80px"},attrs:{type:"primary",size:"small"},on:{click:t.addButton}},[t._v(" 新增")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.hotelQueryRecommendList}},[i("el-table-column",{attrs:{prop:"ht_hi_ID",label:"推荐类型编码",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"ht_it_IntroduceTypeName",label:"推荐类型",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"ht_it_IntroduceTypePName",label:"父推荐类型",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.Delete(e.row.ht_hi_ID)}}},[t._v("删除\n          ")]),t._v(" "),i("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(i){t.jump(e.row)}}},[t._v("预览效果\n          ")])]}}])})],1),t._v(" "),i("div",{staticClass:"block",staticStyle:{float:"right"}},[i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:"添加酒店推荐类型",visible:t.addRecommendDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addRecommendDialog=e}}},[i("el-form",{attrs:{model:t.addOptions}},[i("el-form-item",{attrs:{label:"推荐类型:","label-width":t.formLabelWidth}},[i("el-cascader",{attrs:{options:t.hotelIntroduceTypeList,props:t.props,"show-all-levels":!1},model:{value:t.introduceTypeList,callback:function(e){t.introduceTypeList=e},expression:"introduceTypeList"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addRecommendDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addRecommendSubmit}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var r=i("VU/8")(s,l,!1,function(t){i("5D8B")},"data-v-16d95195",null);e.default=r.exports},ZVdT:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,'\n.title > h1[data-v-16d95195] {\n  float: left;\n  font: 20px/2 "\\5FAE\\8F6F\\96C5\\9ED1";\n  color: #000;\n}\n.title > button[data-v-16d95195] {\n  float: right;\n}\n',""])}});