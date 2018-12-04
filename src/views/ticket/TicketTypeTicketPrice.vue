<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">票种_票价信息</h1>

      <!--查询栏-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>日期筛选:</span>
          </el-form-item>
          <!--<el-select v-model="ticketTypeNumber" placeholder="请选择票种" size="mini" style="margin-top: 7px;">-->
          <!--<el-option-->
          <!--v-for="item in ticketTypeList"-->
          <!--:key="item.tm_tt_ID"-->
          <!--:label="item.tm_tt_Name"-->
          <!--:value="item.tm_tt_ID">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="scenicNumber" placeholder="请选择景点" @change="changeScenicNumber" size="mini">-->
          <!--<el-option-->
          <!--v-for="item in ticketAttractionsList"-->
          <!--:key="item.tm_ts_Code"-->
          <!--:label="item.tm_ts_Name"-->
          <!--:value="item.tm_ts_Code">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-form-item>
            <div class="block">
              <el-date-picker
                size="mini"
                v-model="searchTime"
                type="date"
                placeholder="选择日期(默认为本月)"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
            <el-button type="primary" @click="Add" size="mini">新增</el-button>
            <el-button
              type="success"
              size="mini"
              @click="jump">预览效果
            </el-button>
            <el-button type="danger" @click="deleteBtn" size="mini">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="ticketTypeTicketPriceList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="票种票价编号">
                <span>{{ props.row.tm_tp_ID }}</span>
              </el-form-item>
              <el-form-item label="票种编号">
                <span>{{ props.row.tm_tt_ID }}</span>
              </el-form-item>
              <el-form-item label="票价">
                <span>{{ props.row.tm_tp_TicketPrice }}元</span>
              </el-form-item>
              <!--<el-form-item label="折价金额">-->
              <!--<span>{{ props.row.tm_tp_SalePrice }}元</span>-->
              <!--</el-form-item>-->
              <el-form-item label="实际价格">
                <span>{{ props.row.tm_tp_RealPrice }}元</span>
              </el-form-item>
              <!--<el-form-item label="退票手续费">-->
              <!--<span>{{ props.row.tm_tp_BackPriceFee }}元</span>-->
              <!--</el-form-item>-->
              <el-form-item label="日期">
                <span>{{ props.row.tm_tp_Date }}</span>
              </el-form-item>
              <el-form-item label="限售张数">
                <span>{{ props.row.tm_tp_Limit }}张</span>
              </el-form-item>
              <!--<el-form-item label="备注">-->
              <!--<span>{{ props.row.tm_tp_Remark }}</span>-->
              <!--</el-form-item>-->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="实际价格(元)"
          prop="tm_tp_RealPrice">
        </el-table-column>
        <el-table-column
          label="限售张数(张)"
          prop="tm_tp_Limit">
        </el-table-column>
        <!--<el-table-column-->
        <!--label="退票手续费(元)"-->
        <!--prop="tm_tp_BackPriceFee">-->
        <!--</el-table-column>-->
        <el-table-column
          label="日期"
          prop="tm_tp_Date">
        </el-table-column>
      </el-table>

      <!--分页-->

      <div class="block" style="float: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>

      <!--添加票种票价-->

      <el-dialog title="添加票种票价" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <!--<el-form-item label="票种编号:" :label-width="formLabelWidth">-->
            <!--<el-select v-model="addOptions.tm_tt_ID" placeholder="如果没有数据先查询">-->
              <!--<el-option-->
                <!--v-for="item in ticketTypeList"-->
                <!--:key="item.tm_tt_ID"-->
                <!--:label="item.tm_tt_Name"-->
                <!--:value="item.tm_tt_ID">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="限售张数:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tp_Limit"></el-input>
          </el-form-item>
          <el-form-item label="开始日期:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="addOptions.createFrom"
                type="date"
                placeholder="选择开始生产日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="结束日期:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="addOptions.createTo"
                type="date"
                placeholder="选择结束生成日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--删除票种票价-->

      <el-dialog title="删除票种票价" :visible.sync="deleteDialog">
        <el-form :model="deleteOptions">
          <el-form-item label="票种编号:" :label-width="formLabelWidth">
            <el-select v-model="deleteOptions.tm_tt_ID" placeholder="如果没有数据先查询">
              <el-option
                v-for="item in ticketTypeList"
                :key="item.tm_tt_ID"
                :label="item.tm_tt_Name"
                :value="item.tm_tt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始日期:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="deleteOptions.dateFrom"
                type="date"
                placeholder="选择删除开始日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="结束日期:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="deleteOptions.dateTo"
                type="date"
                placeholder="选择删除结束日期"
                value-format="yyyy-MM-dd"
              >
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
      'ticketAttractionsList',
      'ticketTypeList',
      'ticketTypeTicketPriceList'
    ]),
    data() {
      return {
        searchTime: '',
        loginId: '',
        isLoading:false,
        scenicNumber: '',
        ticketTypeNumber: '',
        total: 0,
        addDialog: false,
        formLabelWidth: '120px',
        addOptions: {
          "tm_tt_ID": "",
          "tm_tp_Limit": "",
          "createFrom": "",
          "createTo": "",
        },
        deleteDialog: false,
        deleteOptions: {
          tm_tt_ID: '',
          dateFrom: '',
          dateTo: ''
        }
      }
    },
    methods: {
      jump(){
        let code =sessionStorage.getItem("code")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/'+code,'_blank')
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.ticketTypeNumber, num)
      },
      //初始化景点信息
      initTicketAttraction() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": "",
          "tm_ts_Name": "",
          "tm_ts_TradeInfoID": this.loginId.sm_ui_ID,
          "tm_ts_IsDelete": 0,
          "tm_ts_IsPass": "",
          "tm_ts_ShowTop": "",
          "tm_ts_IsHot": "",
          "tm_ts_ThemeTypeID": "",
          "page": 1,
          "rows": 1000
        };
        this.$store.dispatch('initTicketAttractions', options)
      },
//      //初始化票种
//      initTicketType(id) {
//        let getTicketTypePriceList = {
//          "loginUserID": "huileyou",
//          "loginUserPass": "123",
//          "operateUserID": "",
//          "operateUserName": "",
//          "pcName": "",
//          "tm_ts_Code": id ? id : '',
//          "tm_tt_TradeInfoID": this.loginId.sm_ui_ID,
//          "tm_tt_IsDelete": 0,
//          "page": 1,
//          "rows": 1000
//        };
//        this.$store.dispatch('initTicketType', getTicketTypePriceList)
//      },
//      //选择景点
//      changeScenicNumber() {
//        this.initTicketType(this.scenicNumber)
//      },
      //初始化数据
      initData(id, num) {
        let getTicketTypePriceList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_tt_ID": id ? id : '',
          "dateFrom": this.searchTime ? this.searchTime : '',
          "page": num ? num : 1,
          "rows": 5
        };
        this.isLoading = true;
        this.$store.dispatch('initTicketTypeTicketPrice', getTicketTypePriceList)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        this.initData(this.ticketTypeNumber)
      },
      //添加按钮
      Add() {
        for(let attr in this.addOptions){
          this.addOptions[attr] = ''
        }
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        let insertTicketTypePrice = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        insertTicketTypePrice.data.tm_tt_ID =this.$route.params.id;
        this.$store.dispatch('addTicketTypeTicketPriceSubmit', insertTicketTypePrice)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.addOptions.tm_tt_ID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
      //删除按钮
      deleteBtn() {
        this.$store.commit('setTranstionFalse');
        this.deleteDialog = true;
      },
      //删除提交
      deleteSubmit() {
        let deleteTicketTypePrice = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_tt_ID": this.deleteOptions.tm_tt_ID,
          "dateFrom": this.deleteOptions.dateFrom,
          "dateTo": this.deleteOptions.dateTo
        };
        this.$store.dispatch('deleteTicketTypeTicketPriceSubmit', deleteTicketTypePrice)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.ticketTypeNumber);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.deleteDialog = false;
      },
    },
    created() {
      this.ticketTypeNumber = this.$route.params.id
      this.loginId = JSON.parse(sessionStorage.getItem('admin'));
      this.initData(this.ticketTypeNumber)
//      this.initTicketAttraction();
    }
  }
</script>
<style scoped>
</style>
