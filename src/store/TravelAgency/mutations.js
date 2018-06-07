/**
 * Created by leibo on 18/1/2.
 */
export default {
  showAdmin(state) {
    state.isAdmin = true;
  },
  hideAdmin(state) {
    state.isAdmin = false;
  },
  setIsAgencies(state){
    state.isAgencies = true;
  },
  setIsFood(state){
    state.isFood = true;
  },
  setIsHotel(state){
    state.isHotel = true;
  },
  setIsTickets(state){
    state.isTickets = true;
  },
  setIsCar(state){
    state.isCar = true;
  },
  setIsAdvertising(state){
    state.isAdvertising = true;
  },
  setIsMovie(state){
    state.isMovie = true;
  },
  setIsAll(state){
    state.isAgencies = true;
    state.isFood = true;
    state.isHotel = true;
    state.isMovie = true;
    state.isCar = true;
    state.isTickets = true;
    state.isAdvertising = true;
  },
  //初始化动画
  setTranstionFalse(state) {
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  oPTranstionFalse(state) {
    state.transtionActive = {
      isActive: !state.transtionActive.isActive,
      isRotateInDownRight: !state.transtionActive.isRotateInDownRight
    }
  },



  //----------------管理员-----------------
  initChangeScopeOfOperation(state,data){
    state.changeScopeOfOperationList = data;
  },

  initAdminActivitySite(state, data) {
    state.adminActivitySiteList = data;
  },
  initAdminTradeGoodList(state, data) {
    state.adminTradeGoodList = data;
  },
  initUpdateAdminActivitySiteObj(state, id) {
    state.updateAdminActivitySiteObj = state.adminActivitySiteList.filter(item => {
      if (item.ts_as_ID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initAdminActiveTraffic(state,data){
    state.adminActiveTrafficList = data;
  },
  initUpdateAdminActiveTrafficObj(state,id){
    state.updateAdminActiveTrafficObj = state.adminActiveTrafficList.filter(item=>{
      if(item.ts_at_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initAdminEventShopping(state,data){
    state.adminEventShoppingList = data;
  },
  initUpdateAdminEventShoppingObj(state, id) {
    state.updateAdminEventShoppingObj = state.adminEventShoppingList.filter(item => {
      if (item.ts_as_ID == id) {
        return true;
      }
      return false;
    })[0]
  },

  initAdminProductLine(state, data) {
    state.adminProductLine = data;
  },
  initAdminScheduleTime(state, data) {
    state.adminScheduleTimeList = data;
  },
  initAdminLinePrepare(state, data) {
    state.adminLinePrepare = data;
  },
  initAdminTimeActivities(state, data) {
    state.adminTimeActivitiesList = data;
  },

  initAdminActiveHotelList(state, data) {
    state.adminActiveHotelList = data;
  },
  initAdminEventDining(state, data) {
    state.adminEventDiningList = data;
    let arr = state.adminEventDiningList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].ts_af_Type == 0) {
        arr[i].ts_af_Type = '早餐'
      }
      if (arr[i].ts_af_Type == 1) {
        arr[i].ts_af_Type = '午餐'
      }
      if (arr[i].ts_af_Type == 2) {
        arr[i].ts_af_Type = '晚餐'
      }
    }
  },
  initQueryUserOrder(state, data) {
    state.queryUserOrderList = data;
  },
  initSearchUserOrder(state, data) {
    state.searchUserOrderList = data;
  },
  initUpdateAdminTimeActivitiesObj(state, id) {
    state.updateAdminTimeActivitiesObj = state.adminTimeActivitiesList.filter(item => {
      if (item.ts_ta_ID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initUpdateAdminQueryProductInformationObj(state, id) {
    state.updateAdminQueryProductInformationObj = state.adminProductLine.filter(item => {
      if (item.ts_pt_ID == id) {
        return true
      }
      return false;
    })[0]
  },
  initUpdateAdminScheduleTimeObj(state, id) {
    state.updateAdminScheduleTimeObj = state.adminScheduleTimeList.filter(item => {
      if (item.ts_tt_ID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initAdminGroupTour(state, data) {
    state.groupTourList = data;
  },
  initHomeAdminGroupTour(state, data) {
    state.homeAdminGroupTourList = data;
  },
  initUpdateAdminGroupTourObj(state, id) {
    state.updateAdminGroupTourObj = state.groupTourList.filter(item => {
      if (item.ii_ID == id) {
        return true;
      }
      return false
    })[0]
  },
  initAdminBusinessInformation(state, data) {
    state.adminBusinessInformationList = data;
  },
  initUpdateAdminBusinessInformationObj(state, id) {
    state.updateAdminBusinessInformationObj = state.adminBusinessInformationList.filter(item => {
      if (item.ts_tb_UserID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initUpdateAdminMerchantProductsObj(state, id) {
    state.updateAdminMerchantProductsObj = state.adminTradeGoodList.filter(item => {
      if (item.ta_tg_ID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initUpdateAdminLinePrepareObj(state, id) {
    state.updateAdminLinePrepareObj = state.adminLinePrepare.filter(item => {
      if (item.ts_pt_ID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initAdminProductMenu(state, data) {
    state.adminProductMenuList = data;
  },
  initUpdateMenu(state, id) {
    state.updateMenuObj = state.adminProductMenuList.filter(item => {
      if (Number(item.ts_mu_ID) == id) {
        return true;
      }
      return false;
    })[0];
  },
  //产品特色
  initAdminProductFeatures(state, data) {
    state.adminProductFeaturesList = data;
  },
  //初始化修改产品特色数据
  initUpdateAdminProductFeatures(state, id) {
    state.updateAdminProductFeaturesObj = state.adminProductFeaturesList.filter(item => {
      if (Number(item.ts_gs_ID) == id) {
        return true;
      }
      return false;
    })[0]
  },
  //初始化修改活动用餐数据
  initUpdateAdminActiveFoodObj(state, id) {
    state.updateAdminActiveFoodObj = state.adminEventDiningList.filter(item => {
      if (Number(item.ts_af_ID) == id) {
        return true;
      }
      return false;
    })[0]
  },
  //初始化修改活动酒店obj
  initUpdateAdminActiveHotelObj(state, id) {
    state.updateAdminActiveHotelObj = state.adminActiveHotelList.filter(item => {
      if (Number(item.ts_ah_ID) == id) {
        return true;
      }
      return false;
    })[0];
  },
  //初始化温馨提示数据
  initAdminActiveReminder(state, data) {
    state.adminActiveReminderList = data;
  },
  //修改温馨提示数据
  updateAdminActiveReminderObj(state, id) {
    state.updateAdminActiveReminderObj = state.adminActiveReminderList.filter(item => {
      if (Number(item.ts_an_ID) == id) {
        return true;
      }
      return false;
    })[0]
  },
  //商户营业执照列表
  initAdminBusinessLicense(state,data){
    state.adminBusinessLicenseList = data;
  },
  //修改商户营业执照数据
  updateAdminBusinessLicense(state,id){
    state.updateAdminBusinessLicenseObj = state.adminBusinessLicenseList.filter(item=>{
      if( Number(item.ts_bl_ID) == id ){
        return true;
      }
      return false;
    })[0]
  },

  //参数
  adminMerchantProductsId(state, id) {
    state.adminMerchantProductsId = id;
  },
  adminProductLineManagementId(state, id) {
    state.adminProductLineManagementId = id;
  },
  adminProductCharacteristicManagementId(state, id) {
    state.adminProductCharacteristicManagementId = id;
  },
  adminLineScheduleManagementId(state, id) {
    state.adminLineScheduleManagementId = id;
  },
  adminScheduleTimeManagementId(state, id) {
    state.adminScheduleTimeManagementId = id;
  },
  adminTimeActivityManagementId(state, id) {
    state.adminTimeActivityManagementId = id;
  },
  adminActivityMealManagementId(state, id) {
    state.adminActivityMealManagementId = id;
  },
  initAdminCostsOf(state,data){
    state.adminCostsOfList = data;
  },
  initUpdateAdminCostsOfObj(state,id){
    state.updateAdminCostsOfObj = state.adminCostsOfList.filter(item=>{
      if(item.ts_fi_Code==id){
        return true;
      }
      return false;
    })[0]
  },
  initAdminSystemMenu(state,data){
    state.adminSystemMenuList = data;
  },
  filterAdminSystemMenu(state,name){
    state.adminSystemMenuList = state.adminSystemMenuList.filter(item=>{
      if(item.sm_si_Name==name){
        return true;
      }
      return false;
    })
  },
  initUpdateAdminSystemMenuObj(state,id){
    state.updateAdminSystemMenuObj = state.adminSystemMenuList.filter(item=>{
      if(item.sm_si_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initAdminCommentsType(state,data){
    state.adminCommentsTypeList = data;
  },
  initDepartureCity(state,data){
    state.departureCityList = data;
  },
  initAdminLinePrice(state,data){
    state.adminLinePriceList = data;
  },
  initProvice(state,data){
    state.proviceList = data;
  },
  initCityList(state,data){
    state.cityList = data;
  },
  initAdminRouteDepartureCity(state,data){
    state.adminRouteDepartureCity = data;
  },
  initUpdateAdminRouteDepartureCityObj(state,id){
    state.updateAdminRouteDepartureCityObj = state.adminRouteDepartureCity.filter(item=>{
      if(item.ts_cc_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initUpdateAdminLinePriceObj(state,id){
    state.updateAdminLinePriceObj = state.adminLinePriceList.filter(item=>{
      if(item.ts_pp_ID == id){
        return true;
      }
      return false;
    })[0]
  },
  initAdminSupplier(state,data){
    state.adminSupplierList = data;
    state.adminSupplierListObj = data[0]
  },
  initChangeCompanyType(state,data){
    state.changeCompanyTypeList = data;
  },
  initChangeMineyType(state,data){
    state.changeMineyTypeList = data;
  },
  initChangeCooperationType(state,data){
    state.changeCooperationTypecList = data;
  },
  initAdminPersonalBenefits(state,data){
    state.adminPersonalBenefitsList = data;
  },
  initLookList(state,data){
    state.lookList = data;
  },
  initProvinceData(state,data){
    state.provinceDataList = data;
  },
  initCityData(state,data){
    state.cityDataList = data;
  },
  initCountyData(state,data){
    state.countyDataList = data;
  },
  initCarCityPlace(state,data){
    state.carCityPlaceList = data;
  },
//  旅行社
  initTravelAgencyOrder(state,data){
    state.TravelAgencyOrderList = data;
  },

};
