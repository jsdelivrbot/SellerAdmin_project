/**
 * Created by leibo on 18/3/29.
 */
export default {
  initThemeType(state, data) {
    state.themeTypeList = data;
  },
  initTicketAttractions(state, data) {
    for (let i = 0; i < data.length; i++) {
      //处理图片
      if(data[i].tm_ts_ShowImage){
        data[i].tm_ts_ShowImage = data[i].tm_ts_ShowImage.split(',');
      }else{
        data[i].tm_ts_ShowImage = [];
      }
    }
    state.ticketAttractionsList = data;
  },
  initTicketGreat(state, data) {
    state.ticketGreatList = data;
  },
  initTicketProvice(state, data) {
    state.ticketProviceList = data;
  },
  initTicketCountrie(state, data) {
    state.ticketCountrieList = data;
  },
  initTicketCity(state, data) {
    state.ticketCityList = data;
  },
  initTicketContry(state, data) {
    state.ticketContryList = data;
  },
  updateTicketAttractions(state, id) {
    state.updateTicketAttractionsObj = state.ticketAttractionsList.filter(item => {
      if (item.tm_ts_Code == id) {
        return true;
      }
      return false;
    })[0];
  },
  initPredeterminedInstructions(state, data) {
    state.predeterminedInstructionsList = data;
  },
  updatePredeterminedInstructions(state, id) {
    state.updatePredeterminedInstructionsObj = state.predeterminedInstructionsList.filter(item => {
      if (item.tm_bk_ID == id) {
        return true;
      }
      return false;
    })[0];
  },
  initTrafficInformation(state, data) {
    state.trafficInformationList = data;
  },
  updateTrafficInformation(state, id) {
    state.updateTrafficInformationObj = state.trafficInformationList.filter(item => {
      if (item.tm_tm_ID == id) {
        return true;
      }
      return false;
    })[0];
  },
  initTicketType(state, data) {
    for (let i = 0; i < data.length; i++) {
      if( data[i].tm_tt_Image ){
        data[i].tm_tt_Image = data[i].tm_tt_Image.split(',');
      }

    }
    state.ticketTypeList = data;
  },
  updateTicketType(state, id) {

    state.updateTicketTypeObj = state.ticketTypeList.filter(item => {

      if (item.tm_tt_ID == id) {
        item.tm_tt_BeforeTime = item.tm_tt_BeforeTime/60
        return true;
      }
      return false;
    })[0];
  },

  initTicketTypeTicketPrice(state, data) {
    state.ticketTypeTicketPriceList = data;
  },
  initTicketQueryOrder(state, data) {
    state.ticketQueryOrderList = data;
  },
  initTicketMap(state,data){

    for (let i = 0; i < data.length; i++) {
      //处理图片
      if(data[i].tm_se_Image){
        data[i].tm_se_Image = data[i].tm_se_Image.split(',');
      }else{
        data[i].tm_se_Image = ''
      }
    }
    state.ticketMapList = data;
  }
}
