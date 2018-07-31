<template>
  <div>
    <h1 class="userClass">活动住宿</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>时间活动筛选:</span>
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
          <el-select v-model="userSearchID" placeholder="请选择产品线路" @change="changeLineID" style="width: 150px">
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
          <el-button type="primary" @click="addAdminActiveHotel">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
      v-loading="isLoading"
      :data="adminActiveHotelList"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="ts_ah_ID"
        label="主键编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_ah_TimeActivityID"
        label="时间活动编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_ah_DoWork"
        label="做的事情">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_ah_WasteTime"
        label="活动时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_ah_Distance"
        label="行驶距离">
      </el-table-column>
      <el-table-column
        align="center"
        label="备注">
        <template slot-scope="scope">
          <el-popover
            ref="popover1"
            placement="top-start"
            width="200"
            trigger="hover"
            :content="scope.row.ts_ah_Remark">
          </el-popover>
          <el-button v-popover:popover1 size="small">移入查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminActiveHotel(scope.row.ts_ah_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminActiveHotel(scope.row.ts_ah_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加活动住宿-->
    <el-dialog title="添加活动住宿" :visible.sync="addAdminActiveHotelDialog">
      <el-form :model="addAdminActiveHotelObj" label-width="120px">
        <el-form-item label="时间活动编号:">
          <el-select v-model="addAdminActiveHotelObj.ts_ah_TimeActivityID" placeholder="请选择时间活动" style="width: 150px">
            <el-option
              v-for="item in adminTimeActivitiesList"
              :key="item.ts_ta_ID"
              :label="item.ts_ta_DoWork"
              :value="item.ts_ta_ID">
            </el-option>
          </el-select>
          <!--<el-input v-model="TimeActiveID"></el-input>-->
        </el-form-item>
        <el-form-item label="行驶距离:">
          <el-input v-model="addAdminActiveHotelObj.ts_ah_Distance"></el-input>
        </el-form-item>
        <el-form-item label="做的事情:">
          <el-input v-model="addAdminActiveHotelObj.ts_ah_DoWork"></el-input>
        </el-form-item>
        <el-form-item label="活动时间:">
          <el-input v-model="addAdminActiveHotelObj.ts_ah_WasteTime"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="addAdminActiveHotelObj.ts_ah_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminActiveHotelDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminActiveHotelSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改活动住宿-->
    <el-dialog title="修改活动住宿" :visible.sync="updateAdminActiveHotelDialog">
      <el-form :model="updateAdminActiveHotelObj" label-width="120px">
        <el-form-item label="主键编号:">
          <el-input v-model="updateAdminActiveHotelObj.ts_ah_ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="活动时间编号:">
          <el-input v-model="updateAdminActiveHotelObj.ts_ah_TimeActivityID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="行驶距离:">
          <el-input v-model="updateAdminActiveHotelObj.ts_ah_Distance"></el-input>
        </el-form-item>
        <el-form-item label="做的事情:">
          <el-input v-model="updateAdminActiveHotelObj.ts_ah_DoWork"></el-input>
        </el-form-item>
        <el-form-item label="活动时间:">
          <el-input v-model="updateAdminActiveHotelObj.ts_ah_WasteTime"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="updateAdminActiveHotelObj.ts_ah_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminActiveHotelDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminActiveHotelSubmit">确 定</el-button>
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
      'adminActiveHotelList',
      'updateAdminActiveHotelObj',
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
        addAdminActiveHotelDialog: false,
        updateAdminActiveHotelDialog: false,
        addAdminActiveHotelObj: {
          ts_ah_TimeActivityID: '',
          ts_ah_Distance: '',
          ts_ah_DoWork: '',
          ts_ah_WasteTime: '',
          ts_ah_Remark: ''
        }
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
      changeLineID() {
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
          "goodID": this.TimeID ? this.TimeID : ''
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
      initData(id) {
        var getActivityHotel = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "goodID": id ? id : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminActiveHotelList', getActivityHotel);
        this.isLoading = false;
      },
      search() {
        this.initData(this.TimeActiveID)
      },
      searchInitData() {
        this.initData(this.adminActivityMealManagementId)
      },
      //添加活动酒店
      addAdminActiveHotel() {
        this.$store.commit('setTranstionFalse');
        this.addAdminActiveHotelDialog = true;
      },
      //提交添加活动酒店
      addAdminActiveHotelSubmit() {
        var insertActivityHotel = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addAdminActiveHotelObj
        };
        this.$store.dispatch('addAdminActiveHotel', insertActivityHotel)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.addAdminActiveHotelObj.ts_ah_TimeActivityID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addAdminActiveHotelDialog = false;
      },
      //修改活动酒店
      updateAdminActiveHotel(id) {
        this.updateAdminActiveHotelDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminActiveHotelObj', id)
      },
      //修改提交
      updateAdminActiveHotelSubmit() {
        var updateActivityHotel = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            ts_ah_TimeActivityID: this.updateAdminActiveHotelObj.ts_ah_TimeActivityID,
            ts_ah_Distance: this.updateAdminActiveHotelObj.ts_ah_Distance,
            ts_ah_DoWork: this.updateAdminActiveHotelObj.ts_ah_DoWork,
            ts_ah_WasteTime: this.updateAdminActiveHotelObj.ts_ah_WasteTime,
            ts_ah_Remark: this.updateAdminActiveHotelObj.ts_ah_Remark,
          }
        };
        this.$store.dispatch('updateAdminActivityHotel', updateActivityHotel)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.updateAdminActiveHotelObj.ts_ah_TimeActivityID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateAdminActiveHotelDialog = false;
      },
      //删除活动酒店
      deleteAdminActiveHotel(id) {
        var deleteActivityHotel = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ID": id
        };
        this.$store.dispatch('deleteAdminActiveHotel', deleteActivityHotel)
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
      },
    },
    mounted() {
      this.searchInitData();
    }
  }
</script>
<style>
</style>
