<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">房间餐桌</h1>
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
        :data="foodStoreRoomTabelList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="fd_sfr_RoomName"
          label="房间名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_rt_TableID"
          label="餐桌编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fd_rt_Remark"
          label="备注"
          align="center">
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
              @click="Delete(scope.row.fd_rt_ID)">删除
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
      <el-dialog title="添加房间餐桌" :visible.sync="addDialog">
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
          <el-form-item label="店面房间名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_rt_RoomID" placeholder="请选择房间">
              <el-option
                v-for="item in foodStoreRoomList"
                :key="item.fd_sfr_ID"
                :label="item.fd_sfr_RoomName"
                :value="item.fd_sfr_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="餐桌编号:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_rt_TableID"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_rt_Remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改房间餐桌" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="店面房间名称:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_rt_RoomID" placeholder="请选择房间">
              <el-option
                v-for="item in foodStoreRoomList"
                :key="item.fd_sfr_ID"
                :label="item.fd_sfr_RoomName"
                :value="item.fd_sfr_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="餐桌编号:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_rt_TableID"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_rt_Remark"></el-input>
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
      'foodStoreRoomList',
      'foodStoreRoomTabelList'
    ]),
    data() {
      return {
        isLoading: false,
        storeId: '',
        roomId: '',
        formLabelWidth: '120px',
        addOptions: {
          "fd_rt_RoomID": "",//店面房间编号
          "fd_rt_TableID": "",//餐桌编号
          "fd_rt_Remark": "",//备注
        },
        addDialog: false,
        total: 0,
        updateDialog: false,
        updateObj: {},
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
      //      分页
      handleCurrentChange(num) {
        this.initData(this.roomId, num);
      },
      //选择房间
      changeRoom(id) {
        this.initRoomData(id);
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
          agentID: this.userInfo.sm_ui_ID,
        }
        this.$store.dispatch('initFoodStoreRoom', initStoreRoom)
          .then(() => {
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
        let selectRoomTableInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_rt_ID": "",//房间餐桌编号
          "fd_rt_RoomID": id ? id : '',//店面房间编号
          "page": num ? num : 1,//允许占用时间
          "rows": "5",//备注
          agentID: this.userInfo.sm_ui_ID,
        }
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreRoomTabel', selectRoomTableInfo)
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
        this.initData(this.roomId);
      },
      //添加
      add() {
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        let insertRoomTableInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreRoomTabel', insertRoomTableInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.roomId);
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
        let updateRoomTableInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        }
        this.$store.dispatch('updateFoodStoreRoomTabel', updateRoomTableInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.roomId);
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
        let deleteRoomTableInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_rt_ID": id ? id : '',//房间餐桌编号
          }
        };
        this.$store.dispatch('deleteFoodStoreRoomTabel', deleteRoomTableInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData(this.roomId);
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
