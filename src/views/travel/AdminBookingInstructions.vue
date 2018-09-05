<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">预订须知</h1>
      <div style="float: right;padding-right: 30px">
        <el-button type="primary" @click="addAdminBookingInstructions" size="small">新增</el-button>
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
              <el-form-item label="出行须知:">
                <div v-html="props.row.ts_pt_BookKnow"></div>
              </el-form-item>
              <el-form-item label="特殊限制:">
                <div v-html="props.row.ts_pt_SpecialLimit"></div>
              </el-form-item>
              <el-form-item label="付款方式:">
                <div v-html="props.row.ts_pt_PayWay"></div>
              </el-form-item>
              <el-form-item label="违约责任:">
                <div v-html="props.row.ts_pt_LimitDuty"></div>
              </el-form-item>
              <el-form-item label="安全提示:">
                <div v-html="props.row.ts_pt_SafetyLimit"></div>
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
              @click="updateAdminBookingInstructions(scope.row)">修改
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

      <!--添加预定须知-->

      <el-dialog title="添加预定须知" :visible.sync="addDialog" :close-on-click-modal="false" width="60%">
        <el-form :model="addOptions">
          <el-form-item label="出行须知:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_BookKnow"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_BookKnow"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_OpenTime" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="特殊限制:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_SpecialLimit"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_SpecialLimit"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_SpecialPolicy" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="付款方式:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_PayWay"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_PayWay"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="违约责任:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_LimitDuty"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_LimitDuty"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="安全提示:" :label-width="formLabelWidth">
            <editor v-model="addOptions.data.ts_pt_SafetyLimit"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="addOptions.data.ts_pt_SafetyLimit"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_HappyNotice" type="textarea"></el-input>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="cacheForm">取 消</el-button>-->
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改预定须知-->

      <el-dialog title="修改预定须知" :visible.sync="updateDialog" :close-on-click-modal="false" width="60%">
        <el-form :model="updateOptions">
          <el-form-item label="出行须知:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_BookKnow" ref="editor"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_BookKnow"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_OpenTime" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="特殊限制:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_SpecialLimit" ref="editor1"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_SpecialLimit"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_SpecialPolicy" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="付款方式:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_PayWay" ref="editor2"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_PayWay"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="违约责任:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_LimitDuty" ref="editor3"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_LimitDuty"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="安全提示:" :label-width="formLabelWidth">
            <editor v-model="updateOptions.ts_pt_SafetyLimit" ref="editor4"></editor>
            <!--<tinymce :height="tinymceHeight" v-model="updateOptions.ts_pt_SafetyLimit"></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_HappyNotice" type="textarea"></el-input>-->
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
  // import Tinymce from '@/components/NewTinymce'
  import Editor from '@/components/Editor'
  import {getEscapeVal} from '@/assets/js/public'

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
        addData: {},
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
//            ts_pt_GoodsListID: '',
            ts_pt_ID: "",//线路编号
            ts_pt_BookKnow: "",//预定需知      富文本格式
            ts_pt_SafetyLimit: '',// 安全提示
            ts_pt_SpecialLimit: '',//特殊限制
            ts_pt_PayWay: '',//付款方式
            ts_pt_LimitDuty: '',//违约责任
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

    },
    methods: {
      jump(obj) {
        let MerchanID = sessionStorage.getItem('MerchanID')
        if (MerchanID) {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + MerchanID, '_blank')
        }
      },
      cacheForm() {

        window.location.reload()
        this.ImageURL = [],
          this.addDialog = false

      },
      //添加
      addAdminBookingInstructions() {

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
//        this.addOptions.data.ts_pt_GoodsListID = this.lineObj.ts_pt_GoodsListID;
        this.addOptions.data.ts_pt_ID = this.id;
//        console.log(this.addOptions.data)
//        return
        this.$store.dispatch('UpdateAdminQueryProductInformation', this.addOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
//          window.location.reload()
            this.initData(this.lineObj)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //修改
      updateAdminBookingInstructions(obj) {
        this.updateOptions = obj;
        this.$nextTick(()=>{
          this.$refs.editor.setHtml(obj.ts_pt_BookKnow)
          this.$refs.editor1.setHtml(obj.ts_pt_SpecialLimit)
          this.$refs.editor2.setHtml(obj.ts_pt_PayWay)
          this.$refs.editor3.setHtml(obj.ts_pt_LimitDuty)
          this.$refs.editor4.setHtml(obj.ts_pt_SafetyLimit)
        })
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
//            ts_pt_GoodsListID: this.lineObj.ts_pt_GoodsListID,
            "ts_pt_ID": this.id,//线路编号
            "ts_pt_BookKnow": getEscapeVal(this.updateOptions.ts_pt_BookKnow),//预定需知      富文本格式
            ts_pt_SafetyLimit: getEscapeVal(this.updateOptions.ts_pt_SafetyLimit),//特殊限制
            ts_pt_SpecialLimit: getEscapeVal(this.updateOptions.ts_pt_SpecialLimit),//安全提示
            ts_pt_PayWay: getEscapeVal(this.updateOptions.ts_pt_PayWay),//付款方式
            ts_pt_LimitDuty: getEscapeVal(this.updateOptions.ts_pt_LimitDuty)//违约责任
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
