<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">景点信息</h1>

      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>景点名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="siteName" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
            <el-button type="primary" @click="Add" size="mini">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="ticketAttractionsList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="景点名称:">
                <span>{{ props.row.tm_ts_Name }}</span>
              </el-form-item>
              <el-form-item label="主题名称:">
                <span>{{ props.row.tm_tt_Name }}</span>
              </el-form-item>
              <el-form-item label="洲:">
                <span>{{ props.row.tm_ts_GreatName }}</span>
              </el-form-item>
              <el-form-item label="国:">
                <span>{{ props.row.tm_ts_CountrieName }}</span>
              </el-form-item>
              <el-form-item label="省:">
                <span>{{ props.row.tm_ts_ProviceName }}</span>
              </el-form-item>
              <el-form-item label="市:">
                <span>{{ props.row.tm_ts_CityName }}</span>
              </el-form-item>
              <el-form-item label="县:">
                <span>{{ props.row.tm_ts_ContryName }}</span>
              </el-form-item>
              <el-form-item label="展示图片:">
                <img v-for="item,index in props.row.tm_ts_ShowImage" width="300" height="150"
                     style="margin: 10px 15px 0;" v-lazy="item">
              </el-form-item>
              <el-form-item label="简介:">
                <span>{{ props.row.tm_ts_Introduce }}</span>
              </el-form-item>
              <el-form-item label="详细介绍:">
                <!--<ul>-->
                <!--<li-->
                <!--v-for="item,index in props.row.tm_ts_Detailedintroductions"-->
                <!--v-if="item.tm_ti_ParentID == 1"-->
                <!--&gt;{{item.tm_ti_Content}}</li>-->
                <!--<li-->
                <!--v-for="item,index in props.row.tm_ts_Detailedintroductions"-->
                <!--v-if="item.tm_ti_ParentID == 2"-->
                <!--&gt;-->
                <!--<img :src="item.tm_ti_Content" style="height: 100px;">-->
                <!--</li>-->
                <!--</ul>-->
                <div v-html="props.row.tm_ts_Detailedintroduction"></div>
              </el-form-item>
              <el-form-item label="详细地址:">
                <span>{{ props.row.tm_ts_Address }}</span>
              </el-form-item>
              <!--<el-form-item label="景点开放时间:">-->
                <!--<span>{{props.row.tm_ts_Opentime2}}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="开放时间:">
                <span>{{props.row.tm_ts_Opentime}}</span>
              </el-form-item>
              <el-form-item label="建议游玩时长:">
                <span>{{ props.row.tm_ts_Time }}</span>
              </el-form-item>
              <el-form-item label="联系电话号码:">
                <span>{{ props.row.tm_ts_Phone }}</span>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.tm_ts_Longitude }}</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.tm_ts_Latitude }}</span>
              </el-form-item>
              <el-form-item label="是否热门景点:">
                <span>{{ props.row.tm_ts_IsHot | getIsHot}}</span>
              </el-form-item>
              <!--<el-form-item label="是否精选景点:">-->
              <!--<span>{{ props.row.tm_ts_IsChoice }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="是否境外景点:">
                <span>{{ props.row.tm_ts_IsOversea | getIsOversea}}</span>
              </el-form-item>
              <el-form-item label="是否当季精选:">
                <span>{{ props.row.tm_ts_IsSeasonChoice | getIsSeasonChoice}}</span>
              </el-form-item>
              <el-form-item label="是否展示在首页:">
                <span>{{ props.row.tm_ts_ShowTop | getIsShowTop}}</span>
              </el-form-item>
              <el-form-item label="建议价格:">
                <span>{{ props.row.tm_ts_SuggestPrice }}元</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.tm_ts_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="审核状态:">
                <span>{{ props.row.tm_ts_IsPass | getIsPass }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ props.row.tm_ts_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--label="景点编码"-->
        <!--prop="tm_ts_Code">-->
        <!--</el-table-column>-->
        <el-table-column
          label="景点名称"
          prop="tm_ts_Name">
        </el-table-column>
        <el-table-column
          label="联系电话号码"
          prop="tm_ts_Phone">
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteTicketAttractions(scope.row.tm_ts_Code)">删除
            </el-button>
            <el-button
              size="mini"
              @click="AddMap(scope.row.tm_ts_Code)">添加地图导览
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加景点-->

      <el-dialog
        title="添加景点信息"
        :visible.sync="addDialog"
        width="60%"
        :close-on-click-modal="false"
        @close="closeDialog">
        <el-form :model="addOptions">
          <el-form-item label="景点名称:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Name"></el-input>
          </el-form-item>
          <el-form-item label="选择主题类型:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.tm_ts_ThemeTypeID" placeholder="请选择主题类型">
              <el-option
                v-for="item in themeTypeList"
                :key="item.tm_tt_ID"
                :label="item.tm_tt_Name"
                :value="item.tm_tt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="洲:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.tm_ts_GreatID" placeholder="请选择洲" @change="changeGreat">
              <el-option
                v-for="item in ticketGreatList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.tm_ts_CountrieID" placeholder="请选择国家" @change="changeCountrie">
              <el-option
                v-for="item in ticketCountrieList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.tm_ts_ProviceID" placeholder="请选择省" @change="changeProvice">
              <el-option
                v-for="item in ticketProviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.tm_ts_CityID" placeholder="请选择市" @change="changeCity">
              <el-option
                v-for="item in ticketCityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="县:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.tm_ts_ContryID" placeholder="请选择县">
              <el-option
                v-for="item in ticketContryList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="展示图片:" :label-width="formLabelWidth">

            <p>单张图片大小不能大于600KB</p>
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
          <el-form-item label="简介:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_ts_Introduce"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍:" :label-width="formLabelWidth">
            <tinymce :height="300" v-model="addOptions.tm_ts_Detailedintroduction"></tinymce>
            <!--<el-input v-model="addOptions.tm_ts_Detailedintroduction" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="详细地址:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Address"></el-input>
          </el-form-item>
          <el-form-item label="开放时间(简单设置):" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Opentime"></el-input>
          </el-form-item>
          <!--<el-form-item label="开放时间:" :label-width="formLabelWidth" required>-->
            <!--<tinymce :height="300" v-model="addOptions.tm_ts_Opentime"></tinymce>-->
            <!--&lt;!&ndash;<el-input v-model="addOptions.tm_ts_Opentime"></el-input>&ndash;&gt;-->
          <!--</el-form-item>-->
          <el-form-item label="建议游玩时长:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Time" placeholder="以小时为单位且为数字"></el-input>
          </el-form-item>
          <el-form-item label="联系电话号码:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Phone"></el-input>
          </el-form-item>
          <el-form-item label="点击获取经纬度再填写:" label-width="200px">
            <el-button type="primary" @click="getLatitude" size="small">获取经纬度</el-button>
          </el-form-item>
          <el-form-item label="经度:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Longitude" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Latitude" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="是否热门景点:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.tm_ts_IsHot" placeholder="请选择">
              <el-option
                v-for="item in selectedScenicSpot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否境外景点:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.tm_ts_IsOversea" placeholder="请选择">
              <el-option
                v-for="item in overseasScenicSpots"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否当季精选:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.tm_ts_IsSeasonChoice" placeholder="请选择">
              <el-option
                v-for="item in seasonSelection"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建议价格:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_SuggestPrice" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_ts_Remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改景点-->

      <el-dialog
        title="修改景点信息"
        :visible.sync="updateDialog"
        width="60%"
        :close-on-click-modal="false"
        @close="closeDialog">
        <el-form :model="updateTicketAttractionsObj">
          <el-form-item label="景点名称:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Name"></el-input>
          </el-form-item>
          <el-form-item label="选择主题类型:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_tt_Name" placeholder="请选择主题类型">
              <el-option
                v-for="item in themeTypeList"
                :key="item.tm_tt_ID"
                :label="item.tm_tt_Name"
                :value="item.tm_tt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="洲:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_GreatName" placeholder="请选择洲"
                       @change="changeUpdateGreat">
              <el-option
                v-for="item in ticketGreatList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_CountrieName" placeholder="请选择国家"
                       @change="changeUpdateCountrie">
              <el-option
                v-for="item in ticketCountrieList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_ProviceName" placeholder="请选择省"
                       @change="changeUpdateProvice">
              <el-option
                v-for="item in ticketProviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_CityName" placeholder="请选择市"
                       @change="changeUpdateCity">
              <el-option
                v-for="item in ticketCityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="县:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_ContryName" placeholder="请选择县">
              <el-option
                v-for="item in ticketContryList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
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
          <el-form-item label="简介:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Introduce"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍:" :label-width="formLabelWidth">
            <tinymce :height="300" v-model="updateTicketAttractionsObj.tm_ts_Detailedintroduction"></tinymce>
            <!--<el-input v-model="updateTicketAttractionsObj.tm_ts_Detailedintroduction" type="textarea"></el-input>-->
          </el-form-item>
          <el-form-item label="详细地址:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Address"></el-input>
          </el-form-item>
          <!--<el-form-item label="开放时间:" :label-width="formLabelWidth" required>-->

            <!--<tinymce :height="300" v-model="updateTicketAttractionsObj.tm_ts_Opentime"></tinymce>-->

            <!--&lt;!&ndash;<el-input v-model="updateTicketAttractionsObj.tm_ts_Opentime"></el-input>&ndash;&gt;-->
          <!--</el-form-item>-->
          <el-form-item label="开放时间(简单设置):" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Opentime"></el-input>
          </el-form-item>
          <el-form-item label="建议游玩时长:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Time" placeholder="以小时为单位且为数字"></el-input>
          </el-form-item>
          <el-form-item label="联系电话号码:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Phone"></el-input>
          </el-form-item>
          <el-form-item label="点击获取经纬度再填写:" label-width="200px">
            <el-button type="primary" @click="getLatitude" size="small">获取经纬度</el-button>
          </el-form-item>
          <el-form-item label="经度:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Longitude" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Latitude" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="是否热门景点:" :label-width="formLabelWidth">
            <el-select v-model="updateTicketAttractionsObj.tm_ts_IsHot" placeholder="请选择">
              <el-option
                v-for="item in selectedScenicSpot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否境外景点:" :label-width="formLabelWidth">
            <el-select v-model="updateTicketAttractionsObj.tm_ts_IsOversea" placeholder="请选择">
              <el-option
                v-for="item in overseasScenicSpots"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否当季精选:" :label-width="formLabelWidth">
            <el-select v-model="updateTicketAttractionsObj.tm_ts_IsSeasonChoice" placeholder="请选择">
              <el-option
                v-for="item in seasonSelection"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建议价格:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_SuggestPrice" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
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

    <!--地图-->

    <div class="mapJW" v-show="isMap">
      <div id="allmap">
      </div>
      <el-form ref="form" :model="form"
               style="z-index: 9990;position: absolute;background: #fff;bottom: 30px;left: 0;padding: 10px 30px;">
        <el-form-item label="经度">
          <el-input v-model="form.x"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="form.y"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="success">提交</el-button>
      </el-form>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr, isNewPhone} from '@/assets/js/public'
  import Tinymce from '@/components/NewTinymce'
  import Upload from '@/components/Upload'
  export default {
    name: '',
    components: {
      Upload,
      Tinymce
    },
    data() {
      return {
        isUploaNode: true,
        isNewUploaNode: true,
        formLabelWidth: '120px',
        isMap: false,
        siteName: '',//景点名称搜索
        adminUserInfo: {},
        total: 0,
        addDialog: false,//添加弹窗
        updateDialog: false,//修改弹窗
        form: {
          x: '',
          y: ''
        },
        //添加参数
        addOptions: {
          "tm_ts_Code": "",//景点编码(主键)
          "tm_ts_Name": "",//景点名称
          "tm_ts_TradeInfoID": '',
          "tm_ts_ThemeTypeID": '',//主题编码
          "tm_ts_GreatID": "",//洲
          "tm_ts_CountrieID": "",//国
          "tm_ts_ProviceID": "",//省
          "tm_ts_CityID": "",//市
          "tm_ts_ContryID": "",//县
          "tm_ts_ShowImage": "",//展示图片
          "tm_ts_Introduce": "",//介绍
          "tm_ts_Detailedintroduction": "",//详细介绍
          "tm_ts_Address": "",//详细地址
          "tm_ts_Opentime": "",//开放时间
          tm_ts_Opentime2:'',
          "tm_ts_Time": "",//建议游玩时间（以小时为单位）
          "tm_ts_Phone": "",//联系电话号码
          "tm_ts_Longitude": "",//经度
          "tm_ts_Latitude": "",//纬度
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门）
          "tm_ts_IsChoice": "",//是否精选景点（0普通1精选）
          "tm_ts_IsOversea": "",//是否境外景点（0境内1境外）
          "tm_ts_IsSeasonChoice": "",// 是否当季精选（0否1是）
          "tm_ts_SuggestPrice": "",//建议价格
          "tm_ts_Remark": "",//备注
        },
        //是否热门景点
        selectedScenicSpot: [
          {
            value: '0',
            label: '普通'
          },
          {
            value: '1',
            label: '热门'
          }
        ],
        //是否境外景点
        overseasScenicSpots: [
          {
            value: '0',
            label: '境内'
          },
          {
            value: '1',
            label: '境外'
          }
        ],
        //是否当季精选
        seasonSelection: [
          {
            value: '0',
            label: '否'
          },
          {
            value: '1',
            label: '是'
          }
        ],
        //是否删除
        selectDelete: [
          {
            value: '0',
            label: '不删除'
          },
          {
            value: '1',
            label: '删除'
          }
        ],
        updateTicketAttractionsObj: {},
        ImageURL: [],
        showImageList: [],
        updateDialog: false,
        isLoading: false,
        updateImageURL: [],
        value: '',
        imageObj: {accept: 'image/*'},
        radioIndex: '',
        addRadioIndex: 0,
        html:'',
        imageArr: [],
        num:1
      }
    },
    computed: mapGetters([
      'ticketAttractionsList',
      'themeTypeList',
      'ticketGreatList',
      'ticketCountrieList',
      'ticketProviceList',
      'ticketCityList',
      'ticketContryList',
//      'updateTicketAttractionsObj'
    ]),
    created() {
      this.adminUserInfo = JSON.parse(sessionStorage.getItem('admin'));
      this.initData('', 1);
      this.initGreat();
      this.initTheme();
    },
    mounted() {
      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          this.initData(this.siteName, 1);
        }
      });
    },
    methods: {
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
          this.imageArr.push(data.data);
        } else {
          this.ImageURL.splice(this.addRadioIndex - 1, 1, data.data);
          this.imageArr.splice(this.addRadioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },

      jump(obj) {

        sessionStorage.setItem("code", obj.tm_ts_Code)
        if (obj.tm_ts_IsPass == 0) {
          this.$notify({
            message: "当前景点信息未审核！需惠乐游审核！",
            type: 'error'
          })
        } else {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/admissionTicketMore?id=272&keycode=' + obj.tm_ts_Name, '_blank')
        }
      },
      //查询景点主题分类信息
      initTheme() {
        let getThemeTypeList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ttID": "",
          "ttName": "",
          "isDelete": 0,
        };
        this.$store.dispatch('initThemeType', getThemeTypeList)
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
        this.ImageURL = [],
          this.updateImageURL = [],
          this.addDialog = false,
          this.updateDialog = false
      },
      //获取经纬度
      getLatitude() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },
      //添加地图导览
      AddMap(id) {
        this.$router.push({name: 'TicketMap', params: {id: id}})
        // this.$router.push({name:'TicketMap',query:{id:id}})
      },
      clickGo(id) {
        if (this.value == 0) {
          this.goPredeterminedInstructions(id);
        }
        if (this.value == 1) {
          this.goTrafficInformation(id);
        }
      },
      //分页
      handleCurrentChange(num) {
        this.num = num;
        this.initData('', num)
      },
      initData(name, page) {
        this.isLoading = true;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": "",    //景点编码
          "tm_ts_Name": name ? name : '',//景点名称
          "tm_ts_TradeInfoID": this.adminUserInfo.sm_ui_ID,//供应商编码
          "tm_ts_IsDelete": 0,//必须传
          "tm_ts_IsPass": "",//是否通过审核(0审核中1通过审核2未通过审核)
          "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门)
          "tm_ts_ThemeTypeID": "",//主题编码
          "page": page ? page : 1,
          "rows": 5
        };
        this.$store.dispatch('initTicketAttractions', options)
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
        this.initData(this.siteName, 1)
      },
      initGreat() {
        let getAreaProvice = {
          "areaPid": -1
        }
        this.$store.dispatch('initTicketGreat', getAreaProvice)
          .then(() => {
          })
      },
      //选择洲
      changeGreat() {

        let getAreaProvice = {
          "areaPid": this.addOptions.tm_ts_GreatID
        };
        this.$store.dispatch('initTicketCountrie', getAreaProvice)
          .then()
      },
      //修改洲
      changeUpdateGreat() {
//        if (this.updateTicketAttractionsObj.tm_ts_GreatName) {
          this.updateTicketAttractionsObj.tm_ts_GreatID = this.updateTicketAttractionsObj.tm_ts_GreatName;
//        }
        let getAreaProvice = {
          "areaPid": this.updateTicketAttractionsObj.tm_ts_GreatName
        }
        this.$store.dispatch('initTicketCountrie', getAreaProvice)
          .then()
      },
      //选择国家
      changeCountrie() {
        let getAreaProvice = {
          "areaPid": this.addOptions.tm_ts_CountrieID
        }
        this.$store.dispatch('initTicketProvice', getAreaProvice)
          .then()
      },
      //选择国家
      changeUpdateCountrie() {
//        if (this.updateTicketAttractionsObj.tm_ts_CountrieName != '') {
          this.updateTicketAttractionsObj.tm_ts_CountrieID = this.updateTicketAttractionsObj.tm_ts_CountrieName;
//        }
        let getAreaProvice = {
          "areaPid": this.updateTicketAttractionsObj.tm_ts_CountrieName
        }
        this.$store.dispatch('initTicketProvice', getAreaProvice)
          .then()
      },
      //选择省
      changeProvice() {
        let getAreaProvice = {
          "areaPid": this.addOptions.tm_ts_ProviceID
        }
        this.$store.dispatch('initTicketCity', getAreaProvice)
          .then()
      },
      //修改选中省
      changeUpdateProvice() {
//        if (this.updateTicketAttractionsObj.tm_ts_ProviceName != '') {
          this.updateTicketAttractionsObj.tm_ts_ProviceID = this.updateTicketAttractionsObj.tm_ts_ProviceName;
//        }
        let getAreaProvice = {
          "areaPid": this.updateTicketAttractionsObj.tm_ts_ProviceName
        }
        this.$store.dispatch('initTicketCity', getAreaProvice)
          .then()
      },
//      选择市
      changeCity() {
        let getAreaProvice = {
          "areaPid": this.addOptions.tm_ts_CityID
        }
        this.$store.dispatch('initTicketContry', getAreaProvice)
          .then()
      },
      //修改市
      changeUpdateCity() {
//        if (this.updateTicketAttractionsObj.tm_ts_CityName != '') {
          this.updateTicketAttractionsObj.tm_ts_CityID = this.updateTicketAttractionsObj.tm_ts_CityName;
//        }
        let getAreaProvice = {
          "areaPid": this.updateTicketAttractionsObj.tm_ts_CityName
        }
        this.$store.dispatch('initTicketContry', getAreaProvice)
          .then()
      },
      //添加
      Add() {
        let uploader = document.querySelector('.uploader-list')
        if(uploader){
          uploader.querySelector('ul').innerHTML = ''
        }
        for(let attr in this.addOptions){
          this.addOptions[attr] = ''
        }
        if( this.imageArr.length ){
          this.ImageURL = this.imageArr;
        }
        this.addOptions.tm_ts_GreatID = '';
        this.addOptions.tm_ts_CountrieID = '';
        this.addOptions.tm_ts_ProviceID = '';
        this.addOptions.tm_ts_CityID = '';
        this.addOptions.tm_ts_ContryID = '';
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.addOptions.tm_ts_TradeInfoID = this.adminUserInfo.sm_ui_ID;
      },
      //添加提交
      addSubmit() {
        this.addOptions.tm_ts_ShowImage = this.ImageURL.join(',')
//        console.log(JSON.stringify(this.addOptions))
//        return
        if (isNaN(this.addOptions.tm_ts_Time)) {
          this.$notify({
            message: '建议游玩时长，请输入数字',
            type: 'error'
          });
          return
        }

        if (isNaN(this.addOptions.tm_ts_SuggestPrice)) {
          this.$notify({
            message: '建议价格，请输入数字',
            type: 'error'
          });
          return
        }
        if (this.addOptions.tm_ts_Longitude.trim() == '' || this.addOptions.tm_ts_Latitude.trim() == '') {
          this.$notify({
            message: '经纬度必须输入!',
            type: 'error'
          });
          return
        }
//        if(isNewPhone(this.addOptions.tm_ts_Phone)){
//          alert('输入有误')
//          return
//        }
        let insertTourSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.addOptions
        }
        this.$store.dispatch('addTicletInformation', insertTourSite)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            window.location.reload()
//            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
//      修改
      update(obj) {
        this.updateTicketAttractionsObj = obj;
        setTimeout(() => {
          this.updateImageURL = obj.tm_ts_ShowImage
          this.updateDialog = true;
        }, 30)

//        this.$store.commit('updateTicketAttractions', id);
      },
      //修改提交
      updateSubmit() {
        if (!isNaN(this.updateTicketAttractionsObj.tm_ts_ContryName)) {
          this.updateTicketAttractionsObj.tm_ts_ContryID = this.updateTicketAttractionsObj.tm_ts_ContryName;
        }else{

        }
        if (this.updateImageURL.length) {
          this.updateTicketAttractionsObj.tm_ts_ShowImage = this.updateImageURL.join(',');
        } else {
          if (this.updateTicketAttractionsObj.tm_ts_ShowImage) {
            this.updateTicketAttractionsObj.tm_ts_ShowImage = this.updateTicketAttractionsObj.tm_ts_ShowImage.join(',');
          }
        }
        if (!this.updateImageURL.length) {
          this.updateTicketAttractionsObj.tm_ts_ShowImage = ''
        }
        delete this.updateTicketAttractionsObj.tm_ts_GreatName;
        delete this.updateTicketAttractionsObj.tm_ts_CountrieName;
        delete this.updateTicketAttractionsObj.tm_ts_ProviceName;
        delete this.updateTicketAttractionsObj.tm_ts_CityName;
        delete this.updateTicketAttractionsObj.tm_ts_ContryName;
        this.updateTicketAttractionsObj.tm_ts_Phone = this.updateTicketAttractionsObj.tm_ts_Phone.trim();
        if (!isNaN(this.updateTicketAttractionsObj.tm_tt_Name)) {
          this.updateTicketAttractionsObj.tm_ts_ThemeTypeID = this.updateTicketAttractionsObj.tm_tt_Name
        }
        let updateTourSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.updateTicketAttractionsObj
        };
        this.$store.dispatch('updateTicketAttractionsSubmit', updateTourSite)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData('', this.num);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateDialog = false;
      },
      //删除
      deleteTicketAttractions(id) {
        let deleteTourSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "tm_ts_Code": id,
          }
        };
        this.$store.dispatch('deleteTicketAttractions', deleteTourSite)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData('', this.num);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //前往预定须知组件
      goPredeterminedInstructions(id) {
        this.$router.push({name: 'PredeterminedInstructions', params: {id: id}})
      },
      //前往交通信息
      goTrafficInformation(id) {
        this.$router.push({name: 'TrafficInformation', params: {id: id}})
      }
    },
  }
</script>
<style scoped>
  #l-map {
    height: 500px;
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

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
