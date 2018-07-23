<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">产品线路价格信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>产品线路价格筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              style="width: 250px"
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择产品"
              size="small"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="userSearchID" placeholder="请选择产品线路" @change="changeLine" size="small">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="departureCityID" placeholder="请选择出发城市" size="small">
              <el-option
                v-for="item in adminRouteDepartureCity"
                :key="item.ts_cc_Name"
                :label="item.ts_cc_Name"
                :value="item.ts_cc_Name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdminLinePrice" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminLinePriceList"
        v-loading="isLoading"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="主键编号:">
                <span>{{ props.row.ts_pp_ID }}</span>
              </el-form-item>
              <el-form-item label="线路编号:">
                <span>{{ props.row.ts_pp_ProduceTourID }}</span>
              </el-form-item>
              <el-form-item label="产品编号:">
                <span>{{ props.row.ts_pp_TradeGoodID }}</span>
              </el-form-item>
              <el-form-item label="出发城市:">
                <span>{{ props.row.ts_pp_FromPlace }}</span>
              </el-form-item>
              <el-form-item label="出发日期:">
                <span>{{ props.row.ts_pp_Date }}</span>
              </el-form-item>
              <el-form-item label="标题:">
                <!--<span>{{ props.row.ta_tg_Describe }}</span>-->
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ts_pp_LineName">
                </el-popover>
                <el-button v-popover:popover1 size="small">移入查看</el-button>
              </el-form-item>
              <el-form-item label="儿童人数:">
                <span>{{ props.row.ts_pp_Child }}人</span>
              </el-form-item>
              <el-form-item label="儿童价格:">
                <span>{{ props.row.ts_pp_ChildPrice }}元</span>
              </el-form-item>
              <el-form-item label="成人人数:">
                <span>{{ props.row.ts_pp_Person }}人</span>
              </el-form-item>
              <el-form-item label="成人价格:">
                <span>{{ props.row.ts_pp_Price }}元</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          label="主键编号"
        >
        </el-table-column>
        <el-table-column
          label="主键编号"
          prop="ts_pp_ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="线路编号"
          align="center"
          prop="ts_pp_ProduceTourID">
        </el-table-column>
        <el-table-column
          label="出发城市"
          align="center"
          prop="ts_pp_FromPlace">
        </el-table-column>
        <!--<el-table-column-->
          <!--align="center"-->
          <!--label="备注">-->
          <!--<template slot-scope="props">-->
            <!--<el-popover-->
              <!--ref="popover1"-->
              <!--placement="top-start"-->
              <!--trigger="hover"-->
              <!--:content="props.row.ts_pp_Remark">-->
            <!--</el-popover>-->
            <!--<el-button v-popover:popover1>移入查看</el-button>-->
          <!--</template>-->

        <!--</el-table-column>-->
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminLinePrice(scope.row.ts_pp_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminLinePrice(scope.row.ts_pp_ID)">删除
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="buildSeat">生成座位</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--添加产品线路价格-->
      <el-dialog title="添加产品线路价格" :visible.sync="addAdminLinePriceDialog">
        <el-form :model="addOptions">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.productLineID" placeholder="请选择产品线路" @change="addChangeLine">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择出发城市:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.city" placeholder="请选择出发城市">
              <el-option
                v-for="item in adminRouteDepartureCity"
                :key="item.ts_cc_Name"
                :label="item.ts_cc_Name"
                :value="item.ts_cc_Name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成人数:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.manNo" placeholder="请输入成人数"></el-input>
          </el-form-item>
          <el-form-item label="儿童数:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.childNo" placeholder="请输入儿童数"></el-input>
          </el-form-item>
          <el-form-item label="儿童价:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.childPrice" placeholder="请输入儿童数"></el-input>
          </el-form-item>
          <el-form-item label="全票价:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.fullPrice" placeholder="请输入全票价"></el-input>
          </el-form-item>
          <el-form-item label="日期范围:" :label-width="formLabelWidth">
            <el-date-picker
              v-model="createTimeData"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAdminLinePriceDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminLinePriceSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改产品线路价格-->
      <el-dialog title="修改产品线路价格" :visible.sync="updateAdminLinePriceDialog">
        <el-form :model="addOptions">
          <el-form-item label="请选择产品线路:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminLinePriceObj.ts_pp_ProduceTourID" placeholder="请选择产品线路" @change="changeLine">
              <el-option
                v-for="item in adminProductLine"
                :key="item.ts_pt_ID"
                :label="item.ts_pt_Name"
                :value="item.ts_pt_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择出发城市:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminLinePriceObj.ts_pp_FromPlace" placeholder="请选择出发城市">
              <el-option
                v-for="item in adminRouteDepartureCity"
                :key="item.ts_cc_Name"
                :label="item.ts_cc_Name"
                :value="item.ts_cc_Name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成人数:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePriceObj.ts_pp_Person" placeholder="请输入成人数"></el-input>
          </el-form-item>
          <el-form-item label="儿童数:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePriceObj.ts_pp_Child" placeholder="请输入儿童数"></el-input>
          </el-form-item>
          <el-form-item label="儿童价:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePriceObj.ts_pp_ChildPrice" placeholder="请输入儿童数"></el-input>
          </el-form-item>
          <el-form-item label="全票价:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePriceObj.ts_pp_Price" placeholder="请输入全票价"></el-input>
          </el-form-item>
          <el-form-item label="选择日期:" :label-width="formLabelWidth">
            <el-date-picker
              type="date"
              v-model="updateAdminLinePriceObj.ts_pp_Date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePriceObj.ts_pp_Remark" placeholder="备注" type="textarea"
                      :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateAdminLinePriceDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminLinePriceSubmit">确 定</el-button>
        </div>
      </el-dialog>


    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        GoodId: '',
        LineID: '',
        userName: '',
        departureCityID:'',
        isLoading: false,
        userSearchID: '',
        formLabelWidth: '120px',
        createTimeData:'',
        addAdminLinePriceDialog:false,
        updateAdminLinePriceDialog:false,
        multipleSelection:[],
        provice:'',//省份
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "productLineID":'',
          "manNo":'',//成人数
          "childNo":'',//儿童数
          "city": "",//城市
          "fullPrice":'',//全票价
          "childPrice": '',
          "createFrom": "",
          "createTo": "",
        }
      }
    },
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminQueryProductList',
      'adminLineScheduleManagementId',
      'departureCityList',
      'adminLinePriceList',
      'adminRouteDepartureCity',
      'proviceList',
      'cityList',
      'updateAdminLinePriceObj'
    ]),
    created(){
      //初始化省
      let sCity = {
        "areaPid": 3337
      };
      this.$store.dispatch('initProvice',sCity)
      if(this.adminLineScheduleManagementId){
        let options = {
          "loginUserID":"huileyou",
          "loginUserPass":"123",
          "lineID":this.adminLineScheduleManagementId
        }
        this.$store.dispatch('initDepartureCity',options)
      }
    },
    methods: {
      jump(obj){
        let ID =sessionStorage.getItem('id')
        window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/'+ID,'_blank')
      },
      //删除
      deleteAdminLinePrice(id){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ppID": id
        }
        this.$store.dispatch('DeleteAdminLinePrice',options)
        .then(()=>{
          this.initData(this.adminLineScheduleManagementId)
        })
      },
      //选中产品
      handleSelect(item) {
//        this.addOptions.ts_pt_Product_LineID = item.id;
//        this.updateAdminLinePrepareObj.ts_pt_Product_LineID = item.id;
        this.userName = item.value;
        let options = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          goodID: item.id ? item.id : ''
        };
        this.$store.dispatch('initAdminProductLine', options)
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
            goodTitle:name?name:'',
            "userID": "",
            "pcName": "",
            "ID": '',
            'isDelete': 0,
            "page": 1,
            "rows": 100
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
          var  data = data.data
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
      addChangeLine(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "lineID":this.addOptions.productLineID,
          page:1,
          rows:5
        };
        this.$store.dispatch('initAdminRouteDepartureCity',options)
        .then(total=>{
          this.total = total;
        })
      },
      //选中线路
      changeLine(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "lineID":this.userSearchID,
          page:1,
          rows:5
        };
        this.$store.dispatch('initAdminRouteDepartureCity',options)
        .then(total=>{
          this.total = total;
        })
      },
      //选中省
      changeProvice(){
        let searchCity = {
          "areaPid": this.provice
        }
        this.$store.dispatch('initCityList',searchCity)
      },
      //选中的行
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      async searchBuildSeat(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "productPriceID": ''
        };
        for(var i=0;i<this.multipleSelection.length;i++){
          options.productPriceID = this.multipleSelection[i].ts_pp_ID;
          await this.$store.dispatch('initBuildSeat',options)
        }
      },
      //生成座位
      buildSeat(){
       this.searchBuildSeat().then(()=>{
         this.$notify({
           message: '生成成功',
           type: 'success'
         });
       })
      },
      initData(lineID){
        let searchOptions = {
          "loginUserID":"huileyou",
          "loginUserPass":"123",
          "operateUserID":"",
          "operateUserName":"",
          "pcName":"",
          "lineID":lineID?lineID:this.userSearchID,
          "city":this.departureCityID?this.departureCityID:''
        }
        this.isLoading = true
        this.$store.dispatch('initAdminLinePrice',searchOptions)
        .then(()=>{
          this.isLoading = false
        })
      },
      //查询
      search(){
        this.initData(this.adminLineScheduleManagementId)
      },
      //添加
      addAdminLinePrice(){
        this.$store.commit('setTranstionFalse');
        this.addAdminLinePriceDialog = true;
      },
      //添加提交
      addAdminLinePriceSubmit(){
        this.addOptions.createFrom = this.createTimeData[0];
        this.addOptions.createTo = this.createTimeData[1]
        this.$store.dispatch('AddAdminLinePriceSubmit',this.addOptions)
        .then(() => {
          this.$notify({
            message: '添加成功!',
            type: 'success'
          });
          this.initData(this.addOptions.productLineID)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addAdminLinePriceDialog = false;
      },
      //修改
      updateAdminLinePrice(id){
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminLinePriceObj',id)
        this.updateAdminLinePriceDialog = true;
      },
      //修改提交
      updateAdminLinePriceSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_pp_ID": '',
            "ts_pp_ProduceTourID": '',
            "ts_pp_Date": "",
            "ts_pp_Price": '',
            "ts_pp_HalfPrice": '',
            "ts_pp_ChildPrice": '',
            "ts_pp_FromPlace": "",
            "ts_pp_Person": '',
            "ts_pp_IsDelete": 0,
            "ts_pp_Remark": ""
          }
        }
      }
    },
  }
</script>
<style scoped>

</style>
