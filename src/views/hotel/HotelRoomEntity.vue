<template>
  <div id="wrap" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right"style="margin: 20px 0px 0px 20px" >
      <el-breadcrumb-item  :to="{path:'/home/hotelRoom/'}">房间</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="goHotelRoomProduct">酒店房间产品</el-breadcrumb-item>
      <el-breadcrumb-item >酒店房间实体</el-breadcrumb-item>
      <!--<el-breadcrumb-item>前往生成房间数</el-breadcrumb-item>-->
    </el-breadcrumb>
    <h1 class="userClass">酒店房间实体</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>房间门牌号筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="houseName" auto-complete="off" placeholder="房间门牌号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelRoomEntityList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        width="140"
        prop="ht_re_Id"
        label="房间实体ID"
        align="center"
      >
      </el-table-column>
      <!--<el-table-column-->
        <!--width="140"-->
        <!--prop="ht_rpp_ID"-->
        <!--label="房间产品ID"-->
        <!--align="center"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        width="140"
        prop="ht_re_HouseNumber"
        label="房间门牌号"
      >
      </el-table-column>
      <el-table-column
        prop="ht_re_ImagePath"
        label="房间图片"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row.ht_re_Id)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_re_Id)">删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRoomNumber(scope.row.ht_re_Id)">前往生成房间数
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>

    <!--添加酒店房间实体-->
    <el-dialog title="添加酒店房间实体" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="房间门牌号:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_re_HouseNumber"></el-input>
        </el-form-item>
        <el-form-item label="房间图片上传:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改酒店房间实体-->
    <el-dialog title="修改酒店房间实体" :visible.sync="updateDialog">
      <el-form :model="updateHotelRoomEntityObj">
        <el-form-item label="房间门牌号:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomEntityObj.ht_re_HouseNumber"></el-input>
        </el-form-item>
        <el-form-item label="房间图片上传:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload1" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
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
        houseName:'',
        roomProductID:'',//房间产品编码
        total: 0,
        ImageURL:[],
        ImageURL1:[],
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_rpp_ID": "",//房间产品ID
            "ht_re_HouseNumber": "",//房间门牌号
            "ht_re_ImagePath": "",//房间图片
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomEntityList',
      'updateHotelRoomEntityObj'
    ]),
    created(){
      let id = this.$route.params.id;
      if (!id) {
        this.$notify({
          message: '请先选择房间产品!',
          position: 'top-left',
          type: 'error'
        });
        this.$router.push({name: 'HotelRoomProduct'});
        return
      }
      this.roomProductID = id;
      this.initData('', 1)
    },
    methods: {
      goHotelRoomProduct(){
        this.$router.push({name:'HotelRoomProduct',params:{id:1378}})
      },
      //前往生成房间数
      toRoomNumber(RoomProductID){
        this.$router.push({name:'HotelRoomNumber', params: {id: RoomProductID}})
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
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://webservice.1000da.com.cn/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            }else{
              console.log(xhr.responseText)
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      uploaNode() {
        this.ImageURL = [];
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('hotelUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                //})
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                // this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                //   this.$store.dispatch('hotelUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload1.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL1.push(data.data);
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
        }, 30)
      },
      //分页
      handleCurrentChange(num){
        this.initData(this.houseName,num)
      },
      initData(houseID,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page?page:1,//分页号
          "rows": "10",//单页显示数据量
          "ht_re_Id": "",//房间实体ID
          "ht_rpp_ID": this.roomProductID,//房间产品ID
          "ht_re_HouseNumber": houseID?houseID:'',//房间门牌号
          "ht_re_ImagePath": "",//房间图片
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomEntity',options)
          .then((total) => {
            this.total = total
            this.isLoading = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      search(){
        this.initData(this.houseName,1)
      },
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode()
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_re_ImagePath = this.ImageURL.join(',');
        this.addOptions.data.ht_rpp_ID = this.roomProductID;
        this.$store.dispatch('AddHotelRoomEntity',this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.houseName, 1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      Update(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('UpdateHotelRoomEntity', id)
        this.uploaNode()
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRoomEntityObj
        };
        updateOptions.data.ht_re_ImagePath = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateHotelRoomEntity',updateOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.houseName, 1)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateDialog = false;
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_re_Id": id//房间实体ID
          }
        };
        this.$store.dispatch('DeleteHotelRoomEntity',deleteOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.houseName, 1)
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

</style>
