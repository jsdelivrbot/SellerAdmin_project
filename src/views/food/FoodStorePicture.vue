<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面图片</h1>

      <!--查询-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="storeId" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="foodProductPictureList"
        v-loading="isLoading"
        style="width: 100%">

        <el-table-column
          prop="fd_pi_ID"
          label="图片编号"
          align="center">
        </el-table-column>

        <el-table-column
          prop="fd_sf_ProductName"
          label="店面名称"
          align="center">
        </el-table-column>

        <el-table-column
          label="店面图片"
          align="center">
          <template slot-scope="scope">
            <img v-lazy="scope.row.fd_pi_ImageUrl" width="128" height="80"
                 @click="displayBigPicture(scope.row.fd_pi_ImageUrl)">
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
              @click="Delete(scope.row.fd_pi_ID)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>


      <!--显示大图-->

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

      <el-dialog title="添加店面图片" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_pi_StoreFront" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜肴图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">上传图片
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.fd_pi_ImageUrl" v-show="addOptions.fd_pi_ImageUrl" width="128" height="80">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->

      <el-dialog title="修改店面图片" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_pi_StoreFront" placeholder="请选择店面">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜肴图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">上传图片
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.fd_pi_ImageUrl" v-show="addOptions.fd_pi_ImageUrl" width="128" height="80">
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
      'foodProductPictureList'
    ]),
    data() {
      return {
        isLoading:false,
        storeId: '',
        addDialog: false,
        formLabelWidth: '120px',
        addOptions: {
          "fd_pi_StoreFront": "",//店面编号
          "fd_pi_ImageUrl": "",//图片地址
        },
        imgUrl: '',
        bigPictureDialog: false,
        updateDialog: false,
        updateObj: {},
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

      uploaNode() {
        this.addOptions.fd_pi_ImageUrl = '';
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i]).then(data => {
                  this.$store.dispatch('foodUploadAdminImgs', {
                    imageData: data
                  })
                    .then(data => {
                      if (data) {
                        this.addOptions.fd_pi_ImageUrl = data.data;
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
              }
            })
          }
        }, 30)
      },

      //初始化数据
      initData(id) {
        if (!id) {
          this.$notify({
            message: '请先选择店面！',
            type: 'error'
          })
          return
        }
        this.isLoading = true;
        let selectProductImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_pi_ID": "",//图片编号
          "fd_pi_StoreFront": id,//店面编号
        };
        this.$store.dispatch('initFoodProductPicture', selectProductImageInfo)
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
        this.initData(this.storeId);
      },
      //显示大图
      displayBigPicture(urlData) {
        this.$store.commit('setTranstionFalse');
        this.bigPictureDialog = true;
        this.imgUrl = urlData;
      },
      //添加
      add() {
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode();
      },
      //添加提交
      addSubmit() {
        let insertProductImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodProductPicture', insertProductImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.storeId);
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
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.updateObj = rowData;
        this.uploaNode();
      },
      //修改提交
      updateSubmit() {
        if (this.addOptions.fd_pi_ImageUrl) {
          this.updateObj.fd_pi_ImageUrl = this.addOptions.fd_pi_ImageUrl
        }
        let updateProductImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodProductPicture', updateProductImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.storeId);
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
        let deleteProductImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_pi_ID": id ? id : '',//图片编号
          }
        };
        this.$store.dispatch('deleteFoodProductPicture',deleteProductImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.storeId);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      }
    },
  }
</script>
<style scoped>
</style>
