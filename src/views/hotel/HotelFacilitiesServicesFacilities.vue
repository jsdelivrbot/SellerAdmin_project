<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店设施服务设施</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;margin-right: 80px;">新增</el-button>
    </div>
    <el-button type="danger" size="mini" style="margin-left: 5px" @click="HotelFacilitiesServicesFacilitiesArrDelete">批量删除</el-button>
    <!--数据展示-->
    <el-table
      :data="hotelFacilitiesServicesFacilitiesList"
      v-loading="isLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="ht_hsh_ID"
        label="设施服务设施ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hd_HardName"
        label="设施服务设施名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_ht_HardTypeName"
        label="设施类型名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="Update(scope.row.ht_hsh_ID)">修改-->
          <!--</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_hsh_ID)">删除

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
    <!--添加酒店设施服务设施-->
    <el-dialog title="添加酒店设施服务设施" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">
        <el-form-item label="设施类型:" :label-width="formLabelWidth">
          <el-select placeholder="请选择设施类型" v-model="facilitiesTypeID" @change="changeFacilitiesType">
            <el-option
              v-for="item in hotelFacilitiesTypeList"
              :key="item.ht_ht_ID"
              :label="item.ht_ht_Name"
              :value="item.ht_ht_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设施:" :label-width="formLabelWidth" style="margin-bottom: 100px">
          <el-select  placeholder="请选择设施" multiple v-model="ht_hsh_HardIDList">
            <el-option
              v-for="item in searchFacilitiesList"
              :key="item.ht_hd_ID"
              :label="item.ht_hd_Name"
              :value="item.ht_hd_ID">
            </el-option>
          </el-select>
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
        total:0,
        hotelID:'',
        isLoading:false,
        addDialog:false,
        selectList:[],
        updateDialog:false,
        formLabelWidth:'120px',
        facilitiesTypeID:'',
        ht_hsh_HardIDList:[],
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_hsh_HardID": "",//设施编码
            "ht_ht_hotelID": "",//酒店ID
          }
        }
      }
    },
    computed: mapGetters([
      'hotelFacilitiesServicesFacilitiesList',
      'hotelFacilitiesList',
      'hotelFacilitiesTypeList',
      'searchFacilitiesList'
    ]),
    created(){
      this.hotelID = sessionStorage.getItem('hotelID');
      if(!this.hotelID){
        this.$router.push({name:'HotelDetil'})
        this.$notify({
          message: '请先添加酒店信息!',
          position: 'top-left',
          type: 'error'
        });
        return
      }
      this.initFacilitiesType();
      this.initData();

    },
    methods: {
      //批量删除
      HotelFacilitiesServicesFacilitiesArrDelete(){
        if (!this.selectList.length) {
          this.$notify({
            message: '请选择需要删除的设施服务设施!',
            type: 'error'
          });
          return
        }
        let arr = []
        for (var i = 0; i < this.selectList.length; i++) {
          arr[i] = this.selectList[i].ht_hsh_ID
        }
        this.getValue(arr)
        .then(suc => {
          this.$notify({
            message: '删除成功',
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
      async getValue(arr){
        for(var i=0;i<arr.length;i++){
          await this.ArrDelete(arr[i])
        }
      },
      //批量删除
      ArrDelete(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_hsh_ID": id//ID
          }
        };
       return this.$store.dispatch('DeleteHotelFacilitiesServicesFacilities',deleteOptions)
      },
      //全选
      handleSelectionChange(arr){
        this.selectList = arr;
      },
      jump(obj){
        let hotelID=sessionStorage.getItem("hotelID")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/'+hotelID,'_blank')
      },
      //惠乐游设施类型
      initFacilitiesType(){
        let hotelFacilitiesTypeOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_ht_ID": "",//设施类型Id
          "ht_ht_Name": '',//设施类型名称
        }
        this.$store.dispatch('initHotelFacilitiesType', hotelFacilitiesTypeOptions)
          .then(()=>{
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //选中设施类型
      changeFacilitiesType(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_hd_ID": "",//设施编码
          "ht_hd_Name": "",//设施名称
          "ht_hd_HardTypeID": this.facilitiesTypeID,//设施类型ID
          "ht_hd_IsHot": "",//是否热门
        };
        this.$store.dispatch('initSearchFacilities',options)
      },
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_hsh_ID": "",//设施服务设施ID
          "ht_hsh_HardID": "",//设施编码
          "ht_ht_hotelID": this.hotelID,//酒店ID
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading  = true;
        this.$store.dispatch('initHotelFacilitiesServicesFacilities',options)
        .then((total) => {

            this.total = total
            this.isLoading  = false
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //添加
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
        this.ht_hsh_HardIDList = []
        this.facilitiesTypeID = ''
        let obj = this.addOptions.data
        for(var attr in obj){
          obj[attr] = ''
        }
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_ht_hotelID = this.hotelID;
        this.addOptions.data.ht_hsh_HardID = this.ht_hsh_HardIDList.join(',')
        this.$store.dispatch('AddHotelFacilitiesServicesFacilities',this.addOptions)
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
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_hsh_ID": id//特色图标ID
          }
        };
        this.$store.dispatch('DeleteHotelFacilitiesServicesFacilities',deleteOptions)
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
