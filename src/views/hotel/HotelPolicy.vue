<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店政策信息</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;" v-show="showAdd">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="hotelPolicyList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_hp_ID"
        label="政策编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hp_InOut"
        label="入住和离店"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hp_CancelRule"
        label="取消政策"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hp_BookRule"
        label="入住手续"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hp_TakePeg"
        label="携带宠物"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row.ht_hi_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_hi_ID)">删除
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

    <!--添加酒店政策-->
    <el-dialog title="添加酒店政策" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="入住和离店:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hp_InOut">
          </el-input>
        </el-form-item>
        <el-form-item label="取消政策:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hp_CancelRule">
          </el-input>
        </el-form-item>
        <el-form-item label="入住手续:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hp_BookRule">
          </el-input>
        </el-form-item>
        <el-form-item label="携带宠物:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hp_TakePeg">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改酒店图片-->
    <el-dialog title="修改酒店政策" :visible.sync="updateDialog">
      <el-form :model="updateHotelPolicyObj">
        <el-form-item label="入住和离店:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelPolicyObj.ht_hp_InOut">
          </el-input>
        </el-form-item>
        <el-form-item label="取消政策:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelPolicyObj.ht_hp_CancelRule">
          </el-input>
        </el-form-item>
        <el-form-item label="入住手续:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelPolicyObj.ht_hp_BookRule">
          </el-input>
        </el-form-item>
        <el-form-item label="携带宠物:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelPolicyObj.ht_hp_TakePeg">
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
        showAdd:true,
        hotelID:'',
        total:0,
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px',
        isLoading:false,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_hp_HotelID": "",//酒店编码
            "ht_hp_InOut": "",//入住和离店
            "ht_hp_CancelRule": "",//取消政策
            "ht_hp_BookRule": "",//入住手续
            "ht_hp_TakePeg": "",//携带宠物
          }
        }
      }
    },
    computed: mapGetters([
      'hotelPolicyList',
      'updateHotelPolicyObj'
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
      this.initData()
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //查询
      initData(page){
       let options = {
         "loginUserID": "huileyou",
         "loginUserPass": "123",
         "operateUserID": "操作员编码",
         "operateUserName": "操作员名称",
         "pcName": "",
         "ht_hp_ID": "",//酒店政策ID
         "ht_hp_HotelID": this.hotelID,//酒店编码
         "page":page?page:1,//页码编号
         "rows":"5",//单页显示数量
       }
       this.isLoading = true;
       this.$store.dispatch('initHotelPolicy',options)
         .then((total) => {
           if(total){
             this.showAdd = false;
           }
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
        this.addOptions.data.ht_hp_HotelID = this.hotelID;
        this.$store.dispatch('AddHotelPolicy',this.addOptions)
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
        this.$store.commit('updateHotelPolicy',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelPolicyObj
        }
        this.$store.dispatch('UpdateHotelPolicy',updateOptions)
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
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_hp_ID": id//酒店政策ID
          }
        };
        this.$store.dispatch('DeleteHotelPolicy',deleteOptions)
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
