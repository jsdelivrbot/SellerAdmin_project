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
          <el-form-item label="连载状态:">
            <el-select v-model="WriteState" placeholder="连载状态">
              <el-option label="连载中" value="0"></el-option>
              <el-option label="已完结" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者:">
            <el-input v-model="Author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="Add">新增</el-button>
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

                <img :src="props.row.vf_ss_SeriesImageURL" alt="" style="width: 100px;height: 50px"  @click="$seeImage">
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
      <el-dialog title="添加" :visible.sync="addDialog" :close-on-click-modal="false">
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
            <span>图片不超过600KB,且只上传一张图片</span>
            <Upload @getData="getData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in ImageURL"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <em>
                  <el-radio v-model="radioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURL.length"
                >
              </p>
            </div>


          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
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
              <el-option v-for="item in SerialState" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新时间:" :label-width="formLabelWidth">
            <el-input v-model="VMovieSeriesUpdateObj.data.vf_ss_UpdateTime" placeholder="更新时间"></el-input>
          </el-form-item>
          <el-form-item label="系列图片:" :label-width="formLabelWidth">
            <span>图片不超过600KB,且只上传一张图片</span>
            <Upload @getData="getUpdateData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in ImageURL1"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
                <em>
                  <el-radio v-model="updateRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURL1.length"
                >
              </p>
            </div>
            <!---->
            <!--<a href="javascript:;" class="file">-->
              <!--系列图片上传-->
              <!--<input type="file" name="" ref="upload1" accept="image/*">-->
            <!--</a>-->
            <!--<img v-lazy="VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL"-->
                 <!--v-show="VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL"-->
                 <!--style="width: 100px;height: 100px">-->

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
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'
  export default {
    name: '',
    components: {
      Upload
    },
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
        //修改系列图片
        updateSeriesImg:'',
        //系列名称
        SeriesName:'',
        //连载状态
        WriteState:'',
        //是否禁用
        isDisabled: true,
        //修改
        updateDialog: false,
        ImageURL: [],
        //添加系列图片上传
        addSeriesImgUpload: '',
        ImageURL1:[],
        //数据展示
        isLoading: false,
        //分页
        total: 0,


        //查询
        movieType: '',
        //添加
        imgUrl: '',
        imgShow:false,
        radioIndex: 0,
        updateRadioIndex: 0,
        isNewUploaNode: true,
        imageObj: {accept: 'image/*'},
        addDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": {
            "vf_ss_Name": "",//系列名称
            "vf_ss_WriteState": "",//连载状态（0连载中1完结)
            "vf_ss_SeriesImageURL": "",//系列图片
            "vf_ss_AuthorID": JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',//作者
            "vf_ss_UpdateTime": "",//更新时间
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
            "vf_ss_AuthorID": JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',//作者
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
      clickImg(val){
        this.$store.commit('setTranstionFalse');
        this.imgUrl = val;
        this.imgShow = true
      },
      //图片上传
      getData(data) {
        if (!this.radioIndex) {
         this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      //修改图片
      getUpdateData(data) {
        if (!this.updateRadioIndex) {
          this.ImageURL1.push(data.data);
        } else {
          this.ImageURL1.splice(this.updateRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },
      //删除修改对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL1 = this.ImageURL1.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //分页
      handleCurrentChange(num) {
        this.initData('','','',num)
        this.num = num;
      },
      //初始化数据
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
//          "vf_ss_AuthorID":'',//作者
          "vf_ss_AuthorID":JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',//作者
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
      //查询
      search() {
        this.initData(this.SeriesName,this.WriteState,this.Author,1);
      },
      //新增
      Add() {
        let uploader = document.querySelector('.uploader-list')
        if(uploader){
          uploader.querySelector('ul').innerHTML = ''
        }
        for(let attr in this.addOptions.data){
          if(typeof this.addOptions.data[attr]=='object'){
            for(let attr1 in this.addOptions.data[attr]){
              this.addOptions.data[attr][attr1] = ''
            }
          }else{
            this.addOptions.data[attr] = ''
          }
        }

        ImageURL: []
        let content =this.addOptions.data;
        for(let i in content){
          content[i]="";
        };
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');

      },
      //新增提交
      addSubmit() {
        this.addOptions.data.vf_ss_SeriesImageURL = this.ImageURL.join(",")

        this.addOptions.data.vf_ss_AuthorID=JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'';

        this.$store.dispatch("addVMovieSeries", this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            })
            this.initData(this.SeriesName,this.WriteState,JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',this.num);
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
        this.addDialog = false;
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
      //修改
      Update(obj) {
        this.ImageURL1 = obj.vf_ss_SeriesImageURL.split(",");

        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.VMovieSeriesUpdateObj.data=obj;
        this.updateSeriesImg=obj.vf_ss_SeriesImageURL;
      },
      //修改提交
      updateSubmit() {

        this.VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL = '';
        this.VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL = this.ImageURL1.join(',');
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
  .imgWap span {
    position: absolute;
    right: -15px;
    top: -6px;
  }
  .imgWap em {
    position: absolute;
    right: -55px;
    top: 30px;
    font-style: normal;
    color: #42b983;
  }
</style>
