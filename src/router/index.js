// import Vue from 'vue'
// import Router from 'vue-router'
Vue.use(VueRouter)

const _import = require('./_import_' + process.env.NODE_ENV);

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading



/* Layout */
import Layout from '../views/layout/Layout';

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login',name:'Login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {path: '/demo', component: () => import('@/views/demo'), hidden: true},
  { path: '/', component: _import('login/index'), hidden: true,name:"Home" },
  /**
   *  首页
   **/
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component:  () => import('@/views/dashboard'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  // /*demo***/
  // {
  //   path: '/demo',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'demo',
  //       component: () => import('@/views/demo/index'),
  //       meta: {title: 'demo', icon: 'form'}
  //     }
  //   ]
  // },
  /**
   *  旅行社
   **/
  {
    path: '/travelAgency',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TravelAgency',
        component: () => import('@/views/agencies/index'),
        meta: {title: 'VendorInformation', icon: 'form'}
      }
    ]
  },
  /**
   *  旅游
   **/
  {
    path: '/travel',
    component: Layout,
    name: 'Travel',
    hidden:true,
    alwaysShow: true,
    meta: {title: 'travel', icon: 'example'},
    children: [
      {
        path: 'adminMerchantProducts',
        name: 'AdminMerchantProducts',
        component: () => import('@/views/travel/AdminMerchantProducts'),
        meta: {title: 'adminMerchantProducts'}
      },
      {
        path: 'adminQueryProductInformation/:id',
        name: 'AdminQueryProductInformation',
        hidden: true,
        alwaysShow: true,
        component: () => import('@/views/travel/AdminQueryProductInformation'),
        meta: {title: 'productLine', icon: 'table'}
      },
      {
        path: 'adminQueryProductInformationList/:id',
        name: 'AdminQueryProductInformationList',
        hidden: true,
        alwaysShow: true,
        component: () => import('@/views/travel/AdminQueryProductInformationList'),
        meta: {title: 'ProductLineManagement', icon: 'table'}
      },
      {
        path: 'adminQueryUserOrder',
        name: 'AdminQueryUserOrder',
        alwaysShow: true,
        component: () => import('@/views/travel/AdminQueryUserOrder'),
        meta: {title: 'AdminQueryUserOrder'}
      },
    ]
  },

  /**
   *  门票
   **/
  {
    path: '/ticket',
    component: Layout,
    name: 'Ticket',
    hidden: true,
     alwaysShow: true,
    meta: {title: 'ticket', icon: 'tab'},
    children: [
      {
        path: 'ticketAttractions',
        name: 'TicketAttractions',
        component: () => import('@/views/ticket/TicketAttractions'),
        meta: {title: 'ticketAttractions'}
      },
      {
        path: 'ticketMap/:id',
        name: 'TicketMap',
        hidden:true,
        alwaysShow: true,
        component: () => import('@/views/ticket/TicketMap'),
        meta: {title: 'ticketMap'}
      },
       {
         path: 'ticketPredeterminedInstructions',
           name: 'TicketPredeterminedInstructions',
         component: () => import('@/views/ticket/TicketPredeterminedInstructions'),
         meta: {title: 'ticketPredeterminedInstructions'}
       },
      {
        path: 'ticketTrafficInformation',
        name: 'TicketTrafficInformation',
        component: () => import('@/views/ticket/TicketTrafficInformation'),
        meta: {title: 'ticketTrafficInformation'}
      },
      {
        path: 'ticketType',
        name: 'TicketType',
        component: () => import('@/views/ticket/TicketType'),
        meta: {title: 'ticketType'}
      },
      {
        path: 'ticketTypeTicketPrice/:id',
        name: 'TicketTypeTicketPrice',
        hidden:true,
        alwaysShow: true,
        component: () => import('@/views/ticket/TicketTypeTicketPrice'),
        meta: {title: 'ticketTypeTicketPrice'}
      },
      {
        path: 'ticketQueryOrder',
        name: 'TicketQueryOrder',
        component: () => import('@/views/ticket/TicketQueryOrder'),
        meta: {title: 'ticketQueryOrder'}
      },
      {
        path: 'ticketApplyShowHomePage',
        name: 'TicketApplyShowHomePage',
        component: () => import('@/views/ticket/TicketApplyShowHomePage'),
        meta: {title: 'ticketApplyShowHomePage'}
      }
    ]
  },
  /**
   *  酒店
   **/
  {
    path: '/hotel',
    component: Layout,
    name: 'Hotel',
    hidden:true,
    redirect: '/hotel/hotelDetil',
    // alwaysShow: false,
    meta: {title: 'hotel', icon: 'chart'},
    children: [
      {
        path: 'hotelDetil',
        name: 'HotelDetil',
        component: () => import('@/views/hotel/HotelDetil'),
        meta: {title: 'hotelDetail'}
      },
      {
        path: 'hotelConfirmOrder',
        name: 'HotelConfirmOrder',
        component: () => import('@/views/hotel/HotelConfirmOrder'),
        meta: {title: 'hotelConfirmOrder'}
      },
      {
        path: 'hotelFacilitiesServices',
        name: 'HotelFacilitiesServices',
        component: () => import('@/views/hotel/HotelFacilitiesServices'),
        meta: {title: 'hotelFacilitiesServices'}
      },
      {
        path: 'hotelIcon',
        name: 'HotelIcon',
        component: () => import('@/views/hotel/HotelIcon'),
        meta: {title: 'hotelIcon'}
      },
      {
        path: 'hotelImage',
        name: 'HotelImage',
        component: () => import('@/views/hotel/HotelImage'),
        meta: {title: 'hotelImage'}
      },
      {
        path: 'hotelLotRoomNumber/:id',
        name: 'HotelLotRoomNumber',
        hidden:true,
        alwaysShow: true,
        component: () => import('@/views/hotel/HotelLotRoomNumber'),
        meta: {title: 'hotelLotRoomNumber'}
      },
      {
        path: 'hotelOrderDetails',
        name: 'HotelOrderDetails',
        component: () => import('@/views/hotel/HotelOrderDetails'),
        meta: {title: 'hotelOrderDetails'}
      },
      {
        path: 'hotelPolicy',
        name: 'HotelPolicy',
        component: () => import('@/views/hotel/HotelPolicy'),
        meta: {title: 'hotelPolicy'}
      },
      {
        path: 'hotelQueryRecommend',
        name: 'HotelQueryRecommend',
        component: () => import('@/views/hotel/HotelQueryRecommend'),
        meta: {title: 'hotelQueryRecommend'}
      },
      {
        path: 'hotelRoom',
        name: 'HotelRoom',
        component: () => import('@/views/hotel/HotelRoom'),
        meta: {title: 'hotelRoom'}
      },
      {
        path: 'hotelRoomEntity/:id',
        name: 'HotelRoomEntity',
        hidden:true,
        alwaysShow: true,
        component: () => import('@/views/hotel/HotelRoomEntity'),
        meta: {title: 'hotelRoomEntity'}
      },
      //酒店设施服务设施
      {
        path: 'hotelFacilitiesServicesFacilities',
        component: () => import('@/views/hotel/HotelFacilitiesServicesFacilities'),
        name: 'HotelFacilitiesServicesFacilities',
        meta: {title: 'hotelFacilitiesServicesFacilities'}
      },
      {
        path: 'hotelRoomNumber/:id',
        name: 'HotelRoomNumber',
        hidden:true,
        alwaysShow: true,
        component: () => import('@/views/hotel/HotelRoomNumber'),
        meta: {title: 'hotelRoomNumber'}
      },
      {
        path: 'hotelRoomProduct/:id',
        name: 'HotelRoomProduct',
        hidden:true,
        alwaysShow: true,
        component: () => import('@/views/hotel/HotelRoomProduct'),
        meta: {title: 'hotelRoomProduct'}
      },
      {
        hidden:true,
        alwaysShow: true,
        path: 'hotelRoomRoomFacilities/:id',
        name: 'HotelRoomRoomFacilities',
        component: () => import('@/views/hotel/HotelRoomRoomFacilities'),
        meta: {title: 'hotelRoomRoomFacilities'}
      },
      {
        path: 'hotelTheme',
        name: 'HotelTheme',
        component: () => import('@/views/hotel/HotelTheme'),
        meta: {title: 'hotelTheme'}
      },


    ]
  },
  /**
   *  美食
   **/
  {
    path: '/food',
    component: Layout,
    name: 'Food',
    hidden:true,
    alwaysShow: true,
    meta: {title: 'food', icon: 'star'},
    children: [
      {
        path: 'foodStoreInformation',
        name: 'FoodStoreInformation',
        component: () => import('@/views/food/FoodStoreInformation'),
        meta: {title: 'foodStoreInformation'}
      },
      {
        path: 'foodStoreProduct/:id',
        name: 'FoodStoreProduct',
        hidden: true,
        component: () => import('@/views/food/FoodStoreProduct'),
        meta: {title: 'foodStoreProduct'}
      },
      //推荐菜
      // {
      //   path: 'foodStoreRecommend',
      //   name: 'FoodStoreRecommend',
      //   component: () => import('@/views/food/FoodStoreRecommend'),
      //   meta: {title: 'foodStoreRecommend'}
      // },

      {
        path: 'foodStoreRoom/:id',
        name: 'FoodStoreRoom',
        hidden:true,
        component: () => import('@/views/food/FoodStoreRoom'),
        meta: {title: 'foodStoreRoom'}
      },
      //房间餐桌
      // {
      //   path: 'foodStoreRoomTabel',
      //   name: 'FoodStoreRoomTabel',
      //   component: () => import('@/views/food/FoodStoreRoomTabel'),
      //   meta: {title: 'foodStoreRoomTabel'}
      // },
      // {
      //   path: 'foodStoreOrderingTime',
      //   name: 'FoodStoreOrderingTime',
      //   component: () => import('@/views/food/FoodStoreOrderingTime'),
      //   meta: {title: 'foodStoreOrderingTime'}
      // },
      {
        path: 'foodStoppingPlace',
        name: 'FoodStoppingPlace',
        component: () => import('@/views/food/FoodStoppingPlace'),
        meta: {title: 'foodStoppingPlace'}
      },{
        path: 'foodStoreConfirmOrder',
        name: 'FoodStoreConfirmOrder',
        component: () => import('@/views/food/FoodStoreConfirmOrder'),
        meta: {title: 'foodStoreConfirmOrder'}
      },





    ]
  },
  /**
   *  微电影
   **/
  {
    path: '/movie',
    component: Layout,
    name: 'Movie',
    hidden:true,
    redirect: '/movie/vMovieCheckTable',
    // alwaysShow: false,
    meta: {title: 'movie', icon: 'example'},
    children: [
      {
        path: 'vMovieCheckTable',
        name: 'VMovieCheckTable',
        component: () => import('@/views/movie/VMovieCheckTable'),
        meta: {title: 'vMovieCheckTable'}
      },
      {
        path: 'vMovieMiniMovie',
        name: 'VMovieMiniMovie',
        component: () => import('@/views/movie/VMovieMiniMovie'),
        meta: {title: 'vMovieMiniMovie'}
      },
      {
        path: 'vMovieSeries',
        name: 'VMovieSeries',
        component: () => import('@/views/movie/VMovieSeries'),
        meta: {title: 'vMovieSeries'}
      },
      {
        path: 'vMovieSeriesCategories',
        name: 'VMovieSeriesCategories',
        component: () => import('@/views/movie/VMovieSeriesCategories'),
        meta: {title: 'vMovieSeriesCategories'}
      },
      {
        path: 'vMovieSorting',
        name: 'VMovieSorting',
        component: () => import('@/views/movie/VMovieSorting'),
        meta: {title: 'vMovieSorting'}
      },
      {
        path: 'vMovieVideo',
        name: 'VMovieVideo',
        component: () => import('@/views/movie/VMovieVideo'),
        meta: {title: 'vMovieVideo'}
      },
      {
        path: 'vMovieVideoCategories',
        name: 'VMovieVideoCategories',
        component: () => import('@/views/movie/VMovieVideoCategories'),
        meta: {title: 'vMovieVideoCategories'}
      },
      {
        path: 'vMovieVideoSeries',
        name: 'VMovieVideoSeries',
        component: () => import('@/views/movie/VMovieVideoSeries'),
        meta: {title: 'vMovieVideoSeries'}
      },

    ]
  },
  /**
   *  租车
   **/
  {
    path: '/car',
    component: Layout,
    name: 'Car',
    hidden:true,
    redirect: '/car/CarCompanyCar',
    // alwaysShow: false,
    meta: {title: 'car', icon: 'shoppingCard'},
    children: [
      {
        path: 'carHome',
        name: 'CarHome',
        component: () => import('@/views/car/CarHome'),
        meta: {title: 'carHome'}
      },

      {
        hidden:true,
        alwaysShow: true,
        path: 'carCompanyCar',
        name: 'CarCompanyCar',
        component: () => import('@/views/car/CarCompanyCar'),
        meta: {title: 'carCompanyCar'}
      },

      {
        path: 'carStore',
        name: 'CarStore',
        component: () => import('@/views/car/CarStore'),
        meta: {title: 'carStore'}
      },
      {
        path: 'carProduct',
        name: 'CarProduct',
        component: () => import('@/views/car/CarProduct'),
        meta: {title: 'carProduct'}
      },
      {
        path: 'carPreferentialPolicies',
        name: 'CarPreferentialPolicies',
        component: () => import('@/views/car/CarPreferentialPolicies'),
        meta: {title: 'carPreferentialPolicies'}
      },  {
        path: 'carOrderDetails',
        name: 'CarOrderDetails',
        component: () => import('@/views/car/CarOrderDetails'),
        meta: {title: 'carOrderDetails'}
      },{
        path: 'carConfirmOrder',
        name: 'CarConfirmOrder',
        component: () => import('@/views/car/CarConfirmOrder'),
        meta: {title: 'carConfirmOrder'}
      },


    ]
  },
  /**
   *  404
   **/
  {path: '*', redirect: '/404', hidden: true}
];

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap =[

]

