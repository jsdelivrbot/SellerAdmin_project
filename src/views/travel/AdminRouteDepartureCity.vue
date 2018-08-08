<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">产品线路出发城市</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>线路出发城市筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              v-model="userName"
              size="small"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择产品"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="userSearchID" placeholder="请选择产品线路" size="small">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdminRouteDepartureCity" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminRouteDepartureCity"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          label="编号"
          prop="ts_cc_ID">
        </el-table-column>
        <el-table-column
          label="线路编号"
          align="center"
          prop="ts_cc_LineID">
        </el-table-column>
        <!--<el-table-column-->
        <!--label="城市编号"-->
        <!--align="center"-->
        <!--prop="ts_cc_Code">-->
        <!--</el-table-column>-->
        <el-table-column
          label="城市名称"
          align="center"
          prop="ts_cc_Name">
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminRouteDepartureCity(scope.row.ts_cc_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminRouteDepartureCity(scope.row.ts_cc_ID)">删除
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
      <div class="block" style="float: right;">
        <el-pagination
          v-show="total"
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>

      <!--添加产品线路出发城市-->
      <el-dialog title="添加出发城市" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form :model="addOptions">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.ts_cc_LineID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="城市编码:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="addOptions.data.ts_cc_Code" placeholder="请输入城市编码"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="城市:" :label-width="formLabelWidth">
            <el-select v-model="provice" placeholder="请选择省份" @change="changeProvice">
              <el-option
                v-for="item in proviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
            <el-select v-model="addOptions.data.ts_cc_Name" placeholder="请选择市">
              <el-option
                v-for="item in cityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminRouteDepartureCitySubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改产品线路出发城市-->
      <el-dialog title="修改出发城市" :visible.sync="updateDialog" :close-on-click-modal="false">
        <el-form :model="updateAdminRouteDepartureCityObj">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminRouteDepartureCityObj.ts_cc_LineID" placeholder="请选择产品线路">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="城市编码:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="updateAdminRouteDepartureCityObj.ts_cc_Code" placeholder="请输入城市编码"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="城市:" :label-width="formLabelWidth">
            <el-select v-model="provice" placeholder="请选择省份" @change="changeProvice">
              <el-option
                v-for="item in proviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
            <el-select v-model="updateAdminRouteDepartureCityObj.ts_cc_Name" placeholder="请选择市">
              <el-option
                v-for="item in cityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminRouteDepartureCitySubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    props:['id'],
    data() {
      return {
        provice: '',
        GoodId: '',
        total: 0,
        LineID: '',
        userName: '',
        departureCityID: '',
        isLoading: false,
        userSearchID: '',
        formLabelWidth: '120px',
        createTimeData: '',
        addDialog: false,
        updateDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_cc_LineID": '',
//            "ts_cc_Code": '',
            "ts_cc_Name": ""
          }
        }
      }
    },
    computed: mapGetters([
      'adminProductLine',
      'adminRouteDepartureCity',
      'updateAdminRouteDepartureCityObj',
      'proviceList',
      'cityList'
    ]),
    created() {
      //初始化省
      let sCity = {
        "areaPid": 3337
      };
      this.$store.dispatch('initProvice', sCity)
      this.adminLineScheduleManagementId = this.id;
      if (this.adminLineScheduleManagementId) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "lineID": this.adminLineScheduleManagementId
        }
        this.$store.dispatch('initDepartureCity', options)
      }
      if (this.adminLineScheduleManagementId) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "lineID": this.adminLineScheduleManagementId,
          page: 1,
          rows: 5
        };
        this.$store.dispatch('initAdminRouteDepartureCity', options)
          .then(total => {
            this.total = total;
          })
      }
    },
    methods: {

      jump(obj) {
        console.log(obj)
        let ID = sessionStorage.getItem('id')
        window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + ID, '_blank')
      },

      //选中省
      changeProvice() {
        let searchCity = {
          "areaPid": this.provice
        }
        this.$store.dispatch('initCityList', searchCity)
      },
      //分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //选中产品
      handleSelect(item) {
        console.log(item)
//        this.addOptions.ts_pt_Product_LineID = item.id;
//        this.updateAdminLinePrepareObj.ts_pt_Product_LineID = item.id;
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
            goodTitle: name ? name : '',
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
          var data = data.data;
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
      initData(page, lineID) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          page: page ? page : 1,
          rows: 5,
          "lineID": lineID ? lineID : ''
        }
        this.$store.dispatch('initAdminRouteDepartureCity', options)
          .then(total => {
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
        if (this.userSearchID) {
          this.initData(1, this.userSearchID)
        } else {
          this.$notify({
            message: '请选择筛选条件!',
            type: 'error'
          });
        }
      },
      //添加
      addAdminRouteDepartureCity() {

        for (let attr in this.addOptions.data) {
          if (typeof this.addOptions.data[attr] == 'object') {
            for (let attr1 in this.addOptions.data[attr]) {
              this.addOptions.data[attr][attr1] = ''
            }
          } else {
            this.addOptions.data[attr] = ''
          }
        }


        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addAdminRouteDepartureCitySubmit() {
        this.$store.dispatch('AddAdminRouteDepartureCity', this.addOptions)
          .then(() => {
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
            this.initData(1, this.addOptions.data.ts_cc_LineID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      updateAdminRouteDepartureCity(id) {
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('initUpdateAdminRouteDepartureCityObj', id)
      },
      //修改提交
      updateAdminRouteDepartureCitySubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_cc_ID": this.updateAdminRouteDepartureCityObj.ts_cc_ID,
            "ts_cc_LineID": this.updateAdminRouteDepartureCityObj.ts_cc_LineID,
            "ts_cc_Code": this.updateAdminRouteDepartureCityObj.ts_cc_Code,
            "ts_cc_Name": this.updateAdminRouteDepartureCityObj.ts_cc_Name,
          }
        };
        this.$store.dispatch('UpdateAdminRouteDepartureCity', updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(1, this.updateAdminRouteDepartureCityObj.ts_cc_LineID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      deleteAdminRouteDepartureCity(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminRouteDepartureCity', deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData(1, this.userSearchID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      }
    },
  }
</script>
<style scoped>

</style>
