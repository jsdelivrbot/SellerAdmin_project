<template>
  <div>
    <section id="wrap">
      <div style="margin: 30px 0 30px 0px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="AdminMerchantProducts">商家产品</el-breadcrumb-item>
          <el-breadcrumb-item  @click.native="toLine">产品线路</el-breadcrumb-item>
          <el-breadcrumb-item  @click.native="toDayLine">日程线路</el-breadcrumb-item>
          <el-breadcrumb-item to="AdminScheduleTime">日程时间</el-breadcrumb-item>
          <el-breadcrumb-item>时间活动</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h1 class="userClass">时间活动信息</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" :model="userSearch">
          <el-form-item>
            <span>时间活动筛选:</span>
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
            <el-select v-model="TimeID" placeholder="请选择日程时间" style="width: 150px">
              <el-option
                v-for="item in adminScheduleTimeList"
                :key="item.ts_tt_ID"
                :label="item.ts_tt_DoTime"
                :value="item.ts_tt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="addAdminTimeActivities">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminTimeActivitiesList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="主键编号"
          prop="ts_ta_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="时间编号"
          prop="ts_ta_TravelTimeID">
        </el-table-column>
        <el-table-column
          align="center"
          label="顺序"
          prop="ts_ta_Turn">
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
              :content="scope.row.ts_ta_DoWork">
            </el-popover>
            <el-button v-popover:popover1>移入查看</el-button>
          </template>

        </el-table-column>
        <el-table-column
          align="center"
          label="类型">
          <template slot-scope="scope">
            <span>{{scope.row.ts_ta_ParkType | getParkType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminTimeActivities(scope.row.ts_ta_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminTimeActivities(scope.row.ts_ta_ID)">删除
            </el-button>
            <el-button
              size="mini"
              @click="activityMealManagement(scope.row.ts_ta_ID)">时间活动详情管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--添加时间活动-->
    <el-dialog title="添加时间活动" :visible.sync="addAdminTimeActivitiesDialog">
      <el-form :model="addOptions">
        <el-form-item label="请选择日程时间:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_ta_TravelTimeID" placeholder="请选择日程时间" style="width: 150px">
            <el-option
              v-for="item in adminScheduleTimeList"
              :key="item.ts_tt_ID"
              :label="item.ts_tt_DoTime"
              :value="item.ts_tt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_ta_ParkType" placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ts_ta_Turn" placeholder="请选择顺序">
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
          <el-input v-model="addOptions.data.ts_ta_DoWork" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_ta_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminTimeActivitiesDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminTimeActivitiesSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改时间活动-->
    <el-dialog title="修改时间活动" :visible.sync="updateAdminTimeActivitiesDialog">
      <el-form :model="updateAdminTimeActivitiesObj">
        <el-form-item label="请选择日程时间:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminTimeActivitiesObj.ts_ta_TravelTimeID" placeholder="请选择日程时间" style="width: 150px">
            <el-option
              v-for="item in adminScheduleTimeList"
              :key="item.ts_tt_ID"
              :label="item.ts_tt_DoTime"
              :value="item.ts_tt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminTimeActivitiesObj.ts_ta_ParkType" placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminTimeActivitiesObj.ts_ta_Turn" placeholder="请选择顺序">
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
          <el-input v-model="updateAdminTimeActivitiesObj.ts_ta_DoWork" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminTimeActivitiesObj.ts_ta_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminTimeActivitiesDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminTimeActivitiesSubmit">确 定</el-button>
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
        num:10,
        userID:'',
        userName:'',
        value:'',
        userSearchID:'',
        typeOptions: [
          {
            value: '0',
            label: '用餐'
          }, {
            value: '1',
            label: '景点'
          }, {
            value: '2',
            label: '酒店'
          }, {
            value: '3',
            label: '交通'
          }
        ],
        formLabelWidth: '120px',
        addAdminTimeActivitiesDialog: false,//添加弹窗
        updateAdminTimeActivitiesDialog:false,//修改弹窗
        GoodId: '',
        LineID: '',
        isLoading: false,
        userSearch: {
          id: ''
        },
        TimeID: '',
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_ta_TravelTimeID": '',
            "ts_ta_ParkType": '',
            "ts_ta_DoWork": "",
            "ts_ta_Turn": "",
            "ts_ta_Remark": ""
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
      'updateAdminTimeActivitiesObj',
      'adminTimeActivityManagementId'
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
      //选中线路日程
      changeLineTime(){
        this.TimeID = '';
        let initOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "isDelete":"0",
          "goodID": this.LineID ? this.LineID : ''
        };
        this.$store.dispatch('initAdminScheduleTime', initOptions)
      },
      initData(id){
        let initScheduleTimeOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID":  id? id : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminTimeActivities', initScheduleTimeOptions)
        .then(() => {
          this.isLoading = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      search(){
        this.initData(this.TimeID);
      },
      //查询初始化数据
      searchInitData(){
        this.initData(this.adminTimeActivityManagementId)
      },
      //添加
      addAdminTimeActivities(){
        this.$store.commit('setTranstionFalse');
        this.addAdminTimeActivitiesDialog = true;
      },
      //添加提交
      addAdminTimeActivitiesSubmit(){
        this.$store.dispatch('AddAdminTimeActivities', this.addOptions)
        .then(() => {
          this.$notify({
            message: '添加成功!',
            type: 'success'
          });
          this.initData(this.addOptions.data.ts_ta_TravelTimeID)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addAdminTimeActivitiesDialog = false;
      },
      //修改
      updateAdminTimeActivities(id){
        this.updateAdminTimeActivitiesDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminTimeActivitiesObj',id);
      },
      //修改提交
      updateAdminTimeActivitiesSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_ta_ID": this.updateAdminTimeActivitiesObj.ts_ta_ID,
            "ts_ta_TravelTimeID": this.updateAdminTimeActivitiesObj.ts_ta_TravelTimeID,
            "ts_ta_ParkType": this.updateAdminTimeActivitiesObj.ts_ta_ParkType,
            "ts_ta_DoWork": this.updateAdminTimeActivitiesObj.ts_ta_DoWork,
            "ts_ta_Turn": this.updateAdminTimeActivitiesObj.ts_ta_Turn,
            "ts_ta_Remark": this.updateAdminTimeActivitiesObj.ts_ta_Remark
          }
        };
        this.$store.dispatch('UpdateAdminTimeActivities',updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.updateAdminTimeActivitiesObj.ts_ta_TravelTimeID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateAdminTimeActivitiesDialog = false;
      },
      //删除
      deleteAdminTimeActivities(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "taID": id
        };
        this.$store.dispatch('DeleteAdminTimeActivities',deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //点击跳转到活动用餐管理
      activityMealManagement(id){
        this.$store.commit('adminActivityMealManagementId',id);
        this.$router.push({name:'AdminTimeActivitiesList'});
        sessionStorage.setItem('index','5')
      }
    },
    mounted(){
      this.searchInitData();
    }
  }
</script>
<style scoped>

</style>
