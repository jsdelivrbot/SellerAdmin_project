export default {
  //初始化动画
  setTranstionFalse(state) {
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  initFoodStoreInformtion(state, data) {
    for (let i = 0; i < data.length; i++) {
      data[i].timeList = [];
      data[i].eatList = [];
      data[i].typeList = [];
      data[i].imgList = [];
      for (let j = 0; j < data[i].canLockTimeList.length; j++) {
        data[i].timeList.push(data[i].canLockTimeList[j].fd_fp_PropertyID);
      }
      for (let j = 0; j < data[i].eatTypeList.length; j++) {
        data[i].eatList.push(data[i].eatTypeList[j].fd_fp_PropertyID);
      }
      for (let j = 0; j < data[i].foodTypeList.length; j++) {
        data[i].typeList.push(data[i].foodTypeList[j].fd_fp_PropertyID);
      }
      for (let j = 0; j < data[i].imageList.length; j++) {
        data[i].imgList.push(data[i].imageList[j].fd_pi_ImageUrl);
      }
    }
    state.foodStoreInformtionList = data;
  },
  initThreeMeals(state, data) {
    state.threeMealsList = data;
  },
  initFoodStoreInformtionAction(state, data) {
    state.foodStoreInformtionList1 = data;
  },
  initNumberOfMeals(state, data) {
    state.numberOfMealsList = data;
  },
  initStorefrontType(state, data) {
    state.storefrontTypeList = data;
  },
  initFoodProcince(state, data) {
    state.foodProcinceList = data;
  },
  initFoodCity(state, data) {
    state.foodCityList = data;
  },
  initFoodStoreRoom(state, data) {
    for (let i = 0; i < data.length; i++) {
      data[i].imgData = [];
      for (let j = 0; j < data[i].imageList.length; j++) {
        data[i].imgData.push(data[i].imageList[j].fd_ri_Image)
      }
    }
    state.foodStoreRoomList = data;
  },
  initFoodStoreProduct(state, data) {
    for (let i = 0; i < data.length; i++) {
      data[i].imgData = [];
      for (let j = 0; j < data[i].imageList.length; j++) {
        data[i].imgData.push(data[i].imageList[j].fd_gi_GoodImage)
      }
    }
    state.foodStoreProductList = data;
  },
  initFoodProductPicture(state, data) {
    state.foodProductPictureList = data
  },
  initFoodStoreRecommend(state, data) {
    state.foodStoreRecommendList = data;
  },
  initFoodStoreRoomTabel(state, data) {
    state.foodStoreRoomTabelList = data
  },
  initFoodStoreTableTime(state, data) {
    state.foodStoreTableTimeList = data
  },
  initFoodStoppingPlace(state, data) {
    state.foodStoppingPlaceList = data;
  },
  initFoodStoreConfirnOrder(state, data) {
    state.foodStoreConfirnOrderList = data;
  },
  initFoodStoreProductPicture(state, data) {
    state.foodStoreProductPictureList = data;
  },
  initFoodStoreOrderingTime(state, data) {
    state.foodStoreOrderingTimeList = data;
  },
  initFoodRoomPicture(state, data) {
    state.foodRoomPictureList = data;
  },
  initRoomType(state, data) {
    state.roomTypeList = data;
  },
  initCuisine(state,data) {
    state.cuisineList = data;
  },
  initSelectPropertyInfo(state, data) {
    state.selectPropertyInfoList = data;
  }
}


















