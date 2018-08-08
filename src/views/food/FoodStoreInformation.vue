<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">店面信息</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <!--          <el-form-item>
                      <span>店面名称筛选:</span>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="roomName" size="small"></el-input>
                    </el-form-item>-->
          <el-form-item>
            <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
            <el-button type="primary" @click="add" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="foodStoreInformtionList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店面编号">
                <span>{{ props.row.fd_sf_ID }}</span>
              </el-form-item>
              <el-form-item label="店面用餐类型">
                <span v-for="item,index in props.row.typeList">{{ item + ' ,' }}</span>
              </el-form-item>
              <el-form-item label="店面经营类别">
                <span v-for="item,index in props.row.eatList">{{ item + ' ,' }}</span>
              </el-form-item>
              <el-form-item label="店面图片">
                <img
                  v-for="item,index in props.row.imgList"
                  v-lazy="item"
                  style="width: 100px;height: 50px;margin-right: 10px;"
                >
              </el-form-item>
              <el-form-item label="用餐人数">
                <span>{{ props.row.fd_py_MansName }}</span>
              </el-form-item>
              <el-form-item label="可订餐时间">
                <span v-for="item,index in props.row.timeList">{{ item + ' ,' }}</span>
              </el-form-item>
              <el-form-item label="店面名称">
                <span>{{ props.row.fd_sf_ProductName }}</span>
              </el-form-item>
              <el-form-item label="地址描述">
                <span>{{ props.row.fd_sf_Address }}</span>
              </el-form-item>
              <el-form-item label="经度">
                <span>{{ props.row.fd_sf_Lng }}°</span>
              </el-form-item>
              <el-form-item label="纬度">
                <span>{{ props.row.fd_sf_Lat }}°</span>
              </el-form-item>
              <el-form-item label="省">
                <span>{{ props.row.fd_sf_Provice }}</span>
              </el-form-item>
              <el-form-item label="市">
                <span>{{ props.row.fd_sf_City }}</span>
              </el-form-item>
              <el-form-item label="人均价格">
                <span>{{ props.row.fd_sf_AvgPrice }}元</span>
              </el-form-item>
              <el-form-item label="每周开始营业时间">
                <span>{{ props.row.fd_sf_WorkDayFrom | getWeek }}</span>
              </el-form-item>
              <el-form-item label="每周结束营业时间">
                <span>{{ props.row.fd_sf_WorkDayTo | getWeek}}</span>
              </el-form-item>
              <el-form-item label="每天营业时间">
                <span>{{ props.row.fd_sf_OpenTime + '~' + props.row.fd_sf_CloseTime}}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.fd_sf_Phone }}</span>
              </el-form-item>
              <el-form-item label="是否有WAFI">
                <span>{{ props.row.fd_sf_HasWafi}}</span>
              </el-form-item>
              <el-form-item label="交通信息">
                <span>{{ props.row.fd_sf_TransInfo }}</span>
              </el-form-item>
              <el-form-item label="提前多少分钟通知">
                <span>{{ props.row.fd_sf_Minutes }}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <span>{{ props.row.fd_sf_PassStatus }}</span>
              </el-form-item>
              <el-form-item label="店面简介">
                <span>{{ props.row.fd_sf_Introduce }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="店面名称"
          prop="fd_sf_ProductName">
        </el-table-column>
        <el-table-column
          label="审核状态">
          <template slot-scope="scope">
            {{scope.row.fd_sf_PassStatus}}
          </template>
        </el-table-column>
        <!--        <el-table-column
                  label="联系电话"
                  prop="fd_sf_Phone">
                </el-table-column>
                <el-table-column
                  label="人均价格">
                  <template slot-scope="scope">
                    {{scope.row.fd_sf_AvgPrice}}元
                  </template>
                </el-table-column>-->
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="Delete(scope.row.fd_sf_ID)">删除</el-button>
            <el-button size="mini" v-show="scope.row.fd_sf_PassStatus == '通过'" type="success"
                       @click="recommendShop(scope.row.fd_sf_ID)">申请推荐店面
            </el-button>
            <el-button size="mini" type="success" @click="jump(scope.row)">预览效果></el-button>
            <el-button size="mini" v-show="scope.row.fd_sf_PassStatus == '通过'" type="success"
                       @click="recommendShop(scope.row.fd_sf_ID)">申请推荐店面
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="5"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--添加-->
      <el-dialog title="添加店面信息" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="店面用餐类型:" :label-width="formLabelWidth" required>
            <el-select v-model="fd_sf_TypeID" multiple placeholder="请选择">
              <el-option
                v-for="item in storefrontTypeList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面经营类别:" :label-width="formLabelWidth" required>
            <el-select v-model="fd_sf_CategoryID" multiple placeholder="请选择">
              <el-option
                v-for="item in threeMealsList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用餐人数:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.fd_sf_MansID" placeholder="请选择">
              <el-option
                v-for="item in numberOfMealsList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面名称:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.fd_sf_ProductName"></el-input>
          </el-form-item>
          <el-form-item label="店面图片:" :label-width="formLabelWidth" required>
            <Upload @getData="getData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in addImage"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <em>
                  <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="addImage.length"
                >
              </p>
            </div>
          </el-form-item>

          <el-form-item label="可锁桌时间:" :label-width="formLabelWidth" required>
            <el-select v-model="canLockTime" multiple placeholder="请选择">
              <el-option
                v-for="item in timeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="地址描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_Address"></el-input>
          </el-form-item>
          <el-form-item label="经度:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.fd_sf_Lng"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.fd_sf_Lat"></el-input>
          </el-form-item>
          <el-form-item label="点击获取经纬度再填写:" label-width="200px">
            <el-button type="primary" @click="getLatitude" size="small">获取经纬度</el-button>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.fd_sf_Provice" placeholder="请选择" @change="changeCity">
              <el-option
                v-for="item in foodProcinceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.fd_sf_City" placeholder="请选择">
              <el-option
                v-for="item in foodCityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人均价格:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fd_sf_AvgPrice"></el-input>
          </el-form-item>
          <el-form-item label="营业时间:" :label-width="formLabelWidth" required>
            <el-time-picker
              is-range
              arrow-control
              v-model="times"
              range-separator="至"
              start-placeholder="开始时间"
              value-format="HH:mm:ss"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="每周营业开始时间:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.fd_sf_WorkDayFrom" placeholder="请选择">
              <el-option
                v-for="item in weekendList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每周营业结束时间:" :label-width="formLabelWidth" required>
            <el-select v-model="addOptions.fd_sf_WorkDayTo" placeholder="请选择" @change="selectWeek">
              <el-option
                v-for="item in weekendList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.fd_sf_Phone"></el-input>
          </el-form-item>
          <el-form-item label="是否有WAFI:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_sf_HasWafi" placeholder="请选择">
              <el-option
                v-for="item in isWifi"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="供应商编码:" :label-width="formLabelWidth" required>-->
          <!--<el-input v-model="addOptions.fd_sf_TradeID"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="交通信息:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.fd_sf_TransInfo"></el-input>
          </el-form-item>
          <el-form-item label="提前多少分钟通知:" :label-width="formLabelWidth" required>
            <el-input v-model="addOptions.fd_sf_Minutes"></el-input>
          </el-form-item>
          <el-form-item label="店面介绍:" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="addOptions.fd_sf_Introduce">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改店面信息" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="店面用餐类型:" :label-width="formLabelWidth" required>
            <el-select v-model="updateType" multiple placeholder="请选择">
              <el-option
                v-for="item in storefrontTypeList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面经营类别:" :label-width="formLabelWidth" required>
            <el-select v-model="updateEat" multiple placeholder="请选择">
              <el-option
                v-for="item in threeMealsList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用餐人数:" :label-width="formLabelWidth" required>
            <el-select v-model="updateObj.fd_sf_MansID" placeholder="请选择">
              <el-option
                v-for="item in numberOfMealsList"
                :key="item.propertyID"
                :label="item.propertyName"
                :value="item.propertyID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面名称:" :label-width="formLabelWidth" required>
            <el-input v-model="updateObj.fd_sf_ProductName"></el-input>
          </el-form-item>
          <el-form-item label="店面图片:" :label-width="formLabelWidth" required>
            <Upload @getData="updateData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in updateImage"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
                <em>
                  <el-radio v-model="updateRadioIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="updateImage.length"
                >
              </p>
            </div>
          </el-form-item>


          <el-form-item label="可锁桌时间:" :label-width="formLabelWidth" required>
            <el-select v-model="updateTime" multiple placeholder="请选择">
              <el-option
                v-for="item in timeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地址描述:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_sf_Address"></el-input>
          </el-form-item>
          <el-form-item label="经度:" :label-width="formLabelWidth" required>
            <el-input v-model="updateObj.fd_sf_Lng"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" :label-width="formLabelWidth" required>
            <el-input v-model="updateObj.fd_sf_Lat"></el-input>
          </el-form-item>
          <el-form-item label="点击获取经纬度再填写:" label-width="200px">
            <el-button type="primary" @click="getLatitude" size="small">获取经纬度</el-button>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth" required>
            <el-select v-model="updateObj.fd_sf_Provice" placeholder="请选择" @change="changeCity">
              <el-option
                v-for="item in foodProcinceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth" required>
            <el-select v-model="updateObj.fd_sf_City" placeholder="请选择">
              <el-option
                v-for="item in foodCityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人均价格:" :label-width="formLabelWidth" required>
            <el-input v-model="updateObj.fd_sf_AvgPrice"></el-input>
          </el-form-item>
          <el-form-item label="营业时间:" :label-width="formLabelWidth" required>
            <el-time-picker
              is-range
              arrow-control
              v-model="times"
              range-separator="至"
              start-placeholder="开始时间"
              value-format="HH:mm:ss"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="每周营业开始时间:" :label-width="formLabelWidth" required>
            <el-select v-model="updateObj.fd_sf_WorkDayFrom" placeholder="请选择">
              <el-option
                v-for="item in weekendList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每周营业结束时间:" :label-width="formLabelWidth" required>
            <el-select v-model="updateObj.fd_sf_WorkDayTo" placeholder="请选择">
              <el-option
                v-for="item in weekendList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话:" :label-width="formLabelWidth" required>
            <el-input v-model="updateObj.fd_sf_Phone"></el-input>
          </el-form-item>
          <el-form-item label="是否有WAFI:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_sf_HasWafi" placeholder="请选择">
              <el-option
                v-for="item in isWifi"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
  import {isNumber} from '@/assets/js/public'
  import Upload from '@/components/Upload'

  export default {
    components: {
      Upload
    },
    computed: mapGetters([
      'foodStoreInformtionList',
//      'foodStoreInformtionList1',
      'numberOfMealsList',
      'storefrontTypeList',
      'foodProcinceList',
      'foodCityList',
      'threeMealsList'
    ]),
    data() {
      return {
        //是否禁用
        isDisabled: false,
        userInfo: {},
        total: 0,
        addDialog: false,
        imageObj: {accept: 'image/*'},
        addOptions: {
          "fd_sf_MansID": "",
          "fd_sf_ProductName": "",
          "fd_sf_Address": "",
          "fd_sf_Lng": "",
          "fd_sf_Lat": "",
          "fd_sf_Provice": "",
          "fd_sf_City": "",
          "fd_sf_AvgPrice": "",
          "fd_sf_OpenTime": "",
          "fd_sf_CloseTime": "",
          "fd_sf_Phone": "",
          "fd_sf_HasWafi": "",
          "fd_sf_TradeID": "",
          "fd_sf_TransInfo": "",
          "fd_sf_WorkDayFrom": "",
          "fd_sf_WorkDayTo": ""
        },
        formLabelWidth: '150px',
        updateDialog: false,
        times: ['06:00:00', '23:00:00'],
        isWifi: [
          {
            value: 0,
            label: '无'
          },
          {
            value: 1,
            label: '有'
          }
        ],
        weekendList: [
          {
            label: '星期一',
            value: 1,
          },
          {
            label: '星期二',
            value: 2,
          },
          {
            label: '星期三',
            value: 3,
          },
          {
            label: '星期四',
            value: 4,
          },
          {
            label: '星期五',
            value: 5,
          },
          {
            label: '星期六',
            value: 6,
          },
          {
            label: '星期日',
            value: 7,
          },
        ],
        proviceId: '',
        roomName: '',
        updateObj: {},
        isLoading: false,
        fd_sf_TypeID: [],
        fd_sf_CategoryID: [],
        addImage: [],
        addRadioIndex: 0,
        isNewUploaNode: true,
        updateImage: [],
        updateRadioIndex: 0,
        updateType: [],
        updateEat: [],
        timeList: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ],
        canLockTime: [],
        updateTime: [],
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      this.initProvince();
      this.initData();
      this.initNumberOfMeals();
      this.initStorefrontType();
      this.initThreeMeals();
    },
    methods: {
      selectWeek() {
        if (this.addOptions.fd_sf_WorkDayFrom >= this.addOptions.fd_sf_WorkDayTo) {
          this.addOptions.fd_sf_WorkDayFrom = '';
          this.addOptions.fd_sf_WorkDayTo = '';
          this.$notify({
            message: '请重新选择每周营业时间！',
            type: 'error'
          })
          return
        }


      },
      //修改店面图片
      updateData(data) {
        if (!this.updateRadioIndex) {
          this.updateImage.push(data.data);
        } else {
          this.updateImage.splice(this.updateRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },

      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.updateImage = this.updateImage.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除修改对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.addImage = this.addImage.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      jump(obj) {
        sessionStorage.setItem("status", obj.fd_sf_PassStatus)
        if (obj.fd_sf_PassStatus == '审核中') {
          this.$notify({
            title: '警告',
            message: '审核中！请稍等。。。',
            type: 'warning'
          });
        } else {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/foodDetail/' + obj.fd_sf_ID, '_blank')
        }
      },
      getData(data) {
        if (!this.addRadioIndex) {
          this.addImage.push(data.data);
        } else {
          this.addImage.splice(this.addRadioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },
      //店面类型
      initStorefrontType() {
        let selectPropertyInfoType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_py_ParentID": "1",//父编码
        }
        this.$store.dispatch('initStorefrontType', selectPropertyInfoType)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //三餐类型
      initThreeMeals() {
        let selectPropertyInfoType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_py_ParentID": "80",//80  经营类型
        }
        this.$store.dispatch('initThreeMeals', selectPropertyInfoType)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //用餐人数类型
      initNumberOfMeals() {
        let selectPropertyInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_py_ParentID": "28",//父编码
        }
        this.$store.dispatch('initNumberOfMeals', selectPropertyInfo)
      },
      //获取经纬度
      getLatitude() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },
//      分页
      handleCurrentChange(num) {
        this.initData('', num)
      },
      //查询省
      initProvince() {
        let getAreaProvice = {
          "areaPid": 3337
        };
        this.$store.dispatch('initFoodProcince', getAreaProvice)
      },
      //市
      changeCity(id) {
        let getAreaProvice = {
          "areaPid": id
        };
        this.$store.dispatch('initFoodCity', getAreaProvice)
      },
      initData(name, page) {
        let selectStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          //"fd_sf_ID": "2",//店面编号
          //"fd_sf_TypeID": "4",//用餐类型
          //"fd_sf_MansID": "31",//用餐人数编号
          //"fd_sf_ProductName": "",//产品名称 like
          //"fd_sf_Provice": "四川省",//省
          //"fd_sf_City": "泸州市",//市
          //"priceFrom": "21",//人均价格大于
          //"priceTo":"50",//人均价格小于
          //"fd_sf_Phone": "1",//联系电话
          "fd_sf_TradeID": this.userInfo.sm_ui_ID,//供应商编码
          // "openTimeFrom": "06:00",
          //  "openTimeTo":"23:00",
          "page": page ? page : "1",
          "rows": "5",
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodStoreInformtion', selectStoreFrontInfo)
          .then(data => {
            this.isLoading = false
            this.total = Number(data.totalrows);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        this.initData(this.roomName, 1)
      },
      //添加
      add() {
        for (var attr in this.addOptions) {
          this.addOptions[attr] = ''
        }
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.addOptions.fd_sf_TradeID = this.userInfo.sm_ui_ID;
      },
//      添加提交
      addSubmit() {
        this.addOptions.fd_sf_TypeID = this.addOptions.fd_sf_TypeID;
        this.addOptions.fd_sf_CategoryID = this.addOptions.fd_sf_CategoryID;
        this.addOptions.fd_sf_OpenTime = this.times[0]
        this.addOptions.fd_sf_CloseTime = this.times[1]
        let insertStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions,
          "fd_sf_TypeID": this.fd_sf_TypeID,
          "fd_sf_CategoryID": this.fd_sf_CategoryID,
          "fd_sf_Images": this.addImage,
          "canLockTime": this.canLockTime,//可锁桌时间

        };
        if (isNaN(this.addOptions.fd_sf_Lng) || isNaN(this.addOptions.fd_sf_Lat)) {
          this.$notify({
            message: '经纬度必须为数字!',
            type: 'error'
          });
          return
        }
        this.$store.dispatch('addFoodStoreInformation', insertStoreFrontInfo)
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
      //修改
      update(rowData) {
        let arr = [];
        this.updateObj = rowData;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        if (isNaN(this.updateObj.fd_sf_Lng) || isNaN(this.updateObj.fd_sf_Lat)) {
          this.$notify({
            message: '经纬度必须为数字!',
            type: 'error'
          });
          return
        }

        let updateStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sf_TypeID": this.updateType,
          "fd_sf_CategoryID": this.updateEat,
          "fd_sf_Images": this.updateImage,
          "canLockTime": this.timeList,
          "data": {
            "fd_sf_ID": this.updateObj.fd_sf_ID,//店面编号
            "fd_sf_MansID": this.updateObj.fd_sf_MansID,//用餐人数编号
            "fd_sf_ProductName": this.updateObj.fd_sf_ProductName,//产品名称
            "fd_sf_Address": this.updateObj.fd_sf_Address,//地址描述
            "fd_sf_Lng": this.updateObj.fd_sf_Lng,//经度
            "fd_sf_Lat": this.updateObj.fd_sf_Lat,//纬度
            "fd_sf_Provice": '',//省
            "fd_sf_City": '',//市
            "fd_sf_OpenTime": this.times[0] ? this.times[0] : '',//营业时间
            "fd_sf_CloseTime": this.times[1] ? this.times[1] : '',//闭店时间
            "fd_sf_AvgPrice": this.updateObj.fd_sf_AvgPrice,//人均价格
            "fd_sf_Phone": this.updateObj.fd_sf_Phone,//联系电话
            "fd_sf_HasWafi": this.updateObj.fd_sf_HasWafiID,//是否有WAFI
            "fd_sf_TradeID": this.updateObj.fd_sf_TradeID,//供应商编码
            "fd_sf_TransInfo": this.updateObj.fd_sf_TransInfo,//交通信息
            "fd_sf_Minutes": this.updateObj.fd_sf_Minutes,//提前多少分钟通知
            "fd_sf_Introduce": this.updateObj.fd_sf_Introduce,//店面简介
          }
        };
        if (isNaN(this.updateObj.fd_sf_Provice)) {
          updateStoreFrontInfo.data.fd_sf_Provice = this.updateObj.proviceID
        }
        if (isNaN(this.updateObj.fd_sf_City)) {
          updateStoreFrontInfo.data.fd_sf_City = this.updateObj.cityID
        }
        this.$store.dispatch('updateFoodStoreInformtionSubmit', updateStoreFrontInfo)
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
      Delete(id) {
        let deleteStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_sf_ID": id,//店面编号
          }
        };
        this.$store.dispatch('deleteFoodStoreInformtion', deleteStoreFrontInfo)
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
      },
      //申请推荐店面
      recommendShop(id) {
        let insertIntroduceShopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_is_ShopID": id ? id : '',//店面编号
          }
        };
        this.$store.dispatch('recommendShopSubmit', insertIntroduceShopInfo)
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
      },

    },

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
