<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">酒店确认订单</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>订单号筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="orderID" auto-complete="off" placeholder="订单号" size="small" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="hotelConfirmOrderList"
      v-loading="isLoading"
      style="width: 100%; margin-top: 20px;"
      :summary-method="getSummaries"
      show-summary
      size="small"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="房间产品ID:">
              <span>{{ props.row.ht_or_RoomProductID}}</span>
            </el-form-item>
            <el-form-item label="用户编码:">
              <span>{{ props.row.ht_or_UserID}}</span>
            </el-form-item>
            <el-form-item label="用户名称:">
              <span>{{ props.row.ht_or_UserName}}</span>
            </el-form-item>
            <el-form-item label="商户编码:">
              <span>{{ props.row.ht_or_TouristTraderID}}</span>
            </el-form-item>
            <el-form-item label="商户名称:">
              <span>{{ props.row.ht_or_TouristTraderName}}</span>
            </el-form-item>
            <el-form-item label="凭证码:">
              <span>{{ props.row.ht_or_Password}}</span>
            </el-form-item>
            <el-form-item label="总间数:">
              <span>{{ props.row.ht_or_TicketCount}}</span>
            </el-form-item>
            <el-form-item label="入住日期:">
              <span>{{ props.row.ht_or_InDate}}</span>
            </el-form-item>
            <el-form-item label="离店日期:">
              <span>{{ props.row.ht_or_OutDate}}</span>
            </el-form-item>
            <el-form-item label="订单创建时间:">
              <span>{{ props.row.ht_or_CreateTime | getUseTime}}</span>
            </el-form-item>
            <el-form-item label="订单支付时间:">
              <span>{{ props.row.ht_or_PayTime | getUseTime}}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{ props.row.ht_or_PayWay}}</span>
            </el-form-item>
            <el-form-item label="支付参数:">
              <span>{{ props.row.ht_or_PayParam}}</span>
            </el-form-item>
            <el-form-item label="支付状态:">
              <span>{{ props.row.ht_or_PayState}}</span>
            </el-form-item>
            <el-form-item label="使用状态:">
              <span>{{ props.row.ht_or_UseState}}</span>
            </el-form-item>
            <el-form-item label="结算状态:">
              <span>{{ props.row.ts_to_IsBalance}}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ts_to_Remark}}</span>
            </el-form-item>
            <el-form-item label="手机号:">
              <span>{{ props.row.ht_od_Phone}}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.ht_od_Email}}</span>
            </el-form-item>
            <el-form-item label="订单名称:">
              <span>{{ props.row.ht_or_GoodsListName}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="ht_or_OrderID"
        label="订单号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_or_SumPrice"
        label="总金额(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_or_SumService"
        label="总的网售手续费(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_or_OutStatus"
        label="出单状态"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_or_FullPrice"
        label="价格(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_or_SumService"
        label="总的网售手续费(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.ht_or_OutStatus!=1"
            type="primary"
            @click="confirmOrder(scope.row.ht_or_OrderID)">确认订单
          </el-button>
          <span v-else style="font-weight: bold;">已出单</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        orderID:'',
        touristTraderID:'',
        total: 0,
        hotelID:'',
        isLoading: false,
      }
    },
    computed: mapGetters([
      'hotelConfirmOrderList'
    ]),
    created(){
      this.hotelID = sessionStorage.getItem('hotelID');
      if(!this.hotelID){
        this.$router.push({name:'HotelDetil'})
        this.$notify({
          message: '请先添加酒店信息!',
          position: 'top-left',
          type:'error'
        });
        return
      }
      this.touristTraderID = JSON.parse(sessionStorage.getItem('admin')).sm_ai_AgentID;
      this.initData('',1)
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return parseInt(prev + curr);
              } else {
                return parseInt(prev);
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },
      //确认订单
      confirmOrder(OrderID){
        let orderOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_or_OrderID": OrderID,//订单ID
        };
        this.$store.dispatch('ConfirmOrder',orderOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData('',1);
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //分页
      handleCurrentChange(num){
        this.initData(this.orderID,num)
      },
      initData(orderID,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_or_OrderID": orderID?orderID:'',//订单ID
          "ht_or_UserID": "",//用户编码
          "ht_or_TouristTraderID": this.touristTraderID,//商户编码
          "ht_or_Password": "",//凭证码
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelConfirmOrder', options)
        .then((total) => {
          this.total = total;
          this.isLoading = false
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //查询
      search(){
        this.initData(this.orderID,1)
      }
    },
  }
</script>
<style scoped>
</style>
