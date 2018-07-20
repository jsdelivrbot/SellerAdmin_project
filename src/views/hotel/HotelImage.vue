<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店图片信息</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="hotelImageList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_hi_ID"
        label="图片编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_hi_ImageTypeName"
        label="图片类型名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="图片地址"
        align="center"
      >
        <template slot-scope="scope">
          <!--<span>{{scope.row.ht_hi_ImageURL}}</span>-->
          <img src="" alt="" v-lazy="scope.row.ht_hi_ImageURL" title="点击查看大图" style="width:100px;height:100px;cursor: pointer" @click="clickImg(scope.row.ht_hi_ImageURL)">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          @click="Update(scope.row.ht_hi_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_hi_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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

    <!--添加酒店图片-->
    <el-dialog title="添加酒店图片" :visible.sync="addDialog">
      <el-form :model="addOptions">

        <el-form-item label="图片类型:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_hi_ImageTypeID" placeholder="请选择类型">
            <el-option
              v-for="item in hotelImageTypeList"
              :key="item.ht_it_ID"
              :label="item.ht_hi_Name"
              :value="item.ht_it_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.data.ht_hi_Remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改酒店图片-->
    <el-dialog title="修改酒店图片" :visible.sync="updateDialog">
      <el-form :model="updateHotelImageObj">

        <el-form-item label="图片类型:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelImageObj.ht_hi_ImageTypeID" placeholder="请选择类型">
            <el-option
              v-for="item in hotelImageTypeList"
              :key="item.ht_it_ID"
              :label="item.ht_hi_Name"
              :value="item.ht_it_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload1" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelImageObj.ht_hi_Remark">
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

  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {
        ImageURL:[],
        ImageURL1:[],
        hotelID:'',
        isLoading:false,
        imgShow:false,
        imgUrl:'',
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_hi_HotelID": "",//酒店编码
            "ht_hi_ImageTypeID": "",//图片类型编码
            "ht_hi_ImageURL": "",//图片
            "ht_hi_Remark": "",//备注
          }
        }
      }
    },
    computed: mapGetters([
      'hotelImageTypeList',
      'hotelImageList',
      'updateHotelImageObj'
    ]),
    created(){
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
      this.initImageType();
    },
    methods: {
      //惠乐游图片类型
      initImageType(){
        let imgOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_it_ID": "",//图片类型编码
          "ht_hi_Name": '',//图片类型名称
        };
        this.$store.dispatch('initHotelImageType', imgOptions)
      },
      uploadToOSS(file) {
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr+"/OSSFile/PostToOSS");
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
                // })
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
      clickImg(imgUrl){
        this.$store.commit('setTranstionFalse');
        this.imgShow = true;
        this.imgUrl = imgUrl
      },

      //初始化
      initData(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_hi_ID": "",//图片编码
          "ht_hi_HotelID": this.hotelID,//酒店编码
          "ht_hi_ImageTypeID": "",//图片类型编码
        }
        this.isLoading = true;
        this.$store.dispatch('initHotelImage',options)
          .then(() => {
            this.isLoading  = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //添加
      Add(){
        this.ImageURL = [];
        this.ImageURL1 = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode()
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_hi_HotelID = this.hotelID;
        this.addOptions.data.ht_hi_ImageURL = this.ImageURL.join(',');
        this.$store.dispatch('AddHotelImage',this.addOptions)
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
      Update(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('updateHotelImage',id)
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
          "data": this.updateHotelImageObj
        };
        updateOptions.data.ht_hi_ImageURL = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateHotelImage',updateOptions)
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
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_hi_ID": id//图片编码
          }
        };
        this.$store.dispatch('DeleteHotelImage',deleteOptions)
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

</style>
