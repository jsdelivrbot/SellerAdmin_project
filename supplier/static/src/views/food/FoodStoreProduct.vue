<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面菜肴</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="storeId" placeholder="请选择店面" size="small">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="add" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="foodStoreProductList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="fd_sf_ProductName"
          label="店面名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_ID"
          label="菜肴编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_Name"
          label="菜肴名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_Price"
          label="价格(元)"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_Remark"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.fd_sfp_ID)">删除
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="Apply(scope.row.fd_sfp_ID)">申请首页推荐美食
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="5"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--添加-->
      <el-dialog title="添加店面菜肴" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sfp_StoreFrontID" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜名:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sfp_Name"></el-input>
          </el-form-item>
          <el-form-item label="价格:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sfp_Price"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sfp_Remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改店面菜肴" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sfp_StoreFrontID" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜名:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sfp_Name"></el-input>
          </el-form-item>
          <el-form-item label="价格:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sfp_Price"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sfp_Remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'foodStoreInformtionList',
      'foodStoreProductList'
    ]),
    data() {
      return {
        storeId: '',
        isLoading: false,
        addDialog: false,
        addOptions: {
          "fd_sfp_StoreFrontID": "",//店面编号
          "fd_sfp_Name": "",//名称
          "fd_sfp_Price": "",//价格
          "fd_sfp_Remark": "",//备注
        },
        formLabelWidth: '120px',
        total: 0,
        updateObj: {},
        updateDialog: false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if (!this.foodStoreInformtionList.length) {
        this.initFoodStoreInformtion();
      }
      this.initData();
    },
    methods: {
      //店面列表
      initFoodStoreInformtion() {
        let selectStoreFrontpInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sf_TradeID": this.userInfo.sm_ui_ID,//供应商编码
        };
        this.$store.dispatch('initFoodStoreInformtion', selectStoreFrontpInfo)
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.storeId, num)
      },
      //初始化数据
      initData(id, num) {
//        if (!id) {
//          this.$notify({
//            message: '请选择店面！',
//            type: 'error'
//          })
//          return;
//        }
        let selectStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sfp_ID": "",//店面产品编码
          "fd_sfp_StoreFrontID": id ? id : '',//店面编号
          "fd_sfp_Name": "",//名称
          "priceFrom": "",//价格
          "priceTo": "",//备注
          agentID: this.userInfo.sm_ui_ID,
          "page": num ? num : 1,
          "rows": "5",
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreProduct', selectStoreFrontProductInfo)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //查询
      search() {
        this.initData(this.storeId)
      },
      //添加
      add() {
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        let insertStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreProduct', insertStoreFrontProductInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.storeId)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.addDialog = false;
      },
      //修改
      update(rowData) {
        this.updateObj = rowData;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        let updateStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodStoreProduct', updateStoreFrontProductInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.storeId)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.updateDialog = false;
      },
      //删除
      Delete(id) {
        let deleteStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_sfp_ID": id ? id : '',//店面产品编码
          }
        };
        this.$store.dispatch('deleteFoodStoreProduct', deleteStoreFrontProductInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.storeId)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //申请首页推荐美食
      Apply(id) {
        let insertPageIntroduceInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_pi_StoreID": id ? id : '',//店面产品编码
          }
        };
        this.$store.dispatch('applyRecommendFood', insertPageIntroduceInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.storeId);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      }
    },
  }
</script>
<style scoped>
</style>
