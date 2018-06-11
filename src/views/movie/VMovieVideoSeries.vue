<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">视频系列</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="small">
          <el-form-item label="电影类型筛选:">
            <el-select v-model="movieType" placeholder="请选择电影类型">
              <el-option label="微电影" value="0"></el-option>
              <el-option label="广告视频" value="1"></el-option>
              <el-option label="教育视频" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="Add">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="VMovieVideoSeries"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="视频系列编码"
          prop="vf_fs_ID">
        </el-table-column>
        <el-table-column
          label="系列名称"
          prop="vf_ss_Name">
        </el-table-column>
        <el-table-column
          label="视频名称"
          prop="vf_vo_Title">
        </el-table-column>
        <el-table-column
          label="第几集"
          prop="vf_fs_Level">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.vf_fs_ID)">删除
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

      <!--添加-->
      <el-dialog title="添加" :visible.sync="addDialog">
        <el-form :model="addOptions">

          <el-form-item label="系列名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.vf_fs_SeriesID" placeholder="请选择系列名称" style="width:400px">
              <el-option
                v-for="item in VMovieSeries"
                :key="item.vf_ss_ID"
                :label="item.vf_ss_Name"
                :value="item.vf_ss_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视频名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.vf_fs_VedioID" placeholder="请选择视频名称"  style="width:400px">
              <el-option
                v-for="item in VMovieVideoList"
                :key="item.vf_vo_ID"
                :label="item.vf_vo_Title"
                :value="item.vf_vo_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="第几集:" :label-width="formLabelWidth" style="width:300px">
            <el-input v-model="addOptions.data.vf_fs_Level" placeholder="第几集(只能输数字)"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改" :visible.sync="updateDialog">
        <el-form :model="VMovieVideoSeriesUpdateObj">

          <el-form-item label="视频系列编码:" :label-width="formLabelWidth">
            <el-input v-model="VMovieVideoSeriesUpdateObj.data.vf_vt_ID" placeholder="视频系列编码" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="系列名称:" :label-width="formLabelWidth">
            <el-select v-model="VMovieVideoSeriesUpdateObj.data.vf_fs_SeriesID" placeholder="请选择系列名称">
              <el-option
                v-for="item in VMovieSeries"
                :key="item.vf_ss_ID"
                :label="item.vf_ss_Name"
                :value="item.vf_ss_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视频标题:" :label-width="formLabelWidth">
            <el-select v-model="VMovieVideoSeriesUpdateObj.data.vf_fs_VedioID" placeholder="请选择视频标题">
              <el-option
                v-for="item in VMovieVideoList"
                :key="item.vf_vo_ID"
                :label="item.vf_vo_Title"
                :value="item.vf_vo_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="第几集:" :label-width="formLabelWidth">
            <el-input v-model="VMovieVideoSeriesUpdateObj.data.vf_fs_Level" placeholder="第几集"></el-input>
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
        //当前页
        num:'',
        //是否禁用
        isDisabled: true,
        //修改
        updateDialog: false,
        ImageURL: '',
        ImageURL1: [],
        //数据展示
        isLoading: false,
        //分页
        total: 0,
        //查询
        movieType: '',
        //添加
        addDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": {
            "vf_fs_SeriesID": "1",//系列编号
            "vf_fs_VedioID": "1",//视频编号
            "vf_fs_Level": "1",//第几集
          }
        },
        //表单宽度
        formLabelWidth: '120px',
        VMovieVideoSeriesUpdateObj: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_fs_ID": "10",//系列编码
            "vf_fs_SeriesID": "1",//系列编号
            "vf_fs_VedioID": "2",//视频编号
            "vf_fs_Level": "8",//第几集
          }
        },
      }
    },
    computed: mapGetters([
      'VMovieVideoSeries',
      'VMovieSeries',
      'VMovieVideoList',
    ]),

    created() {
      this.initData('','', 1)
    },
    methods: {
      film(){
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_vo_ID": "",//视频编号
          "vf_vo_Extend":"",//文件扩展名
          "vf_vo_AuthorID": "",//作者
          "vf_vo_Type":"",//视频类型
          "vf_vo_Title": "",//标题
          "vf_vo_PasserID":"",//审核人编码
        };
        this.$store.dispatch("initVMovieVideo", options)
      },
      //分页
      handleCurrentChange(num) {
        this.initData('','', num)
        this.num = num;
      },
      initData(series,vedio, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_fs_ID": "",//系列编码
          "vf_fs_SeriesID": series ? series : "",//系列编号
          "vf_fs_VedioID": vedio ? vedio:"",//视频编号
          "page": page ? page : 1,//页码
          "rows": 5//条数
        };
        this.$store.dispatch("initVMovieVideoSeries", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      search() {
        this.initData(this.movieType);
      },
      searchSeries(){
          let options = {
            "loginUserID": "huileyou",  //惠乐游用户ID
            "loginUserPass": "123",  //惠乐游用户密码
            "operateUserID": "",//操作员编码
            "operateUserName": "",//操作员名称
            "pcName": "",  //机器码
            "vf_ss_ID": "",//系列编号
            "vf_ss_Name":"",//系列名称
            "vf_ss_WriteState":"",//连载状态（0连载中1完结)
            "vf_ss_AuthorID":"",//作者
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
      Add() {
        this.film();
        this.searchSeries();
        for(let i in this.addOptions.data){
          this.addOptions.data[i]=""
        };
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      addSubmit() {
        this.$store.dispatch("addVMovieVideoSeries", this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            })
            this.initData('','', 1)
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
        this.addDialog = false;
      },
      uploadImg(file) {
        return new Promise((relove, reject) => {
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
        })
      },
      uploadToOSS(file) {
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://webservice.1000da.com.cn/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            }else{
              console.log(xhr.responseText)
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      uploaNode() {
        this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = '';
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('VMovieCheckTableUploadnImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                    .then(data => {
                      this.addOptions.data.vf_ve_Content.vf_vo_ImageURL="";
                      if (data) {
                        this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = data.data;
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
             //   })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                // this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                //   this.$store.dispatch('VMovieCheckTableUploadnImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload1.files[i])
                    .then(data => {
                      if (data) {
                        this.ImageURL1.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                //})
              }
            })
          }
        }, 30)
      },
      Delete(id) {
        let deleteOption = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "vf_fs_ID": id,
          }
        };
        this.$store.dispatch('DeleteVMovieVideoSeries', deleteOption)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.movieType);
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            })
      },
      Update(obj) {
        this.searchSeries();
        this.film();
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.VMovieVideoSeriesUpdateObj.data.vf_fs_ID=obj.vf_fs_ID;
        this.VMovieVideoSeriesUpdateObj.data.vf_fs_SeriesID=obj.vf_fs_SeriesID;
        this.VMovieVideoSeriesUpdateObj.data.vf_fs_VedioID=obj.vf_fs_VedioID;
        this.VMovieVideoSeriesUpdateObj.data.vf_fs_Level=obj.vf_fs_Level;
      },
      updateSubmit() {
        this.$store.dispatch("updateVMovieVideoSeries", this.VMovieVideoSeriesUpdateObj)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              initData(this.movieType,'', this.num);
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
