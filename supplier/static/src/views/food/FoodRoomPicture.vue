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
            <img v-lazy="scope.row.fd_ri_Image" width="128" height="80"
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
      <el-dialog title="添加店面房间图片" :visible.sync="addDialog">
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
            <a href="javascript:;" class="file">上传图片
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.fd_ri_Image" v-show="addOptions.fd_ri_Image" width="128" height="80">
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
      <el-dialog title="修改店面房间图片" :visible.sync="updateDialog">
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
            <a href="javascript:;" class="file">上传图片
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <p>如果不上传图片默认为原来的图片</p>
            <img v-lazy="addOptions.fd_ri_Image" v-show="addOptions.fd_ri_Image" width="128" height="80">
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

  export default {
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
        userInfo: {},
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
        return new Promise((relove, reject) => {
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
            } else {
//              console.log(xhr.responseText)
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      uploaNode() {
        this.addOptions.fd_ri_Image = '';
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
                      this.addOptions.fd_ri_Image = data.data;
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
      //选择店面请求房间信息
      changeRoom(id) {
        this.initRoomData(id)
      },
      //初始化房间数据
      initRoomData(id) {
//        if (!id) {
//          this.$notify({
//            message: '请选择店面！',
//            type: 'error'
//          })
//          return;
//        }
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
//        if (!id) {
//          this.$notify({
//            message: '请选择房间！',
//            type: 'error'
//          })
//          return;
//        }
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
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode();
      },
      //添加提交
      addSubmit() {
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
        this.uploaNode();
      },
      //修改提交
      updateSubmit() {
        if (this.addOptions.fd_ri_Image) {
          this.updateObj.fd_ri_Image = this.addOptions.fd_ri_Image
        }
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
</style>
