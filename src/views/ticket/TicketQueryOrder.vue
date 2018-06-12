<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">订单信息</h1>

      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>支付状态筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchId" placeholder="请选择"  size="mini">
              <el-option
                v-for="item in searchArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="ticketQueryOrderList"
        style="width: 100%; margin-top: 20px;"
        v-loading="isLoading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单 ID">
                <span>{{ props.row.tm_or_OrderID }}</span>
              </el-form-item>
              <el-form-item label="景点编号">
                <span>{{ props.row.tm_or_TourSiteCode }}</span>
              </el-form-item>
              <el-form-item label="商户票种编号">
                <span>{{ props.row.tm_or_TicketTypeID }}</span>
              </el-form-item>
              <el-form-item label="景点商户编号">
                <span>{{ props.row.tm_or_TradeInfoID }}</span>
              </el-form-item>
              <el-form-item label="景点商户名称">
                <span>{{ props.row.tm_or_TradeInfoName }}</span>
              </el-form-item>
              <el-form-item label="凭证码">
                <span>{{ props.row.tm_or_Password }}</span>
              </el-form-item>
              <el-form-item label="总张数">
                <span>{{ props.row.tm_or_TicketCount }}张</span>
              </el-form-item>
              <el-form-item label="总金额">
                <span>{{ props.row.tm_or_SumPrice }}元</span>
              </el-form-item>
              <el-form-item label="总的网售手续费">
                <span>{{ props.row.tm_or_SumService }}元</span>
              </el-form-item>
              <el-form-item label="出票状态">
                <span>{{ props.row.tm_or_OutStatus }}</span>
              </el-form-item>
              <el-form-item label="使用状态">
                <span>{{ props.row.tm_or_UseState }}</span>
              </el-form-item>
              <el-form-item label="失败编号">
                <span>{{ props.row.tm_or_FailID }}</span>
              </el-form-item>
              <el-form-item label="失败原因">
                <span>{{ props.row.tm_or_FailContent }}</span>
              </el-form-item>
              <el-form-item label="分销商编码">
                <span>{{ props.row.tm_or_SellID }}</span>
              </el-form-item>
              <el-form-item label="分销商名称">
                <span>{{ props.row.tm_or_SellName }}</span>
              </el-form-item>
              <el-form-item label="全票价">
                <span>{{ props.row.tm_or_FullPrice }}元</span>
              </el-form-item>
              <el-form-item label="儿童价">
                <span>{{ props.row.tm_or_ChildPrice }}元</span>
              </el-form-item>
              <el-form-item label="发起订单时间">
                <span>{{ props.row.tm_or_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="订单支付时间">
                <span>{{ props.row.tm_or_PayTime }}</span>
              </el-form-item>
              <el-form-item label="支付方式">
                <span>{{ props.row.tm_or_PayWay }}</span>
              </el-form-item>
              <el-form-item label="订单支付码">
                <span>{{ props.row.tm_or_PayParam }}</span>
              </el-form-item>
              <el-form-item label="支付状态">
                <span>{{ props.row.tm_or_PayState }}</span>
              </el-form-item>
              <el-form-item label="是否结算">
                <span>{{ props.row.tm_or_IsBalance }}</span>
              </el-form-item>
              <el-form-item label="使用时间">
                <span>{{ props.row.tm_or_UseTime }}</span>
              </el-form-item>
              <el-form-item label="用户编码">
                <span>{{ props.row.tm_or_UserID }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.tm_or_Remark }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.tm_or_Email }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.tm_or_TelePhone }}</span>
              </el-form-item>
              <el-form-item label="订单名称">
                <span>{{ props.row.tm_or_GoodsListName }}</span>
              </el-form-item>
              <el-form-item label="联系人">
                <span>{{ props.row.tm_or_ConnectName }}</span>
              </el-form-item>
              <el-form-item label="出游日期">
                <span>{{ props.row.tm_or_TravelDate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="联系人"
          prop="tm_or_ConnectName">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="tm_or_TelePhone">
        </el-table-column>
        <el-table-column
          label="出游日期"
          prop="tm_or_TravelDate">
        </el-table-column>
        <el-table-column
          label="出票状态"
          prop="tm_or_OutStatus">
        </el-table-column>
        <el-table-column
          label="支付状态"
          prop="tm_or_PayState">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="confirmOrder(scope.row.tm_or_OrderID)">确认订单并出单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->

      <div class="block" style="text-align: right">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
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
      'ticketQueryOrderList'
    ]),
    data() {
      return {
        total: 0,
        searchId: '',
        searchArr: [
          {
            value: 0,
            label: '未支付'
          },
          {
            value: 1,
            label: '已支付'
          }
        ],
        userInfo: '',
        isLoading: false,
      }
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //初始化数据
      initData(num) {
        this.isLoading = true;
        let getTradeOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_or_UserID": "", //用户编码
          "tm_or_TradeInfoID": this.userInfo.sm_ai_ID, //商户编码
          "tm_or_PayState": this.searchId, //支付状态(0未支付1已支付)
          "page": num ? num : 1,
          "rows": 10
        };
        this.$store.dispatch('initTicketQueryOrder', getTradeOrderInfo)
          .then(total => {
            this.total = total;
            this.isLoading = false;
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
      confirmOrder(id) {
        let reSureOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "orderID": id ? id : ''
        };
        this.$store.dispatch('ticketConfirmOrder', reSureOrder)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      this.initData();
    }
  }
</script>
<style scoped>
</style>
