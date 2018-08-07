<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1>租车公司基本信息</h1><br>
      <el-button type="primary" v-show="true" @click="addButton" size="small" style="margin-right: 80px;">添加</el-button>
    </div>

    <!--数据展示isShow-->

    <el-table
      :data="carCompaniesList"
      style="width: 100%"
      v-loading = "isLoading"
      v-show="!isShow"
    >
      <el-table-column
        width="140"
        align="center"
        label="租车公司编号"
        prop="cr_h_Id">
      </el-table-column>
      <el-table-column
        align="center"
        label="公司名称"
        prop="cr_h_Name">
      </el-table-column>
      <el-table-column
        label="公司简介"
        align="center"
        prop="cr_h_Introduction">
      </el-table-column>
      <el-table-column
        label="图标"
        align="center">
        <template slot-scope="scope">
          <img v-lazy="scope.row.cr_h_Logo" width="128" height="80">
        </template>
      </el-table-column>

      <el-table-column
        label="租车须知"
        align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="租车须知"
            width="500"
            trigger="hover"
            :content="scope.row.cr_h_Notice">
            <el-button slot="reference">移入查看租车须知</el-button>
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
        </template>
      </el-table-column>
    </el-table>

    <!--添加-->
    <el-dialog title="添加租车信息" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">

        <el-form-item label="供应商ID:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_h_AgentId" disabled></el-input>
        </el-form-item>

        <el-form-item label="公司名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_h_Name"></el-input>
        </el-form-item>

        <el-form-item label="公司图标:" :label-width="formLabelWidth">
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
        <el-form-item label="公司简介:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_h_Introduction" :rows="5" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="租车须知:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_h_Notice" :rows="5" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog title="修改租车信息" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-form :model="updateOptions">

        <el-form-item label="供应商ID:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_h_AgentId" disabled></el-input>
        </el-form-item>

        <el-form-item label="公司名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_h_Name"></el-input>
        </el-form-item>

        <el-form-item label="公司图标:" :label-width="formLabelWidth">

          <Upload @getData="updateImage" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in ImageURL1"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
              <em>
                <el-radio v-model="radioUpdateIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL1.length"
              >
            </p>
          </div>




        </el-form-item>

        <el-form-item label="公司简介:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_h_Introduction" :rows="5" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="租车须知:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_h_Notice" :rows="5" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'
  export default{
    name: '',
    components: {
      Upload
    },
    data(){
      return {
        updateOptions:{},
        isShow:true,
        formLabelWidth: '120px',
        addDialog:false,
        updateDialog:false,
        agentID:'',
        isLoading:false,
        radioIndex:0,
        radioUpdateIndex:0,
        imageObj: {accept: 'image/*'},
        ImageURL:[],
        ImageURL1:[],
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_h_AgentId": "",//供应商编号
            "cr_h_Introduction": "",//公司简介
            "cr_h_Logo": "",//图标
            "cr_h_Name": "",//公司名称
            "cr_h_Notice": "",//租车须知
          }
        }
      }
    },
    computed: mapGetters([
      'carCompaniesList'
    ]),
    created() {
      this.agentID = JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID
      this.addOptions.data.cr_h_AgentId = this.agentID;
      this.initData()
    },
    methods: {
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
      updateImage(data) {
        if (!this.radioUpdateIndex) {
          this.ImageURL1.push(data.data);
        } else {
          this.ImageURL1.splice(this.radioUpdateIndex - 1, 1, data.data);
          this.radioUpdateIndex = '';
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

      initData(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "cr_h_AgentId": this.agentID,//供应商编号
        };
        this.isLoading = true;
        this.$store.dispatch('initCarCompanies',options)
        .then(carCompaniesID => {
          this.isLoading = false;
          sessionStorage.setItem('carCompaniesID',carCompaniesID);
          if (!carCompaniesID) {
            this.isShow = true;
          } else {
            this.isShow = false
          }
        }, err => {
          console.log(err)
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //点击添加按钮
      addButton() {
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
        this.ImageURL = [];
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){

        this.addOptions.data.cr_h_Logo = this.ImageURL.join(',');
        this.$store.dispatch('addCarHomeSubmit',this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      Update(obj){


      //  this.ImageURL1 = [];
        this.updateOptions = obj;
        this.ImageURL1 = obj.cr_h_Logo.split(",");
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //修改提交
      updateSubmit(){


        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateOptions
        }
        this.updateOptions.cr_h_Logo = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateCarHomeSubmit',updateOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData()
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateDialog = false;
      }
    },
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    /*width: 90px;*/
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .title > h1 {
    float: left;
    font: 20px/2 "微软雅黑";
    color: #000;
  }

  .title > button {
    float: right;
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
