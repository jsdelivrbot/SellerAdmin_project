export default {
  //初始化动画
  setTranstionFalse(state) {
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  initFoodStoreInformtion(state, data) {
    state.foodStoreInformtionList = data;
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
    state.foodStoreRoomList = data;
  },
  initFoodStoreProduct(state, data) {
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
  }
}


















