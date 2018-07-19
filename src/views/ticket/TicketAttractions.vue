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
              <!--<el-form-item label="景点编码(主键):">-->
                <!--<span>{{ props.row.tm_ts_Code }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="景点名称:">
                <span>{{ props.row.tm_ts_Name }}</span>
              </el-form-item>
              <el-form-item label="主题名称:">
                <span>{{ props.row.tm_tt_Name }}</span>
              </el-form-item>
              <!--<el-form-item label="票种编号:">-->
                <!--<span>{{ props.row.tm_tm_ID }}</span>-->
              <!--</el-form-item>-->
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
                <img v-for="item,index in props.row.tm_ts_ShowImage"  width="300" height="150"
                     style="margin-top: 10px;" v-lazy="item">
              </el-form-item>
              <el-form-item label="介绍:">
                <span>{{ props.row.tm_ts_Introduce }}</span>
              </el-form-item>
              <el-form-item label="详细介绍:">
                <span>{{ props.row.tm_ts_Detailedintroduction }}</span>
              </el-form-item>
              <el-form-item label="详细地址:">
                <span>{{ props.row.tm_ts_Address }}</span>
              </el-form-item>
              <el-form-item label="开放时间:">
                <span>{{ props.row.tm_ts_Opentime }}</span>
              </el-form-item>
              <el-form-item label="建议游玩时间:">
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
          </template>
        </el-table-column>
      </el-table>

      <!--添加景点-->

      <el-dialog title="添加景点信息" :visible.sync="addDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="addOptions">
          <!--<el-form-item label="景点编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.tm_ts_Code"></el-input>-->
          <!--</el-form-item>-->
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
            <a href="javascript:;" class="file">上传文件
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <div class="imgWap">
              <p  v-for="item,index in ImageURL" style="display: inline-block;position: relative;margin-right: 30px;">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURL.length"
                >
              </p>
            </div>
          </el-form-item>
          <el-form-item label="介绍:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_ts_Introduce"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_ts_Detailedintroduction" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="详细地址:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Address"></el-input>
          </el-form-item>
          <el-form-item label="开放时间:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.tm_ts_Opentime"></el-input>
          </el-form-item>
          <el-form-item label="建议游玩时间:" :label-width="formLabelWidth" required>
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

      <el-dialog title="修改景点信息" :visible.sync="updateDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="updateTicketAttractionsObj">
          <!--<el-form-item label="景点名称:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateTicketAttractionsObj.tm_ts_Name"></el-input>-->
          <!--</el-form-item>-->
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
            <el-select v-model="updateTicketAttractionsObj.tm_ts_GreatName" placeholder="请选择洲" @change="changeUpdateGreat">
              <el-option
                v-for="item in ticketGreatList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_CountrieName" placeholder="请选择国家" @change="changeUpdateCountrie">
              <el-option
                v-for="item in ticketCountrieList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_ProviceName" placeholder="请选择省" @change="changeUpdateProvice">
              <el-option
                v-for="item in ticketProviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTicketAttractionsObj.tm_ts_CityName" placeholder="请选择市" @change="changeUpdateCity">
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
            <a href="javascript:;" class="file">上传文件
              <input type="file" name="" ref="updateUpload" accept="image/*" multiple>
            </a>
            <p>如果不修改图片默认为原来的图片</p>
            <div class="imgWap">
              <p  v-for="item,index in updateImageURL" style="display: inline-block;position: relative;margin-right: 30px;">
                <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="updateImageURL.length"
                >
              </p>
            </div>
            <!--<img-->
              <!--style="display: block"-->
              <!--v-for="item in updateImageURL"-->
              <!--:src="item"-->
              <!--width="280"-->
              <!--height="125"-->
              <!--v-show="updateImageURL.length"-->
            <!--&gt;-->
          </el-form-item>
          <el-form-item label="介绍:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Introduce"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Detailedintroduction" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="详细地址:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Address"></el-input>
          </el-form-item>
          <el-form-item label="开放时间:" :label-width="formLabelWidth" required>
            <el-input v-model="updateTicketAttractionsObj.tm_ts_Opentime"></el-input>
          </el-form-item>
          <el-form-item label="建议游玩时间:" :label-width="formLabelWidth" required>
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
  import {getNewStr,isNewPhone} from '@/assets/js/public'
  export default {
    name: '',
    data() {
      return {
        isUploaNode:true,
        isNewUploaNode:true,
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
        updateTicketAttractionsObj:{},
        ImageURL: [],
        showImageList: [],
        updateDialog: false,
        isLoading: false,
        updateImageURL: [],
        value: '',
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
    },
    mounted() {
//      var _this = this;
//      var geolocation = new BMap.Geolocation();
//      geolocation.getCurrentPosition(function (r) {
//        _this.form.x = r.point.lng;
//        _this.form.y = r.point.lat;
//        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//          var map = new BMap.Map("allmap");
//          // var point = new BMap.Point(116.400244, 39.92556);
//          map.centerAndZoom(r.point, 12); //定义地图等级，就是放大倍数
//          map.enableScrollWheelZoom(true); //启用地图滚轮放大缩小
//          var marker = new BMap.Marker(r.point);// 创建标注
//          map.addOverlay(marker);  // 将标注添加到地图中
//          map.panTo(r.point);
//          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
//          marker.enableDragging(); //标注可拖拽
//          //marker.disableDragging();           // 不可拖拽
//          // 开启事件监听
//          marker.addEventListener("dragend", function (e) {
//            var x = e.point.lng; //经度
//            var y = e.point.lat; //纬度
////            alert("拖到的地点的经纬度：" + x + "，" + y);
//            _this.form.x = x;
//            _this.form.y = y;
//          });
//        }
//        else {
//          alert('failed' + this.getStatus());
//        }
//      }, {enableHighAccuracy: true})
    },
    methods: {
      //删除修改对应图片
      deleteUpdateImageURL(val){
        this.isNewUploaNode= false
        this.updateImageURL = this.updateImageURL.filter(v=>{
          if(v==val){
            return false
          }
          return true
        })
      },
      //删除对应图片
      deleteImageURL(val){
        this.isUploaNode = false;
        this.ImageURL = this.ImageURL.filter(v=>{
          if(v==val){
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
      //获取经纬度
      getLatitude(){
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },
      //添加地图导览
      AddMap(id) {
        this.$router.push({path: '/ticket/TicketMap', query: {id: id}})
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
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
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
      uploaNode(arr) {
        setTimeout(() => {
          if (this.$refs.upload&&this.isUploaNode) {
            if(arr){
              if(!arr.length){
                this.ImageURL = [];
              }
            }

            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
                      this.$refs.upload.value = '';
                      this.isUploaNode= false;
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
          if (this.$refs.updateUpload && this.isNewUploaNode) {
            if(arr){
              if(!arr.length){
                this.updateImageURL = [];
              }
            }
//            this.updateImageURL = [];
            this.$refs.updateUpload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.updateUpload.files.length; i++) {
                this.uploadToOSS(this.$refs.updateUpload.files[i])
                  .then(data => {
                    if (data) {
                      this.updateImageURL.push(data.data);
                      this.$refs.updateUpload.value = '';
                      this.isNewUploaNode= false;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                // })
              }
            })
          }
        }, 50)
      },
      //分页
      handleCurrentChange(num) {
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
      changeUpdateGreat(){
        if(this.updateTicketAttractionsObj.tm_ts_GreatName==''){
          this.updateTicketAttractionsObj.tm_ts_GreatName = this.updateTicketAttractionsObj.tm_ts_GreatID
        }
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
        if(this.updateTicketAttractionsObj.tm_ts_CountrieName==''){
          this.updateTicketAttractionsObj.tm_ts_CountrieName = this.updateTicketAttractionsObj.tm_ts_CountrieID
        }
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
        if(this.updateTicketAttractionsObj.tm_ts_ProviceName==''){
          this.updateTicketAttractionsObj.tm_ts_ProviceName = this.updateTicketAttractionsObj.tm_ts_ProviceID
        }
        let getAreaProvice = {
          "areaPid":this.updateTicketAttractionsObj.tm_ts_ProviceName
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
        if(this.updateTicketAttractionsObj.tm_ts_CityName==''){
          this.updateTicketAttractionsObj.tm_ts_CityName = this.updateTicketAttractionsObj.tm_ts_CityID
        }
        let getAreaProvice = {
          "areaPid":this.updateTicketAttractionsObj.tm_ts_CityName
        }
        this.$store.dispatch('initTicketContry', getAreaProvice)
        .then()
      },
      //添加
      Add() {
        this.addOptions.tm_ts_GreatID = '';
        this.addOptions.tm_ts_CountrieID = '';
        this.addOptions.tm_ts_ProviceID = '';
        this.addOptions.tm_ts_CityID = '';
        this.addOptions.tm_ts_ContryID = '';
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
       if(this.isUploaNode){
          this.uploaNode()
        };
        this.addOptions.tm_ts_TradeInfoID = this.adminUserInfo.sm_ui_ID;
      },
      //添加提交
      addSubmit() {
        this.addOptions.tm_ts_ShowImage = this.ImageURL.join(',')
        if(isNaN(this.addOptions.tm_ts_Time)){
          this.$notify({
            message: '建议游玩时间，请输入数字',
            type: 'error'
          });
          return
        }

        if(isNaN(this.addOptions.tm_ts_SuggestPrice)){
          this.$notify({
            message: '建议价格，请输入数字',
            type: 'error'
          });
          return
        }
        if(this.addOptions.tm_ts_Longitude.trim()==''||this.addOptions.tm_ts_Latitude.trim()==''){
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
        this.addOptions.tm_ts_ShowImage = this.ImageURL.join(',');
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
            this.initData();
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

        this.updateTicketAttractionsObj = obj
        setTimeout(()=>{
          this.updateImageURL = obj.tm_ts_ShowImage
          this.updateDialog = true;
          if(this.isNewUploaNode){
            this.uploaNode( this.updateImageURL)
          };
        },30)

//        this.$store.commit('updateTicketAttractions', id);
      },
      //修改提交
      updateSubmit() {
        if (this.updateImageURL.length) {
          this.updateTicketAttractionsObj.tm_ts_ShowImage = this.updateImageURL.join(',');
        }else{
          if(this.updateTicketAttractionsObj.tm_ts_ShowImage){
            this.updateTicketAttractionsObj.tm_ts_ShowImage = this.updateTicketAttractionsObj.tm_ts_ShowImage.join(',');
          }

        }
        if(!this.updateImageURL.length){
          this.updateTicketAttractionsObj.tm_ts_ShowImage = ''
        }
//        console.log(this.updateImageURL,this.updateTicketAttractionsObj.tm_ts_ShowImage)
//        return
//        if(this.updateTicketAttractionsObj.tm_tt_Name==''){
//          this.updateTicketAttractionsObj.tm_tt_Name =  this.updateTicketAttractionsObj.tm_ts_ThemeTypeID
//        }
//        console.log(this.updateTicketAttractionsObj)
//        return
//        this.updateTicketAttractionsObj.tm_ts_GreatID =  this.addOptions.tm_ts_GreatID
//        this.updateTicketAttractionsObj.tm_ts_CountrieID =  this.addOptions.tm_ts_CountrieID
//        this.updateTicketAttractionsObj.tm_ts_ProviceID =  this.addOptions.tm_ts_ProviceID
//        this.updateTicketAttractionsObj.tm_ts_CityID =  this.addOptions.tm_ts_CityID
//        this.updateTicketAttractionsObj.tm_ts_ContryID =  this.addOptions.tm_ts_ContryID
//        delete this.updateTicketAttractionsObj.tm_tt_Name;
        delete this.updateTicketAttractionsObj.tm_ts_GreatName;
        delete this.updateTicketAttractionsObj.tm_ts_CountrieName;
        delete this.updateTicketAttractionsObj.tm_ts_ProviceName;
        delete this.updateTicketAttractionsObj.tm_ts_CityName;
        delete this.updateTicketAttractionsObj.tm_ts_ContryName;
//        for(var attr in this.updateTicketAttractionsObj){
//          this.updateTicketAttractionsObj[attr] = this.updateTicketAttractionsObj[attr].trim()
//        }
        this.updateTicketAttractionsObj.tm_ts_Phone =  this.updateTicketAttractionsObj.tm_ts_Phone.trim();
        if(!isNaN(this.updateTicketAttractionsObj.tm_tt_Name)){
          this.updateTicketAttractionsObj.tm_ts_ThemeTypeID =this.updateTicketAttractionsObj.tm_tt_Name
        }

//        console.log( this.updateTicketAttractionsObj)
//        return
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
            this.initData('', 1);
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
            this.initData('', 1);
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
  .imgWap{

  }
  .imgWap span{
    position: absolute;
    right: -15px;
    top: -6px;
  }
</style>
