<template>
  <!--店面房间  y  -->
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">店面房间</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="storeId" placeholder="请选择">
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
    </div>
    <!--数据展示-->
    <el-table
      :data="foodStoreRoomList"
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        prop="fd_sf_ProductName"
        label="店面名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fd_sfr_RoomName"
        label="房间名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fd_sfr_BookMoney"
        label="预定金额(元)"
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
            @click="Delete(scope.row.fd_sfr_ID)">删除
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
    <el-dialog title="添加店面房间" :visible.sync="dialogFormVisible">
      <el-form :model="addOptions">
        <el-form-item label="店面名称" :label-width="formLabelWidth" style="width: 55%">
          <el-select v-model="addOptions.fd_sfr_StoreFrontID" placeholder="请选择">
            <el-option
              v-for="item in foodStoreInformtionList"
              :key="item.fd_sf_ID"
              :label="item.fd_sf_ProductName"
              :value="item.fd_sf_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间名称" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="addOptions.fd_sfr_RoomName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预定价格(元)" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="addOptions.fd_sfr_BookMoney" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改店面房间" :visible.sync="updateDialog">
      <el-form :model="updateObj">
        <el-form-item label="店面名称" :label-width="formLabelWidth" style="width: 55%">
          <el-select v-model="updateObj.fd_sfr_StoreFrontID" placeholder="请选择">
            <el-option
              v-for="item in foodStoreInformtionList"
              :key="item.fd_sf_ID"
              :label="item.fd_sf_ProductName"
              :value="item.fd_sf_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间名称" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="updateObj.fd_sfr_RoomName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预定价格(元)" :label-width="formLabelWidth" style="width: 55%">
          <el-input v-model="updateObj.fd_sfr_BookMoney" auto-complete="off"></el-input>
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
  export default {
    computed: mapGetters([
      'foodStoreRoomList',
      'foodStoreInformtionList'
    ]),
    data() {
      return {
        addOptions: {
          "fd_sfr_StoreFrontID": "",//店面编号
          "fd_sfr_RoomName": "",//房间名称
          "fd_sfr_BookMoney": ""//预定价格
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        storeId: '',
        total: 0,
        updateObj: {},
        isLoading:false,
        updateDialog: false,
      }
    },
    methods: {
      //      分页
      handleCurrentChange(num) {
        this.initData('', num);
      },
      //初始化数据
      initData(id) {
        if (!id) {
          this.$notify({
            message: '请选择店面！',
            type: 'error'
          })
          return;
        }
        let initStoreRoom = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "fd_sfr_ID": "",//店面房间编号
          "fd_sfr_StoreFrontID": id,//店面编号
          "fd_sfr_RoomName": "",//房间名称
          "page": "1",
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
        this.dialogFormVisible = true;
        this.$store.commit('setTranstionFalse');
      }
      ,
      //新增提交
      addSubmit() {
        let addStoreRoom = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreRoom', addStoreRoom)
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
        this.dialogFormVisible = false;
      }
      ,
      //修改
      update(rowData) {
        this.updateObj = rowData;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      }
      ,
      //修改提交
      updateSubmit() {
        let updateStoreFrontRoomInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodStoreRoom', updateStoreFrontRoomInfo)
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
        this.updateDialog = false;
      }
      ,
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
        this.$store.dispatch('deleteFoodStoreRoom', deleteStoreRoom).then(
          suc => {
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
      }
    }
  }
</script>
<style scoped>
</style>
