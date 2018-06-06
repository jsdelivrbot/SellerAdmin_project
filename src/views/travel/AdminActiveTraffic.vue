<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">活动交通</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>活动购物筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-autocomplete
            style="width: 200px"
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择产品"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-select v-model="userSearchID" placeholder="请选择产品线路"  @change="changeLineID" style="width: 150px">
            <el-option
              v-for="item in adminProductLine"
              :key="item.ts_pt_ID"
              :label="item.ts_pt_Name"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="LineID" placeholder="请选择线路日程" style="width: 150px" @change="changeLineTime">
            <el-option
              v-for="item in adminLinePrepare"
              :key="item.ts_pt_ID"
              :label="'第'+item.ts_pt_Day+'天'"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="TimeID" placeholder="请选择日程时间" style="width: 150px" @change="changeTimeActive">
            <el-option
              v-for="item in adminScheduleTimeList"
              :key="item.ts_tt_ID"
              :label="item.ts_tt_DoTime"
              :value="item.ts_tt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="TimeActiveID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="addAdminActiveTraffic">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="adminActiveTrafficList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        align="center"
        label="主键编号"
        prop="ts_at_ID">
      </el-table-column>

      <el-table-column
        align="center"
        label="时间活动编号"
        prop="ts_at_TimeActivityID">
      </el-table-column>
      <el-table-column
        align="center"
        label="花费时间">
        <template slot-scope="scope">
          {{scope.row.ts_at_WasteTime}}分钟
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="行驶距离">
        <template slot-scope="scope">
          {{scope.row.ts_at_Distance}}km
        </template>
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
            :content="scope.row.ts_at_DoWork">
          </el-popover>
          <el-button v-popover:popover1>移入查看</el-button>
        </template>

      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            ref="popover1"
            placement="top-start"
            width="200"
            trigger="hover"
            :content="scope.row.ts_at_Remark">
          </el-popover>
          <el-button v-popover:popover1>移入查看</el-button>
        </template>

      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminActiveTraffic(scope.row.ts_at_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminActiveTraffic(scope.row.ts_at_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加活动交通-->
    <el-dialog title="添加活动交通" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_at_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶距离:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_at_Distance"></el-input>
          <span style="color: #f60">(单位:km)</span>
        </el-form-item>
        <el-form-item label="花费时间:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_at_WasteTime"></el-input><span style="color: #f60">(单位:分钟)</span>
        </el-form-item>
        <el-form-item label="所做内容:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_at_doWork" type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_at_Remark"  type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminActiveTrafficSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改活动交通-->
    <el-dialog title="修改活动交通" :visible.sync="updateDialog">
      <el-form :model="addOptions">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminActiveTrafficObj.ts_at_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶距离:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveTrafficObj.ts_at_Distance"></el-input>
          <span style="color: #f60">(单位:km)</span>
        </el-form-item>
        <el-form-item label="花费时间:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveTrafficObj.ts_at_WasteTime"></el-input><span style="color: #f60">(单位:分钟)</span>
        </el-form-item>
        <el-form-item label="所做内容:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveTrafficObj.ts_at_DoWork" type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveTrafficObj.ts_at_Remark"  type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminActiveTrafficSubmit">确 定</el-button>
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
        userName:'',
        GoodId: '',
        LineID: '',
        TimeID:'',
        userSearchID: '',
        TimeActiveID:'',
        isLoading: false,
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_at_TimeActivityID": "",
            "ts_at_Distance": "",
            "ts_at_DoWork": "",
            "ts_at_WasteTime": "",
            "ts_at_Remark": ""
          }
        }
      }
    },
    computed: mapGetters([
      'adminProductLine',
      'adminTradeGoodList',
      'adminLinePrepare',
      'adminScheduleTimeList',
      'adminTimeActivitiesList',
      'adminActivityMealManagementId',
      'adminActiveTrafficList',
      'updateAdminActiveTrafficObj'
    ]),
    methods: {
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
            "tradeID": obj.sm_ai_ID ? obj.sm_ai_ID : '',
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
          "goodID": this.userSearchID ? this.userSearchID : ''
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
      //选中线路日程
      changeLineTime() {
        this.TimeID = '';
        let initOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "isDelete": "0",
          "goodID": this.LineID ? this.LineID : ''
        };
        this.$store.dispatch('initAdminScheduleTime', initOptions)
      },
      //选中时间活动管理
      changeTimeActive() {
        let initScheduleTimeOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID": this.TimeID? this.TimeID : ''
        };
        this.$store.dispatch('initAdminTimeActivities', initScheduleTimeOptions)
        .then(() => {
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
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
        this.$store.dispatch('initAdminActiveTraffic',options)
      },
      //查询
      search(){
        if(!this.TimeActiveID){
          this.$notify({
            message: '请选择筛选条件',
            type: 'error'
          });
          return;
        }
        this.initData(this.TimeActiveID);
      },
      //添加
      addAdminActiveTraffic(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addAdminActiveTrafficSubmit(){
        this.$store.dispatch('AddAdminActiveTraffic',this.addOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData(this.addOptions.data.ts_at_TimeActivityID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addDialog = false;
      },
      //修改
      updateAdminActiveTraffic(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('initUpdateAdminActiveTrafficObj',id)
      },
      //修改提交
      updateAdminActiveTrafficSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminActiveTrafficObj
        };
        this.$store.dispatch('UpdateAdminActiveTraffic',updateOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData(this.updateAdminActiveTrafficObj.ts_at_TimeActivityID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateDialog = false;
      },
      //删除
      deleteAdminActiveTraffic(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminActiveTraffic',deleteOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          if(this.TimeActiveID){
            this.initData(this.TimeActiveID);
          }else{
            this.initData(this.adminActivityMealManagementId);
          }
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      }
    },
    mounted(){
      if(this.adminActivityMealManagementId){
        this.initData(this.adminActivityMealManagementId);
      }
    }
  }
</script>
<style scoped>

</style>
