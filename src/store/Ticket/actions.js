/**
 * Created by leibo on 18/3/29.
 */
import axios from 'axios'
import {postPromise} from '@/assets/js/public'
import {adminSupplier} from '@/api/agencies'

export default {
  //查询景点主题分类信息
  initThemeType({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TmThemeType/GetThemeTypeList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows));
            commit('initThemeType', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化商家景点信息
  initTicketAttractions({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/TourSite/GetTourSite', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].tm_ts_IsHot == 0) {
                data.data[i].tm_ts_IsHot = '普通'
              }
              if (data.data[i].tm_ts_IsHot == 1) {
                data.data[i].tm_ts_IsHot = '热门'
              }
              if (data.data[i].tm_ts_IsOversea == 0) {
                data.data[i].tm_ts_IsOversea = '境内'
              }
              if (data.data[i].tm_ts_IsOversea == 1) {
                data.data[i].tm_ts_IsOversea = '境外'
              }
              if (data.data[i].tm_ts_IsSeasonChoice == 0) {
                data.data[i].tm_ts_IsSeasonChoice = '否'
              }
              if (data.data[i].tm_ts_IsSeasonChoice == 1) {
                data.data[i].tm_ts_IsSeasonChoice = '是'
              }
              if (data.data[i].tm_ts_ShowTop == 0) {
                data.data[i].showTopLabel = '申请展示在首页'
              }
              if (data.data[i].tm_ts_ShowTop == 1) {
                data.data[i].showTopLabel = '取消展示在首页'
              }
            }
            commit('initTicketAttractions', data.data);
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加景点信息
  addTicletInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TourSite/Insert', JSON.stringify(data), {
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
  //洲
  initTicketGreat({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketGreat', data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //国家
  initTicketCountrie({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketCountrie', data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //省
  initTicketProvice({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketProvice', data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //市
  initTicketCity({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketCity', data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //县
  initTicketContry({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketContry', data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改景点信息
  updateTicketAttractionsSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TourSite/Update', JSON.stringify(data), {
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
  //删除景点信息
  deleteTicketAttractions({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TourSite/Delete', JSON.stringify(data), {
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
        });
    })
  },
  //初始化预定须知数据
  initPredeterminedInstructions({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/BookKnow/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initPredeterminedInstructions', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        });
    })
  },
  //添加预定须知
  addPredeterminedInstructionsSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/BookKnow/Insert', JSON.stringify(data), {
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
  //修改预定须知
  updatePredeterminedInstructionsSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/BookKnow/Update', JSON.stringify(data), {
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
  //初始化交通信息
  initTrafficInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Transport/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTrafficInformation', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        });
    })
  },
  //添加交通信息
  addTrafficInformationSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Transport/Insert', JSON.stringify(data), {
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
  //修改交通信息
  updateTrafficInformationSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Transport/Update', JSON.stringify(data), {
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
  //删除交通信息
  deleteTrafficInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Transport/Delete', JSON.stringify(data), {
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
        });
    })
  },
  //初始化票种类型
  initTicketType({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketType', data.data);
            relove(Number(data.totalRows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加票种类型
  addTicketTypeSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketType/Insert', JSON.stringify(data), {
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
  //修改票种类型
  updateTicketTypeSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketType/Update', JSON.stringify(data), {
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
  //删除票种类型
  deleteTicketType({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketType/Delete', JSON.stringify(data), {
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
        });
    })
  },
  //初始化票种票价
  initTicketTypeTicketPrice({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketTypePrice/GetTicketTypePriceList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketTypeTicketPrice', data.data)
            relove(Number(data.totalRows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加票种票价
  addTicketTypeTicketPriceSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketTypePrice/Insert', JSON.stringify(data), {
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
  //删除提交
  deleteTicketTypeTicketPriceSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TicketTypePrice/Delete', JSON.stringify(data), {
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
        });
    })
  },
  //查询商户订单
  initTicketQueryOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TmOrder/GetOrderInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //数据处理
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].tm_or_OutStatus == 0) {
                data.data[i].tm_or_OutStatus = '出票中'
              }
              if (data.data[i].tm_or_OutStatus == 1) {
                data.data[i].tm_or_OutStatus = '已出票'
              }
              if (data.data[i].tm_or_UseState == 0) {
                data.data[i].tm_or_UseState = '未使用'
              }
              if (data.data[i].tm_or_UseState == 1) {
                data.data[i].tm_or_UseState = '已使用'
              }
              if (data.data[i].tm_or_PayState == 0) {
                data.data[i].tm_or_PayState = '未支付'
              }
              if (data.data[i].tm_or_PayState == 1) {
                data.data[i].tm_or_PayState = '已支付'
              }
              if (data.data[i].tm_or_IsBalance == 0) {
                data.data[i].tm_or_IsBalance = '未结算'
              }
              if (data.data[i].tm_or_IsBalance == 1) {
                data.data[i].tm_or_IsBalance = '已结算'
              }
            }

            commit('initTicketQueryOrder', data.data);

            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //申请展示首页
  applyShowHomePage({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TourSite/IsShowTop', JSON.stringify(data), {
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
  //确认订单
  ticketConfirmOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/TmOrder/ReSureOrder',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //导览
  initTicketMap({commit},data){
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Site/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initTicketMap',data.data)
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  }
}
