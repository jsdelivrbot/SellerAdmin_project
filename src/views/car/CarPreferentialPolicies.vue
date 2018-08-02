<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">租车优惠政策管理</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="carPreferentialPoliciesList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="cr_i_Id"
        label="优惠政策编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_Name"
        label="优惠政策名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_BeginDate"
        label="开始日期"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_EndDate"
        label="结束日期"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_MinDays"
        label="最低租车天数(天)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_UseCount"
        label="每客使用次数"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_FavorablePrice"
        label="优惠价格(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_i_Introduce"
        label="介绍"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            style="margin-bottom: 5px"
            size="mini"
            type="primary"
            @click="Update(scope.row)"
          >修改
          </el-button>
          <br>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.cr_i_Id)">删除
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
    <!--添加优惠政策-->
    <el-dialog title="添加优惠政策" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="优惠政策名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_i_Name"></el-input>
        </el-form-item>
        <el-form-item label="使用日期:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最低租车天数:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_i_MinDays"></el-input>
        </el-form-item>
        <el-form-item label="每客使用次数:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_i_UseCount"></el-input>
        </el-form-item>
        <el-form-item label="优惠价格:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_i_FavorablePrice"></el-input>
        </el-form-item>
        <el-form-item label="介绍:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入介绍内容"
            v-model="addOptions.data.cr_i_Introduce">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改优惠政策-->
    <el-dialog title="修改优惠政策" :visible.sync="updateDialog">
      <el-form :model="updateOptions">
        <el-form-item label="优惠政策名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_i_Name"></el-input>
        </el-form-item>
        <el-form-item label="使用日期:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最低租车天数:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_i_MinDays"></el-input>
        </el-form-item>
        <el-form-item label="每客使用次数:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_i_UseCount"></el-input>
        </el-form-item>
        <el-form-item label="优惠价格:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_i_FavorablePrice"></el-input>
        </el-form-item>
        <el-form-item label="介绍:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入介绍内容"
            v-model="updateOptions.cr_i_Introduce">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
        carCompaniesID:'',
        dateArr:'',
        carCompaniesID:'',
        addDialog:false,
        total:0,
        updateDialog:false,
        isLoading:false,
        formLabelWidth:'120px',
        updateOptions:{},
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_i_HertzId": "",//租车公司编号
            "cr_i_Name": "",//优惠政策名称
            "cr_i_BeginDate": "",//开始日期
            "cr_i_EndDate": "",//结束日期
            "cr_i_MinDays": "",//最低租车天数
            "cr_i_UseCount": "",//每客使用次数
            "cr_i_Introduce": "",//介绍
            "cr_i_FavorablePrice": "",//优惠价格
          }
        }
      }
    },
    computed: mapGetters([
      'carPreferentialPoliciesList'
    ]),
    created(){
      this.carCompaniesID = sessionStorage.getItem('carCompaniesID');
      this.carCompaniesID = sessionStorage.getItem('carCompaniesID');
      if (!this.carCompaniesID) {
        this.$router.push({name: 'CarHome'});
        this.$notify({
          message: '请先添加租车公司!',
          position: 'top-left',
          type:'error'
        });
        return
      }
      this.addOptions.data.cr_i_HertzId = this.carCompaniesID;
      this.initData(1)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(num);
      },
      //修改取消
      cancel(){
        this.initData(1);
        this.addDialog = false;
        this.updateDialog = false;
      },
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page?page:1,//分页号
          "rows": "10",//单页显示数据量
          "cr_i_Id": "",//优惠政策编号
          "cr_i_HertzId": this.carCompaniesID,//租车公司编号
          "cr_i_Name": "",//优惠政策名称
        };
        this.isLoading= true;
        this.$store.dispatch('initCarPreferentialPolicies', options)
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
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.cr_i_BeginDate = this.dateArr[0];
        this.addOptions.data.cr_i_EndDate = this.dateArr[1];
        this.$store.dispatch('AddCarPreferentialPolicies',this.addOptions)
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
      //修改
      Update(obj){
        this.updateOptions = obj;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_i_Id": this.updateOptions.cr_i_Id,//优惠政策编号
            "cr_i_HertzId": this.updateOptions.cr_i_HertzId,//租车公司编号
            "cr_i_Name": this.updateOptions.cr_i_Name,//优惠政策名称
            "cr_i_BeginDate": this.dateArr[0],//开始日期
            "cr_i_EndDate": this.dateArr[1],//结束日期
            "cr_i_MinDays": this.updateOptions.cr_i_MinDays,//最低租车天数
            "cr_i_UseCount": this.updateOptions.cr_i_UseCount,//每客使用次数
            "cr_i_Introduce": this.updateOptions.cr_i_Introduce,//介绍
            "cr_i_FavorablePrice": this.updateOptions.cr_i_FavorablePrice,//优惠价格
          }
        };
        this.$store.dispatch('UpdateCarPreferentialPolicies',updateOptions)
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
            this.initData(1)
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
            "cr_i_Id": id//优惠政策编号
          }
        };
        this.$store.dispatch('DeleteCarPreferentialPolicies',deleteOptions)
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
          this.initData(1)
        });
      },
    },
  }
</script>
<style scoped>

</style>
