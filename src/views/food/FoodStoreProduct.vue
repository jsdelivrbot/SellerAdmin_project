<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面美食</h1>
      <div class="btnBox">
        <el-button size="small" type="primary" @click="add">添加店面美食</el-button>
      </div>
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
        <!--<el-table-column-->
        <!--prop="fd_sfp_ID"-->
        <!--label="美食编号"-->
        <!--align="center">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="fd_sfp_Name"
          label="美食名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_sfp_Price"
          label="价格(元)"
          align="center">
        </el-table-column>

        <el-table-column
          label="美食图片"
          align="center">
          <template slot-scope="scope">
            <img
              :src="item" alt=""
              v-for="item,index in scope.row.imgData"
              width="100%"
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="fd_sfp_Remark"
          label="美食介绍"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
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
            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
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
      <el-dialog title="添加店面菜肴" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <el-form-item label="菜名:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sfp_Name"></el-input>
          </el-form-item>
          <el-form-item label="荤素类型:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sfp_MeatVeg" placeholder="请选择">
              <el-option
                v-for="item in meatType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sfp_Price"></el-input>
          </el-form-item>
          <el-form-item label="美食图片:" :label-width="formLabelWidth" required>
            <Upload @getData="getData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in addImage"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <em>
                  <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="addImage.length"
                >
              </p>
            </div>
          </el-form-item>
          <el-form-item label="美食介绍:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sfp_Remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改店面菜肴" :visible.sync="updateDialog" :close-on-click-modal="false">
        <el-form :model="updateObj">
          <el-form-item label="菜名:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sfp_Name"></el-input>
          </el-form-item>
          <el-form-item label="美食图片:" :label-width="formLabelWidth" required>
            <Upload @getData="updateData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in updateObj.imgData"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
                <em>
                  <el-radio v-model="updateRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="updateObj.imgData.length"
                >
              </p>
            </div>
          </el-form-item>
          <el-form-item label="荤素类型:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sfp_MeatVeg" placeholder="请选择">
              <el-option
                v-for="item in meatType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
  import Upload from '@/components/Upload'

  export default {
    components: {
      Upload
    },
    computed: mapGetters([
      'foodStoreProductList'
    ]),
    data() {
      return {
        isLoading: false,
        addDialog: false,
        addOptions: {
          "fd_sfp_StoreFrontID": "",//店面编号
          "fd_sfp_Name": "",//名称
          "fd_sfp_Price": "",//价格
          "fd_sfp_MeatVeg": "",//0素菜 1荤菜
          "fd_sfp_Remark": "",//备注
        },
        formLabelWidth: '120px',
        total: 0,
        updateObj: {},
        updateDialog: false,
        productId: 0,
        meatType: [
          {
            label: '素菜',
            value: 0,
          },
          {
            label: '荤菜',
            value: 1,
          },
        ],
        imageObj: {accept: 'image/*'},
        addImage: [],
        isNewUploaNode: true,
        addRadioIndex: 0,
        updateRadioIndex: 0,

      }
    },
    created() {
      this.productId = this.$route.params.id;
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      this.initData();
    },
    methods: {
      jump(obj) {
        let status = sessionStorage.getItem('status')
        if (status == '审核中') {
          this.$notify({
            title: '警告',
            message: '审核中！请稍等。。。',
            type: 'warning'
          });
        } else {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/foodDetail/' + obj.fd_sfp_StoreFrontID, '_blank')
        }
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.storeId, num)
      },
      //初始化数据
      initData(num) {
        let selectStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sfp_StoreFrontID": this.productId,//店面编号
          agentID: this.userInfo.sm_ui_ID,
          "page": num ? num : 1,
          "rows": "10",
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
        for (let attr in this.addOptions) {
          this.addOptions[attr] = ''
        }
        this.addOptions.fd_sfp_StoreFrontID = this.productId;
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
          "images": this.addImage,
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreProduct', insertStoreFrontProductInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData()
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
        console.log(this.updateObj)
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
          "token": "",
          "images": this.updateObj.imgData,
          "data": {
            "fd_sfp_ID": this.updateObj.fd_sfp_ID,//店面产品编码
            "fd_sfp_StoreFrontID": this.updateObj.fd_sfp_StoreFrontID,//店面编号
            "fd_sfp_Name": this.updateObj.fd_sfp_Name,//名称
            "fd_sfp_MeatVeg": this.updateObj.fd_sfp_MeatVeg,//0素菜 1荤菜
            "fd_sfp_Price": this.updateObj.fd_sfp_Price,//价格
            "fd_sfp_Remark": this.updateObj.fd_sfp_Remark,//备注
          }
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
      },
      //添加图片
      getData(data) {
        if (!this.addRadioIndex) {
          this.addImage.push(data.data);
        } else {
          this.addImage.splice(this.addRadioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },
      //删除对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.addImage = this.addImage.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },

      //修改店面图片
      updateData(data) {
        if (!this.updateRadioIndex) {
          this.updateObj.imgData.push(data.data);
        } else {
          this.updateObj.imgData.splice(this.updateRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.updateObj.imgData = this.updateObj.imgData.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
    },
  }
</script>
<style scoped>
  .btnBox {
    text-align: right;
    padding: 10px 50px;
  }

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
