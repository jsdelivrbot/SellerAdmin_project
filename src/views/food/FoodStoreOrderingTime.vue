<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面休息日期</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="storeId" placeholder="请选择店面"  size="small">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="searchTime"
                size="small"
                :picker-options="pickerOptions"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search"  size="small">查询</el-button>
            <el-button type="primary" @click="add" size="small">添加</el-button>
            <el-button type="danger" @click="DeleteFoodStoreOrderingTime" size="small">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="foodStoreOrderingTimeList"
        style="width: 100%"
        v-loading="isLoading"
      >
        </el-table-column>
        <el-table-column
          prop="fd_cns_ID"
          align="center"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="fd_cns_FrontID"
          align="center"
          label="店面编码">
        </el-table-column>
        <el-table-column
          prop="fd_cns_StopDate"
          align="center"
          label="休息日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.fd_cns_CancelState | getCancelState  }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" v-show="scope.row.fd_cns_CancelState==0" size="small" @click="cancel(scope.row)">取消</el-button>
            <el-button type="success" v-show="scope.row.fd_cns_CancelState==1">开启</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="text-align: right;padding: 30px 0">
        <el-pagination
          background
          :page-size="10"
          @current-change="handleCurrentChange"
          layout="total,prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--添加-->
      <el-dialog title="添加店面休息时间" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_cns_FrontID" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生成休息时间:" :label-width="formLabelWidth">
            <!--原版-->
            <div class="block">
              <el-date-picker
                type="dates"
                value-format="yyyy-MM-dd"
                v-model="addTime"
                placeholder="选择一个或多个日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--删除-->
      <el-dialog title="删除店面可订单时间" :visible.sync="deleteDialog">
        <el-form :model="addOptions">
          <el-form-item label="店面房间:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.storeID" placeholder="请选择房间">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生成从:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="addOptions.dateFrom"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="生成到:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="addOptions.dateTo"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters([
      'foodStoreInformtionList',
      'foodStoreOrderingTimeList'
    ]),
    data() {
      return {
        storeId: '',
        searchTime: '',
        addTime: '',
        total: 0,
        addDialog: false,
        deleteDialog: false,
        addOptions: {
            "fd_cns_FrontID": '',//店面编号
            "fd_cns_StopDate": "",//休息日期
        },
        formLabelWidth: '120px',
        isLoading:false,
        deleteObj: {},
        deleteData: [],
        pickerOptions: {
          disabledDate(time) {
            return (time.getTime()+86400000) < Date.now();
          },
        }
      }
    },
    methods: {
      Off(id,obj){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "operate": id,//0开/1关
          "data": {
            "fd_cns_ID": obj.fd_cns_ID,//标识
          }
        }
        this.$store.dispatch('FoodStoreOrderingTimeOff',options)
        .then(() => {
          this.initData('','',this.addOptions.fd_cns_FrontID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
      },
      //取消
      cancel(obj){
        this.Off(1,obj)
      },
      //店面列表
      initFoodStoreInformtion(){
        let selectStoreFrontpInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sf_TradeID": this.userInfo.sm_ui_ID,//供应商编码
        };
        this.$store.dispatch('initFoodStoreInformtion', selectStoreFrontpInfo)
      },
      //      分页
      handleCurrentChange(num) {
        this.initData(this.searchTime[0], this.searchTime[1], this.storeId, num);
      },
      //初始化数据
      initData(form, to, id, num) {
        let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "fd_cns_ID":"",//标识
            "fd_cns_FrontID":id ? id : '',//店面编码
            "stopDateFrom": form ? form : '',//休息日期从
            "stopDateTo":  to ? to : '',//休息日期从
            //"fd_cns_CancelState":0,//状态 0正常 1取消
            "page": num ? num : 1,
            "rows": 10,
          }
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreOrderingTime', options)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //查询
      search() {
        if(!this.storeId){
          this.$notify({
            message: '请先选择店面！',
            type: 'error'
          })
          return
        }
        this.initData(this.searchTime[0], this.searchTime[1], this.storeId, 1);
      },
      //添加
      add() {
//        for(let attr in this.addOptions){
//          this.addOptions[attr] = ''
//        }
        for (let attr in this.addOptions) {
          if(attr!='loginUserID'&&attr!='loginUserPass'){
            this.addOptions[attr] = ''
          }
        }
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      addAll(id){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": this.addOptions
        }
        options.data.fd_cns_StopDate = id;
        return this.$store.dispatch('addFoodStoreOrderingTime', options)
      },
      async getAddAll(arr){
        for(var i=0;i<arr.length;i++){
          await this.addAll(arr[i])
        }
      },
      //添加提交
      addSubmit() {
        if(!this.addTime.length){
          this.$notify({
            message: '请选择日期!',
            type: 'error'
          })
          return
        }
        this.isLoading = true;
        this.getAddAll(this.addTime)
          .then(suc => {
            this.isLoading = false;
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData('','',this.addOptions.fd_cns_FrontID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.addDialog = false;
      },
      DeleteFoodStoreOrderingTime(){
        this.isLoading = true;
        this.Delete().then(suc => {
          this.isLoading = false;
          this.$notify({
            message: '删除成功',
            type: 'success'
          })
          this.initData();
        }, err => {
          this.isLoading = false;
          this.$notify({
            message: err,
            type: 'error'
          })
        })
      },
      //删除
      async Delete() {
        if (!this.deleteData.length) {
          this.$notify({
            message: '请选择要删除的时间!!',
            type: 'error'
          })
          return
        }
        ;
        for (let i = 0; i < this.deleteData.length; i++) {
          await this.deleteSubmit(this.deleteData[i].fd_rtt_ID);
        }
      },
      //删除提交
      deleteSubmit(id) {
        let deleteRoomTableTimeInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_rtt_ID": id,//店面房间餐桌时间标识
          }
        };
        return this.$store.dispatch('deleteFoodStoreOrderingTime', deleteRoomTableTimeInfo)

      },
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if( !this.foodStoreInformtionList.length ){
        this.initFoodStoreInformtion();
      }
//      this.initData();
    }
  }
</script>
<style scoped>
</style>
