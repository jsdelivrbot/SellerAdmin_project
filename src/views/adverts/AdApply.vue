<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告申请管理</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <!--<el-form-item>-->
            <!--<span>广告申请名称筛选:</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input type="text" v-model="adApply" auto-complete="off"  placeholder="广告申请" size="small"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table v-loading="isLoading" :data="adApplyList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请广告编码">
                <span>{{ props.row.sm_aa_ID }}</span>
              </el-form-item>
              <el-form-item label="位置信息编码">
                <span>{{ props.row.sm_aa_LocationID }}</span>
              </el-form-item>
              <el-form-item label="广告类型编码 ID">
                <span>{{ props.row.sm_aa_AdviertiseTypeID }}</span>
              </el-form-item>
              <el-form-item label="供应商编码 ID">
                <span>{{ props.row.sm_aa_AgentID }}</span>
              </el-form-item>
              <el-form-item label="广告图片">
                <img :src="item" v-for="item in props.row.sm_aa_Images" width="80" height="50" alt="">
              </el-form-item>
              <el-form-item label="广告描述">
                <span>{{ props.row.sm_aa_Describe }}</span>
              </el-form-item>
              <el-form-item label="产品ID">
                <span>{{ props.row.sm_aa_ProductID }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.sm_aa_CreateTime | getNewDate}}</span>
              </el-form-item>
              <el-form-item label="审核时间">
                <span>{{ props.row.sm_aa_PassTime | getNewDate}}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <span>{{ props.row.sm_aa_PassState | getAdApplyPass}}</span>
              </el-form-item>
              <el-form-item label="审核失败原因">
                <span>{{ props.row.sm_aa_FailedReason }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.sm_aa_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="申请广告编码"
          prop="sm_aa_ID">
        </el-table-column>
        <el-table-column
          label="审核时间"
          prop="sm_aa_PassTime">
          <template slot-scope="props">
            <span>{{props.row.sm_aa_PassTime | getNewDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          prop="sm_aa_PassState">
          <template slot-scope="props">
            <span>{{props.row.sm_aa_PassState | getAdApplyPass}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="sm_aa_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="Update(scope.row.sm_aa_ID)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="Delete(scope.row.sm_aa_ID)">删除
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      <!--添加-->
      <el-dialog title="添加广告申请" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <!--<el-form-item label="申请广告编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.sm_aa_ID" :disabled="isOff"   placeholder="请输入申请广告编码" ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="广告类型名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_aa_AdviertiseTypeID" placeholder="请选择广告类型名称">
              <el-option
                v-for="item in adTypeApplyAllList"
                :key="item.sm_at_ID"
                :label="item.sm_at_Name"
                :value="item.sm_at_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="位置信息编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.sm_aa_LocationID" placeholder="位置信息编码" ></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="位置信息:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_aa_LocationID" placeholder="请选择位置信息">
              <el-option
                v-for="item in adPositionAllList"
                :key="item.sm_pi_ID"
                :label="item.sm_pi_Name"
                :value="item.sm_pi_ID">
              </el-option>
            </el-select>

          </el-form-item>
          <!--<el-form-item label="供应商编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.sm_aa_AgentID" placeholder="供应商编码" ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="广告图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">推荐类型图片上传
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
          </el-form-item>
          <el-form-item label="广告描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_Describe" placeholder="广告描述" ></el-input>
          </el-form-item>
          <el-form-item label="产品ID:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_ProductID" placeholder="产品ID" ></el-input>
          </el-form-item>
          <!--<el-form-item label="创建时间:" :label-width="formLabelWidth">-->
            <!--<el-date-picker-->
              <!--v-model="addOptions.data.sm_aa_CreateTime"-->
              <!--type="date"-->
              <!--placeholder="创建时间">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="审核状态:" :label-width="formLabelWidth">-->
            <!--<el-switch-->
              <!--v-model="addOptions.data.sm_aa_PassState"-->
              <!--active-color="#13ce66"-->
              <!--inactive-color="#ff4949"-->
              <!--active-value="1"-->
              <!--inactive-value="2"-->
              <!--active-text="通过"-->
              <!--inactive-text="不通过"-->
              <!--@change="OnChange"-->
            <!--&gt;-->
            <!--</el-switch>-->
          <!--</el-form-item>-->



          <!--<el-form-item label="审核状态:" :label-width="formLabelWidth">-->
            <!--<el-select v-model="addOptions.data.sm_aa_PassState"-->
              <!--placeholder="审核状态"-->
              <!--@change="OnChange"-->
            <!--&gt;-->
              <!--<el-option-->
                <!--v-for="item in passOptions"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value"-->
              <!--&gt;-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="审核时间:" :label-width="formLabelWidth">-->
            <!--<el-date-picker-->
              <!--v-model="addOptions.data.sm_aa_PassTime"-->
              <!--type="date"-->
              <!--placeholder="审核时间">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="审核员编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_OperateCode" placeholder="审核员编码" ></el-input>
          </el-form-item>
          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="isShow">
            <el-input v-model="addOptions.data.sm_aa_FailedReason" placeholder="审核失败原因" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_Remark" placeholder="请输入备注" type="textarea" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改广告申请" :visible.sync="updateDialog" :close-on-click-modal="false">
        <el-form :model="updateAdApplyObj">
          <el-form-item label="申请广告编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_ID" placeholder="请输入申请广告编码" :disabled="isOff"  ></el-input>
          </el-form-item>
          <!--<el-form-item label="广告类型编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_AdviertiseTypeID" placeholder="请输入广告类型编码" ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="广告类型名称:" :label-width="formLabelWidth">
            <el-select v-model="updateAdApplyObj.sm_aa_AdviertiseTypeID" placeholder="请选择广告类型名称">
              <el-option
                v-for="item in adTypeApplyAllList"
                :key="item.sm_at_ID"
                :label="item.sm_at_Name"
                :value="item.sm_aa_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置信息:" :label-width="formLabelWidth">
            <el-select v-model="updateAdApplyObj.sm_aa_LocationID" placeholder="请选择位置信息">
              <el-option
                v-for="item in adPositionAllList"
                :key="item.sm_aa_LocationID"
                :label="item.sm_pi_Name"
                :value="item.sm_aa_LocationID">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="供应商编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_AgentID" placeholder="供应商编码"  ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="广告图片:" :label-width="formLabelWidth">
            <a href="javascript:void(0);" class="file">推荐类型图片上传
              <input type="file" name="" ref="upload1" accept="image/*" multiple>
            </a>
            <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
          </el-form-item>
          <el-form-item label="广告描述:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_Describe" placeholder="请输入广告描述" ></el-input>
          </el-form-item>
          <el-form-item label="产品ID:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_ProductID" placeholder="请输入产品ID"  ></el-input>
          </el-form-item>
          <!--<el-form-item label="创建时间:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_CreateTime" placeholder="请输入创建时间" ></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="审核状态:" :label-width="formLabelWidth">-->
            <!--<el-select v-model="updateAdApplyObj.sm_aa_PassState" placeholder="审核状态" @change="OnChangeUpdate">-->
              <!--<el-option v-for="item in updatePassOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="审核状态:" :label-width="formLabelWidth">
          <el-switch
          v-model="updateAdApplyObj.sm_aa_PassState"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="2"
          active-text="通过"
          inactive-text="不通过"
          @change="OnChangeUpdate"
          >
          </el-switch>
          </el-form-item>
          <!--<el-form-item label="审核时间:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_PassTime" placeholder="请输入审核时间"  ></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="审核员编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_OperateCode" placeholder="请输入审核员编码"  ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="isShow1">
            <el-input v-model="updateAdApplyObj.sm_aa_FailedReason" placeholder="请输入审核失败原因" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_Remark" placeholder="请输入备注" type="textarea" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdApplySubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'

  export default{
    name: '',
    data(){
      return {
        userInfo: {},
        loginUserID: "huileyou",
        isOff:true,
        value:0,
        isShow:true,
        isShow1:true,
        ImageURL:[],
        ImageURL1:[],
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        adApply:'',
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            // "sm_aa_ID": "",//申请广告编码
            "sm_aa_AdviertiseTypeID": "",//广告类型编码
            "sm_aa_LocationID": "",//位置信息编码
            "sm_aa_AgentID": this.userInfo,//供应商编码
            "sm_aa_Image": "",//广告图片
            "sm_aa_Describe": "",//广告描述
            "sm_aa_ProductID": "",//产品ID
            // "sm_aa_CreateTime": "",//创建时间
            // "sm_aa_PassState": "",//审核状态
            // "sm_aa_PassTime": "",//审核时间
            "sm_aa_OperateCode": "",//审核员编码
            "sm_aa_FailedReason": "",//审核失败原因
            "sm_aa_Remark": "",//备注
          }
        },//添加参数
        passOptions: [{
          value: '3',
          label: '审核中'
        }, {
          value: '1',
          label: '通过'
        }, {
          value: '2',
          label: '不通过'
        }],
        updatePassOptions:[{
        value: '3',
        label: '审核中'
      }, {
        value: '1',
        label: '通过'
      }, {
        value: '2',
        label: '不通过'
      }],
      }
    },
    computed: mapGetters([
      'adTypeApplyAllList',
      'adApplyList',
      'updateAdApplyObj',
      'adPositionAllList'
    ]),
    created(){
      this.userInfo = JSON.parse(sessionStorage.getItem('admin')).sm_ai_AgentID;
      this.initData()
      this.adPositionAll()
      this.initAdTypeAllList()
    },
    methods: {
      //初始化
      initData(){
        let options = {
          "loginUserID": this.loginUserID,
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_aa_ID": "",//申请广告编码
          "sm_aa_AdviertiseTypeID": "",//广告类型编码
          "sm_aa_LocationID": "",//位置信息编码
          "sm_aa_AgentID": "",//供应商编码
          "sm_aa_Image": "",//广告图片
          "sm_aa_Describe": "",//广告描述
          "sm_aa_ProductID": "",//产品ID
          "sm_aa_CreateTime": "",//创建时间
          "sm_aa_PassState": "",//审核状态
          "sm_aa_PassTime": "",//审核时间
          "sm_aa_OperateCode": "",//审核员编码
          "sm_aa_FailedReason": "",//审核失败原因
          "sm_aa_Remark": "",//备注
        }
        this.isLoading = true;
        this.$store.dispatch('initAdApply',options)
          .then(total=>{
            this.total = total;
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询广告位置所有信息
      adPositionAll(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_pi_ID": "",//位置信息编码
          "sm_pi_LocationNo": "",//位置编码
          "sm_pi_MaxNo": "",//最大广告数
          "sm_pi_Name":'',//位置名称
          "sm_pi_Remark": "",//备注
        }
        this.$store.dispatch('initAdPositionAll',options)
          .then(total=>{
            this.total = total;
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询广告类型所有数据
      initAdTypeAllList(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_at_ID": "",//广告类型编号
          "sm_at_Name":"",//广告类型名称
          "sm_at_CreateTime": "",//创建时间
          "sm_at_Cost": "",//收费金额
          "sm_at_Remark": "",//备注
          "page": 1,
          "rows": 10
        };
        this.$store.dispatch('initAdTypeAllList',options)
          .then(total=>{
            this.total = total;
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },

      //查询
      search(){
        this.initData()
      },
      //添加
      Add(){
        for(let attr in this.addOptions.data){
          if(typeof this.addOptions.data[attr]=='object'){
            for(let attr1 in this.addOptions.data[attr]){
              this.addOptions.data[attr][attr1] = ''
            }
          }else{
            this.addOptions.data[attr] = ''
          }
        }
        //清空上一次添加的数据
        let obj = this.addOptions.data;
        for(var i in obj){
          obj[i]=""
        };
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode();
      },
      //添加提交
      addSubmit(){
        //图片提交时赋值
        this.addOptions.data.sm_aa_Image = this.ImageURL.join(',');
        this.$store.dispatch('AddAdApply',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });

            this.initData()
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
      //申请状态
      OnChange(){
        if(this.addOptions.data.sm_aa_PassState==1){
          this.isShow=false;
        }
        else this.isShow=true;
      },
      OnChangeUpdate(){
        if(this.updateAdApplyObj.sm_aa_PassState==1){
          this.isShow1=false;
        }
        else this.isShow1=true;
      },
      //图片转二进制
      uploadImg(file) {
        return new Promise((relove, reject) =>{
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
          xhr.open("POST", getNewStr + "/OSSFile/PostToOSS");
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
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdApply',id);
        this.updateAdApplyObj.sm_aa_PassState="";
        this.uploaNode();
      },
      //修改提交
      updateAdApplySubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          // "data": this.updateAdApplyObj
          "data": {
            "sm_aa_ID": this.updateAdApplyObj.sm_aa_ID,//申请广告编码
            "sm_aa_AdviertiseTypeID": this.updateAdApplyObj.sm_aa_AdviertiseTypeID,//广告类型编码
            "sm_aa_LocationID": this.updateAdApplyObj.sm_aa_LocationID,//位置信息编码
            "sm_aa_AgentID": this.userInfo,//供应商编码
            "sm_aa_Image": this.updateAdApplyObj.sm_aa_Image,//广告图片
            "sm_aa_Describe": this.updateAdApplyObj.sm_aa_Describe,//广告描述
            "sm_aa_ProductID": this.updateAdApplyObj.sm_aa_ProductID,//产品ID
            "sm_aa_PassState": this.updateAdApplyObj.sm_aa_PassState,//审核状态
            "sm_aa_OperateCode": this.updateAdApplyObj.sm_aa_OperateCode,//审核员编码
            "sm_aa_FailedReason": this.updateAdApplyObj.sm_aa_FailedReason,//审核失败原因
            "sm_aa_Remark": this.updateAdApplyObj.sm_aa_Remark,//备注
          }

        };
       // console.log(updateOptions)
        updateOptions.data.sm_aa_Image = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateAdApplyObj',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adApply)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_aa_ID": id,//申请广告编码
          }
        };
        this.$store.dispatch('DeleteAdApply',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adApply)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      }
    },
  }
</script>
<style scoped>

</style>
