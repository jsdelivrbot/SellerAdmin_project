<template>
  <div id="wrap" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right"style="margin: 20px 0px 0px 20px" >
      <el-breadcrumb-item :to="{ path:'/home/hotelRoom/'}" >房间</el-breadcrumb-item>
      <el-breadcrumb-item >酒店房间设施</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="userClass">酒店房间设施管理</h1>
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
          <el-button type="primary" @click="Add" size="small" style="margin-right: 80px;">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelRoomRoomFacilitiesList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_rth_ID"
        label="房间房间设施ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_rth_RoomHardName"
        label="房间设施名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_rth_RoomHardTypeName"
        label="房间设施类型名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row.ht_rth_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_rth_ID)">删除
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="jump(scope.row)">预览效果
          </el-button>
        </template>
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

    <!--添加房间房间设施-->
    <el-dialog title="添加房间设施" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">

        <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
          <el-select v-model="RoomFacilitiesTypeID" placeholder="请选择类型" @change="changeRoomFacilities">
            <el-option
              v-for="item in hotelRoomFacilitiesTypeList"
              :key="item.ht_rht_ID"
              :label="item.ht_rht_Name"
              :value="item.ht_rht_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间设施:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_rth_RoomHardID" placeholder="请选择" >
            <el-option
              v-for="item in roomFacilitiesList"
              :key="item.ht_rh_ID"
              :label="item.ht_rh_Name"
              :value="item.ht_rh_ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改房间房间设施-->
    <el-dialog title="修改房间设施" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-form :model="updateHotelRoomRoomFacilitiesObj">

        <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
          <el-select v-model="RoomFacilitiesTypeID" placeholder="请选择类型" @change="changeRoomFacilities">
            <el-option
              v-for="item in hotelRoomFacilitiesTypeList"
              :key="item.ht_rht_ID"
              :label="item.ht_rht_Name"
              :value="item.ht_rht_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间设施:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomRoomFacilitiesObj.ht_rth_RoomHardID" placeholder="请选择" >
            <el-option
              v-for="item in roomFacilitiesList"
              :key="item.ht_rh_ID"
              :label="item.ht_rh_Name"
              :value="item.ht_rh_ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
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
        roomID:'',
        total: 0,
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        RoomFacilitiesTypeID:'',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_rth_RoomHardID": "",//房间设施
            "ht_rth_RoomID": "",//房间ID
            "ht_ht_hotelID": "",//酒店ID
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomRoomFacilitiesList',
      'hotelRoomFacilitiesTypeList',
      'roomFacilitiesList',
      'hotelID',
      'updateHotelRoomRoomFacilitiesObj'
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
      this.initData(1);
      this.initFacilitiesType();
    },
    methods: {
      jump(obj){
        let hotelID=sessionStorage.getItem("hotelID")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/'+hotelID,'_blank')
      },
      //惠乐游房间设施类型
      initFacilitiesType(){
        let roomTypeOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rht_ID": "",//房间设施类型ID
          "ht_rht_Name": "",//类型名称
        }
        this.$store.dispatch('initHotelRoomFacilitiesType', roomTypeOptions)
      },
      //选中房间设施类型
      changeRoomFacilities(){
        //获取对应设施
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_rh_ID": "",//房型设施
          "ht_rh_Name": "",//设施名称
          "ht_rh_RoomHardTypeID": this.RoomFacilitiesTypeID,//房间设施类型ID
          "ht_rh_IsHot": "",//是否热门
        }
        this.$store.dispatch('initRoomFacilities',options)
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
          "ht_rth_ID": "",//房间房间设施ID
          "ht_rth_RoomHardID": "",//房间设施
          "ht_rth_RoomID": this.roomID,//房间ID
          "ht_ht_hotelID": "",//酒店ID
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomRoomFacilities', options)
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

      },
      Add(){
        for(let attr in this.addOptions.data){
          if(typeof this.addOptions.data[attr]=='object'){
            for(let attr1 in this.addOptions.data[attr]){
              this.addOptions.data[attr][attr1] = ''
            }
          }else{
            this.addOptions.data[attr] = ''
          }
        }
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_ht_hotelID = this.hotelID;
        this.addOptions.data.ht_rth_RoomID = this.roomID;
        this.$store.dispatch('AddHotelRoomRoomFacilities',this.addOptions)
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
      },
      Update(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('UpdateHotelRoomRoomFacilities', id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRoomRoomFacilitiesObj
        };
        this.$store.dispatch('UpdateHotelRoomRoomFacilities',updateOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData( 1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_rth_ID": id//房间房间设施ID
          }
        };
        this.$store.dispatch('DeleteHotelRoomRoomFacilities',deleteOptions)
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
      },
    },
  }
</script>
<style scoped>

</style>
