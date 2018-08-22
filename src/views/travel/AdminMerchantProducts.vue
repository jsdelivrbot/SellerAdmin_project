<template>
  <section id="wrap">

    <h1 class="userClass">商家产品信息</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item label="产品标题:">
          <el-input v-model="title" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="addAdminMerchantProducts" size="small">新增</el-button>
        </el-form-item>
        <el-form-item>
          <span style="color: #f60">提示:添加一条之后，需要添加下一条,请刷新页面重置富文本信息!</span>
        </el-form-item>
      </el-form>
    </el-col>


    <el-table
      :data="adminTradeGoodList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商户编号:">
              <span>{{ props.row.ta_tg_TradeID }}</span>
            </el-form-item>
            <el-form-item label="产品标题:">
              <!--<el-popover-->
              <!--ref="popover1"-->
              <!--placement="top-start"-->
              <!--trigger="hover"-->
              <!--:content="props.row.ta_tg_Title">-->
              <!--</el-popover>-->
              <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
              <span>{{props.row.ta_tg_Title}}</span>
            </el-form-item>
            <el-form-item label="推荐价格:">
              <span>¥ {{ props.row.ts_tg_lowestPrice}}</span>
            </el-form-item>
            <!--<el-form-item label="所属国家:">-->
            <!--<span>{{ props.row.ts_tg_Country }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="所属省市:">
              <span>{{ props.row.ts_tg_Provice + props.row.ts_tg_City}}</span>
            </el-form-item>
            <el-form-item label="产品类型:">
              <span>{{ props.row.ts_tg_Type | getTrandeType}}</span>
            </el-form-item>
            <!--<el-form-item label="产品描述:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover"-->
            <!--:content="props.row.ta_tg_Describe">-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="成团地点:">-->
            <!--<span>{{ props.row.ts_tg_GroupSite }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="费用包含:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover"-->
            <!--&gt;-->
            <!--<p v-for="item,index in props.row.feeIn" style="padding: 20px;width: 500px">-->
            <!--({{index+1}}):{{item.ts_gi_Name}}</p>-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="费用不包含:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover">-->
            <!--<p v-for="item,index in props.row.feeNotIn" style="padding: 20px;width: 500px">-->
            <!--({{index+1}}):{{item.ts_gi_Name}}</p>-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->

            <!--</el-form-item>-->
            <!--<el-form-item label="推荐理由:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover">-->
            <!--<p v-for="item,index in props.row.buyReason" style="padding: 20px;width: 500px">-->
            <!--({{index+1}}):{{item.ts_gi_Name}}</p>-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="产品介绍:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover">-->
            <!--<p v-for="item,index in props.row.goodIntroduce" style="padding: 20px;width: 500px">-->
            <!--({{index+1}}):{{item.ts_gi_Name}}</p>-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="预订须知:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover"-->
            <!--&gt;-->
            <!--<p v-for="item,index in props.row.bookKnow" style="padding: 20px;width: 500px">-->
            <!--({{index+1}}):{{item.ts_gi_Name}}</p>-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="退订政策:">-->
            <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="top-start"-->
            <!--trigger="hover">-->
            <!--<p v-for="item,index in props.row.backRule" style="padding: 20px;width: 500px">-->
            <!--({{index+1}}):{{item.ts_gi_Name}}</p>-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
            <!--</el-form-item>-->

            <el-form-item label="产品图片地址:">
              <img v-for="item,index in props.row.ta_tg_ShowImages" :src="item" alt="" :key="index" width="300"
                   height="150">

            </el-form-item>
            <el-form-item label="产品创建时间:">
              <span>{{ props.row.ta_tg_CreateDateTime }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <!--<el-popover-->
              <!--ref="popover1"-->
              <!--placement="top-start"-->
              <!--trigger="hover"-->
              <!--:content="props.row.ta_tg_Remark">-->
              <!--</el-popover>-->
              <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
              <span>{{props.row.ta_tg_Remark}}</span>
            </el-form-item>
            <!--<el-form-item label="是否展示首页:">-->
            <!--<span>{{ props.row.ts_tg_ShowTop==0?"否":"是" }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否精选:">-->
            <!--<span>{{ props.row.ts_tg_Special==0?"非精选":"精选" }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="跟团类型:">
              <span>{{ props.row.ts_tg_LongOut | getNewLongOut }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="产品编码"
        prop="ta_tg_ID">
      </el-table-column>
      <el-table-column
        label="产品标题"
        prop="ta_tg_Title">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="ta_tg_CreateDateTime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminMerchantProducts(scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="DeleteAdminMerchantProducts(scope.row.ta_tg_ID)">删除
          </el-button>
          <el-button
            size="mini"
            @click="productLineManagement(scope.row.ta_tg_ID)">产品线路管理
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="jump(scope.row)">预览效果
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="float: right;padding: 30px 0 80px 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        background
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>

    </div>
    <!--添加产品-->
    <el-dialog title="添加产品" :visible.sync="addDialog" width="1150px" :close-on-click-modal="false" @close="closeDialog">
      <el-form :model="addOptions">

        <el-form-item label="产品标题:" :label-width="formLabelWidth" required>
          <el-input v-model="addData.ta_tg_Title" placeholder="请输入产品标题" class="tg_Title"></el-input>
        </el-form-item>
        <el-form-item label="产品类别:" :label-width="formLabelWidth" required>
          <el-select v-model="addData.ts_tg_Property" placeholder="请选择产品类别">
            <el-option
              v-for="item in productCategoryList"
              :key="item.ts_gi_ID"
              :label="item.ts_gi_Name"
              :value="item.ts_gi_ID">
            </el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="产品描述:" :label-width="formLabelWidth" required>-->
        <!--<el-input v-model="addData.ta_tg_Describe" placeholder="请输入产品描述" class="tg_Title"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="所属省:" :label-width="formLabelWidth" required>
          <el-select v-model="value" placeholder="请选择省份" @change="changeProvice">
            <el-option
              v-for="item in proviceList"
              :key="item.sm_af_AreaName"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属市:" :label-width="formLabelWidth" required>
          <el-select v-model="addData.ts_tg_City" placeholder="请选择市">
            <el-option
              v-for="item in cityList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐价格:" :label-width="formLabelWidth">
          <el-input v-model="addData.ts_tg_lowestPrice" placeholder="请输入推荐价格" class="tg_Title"></el-input>
        </el-form-item>
        <el-form-item label="产品图片:" :label-width="formLabelWidth" required>
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
        <!--<el-form-item label="是否展示首页:" :label-width="formLabelWidth">-->
        <!--<el-select v-model="addData.ts_tg_Special" placeholder="请选择是否精选">-->
        <!--<el-option-->
        <!--label="展示"-->
        <!--value="1">-->
        <!--</el-option>-->
        <!--<el-option-->
        <!--label="不展示"-->
        <!--value="0">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="跟团类型:" :label-width="formLabelWidth" required>
          <el-select v-model="addData.ts_tg_LongOut" placeholder="请选择跟团类型">
            <el-option
              label="国内跟团 "
              value="0">
            </el-option>
            <el-option
              label="周边跟团"
              value="1">
            </el-option>
            <el-option
              label="出境长线"
              value="2">
            </el-option>
            <el-option
              label="出境短线"
              value="3">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="测试:" :label-width="formLabelWidth">-->
        <!--<editor v-model="content"/>-->
        <!--</el-form-item>-->

        <el-form-item label="产品类型:" :label-width="formLabelWidth" required>
          <el-select v-model="addData.ts_tg_Type" placeholder="请选择产品类型">
            <el-option
              label="跟团游 "
              value="0">
            </el-option>
            <el-option
              label="自由行"
              value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addData.ta_tg_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="cacheForm">取 消</el-button>-->
        <el-button @click="addAdminMerchantProductsDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!--修改产品-->
    <el-dialog title="修改产品" :visible.sync="updateDialog" width="60%" :close-on-click-modal="false" @close="closeDialog">
      <el-form :model="updateAdminMerchantProductsObj">
        <el-form-item label="产品标题:" :label-width="formLabelWidth" required>
          <el-input v-model="updateAdminMerchantProductsObj.ta_tg_Title" placeholder="请输入产品标题"
                    class="tg_Title"></el-input>
        </el-form-item>

        <el-form-item label="产品类别:" :label-width="formLabelWidth" required>
          <el-select v-model="updateAdminMerchantProductsObj.propertyName" placeholder="请选择产品类别">
            <el-option
              v-for="item in productCategoryList"
              :key="item.ts_gi_ID"
              :label="item.ts_gi_Name"
              :value="item.ts_gi_ID">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="所属省:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_Provice" placeholder="请选择省份"
                     @change="changeUpdateProvice">
            <el-option
              v-for="item in proviceList"
              :key="item.sm_af_AreaName"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属市:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_City" placeholder="请选择市">
            <el-option
              v-for="item in cityList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaName">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="产品描述:" :label-width="formLabelWidth">-->
        <!--<el-input v-model="updateAdminMerchantProductsObj.ta_tg_Describe" placeholder="请输入产品描述"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="推荐价格:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminMerchantProductsObj.ts_tg_lowestPrice" placeholder="请输入推荐价格"></el-input>
        </el-form-item>
        <!--<el-form-item label="成团地点:" :label-width="formLabelWidth">-->
        <!--<el-select v-model="updateAdminMerchantProductsObj.ts_tg_GroupSite" placeholder="请选择省份">-->
        <!--<el-option-->
        <!--v-for="item in proviceList"-->
        <!--:key="item.sm_af_AreaName"-->
        <!--:label="item.sm_af_AreaName"-->
        <!--:value="item.sm_af_AreaName">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--&lt;!&ndash;<el-input v-model="updateAdminMerchantProductsObj.ts_tg_GroupSite" placeholder="请输入成团地点"></el-input>&ndash;&gt;-->
        <!--</el-form-item>-->

        <el-form-item label="产品图片:" :label-width="formLabelWidth">
          <p>单张图片大小不能大于2M</p>
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

        <!--<el-form-item label="是否精选:" :label-width="formLabelWidth">-->
        <!--<el-select v-model="updateAdminMerchantProductsObj.ts_tg_Special" placeholder="请选择是否精选">-->
        <!--<el-option-->
        <!--label="展示"-->
        <!--value="1">-->
        <!--</el-option>-->
        <!--<el-option-->
        <!--label="不展示"-->
        <!--value="0">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="跟团类型:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_LongOut" placeholder="请选择跟团类型">
            <el-option
              label="国内跟团 "
              value="0">
            </el-option>
            <el-option
              label="周边跟团"
              value="1">
            </el-option>
            <el-option
              label="出境长线"
              value="2">
            </el-option>
            <el-option
              label="出境短线"
              value="3">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_Type" placeholder="请选择产品类型">
            <el-option
              label="跟团游 "
              value="0">
            </el-option>
            <el-option
              label="自由行"
              value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminMerchantProductsObj.ta_tg_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="cacheForm">取 消</el-button>-->
        <el-button @click="updateAdminMerchantProductsDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>


  </section>
</template>
<script>
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'
  import Editor from '@/components/Editor'

  export default {
    name: '',
    components: {
      Upload,
      Editor
    },
    data() {
      return {
        radioIndex: '',
        isShow: false,
        updateImageURL: [],
        isUploaNode: true,
        isNewUploaNode: true,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        obj: {},
        title: '',
        recommendedReasonContent: '',//添加推荐理由内容
        goodIntroduceContent: '',
        feeInfoListContent: '',//费用包含
        updateGoodIntroduceContentObj: {},
        updateBuyReasonObj: {},
        recommendedReasonList: [],
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
        value: '',
        userName: '',
        formLabelWidth: '120px',
        total: 0,
        ImageURL: [],
        restaurants: [],
        isOff: false,
        productsID: '',//查询产品编号
        addDialog: false,//添加弹窗
        updateDialog: false,//修改弹窗
        addBuyReasonDialog: false,//添加推荐理由弹窗
        updateBuyReasonDialog: false,
        addGoodIntroduceDialog: false,//添加产品介绍弹窗
        updateGoodIntroduceDialog: false,//修改产品介绍弹窗
        addFeeInfoListDialog: false,//添加费用包含弹窗
        updateFeeInfoListDialog: false,//添加费用包含弹窗
        isLoading: false,
        userObj: {},
        feeInfoList: [],
        feeNotInList: [],
        bookList: [],
        buyReason: [],
        goodIntroduce: [],
        updateAdminMerchantProductsObj: {},
        addData: {
          ts_tg_lowestPrice: '',
          ta_tg_TradeName: '',
//            "ta_tg_ID": "",
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
          ts_tg_Type: '',
          ts_tg_Property: ''
        },
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "feeIn": [],
          "feeNotIn": [],
          "bookKnow": [],
          "backRule": [],
          "stayRecom": [],
          "tourSiteRecom": [],
          buyReason: [],
          goodIntroduce: [],
          data: {}
        },
        updateFeeInfoListContentObj: {},
        feeNotInListContent: '',
        addFeeInNotListDialog: false,
        updateFeeInNotListDialog: false,
        updateFeeNotInListContentObj: {},
        bookListContent: '',
        addBookListDialog: false,//添加预订须知弹窗
        updateBookListDialog: false,//修改预订须知弹窗
        updateBookListContentObj: {},
        backRuleList: [],
        num: 0,
        backRuleListContent: '',
        addBackRuleListDialog: false,
        updateBackRuleListDialog: false,
        updateBackRuleListContentObj: {},
        imageObj: {accept: 'image/*'},
        radioIndex: '',
        addRadioIndex: 0,
        productCategoryList: [],
        content: ''
      }
    },
    computed: mapGetters([
      'adminTradeGoodList',
      'homeAdminGroupTourList',
//      'updateAdminMerchantProductsObj',
      'adminMerchantProductsId',
      'proviceList',
      'cityList'
    ]),
    created() {
//      //初始化省
      let sCity = {
        "areaPid": 3337
      };
      this.$store.dispatch('initProvice', sCity)
      let obj = JSON.parse(sessionStorage.getItem('admin'));
      this.userObj = obj;
      this.productsID = obj.sm_ui_ID
      //获取产品类别
      this.getProductCategory()
    },
    methods: {
      handleChange() {
        console.log(html, text)
      },
      getProductCategory() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ts_gi_ParentID": 8//父编码为8是类别
        }
        this.$store.dispatch('getProductCategory', options)
          .then(data => {
            this.productCategoryList = data;
          })
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
      jump(obj) {
        sessionStorage.setItem('id', obj.ta_tg_ID)
        if (obj.ta_tg_ID) {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + obj.ta_tg_ID, '_blank')
        } else {
          this.$notify({
            title: '警告',
            message: '产品编号为空。。。',
            type: 'warning'
          })
        }
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
        this.addDialog = false,
          this.updateDialog = false
      },
      cacheForm() {

        window.location.reload()
        this.ImageURL = [],
          this.updateImageURL = [],
          this.addDialog = false,
          this.updateDialog = false

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
      //选中省
      changeProvice(item) {
        this.obj = this.proviceList.filter(v => {
          if (v.sm_af_AreaID == item) {
            return true;
          }
          return false;
        })[0]
//        this.updateAdminMerchantProductsObj.ts_tg_Provice = this.obj.sm_af_AreaName
//        this.addData.ts_tg_Provice = obj.sm_af_AreaName
        let searchCity = {
          "areaPid": this.value
        }
        this.$store.dispatch('initCityList', searchCity)
      },
      //选中省
      changeUpdateProvice(item) {
        this.obj = this.proviceList.filter(v => {
          if (v.sm_af_AreaID == item) {
            return true;
          }
          return false;
        })[0]
        let searchCity = {
          "areaPid": this.updateAdminMerchantProductsObj.ts_tg_Provice
        }
        this.$store.dispatch('initCityList', searchCity)
      },
      //选中商家
      handleSelect(item) {
        this.userName = item.value;
        this.productsID = item.id;
        this.updateAdminMerchantProductsObj.ta_tg_TradeID = item.id;
        this.addData.ta_tg_TradeID = item.id;
      },
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
      initData(id, page, title) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "tradeID": id ? id : '',
          "goodTitle": title ? title : '',
          "userID": "",
          "pcName": "",
          "ID": '',
          'isDelete': 0,
          "page": page ? page : 1,
          "rows": 10
        };
        if (this.num) {
          options.page = this.num;
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminTradeGoodList', options)
          .then((data) => {
            this.total = data.totalRows;
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
        this.initData(this.productsID, 1, this.title)
      },
      //查询初始化数据
      searchInitData() {
        this.initData(this.productsID)
      },

      //分页
      handleCurrentChange(num) {
        this.num = num;
        this.initData(this.productsID, num);
      },

      //添加
      addAdminMerchantProducts() {
        for (let attr in this.addData) {
          if (attr != 'loginUserID' && attr != 'loginUserPass') {
            this.addData[attr] = ''
          }
        }
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = ''
        }
        this.content = ''
        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addData.ta_tg_ShowImage = this.ImageURL.join(',');
        this.addOptions.buyReason = this.buyReason;
        this.addOptions.feeIn = this.feeInfoList;
        this.addOptions.feeNotIn = this.feeNotInList;
        this.addOptions.bookKnow = this.bookList;
        this.addOptions.backRule = this.backRuleList;
        this.addOptions.goodIntroduce = this.goodIntroduce
        this.addData.ta_tg_TradeID = this.productsID
        this.addData.ts_tg_Provice = this.obj.sm_af_AreaName
        this.addOptions.data = this.addData
//        this.addData.ta_tg_TradeName = this.userObj.sm_ai_GoodName
        this.$store.dispatch('AddAdminMerchantProducts', this.addOptions)
          .then(() => {
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
            this.initData(this.productsID, 1);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },

      //省
      initUpdateCity(name) {
        let obj = this.proviceList.filter(v => {
          if (v.sm_af_AreaName == name) {
            return true;
          }
          return false;
        })[0]
        let searchCity = {
          "areaPid": obj.sm_af_AreaID
        }
        return this.$store.dispatch('initCityList', searchCity)
      },

      //修改
      updateAdminMerchantProducts(obj) {
        this.isLoading = true;
        this.initUpdateCity(obj.ts_tg_Provice)
          .then(() => {
            this.isLoading = false;
            obj.ts_tg_LongOut = obj.ts_tg_LongOut + '';
            obj.ts_tg_Type = obj.ts_tg_Type + ''
            this.updateAdminMerchantProductsObj = obj;
            this.updateImageURL = this.updateAdminMerchantProductsObj.ta_tg_ShowImages
            this.updateDialog = true;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },
      //修改提交
      updateSubmit() {
        if (isNaN(this.updateAdminMerchantProductsObj.ts_tg_Property)) {
          this.updateAdminMerchantProductsObj.ts_tg_Property = this.updateAdminMerchantProductsObj.propertyName
        }
        this.updateAdminMerchantProductsObj.ts_tg_Provice = this.obj.sm_af_AreaName
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminMerchantProductsObj
        };
        if (this.updateImageURL.length) {
          this.updateAdminMerchantProductsObj.ta_tg_ShowImage = this.updateImageURL.join(',')
        }

        this.$store.dispatch('UpdateAdminMerchantProducts', updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.productsID, 1);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      DeleteAdminMerchantProducts(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ta_tg_ID": id
          }
        }
        this.$store.dispatch('DeleteAdminMerchantProducts', deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData(this.productsID, 1);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //点击跳转到产品线路管理
      productLineManagement(id) {
        this.$store.commit('adminProductLineManagementId', id);
        sessionStorage.setItem('MerchanID', id)
        this.$router.push({name: 'AdminQueryProductInformation', params: {id}})
        sessionStorage.setItem('index', '1')
      }
    },
    mounted() {
      this.searchInitData();
    },
    updated() {
    },

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
