<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">票种</h1>

      <!--查询栏-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>景点名称:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              size="mini"
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
            <el-button type="primary" @click="Add" size="mini">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>


      <!--数据展示-->

      <el-table
        :data="ticketTypeList"
        v-loading="isLoading"
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
              <el-form-item label="票种图片">
                <img
                  v-for="item,index in props.row.tm_tt_Image"
                  :src="item" alt=""
                  :key="index"
                  width="200"
                  height="100"
                  style="margin: 10px 15px;"
                >
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.tm_tt_Description }}</span>
              </el-form-item>
              <el-form-item label="允许超过天数">
                <span>{{ props.row.tm_tt_ExpireDay }}天</span>
              </el-form-item>
              <!--<el-form-item label="提前预定时间">-->
                <!--<span>{{ props.row.tm_tt_BeforeTime / 60 }}小时</span>-->
              <!--</el-form-item>-->
              <el-form-item label="票价">
                <span>{{ props.row.tm_tt_TicketPrice }}元</span>
              </el-form-item>
              <el-form-item label="实际价格">
                <span>{{ props.row.tm_tt_RealPrice }}元</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.tm_tt_Remark }}</span>
              </el-form-item>
              <el-form-item label="门票类型">
                <span>{{ props.row.tm_tt_typeName }}</span>
              </el-form-item>
              <el-form-item label="提前预定时间">
                <span>{{ props.row.tm_tt_BeforeTime }}</span>
              </el-form-item>
              <el-form-item label="退改规则">
                <span>{{ props.row.tm_tt_ReturnRule }}</span>
              </el-form-item>
              <el-form-item label="使用方法">
                <span>{{ props.row.tm_tt_UseMethod }}</span>
              </el-form-item>
              <el-form-item label="取票时间">
                <span>{{ props.row.tm_tt_GetTime }}</span>
              </el-form-item>
              <el-form-item label="取票地址">
                <span>{{ props.row.tm_tt_GetAddress }}</span>
              </el-form-item>
              <el-form-item label="补充说明">
                <span>{{ props.row.tm_tt_AddRemarks }}</span>
              </el-form-item>
              <el-form-item label="费用包含">
                <span>{{ props.row.tm_tt_PriceInclude }}</span>
              </el-form-item>
              <el-form-item label="重要条款">
                <span>{{ props.row.tm_tt_ImportantCause }}</span>
              </el-form-item>
              <el-form-item label="预订生效时间">
                <span>{{ props.row.tm_tt_EffectiveTime }}</span>
              </el-form-item>
              <el-form-item label="适用人群">
                <span>{{ props.row.tm_tt_SuitableCrowd }}</span>
              </el-form-item>
              <el-form-item label="特别提示">
                <span>{{ props.row.tm_tt_SpecialNotice }}</span>
              </el-form-item>
              <el-form-item label="预订限制">
                <span>{{ props.row.tm_tt_BookLimit }}</span>
              </el-form-item>
              <el-form-item label="温馨提示">
                <span>{{ props.row.tm_tt_HappyNotice }}</span>
              </el-form-item>
              <el-form-item label="优待政策">
                <span>{{ props.row.tm_tt_PreferentialPolicy }}</span>
              </el-form-item>
              <el-form-item label="购票须知">
                <span>{{ props.row.tm_tt_ByeNotice }}</span>
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
        <el-table-column label="操作" width="350" align="center">
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
            <el-button
              size="mini"
              @click="toTicketTypeTicketPrice(scope.row.tm_tt_ID)">设置票价
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="jump(scope.row)">预览效果
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <!--添加票种-->

      <el-dialog title="添加票种信息" :visible.sync="addDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="addOptions">
          <el-form-item label="票种名称:" :label-width="formLabelWidth">
            <el-autocomplete
              class="inline-input"
              v-model="addOptions.tm_tt_Name"
              :fetch-suggestions="querySearchTicket"
              placeholder="请输入票种名称"
              @select="addHandleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="景点名称:" :label-width="formLabelWidth">

            <el-autocomplete
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>

          </el-form-item>
          <el-form-item label="票种图片:" :label-width="formLabelWidth">

            <Upload @getData="getData" :attrs="imageObj"></Upload>

            <div class="imgWap">
              <p v-for="item,index in ImageURL" style="display: inline-block;position: relative;margin-right: 30px">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <em>
                  <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURL.length"
                >
              </p>
            </div>


          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_Description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="允许超过天数:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_ExpireDay" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="提前预定时间:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_BeforeTime"></el-input>
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

          <el-form-item label="门票类型:" :label-width="formLabelWidth">
            <el-autocomplete
              class="inline-input"
              v-model="addOptions.tm_tt_typeName"
              :fetch-suggestions="querySearch1"
              placeholder="请输入门票类型"
              @select="handleSelect1"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="退改规则:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_ReturnRule"></el-input>
          </el-form-item>
          <el-form-item label="使用方法:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_UseMethod"></el-input>
          </el-form-item>
          <el-form-item label="取票时间:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_GetTime"></el-input>
          </el-form-item>
          <el-form-item label="取票地址:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_GetAddress"></el-input>
          </el-form-item>
          <el-form-item label="补充说明:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_AddRemarks"></el-input>
          </el-form-item>
          <el-form-item label="费用包含:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_PriceInclude"></el-input>
          </el-form-item>
          <el-form-item label="重要条款:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_ImportantCause"></el-input>
          </el-form-item>
          <el-form-item label="预订生效时间:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_EffectiveTime"></el-input>
          </el-form-item>
          <el-form-item label="适用人群:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_SuitableCrowd"></el-input>
          </el-form-item>
          <el-form-item label="特别提示:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_SpecialNotice"></el-input>
          </el-form-item>
          <el-form-item label="预订限制:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_BookLimit"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_HappyNotice"></el-input>
          </el-form-item>
          <el-form-item label="优待政策:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_PreferentialPolicy"></el-input>
          </el-form-item>
          <el-form-item label="购票须知:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tt_ByeNotice"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改票种-->

      <el-dialog title="修改票种信息" :visible.sync="updateDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="updateTicketTypeObj">
          <el-form-item label="票种名称:" :label-width="formLabelWidth">
            <el-autocomplete
              class="inline-input"
              v-model="updateTicketTypeObj.tm_tt_Name"
              :fetch-suggestions="querySearchTicket"
              placeholder="请输入票种名称"
              @select="addHandleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="景点名称:" :label-width="formLabelWidth">

            <el-autocomplete
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>

            <!--<el-select v-model="updateTicketTypeObj.tm_ts_Code" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in ticketAttractionsList"-->
            <!--:key="item.tm_ts_Code"-->
            <!--:label="item.tm_ts_Name"-->
            <!--:value="item.tm_ts_Code">-->
            <!--</el-option>-->
            <!--</el-select>-->
          </el-form-item>

          <el-form-item label="票种图片:" :label-width="formLabelWidth">

            <Upload @getData="updateImage" :attrs="imageObj"></Upload>

            <div class="imgWap">
              <p v-for="item,index in updateImageURL"
                 style="display: inline-block;position: relative;margin-right: 30px;">
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
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_Description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="允许超过天数:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_ExpireDay" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="提前预定时间:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_BeforeTime"></el-input>
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
          <el-form-item label="门票类型:" :label-width="formLabelWidth">
            <el-autocomplete
              class="inline-input"
              v-model="updateTicketTypeObj.tm_tt_typeName"
              :fetch-suggestions="querySearch1"
              placeholder="请输入门票类型"
              @select="handleSelect1"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="退改规则:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_ReturnRule"></el-input>
          </el-form-item>
          <el-form-item label="使用方法:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_UseMethod"></el-input>
          </el-form-item>
          <el-form-item label="取票时间:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_GetTime"></el-input>
          </el-form-item>
          <el-form-item label="取票地址:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_GetAddress"></el-input>
          </el-form-item>
          <el-form-item label="补充说明:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_AddRemarks"></el-input>
          </el-form-item>
          <el-form-item label="费用包含:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_PriceInclude"></el-input>
          </el-form-item>
          <el-form-item label="重要条款:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_ImportantCause"></el-input>
          </el-form-item>
          <el-form-item label="预订生效时间:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_EffectiveTime"></el-input>
          </el-form-item>
          <el-form-item label="适用人群:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_SuitableCrowd"></el-input>
          </el-form-item>
          <el-form-item label="特别提示:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_SpecialNotice"></el-input>
          </el-form-item>
          <el-form-item label="预订限制:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_BookLimit"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_HappyNotice"></el-input>
          </el-form-item>
          <el-form-item label="优待政策:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_PreferentialPolicy"></el-input>
          </el-form-item>
          <el-form-item label="购票须知:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketTypeObj.tm_tt_ByeNotice"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
          <!--<el-button @click="updateDialog = false">取 消</el-button>-->
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
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'

  export default {
    components: {
      Upload
    },
    computed: mapGetters([
      'ticketTypeList',
      'ticketAttractionsList',
      'updateTicketTypeObj'
    ]),
    data() {
      return {
        imageObj: {accept: 'image/*'},
        tourName: '',
        isShow: false,
        updateImageURL: [],
        ImageURL: [],
        isLoading: false,
        updateDialog: false,
        loginId: '',
        siteId: '',
        total: 0,
        addBeforeTime: '',
        updateBeforeTime: '',
        isUploaNode: true,
        addDialog: false,
        isNewUploaNode: true,
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

          "tm_tt_typeName": "",//门票类型（电子票）
          "tm_tt_ReturnRule": "",//退改规则
          "tm_tt_UseMethod": "",//使用方法
          "tm_tt_GetTime": "",//取票时间
          "tm_tt_GetAddress": "",//取票地址
          "tm_tt_AddRemarks": "",//补充说明
          "tm_tt_PriceInclude": "",//费用包含
          "tm_tt_ImportantCause": "",//重要条款
          "tm_tt_EffectiveTime": "",//预订生效时间
          "tm_tt_SuitableCrowd": "",//适用人群
          "tm_tt_SpecialNotice": "",//特别提示
          "tm_tt_BookLimit": "",//预订限制
          "tm_tt_HappyNotice": "",//温馨提示
          "tm_tt_PreferentialPolicy": "",//优待政策
          "tm_tt_ByeNotice": "",//购票须知

        },
        radioIndex: 0,
        addRadioIndex: 0,
        arr: [
          {
            value: '成人票'
          },
          {
            value: '儿童票'
          }
        ],
        tm_ts_Code:'',
        restaurants1:[{value:'电子票'}]
      }
    },
    methods: {
      querySearch1(queryString, cb) {
        var restaurants = this.restaurants1;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect1(){},
      jump(obj){
        sessionStorage.setItem("code",obj.tm_ts_Code)
        window.open('http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/'+obj.tm_ts_Code,'_blank')
      },

      querySearchTicket(queryString, cb) {
        var restaurants = this.arr;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      addHandleSelect(item) {
        this.addOptions.tm_tt_Name = item.value;
      },
      //添加图片
      getData(data) {
        if (!this.addRadioIndex) {
          this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
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
      //点击到票件
      toTicketTypeTicketPrice(id) {
        this.$router.push({name: 'TicketTypeTicketPrice', params: {id}})
      },
      handleSelect(item) {
        this.addOptions.tm_ts_Code = item.id;
        this.updateTicketTypeObj.tm_ts_Code = item.id;
        this.tm_ts_Code = item.id
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
          "tm_ts_TradeInfoID": this.loginId.sm_ui_ID,//供应商编码
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
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.updateImageURL = this.updateImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
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
      closeDialog() {
        this.ImageURL = []
        this.updateImageURL = [];
        this.addDialog = false;
        this.updateDialog = false
      },
      cacheForm() {
        this.ImageURL = [],
          this.updateImageURL = [];
          this.addDialog = false;
        this.updateDialog = false
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
          "tm_ts_TradeInfoID": this.loginId.sm_ui_ID,//供应商编码
          "tm_ts_IsDelete": 0,//必须传
          "tm_ts_IsPass": "",//是否通过审核(0审核中1通过审核2未通过审核)
          "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门)
          "tm_ts_ThemeTypeID": "",//主题编码
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
          "tm_tt_TradeInfoID": this.loginId.sm_ui_ID,
          "tm_tt_IsDelete": 0,
          "page": num ? num : 1,
          "rows": 5
        };
        this.isLoading = true;
        this.$store.dispatch('initTicketType', getTicketTypePriceList)
          .then(total => {
            this.total = total;
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
        if (this.tm_ts_Code) {
          this.initData(this.tm_ts_Code)
        } else {
          this.initData('')
        }
      },
      // 添加按钮
      Add() {
        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addOptions.tm_tt_TradeInfoID = this.loginId.sm_ui_ID;
        this.addOptions.tm_tt_Image = this.ImageURL.join(',');
//        this.addOptions.tm_tt_BeforeTime = this.addBeforeTime * 60;
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
        this.$store.commit('setTranstionFalse');
        this.$store.commit('updateTicketType', id);
        setTimeout(() => {
          if (this.updateTicketTypeObj.tm_tt_Image.length) {
            this.updateImageURL = this.updateTicketTypeObj.tm_tt_Image
          }
          this.updateDialog = true;
        }, 30)
        this.tourName = this.updateTicketTypeObj.tm_ts_Name
      },
      //修改提交
      updateSubmit() {
        if (this.updateImageURL.length) {
          this.updateTicketTypeObj.tm_tt_Image = this.updateImageURL.join(',');
        }else{
          this.updateTicketTypeObj.tm_tt_Image = '';
        }
//        this.updateTicketTypeObj.tm_tt_BeforeTime = this.updateTicketTypeObj.tm_tt_BeforeTime * 60
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
  .imgWap {

  }

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
