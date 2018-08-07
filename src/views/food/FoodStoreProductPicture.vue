<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面菜肴图片</h1>
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
            <el-select v-model="productId" placeholder="请选择菜肴名称" size="small">
              <el-option
                v-for="item in foodStoreProductList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>

            <el-button type="primary" @click="add" v-show="!foodStoreProductPictureList.length" size="small">添加
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="foodStoreProductPictureList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="fd_sfp_Name"
          label="菜肴名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="菜肴图片"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.fd_gi_GoodImage" width="128" height="80"
                 @click="displayBigPicture(scope.row.fd_gi_GoodImage)">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.fd_gi_ID)">删除
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
      <!--添加-->
      <el-dialog title="添加店面菜肴图片" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <el-form-item label="选择店面:" :label-width="formLabelWidth">
            <el-select v-model="storeId" placeholder="请选择产品" @change="changeProduct">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面产品:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_gi_GoodID" placeholder="请选择产品">
              <el-option
                v-for="item in foodStoreProductList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品图片:" :label-width="formLabelWidth">

            <Upload @getData="getData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in ImageURL"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <em>
                  <el-radio v-model="radioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURL.length"
                >
              </p>
            </div>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改店面菜肴图片" :visible.sync="updateDialog" :close-on-click-modal="false">
        <el-form :model="updateObj">
          <el-form-item label="店面产品:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_gi_GoodID" placeholder="请选择房间">
              <el-option
                v-for="item in foodStoreProductList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品图片:" :label-width="formLabelWidth">
            <Upload @getData="getUpdateData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in ImageURL1"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
                <em>
                  <el-radio v-model="updateRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURL1.length"
                >
              </p>
            </div>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

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
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'
  export default {
    name: '',
    components: {
      Upload
    },
    computed: mapGetters([
      'foodStoreInformtionList',
      'foodStoreProductList',
      'foodStoreProductPictureList'
    ]),
    data() {
      return {
        isLoading: false,
        storeId: '',
        productId: '',
        formLabelWidth: '120px',
        imageObj: {accept: 'image/*'},
        addOptions: {
          "fd_gi_GoodID": "",//店面产品编码
          "fd_gi_GoodImage": "",//店面产品图片
        },
        addDialog: false,
        updateObj: {},
        updateDialog: false,
        bigPictureDialog: false,
        imgUrl: '',
        ImageURL:[],
        ImageURL1:[],
        radioIndex: 0,
        updateRadioIndex: 0,
        isNewUploaNode: true,
        userInfo: {},
        total: 0
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if (!this.foodStoreInformtionList.length) {
        this.initFoodStoreInformtion();
      }
      this.initData()
    },
    methods: {
      //图片上传
      getData(data) {
        if (!this.radioIndex) {
          this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      //修改图片
      getUpdateData(data) {
        if (!this.updateRadioIndex) {
          this.ImageURL1.push(data.data);
        } else {
          this.ImageURL1.splice(this.updateRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },
      //删除修改对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        console.log(1)
        this.isNewUploaNode = false
        this.ImageURL1 = this.ImageURL1.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },


      //分页
      handleCurrentChange(num) {
        this.initData(this.storeId, num)
      },
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

      //选择菜肴
      changeProduct(id) {
        this.initProductData(id);
      },
      //初始化数据
      initProductData(id) {
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
        };
        this.$store.dispatch('initFoodStoreProduct', selectStoreFrontProductInfo)
          .then(() => {
          }, err => {
            $notify({
              message: err,
              type: 'error'
            })
          })
      },
      //初始化数据
      initData(id) {

        let selectGoodImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": "1",
          "rows": "5",
          agentID: this.userInfo.sm_ui_ID,
          "fd_gi_ID": "",//商品图片编码
          "fd_gi_GoodID": id ? id : '',//店面产品编码
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreProductPicture', selectGoodImageInfo)
          .then((total) => {
            this.total = total;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //查询
      search() {
        this.initData(this.productId);
      },
      //显示大图
      displayBigPicture(urlData) {
        this.$store.commit('setTranstionFalse');
        this.bigPictureDialog = true;
        this.imgUrl = urlData;
      },
      //添加
      add() {
        let uploader = document.querySelector('.uploader-list')
        if(uploader){
          uploader.querySelector('ul').innerHTML = ''
        }
        for(let attr in this.addOptions){
          this.addOptions[attr] = ''
        }
        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {

        this.addOptions.fd_gi_GoodImage = this.ImageURL.join(',')
        let insertGoodImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };

        this.$store.dispatch('addFoodStoreProductPicture', insertGoodImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.productId);
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
        this.updateDialog = true;
        this.updateObj = rowData;
        this.ImageURL1 = rowData.fd_gi_GoodImage.split(",");
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        this.updateObj.fd_gi_GoodImage = this.ImageURL1.join(',');
        let updateGoodImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodStoreProductPicture', updateGoodImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.productId);
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
        let deleteGoodImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_gi_ID": id ? id : '',//商品图片编码
          }
        }
        this.$store.dispatch('deleteFoodStoreProductPicture', deleteGoodImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.productId);
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
  .imgWap span {
    position: absolute;
    right: -15px;
    top: -6px;
  }
  .imgWap em {
    position: absolute;
    right: -55px;
    top: 30px;
    font-style: normal;
    color: #42b983;
  }
</style>
