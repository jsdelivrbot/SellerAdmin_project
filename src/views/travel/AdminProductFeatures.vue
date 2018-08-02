<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">产品特色</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>产品特色筛选:</span>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-autocomplete-->
            <!--style="width: 150px"-->
            <!--v-model="userName"-->
            <!--:fetch-suggestions="querySearchAsync"-->
            <!--placeholder="请输入商家"-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-autocomplete
            style="width: 250px"
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择产品"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-select v-model="userSearchID" placeholder="请选择产品线路">
            <el-option
              v-for="item in adminProductLine"
              :key="item.ts_pt_ID"
              :label="item.ts_pt_Name"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAdminProductFeatures">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
      v-loading="isLoading"
      :data="adminProductFeaturesList"
      style="width: 100%">
      <el-table-column
        prop="ts_gs_ID"
        align="center"
        label="主键编号">
      </el-table-column>
      <el-table-column
        prop="ts_gs_LinePrepareID"
        align="center"
        label="线路编号">
      </el-table-column>
      <el-table-column
        label="特色描述"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            ref="popover"
            placement="top-start"
            width="400"
            trigger="hover"
            :content="scope.row.ts_gs_Content">
          </el-popover>
          <el-button v-popover:popover size="small">移入查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ts_gs_Type"
        label="特色类型">
      </el-table-column>
      <el-table-column
        align="center"
        label="备注">
        <template slot-scope="scope">
          <el-popover
            ref="popover2"
            placement="top-start"
            width="400"
            trigger="hover"
            :content="scope.row.ts_gs_Remark">
          </el-popover>
          <el-button v-popover:popover2 size="small">移入查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminProductFeatures(scope.row.ts_gs_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminProductFeatures(scope.row.ts_gs_ID)">删除
          </el-button>

          <el-button
            type="success"
            size="mini"
            @click="jump(scope.row)">预览效果
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加产品特色-->
    <el-dialog title="添加产品特色" :visible.sync="addAdminProductFeaturesBox" :close-on-click-modal="false">
      <el-form :model="addAdminProductFeaturesObj">
        <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
          <el-select v-model="addAdminProductFeaturesObj.tsGsLinePrepareID" placeholder="请选择产品线路">
            <el-option
              v-for="item in adminProductLine"
              :key="item.ts_pt_ID"
              :label="item.ts_pt_Name"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特色描述:" :label-width="formLabelWidth">
          <el-input v-model="addAdminProductFeaturesObj.tsGsContent"></el-input>
        </el-form-item>
        <el-form-item label="特色类型:" :label-width="formLabelWidth">
          <el-input v-model="addAdminProductFeaturesObj.tsGsType"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addAdminProductFeaturesObj.tsGsRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminProductFeaturesBox = false">取 消</el-button>
        <el-button type="primary" @click="addAdminProductFeaturesSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改产品特色-->
    <el-dialog title="修改产品特色" :visible.sync="updateAdminProductFeaturesBox" :close-on-click-modal="false">
      <el-form :model="updateAdminProductFeaturesObj">
        <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminProductFeaturesObj.ts_gs_LinePrepareID" placeholder="请选择产品线路">
            <el-option
              v-for="item in adminProductLine"
              :key="item.ts_pt_ID"
              :label="item.ts_pt_Name"
              :value="item.ts_pt_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特色描述:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminProductFeaturesObj.ts_gs_Content"></el-input>
        </el-form-item>
        <el-form-item label="特色类型:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminProductFeaturesObj.ts_gs_Type"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminProductFeaturesObj.ts_gs_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminProductFeaturesBox = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminProductFeaturesSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: '',
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminProductFeaturesList',
      'updateAdminProductFeaturesObj',
      'adminLineScheduleManagementId'
    ]),
    data() {
      return {
        ProductValue: '',
        ProductLineValue: '',
        isLoading: false,
        addAdminProductFeaturesObj: {
          tsGsLinePrepareID: '',
          tsGsContent: '',
          tsGsType: '',
          tsGsRemark: '',
        },
        formLabelWidth: '120px',
        updateAdminProductFeaturesBox: false,
        addAdminProductFeaturesBox: false,
        userName: '',
        GoodId: '',
        LineID: '',
        userSearchID: '',
      }
    },
    methods: {
      jump(obj){
        console.log(obj)
      },
      //选中产品
      handleSelect(item) {
        this.addAdminProductFeaturesObj.tsGsLinePrepareID = item.id;
        this.updateAdminProductFeaturesObj.ts_gs_LinePrepareID = item.id;
        this.userName = item.value;
        let options = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          goodID: item.id ? item.id : ''
        };
        this.$store.dispatch('initAdminProductLine', options)
      },
      loadAll(num, name) {
        return new Promise((relove, reject) => {
          var _this = this;
          let obj = JSON.parse(sessionStorage.getItem('admin'))
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "tradeID": obj.sm_ui_ID ? obj.sm_ui_ID : '',
            goodTitle:name?name:'',
            "userID": "",
            "pcName": "",
            "ID": '',
            'isDelete': 0,
            "page": 1,
            "rows": 100
          };
          this.$store.dispatch('initAdminTradeGoodList', options)
          .then((data) => {
            relove(data)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        })
      },
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          var  data = data.data
          data = data.map(item => {
            return {
              id: item.ta_tg_ID,
              value: item.ta_tg_Title
            }
          })
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
      },
      //初始化数据
      initData(id) {
        var getGoodSpecial = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          'isDelete':0,
          "lineID": id ? id : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminProductFeatures', getGoodSpecial)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.isLoading = false;
      },
      search() {
        if(!this.userSearchID){
          this.$notify({
            message: '请选择筛选条件',
            type: 'error'
          });
          return;
        }
        this.initData(this.userSearchID)
      },
      //查询初始化数据
      searchInitData() {
        if(this.adminLineScheduleManagementId){
          this.initData(this.adminLineScheduleManagementId)
        }
      },
      //添加产品特色
      addAdminProductFeatures() {
        this.$store.commit('setTranstionFalse');
        this.addAdminProductFeaturesBox = true;
      },
      addAdminProductFeaturesSubmit() {
        var addGoodSpecial = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_gs_LinePrepareID": this.addAdminProductFeaturesObj.tsGsLinePrepareID,
            "ts_gs_Content": this.addAdminProductFeaturesObj.tsGsContent,
            "ts_gs_Type": this.addAdminProductFeaturesObj.tsGsType,
            "ts_gs_Remark": this.addAdminProductFeaturesObj.tsGsRemark,
          }
        };
        this.$store.dispatch('initAddAdminProductFeaturesObj', addGoodSpecial)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.addAdminProductFeaturesObj.tsGsLinePrepareID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addAdminProductFeaturesBox = false;
      },
      //修改产品特色
      updateAdminProductFeatures(id) {
        //初始化修改数据
        this.$store.commit('setTranstionFalse');
        this.updateAdminProductFeaturesBox = true;
        this.$store.commit('initUpdateAdminProductFeatures', id)
      },
      updateAdminProductFeaturesSubmit() {
        var updateGoodSpecial = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.updateAdminProductFeaturesObj
        };
        this.$store.dispatch('updateAdminProductFeaturesSubmit', updateGoodSpecial)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.updateAdminProductFeaturesObj.ts_gs_LinePrepareID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateAdminProductFeaturesBox = false;
      },
      //删除产品特色
      deleteAdminProductFeatures(id) {
        var deleteGoodSpecial = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "productID": id
        }
        this.$store.dispatch('deleteAdminProductFeatures', deleteGoodSpecial)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            if(this.userSearchID){
              this.initData(this.userSearchID);
            }else{
              this.initData(this.adminLineScheduleManagementId);
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
    },
    mounted() {
      this.searchInitData();
    }
  }
</script>
<style>
</style>
