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
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover"
                :content="props.row.ta_tg_Title">
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <el-form-item label="推荐价格:">
              <span>¥ {{ props.row.ts_tg_lowestPrice}}</span>
            </el-form-item>
            <!--<el-form-item label="所属国家:">-->
            <!--<span>{{ props.row.ts_tg_Country }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="所属省市:">
              <span>{{ props.row.ts_tg_Provice+props.row.ts_tg_City}}</span>
            </el-form-item>
            <el-form-item label="产品类型:">
              <span>{{ props.row.ts_tg_Type | getTrandeType}}</span>
            </el-form-item>
            <el-form-item label="产品描述:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover"
                :content="props.row.ta_tg_Describe">
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <el-form-item label="成团地点:">
              <span>{{ props.row.ts_tg_GroupSite }}</span>
            </el-form-item>
            <el-form-item label="费用包含:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover"
              >
                <p v-for="item,index in props.row.feeIn" style="padding: 20px;width: 500px">
                  ({{index+1}}):{{item.ts_gi_Name}}</p>
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <el-form-item label="费用不包含:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover">
                <p v-for="item,index in props.row.feeNotIn" style="padding: 20px;width: 500px">
                  ({{index+1}}):{{item.ts_gi_Name}}</p>
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>

            </el-form-item>
            <el-form-item label="推荐理由:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover">
                <p v-for="item,index in props.row.buyReason" style="padding: 20px;width: 500px">
                  ({{index+1}}):{{item.ts_gi_Name}}</p>
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <el-form-item label="产品介绍:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover">
                <p v-for="item,index in props.row.goodIntroduce" style="padding: 20px;width: 500px">
                  ({{index+1}}):{{item.ts_gi_Name}}</p>
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <el-form-item label="预订须知:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover"
              >
                <p v-for="item,index in props.row.bookKnow" style="padding: 20px;width: 500px">
                  ({{index+1}}):{{item.ts_gi_Name}}</p>
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <el-form-item label="退订政策:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover">
                <p v-for="item,index in props.row.backRule" style="padding: 20px;width: 500px">
                  ({{index+1}}):{{item.ts_gi_Name}}</p>
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>

            <el-form-item label="展示图片地址:">
              <img v-for="item,index in props.row.ta_tg_ShowImages" :src="item" alt="" :key="index" width="300"
                   height="150">

            </el-form-item>
            <el-form-item label="产品创建时间:">
              <span>{{ props.row.ta_tg_CreateDateTime }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <el-popover
                ref="popover1"
                placement="top-start"
                trigger="hover"
                :content="props.row.ta_tg_Remark">
              </el-popover>
              <el-button v-popover:popover1 size="small">移入查看</el-button>
            </el-form-item>
            <!--<el-form-item label="是否展示首页:">-->
            <!--<span>{{ props.row.ts_tg_ShowTop==0?"否":"是" }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="是否精选:">
              <span>{{ props.row.ts_tg_Special==0?"非精选":"精选" }}</span>
            </el-form-item>
            <el-form-item label="跟团类型:">
              <span>{{ props.row.ts_tg_LongOut | getLongOut }}</span>
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
        :page-size="5"
        background
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>

    </div>
    <!--添加产品-->
    <el-dialog title="添加产品" :visible.sync="addDialog" width="60%" :close-on-click-modal="false" @close="closeDialog">
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

        <el-form-item label="产品描述:" :label-width="formLabelWidth" required>
          <el-input v-model="addData.ta_tg_Describe" placeholder="请输入产品描述" class="tg_Title"></el-input>
        </el-form-item>

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


        <el-form-item label="产品推荐理由:" :label-width="formLabelWidth" required>
          <el-button type="primary" size="small" @click="RecommendedReason">添加推荐理由</el-button>
          <div v-show="buyReason.length" v-for="item,index in buyReason">
            <span style="margin: 10px 20px 10px 0">推荐理由{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateBuyReason(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteBuyReason(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品介绍:" :label-width="formLabelWidth" required>
          <el-button type="primary" size="small" @click="addGoodIntroduce">添加产品介绍</el-button>
          <div v-show="goodIntroduce.length" v-for="item,index in goodIntroduce">
            <span style="margin: 10px 20px 10px 0">产品介绍{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateGoodIntroduce(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteGoodIntroduce(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品费用包含:" :label-width="formLabelWidth" required>
          <el-button type="primary" size="small" @click="addFeeInfoList">添加费用包含</el-button>
          <div v-show="feeInfoList.length" v-for="item,index in feeInfoList">
            <span style="margin: 10px 20px 10px 0">费用包含{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateFeeInfoList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteFeeInfoList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品费用不包含:" label-width="140px" required>
          <el-button type="primary" size="small" @click="addFeeNotInList">添加费用不包含</el-button>
          <div v-show="feeNotInList.length" v-for="item,index in feeNotInList">
            <span style="margin: 10px 20px 10px 0">费用不包含{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateFeeNotInList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteFeeNotInList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品预订须知:" :label-width="formLabelWidth" required>
          <el-button type="primary" size="small" @click="addBookList">添加预订须知</el-button>
          <div v-show="bookList.length" v-for="item,index in bookList">
            <span style="margin: 10px 20px 10px 0">预订须知{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateBookList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteBookList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品退改政策:" :label-width="formLabelWidth" required>
          <el-button type="primary" size="small" @click="addBackRuleList">添加退改政策</el-button>
          <div v-show="backRuleList.length" v-for="item,index in backRuleList">
            <span style="margin: 10px 20px 10px 0">退改政策{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateBackRuleList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteBackRuleList(item,index)">删除</el-button>
          </div>
        </el-form-item>


        <el-form-item label="成团地点:" :label-width="formLabelWidth" required>
          <el-select v-model="addData.ts_tg_GroupSite" placeholder="请选择省份" @change="changeProvice">
            <el-option
              v-for="item in proviceList"
              :key="item.sm_af_AreaName"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="推荐价格:" :label-width="formLabelWidth">
          <el-input v-model="addData.ts_tg_lowestPrice" placeholder="请输入推荐价格" class="tg_Title"></el-input>
        </el-form-item>
        <el-form-item label="展示图片:" :label-width="formLabelWidth" required>
          <p>图片大小不能大于600KB</p>
          <Upload @getData="getData" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in ImageURL" style="display: inline-block;position: relative">
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
        <el-form-item label="是否展示首页:" :label-width="formLabelWidth">
          <el-select v-model="addData.ts_tg_Special" placeholder="请选择是否精选">
            <el-option
              label="展示"
              value="1">
            </el-option>
            <el-option
              label="不展示"
              value="0">
            </el-option>
          </el-select>
        </el-form-item>
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
        <el-button @click="cacheForm">取 消</el-button>
        <!--<el-button @click="addAdminMerchantProductsDialog = false">取 消</el-button>-->
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!--修改产品-->
    <el-dialog title="修改产品" :visible.sync="updateDialog" width="60%" :close-on-click-modal="false" @close="closeDialog">
      <el-form :model="updateAdminMerchantProductsObj">
        <el-form-item label="产品类别:" :label-width="formLabelWidth" required>
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_Property" placeholder="请选择产品类别">
            <el-option
              v-for="item in productCategoryList"
              :key="item.ts_gi_ID"
              :label="item.ts_gi_Name"
              :value="item.ts_gi_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品推荐理由:" :label-width="formLabelWidth">
          <el-button type="primary" size="small" @click="RecommendedReason">添加推荐理由</el-button>
          <div v-show="updateAdminMerchantProductsObj.buyReason.length"
               v-for="item,index in updateAdminMerchantProductsObj.buyReason">
            <span style="margin: 10px 20px 10px 0">推荐理由{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateBuyReason(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteBuyReason(item,index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="产品介绍:" :label-width="formLabelWidth">
          <el-button type="primary" size="small" @click="addGoodIntroduce">添加产品介绍</el-button>
          <div v-show="updateAdminMerchantProductsObj.goodIntroduce.length"
               v-for="item,index in updateAdminMerchantProductsObj.goodIntroduce">
            <span style="margin: 10px 20px 10px 0">产品介绍{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateGoodIntroduce(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteGoodIntroduce(item,index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="产品费用包含:" :label-width="formLabelWidth">
          <el-button type="primary" size="small" @click="addFeeInfoList">添加费用包含</el-button>
          <div v-show="updateAdminMerchantProductsObj.feeIn.length"
               v-for="item,index in updateAdminMerchantProductsObj.feeIn">
            <span style="margin: 10px 20px 10px 0">费用包含{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateFeeInfoList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteFeeInfoList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品费用不包含:" :label-width="formLabelWidth">
          <el-button type="primary" size="small" @click="addFeeNotInList">添加费用不包含</el-button>
          <div v-show="updateAdminMerchantProductsObj.feeNotIn.length"
               v-for="item,index in updateAdminMerchantProductsObj.feeNotIn">
            <span style="margin: 10px 20px 10px 0">费用不包含{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateFeeNotInList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteFeeNotInList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品预订须知:" :label-width="formLabelWidth">
          <el-button type="primary" size="small" @click="addBookList">添加预订须知</el-button>
          <div v-show="updateAdminMerchantProductsObj.bookKnow.length"
               v-for="item,index in updateAdminMerchantProductsObj.bookKnow">
            <span style="margin: 10px 20px 10px 0">预订须知{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateBookList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteBookList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品退改政策:" :label-width="formLabelWidth">
          <el-button type="primary" size="small" @click="addBackRuleList">添加退改政策</el-button>
          <div v-show="updateAdminMerchantProductsObj.backRule.length"
               v-for="item,index in updateAdminMerchantProductsObj.backRule">
            <span style="margin: 10px 20px 10px 0">退改政策{{index+1}} : {{item.ts_gi_Name}}</span>
            <el-button type="success" size="small" @click="updateBackRuleList(item,index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteBackRuleList(item,index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品标题:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminMerchantProductsObj.ta_tg_Title" placeholder="请输入产品标题"></el-input>
        </el-form-item>
        <el-form-item label="所属国家:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminMerchantProductsObj.ts_tg_Country" placeholder="请输入产品标题"></el-input>
        </el-form-item>
        <el-form-item label="所属省:" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择省份" @change="changeProvice">
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
        <el-form-item label="产品描述:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminMerchantProductsObj.ta_tg_Describe" placeholder="请输入产品描述"></el-input>
        </el-form-item>
        <el-form-item label="推荐价格:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminMerchantProductsObj.ts_tg_lowestPrice" placeholder="请输入推荐价格"></el-input>
        </el-form-item>
        <el-form-item label="成团地点:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_GroupSite" placeholder="请选择省份">
            <el-option
              v-for="item in proviceList"
              :key="item.sm_af_AreaName"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaName">
            </el-option>
          </el-select>
          <!--<el-input v-model="updateAdminMerchantProductsObj.ts_tg_GroupSite" placeholder="请输入成团地点"></el-input>-->
        </el-form-item>

        <el-form-item label="展示图片:" :label-width="formLabelWidth">
          <p>图片大小不能大于600KB</p>
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

        <el-form-item label="是否精选:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminMerchantProductsObj.ts_tg_Special" placeholder="请选择是否精选">
            <el-option
              label="展示"
              value="1">
            </el-option>
            <el-option
              label="不展示"
              value="0">
            </el-option>
          </el-select>
        </el-form-item>
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
        <el-button @click="cacheForm">取 消</el-button>
        <!--<el-button @click="updateAdminMerchantProductsDialog = false">取 消</el-button>-->
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!--推荐理由弹窗-->
    <el-dialog title="添加推荐理由" :visible.sync="addBuyReasonDialog">
      <el-form>
        <el-form-item label="推荐理由:" :label-width="formLabelWidth">
          <el-input v-model="recommendedReasonContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBuyReasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBuyReasonSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改推荐理由" :visible.sync="updateBuyReasonDialog">
      <el-form :model="updateBuyReasonObj">
        <el-form-item label="推荐理由:" :label-width="formLabelWidth">
          <el-input v-model="updateBuyReasonObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBuyReasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateBuyReasonSubmit(updateBuyReasonObj)">确 定</el-button>
      </div>
    </el-dialog>


    <!--产品介绍弹窗-->
    <el-dialog title="添加产品介绍" :visible.sync="addGoodIntroduceDialog">
      <el-form>
        <el-form-item label="产品介绍:" :label-width="formLabelWidth">
          <el-input v-model="goodIntroduceContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoodIntroduceDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGoodIntroduceSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改产品介绍" :visible.sync="updateGoodIntroduceDialog">
      <el-form :model="updateGoodIntroduceContentObj">
        <el-form-item label="产品介绍:" :label-width="formLabelWidth">
          <el-input v-model="updateGoodIntroduceContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateGoodIntroduceDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateGoodIntroduceSubmit(updateGoodIntroduceContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--费用包含弹窗-->
    <el-dialog title="添加费用包含" :visible.sync="addFeeInfoListDialog">
      <el-form>
        <el-form-item label="费用包含:" :label-width="formLabelWidth">
          <el-input v-model="feeInfoListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeInfoListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFeeInfoListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改费用包含" :visible.sync="updateFeeInfoListDialog">
      <el-form :model="updateFeeInfoListContentObj">
        <el-form-item label="费用包含:" :label-width="formLabelWidth">
          <el-input v-model="updateFeeInfoListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFeeInfoListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateFeeInfoListSubmit(updateFeeInfoListContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--费用不包含弹窗-->
    <el-dialog title="添加费用不包含" :visible.sync="addFeeInNotListDialog">
      <el-form>
        <el-form-item label="费用不包含:" :label-width="formLabelWidth">
          <el-input v-model="feeNotInListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeInNotListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFeeInNotListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改费用不包含" :visible.sync="updateFeeInNotListDialog">
      <el-form :model="updateFeeNotInListContentObj">
        <el-form-item label="费用不包含:" :label-width="formLabelWidth">
          <el-input v-model="updateFeeNotInListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFeeInNotListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateFeeInNotListSubmit(updateFeeNotInListContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--预订须知弹窗-->
    <el-dialog title="添加预订须知" :visible.sync="addBookListDialog">
      <el-form>
        <el-form-item label="预订须知:" :label-width="formLabelWidth">
          <el-input v-model="bookListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBookListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBookListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改预订须知" :visible.sync="updateBookListDialog">
      <el-form :model="updateBookListContentObj">
        <el-form-item label="预订须知:" :label-width="formLabelWidth">
          <el-input v-model="updateBookListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBookListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateBookListSubmit(updateBookListContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--退改政策弹窗-->
    <el-dialog title="添加退改政策" :visible.sync="addBackRuleListDialog">
      <el-form>
        <el-form-item label="退改政策:" :label-width="formLabelWidth">
          <el-input v-model="backRuleListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBackRuleListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBackRuleListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改退改政策" :visible.sync="updateBackRuleListDialog">
      <el-form :model="updateBackRuleListContentObj">
        <el-form-item label="退改政策:" :label-width="formLabelWidth">
          <el-input v-model="updateBackRuleListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBackRuleListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateBackRuleListSubmit(updateBackRuleListContentObj)">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'
  export default{
    name: '',
    components: {
      Upload
    },
    data(){
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
        obj:{},
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
        addData:{
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
          data:{}
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
        productCategoryList: []
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
    created(){
      //初始化省
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
      getProductCategory(){
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
      jump(obj){
        sessionStorage.setItem('id', obj.ta_tg_ID)
<<<<<<< HEAD
        if(obj.ta_tg_ID){
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + obj.ta_tg_ID, '_blank')
        }else{
          this.$notify({
            title: '警告',
            message: '产品编号为空。。。',
            type: 'warning'})
        }

=======
        window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + obj.ta_tg_ID, '_blank')
>>>>>>> 9afc5d48ba0c1788f8e2c5ea48c160ac0920213d
      },
      //删除修改对应图片
      deleteUpdateImageURL(val){
        this.isNewUploaNode = false
        this.updateImageURL = this.updateImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除对应图片
      deleteImageURL(val){
        this.isUploaNode = false;
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },

      closeDialog(){
        this.ImageURL = []
        this.updateImageURL = [];
        this.addDialog = false,
          this.updateDialog = false
      },
      cacheForm(){
        this.ImageURL = [],
          this.updateImageURL = [],
          this.addDialog = false,
          this.updateDialog = false
      },
      //查询很多
      selectInitData(id, ParentID){
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
      //添加退改政策
      addBackRuleList(){
        this.backRuleListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addBackRuleListDialog = true;
      },
      //添加退改政策提交
      addBackRuleListSubmit(){
        if (this.updateAdminMerchantProductsObj.backRule) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "6",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.backRuleListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 6)
            .then(data => {
              this.updateAdminMerchantProductsObj.backRule = data
            })
          }, err => {

          })
        } else {
          this.backRuleList.push({
            ts_gi_Name: this.backRuleListContent
          });
        }
        this.addBackRuleListDialog = false;
      },
      //修改退改政策
      updateBackRuleList(item, index){
        item.index = index;
        this.updateBackRuleListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateBackRuleListDialog = true;
      },
      //修改退改政策提交
      updateBackRuleListSubmit(item){
        if (this.updateAdminMerchantProductsObj.backRule) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateBackRuleListDialog = false;
          }, err => {

          })
        } else {
          this.updateBackRuleListDialog = false;
        }
      },
      //删除退改政策
      deleteBackRuleList(item, index){
        if (this.updateAdminMerchantProductsObj.backRule) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 6)
            .then(data => {
              this.updateAdminMerchantProductsObj.backRule = data
            })
          }, err => {

          })
        } else {
          this.backRuleList = this.backRuleList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },


      //添加预订须知多个须知
      addBookList(){
        this.bookListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addBookListDialog = true;
      },
      //添加预订须知提交
      addBookListSubmit(){
        if (this.updateAdminMerchantProductsObj.bookKnow) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "5",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.bookListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 5)
            .then(data => {
              this.updateAdminMerchantProductsObj.bookKnow = data
            })
          }, err => {

          })
        } else {
          this.bookList.push({
            ts_gi_Name: this.bookListContent
          });
        }
        this.addBookListDialog = false;
      },
      //修改预订须知
      updateBookList(item, index){
        item.index = index;
        this.updateBookListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateBookListDialog = true;
      },
      //修改预订须知提交
      updateBookListSubmit(item){
        if (this.updateAdminMerchantProductsObj.bookKnow) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateBookListDialog = false;
          }, err => {

          })
        } else {
          this.updateBookListDialog = false;
        }
      },
      //删除预订须知
      deleteBookList(item, index){
        if (this.updateAdminMerchantProductsObj.bookKnow) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 5)
            .then(data => {
              this.updateAdminMerchantProductsObj.bookKnow = data
            })
          }, err => {

          })
        }
        else {
          this.bookList = this.bookList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },


      //添加费用不包含多个费用
      addFeeNotInList(){
        this.feeNotInListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addFeeInNotListDialog = true;
      },
      //添加费用不包含提交
      addFeeInNotListSubmit(){

        if (this.updateAdminMerchantProductsObj.feeNotIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "4",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.feeNotInListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 4)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeNotIn = data
            })
          }, err => {

          })
        } else {
          this.feeNotInList.push({
            ts_gi_Name: this.feeNotInListContent
          });
        }
        this.addFeeInNotListDialog = false;
      },
      //修改费用不包含
      updateFeeNotInList(item, index){
        item.index = index;
        this.updateFeeNotInListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateFeeInNotListDialog = true;
      },
      //修改费用不包含提交
      updateFeeInNotListSubmit(item){
        if (this.updateAdminMerchantProductsObj.feeNotIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateFeeInNotListDialog = false;
          }, err => {

          })
        } else {
          this.updateFeeInNotListDialog = false;
        }
      },
      //删除费用不包含
      deleteFeeNotInList(item, index){
        if (this.updateAdminMerchantProductsObj.feeNotIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 4)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeNotIn = data
            })
          }, err => {

          })
        } else {
          this.feeNotInList = this.feeNotInList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },


      //添加费用包含多个费用
      addFeeInfoList(){
        this.feeInfoListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addFeeInfoListDialog = true;
      },
      //添加费用包含提交
      addFeeInfoListSubmit(){
        if (this.updateAdminMerchantProductsObj.feeIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "3",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.feeInfoListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 3)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeIn = data
            })
          }, err => {

          })
        } else {
          this.feeInfoList.push({
            ts_gi_Name: this.feeInfoListContent
          });
        }
        this.addFeeInfoListDialog = false;
      },
      //修改费用包含
      updateFeeInfoList(item, index){
        item.index = index;
        this.updateFeeInfoListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateFeeInfoListDialog = true;
      },
      //修改费用包含提交
      updateFeeInfoListSubmit(item){
        if (this.updateAdminMerchantProductsObj.feeIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateFeeInfoListDialog = false;
          }, err => {

          })
        } else {
          this.updateFeeInfoListDialog = false;
        }

      },
      //删除费用包含
      deleteFeeInfoList(item, index){
        if (this.updateAdminMerchantProductsObj.feeIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 3)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeIn = data
            })
          }, err => {

          })
        } else {
          this.feeInfoList = this.feeInfoList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },
      //添加产品多个介绍
      addGoodIntroduce(){
        this.goodIntroduceContent = '';
        this.$store.commit('setTranstionFalse');
        this.addGoodIntroduceDialog = true;
      },
      //添加产品介绍提交
      addGoodIntroduceSubmit(){
        if (this.updateAdminMerchantProductsObj.goodIntroduce) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "2",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.goodIntroduceContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 2)
            .then(data => {
              this.updateAdminMerchantProductsObj.goodIntroduce = data
            })
          }, err => {

          })
        } else {
          this.goodIntroduce.push({
            ts_gi_Name: this.goodIntroduceContent
          });
        }
        this.addGoodIntroduceDialog = false;
      },
      //修改产品介绍
      updateGoodIntroduce(item, index){
        item.index = index;
        this.updateGoodIntroduceContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateGoodIntroduceDialog = true;
      },
      //修改产品介绍提交
      updateGoodIntroduceSubmit(item){
        if (this.updateAdminMerchantProductsObj.goodIntroduce) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateGoodIntroduceDialog = false;
          }, err => {

          })
        } else {
          this.updateGoodIntroduceDialog = false;
        }

      },
      //删除产品介绍
      deleteGoodIntroduce(item, index){
        if (this.updateAdminMerchantProductsObj.goodIntroduce) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 2)
            .then(data => {
              this.updateAdminMerchantProductsObj.goodIntroduce = data
            })
          }, err => {

          })
        } else {
          this.goodIntroduce = this.goodIntroduce.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },

      //添加推荐理由
      RecommendedReason(){
        this.recommendedReasonContent = '';
        this.$store.commit('setTranstionFalse');
        this.addBuyReasonDialog = true;
      },
      //添加推荐理由提交
      addBuyReasonSubmit(){
        if (this.updateAdminMerchantProductsObj.buyReason) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "1",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.recommendedReasonContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 1)
            .then(data => {
              this.updateAdminMerchantProductsObj.buyReason = data
            })
          }, err => {

          })
        } else {
          this.buyReason.push({
            ts_gi_Name: this.recommendedReasonContent
          });
        }

        this.addBuyReasonDialog = false;
      },
      //修改推荐理由
      updateBuyReason(item, index){
        item.index = index;
        this.updateBuyReasonObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateBuyReasonDialog = true;
      },
      //修改推荐理由提交
      updateBuyReasonSubmit(item){
        if (this.updateAdminMerchantProductsObj.buyReason) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateBuyReasonDialog = false;
          }, err => {

          })
        } else {
          this.updateBuyReasonDialog = false;
        }
      },
      //删除推荐理由
      deleteBuyReason(item, index){
        if (this.updateAdminMerchantProductsObj.buyReason) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 1)
            .then(data => {
              this.updateAdminMerchantProductsObj.buyReason = data
            })
          }, err => {

          })
        } else {
          this.buyReason = this.buyReason.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }


      },
      //选中省
      changeProvice(item){
        this.obj = this.proviceList.filter(v => {
          if (v.sm_af_AreaID == item) {
            return true;
          }
          return false;
        })[0]
//        this.updateAdminMerchantProductsObj.ts_tg_Provice = obj.sm_af_AreaName

//        this.addData.ts_tg_Provice = obj.sm_af_AreaName
        let searchCity = {
          "areaPid": this.value
        }
        this.$store.dispatch('initCityList', searchCity)
      },
      //选中商家
      handleSelect(item){
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
      initData(id, page, title){
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
      search(){
        this.initData(this.productsID, 1, this.title)
      },
      //查询初始化数据
      searchInitData(){
        this.initData(this.productsID)
      },

      //分页
      handleCurrentChange(num){
        this.num = num;
        this.initData(this.productsID, num);
      },

      //添加
      addAdminMerchantProducts(){

//        for (let attr in this.addOptions) {
//          this.addOptions[attr] = ''
//        }

        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
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
      //修改
      updateAdminMerchantProducts(obj){
        this.updateAdminMerchantProductsObj = obj;
        this.$store.commit('setTranstionFalse');
        setTimeout(() => {
          this.updateImageURL = this.updateAdminMerchantProductsObj.ta_tg_ShowImages
          this.updateDialog = true;
        }, 30)


      },
      //修改提交
      updateSubmit(){
        this.updateAdminMerchantProductsObj.ts_tg_Provice = this.obj.sm_af_AreaName
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminMerchantProductsObj
        };
        this.updateAdminMerchantProductsObj.ta_tg_ShowImage = this.updateImageURL.join(',')
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
      DeleteAdminMerchantProducts(id){
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
      productLineManagement(id){
        this.$store.commit('adminProductLineManagementId', id);
        this.$router.push({path: '/travel/adminQueryProductInformation'})
        sessionStorage.setItem('index', '1')
      }
    },
    mounted(){
      this.searchInitData();
    },
    updated(){
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
