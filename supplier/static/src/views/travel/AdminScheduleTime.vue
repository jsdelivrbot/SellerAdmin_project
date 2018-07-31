<template>
  <div>
    <section id="wrap">
      <div style="margin: 30px 0 30px 0px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="AdminMerchantProducts">商家产品</el-breadcrumb-item>
          <el-breadcrumb-item  @click.native="toLine">产品线路</el-breadcrumb-item>
          <el-breadcrumb-item  @click.native="toDayLine">日程线路</el-breadcrumb-item>
          <el-breadcrumb-item>日程时间</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h1 class="userClass">日程时间信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>线路日程筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择产品"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="userSearchID" placeholder="请选择产品线路"  @change="changeLineID">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="LineID" placeholder="请选择线路日程">
              <el-option
                v-for="item in adminLinePrepare"
                :key="item.ts_pt_ID"
                :label="'第'+item.ts_pt_Day+'天'"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdminScheduleTime">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        :data="adminScheduleTimeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="主键编号"
          prop="ts_tt_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="日程编码"
          prop="ts_tt_LinePrepareID">
        </el-table-column>
        <el-table-column
          label="所做内容"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover
              ref="popover1"
              placement="top-start"
              width="200"
              trigger="hover"
              :content="scope.row.ts_tt_DoWork">
            </el-popover>
            <el-button v-popover:popover1>移入查看</el-button>
          </template>

        </el-table-column>
        <el-table-column
          align="center"
          label="排序"
          prop="ts_tt_Turn">
        </el-table-column>
        <el-table-column
          align="center"
          label="时间"
          prop="ts_tt_DoTime">
        </el-table-column>
        <el-table-column
          align="center"
          label="备注">
          <template slot-scope="scope">
            {{scope.row.ts_tt_Remark?scope.row.ts_tt_Remark:""}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminScheduleTime(scope.row.ts_tt_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deletAdminScheduleTime(scope.row.ts_tt_ID)">删除
            </el-button>
            <el-button
              size="mini"
              @click="timeActivityManagement(scope.row.ts_tt_ID)">时间活动管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!--添加日程时间-->
    <el-dialog title="添加日程时间" :visible.sync="addAdminScheduleTimeDialog">
      <el-form :model="addOptions">
        <el-form-item label="请选择线路日程:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_tt_LinePrepareID" placeholder="请选择线路日程">
            <el-option
              v-for="item in adminLinePrepare"
              :key="item.ts_pt_ID"
              :label="'第'+item.ts_pt_Day+'天'"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日程时间:" :label-width="formLabelWidth">
          <el-time-select
            v-model="addOptions.data.ts_tt_DoTime"
            :picker-options="{
              start: '05:30',
              step: '00:15',
              end: '24:00'
            }"
            value-format="HH:ss"
            placeholder="请输入日程时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="顺序:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_tt_Turn" placeholder="请选择顺序">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
            <el-option label="9" value="9"></el-option>
            <el-option label="10" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所做内容:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_tt_DoWork" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_tt_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminScheduleTimeDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminScheduleTimeSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改日程时间-->
    <el-dialog title="修改日程时间" :visible.sync="updateAdminScheduleTimeDialog">
      <el-form :model="addOptions">
        <el-form-item label="请选择线路日程:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminScheduleTimeObj.ts_tt_LinePrepareID" placeholder="请选择线路日程">
            <el-option
              v-for="item in adminLinePrepare"
              :key="item.ts_pt_ID"
              :label="'第'+item.ts_pt_Day+'天'"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日程时间:" :label-width="formLabelWidth">
          <el-time-select
            v-model="updateAdminScheduleTimeObj.ts_tt_DoTime"
            :picker-options="{
              start: '05:30',
              step: '00:15',
              end: '24:00'
            }"
            value-format="HH:ss"
            placeholder="请输入日程时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="顺序:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminScheduleTimeObj.ts_tt_Turn" placeholder="请选择顺序">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
            <el-option label="9" value="9"></el-option>
            <el-option label="10" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所做内容:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminScheduleTimeObj.ts_tt_DoWork" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminScheduleTimeObj.ts_tt_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminScheduleTimeDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminScheduleTimeSubmit">确 定</el-button>
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
        GoodId: '',
        LineID: '',
        userName:'',
        isLoading: false,
        formLabelWidth:'120px',
        addAdminScheduleTimeDialog:false,//添加弹窗
        updateAdminScheduleTimeDialog:false,//修改弹窗
        userSearchID: '',
        value:'',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_tt_LinePrepareID": "",
            "ts_tt_DoWork": "",
            "ts_tt_Turn": '',
            "ts_tt_DoTime": "",
            "ts_tt_Remark": ""
          }
        }
      }
    },
    computed: mapGetters([
      'adminProductLine',
      'adminTradeGoodList',
      'adminLinePrepare',
      'adminScheduleTimeList',
      'updateAdminScheduleTimeObj',
      'adminScheduleTimeManagementId',
      'adminProductLineManagementId'
    ]),
    methods: {
      toDayLine(){
        this.$router.push({name:'AdminQueryProductInformationList',query:{timeID:this.adminScheduleTimeManagementId,name:'线路日程'}})
      },
      toLine(){
        this.$router.push({name:'AdminQueryProductInformation',query:{lineID:this.adminProductLineManagementId}})
      },
      //选中产品
      handleSelect(item) {
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
            "rows": 100
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
      //选中产品线路
      changeLineID(){
        this.LineID = '';
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID": this.userSearchID? this.userSearchID : ''
        };
        this.$store.dispatch('initAdminLinePrepare', options)
        .then(() => {
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      initData(id){
        let initOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "isDelete":"0",
          "goodID": id ? id : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminScheduleTime', initOptions)
        .then(() => {
          this.isLoading = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //查询
      search(){
        if(this.userName==''){
          this.$notify({
            message: '请选择对应产品!',
            type: 'error'
          });
          return;
        }
        if(this.userSearchID==''){
          this.$notify({
            message: '请选择对应产品线路!',
            type: 'error'
          });
          return;
        }
        if(this.LineID==''){
          this.$notify({
            message: '请选择对应线路日程!',
            type: 'error'
          });
          return;
        }
        this.initData(this.LineID)
      },
      //查询初始化数据
      searchInitData(){
        if(this.adminScheduleTimeManagementId){
          this.initData(this.adminScheduleTimeManagementId)
        }
      },
      //添加
      addAdminScheduleTime(){
        this.$store.commit('setTranstionFalse');
        this.addAdminScheduleTimeDialog = true
      },
      //添加提交
      addAdminScheduleTimeSubmit(){
        this.$store.dispatch('AddAdminScheduleTime',this.addOptions)
        .then(() => {
          this.$notify({
            message: '添加成功!',
            type: 'success'
          });
          this.initData(this.addOptions.data.ts_tt_LinePrepareID)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addAdminScheduleTimeDialog = false;
      },
      //修改
      updateAdminScheduleTime(id){
        this.updateAdminScheduleTimeDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminScheduleTimeObj',id)
      },
      //修改提交
      updateAdminScheduleTimeSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_tt_ID": this.updateAdminScheduleTimeObj.ts_tt_ID,
            "ts_tt_LinePrepareID": this.updateAdminScheduleTimeObj.ts_tt_LinePrepareID,
            "ts_tt_DoWork": this.updateAdminScheduleTimeObj.ts_tt_DoWork,
            "ts_tt_Turn": this.updateAdminScheduleTimeObj.ts_tt_Turn,
            "ts_tt_DoTime": this.updateAdminScheduleTimeObj.ts_tt_DoTime,
            "ts_tt_Remark": this.updateAdminScheduleTimeObj.ts_tt_Remark
          }
        };
        this.$store.dispatch('UpdateAdminScheduleTime',updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.updateAdminScheduleTimeObj.ts_tt_LinePrepareID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateAdminScheduleTimeDialog = false
      },
      //删除
      deletAdminScheduleTime(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ttID": id
        };
        this.$store.dispatch('DeletAdminScheduleTime',deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            if(this.adminScheduleTimeManagementId){
              this.initData(this.adminScheduleTimeManagementId)
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //点击跳转到时间活动管理
      timeActivityManagement(id){
        this.$store.commit('adminTimeActivityManagementId',id);
        this.$router.push({name:'AdminTimeActivities'});
        sessionStorage.setItem('index','4')
      }
    },
    mounted(){
      this.searchInitData();
    }
  }
</script>
<style scoped>

</style>
