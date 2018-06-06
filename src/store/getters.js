const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  adminSupplierList:state=>state.travelAgency.adminSupplierList,
  changeCompanyTypeList:state=>state.travelAgency.changeCompanyTypeList,
  changeMineyTypeList:state=>state.travelAgency.changeMineyTypeList,
  provinceDataList:state=>state.travelAgency.provinceDataList,
  cityDataList:state=>state.travelAgency.cityDataList,
  countyDataList:state=>state.travelAgency.countyDataList,
  changeCooperationTypecList:state=>state.travelAgency.changeCooperationTypecList,
  lookList:state=>state.travelAgency.lookList,
  adminTradeGoodList:state=>state.travelAgency.adminTradeGoodList,
  homeAdminGroupTourList:state=>state.travelAgency.homeAdminGroupTourList,
  proviceList:state=>state.travelAgency.proviceList,
  cityList:state=>state.travelAgency.cityList,
  adminProductLine:state=>state.travelAgency.adminProductLine,
  updateAdminQueryProductInformationObj:state=>state.travelAgency.updateAdminQueryProductInformationObj,
  adminProductLineManagementId:state=>state.travelAgency.adminProductLineManagementId,
  adminMerchantProductsId:state=>state.travelAgency.adminMerchantProductsId,
}
export default getters
