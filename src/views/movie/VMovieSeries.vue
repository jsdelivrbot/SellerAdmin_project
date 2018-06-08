<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">系列</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="small">
          <el-form-item label="系列名称:">
            <el-input v-model="SeriesName" placeholder="系列名称"></el-input>
          </el-form-item>
          <el-form-item label="连载状态:" >
            <el-select v-model="WriteState" placeholder="连载状态">
              <el-option label="连载中" value="0"></el-option>
              <el-option label="已完结" value="1"></el-option>
            </el-select>
          </el-form-item >
          <el-form-item label="作者:" >
            <el-input v-model="Author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="search">查询</el-button>
            <el-button  type="primary" @click="Add">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="VMovieSeries"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="系列编号:">
                <span>{{props.row.vf_ss_ID}}</span>
              </el-form-item>
              <el-form-item label="作者:">
                <span>{{props.row.vf_ss_AuthorID}}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{props.row.vf_ss_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="系列名称:">
                <span>{{props.row.vf_ss_Name}}</span>
              </el-form-item>
              <el-form-item label="描述:">
                <span>{{props.row.vf_ss_Describ}}</span>
              </el-form-item>
              <el-form-item label="完载时间:">
                <span>{{props.row.vf_ss_OverTime}}</span>
              </el-form-item>
              <el-form-item label="系列图片:">
                <img :src="props.row.vf_ss_SeriesImageURL" alt="" style="width: 100px;height: 50px">
              </el-form-item>
              <el-form-item label="更新时间:">
                <span>{{props.row.vf_ss_UpdateTime}}</span>
              </el-form-item>
              <el-form-item label="连载状态:">
                <span>{{props.row.vf_ss_WriteState | getSeriesState}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="系列编号"
          prop="vf_ss_ID">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="vf_ss_AuthorID">
        </el-table-column>
        <el-table-column
          label="系列名称"
          prop="vf_ss_Name">
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
              @click="Delete(scope.row.vf_ss_ID)">删除
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
            <el-input v-model="addOptions.data.vf_ss_Name" placeholder="系列名称"></el-input>
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.vf_ss_Describ" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item label="连载状态:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.vf_ss_WriteState" placeholder="请选择连载状态">
              <el-option label="连载中" value="0"></el-option>
              <el-option label="完结" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新时间:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.vf_ss_UpdateTime" placeholder="更新时间"></el-input>
          </el-form-item>
          <el-form-item label="系列图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">
              系列图片上传
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.data.vf_ss_SeriesImageURL" v-show="addOptions.data.vf_ss_SeriesImageURL"
                 style="width: 100px;height: 100px">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改" :visible.sync="updateDialog">
        <el-form :model="VMovieSeriesUpdateObj">
          <el-form-item label="系列编号:" :label-width="formLabelWidth">
            <el-input v-model="VMovieSeriesUpdateObj.data.vf_ss_ID" placeholder="时长" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="系列名称:" :label-width="formLabelWidth">
            <el-input v-model="VMovieSeriesUpdateObj.data.vf_ss_Name" placeholder="时长"></el-input>
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input v-model="VMovieSeriesUpdateObj.data.vf_ss_Describ" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item label="连载状态:" :label-width="formLabelWidth">
            <el-select v-model="VMovieSeriesUpdateObj.data.vf_ss_WriteState" placeholder="请选择连载状态">
              <el-option v-for="item in SerialState" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新时间:" :label-width="formLabelWidth">
            <el-input v-model="VMovieSeriesUpdateObj.data.vf_ss_UpdateTime" placeholder="更新时间"></el-input>
          </el-form-item>
          <el-form-item label="系列图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">
              系列图片上传
              <input type="file" name="" ref="upload1" accept="image/*">
            </a>
            <img v-lazy="VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL" v-show="VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL"
                 style="width: 100px;height: 100px">
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
        //连载状态
        SerialState:[
          {
            label:"连载中",
            value:0
          },
          {
            label:"已完结",
            value:1
          }
        ],
        //作者
        Author:'',
        //系列名称
        SeriesName:'',
        //连载状态
        WriteState:'',
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
            "vf_ss_Name": "电影自习室",//系列名称
            "vf_ss_WriteState": "0",//连载状态（0连载中1完结)
            "vf_ss_SeriesImageURL": "1",//系列图片
            "vf_ss_AuthorID": "23",//作者
            "vf_ss_UpdateTime": "每周二、四更新",//更新时间
          }
        },
        //表单宽度
        formLabelWidth: '120px',
        VMovieSeriesUpdateObj: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_ss_ID": "",//系列编号
            "vf_ss_Name": "",//系列名称
            "vf_ss_WriteState": "",//连载状态
            "vf_ss_SeriesImageURL": "",//系列图片
            "vf_ss_AuthorID": "",//作者
            "vf_ss_UpdateTime": "",//更新时间
          }
        },
      }
    },
    computed: mapGetters([
      'VMovieSeries',
    ]),

    created() {
      this.initData();
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData('','','',num)
        this.num = num;
      },
      initData(name,state,author,page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_ss_ID": "",//系列编号
          "vf_ss_Name": name?name:"",//系列名称
          "vf_ss_WriteState": state?state:"",//连载状态（0连载中1完结)
          "vf_ss_AuthorID": author?author:"",//作者
          "page": page?page:1,//页码
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
      search() {
        this.initData(this.SeriesName,this.WriteState,this.Author,1);
      },
      Add() {
        let content =this.addOptions.data;
        for(let i in content){
          content[i]="";
        };
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode();
      },
      addSubmit() {
        this.addOptions.data.vf_ss_AuthorID=22;
        this.$store.dispatch("addVMovieSeries", this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            })
            this.initData(this.SeriesName,this.WriteState,this.Author,1);
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
      uploaNode() {
        this.addOptions.data.vf_ss_SeriesImageURL = '';
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i]).then(data => {
                  this.$store.dispatch('UploadnImgs', {
                    imageData: data
                  })
                    .then(data => {
                      this.addOptions.data.vf_ss_SeriesImageURL="";
                      if (data) {
                        this.addOptions.data.vf_ss_SeriesImageURL = data.data;
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
                  for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                  this.$store.dispatch('UploadnImgs', {
                    imageData: data
                  })
                    .then(data => {
                      if (data) {
                        this.VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL = data.data;
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
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
            "vf_ss_ID": id,//申请广告编码
          }
        };
        this.$store.dispatch('DeleteVMovieSeries', deleteOption)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.SeriesName,this.WriteState,this.Author,1);
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            })
      },
      Update(obj) {
        this.ImageURL1 = [];
        this.uploaNode();
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.VMovieSeriesUpdateObj.data=obj;
        this.VMovieSeriesUpdateObj.data.vf_ss_AuthorID=22;
      },
      updateSubmit() {
        this.$store.dispatch("updateVMovieSeries", this.VMovieSeriesUpdateObj)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.movieType,'','',this.num)
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
