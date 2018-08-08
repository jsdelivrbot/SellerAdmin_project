// import request from 'request'
// import {postPromise} from '@/assets/js/public'
// import {adminSupplier} from '@/api/agencies'

import {getNewStr} from '@/assets/js/public'
import request from '@/utils/request'
export default {
  //美食房间图片上传
  foodUploadAdminImgs(store, data) {
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
  //用餐人数
  initNumberOfMeals({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Property/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initNumberOfMeals', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //店面类型
  initStorefrontType({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Property/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initStorefrontType', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  initThreeMeals({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Property/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initThreeMeals', data.data);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //省
  initFoodProcince({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initFoodProcince', data.data);
            relove()
          } else {
            reject()
          }
        })
    })
  },
  //市
  initFoodCity({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initFoodCity', data.data);
            relove()
          } else {
            reject()
          }
        })
    })
  },
  //店面信息
  initFoodStoreInformtionAction({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/StoreFront/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initFoodStoreInformtionAction', data.data);
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  initFoodStoreInformtion({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/StoreFront/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            commit('initFoodStoreInformtion', data.data);
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面信息
  addFoodStoreInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/StoreFront/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面信息
  updateFoodStoreInformtionSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/StoreFront/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面信息
  deleteFoodStoreInformtion({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/StoreFront/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //店面房间
  initFoodStoreRoom({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontRoom/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreRoom', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面房间
  addFoodStoreRoom({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontRoom/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面房间
  updateFoodStoreRoom({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontRoom/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面房间
  deleteFoodStoreRoom({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontRoom/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode == 200)) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化店面产品
  initFoodStoreProduct({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontProduct/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows));
            commit('initFoodStoreProduct', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面菜肴
  addFoodStoreProduct({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontProduct/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面菜肴
  updateFoodStoreProduct({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontProduct/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面菜肴
  deleteFoodStoreProduct({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/StoreFrontProduct/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化店面房间图片
  initFoodRoomPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomImage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodRoomPicture', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面房间图片
  addFoodRoomPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomImage/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面房间图片
  updateFoodRoomPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomImage/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面房间图片
  deleteFoodRoomPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomImage/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //店面图片
  initFoodProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductImage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodProductPicture', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面图片
  addFoodProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductImage/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面图片
  updateFoodProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductImage/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面图片
  deleteFoodProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/ProductImage/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //房间餐桌
  initFoodStoreRoomTabel({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTable/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreRoomTabel', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加房间餐桌
  addFoodStoreRoomTabel({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTable/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改房间餐桌
  updateFoodStoreRoomTabel({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTable/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除房间餐桌
  deleteFoodStoreRoomTabel({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTable/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //推荐菜
  initFoodStoreRecommend({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/IntroduceFood/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreRecommend', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加推荐菜
  addFoodStoreRecommend({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/IntroduceFood/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除推荐菜
  deleteFoodStoreRecommend({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/IntroduceFood/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //店面每天可锁桌时间
  initFoodStoreTableTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CanLockTime/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreTableTime', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面每天可锁桌时间
  addFoodStoreTableTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CanLockTime/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面每天可锁桌时间
  updateFoodStoreTableTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CanLockTime/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面每天可锁桌时间
  deleteFoodStoreTableTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CanLockTime/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询可订餐时间
  initFoodStoreOrderingTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTableTime/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreOrderingTime', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加可订餐时间
  addFoodStoreOrderingTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTableTime/CanOrderTime', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除可订餐时间
  deleteFoodStoreOrderingTime({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/RoomTableTime/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },


  //查询停车场
  initFoodStoppingPlace({commit},data){
    return new Promise(
      (relove,reject)=>{
        request.post(getNewStr + '/StopCar/Select', JSON.stringify(data), {
          headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        })
          .then(data=>{
            var data = data.data;
            if(Number(data.resultcode)==200){
              relove(Number(data.totalrows));
              commit('initFoodStoppingPlace',data.data)
            }
            else{
              reject(data.resultcontent)
            }
          })
      }
    )
  },
//添加停车场
  addFoodStoppingPlace({commit},data){
    return new Promise((relove,reject)=>{
      request.post(getNewStr + '/StopCar/Insert',JSON.stringify(data),{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(data=>{
          var data = data.data;
          if(Number(data.resultcode==200)){
            relove(data.resultcontent);
          }
          else{
            reject(data.resultcontent);
          }
        });
    });
  },
//删除停车场
  deleteFoodStoppingPlace({commit},data){
    return new Promise((relove,reject)=>{
      request.post(getNewStr + '/StopCar/Delete',JSON.stringify(data),{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(data=>{
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else{
            reject(data.resultcontent);
          }
        })
    })
  },
//修改停车场
  updateFoodStoppingPlace({commit},data){
    return new Promise((relove,reject)=>{
      request.post(getNewStr + '/StopCar/Update',JSON.stringify(data),{
        headers:{'Content-Type':'application/x-www-form-urlencoded'
        }
      })
        .then((data)=>{
          var data = data.data;
          if(Number(data.resultcode==200)){
            relove(data.resultcontent)
          }
          else{
            reject(data.resultcontent)
          }
        });
    });
  },
  //查询订单
  initFoodStoreConfirnOrder({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Order/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreConfirnOrder', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //确认订单
  foodOrderOk({commit},data){
    return new Promise((relove,reject)=>{
      request.post(getNewStr + '/Order/SureOrderInfo',JSON.stringify(data),{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.resultcode==200)){
            relove(data.resultcontent);
          }
          else{
            reject(data.resultcontent);
          }
        });
    });
  },
  //注销订单
  deleteFoodStoreConfirnOrder({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Order/CancelFoodOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //店面菜肴图片
  initFoodStoreProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/GoodImage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
            commit('initFoodStoreProductPicture', data.data)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加店面菜肴图片
  addFoodStoreProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/GoodImage/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改店面菜肴图片
  updateFoodStoreProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/GoodImage/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除店面菜肴图片
  deleteFoodStoreProductPicture({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/GoodImage/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //申请推荐店面
  recommendShopSubmit({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/IntroduceShop/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //申请首页展示美食
  applyRecommendFood({commit}, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/PageIntroduce/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          }
          else {
            reject(data.resultcontent)
          }
        })
    })
  },
}

