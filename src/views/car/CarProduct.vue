<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">租车汽车产品管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <!--<span>汽车产品名称筛选:</span>-->
        </el-form-item>
        <el-form-item>
          <!--<el-input type="text" v-model="storeName" auto-complete="off" placeholder="汽车产品名称" size="small"></el-input>-->
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="carProductList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="cr_cp_ID"
        label="汽车产品编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_CarName"
        label="汽车名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_HertzName"
        label="租车公司名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_Price"
        label="价格(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_Insurance"
        label="保险费(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_ServiceCharge"
        label="手续费(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_DeductibleInsurance"
        label="不计免赔险(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cp_ThirdPartyInsurance"
        label="第三责任险(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row)"
            style="margin-bottom: 5px"
          >修改
          </el-button>
          <br>
          <el-button
            size="mini"
            type="danger"
            style="margin-bottom: 5px"
            @click="Delete(scope.row.cr_cp_ID)">删除
          </el-button>
          <br>
          <el-button
            size="mini"
            type="primary"
            @click="toCompanyCar(scope.row)">前往公司汽车
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

    <!--添加汽车产品-->
    <el-dialog title="添加汽车产品" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="汽车名称:" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="carName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择汽车名称"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="价格:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cp_Price"></el-input>
        </el-form-item>
        <el-form-item label="保险费:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cp_Insurance"></el-input>
        </el-form-item>
        <el-form-item label="手续费:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cp_ServiceCharge"></el-input>
        </el-form-item>
        <el-form-item label="不计免赔险:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cp_DeductibleInsurance"></el-input>
        </el-form-item>
        <el-form-item label="第三责任险:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cp_ThirdPartyInsurance"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改汽车产品-->
    <el-dialog title="修改汽车产品" :visible.sync="updateDialog">
      <el-form :model="updateOptions">
        <el-form-item label="汽车名称:" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="carName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择汽车名称"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="价格:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cp_Price"></el-input>
        </el-form-item>
        <el-form-item label="保险费:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cp_Insurance"></el-input>
        </el-form-item>
        <el-form-item label="手续费:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cp_ServiceCharge"></el-input>
        </el-form-item>
        <el-form-item label="不计免赔险:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cp_DeductibleInsurance"></el-input>
        </el-form-item>
        <el-form-item label="第三责任险:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cp_ThirdPartyInsurance"></el-input>
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
  import {isNumber} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {
        addDialog:false,
        updateDialog:false,
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        storeName:'',
        carCompaniesID:'',
        restaurants:[],
        carName:'',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_cp_CarId": "",//汽车编号
            "cr_h_HertzId": "",//租车公司编号
            "cr_cp_Price": "",//价格
            "cr_cp_Insurance": "",//保险费
            "cr_cp_ServiceCharge": "",//手续费
            "cr_cp_DeductibleInsurance": "",//不计免赔险
            "cr_cp_ThirdPartyInsurance": "",//第三责任险
          }
        },
        updateOptions:{}
      }
    },
    computed: mapGetters([
      'carProductList'
    ]),
    created(){
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
      this.initData(1)
    },
    methods: {
      //选中汽车
      handleSelect(obj){
        this.addOptions.data.cr_cp_CarId = obj.id;
        this.updateOptions.cr_cp_CarId = obj.id;
      },
      loadAll(num, name) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "操作员编码",
            "operateUserName": "操作员名称",
            "pcName": "",
            "page": num?num:1,//分页号
            "rows": "10",//单页显示数据量
            "cr_crc_Id": "",//汽车编号
            "cr_crc_Name": name?name:'',//汽车名称
            "cr_crc_VariableSpeed": "",//1自动挡  2手动挡
            "cr_crc_Displacement": "",//排量
            "cr_crc_SeatNumber": "",//座位数
            "cr_crc_ImagePath": "",//图片
            "cr_crc_BrandId": "",//品牌
            "cr_crc_Structure": "",//车身结构
            "cr_crc_CreateTime": "",//入库时间
          };
          return this.$store.dispatch('initCarList', options)
      },
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          data = data.map(item => {
            return {
              id: item.cr_crc_Id,
              value: item.cr_crc_Name
            }
          })
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
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
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page?page:1,//分页号
          "rows": "5",//单页显示数据量
          "cr_cp_ID": "",//汽车产品编号
          "cr_cp_CarId": "",//汽车编号
          "cr_h_HertzId": this.carCompaniesID,//租车公司编号
        };
        this.isLoading = true;
        this.$store.dispatch('initCarProduct', options)
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
        this.addOptions.data.cr_h_HertzId = this.carCompaniesID;
        this.$store.dispatch('AddCarProduct',this.addOptions)
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
      //修改取消
      cancel(){
        this.initData(1);
        this.addDialog = false;
        this.updateDialog = false;
      },
      //修改提交
      updateSubmit(){
        delete this.updateOptions.cr_cp_CarName
        delete this.updateOptions.cr_cp_HertzName
        for(let attr in this.updateOptions){
          if(!isNumber(this.updateOptions[attr]+'')){
            this.$notify({
              message: '请输入数字!',
              type: 'error'
            });
            this.initData(1);
            return
          }
        }
        let updateOptions ={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_cp_ID": this.updateOptions.cr_cp_ID,//汽车产品编号
            "cr_cp_CarId": this.updateOptions.cr_cp_CarId,//汽车编号
            "cr_h_HertzId": this.updateOptions.cr_h_HertzId,//租车公司编号
            "cr_cp_Price": this.updateOptions.cr_cp_Price,//价格
            "cr_cp_Insurance": this.updateOptions.cr_cp_Insurance,//保险费
            "cr_cp_ServiceCharge": this.updateOptions.cr_cp_ServiceCharge,//手续费
            "cr_cp_DeductibleInsurance": this.updateOptions.cr_cp_DeductibleInsurance,//不计免赔险
            "cr_cp_ThirdPartyInsurance": this.updateOptions.cr_cp_ThirdPartyInsurance,//第三责任险
          }
        };
        this.$store.dispatch('UpdateCarProduct',updateOptions)
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
            "cr_cp_ID":id//汽车产品编号
          }
        }
        this.$store.dispatch('DeleteCarProduct',deleteOptions)
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
      //前往公司汽车
      toCompanyCar(obj){
        this.$router.push({name:'CarCompanyCar',params:{id:obj.cr_cp_ID,carID:obj.cr_cp_CarId}})
      }
    },
  }
</script>
<style scoped>

</style>
