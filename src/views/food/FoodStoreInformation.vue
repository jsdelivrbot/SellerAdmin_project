<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面信息</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="roomName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="foodStoreInformtionList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店面编号">
                <span>{{ props.row.fd_sf_ID }}</span>
              </el-form-item>
              <el-form-item label="分类编号">
                <span>{{ props.row.fd_sf_TypeID }}</span>
              </el-form-item>
              <el-form-item label="用餐人数">
                <span>{{ props.row.fd_py_MansName }}</span>
              </el-form-item>
              <el-form-item label="店面名称">
                <span>{{ props.row.fd_sf_ProductName }}</span>
              </el-form-item>
              <el-form-item label="店面类型">
                <span>{{ props.row.fd_py_Name }}</span>
              </el-form-item>
              <el-form-item label="地址描述">
                <span>{{ props.row.fd_sf_Address }}</span>
              </el-form-item>
              <el-form-item label="经度">
                <span>{{ props.row.fd_sf_Lng }}°</span>
              </el-form-item>
              <el-form-item label="纬度">
                <span>{{ props.row.fd_sf_Lat }}°</span>
              </el-form-item>
              <el-form-item label="省">
                <span>{{ props.row.fd_sf_Provice }}</span>
              </el-form-item>
              <el-form-item label="市">
                <span>{{ props.row.fd_sf_City }}</span>
              </el-form-item>
              <el-form-item label="人均价格">
                <span>{{ props.row.fd_sf_AvgPrice }}元</span>
              </el-form-item>
              <el-form-item label="营业时间">
                <span>{{ props.row.fd_sf_OpenTime }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.fd_sf_Phone }}</span>
              </el-form-item>
              <el-form-item label="是否有WAFI">
                <span>{{ props.row.fd_sf_HasWafi }}</span>
              </el-form-item>
              <el-form-item label="供应商编码">
                <span>{{ props.row.fd_sf_TradeID }}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <span>{{ props.row.fd_sf_PassStatus }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="店面名称"
          prop="fd_sf_ProductName">
        </el-table-column>
        <el-table-column
          label="联系电话"
          prop="fd_sf_Phone">
        </el-table-column>
        <el-table-column
          label="人均价格">
          <template slot-scope="scope">
            {{scope.row.fd_sf_AvgPrice}}元
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="Delete(scope.row.fd_sf_ID)">删除</el-button>
            <el-button size="mini" type="success" @click="recommendShop(scope.row.fd_sf_ID)">申请推荐店面</el-button>
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
      <el-dialog title="添加店面信息" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="店面用餐类型:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sf_TypeID" placeholder="请选择">
              <el-option
                v-for="item in storefrontTypeList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用餐人数:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sf_MansID" placeholder="请选择">
              <el-option
                v-for="item in numberOfMealsList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_ProductName"></el-input>
          </el-form-item>
          <el-form-item label="地址描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_Address"></el-input>
          </el-form-item>
          <el-form-item label="经度:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_Lng"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_Lat"></el-input>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sf_Provice" placeholder="请选择" @change="changeCity">
              <el-option
                v-for="item in foodProcinceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sf_City" placeholder="请选择">
              <el-option
                v-for="item in foodCityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人均价格:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_AvgPrice"></el-input>
          </el-form-item>
          <el-form-item label="营业时间:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_OpenTime"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_Phone"></el-input>
          </el-form-item>
          <el-form-item label="是否有WAFI:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sf_HasWafi" placeholder="请选择">
              <el-option
                v-for="item in isWifi"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
      <el-dialog title="修改店面信息" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="店面用餐类型:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sf_TypeID" placeholder="请选择">
              <el-option
                v-for="item in storefrontTypeList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用餐人数:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sf_MansID" placeholder="请选择">
              <el-option
                v-for="item in numberOfMealsList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_ProductName"></el-input>
          </el-form-item>
          <el-form-item label="地址描述:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_Address"></el-input>
          </el-form-item>
          <el-form-item label="经度:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_Lng"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_Lat"></el-input>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sf_Provice" placeholder="请选择" @change="changeCity">
              <el-option
                v-for="item in foodProcinceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sf_City" placeholder="请选择">
              <el-option
                v-for="item in foodCityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人均价格:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_AvgPrice"></el-input>
          </el-form-item>
          <el-form-item label="营业时间:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_OpenTime"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_Phone"></el-input>
          </el-form-item>
          <el-form-item label="是否有WAFI:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sf_HasWafi" placeholder="请选择">
              <el-option
                v-for="item in isWifi"
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
      'foodStoreInformtionList',
      'numberOfMealsList',
      'storefrontTypeList',
      'foodProcinceList',
      'foodCityList',
    ]),
    data() {
      return {
        userInfo: {},
        total: 0,
        addDialog: false,
        addOptions: {
          "fd_sf_TypeID": "",
          "fd_sf_MansID": "",
          "fd_sf_ProductName": "",
          "fd_sf_Address": "",
          "fd_sf_Lng": "",
          "fd_sf_Lat": "",
          "fd_sf_Provice": "",
          "fd_sf_City": "",
          "fd_sf_AvgPrice": "",
          "fd_sf_OpenTime": "",
          "fd_sf_Phone": "",
          "fd_sf_HasWafi": "",
          "fd_sf_TradeID": "",
        },
        formLabelWidth: '120px',
        updateDialog: false,
        isWifi: [
          {
            value: 0,
            label: '无'
          },
          {
            value: 1,
            label: '有'
          }

        ],
        proviceId: '',
        roomName: '',
        updateObj: {},
        isLoading:false
      }
    },
    methods: {
//      分页
      handleCurrentChange(num) {
        this.initData('', num)
      },
      //查询省
      initProvince() {
        let getAreaProvice = {
          "areaPid": 3337
        };
        this.$store.dispatch('initFoodProcince', getAreaProvice)
      },
      //市
      changeCity(name) {
        this.proviceId = this.foodProcinceList.filter(item => {
          if (item.sm_af_AreaName == name) {
            return true;
          }
          return false;
        })[0].sm_af_AreaID
        let getAreaProvice = {
          "areaPid": this.proviceId
        };
        this.$store.dispatch('initFoodCity', getAreaProvice)
      },
      //初始化数据
      initData(name, num) {
        let selectStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sf_ID": "",//店面编号
          "fd_sf_TypeID": "",//分类编号
          "fd_sf_MansID": "",//用餐人数编号
          "fd_sf_ProductName": name ? name : '',//产品名称 like
          "fd_sf_Provice": "",//省
          "fd_sf_City": "",//市
          "priceFrom": "",//人均价格大于
          "priceTo": "",//人均价格小于
          "fd_sf_Phone": "",//联系电话
          "fd_sf_TradeID": this.userInfo.sm_ui_ID,//供应商编码
          "page": num ? num : 1,
          "rows": "5",
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreInformtion', selectStoreFrontInfo)
          .then(total => {
            this.isLoading = false
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
        this.initData(this.roomName, 1)
      },
      //添加
      add() {
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.addOptions.fd_sf_TradeID = this.userInfo.sm_ui_ID;
      },
//      添加提交
      addSubmit() {
        let insertStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodStoreInformation', insertStoreFrontInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
      //修改按钮
      update(rowData) {
        this.updateObj = rowData
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.updateObj.fd_sf_HasWafi = '';
      },
      //修改提交
      updateSubmit() {
        let updateStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_sf_ID": this.updateObj.fd_sf_ID,
            "fd_sf_TypeID": this.updateObj.fd_sf_TypeID,
            "fd_sf_MansID": this.updateObj.fd_sf_MansID,
            "fd_sf_ProductName": this.updateObj.fd_sf_ProductName,
            "fd_sf_Address": this.updateObj.fd_sf_Address,
            "fd_sf_Lng": this.updateObj.fd_sf_Lng,
            "fd_sf_Lat": this.updateObj.fd_sf_Lat,
            "fd_sf_Provice": this.updateObj.fd_sf_Provice,
            "fd_sf_City": this.updateObj.fd_sf_City,
            "fd_sf_AvgPrice": this.updateObj.fd_sf_AvgPrice,
            "fd_sf_OpenTime": this.updateObj.fd_sf_OpenTime,
            "fd_sf_Phone": this.updateObj.fd_sf_Phone,
            "fd_sf_HasWafi": this.updateObj.fd_sf_HasWafi,
            "fd_sf_TradeID": this.updateObj.fd_sf_TradeID,
          }
        };
        this.$store.dispatch('updateFoodStoreInformtionSubmit', updateStoreFrontInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateDialog = false;
      },
      //删除按钮
      Delete(id) {
        let deleteStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_sf_ID": id,//店面编号
          }
        };
        this.$store.dispatch('deleteFoodStoreInformtion', deleteStoreFrontInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //申请推荐店面
      recommendShop(id) {
        let insertIntroduceShopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_is_ShopID": id ? id : '',//店面编号
          }
        };
        this.$store.dispatch('recommendShopSubmit',insertIntroduceShopInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      this.initData();
      this.initProvince()
    }
  }
</script>
<style scoped>
</style>
