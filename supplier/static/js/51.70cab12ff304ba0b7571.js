webpackJsonp([51],{ARoL:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("34v0"),s=n.n(a),r=n("SJI6"),i={name:"dashboard",data:function(){return{userInfo:{}}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin"))},computed:s()({},Object(r.mapGetters)(["name","roles"]))},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"dashboard-container"},[e("div",{staticClass:"dashboard-text"},[this._v("欢迎您:"+this._s(this.userInfo.sm_ui_Name))])])},staticRenderFns:[]};var d=n("XAIM")(i,o,!1,function(t){n("QHIn")},"data-v-01f66025",null);e.default=d.exports},QHIn:function(t,e,n){var a=n("yTF+");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("6imX")("436e8f5c",a,!0)},"yTF+":function(t,e,n){(t.exports=n("bKW+")(!1)).push([t.i,"\n.dashboard-container[data-v-01f66025] {\n  margin: 30px;\n}\n.dashboard-text[data-v-01f66025] {\n  font-size: 30px;\n  line-height: 46px;\n}\n",""])}});