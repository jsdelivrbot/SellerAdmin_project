<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">线路日程信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>线路日程筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              size="small"
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择产品"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="userSearchID" placeholder="请选择产品线路" size="small">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdminLinePrepare" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="adminLinePrepare"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="主键编号:">
                <span>{{ props.row.ts_pt_ID }}</span>
              </el-form-item>
              <el-form-item label="活动内容:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover">
                  <p v-for="item,index in props.row.activityContentList" style="padding: 20px;width: 500px">({{index+1}}):{{item.ts_gi_Name}}</p>
                </el-popover>
                <el-button v-popover:popover1 size="small">移入查看</el-button>
                  <!--<p v-for="item in props.row.activityContentList">{{item.ts_gi_Name}}</p>-->
              </el-form-item>
              <el-form-item label="活动图片:">
                <img :src="item.ts_gi_Name" alt="" v-for="item in props.row.activityImage" style="width: 100px;height: 100px;margin-right: 10px">
              </el-form-item>
              <el-form-item label="线路编号:">
                <span>{{ props.row.ts_pt_Product_LineID }}</span>
              </el-form-item>
              <el-form-item label="日程名称:">
                <span>{{ props.row.ts_pt_Name }}</span>
              </el-form-item>
              <el-form-item label="产品描述:">
                <el-popover
                  ref="popover2"
                  placement="top-start"
                  trigger="hover">
                  <p  style="padding: 20px;width: 500px">{{props.row.ts_pt_Describe}}</p>
                </el-popover>
                <el-button v-popover:popover2 size="small">移入查看</el-button>
              </el-form-item>
              <el-form-item label="展示图片地址:">
                <img :src="item" alt="" v-for="item in props.row.ts_pt_ShowImage" style="width: 100px;height: 100px;margin-right: 10px">
                <!--<p v-for="item in props.row.ta_tg_ShowImages">{{ item }}</p>-->
              </el-form-item>
              <el-form-item label="第几天日程:">
                <span>{{ props.row.ts_pt_Day }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="主键编号"
          prop="ts_pt_ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="线路编号"
          align="center"
          prop="ts_pt_Product_LineID">
        </el-table-column>
        <el-table-column
          label="日程名称"
          align="center"
          prop="ts_pt_Name">
        </el-table-column>
        <el-table-column
          label="第几天日程"
          align="center"
          prop="ts_pt_Day">
        </el-table-column>

        <el-table-column
          align="center"
          label="备注">
          <template slot-scope="props">
            <el-popover
              ref="popover1"
              placement="top-start"
              trigger="hover"
              :content="props.row.ts_pt_Remark">
            </el-popover>
            <el-button v-popover:popover1 size="small">移入查看</el-button>
          </template>

        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminLinePrepare(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminLinePrepare(scope.row.ts_pt_ID)">删除
            </el-button>
            <!--<el-button-->
              <!--size="mini"-->
              <!--@click="scheduleTimeManagement(scope.row.ts_pt_ID)">日程时间管理-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <!--添加线路日程-->
      <el-dialog title="添加线路日程" :visible.sync="addAdminLinePrepareDialog">
        <el-form :model="addOptions">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.ts_pt_Product_LineID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日程名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ts_pt_Name" placeholder="请输入日程名称"></el-input>
          </el-form-item>
          <el-form-item label="展示图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <p v-for="item in ImageURL" v-show="ImageURL.length">{{item?item:""}}</p>
          </el-form-item>
          <el-form-item label="活动图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">活动图片上传
              <input type="file" name="" ref="upload2" accept="image/*" multiple>
            </a>
            <img v-lazy="item.ts_gi_Name" v-for="item in ImageURL2"  width="128" height="80">
          </el-form-item>
          <el-form-item label="活动内容:" :label-width="formLabelWidth">
            <el-button type="primary" size="small" @click="addActivityContent">添加</el-button>
            <div v-show="addOptions.activityContent.length" v-for="item,index in addOptions.activityContent">
              <span style="margin: 10px 20px 10px 0">活动内容{{index+1}} : {{item.ts_gi_Name}}</span>
              <el-button type="success" size="small" @click="updateActivityContent(item,index)">修改</el-button>
              <el-button type="danger" size="small" @click="deleteActivityContent(item,index)">删除</el-button>
            </div>
          </el-form-item>

          <el-form-item label="第几天日程:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.ts_pt_Day" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="addOptions.data.ts_pt_Day" placeholder="请输入第几天日程"></el-input>-->
          </el-form-item>
          <el-form-item label="产品描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ts_pt_Describe" placeholder="请输入产品描述" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAdminLinePrepareDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminLinePrepareSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改线路日程-->
      <el-dialog title="修改线路日程" :visible.sync="updateAdminLinePrepareDialog">
        <el-form :model="updateAdminLinePrepareObj">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminLinePrepareObj.ts_pt_Product_LineID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日程名称:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Name" placeholder="请输入日程名称"></el-input>
          </el-form-item>
          <el-form-item label="活动内容:" :label-width="formLabelWidth">
            <el-button type="primary" size="small" @click="addActivityContent">添加</el-button>
            <div v-show="updateAdminLinePrepareObj.activityContentList.length" v-for="item,index in updateAdminLinePrepareObj.activityContentList">
              <span style="margin: 10px 20px 10px 0">活动内容{{index+1}} : {{item.ts_gi_Name}}</span>
              <el-button type="success" size="small" @click="updateActivityContent(item,index)">修改</el-button>
              <el-button type="danger" size="small" @click="deleteActivityContent(item,index)">删除</el-button>
            </div>
          </el-form-item>

          <el-form-item label="活动图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">添加图片
              <input type="file" name="" ref="upload3" accept="image/*" multiple>
            </a>
            <div v-show="updateAdminLinePrepareObj.activityImage.length" v-for="item,index in updateAdminLinePrepareObj.activityImage">
              <img v-lazy="item.ts_gi_Name"  width="128" height="80">
              <el-button type="danger" size="small" @click="deleteActivityImage(item,index)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item label="展示图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload1" accept="image/*" multiple>
            </a>
            <p v-if="ImageURL.length" v-for="item in ImageURL">{{item}}</p>
            <p v-for="item in updateAdminLinePrepareObj.ts_pt_ShowImage" v-show="updateAdminLinePrepareObj.ts_pt_ShowImage.length" v-else>{{item?item:""}}</p>
          </el-form-item>
          <el-form-item label="第几天日程:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Day" placeholder="请输入第几天日程"></el-input>
          </el-form-item>
          <el-form-item label="产品描述:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Describe" placeholder="请输入内容" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateAdminLinePrepareDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminLinePrepareSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>

    <!--活动内容弹窗-->
    <el-dialog title="添加活动内容" :visible.sync="addActivityContentDialog">
      <el-form>
        <el-form-item label="活动内容:" :label-width="formLabelWidth">
          <el-input v-model="activityContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addActivityContentDialog = false">取 消</el-button>
        <el-button type="primary" @click="addActivityContentSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改活动内容" :visible.sync="updateActivityContentDialog">
      <el-form :model="updateActivityContentObj">
        <el-form-item label="活动内容:" :label-width="formLabelWidth">
          <el-input v-model="updateActivityContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateActivityContentDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateActivityContentSubmit(updateActivityContentObj)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'

  export default{
    name: '',
    data(){
      return {
        options:[],
        updateActivityContentObj:{},
        addActivityContentDialog:false,
        updateActivityContentDialog:false,
        activityContent:'',
        GoodId: '',
        LineID: '',
        userName: '',
        ImageURL: [],
        ImageURL2:[],
        isLoading: false,
        userSearchID: '',
        formLabelWidth: '120px',
        addAdminLinePrepareDialog:false,
        updateAdminLinePrepareDialog:false,
        updateAdminLinePrepareObj:{},
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          activityContent:[],
          activityImage:[],
          "data": {
            "ts_pt_Product_LineID": "",
            "ts_pt_Name": "",
            "ts_pt_Day": "",
            "ts_pt_Remark": "",
            ts_pt_Describe:'',
            ts_pt_ShowImage:'',
          }
        }
      }
    },
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminQueryProductList',
      'adminLinePrepare',
//      'updateAdminLinePrepareObj',
      'adminLineScheduleManagementId'
    ]),
    methods: {
      //图片转二进制
      uploadImg(file){
        return new Promise(function (relove, reject) {
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
          xhr.open("POST", getNewStr+"/OSSFile/PostToOSS");
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
      uploaNode(){
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('uploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
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
                //   this.$store.dispatch('uploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload1.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
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
          if (this.$refs.upload2) {
            this.$refs.upload2.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload2.files.length; i++) {
                // this.uploadImg(this.$refs.upload2.files[i]).then(data => {
                //   this.$store.dispatch('uploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload2.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL2.push({
                        ts_gi_Name:data.data
                      });
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
          if (this.$refs.upload3) {
            this.$refs.upload3.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload3.files.length; i++) {
                // this.uploadImg(this.$refs.upload3.files[i]).then(data => {
                //   this.$store.dispatch('uploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload3.files[i])
                  .then(data => {
                    if (data) {
                      let options = {
                        "loginUserID": "huileyou",
                        "loginUserPass": "123",
                        "operateUserID": "",
                        "operateUserName": "",
                        "pcName": "",
                        "data": {
                          "ts_gi_GoodID": this.updateAdminLinePrepareObj.ts_pt_ID,//产品编号
                          "ts_gi_ParentID": "8",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
                          "ts_gi_Name": data.data//类型名称
                        }
                      };
                      this.$store.dispatch('AddRecommendedReason',options)
                      .then(()=>{
                        this.selectInitData(this.updateAdminLinePrepareObj.ts_pt_ID,8)
                        .then(data=>{
                          this.updateAdminLinePrepareObj.activityImage = data
                        })
                      },err=>{
                       // console.log(err)
                      })
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
      //删除活动图片
      deleteActivityImage(item,index){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_gi_ID": item.ts_gi_ID//产品信息ID
          }
        }
        this.$store.dispatch('DeleteRecommendedReason',options)
        .then(()=>{
          this.selectInitData(this.updateAdminLinePrepareObj.ts_pt_ID,8)
          .then(data=>{
            this.updateAdminLinePrepareObj.activityImage = data
          })
        },err=>{
          //console.log(err)
        })
      },
      //查询很多
      selectInitData(id,ParentID){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_gi_GoodID": id,//产品编号
          "ts_gi_ParentID":ParentID?ParentID:''
        }
        return this.$store.dispatch('initSelectInitAllData',options)
      },
      //添加活动内容
      addActivityContent(){
        this.activityContent = '';
        this.$store.commit('setTranstionFalse');
        this.addActivityContentDialog = true;
      },
      //添加活动内容提交
      addActivityContentSubmit(){
        if(this.updateAdminLinePrepareObj.activityContentList){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminLinePrepareObj.ts_pt_ID,//产品编号
              "ts_gi_ParentID": "7",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.activityContent,
            }
          };
          this.$store.dispatch('AddRecommendedReason',options)
          .then(()=>{
            this.selectInitData(this.updateAdminLinePrepareObj.ts_pt_ID,7)
            .then(data=>{
              this.updateAdminLinePrepareObj.activityContentList = data
            })
          },err=>{
           // console.log(err)
          })
        }else{
          this.addOptions.activityContent.push({
            ts_gi_Name:this.activityContent
          });
        }
        this.addActivityContentDialog = false;
      },
      //修改活动内容
      updateActivityContent(item,index){
        this.updateActivityContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateActivityContentDialog = true;
      },
      //修改活动内容提交
      updateActivityContentSubmit(item){
        if(this.updateAdminLinePrepareObj.activityContentList){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason',options)
          .then(()=>{
            this.updateActivityContentDialog = false;
          },err=>{
           // console.log(err)
          })
        }else{
          this.updateActivityContentDialog = false;
        }

      },
      //删除活动内容
      deleteActivityContent(item,index){
        if(this.updateAdminLinePrepareObj.activityContentList){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_pt_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason',options)
          .then(()=>{
            this.selectInitData(this.updateAdminLinePrepareObj.ts_pt_ID,7)
            .then(data=>{
              this.updateAdminLinePrepareObj.activityContentList = data
            })
          },err=>{
            //console.log(err)
          })
        }else{
          this.addOptions.activityContent =  this.addOptions.activityContent.filter((item,v)=>{
            if(index==v){
              return false;
            }
            return true;
          })
        }
      },
      //选中产品
      handleSelect(item) {
//        this.addOptions.data.ts_pt_Product_LineID = item.id;
        this.updateAdminLinePrepareObj.ts_pt_Product_LineID = item.id;
        this.userName = item.value;
        let options = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          goodID: item.id ? item.id : ''
        };
        this.$store.dispatch('initAdminProductLine', options)
      },
      loadAll(num, name) {
        return new Promise((relove, reject) => {
          var _this = this;
          let obj = JSON.parse(sessionStorage.getItem('admin'))
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "tradeID": obj.sm_ui_ID ? obj.sm_ui_ID : '',
            goodTitle:name?name:'',
            "userID": "",
            "pcName": "",
            "ID": '',
            'isDelete': 0,
            "page": 1,
            "rows": 40
          };
          this.$store.dispatch('initAdminTradeGoodList', options)
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
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          var  data = data.data
          data = data.map(item => {
            return {
              id: item.ta_tg_ID,
              value: item.ta_tg_Title
            }
          })
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
      },
      initData(id){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID": id?id:''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminLinePrepare',options)
        .then(()=>{
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
        if(!this.userSearchID){
          this.$notify({
            message: '请选择筛选条件',
            type: 'error'
          });
          return;
        }
        this.initData(this.userSearchID)
      },
      //查询初始化数据
      searchInitData(){
        if(this.adminLineScheduleManagementId){
          this.initData(this.adminLineScheduleManagementId)
        }
      },
      //添加
      addAdminLinePrepare(){
        this.ImageURL =[];
        this.ImageURL1 = [];
        let obj = this.addOptions.data;
        this.addOptions.activityContent = [];
        this.addOptions.activityImage = [];
        for(var attr in obj){
          obj[attr] = ''
        }

        this.$store.commit('setTranstionFalse');
        this.addAdminLinePrepareDialog = true;
        this.uploaNode()
      },
      //添加提交
      addAdminLinePrepareSubmit(){
        this.addOptions.activityImage =  this.ImageURL2;
        this.addOptions.data.ts_pt_ShowImage =  this.ImageURL.join(',');
        this.$store.dispatch('AddAdminLinePrepare',this.addOptions)
          .then(() => {
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
            this.initData(this.addOptions.data.ts_pt_Product_LineID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addAdminLinePrepareDialog = false;
      },
      //修改
      updateAdminLinePrepare(obj){
        this.updateAdminLinePrepareObj = obj
        this.$store.commit('setTranstionFalse');
        this.updateAdminLinePrepareDialog = true;
        this.uploaNode();
//        this.$store.commit('initUpdateAdminLinePrepareObj',id)
      },
      //修改提交
      updateAdminLinePrepareSubmit(){

        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          data:{
            "ts_pt_ID": this.updateAdminLinePrepareObj.ts_pt_ID,
            "ts_pt_Product_LineID": this.updateAdminLinePrepareObj.ts_pt_Product_LineID,
            "ts_pt_Name": this.updateAdminLinePrepareObj.ts_pt_Name,
            "ts_pt_Day": this.updateAdminLinePrepareObj.ts_pt_Day,
            "ts_pt_Describe": this.updateAdminLinePrepareObj.ts_pt_Describe,
            "ts_pt_ShowImage":  this.ImageURL.join(','),
            "ts_pt_Remark": this.updateAdminLinePrepareObj.ts_pt_Remark,
          }
        };
        this.$store.dispatch('UpdateAdminLinePrepare',updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData( this.updateAdminLinePrepareObj.ts_pt_Product_LineID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateAdminLinePrepareDialog = false;
      },
      //删除
      deleteAdminLinePrepare(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminLinePrepare',deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //点击跳转日程时间管理
      scheduleTimeManagement(id){
        this.$store.commit('adminScheduleTimeManagementId',id);
        this.$router.push({name:'AdminScheduleTime'});
        sessionStorage.setItem('index','3')
      }
    },
    created(){
      for(var i=1;i<21;i++){
        this.options.push({
          value:i
        })
      }
      let timeID = this.$route.query.timeID;
      if (timeID) {
        this.initData(timeID)
      }
    },
    mounted(){
      this.searchInitData();
    }
  }
</script>
<style scoped>

</style>
