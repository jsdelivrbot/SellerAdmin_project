export default {
  //初始化酒店信息数据
  initMyHotelDetails(state, obj){
    state.myHotelDetailsList = [];
    if(obj){
      state.myHotelDetailsList.push(obj)
    }else{
      state.myHotelDetailsList = [];
    }
  },
  //获取省
  initHotelProvinceData(state, data){
    state.provinceHotelDataList = data;
  },
  initHotelCityData(state, data){
    state.cityHotelDataList = data;
  },
  initHotelCountyData(state, data){
    state.countyHotelDataList = data;
  },
  //修改酒店信息
  updateHotelDetilsContent(state){
    state.updateHotelDetilsObj = state.myHotelDetailsList[0];
  },
  //酒店推荐列表数据
  changeRecommendType(state, data){
    state.recommendTypeList = data;
  },
  //酒店推荐类型
  initHotelQueryRecommend(state, data){
    state.hotelQueryRecommendList = data;
  },
  initHotelIntroduceType(state, data){
    state.hotelIntroduceTypeList = data;
  },
  initHotelImage(state, data){
    state.hotelImageList = data;
  },
  initHotelImageType(state, data){
    state.hotelImageTypeList = data;
  },
  initHotelPolicy(state,data){
    state.hotelPolicyList = data;
  },
  updateHotelImage(state,id){
    state.updateHotelImageObj = state.hotelImageList.filter(item=>{
      if(item.ht_hi_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  updateHotelPolicy(state,id){
    state.updateHotelPolicyObj = state.hotelPolicyList.filter(item=>{
      if(item.ht_hi_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initHotelThemeType(state,data){
    state.hotelThemeTypeList = data;
  },
  initHotelTheme(state,data){
    state.hotelThemeList = data;
  },
  initHotelIcon(state,data){
    state.hotelIconList = data;
  },
  initHotelIconGallery(state,data){
    state.hotelIconGalleryList = data;
  },
  initHotelFacilitiesServices(state,data){
    state.hotelFacilitiesServicesList = data;
  },
  updateHotelFacilitiesServices(state,id){
    state.updateHotelFacilitiesServicesObj = state.hotelFacilitiesServicesList.filter(item=>{
      if(item.ht_hs_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initHotelFacilities(state,data){
    state.hotelFacilitiesList = data;
  },
  initHotelFacilitiesServicesFacilities(state,data){
    state.hotelFacilitiesServicesFacilitiesList = data;
  },
  initHotelRoom(state,data){
    state.hotelRoomList = data;
  },
  UpdateHotelRoom(state,id){
    state.updateHotelRoomObj = state.hotelRoomList.filter(item=>{
      if(item.ht_bt_RoomID==id){
        return true;
      }
      return false;
    })[0]
  },
  initHotelFacilitiesType(state,data){
    state.hotelFacilitiesTypeList = data;
  },
  initSearchFacilities(state,data){
    state.searchFacilitiesList = data;
  },
  initHotelRoomFacilitiesType(state,data){
    state.hotelRoomFacilitiesTypeList = data;
  },
  initHotelRoomProduct(state,data){
    state.hotelRoomProductList = data;
  },
  UpdateHotelRoomProduct(state,id){
    state.updateHotelRoomProductObj = state.hotelRoomProductList.filter(item=>{
      if(item.ht_rpp_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initHotelRoomRoomFacilities(state,data){
    state.hotelRoomRoomFacilitiesList = data;
  },
  initRoomFacilities(state,data){
    state.roomFacilitiesList = data;
  },
  initHotelID(state,id){
    state.hotelID = id;
  },
  UpdateHotelRoomRoomFacilities(state,id){
    state.updateHotelRoomRoomFacilitiesObj = state.hotelRoomRoomFacilitiesList.filter(item=>{
      if(item.ht_rth_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initHotelOrderDetails(state,data){
    state.hotelOrderDetailsList = data;
  },
  initHotelConfirmOrder(state,data){
    state.hotelConfirmOrderList = data;
  },
  initHotelRoomEntity(state,data){
    state.hotelRoomEntityList = data;
  },
  UpdateHotelRoomEntity(state,id){
    state.updateHotelRoomEntityObj = state.hotelRoomEntityList.filter(item=>{
      if(item.ht_re_Id==id){
        return true;
      }
      return false;
    })[0]
  },
  initHotelRoomNumber(state,data){
    state.hotelRoomNumberList = data;
  },
  initHotelLotRoomNumber(state,data){
    state.hotelLotRoomNumberList = data;
  },
  initParentHotelQueryRecommend(state,data){
    state.parentHotelQueryRecommendList = data;
  },
  initShowChildHotelQueryRecommend(state,data){
    state.showChildHotelQueryRecommendList = data;
  }
}
