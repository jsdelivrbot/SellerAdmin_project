<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">酒店房间管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>房间名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="roomName" auto-complete="off" placeholder="房间名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelRoomList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="楼层:">
              <span>{{ props.row.ht_bt_Level }}</span>
            </el-form-item>
            <el-form-item label="房间图片:">
              <img v-lazy="props.row.ht_bt_ImagePath" alt="" style="width: 100px;height: 100px" @click="lookImg(props.row.ht_bt_ImagePath)">
              <!--<span>{{ props.row.ht_bt_ImagePath }}</span>-->
            </el-form-item>
            <el-form-item label="面积:">
              <span>{{ props.row.ht_bt_Area }}m<sup>2</sup></span>
            </el-form-item>
            <el-form-item label="无烟房:">
              <span>{{ props.row.ht_bt_Smoke }}</span>
            </el-form-item>
            <el-form-item label="加床:">
              <span>{{ props.row.ht_bt_AddBed }}</span>
            </el-form-item>
            <el-form-item label="最多入住数(人):">
              <span>{{ props.row.ht_bt_MostIn }}</span>
            </el-form-item>
            <el-form-item label="床型:">
              <span>{{ props.row.ht_bt_BedType }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.ht_bt_CreateTime | getUseTime}}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ht_bt_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        prop="ht_bt_RoomID"
        label="房间编码"
      >
      </el-table-column>
      <el-table-column
        prop="ht_bt_RoomName"
        width="140"
        label="房间名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row.ht_bt_RoomID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_bt_RoomID)">删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRoomProduct(scope.row.ht_bt_RoomID)">前往房间产品
          </el-button>
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="toRoomNumber(scope.row.ht_bt_RoomID)">前往生成房间数-->
          <!--</el-button>-->
          <el-button
            size="mini"
            type="primary"
            @click="toRoomFacilities(scope.row.ht_bt_RoomID)">前往房间房间设施
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
    <!--添加酒店房间-->
    <el-dialog title="添加酒店房间" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="房间名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_RoomName"></el-input>
        </el-form-item>
        <el-form-item label="床型:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_BedType"></el-input>
        </el-form-item>
        <el-form-item label="最多入住数:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_MostIn"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_Level"></el-input>
        </el-form-item>
        <el-form-item label="面积(平方):" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_Area"></el-input>
        </el-form-item>
        <el-form-item label="无烟房:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_Smoke"></el-input>
        </el-form-item>
        <el-form-item label="加床:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_bt_AddBed"></el-input>
        </el-form-item>
        <el-form-item label="图片上传:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
        </el-form-item>
        <el-form-item label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="addOptions.data.ht_bt_CreateTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_bt_Remark">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看大图-->
    <el-dialog
      title="图片"
      :visible.sync="imgShow"
      width="60%"
      center>
      <img src="" alt="" v-lazy="imgUrl" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgShow = false">取 消</el-button>
        <el-button type="primary" @click="imgShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改酒店房间-->
    <el-dialog title="修改酒店房间" :visible.sync="updateDialog">
      <el-form :model="updateHotelRoomObj">
        <el-form-item label="房间名称:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_RoomName"></el-input>
        </el-form-item>
        <el-form-item label="床型:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_BedType"></el-input>
        </el-form-item>
        <el-form-item label="最多入住数:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_MostIn"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_Level"></el-input>
        </el-form-item>
        <el-form-item label="面积(平方):" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_Area"></el-input>
        </el-form-item>
        <el-form-item label="无烟房:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_Smoke"></el-input>
        </el-form-item>
        <el-form-item label="加床:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_AddBed"></el-input>
        </el-form-item>
        <el-form-item label="图片上传:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload1" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
        </el-form-item>
        <el-form-item label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateHotelRoomObj.ht_bt_CreateTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelRoomObj.ht_bt_Remark">
          </el-input>
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
        imgUrl:'',
        imgShow:false,
        ImageURL: [],
        ImageURL1: [],
        roomName: '',
        total: 0,
        hotelID: '',
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_bt_HotelID": "",//酒店编码
            "ht_bt_RoomName": "",//房间名称
            "ht_bt_BedType": "",//床型
            "ht_bt_MostIn": "",//最多入住数
            "ht_bt_Level": "",//楼层
            "ht_bt_ImagePath": "",//房间图片
            "ht_bt_Area": "",//面积
            "ht_bt_Smoke": "",//无烟房
            "ht_bt_AddBed": "",//加床
            "ht_bt_IsDelete": "",//是否启用
            "ht_bt_CreateTime": "",//创建时间
            "ht_bt_Remark": "",//备注
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomList',
      'updateHotelRoomObj'
    ]),
    created(){
      this.hotelID = sessionStorage.getItem('hotelID');
      if (!this.hotelID) {
        this.$router.push({name: 'HotelDetil'})
        this.$notify({
          message: '请先添加酒店信息!',
          position: 'top-left',
          type:'error'
        });
        return
      }
      this.initData()
    },
    methods: {
      //前往生成房间数
      toRoomNumber(RoomID){
        this.$router.push({name:'HotelRoomNumber', params: {id: RoomID}})
      },
      //前往房间房间设施
      toRoomFacilities(RoomID){
        this.$router.push({name:'HotelRoomRoomFacilities', params: {id: RoomID}})
      },
      //前往房间产品
      toRoomProduct(RoomID){
        this.$router.push({name:'HotelRoomProduct', params: {id: RoomID}})
      },
      lookImg(imgUrl){
        this.$store.commit('setTranstionFalse');
        this.imgShow = true;
        this.imgUrl = imgUrl
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
      uploaNode() {
        this.ImageURL = [];
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i]).then(data => {
                  this.$store.dispatch('hotelUploadAdminImgs', {
                    imageData: data
                  })
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
                })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                  this.$store.dispatch('hotelUploadAdminImgs', {
                    imageData: data
                  })
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
                })
              }
            })
          }
        }, 30)
      },
      //分页
      handleCurrentChange(num){
        this.initData('', num);
      },
      //初始化
      initData(name, page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_bt_RoomID": "",//房间编码
          "ht_bt_HotelID": this.hotelID,//酒店编码
          "ht_bt_RoomName":name?name:'',
          "ht_bt_IsDelete": "",//是否启用
          "page": page ? page : 1,//页码编号
          "rows": "5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoom', options)
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
      //查询
      search(){
        this.initData(this.roomName,1)
      },
      Add(){
        this.ImageURL = [];
        this.ImageURL1 = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode()
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_bt_HotelID = this.hotelID;
        this.addOptions.data.ht_bt_ImagePath = this.ImageURL.join(',');
        this.$store.dispatch('AddHotelRoom', this.addOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.roomName, 1)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('UpdateHotelRoom', id)
        this.uploaNode()
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": this.updateHotelRoomObj
        };
        updateOptions.data.ht_bt_ImagePath = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateHotelRoom',updateOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.roomName, 1)
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
            "ht_bt_RoomID": id//房间编码
          }
        };
        this.$store.dispatch('DeleteHotelRoom',deleteOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.roomName, 1)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
      },
    }
  }
</script>
<style scoped>

</style>
