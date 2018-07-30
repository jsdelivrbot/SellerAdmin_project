<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">活动用餐</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>活动用餐筛选:</span>
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
          <el-button type="primary" @click="addAdminActiveFood">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
      v-loading="isLoading"
      :data="adminEventDiningList"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="ts_af_ID"
        label="主键编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_sf_TimeActivityID"
        label="时间活动编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_af_DoWork"
        label="做的事情">
      </el-table-column>
      <el-table-column
        align="center"
        label="行驶距离">
        <template slot-scope="scope">
          {{scope.row.ts_af_Distance}}km
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用餐时间">
        <template slot-scope="scope">
          {{scope.row.ts_af_Time}}分钟
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_af_Type"
        label="用餐类型">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_af_Remark"
        label="备注">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminActiveFood(scope.row.ts_af_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminActiveFood(scope.row.ts_af_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加活动用餐-->
    <el-dialog title="添加活动用餐" :visible.sync="addAdminActiveFoodBox">
      <el-form :model="addAdminActiveFoodObj">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="addAdminActiveFoodObj.data.ts_sf_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用餐类型:" :label-width="formLabelWidth">
          <el-select v-model="addAdminActiveFoodObj.data.ts_af_Type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶距离:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActiveFoodObj.data.ts_af_Distance"></el-input><span style="color: #f60">(单位:km)</span>
        </el-form-item>
        <el-form-item label="做的事情:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActiveFoodObj.data.ts_af_DoWork"></el-input>
        </el-form-item>
        <el-form-item label="花费时间:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActiveFoodObj.data.ts_af_Time"></el-input><span style="color: #f60">(单位:分钟)</span>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addAdminActiveFoodObj.data.ts_af_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminActiveFoodBox = false">取 消</el-button>
        <el-button type="primary" @click="addAdminActiveFoodSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改活动用餐-->
    <el-dialog title="修改活动用餐" :visible.sync="updateAdminActiveFoodBox">
      <el-form :model="updateAdminActiveFoodObj">
        <el-form-item label="时间活动:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminActiveFoodObj.ts_sf_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用餐类型:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminActiveFoodObj.ts_af_Type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶距离:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveFoodObj.ts_af_Distance"></el-input><span style="color: #f60">(单位:km)</span>
        </el-form-item>
        <el-form-item label="做的事情:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveFoodObj.ts_af_DoWork"></el-input>
        </el-form-item>
        <el-form-item label="花费时间:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveFoodObj.ts_af_Time"></el-input><span style="color: #f60">(单位:分钟)</span>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminActiveFoodObj.ts_af_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminActiveFoodBox = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminActiveFoodSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminLinePrepare',
      'adminTimeActivitiesList',
      'adminScheduleTimeList',
      'adminEventDiningList',
      'updateAdminActiveFoodObj',
      'adminTimeActivitiesList',
      'adminActivityMealManagementId'
    ]),
    data() {
      return {
        userName: '',
        GoodId: '',
        LineID: '',
        TimeID: '',
        userSearchID: '',
        TimeActiveID: '',
        isLoading: false,
        addAdminActiveFoodBox: false,
        updateAdminActiveFoodBox: false,
        addAdminActiveFoodObj: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            ts_sf_TimeActivityID: '',
            ts_af_Type: '',
            ts_af_Distance: '',
            ts_af_DoWork: '',
            ts_af_Time: '',
            ts_af_Remark: ''
          }

        },
        formLabelWidth: '120px',
        typeList: [
          {
            label: '早餐',
            value: 0
          },
          {
            label: '午餐',
            value: 1
          },
          {
            label: '晚餐',
            value: 2
          }
        ],
        typeValue: '',
        userSearch: {
          id: ''
        },
      }
    },
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
      //初始化数据
      initData(id) {
        var getActivityFood = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "goodID": id ? id : ''
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminEventDining', getActivityFood)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.isLoading = false;
      },
      search() {
        this.initData(this.TimeActiveID);
      },
      searchInitData(){
        if(this.adminActivityMealManagementId){
          this.initData(this.adminActivityMealManagementId);
        }
      },
      //添加活动用餐
      addAdminActiveFood() {
        this.addAdminActiveFoodBox = true
        this.$store.commit('setTranstionFalse');
      },
      addAdminActiveFoodSubmit() {
        this.$store.dispatch('initAdminActiveFood', this.addAdminActiveFoodObj)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.addAdminActiveFoodObj.data.ts_sf_TimeActivityID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addAdminActiveFoodBox = false;
      },
      //修改活动用餐
      updateAdminActiveFood(id) {
        //初始化修改数据
        this.$store.commit('initUpdateAdminActiveFoodObj', id)
        this.$store.commit('setTranstionFalse');
        this.updateAdminActiveFoodBox = true;
      },
      //修改提交
      updateAdminActiveFoodSubmit() {
        if(isNaN(this.updateAdminActiveFoodObj.ts_af_Distance)||isNaN(this.updateAdminActiveFoodObj.ts_af_Time)){
          this.$notify({
            message: '行驶距离和花费时间为数字!',
            type: 'error'
          });
          return;
        }
        var updateActivityFood = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_af_ID": this.updateAdminActiveFoodObj.ts_af_ID,
            "ts_sf_TimeActivityID": this.updateAdminActiveFoodObj.ts_sf_TimeActivityID,
            "ts_af_Type": this.updateAdminActiveFoodObj.ts_af_Type,
            "ts_af_Distance": this.updateAdminActiveFoodObj.ts_af_Distance,
            "ts_af_DoWork": this.updateAdminActiveFoodObj.ts_af_DoWork,
            "ts_af_Time": this.updateAdminActiveFoodObj.ts_af_Time,
            "ts_af_IsDelete": this.updateAdminActiveFoodObj.ts_af_IsDelete,
            "ts_af_Remark": this.updateAdminActiveFoodObj.ts_af_Remark
          }
        }
        this.$store.dispatch('updateAdminActiveFoodSubmit', updateActivityFood)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.updateAdminActiveFoodObj.ts_sf_TimeActivityID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateAdminActiveFoodBox = false;
      },
      //删除活动用餐
      deleteAdminActiveFood(id) {
        var deleteActivityFood = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "afID": id
        };
        this.$store.dispatch('deleteAdminActiveFood', deleteActivityFood)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            if(this.adminActivityMealManagementId){
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
      this.searchInitData()
    }
  }
</script>
<style>
</style>
