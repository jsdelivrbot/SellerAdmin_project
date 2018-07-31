/**
 * Created by liuxiang on 18/05/03.
 */
// import request from 'request'
import request from '@/utils/request'

import {getNewStr} from '@/assets/js/public'

export default {
  /************************************************微电影审核表********************************************************************/
  //初始化（查询）审核表
  initVMovieCheckTable({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Validate/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieCheckTable', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化（查询）微电影分类
  initVMovieSorting({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Type/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieSorting', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  childTypeData({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Type/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('childTypeData', data.data2)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  childTypeData2({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Type/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('childTypeData2', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加审核表
  addVMovieCheckTable(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Validate/Insert', JSON.stringify(data), {
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
  //上传图片
  UploadnImgs(store, data) {
    //图片上传
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
  //上传视频
  UploadVideo({commit},data){
    return new Promise((relove,reject)=>{
      request.post('http://image.1000da.com.cn/PostImage/VedioURL', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('UploadVideo', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //删除审核表
  DeleteVMovieCheckTable(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Validate/Delete', JSON.stringify(data), {
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

  //修改审核表
  updateVMovieCheckTable(store,data){
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Validate/Update', JSON.stringify(data), {
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
  /************************************************微电影系列********************************************************************/
  //初始化（查询）微电影系列
  initVMovieSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Series/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieSeries', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加微电影系列
  addVMovieSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Series/Insert', JSON.stringify(data), {
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
  //删除微电影系列
  DeleteVMovieSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Series/Delete', JSON.stringify(data), {
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
  //修改为电影系列
  updateVMovieSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Series/Update', JSON.stringify(data), {
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
  /************************************************微电影视频系列********************************************************************/
  //初始化（查询）微电影视频系列
  initVMovieVideoSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FilmSeries/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieVideoSeries', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加视频系列
  addVMovieVideoSeries(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FilmSeries/Insert', JSON.stringify(data), {
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

  //修改微电影视频系列
  updateVMovieVideoSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FilmSeries/Update', JSON.stringify(data), {
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

  //删除微电影系列
  DeleteVMovieVideoSeries({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/FilmSeries/Delete', JSON.stringify(data), {
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
  /************************************************微电影视频********************************************************************/
  //初始化（查询）微电影视频
  initVMovieVideo({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Vedio/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
            commit('initVMovieVideo', data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //删除微电影视频
  DeleteVMovieVideo(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Vedio/Delete', JSON.stringify(data), {
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

  //修改为电影视频
  updateVMovieVideo(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Validate/Insert', JSON.stringify(data), {
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
  /************************************************微电影微电影********************************************************************/

  //初始化（查询）微电影微电影
  initVMovieMiniMovie({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Film/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieMiniMovie', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //删除微电影微电影
  DeleteVMovieMiniVideo(store, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Film/Delete', JSON.stringify(data), {
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

  /************************************************微电影视频分类********************************************************************/

  //初始化（查询）微电影视频分类
    initVMovieVideoCategories({commit}, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/VedioType/Select', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(Number(data.totalRows));
          commit('initVMovieVideoCategories', data.data)
        } else {
          reject(data.resultcontent)
        }
      })
  })
},
  /************************************************微电影视频********************************************************************/
  //初始化（查询）微电影视频
  initVMovieVideo({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Vedio/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
            commit('initVMovieVideo', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //删除微电影视频
    DeleteVMovieVideo(store, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/Vedio/Delete', JSON.stringify(data), {
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

/*  //修改为电影视频
    updateVMovieVideo(store, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/Vedio/Update', JSON.stringify(data), {
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
},*/

  /************************************************微电影系列分类********************************************************************/

  //初始化（查询）微电影系列分类
  initVMovieSeriesCategories({commit}, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/SeriesType/Select', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(Number(data.totalRows));
          commit('initVMovieSeriesCategories', data.data)
        } else {
          reject(data.resultcontent)
        }
      })
  })
},

  //添加视频系列
  addVMovieSeriesCategories(store, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/SeriesType/Insert', JSON.stringify(data), {
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

  //删除微电影视频
    DeleteVMovieSeriesCategories(store, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/SeriesType/Delete', JSON.stringify(data), {
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

  //修改为电影视频
    updateVMovieSeriesCategories(store, data) {
  return new Promise(function (relove, reject) {
    request.post(getNewStr + '/SeriesType/Update', JSON.stringify(data), {
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
  /************************************************微电影分类********************************************************************/
  //初始化（查询）微电影分类
  initVMovieSorting({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Type/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieSorting', data.data2)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //查询微电影父分类
  initVMovieParentSorting({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Type/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieParentSorting', data.data2)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

}
