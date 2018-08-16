<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">线路日程信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>线路日程筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              size="small"
              v-model="userName"
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
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="addAdminLinePrepare" size="small">新增</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-col>

      <el-table
        :data="adminLinePrepare"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="主键编号:">
                <span>{{ props.row.ts_pt_ID }}</span>
              </el-form-item>
              <el-form-item label="线路编号:">
                <span>{{ props.row.ts_pt_Product_LineID }}</span>
              </el-form-item>
              <el-form-item label="日程名称:">
                <span>{{ props.row.ts_pt_Name }}</span>
              </el-form-item>
              <el-form-item label="第几天日程:">
                <span>{{ props.row.ts_pt_Day }}</span>
              </el-form-item>
              <el-form-item label="线路日程详情:">
                <div v-html="props.row.ts_pt_Content"></div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="主键编号"
          prop="ts_pt_ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="线路编号"
          align="center"
          prop="ts_pt_Product_LineID">
        </el-table-column>
        <el-table-column
          label="日程名称"
          align="center"
          prop="ts_pt_Name">
        </el-table-column>
        <el-table-column
          label="第几天日程"
          align="center"
          prop="ts_pt_Day">
        </el-table-column>

        <el-table-column
          align="center"
          label="备注">
          <template slot-scope="props">
            <el-popover
              ref="popover1"
              placement="top-start"
              trigger="hover"
              :content="props.row.ts_pt_Remark">
            </el-popover>
            <el-button v-popover:popover1 size="small">移入查看</el-button>
          </template>

        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminLinePrepare(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminLinePrepare(scope.row.ts_pt_ID)">删除
            </el-button>

            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <!--修改线路日程-->
      <el-dialog title="修改线路日程" :visible.sync="updateAdminLinePrepareDialog" :close-on-click-modal="false"
                 @close="closeDialog" width="70%">
        <el-form :model="updateAdminLinePrepareObj">
          <el-form-item label="日程名称:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Name" placeholder="请输入日程名称"></el-input>
          </el-form-item>
          <el-form-item label="线路日程详情:" :label-width="formLabelWidth">
            <tinymce :height="1000" v-model="updateAdminLinePrepareObj.ts_pt_Content" ></tinymce>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
          <!--<el-button @click="updateAdminLinePrepareDialog = false">取 消</el-button>-->
          <el-button type="primary" @click="updateAdminLinePrepareSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Tinymce from '@/components/NewTinymce'

  export default {
    name: '',
    props:['id'],
    components: {
      Tinymce
    },
    data() {
      return {
        isUploaNode: true,
        options: [],
        updateActivityContentObj: {},
        addActivityContentDialog: false,
        updateActivityContentDialog: false,
        activityContent: '',
        GoodId: '',
        LineID: '',
        userName: '',
        ImageURL: [],
        ImageURL2: [],
        isLoading: false,
        userSearchID: '',
        formLabelWidth: '120px',
        addAdminLinePrepareDialog: false,
        updateAdminLinePrepareDialog: false,
        updateAdminLinePrepareObj: {},
        imageObj: {accept: 'image/*'},
        addRadioIndex: 0,
        addActiveIndex: 0,
        updateActiveIndex: 0,
      }
    },
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminQueryProductList',
      'adminLinePrepare',
    ]),
    methods: {
      jump(obj){
        let MerchanID = sessionStorage.getItem('MerchanID')
        if(MerchanID){
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/'+MerchanID,'_blank')
        }
      },
      closeDialog(){
        this.updateAdminLinePrepareDialog = false
      },
      cacheForm() {
        this.updateAdminLinePrepareDialog = false
      },
      //查询很多
      selectInitData(id, ParentID) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_gi_GoodID": id,//产品编号
          "ts_gi_ParentID": ParentID ? ParentID : ''
        }
        return this.$store.dispatch('initSelectInitAllData', options)
      },
      //选中产品
      handleSelect(item) {
//        this.addData.ts_pt_Product_LineID = item.id;
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
            "rows": 40
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
          var data = data.data
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
      initData(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID": id ? id : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminLinePrepare', options)
          .then(() => {
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        if (!this.userSearchID) {
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
        if (this.id) {
          this.initData(this.id)
        }
      },
      //修改
      updateAdminLinePrepare(obj) {
        this.updateAdminLinePrepareObj = obj
        this.updateAdminLinePrepareDialog = true;
//        this.$store.commit('initUpdateAdminLinePrepareObj',id)
      },
      //修改提交
      updateAdminLinePrepareSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          data: {
            "ts_pt_ID": this.updateAdminLinePrepareObj.ts_pt_ID,
            "ts_pt_Content":this.updateAdminLinePrepareObj.ts_pt_Content,
            "ts_pt_Name": this.updateAdminLinePrepareObj.ts_pt_Name,
            "ts_pt_Remark": this.updateAdminLinePrepareObj.ts_pt_Remark,
          }
        };
        this.$store.dispatch('UpdateAdminLinePrepare', updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.updateAdminLinePrepareObj.ts_pt_Product_LineID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateAdminLinePrepareDialog = false;
      },
      //删除
      deleteAdminLinePrepare(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminLinePrepare', deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //点击跳转日程时间管理
      scheduleTimeManagement(id) {
        this.$store.commit('adminScheduleTimeManagementId', id);
        this.$router.push({name: 'AdminScheduleTime'});
        sessionStorage.setItem('index', '3')
      }
    },
    created() {
      for (var i = 1; i < 21; i++) {
        this.options.push({
          value: i
        })
      }
      this.initData(this.id)
    },
    mounted() {
      this.searchInitData();
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
