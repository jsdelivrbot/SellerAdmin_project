<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">停车位管理</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面停车位查询:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="foodStoreName" placeholder="请选择店面名称">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID"
              >
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
        v-loading="isLoading"
        :data="foodStoppingPlaceList"
        style="width: 100%">
        <el-table-column
          label="停车位编码"
          prop="fd_sc_ID">
        </el-table-column>
        <el-table-column
          label="停车位名称"
          prop="fd_sc_SeatNo">
        </el-table-column>
        <el-table-column
          label="店面编号"
          prop="fd_sc_ShopID">
        </el-table-column>
        <el-table-column
          label="锁定状态"
          prop="fd_sc_LockStatus">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteSubmit(scope.row.fd_sc_ID)">删除</el-button>
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
      <el-dialog title="添加停车场" :visible.sync="addDialog">
        <el-form>
          <el-form-item label="停车位名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.fd_sc_SeatNo"></el-input>
          </el-form-item>
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.fd_sc_ShopID" placeholder="请选择店面名称">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改停车位" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="停车位编码:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sc_ID" :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="停车位名称:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sc_SeatNo"></el-input>
          </el-form-item>
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sc_ShopID" placeholder="请选择店面名称">
              <el-option
                v-for="item in foodStoreInformtionList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="锁定状态:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sc_LockStatus" placeholder="请选择锁定状态">
              <el-option
                v-for="item in Status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
      'foodStoppingPlaceList',
      'foodStoreInformtionList',
    ]),
    data() {
      return {
        isOff: true,
        foodStoreName: "",
        updateObj: {},
        isLoading:false,
        addDialog: false,
        formLabelWidth: '120px',
        updateDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            // "fd_sc_ID": "",//停车位编码
            "fd_sc_SeatNo": "",//停车位名称
            "fd_sc_ShopID": "",//店面编号
          }
        },
        Status: [{
          value: 0,
          label: '空闲'
        }, {
          value: 1,
          label: '锁定'
        }, {
          value: 2,
          label: '已售'
        }],
        total: 0,

      }
    },
    methods: {
//      分页
      handleCurrentChange(num) {
        this.initData(this.foodStoreName, num)
      },
      //初始化数据
      initData(name, num) {
        if (!name) {
          this.$notify({
            message: '请选择店面！',
            type: 'error'
          })
          return
        }
        let selectFoodStoppingPlace = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": num ? num : 1,
          "rows": "10",
          "fd_sc_ID": "",//停车位编码
          "fd_sc_ShopID": name,//店面编号
          "fd_sc_SeatNo": "",//停车位名称
          "fd_sc_LockStatus": "",//锁定状态
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoppingPlace', selectFoodStoppingPlace)
          .then(total => {
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
        this.initData(this.foodStoreName)
      },
      //添加
      add() {
        this.addOptions.data.fd_sc_SeatNo = "";
        this.addOptions.data.fd_sc_ShopID = "";
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        // this.addOptions.fd_sf_TradeID = this.userInfo.sm_ai_ID;
      },
//      添加提交
      addSubmit() {
        this.$store.dispatch('addFoodStoppingPlace', this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.foodStoreName)
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            })
          });
        this.addDialog = false;
      },
      //修改按钮
      update(rowData) {

        //修改时状态显示问题
        for (let i = 0; i < this.Status.length; i++) {
          if (this.Status[i].label == rowData.fd_sc_LockStatus) {
            rowData.fd_sc_LockStatus = this.Status[i].value;
          }
        }
        this.updateObj = rowData;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_sc_ID": this.updateObj.fd_sc_ID,//停车位编码
            "fd_sc_ShopID": this.updateObj.fd_sc_ShopID,//店面编号
            "fd_sc_SeatNo": this.updateObj.fd_sc_SeatNo,//停车位名称
            "fd_sc_LockStatus": this.updateObj.fd_sc_LockStatus,//锁定状态
          }
        };
        this.$store.dispatch('updateFoodStoppingPlace', updateOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            });
            this.initData(this.foodStoreName);
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
        this.updateDialog = false;
      },
      //删除按钮
      deleteSubmit(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_sc_ID": id,//停车位编码
          }
        }
        this.$store.dispatch('deleteFoodStoppingPlace', deleteOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            });
            this.initData(this.foodStoreName);
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            })
          });
      }
    },
  }
</script>
<style scoped>
</style>
