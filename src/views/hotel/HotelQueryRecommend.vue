<template>
  <div>
    <div id="wrap" class="clearfix">
      <div class="title clearfix" style="padding: 20px">
        <h1>酒店推荐信息</h1><br><br>
        <el-button type="primary" @click="addButton" size="small">新增</el-button>
      </div>

      <!--数据展示-->
      <el-table
        :data="hotelQueryRecommendList"
        v-loading="isLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="ht_hi_ID"
          label="推荐类型编码"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ht_it_IntroduceTypeName"
          label="推荐类型"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ht_it_IntroduceTypePName"
          label="父推荐类型"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!--<el-button-->
              <!--size="mini"-->
              <!--@click="Update(scope.row.ht_hi_ID)"-->
            <!--&gt;修改-->
            <!--</el-button>-->
            <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_hi_ID)">删除
            </el-button>
            <!--<el-button-->
            <!--size="mini"-->
            <!--@click="goHotelRecommend">前往酒店推荐-->
            <!--</el-button>-->
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

      <!--添加-->
      <el-dialog title="添加酒店推荐类型" :visible.sync="addRecommendDialog">
        <el-form :model="addOptions">

          <el-form-item label="父推荐类型:" :label-width="formLabelWidth">
            <el-select placeholder="请选择类型" @change="changeParent" v-model="ParentID">
              <el-option
                v-for="item in hotelIntroduceTypeList"
                :key="item.ht_it_ID"
                :label="item.ht_it_Name"
                :value="item.ht_it_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐类型:" :label-width="formLabelWidth" v-show="showChild"  >
            <el-select v-model="TypeID" placeholder="请选择类型" @change="changeShowChild">
              <el-option
                v-for="item in parentHotelQueryRecommendList"
                :key="item.ht_it_ID"
                :label="item.ht_it_Name"
                :value="item.ht_it_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子类型:" :label-width="formLabelWidth" v-show="showChildChild">
            <el-select v-model="addOptions.data.ht_hi_IntroduceType" placeholder="请选择类型">
              <el-option
                v-for="item in showChildHotelQueryRecommendList"
                :key="item.ht_it_ID"
                :label="item.ht_it_Name"
                :value="item.ht_it_ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addRecommendDialog = false">取 消</el-button>
          <el-button type="primary" @click="addRecommendSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'hotelQueryRecommendList',
      'recommendTypeList',
      'hotelIntroduceTypeList',
      'parentHotelQueryRecommendList',
      'showChildHotelQueryRecommendList'
    ]),
    data() {
      return {
        showChildChild:false,
        TypeID:'',
        showChild:false,
        ParentID:'',
        isLoading:false,
        hotelID:'',
        total:0,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_ht_hotelID": "",//酒店编码
            "ht_hi_IntroduceType": "",//推荐类型编码
          }
        },
        addRecommendDialog: false,
        formLabelWidth: '120px',
        updateRecommendDialog: false,
      }
    },
    created() {
      this.hotelID = sessionStorage.getItem('hotelID');
      if(!this.hotelID){
        this.$router.push({name:'HotelDetil'})
        this.$notify({
          message: '请先添加酒店信息!',
          position: 'top-left',
          type:'error'
        });
        return
      }
      this.initData();
    },
    methods: {
      //选中父类型
      changeParent(){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "操作员编码",
            "operateUserName": "操作员名称",
            "pcName": "",
            "ht_it_ID": "",//推荐类型ID
            "ht_it_Name": "",//推荐类型名称
            "ht_it_ParentID": this.ParentID,//推荐类型父ID
          };
          this.$store.dispatch('initParentHotelQueryRecommend',options)
          .then(total=>{
              if(total){
                this.showChild = true;
              }else{
                this.addOptions.data.ht_hi_IntroduceType =  this.ParentID;
                this.showChild = false;
              }
          })
      },
      changeShowChild(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_it_ID": "",//推荐类型ID
          "ht_it_Name": "",//推荐类型名称
          "ht_it_ParentID": this.TypeID,//推荐类型父ID
        };
        this.$store.dispatch('initShowChildHotelQueryRecommend',options)
        .then(total=>{
          if(total){
            this.showChildChild = true;
          }else{
            this.addOptions.data.ht_hi_IntroduceType =  this.TypeID;
            this.showChildChild = false;
          }
        })
      },
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //初始化数据
      initData(page) {
        let selectHotelIntroduceInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_hi_ID": "",//酒店推荐编码
          "ht_ht_hotelID": this.hotelID,//酒店编码
          "ht_hi_IntroduceType": "",//推荐类型编码
          "page":"1",//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelQueryRecommend', selectHotelIntroduceInfo)
          .then((total) => {
            this.total = total;
            this.isLoading  = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //添加按钮
      addButton() {
        this.TypeID = '';
        this.ParentID = '';
        this.showChild = false;
        this.showChildChild = false;
        let obj = this.addOptions.data
        for(var attr in obj){
          obj[attr] = ''
        }
        this.$store.commit('setTranstionFalse');
        this.addRecommendDialog = true;
      },
      //添加提交
      addRecommendSubmit() {
        this.addOptions.data.ht_ht_hotelID = this.hotelID;
        this.$store.dispatch('AddHotelQueryRecommend', this.addOptions)
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
        this.addRecommendDialog = false;
      },
      //删除
      Delete(id){
        let deleteOptions = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "操作员编码",
            "operateUserName": "操作员名称",
            "pcName": "",
            "data": {
              "ht_hi_ID": id//酒店推荐编码
            }
          };
        this.$store.dispatch('DeleteHotelQueryRecommend',deleteOptions)
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
      },
    },
  }
</script>
<style scoped>
  .title > h1 {
    float: left;
    font: 20px/2 "微软雅黑";
    color: #000;
  }

  .title > button {
    float: right;
  }
</style>
