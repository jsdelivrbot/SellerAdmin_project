<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1>租车公司基本信息</h1><br>
      <el-button type="primary" v-show="isShow" @click="addButton" size="small">添加</el-button>
    </div>

    <!--数据展示-->

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
    <el-dialog title="添加租车信息" :visible.sync="addDialog">
      <el-form :model="addOptions">

        <el-form-item label="供应商ID:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_h_AgentId" disabled></el-input>
        </el-form-item>

        <el-form-item label="公司名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_h_Name"></el-input>
        </el-form-item>

        <el-form-item label="公司图标:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图标
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
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

    <!--添加-->
    <el-dialog title="修改租车信息" :visible.sync="updateDialog">
      <el-form :model="updateOptions">

        <el-form-item label="供应商ID:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_h_AgentId" disabled></el-input>
        </el-form-item>

        <el-form-item label="公司名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_h_Name"></el-input>
        </el-form-item>

        <el-form-item label="公司图标:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图标
            <input type="file" name="" ref="upload1" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
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
  export default{
    name: '',
    data(){
      return {
        updateOptions:{},
        isShow:true,
        formLabelWidth: '120px',
        addDialog:false,
        updateDialog:false,
        agentID:'',
        isLoading:false,
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
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
          .then(data => {
            relove(data.base64.split(',')[1])
          })
        })
      },
      //
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
        this.ImageURL = [];
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('CarUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL = []
                      this.ImageURL.push(data.data);
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
                //   this.$store.dispatch('CarUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload1.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL1 = []
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
        this.ImageURL = [];
        this.ImageURL1 = [];
        this.addDialog = true;
        this.uploaNode();
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
        this.ImageURL = [];
        this.ImageURL1 = [];
        this.updateOptions = obj;
        this.updateDialog = true;
        this.uploaNode();
        this.$store.commit('setTranstionFalse');
      },
      //修改提交
      updateSubmit(){
        this.updateOptions.cr_h_Logo = this.ImageURL1.join(',');
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateOptions
        }
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
    width: 90px;
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
</style>
