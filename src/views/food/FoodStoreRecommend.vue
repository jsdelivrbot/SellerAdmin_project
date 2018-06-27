<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面推荐菜</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="storeId" placeholder="请选择店面" @change="changeProduct" size="small">
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
        :data="foodStoreRecommendList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="fd_sf_ProductName"
          label="店面名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_Name"
          label="菜名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_Price"
          label="价格(元)"
          align="center">
        </el-table-column>
        <el-table-column
          label="推荐菜图片"
          align="center">
          <template slot-scope="scope">
            <img v-lazy="scope.row.fd_gi_GoodImage?scope.row.fd_gi_GoodImage:''" width="128" height="80"
                 @click="displayBigPicture(scope.row.fd_gi_GoodImage)">
          </template>
        </el-table-column>
        <el-table-column
          prop="fd_if_Describe"
          label="描述"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.fd_if_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--展示大图-->
      <el-dialog
        title="显示大图"
        :visible.sync="bigPictureDialog"
        width="50%">
        <img v-lazy="imgUrl" width="100%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="bigPictureDialog = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--分页-->
      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="10"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--添加-->
      <el-dialog title="添加店面推荐菜" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="storeId" placeholder="请选择店面" @change="changeProduct">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sfp_Name"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜品名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_if_ProductID" placeholder="请选择菜品">
              <el-option
                v-for="item in foodStoreProductList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐菜描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_if_Describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
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
      'foodStoreRecommendList',
      'foodStoreProductList'
    ]),
    data() {
      return {
        isLoading:false,
        storeId: '',
        total: 0,
        formLabelWidth: '120px',
        addDialog: false,
        updateDialog: false,
        addOptions: {
          "fd_if_ProductID": "",//店面产品编码
          "fd_if_Describe":""//描述
        },
        updateObj: {},
        imgUrl: '',
        bigPictureDialog: false,
      }
    },
    methods: {
      //选择店面产品
      changeProduct(id){
        this.initStoreProdictData(id)
      },
      //初始化店面产品数据
      initStoreProdictData(id) {
        if (!id) {
          this.$notify({
            message: '请选择店面！',
            type: 'error'
          })
          return;
        }
        let selectStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sfp_ID": "",//店面产品编码
          "fd_sfp_StoreFrontID": id,//店面编号
          "fd_sfp_Name": "",//名称
          "priceFrom": "",//价格
          "priceTo": "",//备注
          "page": 1,
          "rows": "10000",
        };
        this.$store.dispatch('initFoodStoreProduct', selectStoreFrontProductInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //      分页
      handleCurrentChange(num) {
        this.initData(this.storeId, num);
      },
      //初始化数据
      initData(id, num) {
        if (!id) {
          this.$notify({
            message: '请选择店面！',
            type: 'error'
          })
          return
        }
        let selectIntroduceFoodInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_if_ID": "",//推荐菜编号
          "fd_sf_ID": id,//店面编号
          "priceFrom": "",//价格大于
          "priceTo":"",
          "page": "1",
          "rows":"10",
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreRecommend', selectIntroduceFoodInfo)
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
      displayBigPicture(urlData) {
        this.$store.commit('setTranstionFalse');
        this.bigPictureDialog = true;
        this.imgUrl = urlData;
      },
      //添加
      add() {
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        let insertIntroduceFoodInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreRecommend', insertIntroduceFoodInfo)
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
      //删除
      Delete(id) {
        let deleteIntroduceFoodInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_if_ID": id ? id : '',//推荐菜编号
          }
        };
        this.$store.dispatch('deleteFoodStoreRecommend',deleteIntroduceFoodInfo)
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
    },
  }
</script>
<style scoped>
</style>
