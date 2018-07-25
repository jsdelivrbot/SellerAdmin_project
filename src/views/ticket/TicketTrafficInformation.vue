<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">交通信息</h1>

      <!--添加-->

      <div class="add">
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
        :data="trafficInformationList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="tm_tm_ID"
          align="center"
          label="交通信息编号">
        </el-table-column>
        <el-table-column label="自驾线路"  align="center">
          <template slot-scope="scope">
            <el-popover
              ref="popover1"
              placement="top-start"
              title="自驾线路"
              width="300"
              align="center"
              trigger="hover"
              :content="scope.row.tm_tm_Drive">
            </el-popover>
            <el-button v-popover:popover1 size="mini">移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="公交线路" align="center">
          <template slot-scope="scope">
            <el-popover
              ref="popover2"
              placement="top-start"
              title="公交线路"
              width="300"
              align="center"
              trigger="hover"
              :content="scope.row.tm_tm_Bus">
            </el-popover>
            <el-button v-popover:popover2 size="mini">移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="景点地址" align="center">
          <template slot-scope="scope">
            <el-popover
              ref="popover3"
              placement="top-start"
              title="景点地址"
              width="300"
              align="center"
              trigger="hover"
              :content="scope.row.tm_tm_Address">
            </el-popover>
            <el-button v-popover:popover3 size="mini">移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="update(scope.row.tm_tm_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteTrafficInformation(scope.row.tm_tm_ID)">删除
            </el-button>

            <el-button
              type="success"
              size="small"
              @click="jump(scope.row)">预览效果
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加交通信息-->

      <el-dialog title="添加交通信息" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="景点名称:" :label-width="formLabelWidth">

            <el-autocomplete
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>
            <!--<el-select v-model="addOptions.tm_tm_TourSiteID" placeholder="请选择景点">-->
              <!--<el-option-->
                <!--v-for="item in ticketAttractionsList"-->
                <!--:key="item.tm_ts_Code"-->
                <!--:label="item.tm_ts_Name"-->
                <!--:value="item.tm_ts_Code">-->
              <!--</el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="自驾线路:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tm_Drive" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="公交线路:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tm_Bus" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="景点地址:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tm_Address" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改交通信息-->

      <el-dialog title="修改交通信息" :visible.sync="updateDialog">
        <el-form :model="updateTrafficInformationObj">
          <el-form-item label="景点名称:" :label-width="formLabelWidth">

            <el-autocomplete
              v-model="tourName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点名称"
              @select="handleSelect"
            ></el-autocomplete>
            <!--<el-select v-model="updateTrafficInformationObj.tm_tm_TourSiteID" placeholder="请选择景点">-->
              <!--<el-option-->
                <!--v-for="item in ticketAttractionsList"-->
                <!--:key="item.tm_ts_Code"-->
                <!--:label="item.tm_ts_Name"-->
                <!--:value="item.tm_ts_Code">-->
              <!--</el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="自驾线路:" :label-width="formLabelWidth">
            <el-input v-model="updateTrafficInformationObj.tm_tm_Drive" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="公交线路:" :label-width="formLabelWidth">
            <el-input v-model="updateTrafficInformationObj.tm_tm_Bus" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="景点地址:" :label-width="formLabelWidth">
            <el-input v-model="updateTrafficInformationObj.tm_tm_Address" type="textarea"></el-input>
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

  export default {
    computed: mapGetters([
      'trafficInformationList',
      'updateTrafficInformationObj',
      'ticketAttractionsList'
    ]),
    data() {
      return {
        addOptions: {
          "tm_tm_TourSiteID": "",
          "tm_tm_Drive": "",
          "tm_tm_Bus": "",
          "tm_tm_Address": ""
        },
        tourName:'',
        addDialog: false,
        formLabelWidth: '120px',
        isLoading: false,
        updateDialog: false,
        adminUserInfo: '',
        ticketAttractionsValue: ''
      }
    },
    methods: {
      jump(obj){
        window.open('http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/'+this.ticketAttractionsValue,'_blank')
      },
      handleSelect(item){
        this.ticketAttractionsValue = item.id;
        this.addOptions.tm_tm_TourSiteID = item.id;
        this.updateTrafficInformationObj.tm_tm_TourSiteID = item.id;
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
          "page": 1,
          "rows": 10
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
        if( !id ){
          this.$notify({
            message: '请选择景点!!',
            type: 'error'
          });
          return
        }
        this.isLoading = true;
        let getTransport = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "tm_tm_TourSiteID": id,
        };
        this.$store.dispatch('initTrafficInformation', getTransport)
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
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.addOptions.tm_tm_TourSiteID = this.ticketAttractionsValue
      },
      addSubmit() {
        let insertTransport = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.addOptions
        };
        this.$store.dispatch('addTrafficInformationSubmit', insertTransport)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.addOptions.tm_tm_TourSiteID)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },

      update(id) {
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('updateTrafficInformation', id)
      },
      updateSubmit() {
        let updateTransport = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.updateTrafficInformationObj
        };
        this.$store.dispatch('updateTrafficInformationSubmit', updateTransport)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.updateTrafficInformationObj.tm_tm_TourSiteID);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateDialog = false;
      },

      deleteTrafficInformation(id) {
        let deleteTransport = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "tm_tm_ID": id
          }
        };
        this.$store.dispatch('deleteTrafficInformation', deleteTransport)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.ticketAttractionsValue);
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
//      this.initTicketAttraction();
    }
  }
</script>
<style scoped>
  .add {
    margin: 20px;
  }
</style>
