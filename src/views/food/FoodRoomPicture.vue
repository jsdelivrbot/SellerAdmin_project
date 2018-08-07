<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面房间图片</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="storeId" placeholder="请选择店面" @change="changeRoom" size="small">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="roomId" placeholder="请选择房间" size="small">
              <el-option
                v-for="item in foodStoreRoomList"
                :key="item.fd_sfr_ID"
                :label="item.fd_sfr_RoomName"
                :value="item.fd_sfr_ID">
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
        :data="foodRoomPictureList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="fd_sfr_RoomName"
          label="房间名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_ri_Remark"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column
          label="房间图片"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.fd_ri_Image" width="128" height="80"
                 @click="displayBigPicture(scope.row.fd_ri_Image)">
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
              @click="Delete(scope.row.fd_ri_ID)">删除
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
      <el-dialog title="添加店面房间图片" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <el-form-item label="请选择店面:" :label-width="formLabelWidth">
            <el-select v-model="storeId" placeholder="请选择店面" @change="changeRoom">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面房间:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_ri_RoomID" placeholder="请选择房间">
              <el-option
                v-for="item in foodStoreRoomList"
                :key="item.fd_sfr_ID"
                :label="item.fd_sfr_RoomName"
                :value="item.fd_sfr_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间图片:" :label-width="formLabelWidth">

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
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_ri_Remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改店面房间图片" :visible.sync="updateDialog" :close-on-click-modal="false">
        <el-form :model="updateObj">
          <el-form-item label="店面房间:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_ri_RoomID" placeholder="请选择房间">
              <el-option
                v-for="item in foodStoreRoomList"
                :key="item.fd_sfr_ID"
                :label="item.fd_sfr_RoomName"
                :value="item.fd_sfr_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间图片:" :label-width="formLabelWidth">

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
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_ri_Remark"></el-input>
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
      'foodStoreRoomList',
      'foodRoomPictureList'
    ]),
    data() {
      return {
        isLoading: false,
        storeId: '',
        roomId: '',
        formLabelWidth: '120px',
        total: 0,
        addOptions: {
          "fd_ri_RoomID": "",//店面房间编号
          "fd_ri_Image": "",//图片地址
          "fd_ri_Remark": "",//备注
        },
        addDialog: false,
        updateDialog: false,
        updateObj: {},
        bigPictureDialog: false,
        imgUrl: '',
        ImageURL:[],
        ImageURL1:[],
        radioIndex: 0,
        updateRadioIndex: 0,
        isNewUploaNode: true,
        userInfo: {},
        imageObj: {accept: 'image/*'},
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

      //选择店面请求房间信息
      changeRoom(id) {
        this.initRoomData(id)
      },
      //初始化房间数据
      initRoomData(id) {

        let initStoreRoom = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "fd_sfr_ID": "",//店面房间编号
          "fd_sfr_StoreFrontID": id ? id : '',//店面编号
          "fd_sfr_RoomName": "",//房间名称
        }
        this.$store.dispatch('initFoodStoreRoom', initStoreRoom).then(
          total => {
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //初始化数据
      initData(id, num) {

        let selectRoomImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": num ? num : 1,
          "rows": "5",
          "fd_ri_ID": "",//房间图片编码
          "fd_ri_RoomID": id ? id : '',//店面房间编号
          agentID: this.userInfo.sm_ui_ID,
        }

        this.isLoading = true;
        this.$store.dispatch('initFoodRoomPicture', selectRoomImageInfo)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {

          })
      },
      //查询
      search() {
        this.initData(this.roomId)
      },
      //显示大图
      displayBigPicture(urlData) {
        this.$store.commit('setTranstionFalse');
        this.imgUrl = urlData
        this.bigPictureDialog = true;
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
        this.ImageURL=[],
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;

      },
      //添加提交
      addSubmit() {
        this.addOptions.fd_ri_Image = this.ImageURL.join(',')
        let insertRoomImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodRoomPicture', insertRoomImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.addOptions.fd_ri_RoomID)
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
        this.ImageURL1 = rowData.fd_ri_Image.split(",");
      },
      //修改提交
      updateSubmit() {
        this.updateObj.fd_ri_Image = this.ImageURL1.join(',');
        let updateRoomImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodRoomPicture', updateRoomImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.updateObj.fd_ri_RoomID)
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
        let deleteRoomImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_ri_ID": id ? id : '',//房间图片编码
          }
        };
        this.$store.dispatch('deleteFoodRoomPicture', deleteRoomImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.roomId)
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
