<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">租车订单明细</h1>
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
      :data="carOrderDetailsList"
      v-loading="isLoading"
      border
      :summary-method="getSummaries"
      show-summary
      style="width: 100%; margin-top: 20px;"
      size="small"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号:">
              <span>{{ props.row.cr_cro_Id}}</span>
            </el-form-item>
            <el-form-item label="订单号:">
              <span>{{ props.row.cr_cro_OrderId}}</span>
            </el-form-item>
            <el-form-item label="用户名称:">
              <span>{{ props.row.cr_cro_UserName}}</span>
            </el-form-item>
            <el-form-item label="凭证码:">
              <span>{{ props.row.cr_cro_PassWord}}</span>
            </el-form-item>
            <el-form-item label="公司汽车名称:">
              <span>{{ props.row.cr_cro_CarName}}</span>
            </el-form-item>
            <el-form-item label="取车门店:">
              <span>{{ props.row.cr_cro_TakeStoreId}}</span>
            </el-form-item>
            <el-form-item label="还车门店:">
              <span>{{ props.row.cr_cro_GiveBackStoreId}}</span>
            </el-form-item>
            <el-form-item label="供应商名称:">
              <span>{{ props.row.cr_cro_AgentName}}</span>
            </el-form-item>
            <el-form-item label="驾驶员名称:">
              <span>{{ props.row.cr_cro_DriverName}}</span>
            </el-form-item>
            <el-form-item label="证件类型:">
              <span>{{ props.row.cr_cro_IDType | getIDType}}</span>
            </el-form-item>
            <el-form-item label="证件号:">
              <span>{{ props.row.cr_cro_IDCode}}</span>
            </el-form-item>
            <el-form-item label="手机号:">
              <span>{{ props.row.cr_cro_Phone}}</span>
            </el-form-item>
            <el-form-item label="车型名称:">
              <span>{{ props.row.cr_cro_CarName}}</span>
            </el-form-item>
            <el-form-item label="租车费用:">
              <span>{{ props.row.cr_cro_CarRentalFee}}</span>
            </el-form-item>
            <el-form-item label="手续费:">
              <span>{{ props.row.cr_cro_ServiceCharge}}</span>
            </el-form-item>
            <el-form-item label="保险费:">
              <span>{{ props.row.cr_cro_Insurance}}</span>
            </el-form-item>
            <el-form-item label="总价格:">
              <span>{{ props.row.cr_cro_TotalPrice}}</span>
            </el-form-item>
            <el-form-item label="不计免赔:">
              <span>{{ props.row.cr_cro_DeductibleInsurance}}</span>
            </el-form-item>
            <el-form-item label="第三方责任险:">
              <span>{{ props.row.cr_cro_ThirdPartyInsurance}}</span>
            </el-form-item>
            <el-form-item label="取车时间:">
              <span>{{ props.row.cr_cro_GetTime}}</span>
            </el-form-item>
            <el-form-item label="还车时间:">
              <span>{{ props.row.cr_cro_BackTime}}</span>
            </el-form-item>
            <el-form-item label="第三方责任险:">
              <span>{{ props.row.cr_cro_ThirdPartyInsurance}}</span>
            </el-form-item>
            <el-form-item label="出单状态:">
              <span>{{ props.row.cr_cro_OutStatus | getOutStatus}}</span>
            </el-form-item>
            <el-form-item label="支付状态:">
              <span>{{ props.row.cr_cro_PlayStatus | payStatus}}</span>
            </el-form-item>
            <el-form-item label="使用状态:">
              <span>{{ props.row.cr_cro_UseStatus | useStatus}}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.cr_cro_CreateTime}}</span>
            </el-form-item>
            <el-form-item label="支付时间:">
              <span>{{ props.row.cr_cro_PlayTime}}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{ props.row.cr_cro_PlayType}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="cr_cro_Id"
        label="订单编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cro_OrderId"
        label="订单号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cro_AgentName"
        label="租车公司名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cro_TotalPrice"
        label="总价格(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cro_ServiceCharge"
        label="手续费(元)"
        align="center"
      >
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
        total: 0,
        isLoading: false,
        traderID:''
      }
    },
    computed: mapGetters([
      'carOrderDetailsList'
    ]),
    created(){
      this.traderID = JSON.parse(sessionStorage.getItem('admin')).sm_ai_AgentID;
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
      //分页
      handleCurrentChange(num){
        this.initData(this.orderID,num)
      },
      //查询
      search(){
        this.initData(this.orderID,1)
      },
      initData(orderID,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page?page:1,//分页号
          "rows": "20",//单页显示数据量
          "cr_cro_Id": "",//订单编号
          "cr_cro_OrderId": orderID?orderID:'',//订单号
          "cr_cro_UserCode": "",//用户编号
          "cr_cro_PassWord": "",//凭证码
          "cr_cro_AgentId":  this.traderID,//供应商编号
        };
        this.isLoading = true;
        this.$store.dispatch('initCarOrderDetails', options)
        .then((total) => {
          this.total = total;
          this.isLoading = false
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      }
    },
  }
</script>
<style scoped>

</style>
