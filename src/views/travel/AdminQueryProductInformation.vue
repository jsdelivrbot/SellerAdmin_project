<template>
  <div>
    <div id="wrap" class="clearfix">
      <!--<div>-->
        <!--<p style="font-weight: bold;font-size: 20px;margin-bottom: 20px">添加流程:</p>-->
        <!--<el-tree :data="data" :props="defaultProps" :default-expand-all="isOff"></el-tree>-->
      <!--</div>-->

      <h1 class="userClass">产品线路信息</h1>

      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>

          </el-form-item>
          <el-form-item>
            <span>产品筛选:</span>
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
            <el-button type="primary" @click="addAdminQueryProductInformation" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminProductLine"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="线路编号">
                <span>{{ props.row.ts_pt_ID }}</span>
              </el-form-item>
              <el-form-item label="产品编号">
                <span>{{ props.row.ts_pt_GoodsListID }}</span>
              </el-form-item>
              <el-form-item label="行程名称">
                <span>{{ props.row.ts_pt_Name }}</span>
              </el-form-item>
              <el-form-item label="是否删除">
                <span>{{ props.row.ts_pt_IsDelete == 0 ? "未删除" : "已删除" }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.ts_pt_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="线路编号"
          prop="ts_pt_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="产品编号"
          prop="ts_pt_GoodsListID">
        </el-table-column>
        <el-table-column
          align="center"
          label="行程名称"
          prop="ts_pt_Name">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminQueryProductInformation(scope.row.ts_pt_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminQueryProductInformation(scope.row.ts_pt_ID)">删除
            </el-button>
            <el-button
              size="mini"
              @click="queryProductInformationDetail(scope.row.ts_pt_ID)"
            >
              产品线路详情
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
            </el-button>
            <!--<el-button-->
            <!--size="mini"-->
            <!--@click="productCharacteristicManagement(scope.row.ts_pt_ID)">产品特色管理-->
            <!--</el-button>-->
            <!--<el-button-->
            <!--size="mini"-->
            <!--@click="lineScheduleManagement(scope.row.ts_pt_ID)">线路日程管理-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加线路-->
    <el-dialog title="添加线路" :visible.sync="addAdminQueryProductInformationDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">
        <el-form-item label="产品名称:" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择产品"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="线路名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_pt_Name" placeholder="请输入线路名称"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminQueryProductInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminQueryProductInformationSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改线路-->
    <el-dialog title="修改线路" :visible.sync="updateAdminQueryProductInformationDialog" :close-on-click-modal="false">
      <el-form :model="updateAdminQueryProductInformationObj">
        <el-form-item label="产品名称:" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择产品"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="线路名称:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminQueryProductInformationObj.ts_pt_Name" placeholder="请输入线路名称"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminQueryProductInformationObj.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminQueryProductInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminQueryProductInformationSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'adminProductLine',
      'adminTradeGoodList',
      'updateAdminQueryProductInformationObj',
      'adminProductLineManagementId'
    ]),
    name: '',
    data() {
      return {
        data: [{
          label: '商家产品',
          children: [{
            label: '产品线路',
            children: [
              {
                label: '产品线路出发城市'
              },
              {
                label: '产品线路价格'
              },
              {
                label: '产品线路特色'
              },
              {
                label: '产品线路日程',
                children:[
                  {
                    label: '日程时间',
                    children:[
                      {
                        label: '时间活动',
                        children:[
                          {
                            label:'活动用餐'
                          },
                          {
                            label:'活动景点'
                          },
                          {
                            label:'活动购物'
                          },
                          {
                            label:'活动住宿'
                          },
                          {
                            label:'活动温馨提示'
                          },
                          {
                            label:'活动交通'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                label: '产品线路费用说明'
              }
            ]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isOff:true,
        userID: '',
        userName: '',
        initSearch: '',//查询参数
        isLoading: false,
        addAdminQueryProductInformationDialog: false,//添加弹窗
        updateAdminQueryProductInformationDialog: false,//修改弹窗
        value: '',
        formLabelWidth: '120px',
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_pt_GoodsListID": "",
            "ts_pt_Name": "",
            "ts_pt_Remark": ""
          }
        }
      }
    },
    created(){

      let lineID = this.$route.query.lineID;
      if (lineID) {
        this.initData(lineID)
      }
    },
    methods: {
      jump(obj){

        if(obj.ts_pt_GoodsListID){
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + obj.ts_pt_GoodsListID, '_blank')
        }else{
          this.$notify({
            title: '警告',
            message: '产品编号为空。。。',
            type: 'warning'})
        }

      },
      toMerch(){
        sessionStorage.setItem('index',0);
        this.$router.push({name:'AdminMerchantProducts'})
      },

      handleSelect(item) {
        this.value = item.id;
        this.updateAdminQueryProductInformationObj.ts_pt_GoodsListID = item.id;
        this.userName = item.value;
        this.userID = item.id;
        this.initData(item.id)
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
            "rows": 20
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
      //初始化数据
      initData(options) {
        let GetProductLine = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          isDelete: 0,
          goodID: options ? options : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminProductLine', GetProductLine)
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
        if (this.value.trim() == '') {
          this.$notify({
            message: '请选择对应产品!',
            type: 'error'
          });
          return;
        }
        this.addOptions.data.ts_pt_GoodsListID = this.value;
        this.initData(this.value.trim())
      },
      //查询初始化数据
      searchInitData() {
        if (this.adminProductLineManagementId) {
          this.initData(this.adminProductLineManagementId)
        }
      },
      //添加
      addAdminQueryProductInformation() {

        for(let attr in this.addOptions.data){
          if(typeof this.addOptions.data[attr]=='object'){
            for(let attr1 in this.addOptions.data[attr]){
              this.addOptions.data[attr][attr1] = ''
            }
          }else{
            this.addOptions.data[attr] = ''
          }
        }

        this.$store.commit('setTranstionFalse');
        this.addAdminQueryProductInformationDialog = true
      },
      //添加提交
      addAdminQueryProductInformationSubmit() {
        this.addOptions.data.ts_pt_GoodsListID = this.value;
        this.$store.dispatch('AddAdminQueryProductInformationSubmit', this.addOptions)
        .then(() => {
          this.$notify({
            message: '添加成功!',
            type: 'success'
          });
          this.initData(this.value)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addAdminQueryProductInformationDialog = false;
      },
      //修改
      updateAdminQueryProductInformation(id) {
        this.updateAdminQueryProductInformationDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminQueryProductInformationObj', id);
      },
      //修改提交
      updateAdminQueryProductInformationSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_pt_ID": this.updateAdminQueryProductInformationObj.ts_pt_ID,
            "ts_pt_GoodsListID": this.updateAdminQueryProductInformationObj.ts_pt_GoodsListID,
            "ts_pt_Name": this.updateAdminQueryProductInformationObj.ts_pt_Name,
            "ts_pt_Remark": this.updateAdminQueryProductInformationObj.ts_pt_Remark
          }
        };
        this.$store.dispatch('UpdateAdminQueryProductInformation', updateOptions)
        .then(() => {
          this.$notify({
            message: '修改成功!',
            type: 'success'
          });
          this.initData(this.updateAdminQueryProductInformationObj.ts_pt_GoodsListID)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateAdminQueryProductInformationDialog = false;
      },
      //删除
      deleteAdminQueryProductInformation(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data":{
            "ts_pt_ID":id
          }
        };
        this.$store.dispatch('DeleteAdminQueryProductInformation', deleteOptions)
        .then(() => {
          this.$notify({
            message: '删除成功!',
            type: 'success'
          });
          this.initData(this.value);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
      },
      //点击跳转到产品特色管理
      productCharacteristicManagement(id) {
        this.$store.commit('adminProductCharacteristicManagementId', id);
        //this.$router.push({name: 'AdminProductFeatures'})
        this.$router.push({path: '/travel/AdminProductFeatures'})
        sessionStorage.setItem('index', '3')
      },
      //点击跳转到线路日程管理
      queryProductInformationDetail(id) {
        this.$store.commit('adminLineScheduleManagementId', id);
        // this.$router.push({name: 'AdminQueryProductInformationList'})
        this.$router.push({path: '/travel/adminQueryProductInformationList'})
        sessionStorage.setItem('index', '2')
      }
    },
    mounted(){
      this.searchInitData()
    }
  }
</script>
<style>
</style>
