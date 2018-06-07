import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import travelAgency from './TravelAgency'
import ticket from './Ticket'
import food from './Food'
import tagsView from './modules/tagsView'
import hotel from './Hotel'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tagsView,
    travelAgency,
    ticket,
    app,
    user,
    hotel,
    food

  },
  getters
});

export default store
