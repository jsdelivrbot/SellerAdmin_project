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
              <el-form-item label="线路编号:">
                <span>{{ props.row.ts_pt_ID }}</span>
              </el-form-item>
              <el-form-item label="产品编号:">
                <span>{{ props.row.ts_pt_GoodsListID }}</span>
              </el-form-item>
              <el-form-item label="线路名称:">
                <span>{{ props.row.ts_pt_Name }}</span>
              </el-form-item>
              <el-form-item label="出发时间:">
                <span>{{ props.row.ts_pl_GoTime }}</span>
              </el-form-item>
              <el-form-item label="行程天数:">
                <span>{{ props.row.ts_pl_LineDays }}</span>
              </el-form-item>
              <el-form-item label="成团地点:">
                <span>{{ props.row.provice + props.row.city}}</span>
              </el-form-item>
              <el-form-item label="App中使用的图片:">
                <img v-lazy="item" alt="" v-for="item in props.row.ts_pt_Images">
              </el-form-item>
              <!--<el-form-item label="预定需知:">-->
              <!--<div v-html="props.row.ts_pt_BookKnow"></div>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="退改政策:">-->
              <!--<div v-html="props.row.ts_pt_ReturnRule"></div>-->
              <!--</el-form-item>-->
              <el-form-item label="推荐理由:">
                <div v-html="props.row.ts_pt_IntroReason"></div>
              </el-form-item>
              <el-form-item label="产品线路介绍:">
                <div v-html="props.row.ts_pt_Describe"></div>
              </el-form-item>

              <!--<el-form-item label="费用包含:">-->
              <!--<div v-html="props.row.ts_pt_FeeIn"></div>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="费用不包含:">-->
              <!--<div v-html="props.row.ts_pt_FeeNotIn"></div>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="行程明细:">-->
                <!--<div v-html="props.row.ts_pt_LineDetail"></div>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="违约责任:">-->
              <!--<div v-html="props.row.ts_pt_LimitDuty"></div>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="特殊限制:">-->
              <!--<div v-html="props.row.ts_pt_SpecialLimit"></div>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="安全限制:">-->
              <!--<div v-html="props.row.ts_pt_SafetyLimit"></div>-->
              <!--</el-form-item>-->

              <!--<el-form-item label="是否删除">-->
              <!--<span>{{ props.row.ts_pt_IsDelete == 0 ? "未删除" : "已删除" }}</span>-->
              <!--</el-form-item>-->
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
          label="线路名称"
          prop="ts_pt_Name">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminQueryProductInformation(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminQueryProductInformation(scope.row.ts_pt_ID)">删除
            </el-button>
            <el-button
              size="mini"
              @click="queryProductInformationDetail(scope.row)"
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
    <el-dialog title="添加线路" :visible.sync="addAdminQueryProductInformationDialog" :close-on-click-modal="false"
               width="1150px">
      <el-form :model="addOptions">
        <el-form-item label="线路名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_pt_Name" placeholder="请输入线路名称"></el-input>
        </el-form-item>
        <el-form-item label="出发时间:" :label-width="formLabelWidth">
          <el-time-select
            v-model="addOptions.data.ts_pl_GoTime"
            :picker-options="{
                start: '05:30',
                step: '00:05',
                end: '23:30'
              }"
            placeholder="选择时间">
          </el-time-select>
          <span style="color: #f60;padding-left: 20px">提示:后端使用前端不显示!</span>
        </el-form-item>
        <el-form-item label="行程天数:" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="addOptions.data.ts_pl_LineDays"
            :fetch-suggestions="querySearch"
            placeholder="请输入行程天数"
          ></el-autocomplete>
          <span style="color: #f60;padding-left: 20px">提示:后端使用前端不显示!</span>
        </el-form-item>
        <el-form-item label="成团地点:" :label-width="formLabelWidth">
          <el-select placeholder="请选择省份" @change="changeProvice" v-model="addOptions.data.ts_pl_GroupProvice">
            <el-option
              v-for="item in proviceList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>

          <el-select v-model="addOptions.data.ts_pl_GroupCity" placeholder="请选择市">
            <el-option
              v-for="item in cityList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="线路图片展示:" :label-width="formLabelWidth" required>
          <p style="font-weight: bold;color: #f60">App中使用的图片</p>
          <p>单张图片大小不能大于600KB</p>
          <Upload @getData="getData" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in ImageURL" style="display: inline-block;position: relative;margin-right: 70px">
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL.length"
              >
              <span style="color: #f60" @click="deleteImageURL(item)">X</span>
              <em>
                <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
              </em>
            </p>
          </div>
        </el-form-item>

        <!--<el-form-item label="预订须知:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_BookKnow" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="退改政策:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_ReturnRule" ></tinymce>-->
        <!--</el-form-item>-->
        <el-form-item label="推荐理由:" :label-width="formLabelWidth">
          <editor v-model="addOptions.data.ts_pt_IntroReason"></editor>
          <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_IntroReason" ></tinymce>-->
        </el-form-item>
        <el-form-item label="产品线路介绍:" :label-width="formLabelWidth">
          <editor v-model="addOptions.data.ts_pt_Describe"></editor>
          <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_Describe" ></tinymce>-->
        </el-form-item>
        <!--<el-form-item label="费用包含:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_FeeIn" ></tinymce>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="费用不包含:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_FeeNotIn" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="行程明细:" :label-width="formLabelWidth">-->
          <!--<editor v-model="addOptions.data.ts_pt_LineDetail"></editor>-->
          <!--&lt;!&ndash;<tinymce :height="300" v-model="addOptions.data.ts_pt_LineDetail" ></tinymce>&ndash;&gt;-->
        <!--</el-form-item>-->
        <!--<el-form-item label="违约责任:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_LimitDuty" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="特殊限制:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_SpecialLimit" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="安全限制:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="addOptions.data.ts_pt_SafetyLimit" ></tinymce>-->
        <!--</el-form-item>-->
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="cacheForm">取 消</el-button>-->
        <el-button @click="addAdminQueryProductInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminQueryProductInformationSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改线路-->
    <el-dialog title="修改线路" :visible.sync="updateAdminQueryProductInformationDialog" :close-on-click-modal="false"
               width="70%">
      <el-form :model="updateAdminQueryProductInformationObj">
        <!--<el-form-item label="产品名称:" :label-width="formLabelWidth">-->
        <!--<el-autocomplete-->
        <!--v-model="userName"-->
        <!--:fetch-suggestions="querySearchAsync"-->
        <!--placeholder="请选择产品"-->
        <!--@select="handleSelect"-->
        <!--&gt;</el-autocomplete>-->
        <!--</el-form-item>-->
        <el-form-item label="线路名称:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminQueryProductInformationObj.ts_pt_Name" placeholder="请输入线路名称"></el-input>
        </el-form-item>


        <el-form-item label="出发时间:" :label-width="formLabelWidth">
          <el-time-select
            v-model="updateAdminQueryProductInformationObj.ts_pl_GoTime"
            :picker-options="{
                start: '05:30',
                step: '00:10',
                end: '18:30'
              }"
            placeholder="选择时间">
          </el-time-select>
          <span style="color: #f60;padding-left: 20px">提示:后端使用前端不显示!</span>
        </el-form-item>
        <el-form-item label="行程天数:" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="updateAdminQueryProductInformationObj.ts_pl_LineDays"
            :fetch-suggestions="querySearch"
            placeholder="请输入行程天数"
          ></el-autocomplete>
          <span style="color: #f60;padding-left: 20px">提示:后端使用前端不显示!</span>
        </el-form-item>
        <el-form-item label="成团地点:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminQueryProductInformationObj.provice" placeholder="请选择省份"
                     @change="updateChangeProvice">
            <el-option
              v-for="item in proviceList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>

          <el-select v-model="updateAdminQueryProductInformationObj.city" placeholder="请选择市" @change="updateCity">
            <el-option
              v-for="item in cityList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="展示图片:" :label-width="formLabelWidth">
          <p style="font-weight: bold;color: #f60">App中使用的图片格式</p>
          <p>单张图片大小不能大于600KB</p>
          <Upload @getData="updateImage" :attrs="imageObj"></Upload>

          <div class="imgWap">
            <p v-for="item,index in updateImageURL"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
              <em>
                <el-radio v-model="radioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="updateImageURL.length"
              >
            </p>
          </div>

        </el-form-item>

        <!--<el-form-item label="预订须知:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_BookKnow" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="退改政策:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_ReturnRule" ></tinymce>-->
        <!--</el-form-item>-->
        <el-form-item label="推荐理由:" :label-width="formLabelWidth">
          <editor v-model="updateAdminQueryProductInformationObj.ts_pt_IntroReason"></editor>
          <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_IntroReason" ></tinymce>-->
        </el-form-item>
        <el-form-item label="产品线路介绍:" :label-width="formLabelWidth">
          <editor v-model="updateAdminQueryProductInformationObj.ts_pt_Describe"></editor>
          <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_Describe" ></tinymce>-->
        </el-form-item>
        <!--<el-form-item label="费用包含:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_FeeIn" ></tinymce>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="费用不包含:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_FeeNotIn" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="行程明细:" :label-width="formLabelWidth">-->
          <!--<editor v-model="updateAdminQueryProductInformationObj.ts_pt_LineDetail"></editor>-->
          <!--&lt;!&ndash;<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_LineDetail" ></tinymce>&ndash;&gt;-->
        <!--</el-form-item>-->
        <!--<el-form-item label="违约责任:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_LimitDuty" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="特殊限制:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_SpecialLimit" ></tinymce>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="安全限制:" :label-width="formLabelWidth">-->
        <!--<tinymce :height="300" v-model="updateAdminQueryProductInformationObj.ts_pt_SafetyLimit" ></tinymce>-->
        <!--</el-form-item>-->

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
  import Upload from '@/components/Upload'
  import Editor from '@/components/Editor'
  import {getEscapeVal} from '@/assets/js/public'


  export default {
    computed: mapGetters([
      'adminProductLine',
      'adminTradeGoodList',
      'adminProductLineManagementId',
      'proviceList',
      'cityList'
    ]),
    name: '',
    components: {
      Upload,
      Editor
    },
    data() {
      return {
        ProviceID: '',
        ImageURL: [],
        updateImageURL: [],
        isNewUploaNode: true,
        radioIndex: '',
        addRadioIndex: 0,
        imageObj: {accept: 'image/*'},
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
                children: [
                  {
                    label: '日程时间',
                    children: [
                      {
                        label: '时间活动',
                        children: [
                          {
                            label: '活动用餐'
                          },
                          {
                            label: '活动景点'
                          },
                          {
                            label: '活动购物'
                          },
                          {
                            label: '活动住宿'
                          },
                          {
                            label: '活动温馨提示'
                          },
                          {
                            label: '活动交通'
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
        isOff: true,
        userID: '',
        userName: '',
        initSearch: '',//查询参数
        isLoading: false,
        addAdminQueryProductInformationDialog: false,//添加弹窗
        updateAdminQueryProductInformationDialog: false,//修改弹窗
        value: '',
        formLabelWidth: '120px',
        // addOptions:{},
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_pt_GoodsListID": "",//产品编号 已有
            "ts_pt_GoodName": "",//产品名称
            "ts_pt_Name": "",//线路名称 已有
            "ts_pl_GoTime": "",//出发时间
            "ts_pl_LineDays": "",//行程天数
            "ts_pl_GroupCity": "",//成团地点
            "ts_pl_IsDefault": "1",//是否默认行程
            "ts_pt_Images": "",//线路图片
            "ts_pt_BookKnow": "",//预定需知      富文本格式
            "ts_pt_ReturnRule": "",//退改政策     富文本格式
            "ts_pt_IntroReason": "",//推荐理由       富文本格式
            "ts_pt_Describe": "",//产品线路介绍          富文本格式
            "ts_pt_FeeIn": "",//费用包含               富文本格式
            "ts_pt_FeeNotIn": "",//费用不包含        富文本格式
            "ts_pt_LineDetail": "",//行程明细       富文本格式
            "ts_pt_LimitDuty": "",//违约责任      富文本格式
            "ts_pt_SpecialLimit": "",//特殊限制      富文本格式
            "ts_pt_SafetyLimit": "",//安全限制     富文本格式
            "ts_pt_Remark": "",//描述 已有
          }
        },
        restaurantsDay: [],
        updateAdminQueryProductInformationObj: {},
        id: '',
        num: 0
      }
    },
    created() {
      //生成选中行程天数
      for (var i = 0; i < 10; i++) {
        this.restaurantsDay.push({value: (i + 1) + ''})
      }
      //初始化省
      let sCity = {
        "areaPid": 3337
      };
      this.id = this.$route.params.id
      this.$store.dispatch('initProvice', sCity)
      this.initData(this.$route.params.id)
    },
    methods: {

      cacheForm() {


        window.location.reload()
        this.addData = this.addOptions,
          this.ImageURL = [],
          this.addAdminQueryProductInformationDialog = false

      },


      //选中省
      changeProvice(item) {

        let searchCity = {
          "areaPid": this.addOptions.data.ts_pl_GroupProvice
        }
        this.$store.dispatch('initCityList', searchCity)
      },
      //修改选中省
      updateChangeProvice(item) {
        this.updateAdminQueryProductInformationObj.ts_pl_GroupProvice = this.updateAdminQueryProductInformationObj.provice
        let searchCity = {
          "areaPid": this.updateAdminQueryProductInformationObj.provice
        }
        this.$store.dispatch('initCityList', searchCity)
      },
      updateCity() {
        this.updateAdminQueryProductInformationObj.ts_pl_GroupCity = this.updateAdminQueryProductInformationObj.city;
      },
      //修改图片
      updateImage(data) {
        if (!this.radioIndex) {
          this.updateImageURL.push(data.data);
        } else {
          this.updateImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      //图片上传
      getData(data) {
        if (!this.addRadioIndex) {
          this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },
      //删除对应图片
      deleteImageURL(val) {
        this.isUploaNode = false;
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除修改图片
      deleteUpdateImageURL(val){
        this.isNewUploaNode = false
        this.updateImageURL = this.updateImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurantsDay;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      jump(obj) {

        if (obj.ts_pt_GoodsListID) {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + obj.ts_pt_GoodsListID, '_blank')
        } else {
          this.$notify({
            title: '警告',
            message: '产品编号为空。。。',
            type: 'warning'
          })
        }

      },
      toMerch() {
        sessionStorage.setItem('index', 0);
        this.$router.push({name: 'AdminMerchantProducts'})
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
          goodID: this.id
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

        for (let attr in this.addOptions.data) {
          if (typeof this.addOptions.data[attr] == 'object') {
            for (let attr1 in this.addOptions.data[attr]) {
              this.addOptions.data[attr][attr1] = ''
            }
          } else {
            this.addOptions.data[attr] = ''
          }
        }
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = ''
        }
        let textArr = document.querySelectorAll('.w-e-text')
        if (textArr && textArr.length) {
          for (var i = 0; i < textArr.length; i++) {
            textArr[i].innerHTML = ''
          }
        }
        this.addAdminQueryProductInformationDialog = true
      },
      //添加提交
      addAdminQueryProductInformationSubmit() {
        this.addOptions.data.ts_pt_GoodsListID = this.$route.params.id;
        if (this.ImageURL.length) {
          this.addOptions.data.ts_pt_Images = this.ImageURL.join(',')
        }
        this.addOptions.data.ts_pl_IsDefault = '1';
        this.$store.dispatch('AddAdminQueryProductInformationSubmit', this.addOptions)
          .then(() => {
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
//            window.location.reload()
            this.initData(this.value)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addAdminQueryProductInformationDialog = false;
      },
      initProvice(obj) {
        let searchCity = {
          "areaPid": obj.ts_pl_GroupProvice
        }
        return this.$store.dispatch('initCityList', searchCity)
      },
      //修改
      updateAdminQueryProductInformation(obj) {
        this.updateImageURL = obj.ts_pt_Images
        this.isLoading = true;
        this.initProvice(obj)
          .then(() => {
            this.isLoading = false;
            obj.ts_pl_LineDays = obj.ts_pl_LineDays + ''
            this.updateAdminQueryProductInformationObj = obj
            this.updateAdminQueryProductInformationDialog = true;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

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
            "ts_pt_GoodsListID": this.$route.params.id,
            "ts_pt_Name": this.updateAdminQueryProductInformationObj.ts_pt_Name,
            "ts_pt_Remark": this.updateAdminQueryProductInformationObj.ts_pt_Remark,
            "ts_pl_GoTime": this.updateAdminQueryProductInformationObj.ts_pl_GoTime,//出发时间
            "ts_pl_LineDays": this.updateAdminQueryProductInformationObj.ts_pl_LineDays,//行程天数
            "ts_pl_GroupProvice": this.updateAdminQueryProductInformationObj.ts_pl_GroupProvice,//成团地点所属省
            "ts_pl_GroupCity": this.updateAdminQueryProductInformationObj.ts_pl_GroupCity,//成团地点
            "ts_pl_IsDefault": this.updateAdminQueryProductInformationObj.ts_pl_IsDefault,//是否默认行程
            "ts_pt_IsDelete": this.updateAdminQueryProductInformationObj.ts_pt_IsDelete,//是否删除（0否，1是）
            "ts_pt_IsIntroLine": this.updateAdminQueryProductInformationObj.ts_pt_IsIntroLine,//
            "ts_pt_Images": "",//线路图片
            "ts_pt_BookKnow": this.updateAdminQueryProductInformationObj.ts_pt_BookKnow,//预定需知      富文本格式
            "ts_pt_ReturnRule": this.updateAdminQueryProductInformationObj.ts_pt_ReturnRule,//退改政策     富文本格式
            "ts_pt_IntroReason": getEscapeVal(this.updateAdminQueryProductInformationObj.ts_pt_IntroReason),//推荐理由       富文本格式
            "ts_pt_Describe": getEscapeVal(this.updateAdminQueryProductInformationObj.ts_pt_Describe),//产品线路介绍          富文本格式
            "ts_pt_FeeIn": this.updateAdminQueryProductInformationObj.ts_pt_FeeIn,//费用包含               富文本格式
            "ts_pt_FeeNotIn": this.updateAdminQueryProductInformationObj.ts_pt_FeeNotIn,//费用不包含        富文本格式
            "ts_pt_LineDetail": getEscapeVal(this.updateAdminQueryProductInformationObj.ts_pt_LineDetail),//行程明细       富文本格式
            "ts_pt_LimitDuty": this.updateAdminQueryProductInformationObj.ts_pt_LimitDuty,//违约责任      富文本格式
            "ts_pt_SpecialLimit": this.updateAdminQueryProductInformationObj.ts_pt_SpecialLimit,//特殊限制      富文本格式
            "ts_pt_SafetyLimit": this.updateAdminQueryProductInformationObj.ts_pt_SafetyLimit,//安全限制     富文本格式
          }
        };
//        return
        if (this.updateImageURL.length) {
          updateOptions.data.ts_pt_Images = this.updateImageURL.join(',')
        }
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
          "data": {
            "ts_pt_ID": id
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
      queryProductInformationDetail(obj) {
//        this.$store.commit('adminLineScheduleManagementId', id);
        // this.$router.push({name: 'AdminQueryProductInformationList'})ts_pt_Name
        sessionStorage.setItem('lineObj', JSON.stringify(obj))
        this.$router.push({name: 'AdminQueryProductInformationList', params: {id: obj.ts_pt_ID}})
        sessionStorage.setItem('index', '2')
      }
    },
    mounted() {
      this.searchInitData()
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
