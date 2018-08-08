<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">导览信息</h1>
    <!--查询栏-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>小景点名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <!--<el-autocomplete-->
            <!--size="mini"-->
            <!--v-model="siteName"-->
            <!--:fetch-suggestions="querySearchAsync"-->
            <!--placeholder="请输入景点名称"-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->

          <el-input v-model="siteName" size="small"></el-input>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
          <el-button
            type="success"
            size="small"
            @click="jump">预览效果
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>


    <!--添加-->
    <el-dialog title="添加地图坐标信息" :visible.sync="addDialog" :close-on-click-modal="false" @close="closeDialog">
      <el-form :model="addOptions">

        <el-form-item label="小景点名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.tm_se_Name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的横坐标:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.tm_se_HandX" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的纵坐标:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.tm_se_HandY" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点介绍:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.tm_se_Intro" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.tm_se_Remark" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点图片:" :label-width="formLabelWidth">
          <p>图片大小不能大于600KB</p>
          <Upload @getData="getData" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in ImageURL" style="display: inline-block;position: relative;margin-right:30px;">
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL.length"
              >
              <span style="color: #f60" @click="deleteImageURL(item)">X</span>
              <em>
                <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
              </em>
            </p>
          </div>


        </el-form-item>

        <el-form-item label="小景点音频:" :label-width="formLabelWidth">
          <span>音频不超过10M</span>
          <Upload @getData="passAudio" :attrs="audioObj"></Upload>
        </el-form-item>
        <el-form-item label="小景点视频:" :label-width="formLabelWidth">
          <span>视频不超过600M</span>
          <Upload @getData="passVideo" :attrs="videoObj"></Upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cacheForm">取 消</el-button>
        <el-button type="primary" @click="AddSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog title="修改地图坐标信息" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-form :model="updateOptions">

        <el-form-item label="小景点名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_Name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的横坐标:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_HandX" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的纵坐标:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_HandY" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点介绍:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_Intro" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点备注:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_Remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="小景点图片:" :label-width="formLabelWidth">
          <p>图片大小不能大于600KB</p>
          <Upload @getData="updateImage" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in updateImageURL" style="display: inline-block;position: relative;margin-right:30px;">
              <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
              <em>
                <el-radio v-model="radioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="updateImageURL.length"
              >
            </p>
          </div>
        </el-form-item>
        <el-form-item label="小景点音频:" :label-width="formLabelWidth">
          <span>音频不超过10M</span>
          <audio :src="updateOptions.data.tm_se_Sound" v-show="updateOptions.data.tm_se_Sound" controls></audio>
          <Upload @getData="updateAudio" :attrs="audioObj"></Upload>
        </el-form-item>

        <el-form-item label="小景点视频:" :label-width="formLabelWidth">

          <span>视频不超过600M</span>
          <video :src="updateOptions.data.tm_se_Vedio" v-show="updateOptions.data.tm_se_Vedio" controls
                 width="100"></video>
          <Upload @getData="updateVideo" :attrs="videoObj"></Upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!--展示-->
    <el-table
      :data="ticketMapList"
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="景点编码">
              <span>{{ props.row.tm_se_ID }}</span>
            </el-form-item>
            <el-form-item label="手绘图横坐标">
              <span>{{ props.row.tm_se_HandX}}</span>
            </el-form-item>
            <el-form-item label="手绘图纵坐标">
              <span>{{ props.row.tm_se_HandY }}</span>
            </el-form-item>
            <el-form-item label="景点视频">
              <video :src="props.row.tm_se_Vedio" v-show="props.row.tm_se_Vedio" controls width="100"></video>
            </el-form-item>
            <el-form-item label="景点音乐">
              <audio :src="props.row.tm_se_Sound" v-show="props.row.tm_se_Sound" controls></audio>
            </el-form-item>
            <el-form-item label="景点图片">
              <span>
                 <img
                   v-for="item,index in props.row.tm_se_Image"
                   v-lazy="item" alt=""
                   :key="index"
                   width="200"
                   height="100"
                   style="margin: 10px 15px 0;"
                 >

              </span>
            </el-form-item>
            <el-form-item label="景点介绍">
              <span>
                <el-popover
                  placement="top-start"
                  width="500"
                  trigger="hover"
                  :content="props.row.tm_se_Intro">
                  <el-button slot="reference">移入查看</el-button>
                </el-popover>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="小景点编号"
        prop="tm_se_ID">
      </el-table-column>
      <el-table-column
        label="小景点名称"
        prop="tm_se_Name">
      </el-table-column>
      <el-table-column
        label="备注">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="500"
            trigger="hover"
            :content="scope.row.tm_se_Remark">
            <el-button slot="reference">移入查看</el-button>
          </el-popover>
        </template>
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
            @click="Delete(scope.row.tm_se_ID)">删除
          </el-button>



        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" v-show="total" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="8"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  //  import
  import Upload from '@/components/Upload'

  export default {
    name: '',
    components: {
      Upload
    },
    data() {
      return {
        imageObj: {
          accept: 'image/*'
        },

        audioObj: {
          accept: 'audio/*'
        },
        videoObj: {
          accept: 'video/*'
        },
        isShow: false,
        isUploaNode: true,
        isNewUploaNode: true,
        tableData: [],
        ImageURL: [],
        updateImageURL: [],
        formLabelWidth: '120px',
        total: 0,
        siteName: '',
        isLoading: false,
        addDialog: false,//添加弹窗
        updateDialog: false,//修改弹窗
        VideoNameObj: "",
        AudioNews: "",
        //添加
        addOptions: {
          "tm_se_Code": "",  //景点编号
          "tm_se_Name": "",  //小景点名称
          "tm_se_HandX": "",  //位于手绘图X
          "tm_se_HandY": "",  //位于手绘图Y
          "tm_se_Vedio": "",  //VR视频
          "tm_se_Sound": "",  //音频
          "tm_se_Intro": "",  //小景点介绍
          "tm_se_Image": "",  //小景点图片
          "tm_se_Remark": "",  //备注
        },
        //修改
        updateOptions: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "data": {
            "tm_se_ID": "",  //景区小景点编码
            "tm_se_Code": "",  //景点编号
            "tm_se_Name": "",  //小景点名称
            "tm_se_HandX": "",  //位于手绘图X
            "tm_se_HandY": "",  //位于手绘图Y
            "tm_se_Vedio": "",  //VR视频
            "tm_se_Sound": "",  //音频
            "tm_se_Intro": "",  //小景点介绍
            "tm_se_Image": "",  //小景点图片
            "tm_se_Remark": ""  //备注
          }
        },
        "Imgs": "",
        radioIndex: '',
        addRadioIndex: 0,
      }
    },
    computed: mapGetters([
      'ticketMapList',
    ]),
    created() {
      this.id = this.$route.params.id;
      this.initData()
    },
    methods: {

      handleSelect(){},
      querySearchAsync(){},
      getData(data) {
        if (!this.addRadioIndex) {
          this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },
      updateImage(data) {
        if (!this.radioIndex) {
          this.updateImageURL.push(data.data);
        } else {
          this.updateImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      jump(){
      let code=  sessionStorage.getItem("code")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/'+code,'_blank')
      },
      passAudio(data) {
        this.addOptions.tm_se_Sound = data.data;
      },
      updateAudio(data) {
        this.updateOptions.data.tm_se_Sound = data.data;
      },

      passVideo(data) {
        this.addOptions.tm_se_Vedio = data.data;
      },

      updateVideo(data) {
        this.updateOptions.data.tm_se_Vedio = data.data;
      },

      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.updateImageURL = this.updateImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除对应图片
      deleteImageURL(val) {
        this.isUploaNode = false;
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      closeDialog() {
        this.ImageURL = []
        this.updateImageURL = [];
        this.addDialog = false,
          this.updateDialog = false
      },
      cacheForm() {
        this.ImageURL = [],
          this.updateImageURL = [],
          this.addDialog = false,
          this.updateDialog = false
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.siteName, num)
      },

      //查询this.id
      initData(name, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_se_ID": '',//景区小景点编码
          "tm_se_Code": this.id,//景点编号
          "tm_se_Name": name ? name : '',//小景点名称
          "page": page ? page : 1,//页码
          "rows": "8"//条数
        };
        this.isLoading = true;
        this.$store.dispatch('initTicketMap', options)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },


      //查询
      search() {
        this.initData(this.siteName)
      },

      //添加
      Add() {
        let uploader = document.querySelector('.uploader-list')
        if(uploader){
          uploader.querySelector('ul').innerHTML = ''
        }
        for(let attr in this.addOptions){
          this.addOptions[attr] = ''
        }
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },

      //新增提交
      AddSubmit() {
        this.addOptions.tm_se_Image = this.ImageURL.join(",");
        this.addOptions.tm_se_Code = this.id;
        let Options = {
          "loginUserID": "huileyou",    //惠乐游用户ID
          "loginUserPass": "123",    //惠乐游用户密码
          "operateUserID": "",    //操作员编码
          "operateUserName": "",    //操作员名称
          "pcName": "",    //机器码
          "data": this.addOptions
        }
        this.$store.dispatch('addTicketMap', Options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.addDialog = false;
      },
      Update(obj) {
        this.updateOptions.data = obj;
        setTimeout(() => {
          if (obj.tm_se_Image) {
            this.updateImageURL = obj.tm_se_Image
          }
          this.updateDialog = true;
        }, 30)
      },

      updateSubmit() {
        if(this.updateImageURL.length){
          this.updateOptions.data.tm_se_Image = this.updateImageURL.join(",");
        }
        this.$store.dispatch('upDateTicketMap', this.updateOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.updateDialog = false;
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
            "tm_se_ID": id,//景区小景点编码
          },
        };
        this.$store.dispatch('deleteTicketMap', deleteOption)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      }
    }
  }
</script>
<style scoped>
  .el-upload__input {
    display: none !important;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .imgWap {

  }

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
