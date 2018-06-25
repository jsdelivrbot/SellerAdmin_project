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
            <el-select v-model="storeId" placeholder="请选择店面" @change="changeProduct">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="productId" placeholder="请选择菜肴名称">
              <el-option
                v-for="item in foodStoreProductList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="add" v-show="!foodStoreProductPictureList.length">添加</el-button>
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
            <img v-lazy="scope.row.fd_gi_GoodImage" width="128" height="80"
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
      <el-dialog title="添加店面菜肴图片" :visible.sync="addDialog">
        <el-form :model="addOptions">
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
            <a href="javascript:;" class="file">上传图片
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.fd_gi_GoodImage" v-show="addOptions.fd_gi_GoodImage" width="128" height="80">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改店面菜肴图片" :visible.sync="updateDialog">
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
            <a href="javascript:;" class="file">上传图片
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.fd_gi_GoodImage" v-show="addOptions.fd_gi_GoodImage" width="128" height="80">
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
  import {getNewStr} from '@/assets/js/public'
  export default {
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
        addOptions: {
          "fd_gi_GoodID": "",//店面产品编码
          "fd_gi_GoodImage": "",//店面产品图片
        },
        addDialog: false,
        updateObj: {},
        updateDialog: false,
        bigPictureDialog: false,
        imgUrl: '',
      }
    },
    methods: {
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
          .then(data => {
            relove(data.base64.split(',')[1])
          })
        })
      },
      uploadToOSS(file) {
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr + "/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            }else{
              console.log(xhr.responseText)
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      uploaNode() {
        this.addOptions.fd_gi_GoodImage = '';
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('foodUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.addOptions.fd_gi_GoodImage = data.data;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
               // })
              }
            })
          }
        }, 30)
      },
      //选择菜肴
      changeProduct(id) {
        this.initProductData(id);
      },
      //初始化数据
      initProductData(id) {
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
          $notify({
            message: err,
            type: 'error'
          })
        })
      },
      //初始化数据
      initData(id) {
        if (!id) {
          this.$notify({
            message: '请选择菜肴！',
            type: 'error'
          })
          return;
        }
        let selectGoodImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          //"page": "1",
          //"rows": "10",
          "fd_gi_ID": "",//商品图片编码
          "fd_gi_GoodID": id,//店面产品编码
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreProductPicture', selectGoodImageInfo)
        .then(() => {
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
        this.uploaNode();
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
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
        this.updateObj = rowData;
        this.uploaNode();
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        if (this.addOptions.fd_gi_GoodImage) {
          this.updateObj.fd_gi_GoodImage = this.addOptions.fd_gi_GoodImage;
        }
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
</style>
