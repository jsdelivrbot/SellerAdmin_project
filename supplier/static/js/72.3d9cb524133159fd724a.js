webpackJsonp([72],{WYEe:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("NYxO"),r={name:"",data:function(){return{total:0,isLoading:!1,id:""}},computed:Object(a.b)(["adminPersonalBenefitsList"]),created:function(){var n=JSON.parse(sessionStorage.getItem("admin"));n?(this.id=n.sm_ai_AgentID,this.initData(n.sm_ai_AgentID)):this.$router.push({name:"Login"})},methods:{getSummaries:function(n){var e=n.columns,t=n.data,a=[];return e.forEach(function(n,e){if(0!==e){var r=t.map(function(e){return Number(e[n.property])});r.every(function(n){return isNaN(n)})?a[e]="N/A":(a[e]=r.reduce(function(n,e){var t=Number(e);return isNaN(t)?n:n+e},0),a[e]+=" 元")}else a[e]="合计"}),a},initData:function(n,e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",agentID:n,balanceState:"",page:e||1,rows:5};this.isLoading=!0,this.$store.dispatch("initAdminPersonalBenefits",a).then(function(n){t.total=n,t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})},handleCurrentChange:function(n){this.initData(this.id,n)}}},i={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("供应商个人收益")]),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","padding-top":"50px"},attrs:{data:n.adminPersonalBenefitsList,"highlight-current-row":"","show-summary":"","summary-method":n.getSummaries}},[t("el-table-column",{attrs:{label:"供应商编号",align:"center",prop:"agentInfoID"}}),n._v(" "),t("el-table-column",{attrs:{label:"订单号",align:"center",prop:"ts_to_OrderID"}}),n._v(" "),t("el-table-column",{attrs:{label:"订单利润",align:"center",prop:"orderIncome"}}),n._v(" "),t("el-table-column",{attrs:{label:"订单价格",align:"center",prop:"ts_to_SumPrice"}}),n._v(" "),t("el-table-column",{attrs:{label:"供应商获利",align:"center",prop:"orderfeePrice"}}),n._v(" "),t("el-table-column",{attrs:{label:"供应商提成比例",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",[n._v(n._s(e.row.agentFee))])]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"下单时间",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",[n._v(n._s(n._f("getUseTime")(e.row.ts_to_PayTime)))])]}}])})],1),n._v(" "),t("div",{staticClass:"block",staticStyle:{float:"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=t("VU/8")(r,i,!1,function(n){t("lT6o")},"data-v-5fa8361c",null);e.default=s.exports},lT6o:function(n,e,t){var a=t("mgIi");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("7104bf52",a,!0)},mgIi:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});