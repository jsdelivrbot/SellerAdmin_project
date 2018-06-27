<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">视频管理(已审核)</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="small">
          <el-form-item>
            <span>视频:</span>
            <el-input type="text" v-model="movieName" auto-complete="off" placeholder="视频名称" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="VMovieVideoList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
              <el-form-item label="视频编号:">
                <span>{{props.row.vf_vo_ID}}</span>
              </el-form-item>
              <el-form-item label="时长:">
                <span>{{props.row.vf_vo_Time}}</span>
              </el-form-item>
              <el-form-item label="大小:">
                <span>{{props.row.vf_vo_Size}}</span>
              </el-form-item>
              <el-form-item label="分类:" :label-width="formLabelWidth">
                <span>{{props.row.vf_te_IDNames}}</span>
              </el-form-item>
              <el-form-item label="文件扩展名:">
                <span>{{props.row.vf_vo_Extend}}</span>
              </el-form-item>
              <el-form-item label="视频:">
                <video :src="props.row.vf_vo_FileURL" width="320" height="240" controls="controls"></video>
              </el-form-item>
              <el-form-item label="作者:">
                <span>{{props.row.vf_vo_AuthorName}}</span>
              </el-form-item>
              <el-form-item label="视频类型:">
                <span>{{props.row.vf_vo_TypeName}}</span>
              </el-form-item>
              <el-form-item label="标题:">
                <span>{{props.row.vf_vo_Title}}</span>
              </el-form-item>
              <el-form-item label="视频图片:">
                <img :src="props.row.vf_vo_ImageURL" alt="" style="width: 100px;height: 100px">
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{props.row.vf_vo_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="审核人编码:">
                <span>{{props.row.vf_vo_PasserID}}</span>
              </el-form-item>
              <el-form-item label="审核时间:">
                <span>{{props.row.vf_vo_ValidateTime}}</span>
              </el-form-item>
              <el-form-item label="简介:">
                <span>{{props.row.vf_vo_Introduce}}</span>
              </el-form-item>
              <el-form-item label="详情:">
                <span>{{props.row.vf_vo_Remark}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="视频编号"
          prop="vf_vo_ID">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="vf_vo_AuthorName">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="vf_vo_Title">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改(需审核)
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.vf_vo_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="5"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>

      <!--修改-->
      <el-dialog title="修改" :visible.sync="updateDialog">
        <el-form :model="VMovieVideoUpdateObj">

          <el-form-item label="视频编号:" :label-width="formLabelWidth">
            <el-input v-model="VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_ID" placeholder="视频编号"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="电影类型筛选:" :label-width="formLabelWidth">
            <el-select v-model="parentTypeId" multiple placeholder="请选择电影类型" @change="updateParentChange">
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID"
                         v-for="item in VMovieTypeList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth">
            <el-select v-model="categoriesName" multiple placeholder="请选择分类名称">
              <el-option
                v-for="item in VMovieChildTyeList"
                :key="item.vf_te_ID"
                :label="item.vf_te_Name"
                :value="item.vf_te_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首页大图:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">
              视频图片上传
              <input type="file" name="" ref="bigImgUpload" accept="image/*">
            </a>
            <img v-lazy="updateBigImg"
                 v-show="updateBigImg"
                 style="width: 100px;height: 100px">
          </el-form-item>
          <el-form-item label="视频图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">
              视频图片上传
              <input type="file" name="" ref="imgUpload" accept="image/*">
            </a>
            <img v-lazy="updateFilmImg"
                 v-show="updateFilmImg"
                 style="width: 100px;height: 100px">
          </el-form-item>
          <el-form-item label="上传视频:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">上传视频
              <input type="file" name="" ref="upload" multiple>
            </a>
            <video id="addVideo" :src="updateFilm" width="320" height="240"
                   controls="controls"></video>
          </el-form-item>
          <el-form-item size="large" :label-width="formLabelWidth">
            <el-button type="primary" size="mini" @click="uploadFilm">立即上传</el-button>
          </el-form-item>
          <!--          <el-form-item label="作者:" :label-width="formLabelWidth">
                      <el-input v-model="VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_AuthorID" placeholder="作者"></el-input>
                    </el-form-item>-->
          <!--          <el-form-item label="视频类型:" :label-width="formLabelWidth">
                      <el-input v-model="VMovieVideoUpdateObj.data.vf_ve_Type" placeholder="视频类型"></el-input>
                    </el-form-item>-->
          <el-form-item label="标题:" :label-width="formLabelWidth">
            <el-input v-model="VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="简介:" :label-width="formLabelWidth">
            <el-input v-model="VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Introduce" placeholder="简介"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {

    data() {
      return {
        //父分类列表
        list1: [],
        //子分类列表
        list2: [],
        videoData: {
          "vedioName": ''
        },
        //是否禁用
        isVisible: false,
        isDisabled: true,
        //修改
        updateDialog: false,
        ImageURL: '',
        //修改首页大图播放data
        updateBigImg: '',
        //修改视频图片播放data
        updateFilmImg: '',
        //修改视频播放data
        updateFilm: '',
        //当前页
        num: '',
        parentTypeId: [],
        categoriesName: [],
        ImageURL1: [],
        filmTypeList: [],
        updateAObj: {parentList: [], childList: []},
        //数据展示
        isLoading: false,
        //分页
        total: 0,
        //查询
        movieName: '',
        //表单宽度
        formLabelWidth: '120px',
        VMovieVideoUpdateObj: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_ve_Type": "",//视频类型1广告2微电影3教育
            "vf_ve_Content": {  //审核表内容
              "vf_vo_ID": "",//视频编号（添加视频时传空，修改视频时传入视频编号）
              "vf_vo_Time": "",  //时长（秒）
              "vf_vo_Size": "",  //大小（MB）
              "vf_vo_Extend": "",  //文件扩展名
              "vf_vo_FileURL": "",  //文件地址
              "vf_vo_AuthorID": "22",  //作者
              "vf_vo_Title": "",  //标题
              "vf_vo_ImageURL": "",  //视频图片
              "vf_vo_TomImageURL": "",  //首页大图
              "vf_vo_CreateTime": "",  //创建时间
              "vf_vo_Introduce": "",  //简介
              "vf_vo_Remark": "",  //详情
              "vf_te_IDs": ""
            }
          }
        },
      }
    },
    computed: mapGetters([
      'VMovieChildTyeList',
      'VMovieParentTypeList',
      'VMovieVideoList',
      'VMovieChildTyeList2',
      'UploadVideoList',
      'VMovieTypeList',
    ]),

    created() {
      this.initData();
      this.intTypeData();
    },
    methods: {
      intTypeData(typeName, typeParentName) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": typeName ? typeName : "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentIDs": typeParentName ? typeParentName : "0",//分类编号父编号
        };
        this.$store.dispatch("initVMovieSorting", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      parentChange() {
//        this.parentTypeId=this.VMovieTypeList.join(',');
        this.childTypeData(this.parentTypeId);
        this.isVisible = true;
      },
      updateParentChange() {
        this.childTypeData(this.parentTypeId.join(','));
      },
      childTypeData(typeParentName) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentIDs": typeParentName ? typeParentName : "0",//分类编号父编号
        };
        this.$store.dispatch("childTypeData", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      childTypeData2(typeParentName) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentIDs": typeParentName ? typeParentName : "0",//分类编号父编号
        };
        this.$store.dispatch("childTypeData2", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      uploadFilm() {
        //获取上传日期
        var fd = new FormData();
        //获取文件
        var file = this.$refs.upload.files[0];
        //如果文件存在
        if (file) {
          //获取文件大小
          var fileSize = file.size;
          fileSize = parseInt(fileSize / 1024 * 100 / 100); //单位为KB
          this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Size = fileSize;
          var str = file.name;
          //获取文件名
          this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Extend = str.split(".")[1];
          fd.append("fileUploadOss", file);
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200)
              if (xhr.responseText) {
                let preData = JSON.parse(xhr.responseText).data;
                this.videoData.vedioName = preData;
                this.$store.dispatch("UploadVideo", this.videoData)
                  .then((suc) => {
                    this.$notify({
                      message: suc,
                      type: "success"
                    }),
                      this.percentage = 100,
                      this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_FileURL = this.UploadVideoList;
                    //获取时长
                    var e = document.getElementById("addVideo");
                    setTimeout(() => {
                      if (isNaN(e.duration)) {
                        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Time = '';
                      } else {
                        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Time = parseInt(e.duration).toString();
                      }
                    }, 1000);
                  }, (err) => {
                    this.$notify({
                      message: err,
                      type: "error"
                    });
                  });
              }
          };
          xhr.open("POST", getNewStr+"/OSSFile/PostToOSS");
          xhr.send(fd);
        } else {
          alert("请选择上传视频")
        }
        ;
      },
      //分页
      handleCurrentChange(num) {
        this.initData('', num);
        this.num = num;
      },
      initData(title, page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_vo_ID": "",//视频编号
          "vf_vo_Extend": "",//文件扩展名
          "vf_vo_AuthorID": JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',//作者
          "vf_vo_Type": "",//视频类型
          "vf_vo_Title": title ? title : "",//标题
          "vf_vo_PasserID": "",//审核人编码
          "page": page ? page : 1,//页码
          "rows": 5//条数
        };
        this.$store.dispatch("initVMovieVideo", options)
          .then((data) => {
            this.total = data.totalRows;
            for (let fiveList in this.VMovieVideoList) {
              this.videoData.vedioName = this.VMovieVideoList[fiveList].vf_vo_FileURL;
              this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_FileURL = this.UploadVideoList;
            };
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //搜索
      search() {
        this.initData(this.movieName);
      },
      //搜索系列
      searchSeries(name, page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_ss_ID": "",//系列编号
          "vf_ss_Name": name ? name : "",//系列名称
          "vf_ss_WriteState": "",//连载状态（0连载中1完结)
          "vf_ss_AuthorID": "",//作者
          "page": page ? page : 1,//页码
          "rows": 5//条数
        };
        this.$store.dispatch("initVMovieSeries", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //添加
      Add() {
        this.searchSeries('', '', '', 1);
        for (let i in this.addOptions.data) {
          this.addOptions.data[i] = ""
        }
        ;
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit() {
        this.$store.dispatch("addVMovieVideoSeries", this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            })
            this.initData('', 1)
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
        this.addDialog = false;
      },
      //上传图片
      uploadToOSS(file) {
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr+"/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText;
                relove(JSON.parse(data))
              }
            }else{
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      //图片上传
      uploadNode() {
        this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = '';
        setTimeout(() => {
          //新增图片上传
          if (this.$refs.addFilmImg) {
            this.$refs.addFilmImg.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.addFilmImg.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('UploadnImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.addFilmImg.files[i])
                  .then(data => {
                    this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = "";
                    if (data) {
                      this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = data.data;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                // })
              }
            })
          }
          //新增首页大图上传
          if (this.$refs.addBigImgUpload) {
            this.$refs.addBigImgUpload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.addBigImgUpload.files.length; i++) {
                this.uploadToOSS(this.$refs.addBigImgUpload.files[i])
                  .then(data => {
                    if (data) {
                      this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL =data.data;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
              }
            })
          }
          //修改图片上传
          if (this.$refs.updateFilmImg) {
            this.$refs.updateFilmImg.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.updateFilmImg.files.length; i++) {
                this.uploadToOSS(this.$refs.updateFilmImg.files[i])
                  .then(data => {
                    if (data) {
                      this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ImageURL=data.data;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                // })
              }
            })
          }
          //修改首页大图上传,updateBigImg,vf_vo_TomImageURL
          if (this.$refs.updateBigImg) {
            this.$refs.updateBigImg.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.updateBigImg.files.length; i++) {
                this.uploadToOSS(this.$refs.updateBigImg.files[i])
                  .then(data => {
                    if (data) {
                      this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL=data.data;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                // })
              }
            })
          }
        }, 30)
      },
      //修改视频上传
      uploadFileUpdate() {
        //清空视频文件

        var fd = new FormData();
        //获取要上传的视频
        var file =this.$refs.updateFilm.files[0];
        if(file){
          //获取最新文件大小
          var fileSize = file.size;
          fileSize=parseInt(fileSize/1024*100/100); //单位为KB
          this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Size=fileSize;
          var str =file.name;
          //获取最新文件扩展名
          this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Extend=str.split(".")[1];
          fd.append("fileToUpload",file);
          file.xhr =new XMLHttpRequest();
          file.xhr.onreadystatechange = ()=>{
            if (file.xhr.readyState == 4 && file.xhr.status == 200)
              if(file.xhr.responseText){
                //上传成功后返回的视频地址
                let filmData= JSON.parse(file.xhr.responseText).data;
                //给视频赋值
                this.updateFilm=filmData;
                this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_FileURL=this.updateFilm;
                //获取时长
                var e =document.getElementById("addVideo1");
                setTimeout(()=>{
                  if(isNaN(e.duration)){
                    this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Time = '';
                  }else{
                    this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Time = parseInt(e.duration).toString();
                  }
                },1000);
              }
          };
          file.xhr.open("POST", getNewStr+"/OSSFile/PostToOSS",true);
          file.xhr.send(fd);
          //上传成功后获取最新创建时间
          Date.prototype.Format = function (fmt) {
            var o = {
              "M+": this.getMonth() + 1, //月份
              "d+": this.getDate(), //日
              "h+": this.getHours(), //小时
              "m+": this.getMinutes(), //分
              "s+": this.getSeconds(), //秒
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度
              "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
          };
          this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_CreateTime = new Date().Format("yyyy/MM/dd hh:mm:ss");
        }else {
          alert("请选择上传视频")
        };
      },
      //删除
      Delete(id) {
        let deleteOption = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "vf_vo_ID": id,//
          }
        };
        this.$store.dispatch('DeleteVMovieVideo', deleteOption)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.movieType,this.num);
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            })
      },
      //修改
      Update(obj) {
        /**
         * 清空
         * */
        this.parentTypeId=[];
        this.categoriesName=[];
        console.log(1,obj)
        /**
         * 修改初始化显示部分赋值
         * */
//        视频编号
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_ID=obj.vf_vo_ID;
//        电影类型
        for (let i = 0; i < obj.vf_vo_Type.split(",").length; i++) {
          this.parentTypeId.push(Number(obj.vf_vo_Type.split(",")[i]));
        }
//        分类名称
        this.childTypeData(obj.vf_vo_Type);//根据父分类显示子分类数据
        for (let i = 0; i < obj.vf_te_IDs.split(",").length; i++) {
          this.categoriesName.push(Number(obj.vf_te_IDs.split(",")[i]));
        }
//        首页大图
        this.updateBigImg=obj.vf_vo_ImageURL;
//        视频图片
        this.updateFilmImg=obj.vf_vo_TomImageURL;
//        视频
        this.updateFilm=obj.vf_vo_FileURL;
//        标题
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Title=obj.vf_vo_Title;
//        简介
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Introduce=obj.vf_vo_Introduce;
//        备注
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Remark=obj.vf_vo_Remark;

        /**
         * 修改未显示部分(不用初始化赋值)(没有修改时也要传)
         * */
//        视频类型(新增的时候才需要,修改时其实是定死的传2,微电影)
        this.VMovieVideoUpdateObj.data.vf_ve_Type=obj.vf_ve_Type;
//        创建时间(未修改时)
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_CreateTime = obj.vf_vo_CreateTime;
//        作者(未修改时)
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_AuthorID=obj.vf_vo_AuthorID;
//        文件地址(未修改时)
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_FileURL = obj.vf_vo_FileURL;
//        文件扩展名(未修改时)
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Extend = obj.vf_vo_Extend;
//        大小(未修改时)
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Size = obj.vf_vo_Size;
//        时长(未修改时)
        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Time = obj.vf_vo_Time;




//        this.parentTypeId=[];
//        this.categoriesName=[];
//        this.uploadNode();
//        this.childTypeData(obj.vf_vo_Type);
//        for (let i = 0; i < obj.vf_te_IDs.split(",").length; i++) {
//          this.categoriesName.push(Number(obj.vf_te_IDs.split(",")[i]));
//        }
//        for (let i = 0; i < obj.vf_vo_Type.split(",").length; i++) {
//          this.parentTypeId.push(Number(obj.vf_vo_Type.split(",")[i]));
//        }
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_te_IDs=this.categoriesName.join(",");
//        this.VMovieVideoUpdateObj.data.vf_ve_Type = obj.vf_vo_Type;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Title = obj.vf_vo_Title;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Introduce = obj.vf_vo_Introduce;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Remark = obj.vf_vo_Remark;
//        this.videoData.vedioName = obj.vf_vo_FileURL;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_ID=obj.vf_vo_ID;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Time = obj.vf_vo_Time;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Size = obj.vf_vo_Size;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_Extend = obj.vf_vo_Extend;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_FileURL = obj.vf_vo_FileURL;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_AuthorID=obj.vf_vo_AuthorID;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_ImageURL = obj.vf_vo_ImageURL;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL = obj.vf_vo_TomImageURL;
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_CreateTime = obj.vf_vo_CreateTime;
//        this.$store.dispatch("UploadVideo", this.videoData);
//        this.VMovieVideoUpdateObj.data.vf_ve_Content.vf_vo_FileURL = this.UploadVideoList;
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //修改提交
      updateSubmit() {
        /**
         * 修改之后的值
         * */

        this.$store.dispatch("updateVMovieVideo", this.VMovieVideoUpdateObj)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.movieType,this.num);
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            });
        this.updateDialog = false;
      },
    }
  }

</script>
<style scoped>
</style>
