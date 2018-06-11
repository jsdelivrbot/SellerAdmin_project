<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">租车公司汽车管理</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="carCompanyCarList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="cr_cc_Id"
        label="公司汽车编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_crs_StoreName"
        label="门店名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_crc_CarName"
        label="汽车名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cc_Color"
        label="汽车颜色"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_cc_NumberPlates"
        label="车牌号"
        align="center"
      >
      </el-table-column>

      <el-table-column
        label="使用状态"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.cr_cc_UseStatus | getCarUseStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.cr_cc_Id)">删除
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

    <!--添加公司汽车-->
    <el-dialog title="添加公司汽车" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="门店:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.cr_crs_StoreId" placeholder="请选择门店">
            <el-option
              v-for="item in carCompanyCarStoreList"
              :key="item.cr_crs_Id"
              :label="item.cr_crs_Name"
              :value="item.cr_crs_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="汽车名称:" :label-width="formLabelWidth">-->
          <!--<el-autocomplete-->
            <!--v-model="carName"-->
            <!--:fetch-suggestions="querySearchAsync"-->
            <!--placeholder="请选择汽车名称"-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
        <!--</el-form-item>-->
        <el-form-item label="车牌号:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cc_NumberPlates"></el-input>
        </el-form-item>
        <el-form-item label="车身颜色:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cc_Color"></el-input>
        </el-form-item>
        <el-form-item label="使用状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="addOptions.data.cr_cc_UseStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改公司汽车-->
    <el-dialog title="修改公司汽车" :visible.sync="updateDialog">
      <el-form :model="updateOptions">
        <el-form-item label="门店:" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.cr_crs_StoreId" placeholder="请选择门店">
            <el-option
              v-for="item in carCompanyCarStoreList"
              :key="item.cr_crs_Id"
              :label="item.cr_crs_Name"
              :value="item.cr_crs_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="汽车名称:" :label-width="formLabelWidth">-->
          <!--<el-autocomplete-->
            <!--v-model="carName"-->
            <!--:fetch-suggestions="querySearchAsync"-->
            <!--placeholder="请选择汽车名称"-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
        <!--</el-form-item>-->
        <el-form-item label="车牌号:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cc_NumberPlates"></el-input>
        </el-form-item>
        <el-form-item label="车身颜色:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cc_Color"></el-input>
        </el-form-item>
        <el-form-item label="使用状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="updateOptions.cr_cc_UseStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1">
          </el-switch>
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
        carName:'',
        addDialog:false,
        updateDialog:false,
        isLoading:false,
        total:0,
        productID:'',
        carID:'',
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_cc_ProductId": "",//汽车产品编号
            "cr_crc_CarId": "",//汽车编号
            "cr_crs_StoreId": "",//所在门店 ID
            "cr_cc_NumberPlates": "",//车牌号
            "cr_cc_Color": "",//车身颜色
            "cr_cc_UseStatus": "0",//使用状态
          }
        },
        updateOptions:{}
      }
    },
    computed: mapGetters([
      'carCompanyCarList',
      'carCompanyCarStoreList'
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
      this.productID = this.$route.params.id;
      this.carID = this.$route.params.carID;
      this.initCarStore().then(()=>{
        this.initData(1)
      },err=>{
        this.$notify({
          message: err,
          type: 'error'
        });
      })
      this.initData(1)
    },
    methods: {
      //初始化门店
      initCarStore(){
        return new Promise((relove,reject)=>{
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "操作员编码",
            "operateUserName": "操作员名称",
            "pcName": "",
            "page": '',//分页号
            "rows": "",//单页显示数据量
            "cr_crs_Id": "",//门店编号
            "cr_crs_Name": '',//门店名称
            "cr_crs_HertzId":  this.carCompaniesID,//租车公司编号
            "cr_crs_Address": "",//详细地址
            "cr_crs_CityLandmarkId": "",//所在地标ID
            "cr_crs_CityId": "",//所在城市ID
            "cr_crs_Lng": "",//经度
            "cr_crs_Lat": "",//纬度
            "cr_crs_WorkTime": "",//营业时间
            "cr_crs_Telephone": "",//电话
          };
          return this.$store.dispatch('initCarCompanyCarStore', options)
        })
      },
      //修改取消
      cancel(){
        this.initData(1);
        this.addDialog = false;
        this.updateDialog = false;
      },
      //选中汽车
      handleSelect(obj){
        this.addOptions.data.cr_crc_CarId = obj.id;
        this.updateOptions.cr_crc_CarId = obj.id
      },
      //分页
      handleCurrentChange(num){
        this.initData(num);
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
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page?page:1,//分页号
          "rows": "5",//单页显示数据量
          "cr_cc_Id": "",//公司汽车编号
          "cr_cc_ProductId": this.productID,//汽车产品编号
          "cr_crc_CarId": "",//汽车编号
          "cr_crs_StoreId": "",//所在门店 ID
          "cr_cc_NumberPlates": "",//车牌号
          "cr_cc_Color": "",//车身颜色
          "cr_cc_UseStatus": "",//使用状态
        };
        this.isLoading= true;
        this.$store.dispatch('initCarCompanyCar', options)
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
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.cr_cc_ProductId = this.productID;
        this.addOptions.data.cr_crc_CarId = this.carID
        this.$store.dispatch('AddCarCompanyCar',this.addOptions)
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
        obj.cr_cc_UseStatus = obj.cr_cc_UseStatus+'';
        this.updateOptions = obj;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit(){
        delete this.updateOptions.cr_crc_CarName
        delete this.updateOptions.cr_crs_StoreName
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateOptions
        };
        this.$store.dispatch('UpdateCarCompanyCar',updateOptions)
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
            "cr_cc_Id": id//公司汽车编号
          }
        };
        this.$store.dispatch('DeleteCarCompanyCar',deleteOptions)
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
