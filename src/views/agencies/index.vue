<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">供应商信息</h1>
      <!--数据展示-->
      <el-table
        :data="adminSupplierList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%;padding-top: 50px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="供应商编号:">
                <span>{{ props.row.sm_ai_ID }}</span>
              </el-form-item>
              <el-form-item label="合作类型:">
                <span>{{ props.row.sm_ai_PPropertyID | getPProperType }}</span>
              </el-form-item>
              <el-form-item label="供应商手机号码:">
                <span>{{ props.row.sm_ai_Telephone }}</span>
              </el-form-item>

              <el-form-item label="公司名称:">
                <span>{{ props.row.sm_ai_GoodName}}</span>
              </el-form-item>

              <el-form-item label="公司地址:">
                <span>{{ props.row.sm_ai_Address}}</span>
              </el-form-item>
              <el-form-item label="注册成立时间:">
                <span>{{ props.row.sm_ai_RegTime}}</span>
              </el-form-item>
              <el-form-item label="注册资金:">
                <span>{{ props.row.sm_ai_RegMoney}}万元</span>
              </el-form-item>
              <el-form-item label="公司规模:">
                <span>{{ props.row.sm_ai_CompanyPersons}}</span>
              </el-form-item>
              <el-form-item label="结算币种:">
                <span>{{ props.row.sm_ai_BalanceCurrencyName}}</span>
              </el-form-item>
              <el-form-item label="优势产品说明:">
                <span>{{ props.row.sm_ai_GoodIntroduce}}</span>
              </el-form-item>
              <el-form-item label="已合作的网销渠道:">
                <span>{{ props.row.sm_ai_PartnerWay}}</span>
              </el-form-item>
              <el-form-item label="是否三证合一:">
                <span>{{ props.row.sm_ai_IncludeCert | getIncludeCert}}</span>
              </el-form-item>
              <el-form-item label="营业执照号:">
                <span>{{ props.row.sm_ai_CertNo}}</span>
              </el-form-item>
              <el-form-item label="证件有效期 :">
                <span>{{ props.row.sm_ai_CertExpireTo}}</span>
              </el-form-item>
              <el-form-item label="营业执照扫描件 :">
                <img alt="" v-for="item in props.row.sm_ai_CertImage"
                     style="width: 100px;height: 100px" v-show="props.row.sm_ai_CertImage.length" v-lazy="item">
              </el-form-item>
              <el-form-item label="税务登记号 :">
                <span>{{ props.row.sm_ai_FeeNo}}</span>
              </el-form-item>
              <el-form-item label="税务登记证扫描件 :">
                <img alt="" v-for="item in props.row.sm_ai_FeeImage"
                     style="width: 100px;height: 100px" v-show="props.row.sm_ai_FeeImage.length" v-lazy="item">
              </el-form-item>
              <el-form-item label="审核状态 :">
                <span>{{ props.row.sm_ai_IsPass | getPass}}</span>
              </el-form-item>
              <el-form-item label="审核失败原因:">
                <span>{{ props.row.sm_ai_FailReason}}</span>
              </el-form-item>
              <el-form-item label="创建时间 :">
                <span>{{ props.row.sm_ai_CreateTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商编号"
          prop="sm_ai_ID">
        </el-table-column>
        <el-table-column
          label="审核状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sm_ai_IsPass | getPass}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商手机号码"
          prop="sm_ai_Telephone">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.sm_ai_IsPass!=1"
              @click="updateAdminUserInfo(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="viewLook(scope.row.sm_ai_ID)">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--修改-->
    <el-dialog title="修改供应商信息" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-form :model="obj">
        <el-form-item label="供应商编号:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_ID" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="供应商手机号码:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_Telephone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_Email"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_GoodName"></el-input>
        </el-form-item>
        <el-form-item label="公司地址:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_Address"></el-input>
        </el-form-item>
        <el-form-item label="注册成立时间:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="obj.sm_ai_RegTime"
              type="date">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="注册资金:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_RegMoney" style="width:200px;"></el-input>
          万元
        </el-form-item>
        <el-form-item label="公司规模:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_CPropertyID">
            <el-option
              v-for="item in changeCompanyTypeList"
              :key="item.ts_jb_ID "
              :label="item.ts_jb_Name"
              :value="item.ts_jb_ID ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算币种:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_MPropertyID">
            <el-option
              v-for="item in changeMineyTypeList"
              :key="item.ts_jb_ID"
              :label="item.ts_jb_Name"
              :value="item.ts_jb_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择省:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_Provice" @change="changeProvince">
            <el-option
              v-for="item in provinceDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择市:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_City" @change="changeCity">
            <el-option
              v-for="item in cityDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择县:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_County">
            <el-option
              v-for="item in countyDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作类型:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_PPropertyID" @change="changeType">
            <el-option
              v-for="item in changeCooperationTypecList"
              :key="item.sm_cp_ID"
              :label="item.sm_cp_Name"
              :value="item.sm_cp_ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品优势说明:" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="obj.sm_ai_GoodIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="已合作的网销渠道:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_PartnerWay"></el-input>
        </el-form-item>
        <el-form-item label="是否三证合一:" :label-width="formLabelWidth">
          <el-select v-model="obj.sm_ai_IncludeCert" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业执照号:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_CertNo"></el-input>
        </el-form-item>
        <el-form-item label="证件有效期从:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="obj.sm_ai_CertExpireFrom"
              type="date">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="证件有效期到:" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="obj.sm_ai_CertExpireTo"
              type="date">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业执照扫描件:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传文件
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <img
            style="display: block"
            v-for="item in ImageURL1"
            width="280"
            height="125"
            :src="item"
            v-show="ImageURL1.length"
          >
          <div v-show="obj.sm_ai_CertImage.length&&!ImageURL1.length" v-for="item,index in obj.sm_ai_CertImage">
            <img :src="item" width="280" height="125">
          </div>
        </el-form-item>
        <el-form-item label="税务登记号:" :label-width="formLabelWidth">
          <el-input v-model="obj.sm_ai_FeeNo"></el-input>
        </el-form-item>
        <el-form-item label="税务登记证扫描件:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传文件
            <input type="file" name="" ref="upload2" accept="image/*" multiple>
          </a>
          <img
            style="display: block"
            v-for="item in ImageURL2"
            width="280"
            height="125"
            :src="item"
            v-show="ImageURL2.length"
          >
          <div v-show="obj.sm_ai_FeeImage.length&&!ImageURL2.length" v-for="item,index in obj.sm_ai_FeeImage">
            <img :src="item" width="280" height="125">
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminUserInfoSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看-->
    <el-dialog title="审核流程详情" :visible.sync="lookDialog" center width="70%">
      <el-table :data="lookList">
        <el-table-column
          align="center"
          prop="sm_cf_ID"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sm_cf_ID"
          label="办理人"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sm_cf_DoMan}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sm_cf_ID"
          label="办理状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sm_cf_DoStatus | getDoStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sm_cf_ID"
          label="办理意见"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sm_cf_Introduce}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sm_cf_ID"
          label="办理时间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sm_cf_CreateTime | getUseTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lookDialog = false">取 消</el-button>
        <el-button type="primary" @click="lookDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'

  export default {
    name: 'TravelAgency',
    computed: mapGetters([
      'adminSupplierList',
      'adminSupplierListObj',
      'changeScopeOfOperationList',
      'changeCompanyTypeList',
      'changeMineyTypeList',
      'changeCooperationTypecList',
      'lookList',
      'provinceDataList',
      'cityDataList',
      'countyDataList',
    ]),
    data() {
      return {
        lookDialog: false,
        menus: ['待审核', '已通过', '未通过'],
        activeIndex: '0',
        obj: {
          "agentInfo": {
            "sm_ai_ID": '',
            "sm_ai_BalanceCurrencyName": "",
            "sm_cs_ID": '',
            "sm_ai_CompanyPersons": "",
            "sm_ai_Name": "",
            "sm_ai_Sex": "",
            "sm_ai_Telephone": "",
            "sm_ai_FailReason": '',
            "sm_ai_SinglePay": '',
            "sm_ai_FixPhoneAreaCode": "",
            "sm_ai_FixPhoneContryCode": "",
            "sm_ai_FaxNo": "",
            "sm_ai_QQ": "",
            "sm_ai_Email": "",
            "sm_ai_GoodName": "",
            "sm_ai_Contry": "",
            "sm_ai_Provice": "",
            "sm_ai_City": "",
            "sm_ai_County": "",
            "sm_ai_Address": "",
            "sm_ai_RegTime": "",
            "sm_ai_RegMoney": '',
            "sm_ai_GoodIntroduce": "",
            "sm_ai_PartnerWay": "",
            "sm_ai_IncludeCert": '',
            "sm_ai_CertNo": "",
            "sm_ai_CertExpireFrom": "",
            "sm_ai_CertExpireTo": "",
            "sm_ai_CertImage": '',
            "sm_ai_FeeNo": "",
            "sm_ai_FeeImage": '',
            "sm_ai_OtherCert": "",
            "sm_ai_OtherImage": '',
            "sm_ai_IsPass": '',
            "sm_ai_AgentID": "",
            "sm_ai_Password": "",
            "sm_ai_CreateTime": "",
            "sm_ai_IsDelete": '',
            "sm_ai_ParentID": "",
            "sm_al_ID": '',
            "ts_to_IsBalance": ''
          },
          "agentInfoTypeList": [],
          "agentInfoScopeList": []
        },
        formLabelWidth: '140px',
        isLoading: false,
        userInfo: [],
        updateDialog: false,//修改弹窗
        isPass: '',
        options: [
          {
            value: 0,
            label: '否'
          },
          {
            value: 1,
            label: '是'
          }
        ],//是否三证合一
        ImageURL1: [],
        ImageURL2: [],
        isDisabled: true,
        ScopeOfOperationType: [],
        sm_cp_ID: '',
        agentInfoTypeName: '',
      }
    },
    created() {
      this.initData()
      let userInfo = JSON.parse(sessionStorage.getItem('admin'));
      this.isPass = userInfo.sm_ui_PassState;
      this.activeIndex = userInfo.sm_ui_PassState + '';
      this.changeCompanyType();
      this.changeMoneyType();
      this.changeCooperationTypeL();
      this.initProvince();
    },

    methods: {
      changeType(id){

      },
      //查看
      viewLook(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "userID": id,    //供应商商户号/用户编号
        };
        this.$store.dispatch('initLookList', options)
          .then(() => {
            this.$store.commit('setTranstionFalse');
            this.lookDialog = true;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      initData() {
        let userInfo = JSON.parse(sessionStorage.getItem('admin'))
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "sm_ai_Name": '',
          "sm_ai_ID": userInfo.sm_ui_ID,
          "page": 1,
          "rows": 5,
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminSupplier', options)
          .then(userInfo => {
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      uploadToOSS(file) {
        return new Promise((relove, reject) => {
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr + "/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            } else {
            }
          }
        })
      },
      //添加图片
      uploaNode() {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL1 = [];
                      this.ImageURL1.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
              }
            })
          }
          ;
          if (this.$refs.upload2) {
            this.$refs.upload2.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload2.files.length; i++) {
                this.uploadToOSS(this.$refs.upload2.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL2 = [];
                      this.ImageURL2.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
              }
            })
          }
          ;
        }, 30)
      },
      initProvince() {
        let getAreaProvice = {
          "areaPid": 3337
        };
        this.$store.dispatch('initProvinceData', getAreaProvice)
      },
//选择省
      changeProvince(id) {
        let getCity = {
          "areaPid": id ? id : ''
        };
        return this.$store.dispatch('initCityData', getCity)
      },

      //选择市
      changeCity(id) {
        let getCounty = {
          "areaPid": id ? id : ''
        };
        return this.$store.dispatch('initCountyData', getCounty)
      },
      async arrInit(obj) {
        await this.changeProvince(obj.sm_ai_Provice)
        await this.changeCity(obj.sm_ai_City)
      },
      //公司规模
      changeCompanyType() {
        var selectCompanySize = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_jb_ID": "",
          "ts_jb_Name": "",
          "ui_jb_ParentID": "46"
        };
        return this.$store.dispatch('initEducation', selectCompanySize)
      },
      //查询结算币种
      changeMoneyType() {
        var selectBalanceCurrency = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_jb_ID": "",
          "ts_jb_Name": "",
          "ui_jb_ParentID": "45"
        }
        return this.$store.dispatch('initEducation', selectBalanceCurrency)
      },
      //合作类型
      changeCooperationTypeL() {
        var selectCooperationType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "sm_cp_ID": "",
          "sm_cp_Name": "",
          "sm_cp_IsDelete": 0
        };
        this.$store.dispatch('initChangeCooperationType', selectCooperationType)
      },
      //修改
      updateAdminUserInfo(obj) {
        this.arrInit(obj)
          .then(() => {
            this.obj = obj;
            this.updateDialog = true;
            this.$store.commit('setTranstionFalse');
            this.uploaNode()
          },err=>{
            console.log(err)
          })
      },
//      修改提交
      updateAdminUserInfoSubmit() {
        if (!this.obj.sm_ai_PPropertyID) {
          this.$notify({
            message: '请选择合作类型!!',
            type: 'error'
          });
          return
        }

        this.obj.sm_ai_CertImage = this.ImageURL1.join(',');
        this.obj.sm_ai_FeeImage = this.ImageURL2.join(',');
        let updateAgentInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.obj
        }
        this.$store.dispatch('updateAdminUserInfoSubmit', updateAgentInfo)
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
      }
    },
    mounted() {

    }
  }
</script>
<style scoped>

</style>
