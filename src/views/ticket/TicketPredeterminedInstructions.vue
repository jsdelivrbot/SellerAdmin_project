<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">预定须知</h1>
      <!--添加-->
      <div class="search">
        <el-autocomplete
          size="mini"
          v-model="tourName"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入景点名称"
          @select="handleSelect"
        ></el-autocomplete>

        <el-button type="primary" @click="search" size="mini">查询</el-button>
        <el-button type="primary" @click="Add" size="mini">新增</el-button>
      </div>
      <!--数据展示-->

      <el-table
        :data="predeterminedInstructionsList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="预定须知编号:">
                <span>{{ props.row.tm_bk_ID }}</span>
              </el-form-item>
              <el-form-item label="开放时间:">
                <div v-html="props.row.tm_bk_OpenTime"></div>
                <!--<el-popover-->
                <!--ref="popover1"-->
                <!--placement="top-start"-->
                <!--title="开放时间"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_OpenTime">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover1 size="mini">移入查看</el-button>-->
              </el-form-item>
              <el-form-item label="特殊人群政策:">
                <div v-html="props.row.tm_bk_SpecialPolicy"></div>
                <!--<el-popover-->
                <!--ref="popover2"-->
                <!--placement="top-start"-->
                <!--title="特殊人群政策"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_SpecialPolicy">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover2 size="mini">移入查看</el-button>-->
              </el-form-item>
              <el-form-item label="预订提醒:">
                <div v-html="props.row.tm_bk_Remind"></div>
                <!--<el-popover-->
                <!--ref="popover3"-->
                <!--placement="top-start"-->
                <!--title="预订提醒"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_Remind">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover3 size="mini">移入查看</el-button>-->
              </el-form-item>
              <el-form-item label="温馨提示:">
                <div v-html="props.row.tm_bk_HappyNotice"></div>
                <!--<el-popover-->
                <!--ref="popover4"-->
                <!--placement="top-start"-->
                <!--title="温馨提示"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_HappyNotice">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover4 size="mini">移入查看</el-button>-->
              </el-form-item>
              <el-form-item label="发票说明:">
                <div v-html="props.row.tm_bk_TicketSay"></div>
                <!--<el-popover-->
                <!--ref="popover5"-->
                <!--placement="top-start"-->
                <!--title="发票说明"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_TicketSay">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover5 size="mini">移入查看</el-button>-->
              </el-form-item>
              <el-form-item label="退改规则:">
                <div v-html="props.row.tm_bk_ReturnRule"></div>
                <!--<el-popover-->
                <!--ref="popover6"-->
                <!--placement="top-start"-->
                <!--title="退改规则"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_ReturnRule">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover6 size="mini">移入查看</el-button>-->
              </el-form-item>
              <el-form-item label="特殊信息:">
                <div v-html="props.row.tm_bk_SpecialMessage"></div>
                <!--<el-popover-->
                <!--ref="popover7"-->
                <!--placement="top-start"-->
                <!--title="特殊信息"-->
                <!--trigger="hover"-->
                <!--:content="props.row.tm_bk_SpecialMessage">-->
                <!--</el-popover>-->
                <!--<el-button v-popover:popover7 size="mini">移入查看</el-button>-->
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="预定须知编号"
          prop="tm_bk_ID">
        </el-table-column>
        <el-table-column
          label="开放时间">
          <template slot-scope="scope">
            <div v-html="scope.row.tm_bk_OpenTime"></div>
            <!--<el-popover-->
            <!--ref="popover8"-->
            <!--placement="top-start"-->
            <!--title="开放时间"-->
            <!--trigger="hover"-->
            <!--:content="scope.row.tm_bk_OpenTime">-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover8 size="mini">移入查看</el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row)">删除
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="jump(scope.row)">预览效果
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加预定须知-->

      <el-dialog title="添加预定须知" :visible.sync="addDialog" :close-on-click-modal="false" width="60%">
        <el-form :model="addOptions">
          <el-form-item label="景点名称:" :label-width="formLabelWidth">

            <el-autocomplete
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>

          </el-form-item>
          <el-form-item label="开放时间:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_OpenTime"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_OpenTime" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_OpenTime" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="特殊人群政策:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_SpecialPolicy"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_SpecialPolicy" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_SpecialPolicy" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="预订提醒:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_Remind"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_Remind" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="温馨提示:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_HappyNotice"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_HappyNotice" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_HappyNotice" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="发票说明:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_TicketSay"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_TicketSay" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_TicketSay" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="退改规则:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_ReturnRule"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_ReturnRule" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_ReturnRule" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="特殊信息:" :label-width="formLabelWidth">
            <editor v-model="addOptions.tm_bk_SpecialMessage"></editor>
            <!--<tinymce :height="300" v-model="addOptions.tm_bk_SpecialMessage" ></tinymce>-->
            <!--<el-input v-model="addOptions.tm_bk_SpecialMessage" type="textarea"></el-input>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改预定须知-->
      <el-dialog title="修改预定须知" :visible.sync="updateDialog" :close-on-click-modal="false" width="60%">
        <el-form :model="updatePredeterminedInstructionsObj">
          <el-form-item label="景点名称:" :label-width="formLabelWidth">

            <el-autocomplete
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>

          </el-form-item>
          <el-form-item label="开放时间:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_OpenTime" ref="editor"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_OpenTime" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_OpenTime" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="特殊人群政策:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_SpecialPolicy" ref="editor1"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_SpecialPolicy" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_SpecialPolicy" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="预订提醒:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_Remind" ref="editor2"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_Remind" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_Remind" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="温馨提示:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_HappyNotice" ref="editor3"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_HappyNotice" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_HappyNotice" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="发票说明:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_TicketSay" ref="editor4"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_TicketSay" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_TicketSay" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="退改规则:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_ReturnRule" ref="editor5"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_ReturnRule" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_ReturnRule" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="特殊信息:" :label-width="formLabelWidth">
            <editor v-model="updatePredeterminedInstructionsObj.tm_bk_SpecialMessage" ref="editor6"></editor>
            <!--<tinymce :height="300" v-model="updatePredeterminedInstructionsObj.tm_bk_SpecialMessage" ></tinymce>-->
            <!--<el-input v-model="updatePredeterminedInstructionsObj.tm_bk_SpecialMessage" type="textarea"></el-input>-->
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
  // import Tinymce from '@/components/NewTinymce'
  import Editor from '@/components/Editor'
  import {getEscapeVal,goEscapeVal} from '@/assets/js/public'

  export default {
    name: '',
    components: {
      // Tinymce
      Editor
    },
    computed: mapGetters([
      'predeterminedInstructionsList',
      'ticketAttractionsList'
    ]),
    data() {
      return {
        tourName: '',
        siteName: '',
        isLoading: false,
        addOptions: {
          "tm_bk_TourSiteID": "",
          "tm_bk_OpenTime": "",
          "tm_bk_SpecialPolicy": "",
          "tm_bk_Remind": "",
          "tm_bk_HappyNotice": "",
          "tm_bk_TicketSay": "",
          "tm_bk_ReturnRule": "",
          "tm_bk_SpecialMessage": ""
        },
        addDialog: false,
        formLabelWidth: '120px',
        updateDialog: false,
        adminUserInfo: '',
        ticketAttractionsValue: '',
        updatePredeterminedInstructionsObj: {},
      }
    },
    methods: {
      jump(obj) {
        window.open('http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/' + this.ticketAttractionsValue, '_blank')
      },
      handleSelect(item) {
        this.ticketAttractionsValue = item.id;
        this.addOptions.tm_bk_TourSiteID = item.id;
        this.updatePredeterminedInstructionsObj.tm_bk_TourSiteID = item.id;
      },
      loadAll(num, name) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": "",    //景点编码
          "tm_ts_Name": name,//景点名称
          "tm_ts_TradeInfoID": this.adminUserInfo.sm_ui_ID,//供应商编码
          "tm_ts_IsDelete": 0,//必须传
          "tm_ts_IsPass": "",//是否通过审核(0审核中1通过审核2未通过审核)
          "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门)
          "tm_ts_ThemeTypeID": "",//主题编码
        };
        return this.$store.dispatch('initSearchTicketAttractions', options)

      },
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          data = data.map(item => {
            return {
              id: item.tm_ts_Code,
              value: item.tm_ts_Name
            }
          })
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
      },
      //初始化景点信息
      initTicketAttraction() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": "",    //景点编码
          "tm_ts_Name": "",//景点名称
          "tm_ts_TradeInfoID": this.adminUserInfo.sm_ui_ID,//供应商编码
          "tm_ts_IsDelete": 0,//必须传
          "tm_ts_IsPass": "",//是否通过审核(0审核中1通过审核2未通过审核)
          "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门)
          "tm_ts_ThemeTypeID": "",//主题编码
          "page": 1,
          "rows": 5
        };
        this.$store.dispatch('initTicketAttractions', options)
      },
      initData(id) {
        if (!id) {
          this.$notify({
            message: '请选择景点!!',
            type: 'error'
          });
          return
        }
        this.isLoading = true;
        let getBookKnow = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "tm_bk_TourSiteID": id,
        };
        this.$store.dispatch('initPredeterminedInstructions', getBookKnow)
          .then(() => {
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },

      search() {

        this.initData(this.ticketAttractionsValue)
      },

      Add() {
        let textArr = document.querySelectorAll('.w-e-text')
        if (textArr && textArr.length) {
          for (var i = 0; i < textArr.length; i++) {
            textArr[i].innerHTML = ''
          }
        }
        this.addDialog = true;
//        this.addOptions.tm_bk_TourSiteID = this.ticketAttractionsValue;
      },

      addSubmit() {
//        return
        let insertBookKnow = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.addOptions
        };
        this.$store.dispatch('addPredeterminedInstructionsSubmit', insertBookKnow)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
//            window.location.reload()

            this.initData(this.addOptions.tm_bk_TourSiteID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },

      update(obj) {
        for(let attr in obj){
          obj[attr] = goEscapeVal(obj[attr])
        }
        this.updatePredeterminedInstructionsObj = obj
        this.updateDialog = true;
        this.$nextTick(() => {
          this.$refs.editor.setHtml(obj.tm_bk_OpenTime)
          this.$refs.editor1.setHtml(obj.tm_bk_SpecialPolicy)
          this.$refs.editor2.setHtml(obj.tm_bk_Remind)
          this.$refs.editor3.setHtml(obj.tm_bk_HappyNotice)
          this.$refs.editor4.setHtml(obj.tm_bk_TicketSay)
          this.$refs.editor5.setHtml(obj.tm_bk_ReturnRule)
          this.$refs.editor6.setHtml(obj.tm_bk_SpecialMessage)
        })
      },

      updateSubmit() {
        for (var attr in this.updatePredeterminedInstructionsObj) {
          if (attr != 'tm_bk_ID' || attr != 'tm_bk_TourSiteID') {
            this.updatePredeterminedInstructionsObj[attr] = getEscapeVal(this.updatePredeterminedInstructionsObj[attr])
          }
        }
        let updateBookKnow = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.updatePredeterminedInstructionsObj
        };
        this.$store.dispatch('updatePredeterminedInstructionsSubmit', updateBookKnow)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.updatePredeterminedInstructionsObj.tm_bk_TourSiteID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateDialog = false;
      },
      //删除预订须知
      Delete(obj) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "gE+PQ5wMkJpDAR2sPoMCcUpZMMaLK5CJ8gwkgNXYxtfeq5GxZH0evU2mm9C422ufOJYTPRVRn4Myx9m5W4Xjyg==",
          "data": {
            "tm_bk_ID": obj.tm_bk_ID,//预定须知编号
          }
        }
        this.$store.dispatch('DeleteTicketPredeterminedInstructions', options)
          .then(() => {
            this.initData(obj.tm_bk_TourSiteID);
          })
      }
    },
    created() {
      this.adminUserInfo = JSON.parse(sessionStorage.getItem('admin'));
//      this.initTicketAttraction();
    }
  }
</script>
<style scoped>
  .search {
    margin: 20px;
  }
</style>
