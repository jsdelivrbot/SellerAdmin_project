/**
 * Created by leibo on 18/4/25.
 */
// import request from 'request'

import {getNewStr} from '@/assets/js/public'
import request from '@/utils/request'
export default {
  //上传图片
  CarUploadAdminImgs(store,data){
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
  initCarCompanies({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Hertz/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarCompanies',data.data)
          if(data.data.length){
            relove(data.data[0].cr_h_Id)
          }else{
            relove('')
          }

        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加租车公司
  addCarHomeSubmit(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Hertz/Insert',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改租车公司
  UpdateCarHomeSubmit(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Hertz/Update',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //租车门店
  initCarStore({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CRStore/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarStore',data.data);
          relove(Number(data.totalrows))
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //洲
  initCarGreat({commit},data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.data)
        }else{
          reject()
        }
      })
    })
  },
  //添加门店
  AddCarStore(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CRStore/Insert', JSON.stringify(data), {
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
  //修改门店
  UpdateCarStore(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CRStore/Update', JSON.stringify(data), {
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
  //删除门店
  DeleteCarStore(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CRStore/Delete', JSON.stringify(data), {
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
  //所有汽车
  initCarList(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/CRCar/Select', JSON.stringify(data), {
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
  //初始化汽车产品
  initCarProduct({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CarProducts/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarProduct',data.data);
          relove(Number(data.totalrows))
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加汽车产品
  AddCarProduct(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CarProducts/Insert',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改汽车产品
  UpdateCarProduct(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CarProducts/Update',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除汽车产品
  DeleteCarProduct(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CarProducts/Delete',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化公司汽车
  initCarCompanyCar({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CompanyCar/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarCompanyCar',data.data);
          relove(Number(data.totalrows))
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //公司汽车用到所有门店
  initCarCompanyCarStore({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CRStore/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarCompanyCarStore',data.data);
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加公司汽车
  AddCarCompanyCar(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CompanyCar/Insert',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改公司汽车
  UpdateCarCompanyCar(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CompanyCar/Update',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除公司汽车
  DeleteCarCompanyCar(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CompanyCar/Delete',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化优惠政策
  initCarPreferentialPolicies({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Incentives/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarPreferentialPolicies',data.data);
          relove(Number(data.totalrows))
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加优惠政策
  AddCarPreferentialPolicies(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Incentives/Insert',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改优惠政策
  UpdateCarPreferentialPolicies(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Incentives/Update',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除优惠政策
  DeleteCarPreferentialPolicies(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/Incentives/Delete',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //租车查询订单
  initCarOrderDetails({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CROrder/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initCarOrderDetails',data.data)
          relove(Number(data.totalrows))
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //租车确认订单
  CarConfirmOrder(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/CROrder/OutOrder',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  }
}
