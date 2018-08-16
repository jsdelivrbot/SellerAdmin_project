<template>
  <section id="wrap" class="clearfix">
    <h1 class="userClass">查询商户订单</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>订单号筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="inputSearchValue"
            style="width: 300px;"
            size="small"
            placeholder="请输入订单号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search">查 询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      v-loading="isLoading"
      :data="queryUserOrderList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" labelWidth="130px">
            <el-form-item label="订单号:">
              <span>{{ props.row.ts_to_OrderID }}</span>
            </el-form-item>
            <el-form-item label="旅行社编码:">
              <span>{{ props.row.ts_to_TouristTraderID }}</span>
            </el-form-item>
            <el-form-item label="旅行社名称:">
              <span>{{ props.row.ts_to_TouristTraderName }}</span>
            </el-form-item>
            <el-form-item label="用户编码:">
              <span>{{ props.row.ts_to_UserID }}</span>
            </el-form-item>
            <el-form-item label="凭证码:">
              <span>{{ props.row.ts_to_Password }}</span>
            </el-form-item>
            <el-form-item label="总张数:">
              <span>{{ props.row.ts_to_TicketCount }}</span>
            </el-form-item>
            <el-form-item label="总金额:">
              <span>{{ props.row.ts_to_SumPrice }}元</span>
            </el-form-item>
            <el-form-item label="全票价:">
              <span>{{ props.row.ts_to_FullPrice }}元</span>
            </el-form-item>
            <el-form-item label="儿童价:">
              <span>{{ props.row.ts_to_ChildPrice }}元</span>
            </el-form-item>
            <el-form-item label="总的网售手续费:">
              <span>{{ props.row.ts_to_SumService }}</span>
            </el-form-item>
            <el-form-item label="是否删除:">
              <span>{{ props.row.ts_to_IsDelete == 0 ? "未删除" : "已删除" }}</span>
            </el-form-item>
            <el-form-item label="出票状态:">
              <span>{{ props.row.ts_to_OutStatus | getOutStatus }}</span>
            </el-form-item>
            <el-form-item label="发起订单时间:">
              <span>{{ props.row.ts_to_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="订单支付时间:">
              <span>{{ props.row.ts_to_PayTime }}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{ props.row.ts_to_PayWay }}</span>
            </el-form-item>
            <el-form-item label="订单支付码:">
              <span>{{ props.row.ts_to_PayParam }}</span>
            </el-form-item>
            <el-form-item label="支付状态:">
              <span>{{ props.row.ts_to_PayState == 0 ? "未支付" : "已支付" }}</span>
            </el-form-item>
            <el-form-item label="供票方编码:">
              <span>{{ props.row.ts_to_SellID }}</span>
            </el-form-item>
            <el-form-item label="供票方名称:">
              <span>{{ props.row.ts_to_SellName }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ts_to_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        prop="ts_to_GoodsListName">
      </el-table-column>
      <el-table-column
        label="总金额"
        prop="ts_to_SumPrice">
      </el-table-column>
      <el-table-column
        label="用户名称"
        prop="ts_to_UserName">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-show="!scope.row.ts_to_OutStatus"
            @click="orderSubmit(scope.row.ts_to_OrderID)"
          >确认订单
          </el-button>
          <span v-show="scope.row.ts_to_OutStatus==1">已出单</span>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block">
      <el-pagination
        v-show="total"
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </section>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([
      'queryUserOrderList'
    ]),
    data() {
      return {
        inputSearchValue: '',
        total: 0,
        isLoading: false,
        adminInfo: '',
      }
    },
    created() {
      if(sessionStorage.getItem('admin')){
        this.adminInfo = JSON.parse(sessionStorage.getItem('admin'))
      }
      this.initData();
    },
    methods: {
      initData(num) {
        var getTradeOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_to_OrderID": this.inputSearchValue ? this.inputSearchValue.trim() : '',
          "ts_to_TouristTraderID":this.adminInfo.sm_ui_ID,
          "page": num ? num : 1,
          "rows": 10
        }
        this.isLoading = true;
        this.$store.dispatch('initQueryUserOrder', getTradeOrderInfo)
          .then(total => {
            this.isLoading = false;
            this.total = Number(total);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      search() {
        this.initData()
      },
      handleCurrentChange(num) {
        this.initData(num)
      },
      orderSubmit(id) {
        let outOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "orderID": id ? id : '',
        };
        this.$store.dispatch('orderTrSubmit',outOrder)
          .then(suc=>{
            this.$notify({
              message: suc,
              type:'success'
            })
            this.initData();
          },err=>{
            this.$notify({
              message: err,
              type:'error'
            })
          })
      },
    }
  }
</script>
<style scoped>
  .block {
    clear: both;
    float: right;
    margin-top: 10px;
  }
</style>
