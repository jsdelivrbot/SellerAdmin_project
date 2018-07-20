<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain ,TagsView} from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  data(){
    return {
      userInfo:{}
    }
  },
  mixins: [ResizeMixin],
  created(){
    let admin = JSON.parse(sessionStorage.getItem('admin'));
    this.userInfo = admin;
    if(!admin){
      this.$router.push({ name:'Login' });
      return
    }
    this.initData().then(() => {

    }, err => {
      console.log(err)
    })
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    async initData() {
      //跟团游栏目
      let AdminOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        isDelete: '0',
        groupName: ''
      };
      await this.$store.dispatch('initHomeAdminGroupTour', AdminOptions)
      let userOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        sm_ai_Name: '',
        "sm_ai_ID": this.userInfo.sm_ui_ID,
        "page": 1,
        "rows": 5,
      };
      await this.$store.dispatch('initSetCooperationType',userOptions)
      //惠乐游推荐类型
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "操作员编码",
        "operateUserName": "操作员名称",
        "pcName": "",
        "data": {
          "ht_it_ID": "",//推荐类型ID
          "ht_it_Name": "",//推荐类型名称
          "ht_it_ParentID": "",//推荐类型父ID
        }
      }
      let hotelOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
      }
      await this.$store.dispatch('initHotelIntroduceType', hotelOptions)
      //惠乐游图片类型
      let imgOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_it_ID": "",//图片类型编码
        "ht_hi_Name": '',//图片类型名称
      };
      await this.$store.dispatch('initHotelImageType', imgOptions)
      //惠乐游主题类型
      let themeOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_tt_ThemeID": "",//主题ID
        "ht_tt_Name": '',//主题名称
        "ht_tt_IsHot": "",//是否热门
      };
      await this.$store.dispatch('initHotelThemeType', themeOptions)
      //酒店图标库
      let iconOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "操作员编码",
        "operateUserName": "操作员名称",
        "pcName": "",
        "ht_ie_ID": "",//图标库ID
        "ht_ie_Name": '',//图标名称
        "ht_ie_Image": '',//图标
        "ht_id_Remark": "",//备注
      }
      await this.$store.dispatch('initHotelIconGallery', iconOptions)
      //租车城市级联城市
      let carOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
      };
      await this.$store.dispatch('initCarCityPlace', carOptions)
      // //退出
      // Quit() {
      //   this.$router.push({name: 'adminLogin'})
      // },
      // //用户信息
      // getUser() {
      //   this.$router.push({name: 'AdminMerchantProducts'})
      // },
      //查询景点主题分类信息
      let getThemeTypeList = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "ttID": "",
        "ttName": "",
        "isDelete": 0,
        "page": 1,
        "rows": 100
      };
      await this.$store.dispatch('initThemeType', getThemeTypeList)
      //惠乐游设施
      let hotelFacilitiesServicesoptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_hd_ID": "",//设施编码
        "ht_hd_Name": '',//设施名称
        "ht_hd_HardTypeID": "",//设施类型ID
        "ht_hd_IsHot": "",//是否热门
      }
      await this.$store.dispatch('initHotelFacilities', hotelFacilitiesServicesoptions)
      //惠乐游设施类型
      let hotelFacilitiesTypeOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_ht_ID": "",//设施类型Id
        "ht_ht_Name": '',//设施类型名称
      }
      await this.$store.dispatch('initHotelFacilitiesType', hotelFacilitiesTypeOptions)
      //惠乐游房间设施类型
      let roomTypeOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "操作员编码",
        "operateUserName": "操作员名称",
        "pcName": "",
        "ht_rht_ID": "",//房间设施类型ID
        "ht_rht_Name": "",//类型名称
      }
      await this.$store.dispatch('initHotelRoomFacilitiesType', roomTypeOptions)
     //用餐人数类型
      let selectPropertyInfo = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "fd_py_ParentID": "28",//父编码
        "page": "1",
        "rows": "10000",
      }
      await this.$store.dispatch('initNumberOfMeals', selectPropertyInfo)
   //店面类型
      let selectPropertyInfoType = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "fd_py_ParentID": "1",//父编码
        "page": "1",
        "rows": "10000",
      }
      await this.$store.dispatch('initStorefrontType', selectPropertyInfoType)
      //店面列表
      let selectStoreFrontInfo = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "fd_sf_TradeID": this.userInfo.sm_ui_ID,//供应商编码

      };
//      await this.$store.dispatch('initFoodStoreInformtion', selectStoreFrontInfo)
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
