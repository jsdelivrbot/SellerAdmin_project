<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店设施服务</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;"  v-show="showAdd">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="hotelFacilitiesServicesList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_hs_ID"
        label="设施服务ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hs_BasicInfo"
        label="基本信息"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hs_HotelSpecial"
        label="酒店特色"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hs_StopService"
        label="停车服务"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row.ht_hs_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_hs_ID)">删除
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="jump(scope.row)">预览效果
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
    <!--添加酒店设施服务-->
    <el-dialog title="添加酒店设施服务" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="基本信息:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hs_BasicInfo">
          </el-input>
        </el-form-item>
        <el-form-item label="酒店特色:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hs_HotelSpecial">
          </el-input>
        </el-form-item>
        <el-form-item label="停车服务:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hs_StopService">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改酒店设施服务-->
    <el-dialog title="修改酒店设施服务" :visible.sync="updateDialog">
      <el-form :model="updateHotelFacilitiesServicesObj">
        <el-form-item label="基本信息:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelFacilitiesServicesObj.ht_hs_BasicInfo">
          </el-input>
        </el-form-item>
        <el-form-item label="酒店特色:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelFacilitiesServicesObj.ht_hs_HotelSpecial">
          </el-input>
        </el-form-item>
        <el-form-item label="停车服务:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelFacilitiesServicesObj.ht_hs_StopService">
          </el-input>
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
        total:0,
        hotelID:'',
        isLoading:false,
        imgShow:false,
        showAdd:true,
        imgUrl:'',
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_hs_HotelID": "",//酒店编码
            "ht_hs_BasicInfo": "",//基本信息
            "ht_hs_HotelSpecial": "",//酒店特色
            "ht_hs_StopService": "",//停车服务
          }
        }
      }
    },
    computed: mapGetters([
      'hotelFacilitiesServicesList',
      'updateHotelFacilitiesServicesObj'
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
      this.initData();
//      this.initFacilities();
    },
    methods: {
      jump(obj){
        let hotelID=sessionStorage.getItem("hotelID")
         window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/'+hotelID,'_blank')
      },
      //惠乐游设施
      initFacilities(){
        let hotelFacilitiesServicesoptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_hd_ID": "",//设施编码
          "ht_hd_Name": '',//设施名称
          "ht_hd_HardTypeID": "",//设施类型ID
          "ht_hd_IsHot": "",//是否热门
        }
        this.$store.dispatch('initHotelFacilities', hotelFacilitiesServicesoptions)
      },
      //分页
      handleCurrentChange(num){
        this.initData(num);
      },
      //初始化
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_hs_ID": "",//设施服务ID
          "ht_hs_HotelID": this.hotelID,//酒店编码
          "page":page?page:'',//页码编号
          "rows":"5",//单页显示数量
        }
        this.isLoading = true;
        this.$store.dispatch('initHotelFacilitiesServices',options)
          .then((total) => {
            if(total){
              this.showAdd = false;
              this.total = total
            }
//
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
        for(let attr in this.addOptions){
          this.addOptions[attr] = ''
        }
        if(this.showAdd){
          this.$store.commit('setTranstionFalse');
          this.addDialog = true;
        }else{
          this.$notify({
            message: '已经添加了，不能重复添加!',
            type: 'error'
          });
        }
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_hs_HotelID = this.hotelID;
        this.$store.dispatch('AddHotelFacilitiesServices',this.addOptions)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
      Update(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('updateHotelFacilitiesServices',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelFacilitiesServicesObj
        };
        this.$store.dispatch('UpdateHotelFacilitiesServices',updateOptions)
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
            "ht_hs_ID": id//设施服务ID
          }
        };
        this.$store.dispatch('DeleteHotelFacilitiesServices',deleteOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.showAdd = true;
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
