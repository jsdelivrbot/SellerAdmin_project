<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">线路费用说明</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>线路费用说明筛选:</span>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-autocomplete-->
              <!--style="width: 150px"-->
              <!--v-model="userName"-->
              <!--:fetch-suggestions="querySearchAsync"-->
              <!--placeholder="请输入商家"-->
              <!--@select="handleSelect"-->
            <!--&gt;</el-autocomplete>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择产品"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="userSearchID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdminCostsOf">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminCostsOfList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="主键编号"
          prop="ts_fi_Code">
        </el-table-column>

        <el-table-column
          align="center"
          label="产品线路编码"
          prop="ts_fi_Product_LineID">
        </el-table-column>
        <el-table-column
          align="center"
          label="费用内容">
          <template slot-scope="scope">
            <el-popover
              ref="popover1"
              placement="top-start"
              width="200"
              trigger="hover"
              :content="scope.row.ts_fi_Content">
            </el-popover>
            <el-button v-popover:popover1>移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="栏目"
          prop="ts_fi_Item">
        </el-table-column>
        <el-table-column
          label="分类"
          align="center"
          prop="ts_fi_Include"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminCostsOf(scope.row.ts_fi_Code)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminCostsOf(scope.row.ts_fi_Code)">删除
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

      <!--添加线路费用说明-->
      <el-dialog title="添加线路费用说明" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.ts_fi_Product_LineID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费用内容:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ts_fi_Content"></el-input>
          </el-form-item>
          <el-form-item label="栏目:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ts_fi_Item"></el-input><span style="color: #f60">（费用说明、预定须知...）</span>
          </el-form-item>
          <el-form-item label="分类:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ts_fi_Include"></el-input><span style="color: #f60">(费用包含,费用不包含、出行须知、等等）</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminCostsOfSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改线路费用说明-->
      <el-dialog title="修改线路费用说明" :visible.sync="updateDialog">
        <el-form :model="updateAdminCostsOfObj">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminCostsOfObj.ts_fi_Product_LineID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费用内容:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminCostsOfObj.ts_fi_Content"></el-input>
          </el-form-item>
          <el-form-item label="栏目:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminCostsOfObj.ts_fi_Item"></el-input><span style="color: #f60">（费用说明、预定须知...）</span>
          </el-form-item>
          <el-form-item label="分类:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminCostsOfObj.ts_fi_Include"></el-input><span style="color: #f60">(费用包含,费用不包含、出行须知、等等）</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminCostsOfSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        GoodId: '',
        LineID: '',
        userName: '',
        userSearchID:'',
        formLabelWidth: '120px',
        addDialog:false,
        updateDialog:false,
        isLoading:false,
        total:0,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_fi_Product_LineID": "",
            "ts_fi_Content": "",
            "ts_fi_Item": "",
            "ts_fi_Include": ""
          }
        }
      }
    },
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminLineScheduleManagementId',
      'adminCostsOfList',
      'updateAdminCostsOfObj'
    ]),
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.adminLineScheduleManagementId,num)
      },
      //选中产品
      handleSelect(item) {
        this.addOptions.ts_fi_Product_LineID = item.id;
        this.updateAdminCostsOfObj.ts_fi_Product_LineID = item.id;
        this.userName = item.value;
        let options = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          goodID: item.id ? item.id : ''
        };
        this.$store.dispatch('initAdminProductLine', options)
      },
      loadAll(num, name) {
        return new Promise((relove, reject) => {
          var _this = this;
          let obj = JSON.parse(sessionStorage.getItem('admin'))
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "tradeID": obj.sm_ui_ID ? obj.sm_ui_ID : '',
            goodTitle:name?name:'',
            "userID": "",
            "pcName": "",
            "ID": '',
            'isDelete': 0,
            "page": 1,
            "rows": 100
          };
          this.$store.dispatch('initAdminTradeGoodList', options)
          .then((data) => {
            relove(data)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        })
      },
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          var  data = data.data
          data = data.map(item => {
            return {
              id: item.ta_tg_ID,
              value: item.ta_tg_Title
            }
          })
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
      },
      initData(id,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fiProductLineID": id,
          "isDelete": 0,
          "page":page?page:1,
          "rows": 10
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminCostsOf',options)
          .then(totalrows=>{
            this.total = totalrows;
            this.isLoading = false;
          }, err => {
            this.isLoading = false;
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        if(!this.userSearchID){
          this.$notify({
            message: '请选择筛选条件',
            type: 'error'
          });
          return;
        }
        this.initData(this.userSearchID);
      },
      //添加
      addAdminCostsOf(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addAdminCostsOfSubmit(){
        this.$store.dispatch('AddAdminCostsOf',this.addOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData(this.addOptions.data.ts_fi_Product_LineID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addDialog = false
      },
      //修改
      updateAdminCostsOf(id){
        this.$store.commit('initUpdateAdminCostsOfObj',id)
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateAdminCostsOfSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminCostsOfObj
        };
        this.$store.dispatch('UpdateAdminCostsOf',updateOptions)
          .then((succ)=>{
            this.$notify({
              message: succ,
              type: 'success'
            });
            this.initData(this.updateAdminCostsOfObj.ts_fi_Product_LineID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      deleteAdminCostsOf(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fiCode": id
        };
        this.$store.dispatch('DeleteAdminCostsOf',deleteOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            if(this.userSearchID){
              this.initData(this.userSearchID);
            }else{
              this.initData(this.adminLineScheduleManagementId);
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      }
    },
    mounted(){
      if(this.adminLineScheduleManagementId){
        this.initData(this.adminLineScheduleManagementId);
      }
    }
  }
</script>
<style scoped>

</style>
