<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店图标信息</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="hotelIconList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_hi_ID"
        label="图标编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hi_ImageName"
        label="图片库名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="primary"-->
          <!--@click="Update(scope.row.ht_hi_ID)">修改-->
          <!--</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_hi_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加酒店图标-->
    <el-dialog title="添加酒店图标" :visible.sync="addDialog">
      <el-form :model="addOptions">

        <el-form-item label="主题类别:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_hi_ImageID" placeholder="请选择主题类别">
            <el-option
              v-for="item in hotelIconGalleryList"
              :key="item.ht_ie_ID"
              :label="item.ht_ie_Name"
              :value="item.ht_ie_ID">
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
            "ht_hi_HotelID": "",//酒店编码
            "ht_hi_ImageID": "",//图标库ID
          }
        }
      }
    },
    computed: mapGetters([
      'hotelIconGalleryList',
      'hotelIconList'
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
      initData(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_hi_ID": "",//特色图标ID
          "ht_hi_HotelID": this.hotelID,//酒店编码
          "ht_hi_ImageID": "",//图标库ID
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelIcon',options)
          .then(()=> {
            this.isLoading  = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //添加
      Add(){
        let obj = this.addOptions.data
        for(var attr in obj){
          obj[attr] = ''
        }
//        this.addOptions.data.ht_hi_ImageID = '';
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_hi_HotelID = this.hotelID;
        this.$store.dispatch('AddHotelIcon',this.addOptions)
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
          });
        this.addDialog = false;
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
            "ht_hi_ID": id//特色图标ID
          }
        }
        this.$store.dispatch('DeleteHotelIcon',deleteOptions)
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
        });
      },
    },
  }
</script>
<style scoped>

</style>
