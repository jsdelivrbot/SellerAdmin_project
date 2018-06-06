<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">活动购物</h1>
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
          <el-button type="primary" @click="addAdminEventShopping">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="adminEventShoppingList"
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
        label="时间活动编号"
        prop="ts_as_TimeActivityID">
      </el-table-column>
      <el-table-column
        align="center"
        label="花费时间">
        <template slot-scope="scope">
          {{scope.row.ts_as_WasteTime}}分钟
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="行驶距离">
        <template slot-scope="scope">
          {{scope.row.ts_as_Distance}}km
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
            :content="scope.row.ts_as_doWork">
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
            :content="scope.row.ts_as_Remark">
          </el-popover>
          <el-button v-popover:popover1>移入查看</el-button>
        </template>

      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminEventShopping(scope.row.ts_as_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminEventShopping(scope.row.ts_as_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加活动购物-->
    <el-dialog title="添加活动购物" :visible.sync="addAdminEventShoppingDialog">
      <el-form :model="addOptions">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_as_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶距离:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_as_Distance"></el-input>
          <span style="color: #f60">(单位:km)</span>
        </el-form-item>
        <el-form-item label="花费时间:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_as_WasteTime"></el-input><span style="color: #f60">(单位:分钟)</span>
        </el-form-item>
        <el-form-item label="所做内容:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_as_doWork" type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_as_Remark"  type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminEventShoppingDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminEventShoppingSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改活动购物-->
    <el-dialog title="修改活动购物" :visible.sync="updateAdminEventShoppingDialog">
      <el-form :model="updateAdminEventShoppingObj">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminEventShoppingObj.ts_as_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶距离:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminEventShoppingObj.ts_as_Distance"></el-input>
          <span style="color: #f60">(单位:km)</span>
        </el-form-item>
        <el-form-item label="花费时间:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminEventShoppingObj.ts_as_WasteTime"></el-input><span style="color: #f60">(单位:分钟)</span>
        </el-form-item>
        <el-form-item label="所做内容:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminEventShoppingObj.ts_as_doWork" type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminEventShoppingObj.ts_as_Remark"  type="textarea"
                    :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminEventShoppingDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminEventShoppingSubmit">确 定</el-button>
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
        addAdminEventShoppingDialog:false,
        updateAdminEventShoppingDialog:false,
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_as_TimeActivityID": "",
            "ts_as_Distance": "",
            "ts_as_doWork": "",
            "ts_as_WasteTime": "",
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
      'adminEventShoppingList',
      'updateAdminEventShoppingObj',
      'adminActivityMealManagementId'
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
      //初始化数据
      initData(id){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID": id?id:''
        };
        this.$store.dispatch('initAdminEventShopping',options)
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
      addAdminEventShopping(){
        this.$store.commit('setTranstionFalse');
        this.addAdminEventShoppingDialog = true;
      },
      //添加提交
      addAdminEventShoppingSubmit(){
        this.$store.dispatch('AddAdminEventShopping',this.addOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData(this.addOptions.data.ts_as_TimeActivityID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addAdminEventShoppingDialog = false;
      },
      //修改
      updateAdminEventShopping(id){
        this.$store.commit('setTranstionFalse');
        this.updateAdminEventShoppingDialog = true;
        this.$store.commit('initUpdateAdminEventShoppingObj',id)
      },
      //修改提交
      updateAdminEventShoppingSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminEventShoppingObj
        };
        this.$store.dispatch('UpdateAdminEventShopping',updateOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData(this.updateAdminEventShoppingObj.ts_as_TimeActivityID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateAdminEventShoppingDialog = false;
      },
      //删除
      deleteAdminEventShopping(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminEventShopping',deleteOptions)
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
