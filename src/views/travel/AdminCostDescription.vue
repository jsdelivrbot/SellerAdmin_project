<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">费用说明</h1>
      <div style="float: right;padding-right: 30px">
        <el-button type="primary" @click="addAdminCostDescription" size="small">新增</el-button>
      </div>

      <!--数据展示-->
      <el-table
        :data="adminProductLine"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="线路编号:">
                <span>{{ props.row.ts_pt_ID }}</span>
              </el-form-item>
              <el-form-item label="线路名称:">
                <span>{{ props.row.ts_pt_Name }}</span>
              </el-form-item>
              <el-form-item label="退改政策:">
                <div v-html="props.row.ts_pt_ReturnRule"></div>
              </el-form-item>
              <el-form-item label="费用包含:">
                <div v-html="props.row.ts_pt_FeeIn"></div>
              </el-form-item>
              <el-form-item label="费用不包含:">
                <div v-html="props.row.ts_pt_FeeNotIn"></div>
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
          label="线路名称"
          prop="ts_pt_Name">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminCostDescription(scope.row)">修改
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

      <!--添加费用说明-->

      <el-dialog title="添加费用说明" :visible.sync="addDialog" :close-on-click-modal="false" width="60%">
        <el-form :model="addOptions">
          <el-form-item label="退改政策:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_ReturnRule"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_ReturnRule" ref="tm"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_OpenTime" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="费用包含:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_FeeIn"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_FeeIn"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_SpecialPolicy" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="费用不包含:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_FeeNotIn"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_FeeNotIn"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="cacheForm">取 消</el-button>-->
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改预定须知-->

      <el-dialog title="修改费用说明" :visible.sync="updateDialog" :close-on-click-modal="false" width="60%">
        <el-form :model="updateOptions">
          <el-form-item label="退改政策:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_ReturnRule"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_ReturnRule"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_OpenTime" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="费用包含:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_FeeIn"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_FeeIn"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_SpecialPolicy" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="费用不包含:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_FeeNotIn"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_FeeNotIn"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Editor from '@/components/Editor'
  import {getEscapeVal} from '@/assets/js/public'
  // import Tinymce from '@/components/NewTinymce'
  export default {
    name: '',
    props: ['id'],
    components: {
      // Tinymce
      Editor
    },
    computed: mapGetters([
      'adminProductLine'
    ]),
    data() {
      return {
        lineObj: {},
        tinymceHeight: 800,
        addDialog: false,
        formLabelWidth: '120px',
        isLoading: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
            ts_pt_GoodsListID: '',
            "ts_pt_ID": "",//线路编号
            "ts_pt_ReturnRule": "",//退改政策      富文本格式
            ts_pt_FeeIn: '',//费用包含
            ts_pt_FeeNotIn: '',//费用不包含
          }
        },
        updateOptions: {},
        updateDialog: false
      }
    },
    created() {
      let lineObj = sessionStorage.getItem('lineObj');
      if (lineObj) {
        this.lineObj = JSON.parse(lineObj);
        this.initData(this.lineObj)
      }
      let AdminQueryProductInformationListName = sessionStorage.getItem('AdminQueryProductInformationListName')
      if (AdminQueryProductInformationListName !== '预订须知') {
        sessionStorage.setItem('AdminQueryProductInformationListName', '费用说明')
      }

    },
    methods: {
      cacheForm() {
        this.addDialog = false

        window.location.reload()
      },

      jump(obj) {
        let MerchanID = sessionStorage.getItem('MerchanID')
        if (MerchanID) {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + MerchanID, '_blank')
        }
      },
      //添加
      addAdminCostDescription() {
        for (let attr in this.addOptions.data) {
          this.addOptions.data[attr] = ''
        }
        let textArr = document.querySelectorAll('.w-e-text')
        if (textArr && textArr.length) {
          for (var i = 0; i < textArr.length; i++) {
            textArr[i].innerHTML = ''
          }
        }

        this.addDialog = true
      },
      initData(obj) {
        let GetProductLine = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          isDelete: 0,
          goodID: obj.ts_pt_GoodsListID
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
        this.addDialog = false
      },
      //添加提交
      addSubmit() {
        this.addOptions.data.ts_pt_GoodsListID = this.lineObj.ts_pt_GoodsListID;
        this.addOptions.data.ts_pt_ID = this.id;
//        console.log(this.addOptions.data)
//        return
        this.$store.dispatch('UpdateAdminQueryProductInformation', this.addOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            window.location.reload()
//          this.initData(this.lineObj)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //修改
      updateAdminCostDescription(obj) {
        this.updateOptions = obj;
        this.updateDialog = true
      },
      //修改提交
      updateSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
            ts_pt_GoodsListID: this.lineObj.ts_pt_GoodsListID,
            "ts_pt_ID": this.id,//线路编号
            "ts_pt_ReturnRule": getEscapeVal(this.updateOptions.ts_pt_ReturnRule),//退改政策      富文本格式
            ts_pt_FeeIn: getEscapeVal(this.updateOptions.ts_pt_FeeIn),//费用包含
            ts_pt_FeeNotIn: getEscapeVal(this.updateOptions.ts_pt_FeeNotIn),//费用不包含
          }
        }
        this.$store.dispatch('UpdateAdminQueryProductInformation', updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.lineObj)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false
      }
    },
  }
</script>
<style scoped>

</style>
