<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass not-print" >旅行社订单明细</h1>
    <el-col :span="24" class="formSearch not-print">
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
      }
    },
    computed: mapGetters([]),
    created(){
      this.initData('')
    },
    methods: {
      handleCurrentChange(num){
        this.initData('',num)
      },
      initData(orderID,page){
        let admin = JSON.parse(sessionStorage.getItem('admin'));
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tradeID": admin.sm_ui_ID,//商户编码
          "page": page?page:1,
          "rows": 20
        };
      },
      //查询
      search(){
        this.initData(this.orderID)
      }
    },
  }
</script>
<style scoped>

</style>
