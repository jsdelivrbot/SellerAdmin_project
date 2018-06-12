<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">申请景点展示首页</h1>
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
              <el-form-item label="景点编码(主键):">
                <span>{{ props.row.tm_ts_Code }}</span>
              </el-form-item>
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
                <img v-for="item,index in props.row.tm_ts_ShowImage" :src="item" width="300" height="150"
                     style="margin-top: 10px;">
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
                <span>{{ props.row.tm_ts_IsHot }}</span>
              </el-form-item>
              <el-form-item label="是否境外景点:">
                <span>{{ props.row.tm_ts_IsOversea }}</span>
              </el-form-item>
              <el-form-item label="是否当季精选:">
                <span>{{ props.row.tm_ts_IsSeasonChoice }}</span>
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
            <el-button type="success" size="mini" @click="apply(scope.row)">
              <template>{{scope.row.showTopLabel}}</template>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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
      'ticketAttractionsList'
    ]),
    data() {
      return {
        siteName: '',
        total: 0,
        adminUserInfo: {},
        isLoading: false,
        page:1,
      }
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.page = num;
        this.initData('')
      },


      initData(name) {
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
          "page": this.page ? this.page : 1,
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

      search() {
        this.initData(this.siteName)
      },
      //申请
      apply(obj) {
        if (obj.tm_ts_ShowTop == 0) {
          obj.tm_ts_ShowTop = 1;
        } else {
          obj.tm_ts_ShowTop = 0;
        }
        let updateTourSiteIsShowTop = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": obj.tm_ts_Code,
          "tm_ts_ShowTop": obj.tm_ts_ShowTop,
        }
        this.$store.dispatch('applyShowHomePage', updateTourSiteIsShowTop)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData('');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      }
    },
    created() {
      this.adminUserInfo = JSON.parse(sessionStorage.getItem('admin'));
      this.initData('')
    }
  }
</script>
<style scoped>
</style>
