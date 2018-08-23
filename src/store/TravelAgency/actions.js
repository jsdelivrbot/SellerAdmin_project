/**
 * Created by leibo on 18/1/2.
 */
// import request from 'request'
import {postPromise,getNewStr} from '@/assets/js/public'
import request from '@/utils/request'
// import {adminSupplier} from '@/api/agencies'
export default {

  //------------------------------------------管理员--------------------------------------------------
  //管理员活动景点查询
  initAdminActivitySite({commit}, data) {
    return new Promise(function (relove, reject) {
      // request({
      //   url:getNewStr + '/ActivitySite/GetActivitySite',
      //   method: 'post',
      //   data:JSON.stringify(data)
      // })
      request.post(getNewStr + '/ActivitySite/GetActivitySite', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminActivitySite', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })

    })
  },
  //添加管理员活动景点
  initAddAdminActivitySite({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivitySite/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改管理员活动景点
  UpdateAdminActivitySite(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivitySite/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除管理员活动景点
  DeleteAdminActivitySite(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivitySite/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员活动交通查询
  initAdminActiveTraffic({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityTransport/GetActivityTransport', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminActiveTraffic', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加活动交通
  AddAdminActiveTraffic(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityTransport/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改活动交通
  UpdateAdminActiveTraffic(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityTransport/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除活动交通
  DeleteAdminActiveTraffic(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityTransport/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员查询活动购物
  initAdminEventShopping({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityShopping/GetActivityShopping', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminEventShopping', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加活动购物
  AddAdminEventShopping(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityShopping/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改活动购物
  UpdateAdminEventShopping(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityShopping/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除活动购物
  DeleteAdminEventShopping(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityShopping/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员产品线路查询
  initAdminProductLine({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ProductLine/GetProductLine', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resutle = data.data;
            for(var i=0;i<resutle.length;i++){
              if(resutle[i].ts_pt_Images){
                resutle[i].ts_pt_Images = resutle[i].ts_pt_Images.split(',')
              }
            }
            commit('initAdminProductLine', resutle);
            relove(resutle)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员线路日程
  initAdminLinePrepare({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/LinePrepare/GetLinePrepare', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (var i = 0; i < data.data.length; i++) {
              if(data.data[i].ts_pt_ShowImage){
                data.data[i].ts_pt_ShowImage = data.data[i].ts_pt_ShowImage.split(',')
              }else{
                data.data[i].ts_pt_ShowImage = []
              }

            }
            commit('initAdminLinePrepare', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员日程时间
  initAdminScheduleTime({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelTime/GetTravelTime', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminScheduleTime', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员时间活动
  initAdminTimeActivities({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TimeActivity/GetTravelTime', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminTimeActivities', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员查商户信息
  initAdminTradeGoodList({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeGood/GetTradeGoodInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            var resulte = data.data;
            let value = resulte.data;
            for (var i = 0; i < value.length; i++) {
              if(value[i].ta_tg_ShowImage){
                value[i].ta_tg_ShowImages = value[i].ta_tg_ShowImage.split(',')
              }else{
                value[i].ta_tg_ShowImages = []
              }
            }
            commit('initAdminTradeGoodList', resulte.data);
            relove(resulte)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //管理员上传图片
  uploadAdminImgs(store, data) {

    return new Promise((relove, reject) => {
      request.post('http://webservice.1000da.com.cn/OSSFile/PostToOSS', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {

          relove(data.data)
        })
    })
  },
  //查询商户订单
  initQueryUserOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initQueryUserOrder', data.data);
            relove(data.totalrows)
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询用户订单
  initSearchUserOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initSearchUserOrder', data.data);
            relove(data.totalrows);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加时间活动
  AddAdminTimeActivities(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TimeActivity/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改时间活动
  UpdateAdminTimeActivities(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TimeActivity/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除时间活动
  DeleteAdminTimeActivities(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TimeActivity/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加日程时间
  AddAdminScheduleTime(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelTime/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改日程时间
  UpdateAdminScheduleTime(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelTime/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除日程时间
  DeletAdminScheduleTime(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelTime/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加线路
  AddAdminQueryProductInformationSubmit(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ProductLine/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改线路
  UpdateAdminQueryProductInformation(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ProductLine/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除线路
  DeleteAdminQueryProductInformation(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ProductLine/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //Home初始化跟团游栏目
  initHomeAdminGroupTour({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GroupItemInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initHomeAdminGroupTour', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //跟团游栏目
  initAdminGroupTour({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GroupItemInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminGroupTour', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加跟团游栏目
  AddAdminGroupTour(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GroupItemInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改跟团游栏目
  UpdateAdminGroupTour(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GroupItemInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除跟团游栏目
  DeleteAdminGroupTour(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GroupItemInfo/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //管理员商户信息
  initAdminBusinessInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeInfo/GetTradeInfoList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].ts_tb_ShowImage) {
                data.data[i].ts_tb_ShowImage = data.data[i].ts_tb_ShowImage.split(',')
              } else {
                data.data[i].ts_tb_ShowImage = []
              }
              if (data.data[i].ts_tb_StoreImageURL) {
                data.data[i].ts_tb_StoreImageURL = data.data[i].ts_tb_StoreImageURL.split(',')
              } else {
                data.data[i].ts_tb_StoreImageURL = []
              }
            }
            commit('initAdminBusinessInformation', data.data);
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改商户
  UpdateAdminBusinessInformation(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除商户
  DeleteAdminBusinessInformation(store, id) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeInfo/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //商户上传图片
  uploadImgs(store, data) {
    return new Promise((relove, reject) => {
      request.post('http://image.1000da.com.cn/PostImage/PostToService', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          relove(data.data)
        })
    })
  },
  //模糊搜索商户
  AdminBusinessInformationSearch({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeInfo/GetTradeInfoList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加商家产品
  AddAdminMerchantProducts(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeGood/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改产品信息
  UpdateAdminMerchantProducts(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeGood/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除产品信息
  DeleteAdminMerchantProducts(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeGood/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加线路日程
  AddAdminLinePrepare(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/LinePrepare/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改线路日程
  UpdateAdminLinePrepare(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/LinePrepare/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除线路日程
  DeleteAdminLinePrepare(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/LinePrepare/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询菜单
  AdminProductMenu({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Menu/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminProductMenu', data.data);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加菜单
  addProductMenu({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Menu/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改菜单提交
  updateProductMenuSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Menu/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除菜单
  deleteMenu({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Menu/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //产品特色
  initProductFeatures({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodSpecial/GetGoodSpecialList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initProductFeatures', data.data)
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //产品特色
  initAdminProductFeatures({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodSpecial/GetGoodSpecialList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminProductFeatures', data.data)
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加产品特色
  initAddAdminProductFeaturesObj({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodSpecial/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改产品特色提交
  updateAdminProductFeaturesSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodSpecial/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除特色产品
  deleteAdminProductFeatures({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodSpecial/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
//活动用餐
  initAdminEventDining({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityFood/GetActivityFood', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {

          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminEventDining', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加活动用餐
  initAdminActiveFood({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityFood/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改活动用餐
  updateAdminActiveFoodSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityFood/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除活动用餐
  deleteAdminActiveFood({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityFood/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //活动酒店
  initAdminActiveHotelList({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityHotel/GetActivityHotel', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminActiveHotelList', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加活动酒店
  addAdminActiveHotel({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityHotel/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改活动酒店
  updateAdminActivityHotel({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityHotel/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除活动酒店
  deleteAdminActiveHotel({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityHotel/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化温馨提示数据
  initAdminActiveReminder({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityNotice/GetActivityNotice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminActiveReminder', data.data);
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加温馨提示
  addAdminActiveReminderObj(state, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityNotice/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改温馨提示提交
  updateAdminActiveReminderSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityNotice/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除温馨提示
  deleteAdminActiveReminder({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/ActivityNotice/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
//查询线路费用说明
  initAdminCostsOf({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FeeInfo/GetFeeInfoList', JSON.stringify(data), {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminCostsOf', data.data)
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
//初始化商户营业执照list
  initAdminBusinessLicense({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeLicence/GetTradeLicenceList', JSON.stringify(data), {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminBusinessLicense', data.data);
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
//添加线路费用说明
  AddAdminCostsOf(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FeeInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加营业执照
  addAdminBusinessLicenseSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeLicence/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
  ,
  //修改线路费用说明
  UpdateAdminCostsOf(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FeeInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //修改营业执照
  updateAdminBusinessLicenseSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeLicence/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
  ,
  //删除线路费用说明
  DeleteAdminCostsOf(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FeeInfo/Delete', JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除商户营业执照
  deleteAdminBusinessLicense({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TradeLicence/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
  ,
  //初始化系统总菜单
  initAdminSystemMenu({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/System/GetSystemMenuInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminSystemMenu', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
  ,
  //添加系统总菜单
  AddAdminSystemMenu(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/System/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
  ,
  //修改系统总菜单
  UpdateAdminSystemMenu(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/System/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
  ,
  //删除系统总菜单
  DeleteAdminSystemMenu(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/System/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询评论类型
  initAdminCommentsType(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CommentType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminCommentsType', data.data);
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //根据产品线路查询出发城市
  initDepartureCity({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductPrice/GetLineCity', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initDepartureCity', data.data);
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },
  //初始化产品线路价格
  initAdminLinePrice({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductPrice/GetProductPrice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminLinePrice', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除产品价格
  DeleteAdminLinePrice(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductPrice/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化省
  initProvice({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initProvice', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化城市
  initCityList({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCityList', data.data);
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加产品线路价格
  AddAdminLinePriceSubmit(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductPrice/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //生成座位
  initBuildSeat(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductPrice/MakeSeatNo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },
  //查询出发城市
  initAdminRouteDepartureCity({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/LineCity/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminRouteDepartureCity', data.data)
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加产品线路城市
  AddAdminRouteDepartureCity(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/LineCity/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },
  //修改出发城市
  UpdateAdminRouteDepartureCity(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/LineCity/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除出发城市
  DeleteAdminRouteDepartureCity(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/LineCity/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化供应商信息
  initAdminSupplier({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AgentInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          let resulte = data.data
          for (var i = 0; i < resulte.length; i++) {
            if (resulte[i].sm_ai_CertImage) {
              resulte[i].sm_ai_CertImage = resulte[i].sm_ai_CertImage.split(',')
            } else {
              resulte[i].sm_ai_CertImage = []
            }
            if (data.data[i].sm_ai_OtherImage) {
              resulte[i].sm_ai_OtherImage = resulte[i].sm_ai_OtherImage.split(',')
            } else {
              resulte[i].sm_ai_OtherImage = []
            }
            if (data.data[i].sm_ai_FeeImage) {
              resulte[i].sm_ai_FeeImage = resulte[i].sm_ai_FeeImage.split(',')
            } else {
              resulte[i].sm_ai_FeeImage = []
            }
          }
          commit('initAdminSupplier', data.data)

          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  // //经营范围
  // initChangeScopeOfOperation({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     request.post(getNewStr + '/TradeScope/Select', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         if (Number(data.resultcode) == 200) {
  //           commit('initChangeScopeOfOperation', data.data)
  //           relove()
  //         }else{
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },
  // //公司规模
  // initChangeCompanyType({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     request.post(getNewStr + '/CompanySize/Select', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         if (Number(data.resultcode) == 200) {
  //           commit('initChangeCompanyType', data.data)
  //           relove()
  //         }else{
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },
  //供应商收益
  initAdminPersonalBenefits({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/AgentInfo/Income', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminPersonalBenefits', data.data);
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })

    })
  },
  // //查询结算币种
  // initChangeMineyType({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     request.post(getNewStr + '/BalanceCurrency/Select', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         if (Number(data.resultcode) == 200) {
  //           commit('initChangeMineyType', data.data)
  //           relove(data.data)
  //         }else{
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },
  //类型
  initChangeCooperationType({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CooperationType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initChangeCooperationType', data.data)
            relove()
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改供应商信息
  updateAdminUserInfoSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AgentInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取省
  initProvinceData({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initProvinceData', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //供应商查看审核流程
  initLookList({commit}, data) {
    return new Promise(function (relove, reject) {
        request.post(getNewStr + '/AgentInfo/GetCheckInfo', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
            .then(data => {
              var data = data.data;
              if (Number(data.resultcode) == 200) {
                commit('initLookList', data.data)
                relove()
              }else{
                reject(data.resultcontent)
              }
            })
      })
  },
  initCityData({commit}, data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCityData', data.data)
            relove();
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取县
  initCountyData({commit}, data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCountyData', data.data)
            relove()
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //租车级联城市
  initCarCityPlace({commit},data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CarRentalWebPage/GetCarRentCity', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(item => {
        var resulte = item.data;
        if (Number(resulte.resultcode) == 200) {
          var data = resulte.data;
          let arr1 = [{
            label: 'ABCD',
            value: '1',
            children: []
          }, {
            label: 'EFGHI',
            value: 2,
            children: []
          }, {
            label: 'JKLM',
            value: 3,
            children: []
          }, {
            label: 'NOPQRS',
            value: 4,
            children: []
          }, {
            label: 'TUVWX',
            value: 5,
            children: []
          }, {
            label: 'YZ',
            value: 6,
            children: []
          }
          ];
          for (let attr in data) {
            for (var i = 0; i < arr1.length; i++) {
              if (arr1[i].label == attr) {
                let arr2 = data[attr];
                for (var j = 0; j < attr.length; j++) {
                  arr1[i].children.push({
                    label: attr[j],
                    value: j,
                    children: arr2.filter(item => {
                      if (item.CityFirst == attr[j]) {
                        item.label = item.CityName
                        item.value = item.CityId
                        delete item.CityFirst
                        delete item.CityName
                        delete item.CityId
                        return true;
                      }
                      return false;
                    })
                  })
                }
              }
            }
          }
          commit('initCarCityPlace', arr1)
          relove();
        }
        else {
          reject(resulte.resultcontent);
        }
      })
    })
  },
  //查询地标
  initCarGetCityLandmarkInfo({commit},data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CarRentalWebPage/GetCityLandmark', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          let resulte = data.data;
          let arr = [];

          for(var i=0;i<resulte.length;i++){
            let arr1 = resulte[i].MarkArry;
            arr.push({
              label:resulte[i].AttrName,
              value:resulte[i].AttrId,
              children:[]
            })
            for(var j=0;j<arr1.length;j++){
              arr[i].children.push({
                label:arr1[j].MarkName,
                value:arr1[j].MarkId,
              })
            }
          }
          commit('initCarGetCityLandmarkInfo', arr)
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化
  initEducation({commit}, item) {
    return new Promise((relove, reject) => {
      // request.post(getNewStr + '/Job/Select', JSON.stringify(item), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      request.post(getNewStr + '/Job/Select', JSON.stringify(item), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      // postPromise(getNewStr + '/Job/Select',item)
      .then(data => {
        var resulte = data.data;
        // var resulte = JSON.parse(data);
        if (Number(resulte.resultcode) == 200) {
          switch (item.ui_jb_ParentID){
            case '45':
              //个人资料学历
              commit('initChangeMineyType', resulte.data)
              relove(resulte.data)
              break;
            case '46':
              //公司规模
              commit('initChangeCompanyType', resulte.data)
              relove(resulte.data)
              break;
            case '70':
              //经营范围
              commit('initChangeScopeOfOperation', resulte.data)
              relove(resulte.data)
              break;
          }
        } else {
          reject(resulte.resultcontent)
        }
      })
    })
  },
  //设置合作类型状态
  initSetCooperationType({commit},data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AgentInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          let arr = data.data;
          for(var i=0;i<arr.length;i++){
            switch (arr[i].sm_ai_PPropertyID){
              case 1:
                //餐饮
                commit('setIsFood');
                break;
              case 2:
                //酒店
                commit('setIsHotel');
                break;
              case 3:
                //旅行社
                commit('setIsAgencies');
                break;
              case 4:
                //门票
                commit('setIsTickets');
                break;
              case 5:
                //租车
                commit('setIsCar');
                break;
              case 6:
                //广告
                commit('setIsAdvertising');
                break;
              case 7:
                //微电影
                commit('setIsMovie');
                break;
              default:
                commit('setIsAll')
                break;
            }
          }
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
  AddRecommendedReason(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
  UpdateRecommendedReason(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
  DeleteRecommendedReason(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodInfo/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //查询单个
  initSelectInitAllData(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/GoodInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;

        if (Number(data.resultcode) == 200) {
          relove(data.data)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //------------------------------------------旅行社--------------------------------------------------
  //初始化旅行社
  initTravelAgencyOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTravelAgencyOrder', data.data);
            relove(data.totalrows)
          } else {
            reject(data.resultcontent)
          }
        })

    })
  },
  //确认订单
  confirmTravelAgencyOrder(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/TravelOrder/OutOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取产品类别
  getProductCategory(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/GoodType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //确认订单
  orderTrSubmit(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/TravelOrder/OutOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
}
