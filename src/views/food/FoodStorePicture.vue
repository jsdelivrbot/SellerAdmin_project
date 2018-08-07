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
            <img :src="scope.row.fd_pi_ImageUrl" width="128" height="80"
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
            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
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
      <el-dialog title="添加店面图片" :visible.sync="addDialog" :close-on-click-modal="false">
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
            <p>图片大小不能大于600KB</p>
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
      <el-dialog title="修改店面图片" :visible.sync="updateDialog" :close-on-click-modal="false">
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
            <p>图片大小不能大于600KB</p>
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
    computed: mapGetters([
      'foodStoreInformtionList',
      'foodProductPictureList'
    ]),
    name: '',
    components: {
      Upload
    },
    data() {
      return {
        isLoading: false,
        storeId: '',
        addDialog: false,
        formLabelWidth: '120px',
        imageObj: {accept: 'image/*'},
        addOptions: {
          "fd_pi_StoreFront": '',//店面编号
          "fd_pi_ImageUrl": "",//图片地址
        },
        imgUrl: '',
        ImageURL:[],
        ImageURL1:[],
        radioIndex: 0,
        updateRadioIndex: 0,
        isNewUploaNode: true,

        bigPictureDialog: false,
        updateDialog: false,
        updateObj: {},
        isShow: false,
        total: 0,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if (!this.foodStoreInformtionList.length) {
        this.initFoodStoreInformtion();
      }
      this.initData();
    },
    mounted(){
    },
    methods: {
      jump(obj){
        let status=sessionStorage.getItem('status')
        if(status=='审核中'){
          this.$notify({
            title: '警告',
            message: '审核中！请稍等。。。',
            type: 'warning'
          });
        }else{
          window.open('http://hly.1000da.com.cn/index.html#/Comment/foodDetail/'+obj.fd_pi_StoreFront,'_blank')
        }
      },
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

      //初始化数据
      initData(id, num) {

        this.isLoading = true;
        let selectProductImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_pi_ID": "",//图片编号
          "fd_pi_StoreFront": id ? id : '',//店面编号
          agentID: this.userInfo.sm_ui_ID,
          page: num ? num : 1,
          rows: 5,
        };
        this.$store.dispatch('initFoodProductPicture', selectProductImageInfo)
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

        this.addOptions.fd_pi_ImageUrl = this.ImageURL.join(',')

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

        this.updateDialog = true;
        this.ImageURL1 = rowData.fd_pi_ImageUrl.split(",");
        this.$store.commit('setTranstionFalse');

        this.updateObj = rowData;

      },
      //修改提交
      updateSubmit() {

        this.updateObj.fd_pi_ImageUrl = this.ImageURL1.join(',');
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
        this.$store.dispatch('deleteFoodProductPicture', deleteProductImageInfo)
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
