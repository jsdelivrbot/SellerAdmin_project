import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

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
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  { path: '/', component: _import('login/index'), hidden: true },

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
  {
    path: '/travel',
    component: Layout,
    name: 'Travel',
    // alwaysShow: false,
    meta: {title: 'travel', icon: 'example'},
    children: [
      {
        path: 'adminMerchantProducts',
        name: 'AdminMerchantProducts',
        component: () => import('@/views/travel/AdminMerchantProducts'),
        meta: {title: 'adminMerchantProducts', icon: 'table'}
      },
      {
        path: 'adminQueryProductInformation',
        name: 'adminQueryProductInformation',
        hidden: true,
        alwaysShow: true,
        component: () => import('@/views/travel/AdminQueryProductInformation'),
        meta: {title: 'productLine', icon: 'table'}
      },
      {
        path: 'adminQueryProductInformationList',
        name: 'adminQueryProductInformationList',
        hidden: true,
        alwaysShow: true,
        component: () => import('@/views/travel/AdminQueryProductInformationList'),
        meta: {title: 'ProductLineManagement', icon: 'table'}
      }
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    name: 'Ticket',
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
        path: 'ticketMap',
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
        path: 'ticketTypeTicketPrice',
        name: 'TicketTypeTicketPrice',
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
  {
    path: '/hotel',
    component: Layout,
    name: 'Hotel',
    redirect: '/hotel/hotelDetil',
    // alwaysShow: false,
    meta: {title: 'hotel', icon: 'example'},
    children: [
      {
        path: 'hotelDetil',
        name: 'HotelDetil',
        component: () => import('@/views/hotel/HotelDetil'),
        meta: {title: 'hotelDetail ', icon: 'table'}
      },
      {
        path: 'hotelConfirmOrder',
        name: 'HotelConfirmOrder',
        component: () => import('@/views/hotel/HotelConfirmOrder'),
        meta: {title: 'hotelConfirmOrder ', icon: 'table'}
      },
      {
        path: 'hotelFacilitiesServices',
        name: 'HotelFacilitiesServices',
        component: () => import('@/views/hotel/HotelFacilitiesServices'),
        meta: {title: 'hotelFacilitiesServices ', icon: 'table'}
      },
      {
        path: 'hotelIcon',
        name: 'HotelIcon',
        component: () => import('@/views/hotel/HotelIcon'),
        meta: {title: 'hotelIcon ', icon: 'table'}
      },
      {
        path: 'hotelImage',
        name: 'HotelImage',
        component: () => import('@/views/hotel/HotelImage'),
        meta: {title: 'hotelImage ', icon: 'table'}
      },
      {
        path: 'hotelLotRoomNumber',
        name: 'HotelLotRoomNumber',
        component: () => import('@/views/hotel/HotelLotRoomNumber'),
        meta: {title: 'hotelLotRoomNumber ', icon: 'table'}
      },
      {
        path: 'hotelOrderDetails',
        name: 'HotelOrderDetails',
        component: () => import('@/views/hotel/HotelOrderDetails'),
        meta: {title: 'hotelOrderDetails ', icon: 'table'}
      },
      {
        path: 'hotelPolicy',
        name: 'HotelPolicy',
        component: () => import('@/views/hotel/HotelPolicy'),
        meta: {title: 'hotelPolicy ', icon: 'table'}
      },
      {
        path: 'hotelQueryRecommend',
        name: 'HotelQueryRecommend',
        component: () => import('@/views/hotel/HotelQueryRecommend'),
        meta: {title: 'hotelQueryRecommend ', icon: 'table'}
      },
      {
        path: 'hotelRoom',
        name: 'HotelRoom',
        component: () => import('@/views/hotel/HotelRoom'),
        meta: {title: 'hotelRoom ', icon: 'table'}
      },
      {
        path: 'hotelRoomEntity',
        name: 'HotelRoomEntity',
        component: () => import('@/views/hotel/HotelRoomEntity'),
        meta: {title: 'hotelRoomEntity ', icon: 'table'}
      },
      {
        path: 'hotelRoomNumber',
        name: 'HotelRoomNumber',
        component: () => import('@/views/hotel/HotelRoomNumber'),
        meta: {title: 'hotelRoomNumber ', icon: 'table'}
      },
      {
        path: 'hotelRoomProduct',
        name: 'HotelRoomProduct',
        component: () => import('@/views/hotel/HotelRoomProduct'),
        meta: {title: 'hotelRoomProduct ', icon: 'table'}
      },
      {
        path: 'hotelRoomRoomFacilities',
        name: 'HotelRoomRoomFacilities',
        component: () => import('@/views/hotel/HotelRoomRoomFacilities'),
        meta: {title: 'hotelRoomRoomFacilities ', icon: 'table'}
      },
      {
        path: 'hotelTheme',
        name: 'HotelTheme',
        component: () => import('@/views/hotel/HotelTheme'),
        meta: {title: 'hotelTheme ', icon: 'table'}
      },
    ]
  },
  {
    path: '/food',
    component: Layout,
    name: 'Food',
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
        path: 'foodStorePicture',
        name: 'FoodStorePicture',
        component: () => import('@/views/food/FoodStorePicture'),
        meta: {title: 'foodStorePicture'}
      },
      {
        path: 'foodStoreRecommend',
        name: 'FoodStoreRecommend',
        component: () => import('@/views/food/FoodStoreRecommend'),
        meta: {title: 'foodStoreRecommend'}
      }, {
        path: 'foodStoreProduct',
        name: 'FoodStoreProduct',
        component: () => import('@/views/food/FoodStoreProduct'),
        meta: {title: 'foodStoreProduct'}
      }, {
        path: 'foodStoreProductPicture',
        name: 'FoodStoreProductPicture',
        component: () => import('@/views/food/FoodStoreProductPicture'),
        meta: {title: 'foodStoreProductPicture'}
      }, {
        path: 'foodStoreRoom',
        name: 'FoodStoreRoom',
        component: () => import('@/views/food/FoodStoreRoom'),
        meta: {title: 'foodStoreRoom'}
      }, {
        path: 'foodRoomPicture',
          name: 'FoodRoomPicture',
        component: () => import('@/views/food/FoodRoomPicture'),
        meta: {title: 'foodRoomPicture'}
      }, {
        path: 'foodStoreRoomTabel',
        name: 'FoodStoreRoomTabel',
        component: () => import('@/views/food/FoodStoreRoomTabel'),
        meta: {title: 'foodStoreRoomTabel'}
      }, {
        path: 'foodStoreTableTime',
        name: 'FoodStoreTableTime',
        component: () => import('@/views/food/FoodStoreTableTime'),
        meta: {title: 'foodStoreTableTime'}
      }, {
        path: 'foodStoreOrderingTime',
        name: 'FoodStoreOrderingTime',
        component: () => import('@/views/food/FoodStoreOrderingTime'),
        meta: {title: 'foodStoreOrderingTime'}
      }, {
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
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap =[

]

