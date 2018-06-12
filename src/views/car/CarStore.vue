<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">租车门店管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>门店名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="storeName" auto-complete="off" placeholder="门店名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="carStoreList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="门店编号:">
              <span>{{ props.row.cr_crs_Id }}</span>
            </el-form-item>
            <el-form-item label="门店名称:">
              <span>{{ props.row.cr_crs_Name }}</span>
            </el-form-item>
            <el-form-item label="租车公司名称:">
              <span>{{ props.row.cr_crs_HertzName }}</span>
            </el-form-item>
            <el-form-item label="详细地址:">
              <span>{{ props.row.cr_crs_Address }}</span>
            </el-form-item>
            <el-form-item label="地标名称:">
              <span>{{ props.row.cr_crs_CityLandmarkName }}</span>
            </el-form-item>
            <el-form-item label="所在城市:">
              <span>{{ props.row.cr_crs_CityName }}</span>
            </el-form-item>
            <el-form-item label="营业时间:">
              <span>{{ props.row.cr_crs_WorkTime}}</span>
            </el-form-item>
            <el-form-item label="电话:">
              <span>{{ props.row.cr_crs_Telephone }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        prop="cr_crs_Id"
        label="门店编号"
      >
      </el-table-column>
      <el-table-column
        prop="cr_crs_Name"
        label="门店名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cr_crs_HertzName"
        label="租车公司名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.cr_crs_Id)">删除
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

    <!--添加租车门店-->
    <el-dialog title="添加租车门店" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="门店名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crs_Name"></el-input>
        </el-form-item>
        <el-form-item label="首字母选择城市:" :label-width="formLabelWidth">
          <el-cascader
            :options="carCityPlaceList"
            v-model="cityID"
            @change="changeCity"
            placeholder="请选择城市"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="选择城市地标:" :label-width="formLabelWidth">
          <el-cascader
            :options="carGetCityLandmarkInfoList"
            v-model="LandmarkInfo"
            placeholder="选择城市地标"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crs_Address"></el-input>
        </el-form-item>
        <el-form-item label="营业时间:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crs_WorkTime"></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crs_Telephone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改租车门店-->
    <el-dialog title="修改租车门店" :visible.sync="updateDialog">
      <el-form :model="updateOptions">
        <el-form-item label="门店名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crs_Name"></el-input>
        </el-form-item>
        <el-form-item label="首字母选择城市:" :label-width="formLabelWidth">
          <el-cascader
            :options="carCityPlaceList"
            v-model="cityID"
            @change="changeCity"
            placeholder="请选择城市"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="选择城市地标:" :label-width="formLabelWidth">
          <el-cascader
            :options="carGetCityLandmarkInfoList"
            v-model="LandmarkInfo"
            placeholder="选择城市地标"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crs_Address"></el-input>
        </el-form-item>
        <el-form-item label="营业时间:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crs_WorkTime"></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crs_Telephone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {

        LandmarkInfo:[],
        isOff:false,
        cityID:[],
        updateOptions:{},
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_crs_Name": "",//门店名称
            "cr_crs_HertzId": "",//租车公司编号
            "cr_crs_Address": "",//详细地址
            "cr_crs_CityLandmarkId": "",//
            "cr_crs_CityId": "",//所在城市ID
            "cr_crs_WorkTime": "",//营业时间
            "cr_crs_Telephone": "",//电话
          }
        },
        carCitys:[],//国
        countyList:[],//县
        showProvince:false,
        showCounty:false,
        provinceList:[],//市
        props: {
          value: 'value',
          children: 'cities'
        },
        addDialog:false,
        updateDialog:false,
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        storeName:'',
        carCompaniesID:'',
      }
    },
    computed: mapGetters([
      'carStoreList',
      'carCityPlaceList',
      'carGetCityLandmarkInfoList'
    ]),
    created(){
      this.carCompaniesID = sessionStorage.getItem('carCompaniesID');
      if (!this.carCompaniesID) {
        this.$router.push({name: 'CarHome'});
        this.$notify({
          message: '请先添加租车公司!',
          position: 'top-left',
          type:'error'
        });
        return
      }
      this.initData(this.storeName,1)
      //初始化洲
      this.initGreat()
    },
    methods: {
      //初始化洲
      initGreat() {
        let getAreaProvice = {
          "areaPid": -1
        }
        this.$store.dispatch('initCarGreat', getAreaProvice)
          .then((data) => {
            this.carCitys = data.map(v => {
              return {
                label: v.sm_af_AreaName,
                value: v.sm_af_AreaID,
                cities: []
              }
            })
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //选中洲获取国家
      changeGreat(v){
        let options = {
          "areaPid": v[0]
        }
        this.$http.post(`http://webservice.1000da.com.cn/AreaFull/SelectProvice`, JSON.stringify(options), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((data) => {
          var result = data.data;
          if (Number(result.resultcode) == 200) {
            if(result.data.length){
              this.carCitys.forEach((v, i) => {
                v.cities = result.data.map(vv => {
                  return {
                    label: vv.sm_af_AreaName,
                    value: vv.sm_af_AreaID
                  }
                })
              })
            }
          }
        })
      },
      //选中省获取市
      changeProvinceGetCity(v){
        let options = {
          "areaPid": v[0]
        }
        this.$http.post(`http://webservice.1000da.com.cn/AreaFull/SelectProvice`, JSON.stringify(options), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((data) => {
          var result = data.data;
          if (Number(result.resultcode) == 200) {
            if(result.data.length){
              this.provinceList.forEach((v, i) => {
                v.cities = result.data.map(vv => {
                  return {
                    label: vv.sm_af_AreaName,
                    value: vv.sm_af_AreaID
                  }
                })
              })
            }
          }
        })
      },
      //选中国家初始化省
      changePrico(v){
        let options = {
          "areaPid": v[v.length-1]
        }
        this.$http.post(`http://webservice.1000da.com.cn/AreaFull/SelectProvice`, JSON.stringify(options), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((data) => {
          var result = data.data;
          if (Number(result.resultcode) == 200) {
            let Prico = result.data;
            if(Prico.length){
              this.showProvince = true;
              for(var i=0;i<Prico.length;i++){
                this.provinceList = Prico.map(vv => {
                  return {
                    label: vv.sm_af_AreaName,
                    value: vv.sm_af_AreaID,
                    cities:[]
                  }
                })
              }
            }else{
              this.addOptions.data.cr_crs_CityId = v[v.length-1]
            }
          }
        })
      },
      //选中市初始化省
      changeProvinceCity(v){
        let options = {
          "areaPid": v[v.length-1]
        };
        this.$http.post(`http://webservice.1000da.com.cn/AreaFull/SelectProvice`, JSON.stringify(options), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((data) => {
          var result = data.data;
          if (Number(result.resultcode) == 200) {
            let County = result.data;
            if(County.length){
              this.showCounty = true;
              for(var i=0;i<County.length;i++){
                this.countyList = County.map(vv => {
                  return {
                    label: vv.sm_af_AreaName,
                    value: vv.sm_af_AreaID,
                  }
                })
              }
            }else{
              this.addOptions.data.cr_crs_CityId = v[v.length-1]
            }
          }
        })
      },
      handleCurrentChange(num){
        this.initData(this.storeName,num)
      },

      //拿到城市编码去获取城市地标
      changeCity(v){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CityId":v[v.length-1],
        };
        this.$store.dispatch('initCarGetCityLandmarkInfo',options)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        this.initData(this.storeName,1)
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page?page:1,//分页号
          "rows": "10",//单页显示数据量
          "cr_crs_Id": "",//门店编号
          "cr_crs_Name": name?name:'',//门店名称
          "cr_crs_HertzId":  this.carCompaniesID,//租车公司编号
          "cr_crs_Address": "",//详细地址
          "cr_crs_CityLandmarkId": "",//所在地标ID
          "cr_crs_CityId": "",//所在城市ID
          "cr_crs_Lng": "",//经度
          "cr_crs_Lat": "",//纬度
          "cr_crs_WorkTime": "",//营业时间
          "cr_crs_Telephone": "",//电话
        };
        this.isLoading = true;
        this.$store.dispatch('initCarStore', options)
          .then((total) => {
            this.total = total;
            this.isLoading = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //添加
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.cr_crs_HertzId = this.carCompaniesID;
        this.addOptions.data.cr_crs_CityLandmarkId = this.LandmarkInfo[this.LandmarkInfo.length-1];
        this.addOptions.data.cr_crs_CityId = this.cityID[this.cityID.length-1];
        this.$store.dispatch('AddCarStore',this.addOptions)
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
          });
        this.addDialog = false;
      },
      //修改
      Update(obj){
        this.updateOptions = obj;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit(){
        this.updateOptions.cr_crs_CityLandmarkId = this.LandmarkInfo[this.LandmarkInfo.length-1];
        this.updateOptions.cr_crs_CityId = this.cityID[this.cityID.length-1];
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data":this.updateOptions
        }
        this.$store.dispatch('UpdateCarStore',options)
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
          });
        this.updateDialog = false;
      },
      //删除门店
      Delete(id){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_crs_Id": id//门店编号
          }
        };
        this.$store.dispatch('DeleteCarStore',options)
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
          });
      }
    },
  }
</script>
<style scoped>

</style>
