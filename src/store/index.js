// import Vue from 'vue'
// import Vuex from 'vuex'

Vue.use(Vuex)



import app from './modules/app'
import user from './modules/user'
import travelAgency from './TravelAgency'
import ticket from './Ticket'
import food from './Food'
import tagsView from './modules/tagsView'
import hotel from './Hotel'
import adverts from './adverts'
import movie from './movie'
import car from './Car'
import permission from './modules/permission'
import getters from './getters'




const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    tagsView,
    travelAgency,
    ticket,
    permission,
    app,
    user,
    hotel,
    adverts,
    movie,
    car,
    food

  },
  getters
});

export default store
