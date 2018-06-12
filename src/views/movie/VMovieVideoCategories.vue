<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">视频分类</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="small">
          <el-form-item>
            <span>请选择分类名称:</span>
            <el-select v-model="typeName" multiple placeholder="请选择分类">
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID" v-for="item in VMovieParentTypeList"></el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="VMovieVideoCategoriesList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="视频分类编号"
          prop="vf_vt_ID">
        </el-table-column>
        <el-table-column
          label="分类名称"
          prop="vf_te_Name">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="vf_vo_Title">
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
  import {getNewStr} from '@/assets/js/public'

  export default {

    data() {
      return {
        restaurants: [],
        tylist:[],
        //视频名称
        filmName:"",
        inputFilmName:"",
        //分类名称
        typeName:'',
        //选择电影名称
        choiceFilmName:[],
        //输入电影名称
        inputFilmName:'',
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
        //表单宽度
        formLabelWidth: '120px',
        loadAllFilmTypeList: [
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ],
      }
    },
    computed: mapGetters([
      'VMovieVideoCategoriesList',//视频分类初始化数据
      'VMovieParentTypeList',//分类
      'VMovieVideoList',//视频
      'adminProductLineManagementId',
    ]),

    created() {
      this.initData();
      this.initTypeData();
    },
    methods: {
      //搜索视频名称

      searchInitData() {
        this.initFilmData(this.filmName)
      },
      //选择的这条数据
      handleSelect(item) {
        this.value = item.id;
        this.filmName = item.value;
        this.inputFilmName = item.id;
        this.userID = item.id;
        this.initFilmData(this.filmName)
      },
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
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
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
      //创建过滤器
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      //分页
      handleCurrentChange(num) {
        this.initData(this.typeId,num)
      },
      //微电影视频分类初始化数据
      initData(typeId,filmId,page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "pcName": "",
          "vf_vt_ID": "",//视频分类编号
          "vf_vt_TypeID": typeId?typeId:"",//分类编号
          "vf_vt_VedioID":filmId?filmId:"",//视频编号
          "page": page?page:2,//页码
          "rows": 5//条数

        };
        this.$store.dispatch("initVMovieVideoCategories", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //初始化电影分类
      initTypeData(parentId){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentIDs": parentId?parentId:"2,4",//分类编号父编号
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
      },
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
              this.loadAllFilmTypeList.push(loadAllFilmTypeListObj);
            }
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //查询
      search() {
        this.initData(this.typeName.join(","),this.inputFilmName,1);
      },
      //上传图片
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
          xhr.open("POST", getNewStr+ "/OSSFile/PostToOSS");
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
      //上传文件
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

    },
    //改变时请求
    mounted(){
      this.searchInitData()
    }
  }

</script>
<style scoped>
</style>
