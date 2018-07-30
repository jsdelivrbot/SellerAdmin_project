<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">活动景点</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>活动景点筛选:</span>
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
          <el-button type="primary" @click="addAdminActivitySite">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
      :data="adminActivitySiteList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        align="center"
        label="主键编号"
        prop="ts_as_ID">
      </el-table-column>

      <el-table-column
        align="center"
        label="景点编码"
        prop="ts_as_SiteID">
      </el-table-column>
      <el-table-column
        align="center"
        label="活动时间"
        prop="ts_as_Time">
      </el-table-column>
      <el-table-column
        align="center"
        label="时间活动编号"
        prop="ts_as_TimeActivityID">
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
            :content="scope.row.ts_as_Remark">
          </el-popover>
          <el-button v-popover:popover1>移入查看</el-button>
        </template>

      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminActivitySite(scope.row.ts_as_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminActivitySite(scope.row.ts_as_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加活动景点-->
    <el-dialog title="添加活动景点" :visible.sync="addAdminActivitySiteDialog">
      <el-form :model="addAdminActivitySiteObj">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="addAdminActivitySiteObj.data.ts_as_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="景点编号:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActivitySiteObj.data.ts_as_SiteID"></el-input>
        </el-form-item>
        <el-form-item label="活动时间:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActivitySiteObj.data.ts_as_Time"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActivitySiteObj.data.ts_as_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminActivitySiteDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminActivitySiteSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改活动景点-->
    <el-dialog title="修改活动景点" :visible.sync="updateAdminActivitySiteDialog">
      <el-form :model="updateAdminActivitySiteObj">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminActivitySiteObj.ts_as_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="景点编号:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActivitySiteObj.ts_as_SiteID"></el-input>
        </el-form-item>
        <el-form-item label="活动时间:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActivitySiteObj.ts_as_Time"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActivitySiteObj.ts_as_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminActivitySiteDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminActivitySiteSubmit">确 定</el-button>
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
        userName: '',
        GoodId: '',
        LineID: '',
        TimeID:'',
        userSearchID: '',
        TimeActiveID:'',
        isLoading: false,
        addAdminActivitySiteDialog:false,
        updateAdminActivitySiteDialog:false,
        formLabelWidth:'120px',
        //添加活动景点
        addAdminActivitySiteObj:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_as_TimeActivityID": "",
            "ts_as_SiteID": "",
            "ts_as_Time": "",
            "ts_as_Remark": ""
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
      'adminActivitySiteList',
      'adminActivityMealManagementId',
      'updateAdminActivitySiteObj'
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
          var  data = data.data;
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
//      初始化数据
      initData(id){
        var getActivitySite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "goodID": id?id:''
        };
        this.$store.dispatch('initAdminActivitySite',getActivitySite)
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
      //添加景点管理
      addAdminActivitySite(){
        this.$store.commit('setTranstionFalse');
        this.addAdminActivitySiteDialog = true;
      },
      //添加提交
      addAdminActivitySiteSubmit(){
        this.$store.dispatch('initAddAdminActivitySite',this.addAdminActivitySiteObj)
          .then((succ)=>{
            this.$notify({
              message: succ,
              type: 'success'
            });
            this.initData(this.addAdminActivitySiteObj.data.ts_as_TimeActivityID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addAdminActivitySiteDialog = false;
      },
      //修改
      updateAdminActivitySite(id){
        this.$store.commit('setTranstionFalse');
        this.updateAdminActivitySiteDialog = true;
        this.$store.commit('initUpdateAdminActivitySiteObj',id)
      },
      //修改提交
      updateAdminActivitySiteSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminActivitySiteObj
        };
        this.$store.dispatch('UpdateAdminActivitySite',updateOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData(this.updateAdminActivitySiteObj.ts_as_TimeActivityID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateAdminActivitySiteDialog = false;
      },
      //删除
      deleteAdminActivitySite(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminActivitySite',deleteOptions)
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
      this.initData(this.adminActivityMealManagementId);
    }
  }
</script>
<style scoped>

</style>
