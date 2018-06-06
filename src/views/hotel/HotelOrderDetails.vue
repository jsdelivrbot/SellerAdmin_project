<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass not-print" >酒店订单明细</h1>
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
          <el-button type="primary" @click="print" size="small">打印</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="hotelOrderDetailsList"
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
            <el-form-item label="订单明细编号:">
              <span>{{ props.row.ht_od_ID}}</span>
            </el-form-item>
            <el-form-item label="订单虚拟票号:">
              <span>{{ props.row.ht_od_ticketID}}</span>
            </el-form-item>
            <el-form-item label="旅行社商家编码:">
              <span>{{ props.row.ht_od_TouristTraderID}}</span>
            </el-form-item>
            <el-form-item label="旅行社商家名称:">
              <span>{{ props.row.ht_od_TouristTraderName}}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.ht_od_Email}}</span>
            </el-form-item>
            <el-form-item label="入住日期:">
              <span>{{ props.row.ht_od_TourDate | getUseTime}}</span>
            </el-form-item>
            <el-form-item label="房间锁定ID:">
              <span>{{ props.row.ht_od_SeatNo}}</span>
            </el-form-item>
            <el-form-item label="使用状态:">
              <span>{{ props.row.ht_od_UseStatus}}</span>
            </el-form-item>
            <el-form-item label="订单发起时间:">
              <span>{{ props.row.ht_od_CreateTime | getUseTime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="ht_od_OrderID"
        label="订单号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_od_GoodsListName"
        label="旅行社产品名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_od_SellPrice"
        label="订单价格(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_od_ServiceFee"
        label="服务费(元)"
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
        touristTraderID:'',
        total: 0,
        isLoading: false,
      }
    },
    computed: mapGetters([
      'hotelOrderDetailsList'
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
          "ht_od_ID": "",//订单明细编号
          "ht_od_OrderID": orderID?orderID:'',//订单ID
          "ht_od_ticketID": '',//订单虚拟票号
          "ht_od_TouristTraderID": this.touristTraderID,//旅行社商家编码
          "page":page?page:1,//页码编号
          "rows":"20",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelOrderDetails', options)
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
      },
      //打印
      print(e){
        let subOutputRankPrin = document.querySelector('#wrap');
          document.body.innerHTML = subOutputRankPrin.innerHTML;
          window.print();
          window.location.reload();
          return false;
      }
    },
  }
</script>
<style scoped>
  @media print {
    .not-print {
      opacity: 0
    }
  }
</style>
