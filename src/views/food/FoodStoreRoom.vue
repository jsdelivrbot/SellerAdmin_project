<template>
  <!--店面房间  y  -->
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">店面房间</h1>
      <el-button type="primary" @click="add" size="small">添加</el-button>
    </div>

    <!--数据展示-->

    <el-table
      :data="foodStoreRoomList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店面名称">
              <span>{{ props.row.fd_sf_ProductName }}</span>
            </el-form-item>
            <el-form-item label="房间名称">
              <span>{{ props.row.fd_sfr_RoomName }}</span>
            </el-form-item>
            <el-form-item label="房间桌数">
              <span>{{ props.row.fd_sfr_TablesCount }}桌</span>
            </el-form-item>
            <el-form-item label="预定金额(元)">
              <span>{{ props.row.fd_sfr_BookMoney }} 元</span>
            </el-form-item>
            <el-form-item label="最低消费(元)">
              <span>{{ props.row.fd_sfr_LowestCost }} 元</span>
            </el-form-item>
            <el-form-item label="房间区域名称">
              <span>{{ props.row.fd_py_Name }}</span>
            </el-form-item>
            <el-form-item label="有无单独卫生间">
              <span>{{ props.row.fd_sfr_WashRoom | washRoomState }}</span>
            </el-form-item>
            <el-form-item label="房间图片">
              <img
                v-lazy="item"
                v-for="item,index in props.row.imgData"
                height="50"
                style="margin-right: 10px;"
              >
            </el-form-item>
            <el-form-item label="房间视频">
              <video :src="props.row.fd_sfr_VedioURL" v-show="props.row.fd_sfr_VedioURL" height="240"
                     controls="controls"></video>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="店面名称"
        prop="fd_sf_ProductName">
      </el-table-column>
      <el-table-column
        label="房间名称"
        prop="fd_sfr_RoomName">
      </el-table-column>
      <el-table-column
        label="预定金额(元)"
        prop="fd_sfr_BookMoney">
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
            @click="Delete(scope.row.fd_sfr_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
    <el-dialog title="添加店面房间" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="addOptions">

        <el-form-item label="房间名称" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="addOptions.fd_sfr_RoomName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="预定价格(元)" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="addOptions.fd_sfr_BookMoney" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>

        <el-form-item label="最低消费(元)" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="addOptions.fd_sfr_LowestCost" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>

        <el-form-item label="区域名称" :label-width="formLabelWidth" style="width: 55%">
          <el-select v-model="addOptions.fd_sfr_RegionID" placeholder="请选择" @change="changeRoomType">
            <el-option
              v-for="item in roomTypeList"
              :key="item.propertyID"
              :label="item.propertyName"
              :value="item.propertyID">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间桌数(桌)" :label-width="formLabelWidth" v-show="showTabel" style="width: 55%">
          <el-input v-model="addOptions.fd_sfr_TablesCount" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>

        <el-form-item label="有无单独卫生间" :label-width="formLabelWidth" style="width: 55%">
          <el-select v-model="addOptions.fd_sfr_WashRoom" placeholder="请选择">
            <el-option
              v-for="item in hoveToilet"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间图片" :label-width="formLabelWidth">
          <Upload @getData="getData" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in addImageUrl"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteImageURL(item)">X</span>
              <em>
                <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="addImageUrl.length"
              >
            </p>
          </div>
        </el-form-item>

        <el-form-item label="上传视频:" :label-width="formLabelWidth">
          <p>视频大小不能大于600MB</p>
          <Upload @getData="addVideo" :attrs="videoObj"></Upload>
          <video
            :src="this.addOptions.fd_sfr_VedioURL"
            v-show="this.addOptions.fd_sfr_VedioURL"
            height="240" controls="controls"
            style="margin-top: 20px;"
          ></video>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog title="修改店面房间" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-form :model="updateObj">

        <el-form-item label="房间名称" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="updateObj.fd_sfr_RoomName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="预定价格(元)" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="updateObj.fd_sfr_BookMoney" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="最低消费(元)" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="updateObj.fd_sfr_LowestCost" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>

        <el-form-item label="区域名称" :label-width="formLabelWidth" style="width: 55%">
          <el-select v-model="updateObj.fd_sfr_RegionID" placeholder="请选择" @change="updateChangeRoomType">
            <el-option
              v-for="item in roomTypeList"
              :key="item.propertyID"
              :label="item.propertyName"
              :value="item.propertyID">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间桌数(桌)" :label-width="formLabelWidth" v-show="showUpdateTabel" style="width: 55%">
          <el-input v-model="updateObj.fd_sfr_TablesCount" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>

        <el-form-item label="有无单独卫生间" :label-width="formLabelWidth" style="width: 55%">
          <el-select v-model="updateObj.fd_sfr_WashRoom" placeholder="请选择">
            <el-option
              v-for="item in hoveToilet"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间图片" :label-width="formLabelWidth">
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

        <el-form-item label="上传视频:" :label-width="formLabelWidth">
          <p>视频大小不能大于600MB</p>
          <Upload @getData="updateVideo" :attrs="videoObj"></Upload>

          <video :src="  this.updateObj.fd_sfr_VedioURL" v-show="this.updateObj.fd_sfr_VedioURL" controls
                 width="100"></video>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
      'foodStoreRoomList',
      'roomTypeList'
    ]),
    data() {
      return {
        addOptions: {
          "fd_sfr_StoreFrontID": "",//店面编号
          "fd_sfr_RegionID": "",//区域编码  【76  77】包间桌数用户输入 78[桌数固定为1]
          "fd_sfr_RoomName": "",//房间名称
          "fd_sfr_BookMoney": "",//预定价格
          "fd_sfr_VedioURL": "",//包间视频地址
          "fd_sfr_LowestCost": "",//最低消费
          "fd_sfr_TablesCount": "",//房间桌数
          "fd_sfr_WashRoom": "",//有无单独卫生间（0无 1有）
        },
        showTabel: true,
        hoveToilet: [
          {
            value: 0,
            label: '无'
          },
          {
            value: 1,
            label: '有'
          }
        ],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        storeId: '',
        total: 0,
        updateObj: {},
        isLoading: false,
        updateDialog: false,
        videoShow: false,
        isShow: false,
        videoObj: {
          accept: 'video/*'
        },
        imageObj: {accept: 'image/*'},
        addImageUrl: [],
        addRadioIndex: 0,
        isNewUploaNode: true,
        updateRadioIndex: 0,
        showUpdateTabel: true,
      }
    },
    created() {
      this.storeId = this.$route.params.id;
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      this.initData();
      this.initRoomType();
    },
    methods: {
      initRoomType() {
        let selectPropertyInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "fd_py_ParentID": "75",//父编码 为0是查询顶级属性 1美食类型[菜系]  父编码为75房间区域      80经营类型[早中晚]
        };
        this.$store.dispatch('initRoomType', selectPropertyInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      addVideo(data) {
        this.addOptions.fd_sfr_VedioURL = data.data;
      },
      updateVideo(data) {
        this.updateObj.fd_sfr_VedioURL = data.data;
      },
      //      分页
      handleCurrentChange(num) {
        this.initData(num);
      },
      //初始化数据
      initData(num) {
        let initStoreRoom = {

          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
//          "fd_sfr_ID": "",//店面房间编号
          "fd_sfr_StoreFrontID": this.storeId ? this.storeId : '',//店面编号
//          "fd_sfr_RegionID": "",//区域编码
//          "fd_sfr_RoomName": "",//房间名称
//          "fd_sfr_WashRoom": "",//有无卫生间（0无 1有）
          "agentID": this.userInfo.sm_ui_ID,
          "page": num ? num : 1,
          "rows": "10",
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreRoom', initStoreRoom).then(
          total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },

      //查询
      search() {
        this.initData(this.storeId)
      },
      //新增
      add() {
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = ''
        }
        for (let attr in this.addOptions) {
          this.addOptions[attr] = ''
        }
        this.addOptions.fd_sfr_StoreFrontID = this.storeId;
        this.dialogFormVisible = true;
        this.$store.commit('setTranstionFalse');
      },

      changeRoomType() {

        if (this.addOptions.fd_sfr_RegionID == 78) {
          this.showTabel = false;
        } else {
          this.showTabel = true;
        }
      },

      //新增提交
      addSubmit() {
        if (this.addOptions.fd_sfr_RegionID == 78) {
          this.addOptions.fd_sfr_TablesCount = 1;
        }
        let addStoreRoom = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "images": this.addImageUrl,
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreRoom', addStoreRoom)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.dialogFormVisible = false;
      },
      //修改
      update(rowData) {
        this.updateObj = rowData;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        if (this.updateObj.fd_sfr_RegionID == 78) {
          this.showUpdateTabel = false;
        } else {
          this.showUpdateTabel = true;
        }
      },

      updateChangeRoomType(){
        if (this.updateObj.fd_sfr_RegionID == 78) {
          this.showUpdateTabel = false;
        } else {
          this.showUpdateTabel = true;
        }
      },

      //修改提交
      updateSubmit() {
        let updateStoreFrontRoomInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "images": this.updateObj.imgData,
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodStoreRoom', updateStoreFrontRoomInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateDialog = false;
      },
      //删除
      Delete(id) {
        let deleteStoreRoom = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "fd_sfr_ID": id ? id : '',//店面房间编号
          }
        };
        this.$store.dispatch('deleteFoodStoreRoom', deleteStoreRoom)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.storeId)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      getData(data) {
        if (!this.addRadioIndex) {
          this.addImageUrl.push(data.data);
        } else {
          this.addImageUrl.splice(this.addRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },
      //删除修改对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.addImageUrl = this.addImageUrl.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      updateData(data) {
        if (!this.updateRadioIndex) {
          this.updateObj.imgData.push(data.data);
        } else {
          this.updateObj.imgData.splice(this.updateRadioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.updateObj.imgData = this.updateObj.imgData.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
    }
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
