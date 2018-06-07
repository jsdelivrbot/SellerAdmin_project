<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">票种</h1>

      <!--查询栏-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>票种编码筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="siteId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="Add">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>


      <!--数据展示-->

      <el-table
        :data="ticketTypeList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="票种编码">
                <span>{{ props.row.tm_tt_ID }}</span>
              </el-form-item>
              <el-form-item label="景点名称">
                <span>{{ props.row.tm_ts_Name}}</span>
              </el-form-item>
              <el-form-item label="票种名称">
                <span>{{ props.row.tm_tt_Name }}</span>
              </el-form-item>
              <el-form-item label="商户编码">
                <span>{{ props.row.tm_tt_TradeInfoID }}</span>
              </el-form-item>
              <el-form-item label="票种助记码">
                <span>{{ props.row.tm_tt_HelpCode }}</span>
              </el-form-item>
              <el-form-item label="票种图片">
                <img v-for="item,index in props.row.tm_tt_Image" :src="item" alt="" :key="index" width="300"
                     height="150">
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.tm_tt_Description }}</span>
              </el-form-item>
              <el-form-item label="允许超过天数">
                <span>{{ props.row.tm_tt_ExpireDay }}天</span>
              </el-form-item>
              <el-form-item label="提前预定时间">
                <span>{{ props.row.tm_tt_BeforeTime }}分钟</span>
              </el-form-item>
              <el-form-item label="票价">
                <span>{{ props.row.tm_tt_TicketPrice }}元</span>
              </el-form-item>
              <el-form-item label="实际价格">
                <span>{{ props.row.tm_tt_RealPrice }}元</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.tm_tt_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="票种编码"
          prop="tm_tt_ID">
        </el-table-column>
        <el-table-column
          label="票种名称"
          prop="tm_tt_Name">
        </el-table-column>
        <el-table-column
          label="景点名称"
          prop="tm_ts_Name">
        </el-table-column>
        <el-table-column
          label="实际价格"
          prop="tm_tt_RealPrice">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="update(scope.row.tm_tt_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteTicketType(scope.row.tm_tt_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加票种-->

      <el-dialog title="添加票种信息" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="票种名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_Name"></el-input>
          </el-form-item>
          <el-form-item label="景点名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.tm_ts_Code" placeholder="请选择">
              <el-option
                v-for="item in ticketAttractionsList"
                :key="item.tm_ts_Code"
                :label="item.tm_ts_Name"
                :value="item.tm_ts_Code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="票种助记码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_HelpCode"></el-input>
          </el-form-item>
          <el-form-item label="票种图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">上传文件
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <img
              style="display: block"
              v-for="item in ImageURL"
              :src="item"
              width="280"
              height="125"
              v-show="ImageURL.length"
            >
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_Description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="允许超过天数:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_ExpireDay" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="提前预定时间:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_BeforeTime" placeholder="请输入分钟数且为数字"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_Remark" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="票价:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_TicketPrice" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="实际价格:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_RealPrice" placeholder="请输入数字"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改票种-->

      <el-dialog title="修改票种信息" :visible.sync="updateDialog">
        <el-form :model="updateTicketTypeObj">
          <el-form-item label="票种名称:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_Name"></el-input>
          </el-form-item>
          <el-form-item label="景点编码:" :label-width="formLabelWidth">
            <el-select v-model="updateTicketTypeObj.tm_ts_Code" placeholder="请选择">
              <el-option
                v-for="item in ticketAttractionsList"
                :key="item.tm_ts_Code"
                :label="item.tm_ts_Name"
                :value="item.tm_ts_Code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="票种助记码:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_HelpCode"></el-input>
          </el-form-item>
          <el-form-item label="票种图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">上传文件
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <img
              v-if="updateTicketTypeObj.tm_tt_Image.length&&!ImageURL.length"
              style="display: block"
              v-for="item,index in updateTicketTypeObj.tm_tt_Image"
              :src="item"
              width="280"
              height="125"
            >
            <img
              style="display: block"
              v-for="item,index in ImageURL"
              :src="item"
              width="280"
              height="125"
              v-show="ImageURL.length"
            >
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_Description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="允许超过天数:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_ExpireDay" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="提前预定时间:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_BeforeTime" placeholder="请输入分钟数且为数字"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_Remark" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="票价:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_TicketPrice" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="实际价格:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_RealPrice" placeholder="请输入数字"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>

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

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'ticketTypeList',
      'ticketAttractionsList',
      'updateTicketTypeObj'
    ]),
    data() {
      return {
        loginId: '',
        siteId: '',
        total: 0,
        addDialog: false,
        formLabelWidth: '120px',
        addOptions: {
          "tm_ts_Code": "",//景点编号
          "tm_tt_Name": "",//票种名称
          "tm_tt_TradeInfoID": "",//商户编码
          "tm_tt_HelpCode": "",//票种助记码
          "tm_tt_Image": "",//票种图片
          "tm_tt_Description": "",//描述
          "tm_tt_ExpireDay": "",//允许超过天数
          "tm_tt_BeforeTime": "",//提前预定时间(分钟)
          "tm_tt_Remark": "",//备注(门票描述属性)
          "tm_tt_TicketPrice": "",//票价
          "tm_tt_RealPrice": "",//实际价格
        },
        ImageURL: [],
        updateDialog: false,
      }
    },
    methods: {

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

        }, 30)
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
          "tm_ts_TradeInfoID": this.loginId.sm_ai_ID,//供应商编码
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
      //分页
      handleCurrentChange(num) {
        this.initData('', num)
      },
      //初始化数据
      initData(id, num) {
        let getTicketTypePriceList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "tm_ts_Code": id ? id : '',
          "tm_tt_TradeInfoID": this.loginId.sm_ai_ID,
          "tm_tt_IsDelete": 0,
          "page": num ? num : 1,
          "rows": 5
        };
        this.$store.dispatch('initTicketType', getTicketTypePriceList)
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
        this.initData(this.siteId)
      },
      // 添加按钮
      Add() {
        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode();
      },
      //添加提交
      addSubmit() {
        this.addOptions.tm_tt_TradeInfoID = this.loginId.sm_ai_ID;
        this.addOptions.tm_tt_Image = this.ImageURL.join(',');
        let insertTicketType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.addOptions
        };
        this.$store.dispatch('addTicketTypeSubmit', insertTicketType)
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
      update(id) {
        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        this.$store.commit('updateTicketType', id);
        this.updateDialog = true;
        this.uploaNode();
      },

      //修改提交
      updateSubmit() {
        if (this.ImageURL.length) {
          this.updateTicketTypeObj.tm_tt_Image = this.ImageURL.join(',');
        } else {
          this.updateTicketTypeObj.tm_tt_Image = this.updateTicketTypeObj.tm_tt_Image.join(',');
        }
        let updateTicketType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.updateTicketTypeObj
        }
        this.$store.dispatch('updateTicketTypeSubmit', updateTicketType)
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
      deleteTicketType(id) {
        let deleteTicketType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "tm_tt_ID": id,
          }

        };
        this.$store.dispatch('deleteTicketType', deleteTicketType)
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
      }
    },

    created() {
      this.loginId = JSON.parse(sessionStorage.getItem('admin'));
      this.initTicketAttraction();
      this.initData();
    }
  }
</script>
<style scoped>
</style>
