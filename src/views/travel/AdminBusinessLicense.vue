<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">商家营业执照管理</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>商家产品名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-autocomplete
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入商家名称"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="addAdminBusinessLicense">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
      :data="adminBusinessLicenseList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标识:">
              <span>{{ props.row.ts_bl_ID }}</span>
            </el-form-item>
            <el-form-item label="商家编码:">
              <span>{{ props.row.ts_bl_TradeInfoID }}</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码:">
              <span>{{ props.row.ts_bl_Code }}</span>
            </el-form-item>
            <el-form-item label="名称:">
              <span>{{ props.row.ts_bl_Name }}</span>
            </el-form-item>
            <el-form-item label="类型:">
              <span>{{ props.row.ts_bl_Type }}</span>
            </el-form-item>
            <el-form-item label="商家营业执照图片:">
              <span>{{ props.row.ts_bl_LicenceImage }}</span>
            </el-form-item>
            <el-form-item label="住所:">
              <span>{{ props.row.ts_bl_Address }}</span>
            </el-form-item>
            <el-form-item label="法定代表人:">
              <span>{{ props.row.ts_bl_LegalPerson }}</span>
            </el-form-item>
            <el-form-item label="注册资本:">
              <span>{{ props.row.ts_bl_RegisterMoney }}</span>
            </el-form-item>
            <el-form-item label="成立日期:">
              <span>{{ props.row.ts_bl_CreateDate.replace(/(T|Z)/g, " ") }}</span>
            </el-form-item>
            <el-form-item label="营业期限从:">
              <span>{{ props.row.ts_bl_DateFrom.replace(/(T|Z)/g, " ") }}</span>
            </el-form-item>
            <el-form-item label="营业期限到:">
              <span>{{ props.row.ts_bl_DateTo.replace(/(T|Z)/g, " ") }}</span>
            </el-form-item>
            <el-form-item label="经营范围:">
              <span>{{ props.row.ts_bl_ScopeBusiness }}</span>
            </el-form-item>
            <el-form-item label="登记机关:">
              <span>{{ props.row.ts_bl_RegPlace }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.ts_bl_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="是否删除:">
              <span>{{ props.row.ts_bl_IsDelete == 0 ? '未删除' : '已删除' }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ts_bl_Remark }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="标识"
        prop="ts_bl_ID">
      </el-table-column>
      <el-table-column
        align="center"
        label="名称"
        prop="ts_bl_Name">
      </el-table-column>
      <el-table-column
        align="center"
        label="登记机关"
        prop="ts_bl_RegPlace">
      </el-table-column>
      <el-table-column
        align="center"
        label="经营范围"
        prop="ts_bl_ScopeBusiness">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminBusinessLicense(scope.row.ts_bl_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminBusinessLicense(scope.row.ts_bl_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
    <!--添加商家营业执照-->
    <el-dialog title="添加商家营业执照" :visible.sync="addAdminBusinessLicenseDialog">
      <el-form :model="insertTradeLicence">
        <el-form-item label="统一社会信用代码(ID):" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_Code"></el-input>
        </el-form-item>
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_Name"></el-input>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_Type"></el-input>
        </el-form-item>
        <el-form-item label="商家营业执照图片:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">展示图片上传
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <p v-for="item in ImageURL" v-show="ImageURL.length">{{item ? item : ""}}</p>
          <!--<el-input v-model="addAdminBusinessLicenseObj.ts_bl_LicenceImage"></el-input>-->
        </el-form-item>
        <el-form-item label="住所:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_Address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_LegalPerson"></el-input>
        </el-form-item>
        <el-form-item label="注册资本:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_RegisterMoney"></el-input>
        </el-form-item>
        <el-form-item label="成立日期:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="insertTradeLicence.data.ts_bl_CreateDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业期限从:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="insertTradeLicence.data.ts_bl_DateFrom"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业期限到:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_DateTo"></el-input>
          <span style="color: #f60">(输入格式:yyyy-MM-dd或长期)</span>
        </el-form-item>
        <el-form-item label="经营范围:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_ScopeBusiness"></el-input>
        </el-form-item>
        <el-form-item label="登记机关:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_RegPlace"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="insertTradeLicence.data.ts_bl_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminBusinessLicenseDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminBusinessLicenseSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改商家营业执照-->
    <el-dialog title="修改商家营业执照" :visible.sync="updateAdminBusinessLicenseDialog">
      <el-form :model="updateAdminBusinessLicenseObj">
        <el-form-item label="统一社会信用代码(ID):" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_Code"></el-input>
        </el-form-item>
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_Name"></el-input>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_Type"></el-input>
        </el-form-item>
        <el-form-item label="商家营业执照图片:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">展示图片上传
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <p v-for="item in ImageURL" v-show="ImageURL.length">{{item ? item : ""}}</p>
        </el-form-item>
        <el-form-item label="住所:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_Address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_LegalPerson"></el-input>
        </el-form-item>
        <el-form-item label="注册资本:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_RegisterMoney"></el-input>
        </el-form-item>
        <el-form-item label="成立日期:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="updateAdminBusinessLicenseObj.ts_bl_CreateDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业期限从:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="updateAdminBusinessLicenseObj.ts_bl_DateFrom"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业期限到:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_DateTo"></el-input>
          <span style="color: #f60">(输入格式:yyyy-MM-dd或长期)</span>
        </el-form-item>
        <el-form-item label="经营范围:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_ScopeBusiness"></el-input>
        </el-form-item>
        <el-form-item label="登记机关:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_RegPlace"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessLicenseObj.ts_bl_Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminBusinessLicenseDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminBusinessLicenseSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([
      'updateAdminMerchantProductsObj',
      'adminBusinessLicenseList',
      'updateAdminBusinessLicenseObj'
    ]),
    data() {
      return {
        userName: '',
        productsID: '',
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ta_tg_ID": "",
            "ta_tg_TradeID": "",
            "ta_tg_ItemInfoID": "",
            "ta_tg_Title": "",
            "ts_tg_Country": "",
            "ts_tg_Provice": "",
            "ts_tg_City": "",
            "ts_tg_GroupSite": "",
            "ta_tg_Describe": "",
            "ta_tg_ShowImage": "",
            "ta_tg_Remark": "",
            "ts_tg_ShowTop": '',
            "ts_tg_Special": '',
            "ts_tg_LongOut": '',
          }
        },
        isLoading: false,
        total: 0,
        addAdminBusinessLicenseDialog: false,
        updateAdminBusinessLicenseDialog: false,
        insertTradeLicence: {
          loginUserID: "huileyou",
          loginUserPass: 123,
          data: {
            ts_bl_Code: '',
            ts_bl_Name: '',
            ts_bl_Type: '',
            ts_bl_LicenceImage: '',
            ts_bl_Address: '',
            ts_bl_LegalPerson: '',
            ts_bl_RegisterMoney: '',
            ts_bl_CreateDate: '',
            ts_bl_DateFrom: '',
            ts_bl_DateTo: '',
            ts_bl_ScopeBusiness: '',
            ts_bl_RegPlace: '',
            ts_bl_Remark: ''
          }
        },
        formLabelWidth: '170px',
        ImageURL: [],
        ImageURL1: [],
      }
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(this.productsID.trim(), num);
      },
      //选中商家
      handleSelect(item) {
        this.userName = item.value;
        this.productsID = item.id;
        this.updateAdminMerchantProductsObj.ta_tg_TradeID = item.id;
        this.addOptions.data.ta_tg_TradeID = item.id;
      },
      //加载完
      loadAll(num, name) {
        return new Promise((relove, reject) => {
          var _this = this;
          var GetAdminBusinessInformationList = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "tbUserID": "",
            "tbName": name ? name : '',
            "isDelete": 0,
            "page": num ? num : 1,
            "rows": 5
          };
          //旅行社商户查询
          this.$store.dispatch('AdminBusinessInformationSearch', GetAdminBusinessInformationList)
            .then(data => {
              relove(data)
            }, err => {
              this.$message({
                message: err,
                type: 'error'
              });
            })
        })
      },
      //选择
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          data = data.map(item => {
            return {
              id: item.ts_tb_UserID,
              value: item.ts_tb_Name
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
      initData(id, page) {
        var GetTradeLicenceList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "blCode": "",
          "blName": "",
          "isDelete": 0,
          "page": page ? page : 1,
          "rows": 5
        };
        this.$store.dispatch('initAdminBusinessLicense', GetTradeLicenceList)
          .then(total => {
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      search() {
        this.initData()
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
//添加图片
      uploaNode() {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i]).then(data => {
                  this.$store.dispatch('uploadAdminImgs', {
                    imageData: data
                  })
                    .then(data => {
                      if (data) {
                        this.ImageURL.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                  this.$store.dispatch('uploadAdminImgs', {
                    imageData: data
                  })
                    .then(data => {
                      if (data) {
                        this.ImageURL.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
              }
            })
          }
        }, 30)
      },
      //添加商户营业执照
      addAdminBusinessLicense() {
        this.$store.commit('setTranstionFalse');
        this.addAdminBusinessLicenseDialog = true;
        this.uploaNode()
      },
      //添加提交
      addAdminBusinessLicenseSubmit() {
        this.insertTradeLicence.data.ts_bl_LicenceImage = this.ImageURL.join(',')
        this.$store.dispatch('addAdminBusinessLicenseSubmit', this.insertTradeLicence)
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
        this.addAdminBusinessLicenseDialog = false;
      },
      //初始化修改数据
      updateAdminBusinessLicense(id) {
        this.$store.commit('setTranstionFalse');
        this.$store.commit('updateAdminBusinessLicense', id)
        this.uploaNode()
        this.updateAdminBusinessLicenseDialog = true;
      },
      //修改提交
      updateAdminBusinessLicenseSubmit() {
        this.insertTradeLicence.data.ts_bl_LicenceImage = this.ImageURL.join(',')
        this.updateAdminBusinessLicenseObj.ts_bl_LicenceImage = this.ImageURL.join(',');
        var updateTradeLicence = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminBusinessLicenseObj
        };
        this.$store.dispatch('updateAdminBusinessLicenseSubmit', updateTradeLicence)
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
        this.updateAdminBusinessLicenseDialog = false;
      },
      //删除
      deleteAdminBusinessLicense(id) {
        var deleteTradeLicence = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "blID": id
        };
        this.$store.dispatch('deleteAdminBusinessLicense',deleteTradeLicence)
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
      }
    },
  }
</script>
<style>
</style>
