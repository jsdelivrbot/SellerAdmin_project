<template>
  <section id="wrap" class="clearfix">
    <h1 class="userClass">查询用户订单</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>用户编码筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="inputSearchValue" placeholder="请输入用户编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查 询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      v-loading="isLoading"
      :data="searchUserOrderList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" labelWidth="130px">
            <el-form-item label="订单编码">
              <span>{{ props.row.ts_to_OrderID }}</span>
            </el-form-item>
            <el-form-item label="旅行社编码">
              <span>{{ props.row.ts_to_TouristTraderID }}</span>
            </el-form-item>
            <el-form-item label="旅行社名称">
              <span>{{ props.row.ts_to_TouristTraderName }}</span>
            </el-form-item>
            <el-form-item label="用户编码">
              <span>{{ props.row.ts_to_UserID }}</span>
            </el-form-item>
            <el-form-item label="凭证码">
              <span>{{ props.row.ts_to_Password }}</span>
            </el-form-item>
            <el-form-item label="总张数">
              <span>{{ props.row.ts_to_TicketCount }}</span>
            </el-form-item>
            <el-form-item label="总金额">
              <span>{{ props.row.ts_to_SumPrice }}元</span>
            </el-form-item>
            <el-form-item label="总的网售手续费">
              <span>{{ props.row.ts_to_SumService }}</span>
            </el-form-item>
            <el-form-item label="是否删除">
              <span>{{ props.row.ts_to_IsDelete==0?"未删除":"已删除" }}</span>
            </el-form-item>
            <el-form-item label="出票状态">
              <span>{{ props.row.ts_to_OutStatus }}</span>
              <span>(<i style="color: green;">温馨提示:</i> 0: 出票中 1: 出票成功 2: 出票失败)</span>
            </el-form-item>
            <el-form-item label="发起订单时间">
              <span>{{ props.row.ts_to_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="订单支付时间">
              <span>{{ props.row.ts_to_PayTime }}</span>
            </el-form-item>
            <el-form-item label="支付方式">
              <span>{{ props.row.ts_to_PayWay }}</span>
            </el-form-item>
            <el-form-item label="订单支付码">
              <span>{{ props.row.ts_to_PayParam }}</span>
            </el-form-item>
            <el-form-item label="支付状态">
              <span>{{ props.row.ts_to_PayState==0?"未支付":"已支付" }}</span>
            </el-form-item>
            <el-form-item label="供票方编码">
              <span>{{ props.row.ts_to_SellID }}</span>
            </el-form-item>
            <el-form-item label="供票方名称">
              <span>{{ props.row.ts_to_SellName }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.ts_to_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="旅行社名称"
        prop="ts_to_TouristTraderName">
      </el-table-column>
      <el-table-column
        label=" 总金额"
        prop="ts_to_SumPrice">
      </el-table-column>
      <el-table-column
        label="用户编码"
        prop="ts_to_UserID">
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
    name:'',
    computed:mapGetters([
      'searchUserOrderList'
    ]),
    data(){
      return {
        total:0,
        inputSearchValue:'',
        isLoading:false,
      }
    },
    methods:{
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //初始化数据
      initData(num){
        var getUserOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "userID":this.inputSearchValue?this.inputSearchValue:'',//用户编码
          "page":num?num:1,
          "rows":5
        };
        this.isLoading = true;
        this.$store.dispatch('initSearchUserOrder',getUserOrderInfo)
          .then(total=>{
            this.total = Number(total);
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.isLoading = false;
      },
      //查询
      search(){
        this.initData()
      }
    },
  }
</script>
<style>
  .block{
    clear: both;
    float: right;
    margin-top:10px;
  }
</style>
