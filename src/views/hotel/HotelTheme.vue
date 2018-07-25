<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店主题信息</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;margin-right: 80px;">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="hotelThemeList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_ht_Id"
        label="酒店主题编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_tt_ThemeName"
        label="主题类别"
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
            @click="Delete(scope.row.ht_ht_Id)">删除
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

    <!--添加酒店主题-->
    <el-dialog title="添加酒店主题" :visible.sync="addDialog">
      <el-form :model="addOptions">

        <el-form-item label="主题类别:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_tt_ThemeID" placeholder="请选择主题类别">
            <el-option
              v-for="item in hotelThemeTypeList"
              :key="item.ht_tt_ThemeID"
              :label="item.ht_tt_Name"
              :value="item.ht_tt_ThemeID">
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
            "ht_tt_ThemeID": "",//主题ID
            "ht_ht_hotelID": "",//酒店编码
          }
        }
      }
    },
    computed: mapGetters([
      'hotelThemeList',
      'hotelThemeTypeList'
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
      this.initData(1);
      this.initThemeType();
    },
    methods: {
      jump(obj){
        let hotelID=sessionStorage.getItem("hotelID")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/'+hotelID,'_blank')
      },
      //惠乐游主题类型
      initThemeType(){
        let themeOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_tt_ThemeID": "",//主题ID
          "ht_tt_Name": '',//主题名称
          "ht_tt_IsHot": "",//是否热门
        };
        this.$store.dispatch('initHotelThemeType', themeOptions)
      },
      //分页
      handleCurrentChange(num){
        this.initData(num);
      },
      //初始化数据
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_ht_Id": "",//酒店主题编号
          "ht_tt_ThemeID": "",//主题ID
          "ht_ht_hotelID": this.hotelID,//酒店编码
          "page": page?page:1,//页码编号
          "rows": "5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelTheme',options)
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
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_ht_hotelID = this.hotelID;
        this.$store.dispatch('AddHotelTheme',this.addOptions)
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
            "ht_ht_Id": id//酒店主题编号
          }
        };
        this.$store.dispatch('DeleteHotelTheme',deleteOptions)
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
