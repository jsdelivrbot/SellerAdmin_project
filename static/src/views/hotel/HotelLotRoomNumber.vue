<template>
  <div id="wrap" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right"style="margin: 20px 0px 0px 20px" >
      <el-breadcrumb-item  :to="{path:'/home/hotelRoom'}">房间</el-breadcrumb-item>
      <el-breadcrumb-item  @click.native="goHotelRoomProduct">酒店房间产品</el-breadcrumb-item>
      <el-breadcrumb-item >酒店批量生成房间</el-breadcrumb-item>

    </el-breadcrumb>
    <h1 class="userClass" style="font-size: 20px;">酒店批量生成房间</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <!--<span>房间产品名称筛选:</span>-->
        </el-form-item>
        <el-form-item>
          <!--<el-input type="text" v-model="roomName" auto-complete="off" placeholder="房间产品名称" size="small"></el-input>-->
        </el-form-item>
        <el-form-item  style="float: right;">
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <el-button type="primary" @click="Add" size="mini">批量生成房间</el-button>
          <el-button
            type="success"
            size="mini"
            style="margin-right: 80px;"
            @click="jump">预览效果
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelLotRoomNumberList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_rs_ID"
        label="生成房间ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="使用时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.ht_rs_UseDate | getUseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房间状态"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.ht_rs_LockStatus | getLockStatus}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="danger"-->
      <!--@click="Delete(scope.row.ht_re_Id)">删除-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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

    <!--批量生成-->
    <el-dialog title="批量生成房间" :visible.sync="addDialog">
      <el-form>
        <el-form-item label="日期选择:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        date:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        addDialog:false,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rpp_ID": "",//房间产品ID
          "ht_rpp_BeginUseDate": "",//开始供应日期
          "ht_rpp_EndUseDate": "",//结束供应日期
        },
        roomID:'',
        isLoading:false,
        total: 0,
        formLabelWidth:'120px',
      }
    },
    computed: mapGetters([
      'hotelLotRoomNumberList'
    ]),
    created(){
      let id = this.$route.params.id;
      if (!id) {
        this.$notify({
          message: '请先选择房间!',
          position: 'top-left',
          type: 'error'
        });
        this.$router.push({name: 'HotelRoom'});
        return
      }
      this.roomID = id;
      this.initData(1)
    },
    methods: {
      jump(obj){
        let hotelID=sessionStorage.getItem("hotelID")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/'+hotelID,'_blank')
      },
      goHotelRoomProduct(){
        this.$router.push({name:'HotelRoomProduct',params:{id:1378}})
      },
      //分页
      handleCurrentChange(num){
        this.initData(num);
      },
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rpp_ID": this.roomID,//房间产品ID
          "ht_rs_RoomEntityId":'',//房间实体ID
          "ht_rpp_BeginUseDate": "",//开始供应日期
          "ht_rpp_EndUseDate": "",//结束供应日期
          "page":page?page:1,
          "rows":'5'
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelLotRoomNumber',options)
        .then((total) => {
          this.total = total
          this.isLoading = false
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //生成
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //生成提交
      addSubmit(){
        this.addOptions.ht_rpp_ID = this.roomID;
        this.addOptions.ht_rpp_BeginUseDate = this.date[0];
        this.addOptions.ht_rpp_EndUseDate = this.date[1];
        this.$store.dispatch('AddHotelLotRoomNumber',this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>
