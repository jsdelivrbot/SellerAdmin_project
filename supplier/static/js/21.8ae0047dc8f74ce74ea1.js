webpackJsonp([21],{EeRH:function(n,t,e){var a=e("Xgiw");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("6imX")("1c441a67",a,!0)},TyNj:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("GxZn"),s=e.n(a),r=e("SJI6"),i=(e("jvWE"),{name:"",data:function(){return{LandmarkInfo:[],isOff:!1,cityID:[],updateOptions:{},addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{cr_crs_Name:"",cr_crs_HertzId:"",cr_crs_Address:"",cr_crs_CityLandmarkId:"",cr_crs_CityId:"",cr_crs_WorkTime:"",cr_crs_Telephone:""}},carCitys:[],countyList:[],showProvince:!1,showCounty:!1,provinceList:[],props:{value:"value",children:"cities"},addDialog:!1,updateDialog:!1,isLoading:!1,total:0,formLabelWidth:"120px",storeName:"",carCompaniesID:""}},computed:Object(r.mapGetters)(["carStoreList","carCityPlaceList","carGetCityLandmarkInfoList"]),created:function(){if(this.carCompaniesID=sessionStorage.getItem("carCompaniesID"),!this.carCompaniesID)return this.$router.push({name:"CarHome"}),void this.$notify({message:"请先添加租车公司!",position:"top-left",type:"error"});this.initData(this.storeName,1),this.initCityList()},methods:{initCityList:function(){this.$store.dispatch("initCarCityPlace",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:""})},handleCurrentChange:function(n){this.initData(this.storeName,n)},changeCity:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",CityId:n[n.length-1]};this.$store.dispatch("initCarGetCityLandmarkInfo",e).then(function(){},function(n){t.$notify({message:n,type:"error"})})},search:function(){this.initData(this.storeName,1)},initData:function(n,t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",page:t||1,rows:"10",cr_crs_Id:"",cr_crs_Name:n||"",cr_crs_HertzId:this.carCompaniesID,cr_crs_Address:"",cr_crs_CityLandmarkId:"",cr_crs_CityId:"",cr_crs_Lng:"",cr_crs_Lat:"",cr_crs_WorkTime:"",cr_crs_Telephone:""};this.isLoading=!0,this.$store.dispatch("initCarStore",a).then(function(n){e.total=n,e.isLoading=!1},function(n){e.$notify({message:n,type:"error"})})},Add:function(){for(var n in this.addOptions.data)if("object"==s()(this.addOptions.data[n]))for(var t in this.addOptions.data[n])this.addOptions.data[n][t]="";else this.addOptions.data[n]="";this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var n=this;this.addOptions.data.cr_crs_HertzId=this.carCompaniesID,this.addOptions.data.cr_crs_CityLandmarkId=this.LandmarkInfo[this.LandmarkInfo.length-1],this.addOptions.data.cr_crs_CityId=this.cityID[this.cityID.length-1],this.$store.dispatch("AddCarStore",this.addOptions).then(function(t){n.$notify({message:t,type:"success"}),n.initData()},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},Update:function(n){this.updateOptions=n,this.$store.commit("setTranstionFalse"),this.updateDialog=!0},updateSubmit:function(){var n=this;this.updateOptions.cr_crs_CityLandmarkId=this.LandmarkInfo[this.LandmarkInfo.length-1],this.updateOptions.cr_crs_CityId=this.cityID[this.cityID.length-1];var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:this.updateOptions};this.$store.dispatch("UpdateCarStore",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData()},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{cr_crs_Id:n}};this.$store.dispatch("DeleteCarStore",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData()},function(n){t.$notify({message:n,type:"error"})})}}}),o={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("租车门店管理")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("门店名称筛选:")])]),n._v(" "),e("el-form-item",[e("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"门店名称",size:"small"},model:{value:n.storeName,callback:function(t){n.storeName=t},expression:"storeName"}})],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.Add}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.carStoreList}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"门店编号:"}},[e("span",[n._v(n._s(t.row.cr_crs_Id))])]),n._v(" "),e("el-form-item",{attrs:{label:"门店名称:"}},[e("span",[n._v(n._s(t.row.cr_crs_Name))])]),n._v(" "),e("el-form-item",{attrs:{label:"租车公司名称:"}},[e("span",[n._v(n._s(t.row.cr_crs_HertzName))])]),n._v(" "),e("el-form-item",{attrs:{label:"详细地址:"}},[e("span",[n._v(n._s(t.row.cr_crs_Address))])]),n._v(" "),e("el-form-item",{attrs:{label:"地标名称:"}},[e("span",[n._v(n._s(t.row.cr_crs_CityLandmarkName))])]),n._v(" "),e("el-form-item",{attrs:{label:"所在城市:"}},[e("span",[n._v(n._s(t.row.cr_crs_CityName))])]),n._v(" "),e("el-form-item",{attrs:{label:"营业时间:"}},[e("span",[n._v(n._s(t.row.cr_crs_WorkTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"电话:"}},[e("span",[n._v(n._s(t.row.cr_crs_Telephone))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{width:"140",prop:"cr_crs_Id",label:"门店编号"}}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_crs_Name",label:"门店名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_crs_HertzName",label:"租车公司名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.Update(t.row)}}},[n._v("修改\n        ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.Delete(t.row.cr_crs_Id)}}},[n._v("删除\n        ")])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加租车门店",visible:n.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"门店名称:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.cr_crs_Name,callback:function(t){n.$set(n.addOptions.data,"cr_crs_Name",t)},expression:"addOptions.data.cr_crs_Name"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"首字母选择城市:","label-width":n.formLabelWidth}},[e("el-cascader",{attrs:{options:n.carCityPlaceList,placeholder:"请选择城市","show-all-levels":!1},on:{change:n.changeCity},model:{value:n.cityID,callback:function(t){n.cityID=t},expression:"cityID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"选择城市地标:","label-width":n.formLabelWidth}},[e("el-cascader",{attrs:{options:n.carGetCityLandmarkInfoList,placeholder:"选择城市地标","show-all-levels":!1},model:{value:n.LandmarkInfo,callback:function(t){n.LandmarkInfo=t},expression:"LandmarkInfo"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"详细地址:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.cr_crs_Address,callback:function(t){n.$set(n.addOptions.data,"cr_crs_Address",t)},expression:"addOptions.data.cr_crs_Address"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"营业时间:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.cr_crs_WorkTime,callback:function(t){n.$set(n.addOptions.data,"cr_crs_WorkTime",t)},expression:"addOptions.data.cr_crs_WorkTime"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"电话:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.cr_crs_Telephone,callback:function(t){n.$set(n.addOptions.data,"cr_crs_Telephone",t)},expression:"addOptions.data.cr_crs_Telephone"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改租车门店",visible:n.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateOptions}},[e("el-form-item",{attrs:{label:"门店名称:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateOptions.cr_crs_Name,callback:function(t){n.$set(n.updateOptions,"cr_crs_Name",t)},expression:"updateOptions.cr_crs_Name"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"首字母选择城市:","label-width":n.formLabelWidth}},[e("el-cascader",{attrs:{options:n.carCityPlaceList,placeholder:"请选择城市","show-all-levels":!1},on:{change:n.changeCity},model:{value:n.cityID,callback:function(t){n.cityID=t},expression:"cityID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"选择城市地标:","label-width":n.formLabelWidth}},[e("el-cascader",{attrs:{options:n.carGetCityLandmarkInfoList,placeholder:"选择城市地标","show-all-levels":!1},model:{value:n.LandmarkInfo,callback:function(t){n.LandmarkInfo=t},expression:"LandmarkInfo"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"详细地址:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateOptions.cr_crs_Address,callback:function(t){n.$set(n.updateOptions,"cr_crs_Address",t)},expression:"updateOptions.cr_crs_Address"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"营业时间:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateOptions.cr_crs_WorkTime,callback:function(t){n.$set(n.updateOptions,"cr_crs_WorkTime",t)},expression:"updateOptions.cr_crs_WorkTime"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"电话:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateOptions.cr_crs_Telephone,callback:function(t){n.$set(n.updateOptions,"cr_crs_Telephone",t)},expression:"updateOptions.cr_crs_Telephone"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=e("XAIM")(i,o,!1,function(n){e("EeRH")},"data-v-554f0c71",null);t.default=l.exports},Xgiw:function(n,t,e){(n.exports=e("bKW+")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});