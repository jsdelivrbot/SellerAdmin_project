<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">微电影</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">

          <!--        <el-form-item label="视频名称筛选:">
                  <el-select v-model="videoName" placeholder="请选择视频名称">
                  <el-option  :key="item.vf_vo_ID" :label="item.vf_vo_Title"  :value="item.vf_vo_ID" v-for="item in VMovieVideoList"></el-option>
                  </el-select>
                  </el-form-item>-->

          <el-form-item>
            <span>视频名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              v-model="filmName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择视频名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item label="日期筛选:" >
            <el-date-picker
              style="width:400px"
              v-model="date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd">
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>


      <!--数据展示-->
      <el-table
        :data="VMovieMiniVideoList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="视频编号:">
                <span>{{props.row.vf_vo_ID}}</span>
              </el-form-item>
              <el-form-item label="时长:">
                <span>{{props.row.vf_vo_Time}}秒</span>
              </el-form-item>
              <el-form-item label="大小:">
                <span>{{props.row.vf_vo_Size}}</span>
              </el-form-item>
              <el-form-item label="文件扩展名:">
                <span>{{props.row.vf_vo_Extend}}</span>
              </el-form-item>
              <el-form-item label="视频:">
                <video id="addVideo" :src="props.row.vf_vo_TempFileURL"  width="320" height="240" controls="controls"></video>
              </el-form-item>
              <el-form-item label="作者:">
                <span>{{props.row.vf_vo_AuthorID}}</span>
              </el-form-item>
              <el-form-item label="视频类型:">
                <span>{{props.row.vf_vo_Type}}</span>
              </el-form-item>
              <el-form-item label="标题:">
                <span>{{props.row.vf_vo_Title}}</span>
              </el-form-item>
              <!--              <el-form-item label="视频图片:">
                              <img src="" alt="" v-lazy="item"  v-show="props.row.vf_ve_Content.vf_vo_ImageURL.length" v-for="item in props.row.vf_ve_Content.vf_vo_ImageURL" style="width: 100px;height: 100px">
                            </el-form-item>-->
              <el-form-item label="视频图片:">
                <img :src="props.row.vf_vo_ImageURL" alt="" style="width: 100px;height: 100px">
              </el-form-item>
              <!--              <el-form-item label="审核人编码:">
                              <span>{{props.row.vf_ve_Content.vf_vo_PasserID}}</span>
                            </el-form-item>
                            <el-form-item label="审核时间:">
                              <span>{{props.row.vf_ve_Content.vf_vo_ValidateTime}}</span>
                            </el-form-item>-->
              <el-form-item label="创建时间:">
                <span>{{props.row.vf_vo_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="审核人编码:">
                <span>{{props.row.f_vo_PasserID}}</span>
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
              <el-form-item label="类型名称:">
                <span>{{props.row.vf_vo_TypeName}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="视频编号"
          prop="vf_vo_ID">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="vf_vo_Title">
        </el-table-column>
        <el-table-column
          label="视频类型名称"
          prop="vf_vo_TypeName">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.vf_fm_ID)">删除
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

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {

    data() {
      return {
        date:'',
        videoData:{
          "vedioName":''
        },
        videoName: '',
        filmName: '',
        filmID: '',
        //是否禁用
        isDisabled: true,
        ImageURL: '',
        ImageURL1: [],
        //数据展示
        isLoading: false,
        //分页
        total: 0,
        //查询
        //表单宽度
        formLabelWidth: '120px',
      }
    },
    computed: mapGetters([
      'VMovieMiniVideoList',
      'VMovieVideoList',
    ]),

    created() {
      this.initData();
      this.initFilmName();
    },
    methods: {
      //初始化视频
      initFilmData(title){
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_vo_ID": "",//视频编号
          "vf_vo_Extend": "",//文件扩展名
          "vf_vo_AuthorID": "",//作者
          "vf_vo_Type": "",//视频类型
          "vf_vo_Title": title ? title : "",//标题
          "vf_vo_PasserID": "",//审核人编码
        };
        this.$store.dispatch("initVMovieVideo", options)
          .then(() => {
            for(var i=0;i<this.VMovieVideoList.length;i++){
              let loadAllFilmTypeListObj={};
              loadAllFilmTypeListObj.value=this.VMovieVideoList[i].vf_vo_ID;
              loadAllFilmTypeListObj.address=this.VMovieVideoList[i].vf_vo_Title;
//              this.loadAllFilmTypeList.push(loadAllFilmTypeListObj);
            }
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      /*搜索视频名称*/

      //加载所有数据
      loadAll(filmName) {
        return new Promise((relove, reject) => {
          let options = {
            "loginUserID": "huileyou",  //惠乐游用户ID
            "loginUserPass": "123",  //惠乐游用户密码
            "operateUserID": "",//操作员编码
            "operateUserName": "",//操作员名称
            "pcName": "",  //机器码
            "vf_vo_ID": "",//视频编号
            "vf_vo_Extend": "",//文件扩展名
            "vf_vo_AuthorID": "",//作者
            "vf_vo_Type": "",//视频类型
            "vf_vo_Title": filmName?filmName:"",//标题
            "vf_vo_PasserID": "",//审核人编码
          };
          this.$store.dispatch('initVMovieVideo', options)
            .then((data) => {
              relove(data)
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              });
            })
        })
      },
      //搜索初始化数据
      searchInitData() {
        this.initFilmData(this.filmName)
      },
      //异步查询搜索
      querySearchAsync(queryString, cb) {
        this.loadAll(queryString)
          .then(data => {
            var data = data.data;
            data = data.map(item => {
              return {
                id: item.vf_vo_ID,
                value: item.vf_vo_Title
              }
            });
            this.restaurants = data;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(this.restaurants);
            }, 10);
          })
      },
      //选择的这条数据
      handleSelect(item) {
        this.value = item.id;
        this.filmName = item.value;
        this.filmID = item.id;
        this.userID = item.id;
        this.initFilmData(this.filmName)
      },


      /*微电影搜索*/
      search(){
        this.initData(this.filmID,this.date[0],this.date[1]);
      },
      initFilmName(){
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_vo_ID":"",//视频编号
          "vf_vo_Extend": "",//文件扩展名
          "vf_vo_AuthorID": "",//作者
          "vf_vo_Type": "",//视频类型
          "vf_vo_Title": "",//标题
          "vf_vo_PasserID":"",//审核人编码
        };
        this.$store.dispatch("initVMovieVideo", options)
          .then((data) => {
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //分页
      handleCurrentChange(num) {
        this.initData('','','', num)
      },
      initData(id,fromDate,toDate, page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_fm_ID":  id?id:"",//视频编号
          "fromDate":  fromDate?fromDate:"",//日期从
          "toDate":  toDate?toDate:"",//日期到
          "page": page?page:1,//页码
          "rows": 5//条数
        };
        this.$store.dispatch("initVMovieMiniMovie", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      Delete(id) {
        let deleteOption = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "vf_fm_ID": id,//视频编号
          }
        };
        this.$store.dispatch('DeleteVMovieMiniVideo', deleteOption)
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


    },
    //改变时请求
    mounted(){
      this.searchInitData()
    }
  }

</script>
<style scoped>
</style>
