export default {
//初始化动画
  transtionActive: {
    isActive: false,
    isRotateInDownRight: false
  },
  isAgencies:false,
  isFood:false,
  isHotel:false,
  isTickets:false,
  isCar:false,
  isMovie:false,
  isAdvertising:false,

  //----------管理员----------
  adminEventDiningList: [],
  adminProductLine: [],
  adminLinePrepare: [],//线路日程
  adminScheduleTimeList: [],//日程时间
  adminTimeActivitiesList: [],//时间活动
  adminTradeGoodList: [],//商户产品
  queryUserOrderList: [],//查询商户订单
  searchUserOrderList: [],//查询用户订单
  updateAdminTimeActivitiesObj: {},//修改时间活动obj
  updateAdminQueryProductInformationObj: {},//修改产品线路obj
  updateAdminScheduleTimeObj: {},//修改日程时间obj
  groupTourList: [],//跟团游栏目
  homeAdminGroupTourList: [],//Home初始化跟团游栏目
  updateAdminGroupTourObj: {},//修稿跟团游栏目obj
  adminBusinessInformationList: [],//管理员商户信息
  updateAdminBusinessInformationObj: {},//修改商户初始化obj
  updateAdminMerchantProductsObj: {},//修改产品obj
  updateAdminLinePrepareObj: {},//修改线路日程obj
  adminProductMenuList: [],//查询菜单
  updateMenuObj: [],//初始化修改菜单数据
  adminProductFeaturesList: [],//产品特色
  updateAdminProductFeaturesObj: [],//修改产品特色初始化数据
  updateAdminActiveFoodObj: {},//初始化修改活动用餐数据
  adminActiveHotelList: [],//活动住宿
  adminActivitySiteList: [],//景点管理
  updateAdminActiveHotelObj: {},//修改活动酒店obj
  adminActiveReminderList: [],//初始化温馨提示数据
  updateAdminActivitySiteObj: {},//修改活动景点obj
  adminEventShoppingList: [],//活动购物
  updateAdminEventShoppingObj: {},//修改活动购物obj
  updateAdminActiveReminderObj: {},//修改温馨提示数据
  adminActiveTrafficList:[],//活动交通
  updateAdminActiveTrafficObj:{},//修改活动交通obj
  adminCostsOfList:[],//线路费用说明
  updateAdminCostsOfObj:{},//修改费用说明obj
  adminSystemMenuList:[],//系统总菜单
  updateAdminSystemMenuObj:{},//修改系统总菜单obj
  adminBusinessLicenseList:[],//商户营业执照列表
  updateAdminBusinessLicenseObj:{},//修改商户营业执照Obj
  adminCommentsTypeList:[],//评论类型
  departureCityList:[],//出发城市
  adminLinePriceList:[],//产品线路价格
  updateAdminLinePriceObj:{},//修改产品线路价格obj
  proviceList:[],//省份
  cityList:[],//城市
  adminRouteDepartureCity:[],//管理员出发城市
  updateAdminRouteDepartureCityObj:{},//修改出发城市obj
  adminSupplierList:[],//供应商信息
  adminSupplierListObj:{},
  adminPersonalBenefitsList:[],//供应商收益

  changeScopeOfOperationList:[],//经营范围
  changeCompanyTypeList:[],//公司规模
  changeMineyTypeList:[],//结算币种
  changeCooperationTypecList:[],//合作类型
  lookList:[],//供应商审核流程

  provinceDataList:[],//获取省
  cityDataList:[],//获取市
  countyDataList:[],//获取县
  carCityPlaceList:[], //租车级联城市

  //旅行社
  TravelAgencyOrderList: [],//旅行社订单

  //参数
  adminMerchantProductsId: '',
  adminProductLineManagementId: '',
  adminProductCharacteristicManagementId: '',
  adminLineScheduleManagementId: '',
  adminScheduleTimeManagementId: '',
  adminTimeActivityManagementId: '',
  adminActivityMealManagementId: '',



}
