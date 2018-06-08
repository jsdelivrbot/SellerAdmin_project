/**
 * Created by leibo on 18/4/25.
 */
export default {
  initCarCompanies(state,data){
    state.carCompaniesList = data;
  },
  initCarStore(state,data){
    state.carStoreList = data;
  },
  initCarGetCityLandmarkInfo(state,data){
    state.carGetCityLandmarkInfoList = data;
  },
  initCarProduct(state,data){
    state.carProductList = data;
  },
  initCarCompanyCar(state,data){
    state.carCompanyCarList = data;
  },
  initCarCompanyCarStore(state,data){
    state.carCompanyCarStoreList = data;
  },
  initCarPreferentialPolicies(state,data){
    state.carPreferentialPoliciesList = data;
  },
  initCarOrderDetails(state,data){
    state.carOrderDetailsList = data;
  },
}
