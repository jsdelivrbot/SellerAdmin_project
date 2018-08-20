<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面可订餐时间</h1>
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
            <el-button type="danger" @click="Delete" size="small">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="foodStoreOrderingTimeList"
        style="width: 100%"
        v-loading="isLoading"
        @selection-change="selete"
      >
        <el-table-column
          type="selection"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="fd_rtt_ID"
          align="center"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="fd_sf_ProductName"
          align="center"
          label="店面名称">
        </el-table-column>
        <el-table-column
          prop="fd_rtt_Time"
          align="center"
          label="用餐时间">
        </el-table-column>
        <el-table-column
          prop="fd_sfr_RoomName"
          align="center"
          label="房间名称">
        </el-table-column>
        <el-table-column
          prop="fd_rtt_Date"
          align="center"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="fd_rtt_TableState"
          align="center"
          label="餐桌状态">
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="10"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--添加-->
      <el-dialog title="添加店面可订单时间" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.storeID" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生成可订时间:" :label-width="formLabelWidth">
            <!--原版-->
            <div class="block">
              <el-date-picker
                v-model="addTime"
                :picker-options="pickerOptions"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
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
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeID": "",//店面编号
          "dateFrom": "",//日期范围
          "dateTo": "",//日期范围
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
      selete(selection) {
        this.deleteData = selection;
      },
      //      分页
      handleCurrentChange(num) {
        this.initData(this.searchTime[0], this.searchTime[1], this.storeId, num);
      },
      //初始化数据
      initData(form, to, id, num) {
        let selectRoomTableTimeInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": num ? num : 1,
          "rows": "10",
          "fd_rtt_ID": "",//店面房间餐桌时间标识
          "dateFrom": form ? form : '',//日期范围
          "dateTo": to ? to : '',//日期范围
          "fd_rtt_TableState": "",//餐桌锁定状态
          "fd_rtt_FrontID": id ? id : ''//店面编码
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreOrderingTime', selectRoomTableTimeInfo)
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
      //添加提交
      addSubmit() {
        this.addOptions.dateFrom = this.addTime[0];
        this.addOptions.dateTo = this.addTime[1];
        this.$store.dispatch('addFoodStoreOrderingTime', this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.addDialog = false;
      },
      //删除
      Delete() {
        if (!this.deleteData.length) {
          this.$notify({
            message: '请选择要删除的时间!!',
            type: 'error'
          })
          return
        }
        ;
        for (let i = 0; i < this.deleteData.length; i++) {
          this.deleteSubmit(this.deleteData[i].fd_rtt_ID);
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
        this.$store.dispatch('deleteFoodStoreOrderingTime', deleteRoomTableTimeInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if( !this.foodStoreInformtionList.length ){
        this.initFoodStoreInformtion();
      }
      this.initData();
    }
  }
</script>
<style scoped>
</style>
