<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">订单管理</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>选择筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="outStatusId" placeholder="请选择出票状态"  size="small">
              <el-option
                v-for="item in outStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="payStateId" placeholder="请选择支付状态"  size="small">
              <el-option
                v-for="item in payState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search"  size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="foodStoreConfirnOrderList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户编码:">
                <span>{{ props.row.fd_or_UserID }}</span>
              </el-form-item>
              <el-form-item label="用户名称:">
                <span>{{ props.row.fd_or_UserName }}</span>
              </el-form-item>
              <el-form-item label="手机号:">
                <span>{{ props.row.fd_or_Phone }}</span>
              </el-form-item>
              <el-form-item label="总价格:">
                <span>{{ props.row.fd_or_SumPrice }}元</span>
              </el-form-item>
              <!--<el-form-item label="人数:">-->
                <!--<span>{{ props.row.fd_or_TicketCount }}人</span>-->
              <!--</el-form-item>-->
              <el-form-item label="提前提醒时间:">
                <span>{{ props.row.fd_or_BeforeNotice }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.fd_or_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="订单编码:">
                <span>{{ props.row.fd_or_OrderID }}</span>
              </el-form-item>
              <el-form-item label="出票状态:">
                <span>{{ props.row.fd_or_OutStatus | getOutStatus }}</span>
              </el-form-item>
              <el-form-item label="凭证码:">
                <span>{{ props.row.fd_or_Password }}</span>
              </el-form-item>
              <el-form-item label="订单状态:">
                <span>{{ props.row.fd_or_PayState | payStatus  }}</span>
              </el-form-item>
              <el-form-item label="支付时间:">
                <span>{{ props.row.fd_or_PayTime }}</span>
              </el-form-item>
              <el-form-item label="支付方式:">
                <span>{{ props.row.fd_or_PayWay }}</span>
              </el-form-item>
              <!--<el-form-item label="餐桌编号:">-->
                <!--<span>{{ props.row.fd_or_TableID }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="使用状态:">
                <span>{{ props.row.fd_or_UseState | useStatus }}</span>
              </el-form-item>
              <el-form-item label="使用时间:">
                <span>{{ props.row.fd_or_UseTime }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ props.row.fd_or_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="fd_or_UserName">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="人数"-->
          <!--align="center">-->
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.fd_or_TicketCount ? scope.row.fd_or_TicketCount + '人' : ''}}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="订单状态"
          align="center"
          prop="fd_or_PayState">
          <template slot-scope="scope">
            {{ scope.row.fd_or_PayState | payStatus  }}
          </template>
        </el-table-column>
        <el-table-column
          label="出票状态"
          align="center">
          <template slot-scope="scope">
            {{scope.row.fd_or_OutStatus | getOutStatus}}
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="餐桌编号"-->
          <!--align="center"-->
          <!--prop="fd_or_TableID">-->
        <!--</el-table-column>-->
        <el-table-column
          label="总价格"
          align="center">
          <template slot-scope="scope">
            {{scope.row.fd_or_SumPrice ? scope.row.fd_or_SumPrice + '元' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          align="center">
          <template slot-scope="scope">
            <el-button v-show="!scope.row.fd_or_OutStatus" type="success" size="mini"
                       @click="orderOk(scope.row.fd_or_OrderID)">确认订单
            </el-button>
            <el-button type="danger" size="mini"
                       @click="Delete(scope.row.fd_or_OrderID)">注销订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="5"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters([
      'foodStoreConfirnOrderList'
    ]),
    data() {
      return {
        isLoading:false,
        userInfo: {},
        payState: [
          {
            value: 0,
            label: '未支付'
          },
          {
            value: 1,
            label: '已支付'
          }
        ],
        outStatus: [
          {
            value: 0,
            label: '未出票'
          },
          {
            value: 1,
            label: '已出票'
          }
        ],
        outStatusId: '',
        payStateId: '',
        total: 0,
      }
    },
    methods: {
      //      分页
      handleCurrentChange(num) {
        this.initData(this.outStatusId, this.payStateId, num);
      },
      //初始化订单数据
      initData(outStatusId, payStateId, num) {
        let selectOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_or_OrderID": "",//订单ID
          "fd_or_UserID": "",//用户编码
          "fd_or_UserName": "",//用户名称
          "priceFrom": "",//订单价格范围
          "priceTo": "",//订单价格范围
          "fd_or_TouristTraderID": this.userInfo.sm_ui_ID,//供应商编码
          "fd_or_Password": "",//凭证码查订单
          "fd_or_OutStatus": outStatusId,//出票状态 0未出票 1已出票
          "fd_or_Phone": "",//手机号
          "useTimeFrom": "",//使用订单时间
          "useTimeTo": "",//使用订单时间
          "createTimeFrom": "",//使用订单时间
          "createTimeTo": "",//使用订单时间
          "payTimeFrom": "",//支付订单时间
          "payTimeTo": "",//支付订单时间
          "fd_or_PayWay": "",//支付方式
          "fd_or_PayState": payStateId,//订单状态 0未支付 1已支付
          "fd_or_UseState": "",//使用状态 0未使用 1已使用
          "fd_or_IsDelete": "",//是否删除 0未注销 1已注销
          "rows": 5,
          "page": num ? num : 1
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreConfirnOrder', selectOrderInfo)
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
      //搜索
      search() {
        this.initData(this.outStatusId, this.payStateId)
      },
      //确认订单
      orderOk(id) {
        let sureOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "orderID": id ? id : '',//订单编码
        };
        this.$store.dispatch('foodOrderOk', sureOrderInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.outStatusId, this.payStateId);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //注销订单
      Delete(id) {
        let foodCancelOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "2",
          "operateUserName": "",
          "pcName": "",
          "orderID": id ? id : '',
        };
        this.$store.dispatch('deleteFoodStoreConfirnOrder', foodCancelOrder)
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
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'));
      this.initData()
    }
  }
</script>
<style scoped>
</style>
