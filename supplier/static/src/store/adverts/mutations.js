/**
 * Created by LiuXiang on 18/04/09.
 */
export default  {

  /********************************************广告申请*********************************************************/
  //广告位置所有
  initAdPositionAll(state,data){
    state.adPositionAllList=data;
  },
  //广告类型所有
  initAdTypeAllList(state,data){
    state.adTypeApplyAllList=data;
  },
  initAdApply(state,data){
    state.adApplyList = data;
  },
  initUpdateAdApply(state,id){
    state.updateAdApplyObj = state.adApplyList.filter(item=>{
      if(item.sm_aa_ID==id){
        return true
      }
      return false
    })[0]
  }
}



