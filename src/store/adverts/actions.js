/**
 * Created by LiuXiang on 18/04/09.
 */
// import axios from "axios";

export default {
  /********************************************广告申请*********************************************************/
  //查询所有广告类型数据
  initAdTypeAllList({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/AdviertiseType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initAdTypeAllList', data.data)
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //查询所有广告位置信息
  initAdPositionAll({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/PositionInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdPositionAll', data.data)
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询广告申请
  initAdApply({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/ApplayAdv/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            var resulte = data.data;
            for (var i = 0; i < resulte.length; i++) {
              resulte[i].sm_aa_Images = resulte[i].sm_aa_Image.split(',')
            }
            commit('initAdApply', resulte)
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //广告申请上传图片
  adApplyUploadAdminImgs(store, data) {
    //图片上传
    return new Promise((relove, reject) => {
      axios.post('http://image.1000da.com.cn/PostImage/PostToService', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          relove(data.data)
        })
    })
  },
  //添加广告申请
  AddAdApply(store, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/ApplayAdv/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改广告申请
  UpdateAdApplyObj(store, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/ApplayAdv/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除广告申请
  DeleteAdApply(store, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/ApplayAdv/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  }
}
