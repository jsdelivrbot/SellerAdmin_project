<template>
  <div>
    <div id="wrap" class="clearfix">
      <div class="title clearfix" style="padding: 20px">
        <h1>酒店基本信息</h1><br/>
        <div>
          <el-button type="primary" v-show="isShow" @click="addButton" size="small" style="margin-left: 200px;">添加</el-button>
        </div>

      </div>

      <!--数据展示-->

      <el-table
        :data="myHotelDetailsList"
        style="width: 100%"
        v-loading = "isLoading"
        v-show="!isShow"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="酒店供应商ID:">
                <span>{{ props.row.sm_ai_AgentInfoID }}</span>
              </el-form-item>
              <el-form-item label="酒店ID:">
                <span>{{ props.row.ht_ht_hotelID }}</span>
              </el-form-item>
              <el-form-item label="酒店名称:">
                <span>{{ props.row.ht_ht_HotelName }}</span>
              </el-form-item>
              <el-form-item label="酒店地址:">
                <span>{{ props.row.ht_ht_HotelAddress }}</span>
              </el-form-item>
              <el-form-item label="酒店星级/主题:">
                <span>{{ props.row.ht_ht_Stars }}</span>
              </el-form-item>
              <el-form-item label="酒店咨询电话:">
                <span>{{ props.row.ht_ht_Phone }}</span>
              </el-form-item>
              <el-form-item label="省:">
                <span>{{ props.row.ht_ht_ProviceName }}</span>
              </el-form-item>
              <el-form-item label="市:">
                <span>{{ props.row.ht_ht_CityName }}</span>
              </el-form-item>
              <el-form-item label="县:">
                <span>{{ props.row.ht_ht_ContryName }}</span>
              </el-form-item>
              <el-form-item label="手机号码:">
                <span>{{ props.row.ht_ht_TelePhone }}</span>
              </el-form-item>
              <el-form-item label="详细介绍:">
                <template>
                  <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content" v-html="props.row.ht_ht_Details" style="width: 500px"></div>
                    <el-button>移入查看</el-button>
                  </el-tooltip>
                </template>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.ht_ht_Longitude }}°</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.ht_ht_Latitude }}°</span>
              </el-form-item>
              <el-form-item label="温馨提示:">
                <span>{{ props.row.ht_ht_HappyNotice }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ props.row.ht_ht_Remark }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.ht_ht_CreateTime }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="酒店编码"
          prop="ht_ht_hotelID">
        </el-table-column>
        <el-table-column
          label="酒店名称"
          prop="ht_ht_HotelName">
        </el-table-column>
        <el-table-column
          label="酒店地址"
          align="center"
          prop="ht_ht_HotelAddress">
        </el-table-column>
        <el-table-column
          label="酒店星级/主题"
          align="center"
          prop="ht_ht_Stars">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="updateHotelDetils">修改
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
            </el-button>


          </template>
        </el-table-column>
      </el-table>

      <!--添加-->

      <el-dialog title="添加酒店信息" :visible.sync="addHotelDetilsDialog">
        <el-form :model="addHotelDetilsObj">

          <el-form-item label="供应商ID:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.sm_ai_AgentInfoID" disabled></el-input>
          </el-form-item>

          <el-form-item label="酒店名称:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_HotelName"></el-input>
          </el-form-item>


          <el-form-item label="省:" :label-width="formLabelWidth">
            <template>
              <el-select v-model="addHotelDetilsObj.ht_ht_ProviceId" placeholder="请选择省" @change="changeCity">
                <el-option
                  v-for="item in provinceHotelDataList"
                  :key="item.sm_af_AreaID"
                  :label="item.sm_af_AreaName"
                  :value="item.sm_af_AreaID"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>

          <el-form-item label="市:" :label-width="formLabelWidth">
            <template>
              <el-select v-model="addHotelDetilsObj.ht_ht_CityId" placeholder="请选择市" @change="changeCounty">
                <el-option
                  v-for="item in cityHotelDataList"
                  :key="item.sm_af_AreaID"
                  :label="item.sm_af_AreaName"
                  :value="item.sm_af_AreaID"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>

          <el-form-item label="县:" :label-width="formLabelWidth">
            <template>
              <el-select v-model="addHotelDetilsObj.ht_ht_ContryId" placeholder="请选择县">
                <el-option
                  v-for="item in countyHotelDataList"
                  :key="item.sm_af_AreaID"
                  :label="item.sm_af_AreaName"
                  :value="item.sm_af_AreaID"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>

          <el-form-item label="酒店地址:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_HotelAddress"></el-input>
          </el-form-item>

          <el-form-item label="经度:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_Longitude"></el-input>
          </el-form-item>

          <el-form-item label="纬度:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_Latitude"></el-input>
          </el-form-item>

          <el-form-item label="点击获取经纬度再填写:" label-width="200px">
            <el-button type="primary" @click="getLatitude" size="small">获取经纬度</el-button>
          </el-form-item>

          <el-form-item label="电话号码:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_Phone"></el-input>
          </el-form-item>

          <el-form-item label="手机号码:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_TelePhone"></el-input>
          </el-form-item>

          <el-form-item label="酒店星级/酒店:" :label-width="formLabelWidth">
            <!--<el-input v-model="addHotelDetilsObj.ht_ht_Stars" placeholder="最高为8星级酒店并且输入数字即可"></el-input>-->

            <el-autocomplete
              class="inline-input"
              v-model="addHotelDetilsObj.ht_ht_Stars"
              :fetch-suggestions="querySearch"
              placeholder="请输入酒店星级"
              @select="handleSelect"
            ></el-autocomplete>

          </el-form-item>



          <el-form-item label="创建时间:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="addHotelDetilsObj.ht_ht_CreateTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="温馨提示:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_HappyNotice" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="详细介绍:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_Details" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addHotelDetilsObj.ht_ht_Remark" type="textarea"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addHotelDetilsDialog = false">取 消</el-button>
          <el-button type="primary" @click="addHotelDetilsSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->

      <el-dialog title="修改酒店信息" :visible.sync="updateHotelDetilsDialog">
        <el-form :model="updateHotelDetilsObj">

          <el-form-item label="供应商ID:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.sm_ai_AgentInfoID" disabled></el-input>
          </el-form-item>

          <el-form-item label="酒店名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_HotelName"></el-input>
          </el-form-item>

          <el-form-item label="省:" :label-width="formLabelWidth">
            <el-select v-model="updateHotelDetilsObj.ht_ht_ProviceName" placeholder="请选择省" @change="changeUpdateProvice">
              <el-option
                v-for="item in provinceHotelDataList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="updateHotelDetilsObj.ht_ht_CityName" placeholder="请选择市" @change="changeUpdateCity">
              <el-option
                v-for="item in cityHotelDataList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="县:" :label-width="formLabelWidth">
            <el-select v-model="updateHotelDetilsObj.ht_ht_ContryName" placeholder="请选择县">
              <el-option
                v-for="item in countyHotelDataList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="酒店地址:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_HotelAddress"></el-input>
          </el-form-item>

          <el-form-item label="经度:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_Longitude"></el-input>
          </el-form-item>

          <el-form-item label="纬度:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_Latitude"></el-input>
          </el-form-item>

          <el-form-item label="点击获取经纬度再填写:" label-width="200px">
            <el-button type="primary" @click="getLatitude" size="small">获取经纬度</el-button>
          </el-form-item>

          <el-form-item label="电话号码:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_Phone"></el-input>
          </el-form-item>

          <el-form-item label="手机号码:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_TelePhone"></el-input>
          </el-form-item>

          <el-form-item label="酒店星级/主题:" :label-width="formLabelWidth">
            <!--<el-input v-model="updateHotelDetilsObj.ht_ht_Stars" placeholder="最高为8星级酒店并且输入数字即可"></el-input>-->

            <el-autocomplete
              class="inline-input"
              v-model="updateHotelDetilsObj.ht_ht_Stars"
              :fetch-suggestions="querySearch"
              placeholder="请输入酒店星级"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item label="创建时间:" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="updateHotelDetilsObj.ht_ht_CreateTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="温馨提示:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_HappyNotice" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="详细介绍:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_Details" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelDetilsObj.ht_ht_Remark" type="textarea"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateHotelDetilsDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateHotelDetilsSubmit">确 定</el-button>
        </div>
      </el-dialog>


    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'myHotelDetailsList',
      'provinceHotelDataList',
      'cityHotelDataList',
      'countyHotelDataList',
      'updateHotelDetilsObj',
    ]),
    data() {
      return {
        addHotelDetilsObj: {
          "sm_ai_AgentInfoID": "",
          "ht_ht_HotelName": "",
          "ht_ht_ProviceId": "",
          "ht_ht_CityId": "",
          "ht_ht_ContryId": "",
          "ht_ht_HotelAddress": "",
          "ht_ht_Longitude": "",
          "ht_ht_Latitude": "",
          "ht_ht_Phone": "",
          "ht_ht_TelePhone": "",
          "ht_ht_Stars": "",
          "ht_ht_CreateTime": "",
          "ht_ht_IsDelete": "1",
          "ht_ht_HappyNotice": "",
          "ht_ht_Details": "",
          "ht_ht_Remark": ""
        },
        isLoading:false,
        addHotelDetilsDialog: false,
        formLabelWidth: '120px',
        isShow: true,
        updateHotelDetilsDialog: false,
        restaurants: [],
      }
    },
    methods: {
      jump(obj){

        window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelSearchMore?keycode='+obj.ht_ht_HotelName+'&cityId=','_blank')
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {

      },
      loadAll(){
        return [
          { "value": "1" },
          { "value": "2" },
          { "value": "3" },
          { "value": "4" },
          { "value": "5" },
        ]
      },
      //获取经纬度
      getLatitude(){
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },
      //初始化数据
      initData() {
        let sm_ui_ID = JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID;
        let HotelDetailInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "sm_ai_AgentInfoID": sm_ui_ID,
        };
        this.isLoading = true;
        this.$store.dispatch('initMyHotelDetails', HotelDetailInfo)
        .then(hotelID => {
          this.isLoading = false;
          if(hotelID){
            sessionStorage.setItem('hotelID',hotelID);
          }
          if (!hotelID) {
            this.isShow = true;
          } else {
            this.isShow = false
          }
        }, err => {

          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //点击添加按钮
      addButton() {
        for(let attr in this.addOptions){
          this.addOptions[attr] = ''
        }
        this.addHotelDetilsDialog = true;
        this.$store.commit('setTranstionFalse');
      },

      //选择省
//      changeProvince(v) {
//        let getAreaProvice = {
//          "areaPid": 3337
//        };
//        this.$store.dispatch('initHotelProvinceData', getAreaProvice)
//        .then()
//      },

      //选择市
      changeCity() {
//        if (!this.addHotelDetilsObj.ht_ht_ProviceId) {
//          this.$notify({
//            message: '请先选择省!!',
//            type: 'error'
//          });
//          return
//        }
        let getCity = {
          "areaPid": this.addHotelDetilsObj.ht_ht_ProviceId ? this.addHotelDetilsObj.ht_ht_ProviceId : ''
        }
        this.$store.dispatch('initHotelCityData', getCity)
        .then()
      },
      //修改选中省
      changeUpdateProvice() {
        if (this.updateHotelDetilsObj.ht_ht_ProviceName == '') {
          this.updateHotelDetilsObj.ht_ht_ProviceName = this.updateHotelDetilsObj.ht_ht_ProviceId
        }
        let getAreaProvice = {
          "areaPid": this.updateHotelDetilsObj.ht_ht_ProviceName
        }
        this.$store.dispatch('initHotelCityData', getAreaProvice)
      },
      //修改市
      changeUpdateCity() {
        if (this.updateHotelDetilsObj.ht_ht_CityName == '') {
          this.updateHotelDetilsObj.ht_ht_CityName = this.updateHotelDetilsObj.ht_ht_CityId
        }
        let getAreaProvice = {
          "areaPid": this.updateHotelDetilsObj.ht_ht_CityName
        }
        this.$store.dispatch('initHotelCountyData', getAreaProvice)
        .then()
      },

      //选择县
      changeCounty() {
//        if (!this.addHotelDetilsObj.ht_ht_ProviceId && !this.addHotelDetilsObj.ht_ht_CityId) {
//          this.$notify({
//            message: '请先选择省和市!!',
//            type: 'error'
//          });
//          return
//        }
        let getCounty = {
          "areaPid": this.addHotelDetilsObj.ht_ht_CityId ? this.addHotelDetilsObj.ht_ht_CityId : ''
        }
        this.$store.dispatch('initHotelCountyData', getCounty)
        .then()
      },

      //添加提交
      addHotelDetilsSubmit() {

        let insertHotelInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.addHotelDetilsObj
        }
        this.$store.dispatch('addHotelDetilsSubmit', insertHotelInfo)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData()
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
        this.addHotelDetilsDialog = false;
      },

      //点击修改按钮
      updateHotelDetils() {
        this.$store.commit('setTranstionFalse');
        this.updateHotelDetilsDialog = true;
        this.$store.commit('updateHotelDetilsContent')
      },

      //修改提交
      updateHotelDetilsSubmit() {

        //修改提交数据
        let updateHotelInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data":this.updateHotelDetilsObj
        }
        this.$store.dispatch('updateHotelDetilsSubmit', updateHotelInfo)
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
        this.updateHotelDetilsDialog = false;
      },
    },
    created() {
      let getAreaProvice = {
        "areaPid": 3337
      };
      this.$store.dispatch('initHotelProvinceData', getAreaProvice)
      let id = JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID
      this.addHotelDetilsObj.sm_ai_AgentInfoID = id;
      this.initData()
    },
    mounted(){
      this.restaurants = this.loadAll();
    }
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    /*width: 90px;*/
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .title > h1 {
    float: left;
    font: 20px/2 "微软雅黑";
    color: #000;
  }

  .title > button {
    float: right;
  }
</style>
