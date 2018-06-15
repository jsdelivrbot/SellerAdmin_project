<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">微电影系列分类</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="small">
          <el-form-item label="系列名称筛选:">
            <el-select v-model="seriesName" placeholder="请选择系列名称" >
              <el-option :key="item.vf_ss_ID" :label="item.vf_ss_Name" :value="item.vf_ss_ID" v-for="item in VMovieSeries"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称筛选:">
            <el-select v-model="parentTypeName" placeholder="请选择分类名称" >
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID" v-for="item in VMovieTypeList"></el-option>
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
        :data="VMovieVideoSeriesCategoriesList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="系列分类编号"
          prop="vf_st_ID">
        </el-table-column>
        <el-table-column
          label="系列名称"
          prop="vf_ss_Name">
        </el-table-column>
        <el-table-column
          label="分类名称"
          prop="vf_te_Name">
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
              @click="Delete(scope.row.vf_st_ID)">删除
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
            <el-select v-model="addOptions.data.vf_st_SeriesID" placeholder="请选择系列名称">
              <el-option :key="item.vf_ss_ID" :label="item.vf_ss_Name" :value="item.vf_ss_ID" v-for="item in VMovieSeries"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.vf_st_SeriesTypeID" placeholder="请选择分类名称">
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID" v-for="item in VMovieTypeList"></el-option>
            </el-select>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改" :visible.sync="updateDialog">
        <el-form :model="VMovieSeriesCategoriesUpdateObj">

          <el-form-item label="系列分类编号:" :label-width="formLabelWidth">
            <el-input v-model="VMovieSeriesCategoriesUpdateObj.data.vf_st_ID" placeholder="系列编号" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="系列名称:" :label-width="formLabelWidth">
            <el-select v-model="VMovieSeriesCategoriesUpdateObj.data.vf_st_SeriesID" placeholder="请选择系列名称">
              <el-option :key="item.vf_ss_ID" :label="item.vf_ss_Name" :value="item.vf_ss_ID" v-for="item in VMovieSeries"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth">
            <el-select v-model="VMovieSeriesCategoriesUpdateObj.data.vf_st_SeriesTypeID" placeholder="请选择分类名称">
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID" v-for="item in VMovieTypeList"></el-option>
            </el-select>
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
        //是否禁用
        isDisabled: true,
        //修改
        updateDialog: false,
        ImageURL: '',
        seriesName: '',
        parentTypeName: '',
        ImageURL1: [],
        //数据展示
        isLoading: false,
        //分页
        total: 0,
        //添加
        addDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": {
            "vf_st_SeriesID": "1",//系列编号
            "vf_st_SeriesTypeID": "1",//分类编号
          }
        },
        //表单宽度
        formLabelWidth: '120px',
        VMovieSeriesCategoriesUpdateObj: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": {
            "vf_st_ID": "1",//系列分类编号
            "vf_st_SeriesID": "1",//系列编号
            "vf_st_SeriesTypeID": "1",//分类编号
          }
        },
      }
    },
    computed: mapGetters([
      'VMovieVideoSeriesCategoriesList',
      'VMovieSeries',
      'VMovieTypeList',
      'VMovieParentTypeList',
    ]),

    created() {
      this.initData(),
        this.initSeriesName(0),
        this.initTypeName()
    },
    methods: {
      initSeriesName(name){
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_ss_ID": "",//系列编号
          "vf_ss_Name": name?name:"",//系列名称
          "vf_ss_WriteState": "",//连载状态（0连载中1完结)
          "vf_ss_AuthorID": "",//作者
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
      /*      intParentTypeData(parentId){
              let options = {
                "loginUserID": "huileyou",
                "loginUserPass": "123",
                "operateUserID": "",//操作员编码
                "operateUserName": "",//操作员名称
                "pcName": "",
                "vf_te_ID":"",//分类编号
                "vf_te_Name":"",//分类名称
                "vf_te_ParentID": parentId?parentId:0,//分类编号父编号
                "page": 1,//页码
                "rows": 5//条数
              };
              this.$store.dispatch("initVMovieParentSorting", options)
                .then((total) => {
                  this.total = total;
                }, (err) => {
                  this.$notify({
                    message: err,
                    type: "error"
                  });
                });
            },*/
      initTypeName(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentID": "",//分类编号父编号
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
      //分页
      handleCurrentChange(num) {
        this.initData('','', num)
      },
      initData(series,vedio, page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_st_ID": "",//系列分类编号
          "vf_st_SeriesID": "",//系列编号
          "vf_st_SeriesTypeID": "",//分类编号
          "page": 1,//页码
          "rows": 5//条数

        };
        this.$store.dispatch("initVMovieSeriesCategories", options)
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
        this.initData(this.seriesName,this.parentTypeName,"");
      },
      /*      seriesName(){
              let options = {
                "loginUserID": "huileyou",  //惠乐游用户ID
                "loginUserPass": "123",  //惠乐游用户密码
                "operateUserID": "",//操作员编码
                "operateUserName": "",//操作员名称
                "pcName": "",  //机器码
                "vf_ss_ID": "",//系列编号
                "vf_ss_Name":"",//系列名称
                "vf_ss_WriteState": "",//连载状态（0连载中1完结)
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
            },*/
      /*      searchSeries(seriesCategoriesId,seriesId,typeId,page){
                let options = {
                  "loginUserID": "huileyou",  //惠乐游用户ID
                  "loginUserPass": "123",  //惠乐游用户密码
                  "operateUserID": "",//操作员编码
                  "operateUserName": "",//操作员名称
                  "pcName": "",  //机器码
                  "vf_st_ID": seriesCategoriesId?seriesCategoriesId:"",//系列分类编号
                  "vf_st_SeriesID": seriesId?seriesId:"",//系列编号
                  "vf_st_SeriesTypeID": typeId?typeId:"",//分类编号
                  "page": page?page:1,//页码
                  "rows": 5//条数
                };
                this.$store.dispatch("initVMovieSeriesCategories", options)
                  .then((total) => {
                    this.total = total;
                  }, (err) => {
                    this.$notify({
                      message: err,
                      type: "error"
                    });
                  });
              },*/
      Add() {
        this.seriesName();
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      addSubmit() {

        // console.log(this.addOptions)

        // this.vf_ve_Content.vf_vo_ImageURL = this.ImageURL;
        // let date = new Date();
        // let day = date.getDay() - 1;
        // let nowDate = date.getFullYear() + "/" + date.getMonth() + "/" + day + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // this.addOptions.data.vf_ve_Content.vf_vo_CreateTime = nowDate;
        // this.addOptions.data.vf_ve_Content = JSON.stringify(this.addOptions.data.vf_ve_Content);
        // console.log(this.addOptions)
        this.$store.dispatch("addVMovieSeriesCategories", this.addOptions)
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
                      // console.log(data.data)
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
                // })
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
            "vf_st_ID": id,//系列分类编号
          }
        };
        this.$store.dispatch('DeleteVMovieSeriesCategories', deleteOption)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData();
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            })
      },
      Update(obj) {
        this.seriesName();
        this.typeName();
        this.VMovieSeriesCategoriesUpdateObj.data=obj;
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      updateSubmit() {
        console.log(this.VMovieSeriesCategoriesUpdateObj)
        this.$store.dispatch("updateVMovieSeriesCategories", this.VMovieSeriesCategoriesUpdateObj)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData();
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
