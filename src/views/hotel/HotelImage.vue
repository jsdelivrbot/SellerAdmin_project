<template>
  <div id="wrap" class="clearfix">
    <div class="title clearfix" style="padding: 20px">
      <h1 style="font-size: 20px;">酒店图片信息</h1><br><br>
      <el-button type="primary" @click="Add" size="small" style="float: right;;margin-right: 80px;">新增</el-button>
    </div>

    <!--数据展示-->
    <el-table
      :data="hotelImageList"
      v-loading="isLoading"
      style="width:100%"
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
        label="点击查看大图"
        align="center"
      >

        <template slot-scope="scope">
          <img
            v-for="item,index in scope.row.ht_hi_ImageURL"
            :src="item"
            title="点击查看大图"
            style="width:100px;cursor: pointer;margin-right: 10px;"
            @click="clickImg(item)"
          >
        </template>

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
            @click="Delete(scope.row.ht_hi_ID)">删除
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="jump(scope.row)">预览效果
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="UpData(scope.row.ht_hi_ID)">上移
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="DownData(scope.row.ht_hi_ID)">下移
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
      <img :src="imgUrl" alt="" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgShow = false">取 消</el-button>
        <el-button type="primary" @click="imgShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加酒店图片-->
    <el-dialog title="添加酒店图片" :visible.sync="addDialog" :close-on-click-modal="false">
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
          <p>单张图片不能大于600KB</p>
          <Upload @getData="getData" :attrs="imageObj"></Upload>

          <div class="imgWap">
            <p v-for="item,index in ImageURL"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteImageURL(item)">X</span>
              <em>
                <el-radio v-model="radioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL.length"
              >
            </p>
          </div>
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

    <el-dialog title="修改酒店图片" :visible.sync="updateDialog" :close-on-click-modal="false">
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
          <p>单张图片不能大于600KB</p>
          <Upload @getData="updateImage" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in ImageURL1"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
              <em>
                <el-radio v-model="updateRadioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL1.length"
              >
            </p>
          </div>
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
  import Upload from '@/components/Upload'
  export default{
    name: '',
    components: {
      Upload
    },
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
        },
        options:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          UpDataId:'',
          DownDataId:''
        },
        imageObj: {accept: 'image/*'},
        radioIndex: 0,
        updateRadioIndex: 0,
        isNewUploaNode: true,
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
      //上移
      UpData(id){
        //获取下一个
        let ID = this.getIndex(id,1);
        if(ID){
          this.options.UpDataId = id;
          this.options.DownDataId = ID;
          this.$store.dispatch('initDownData',this.options)
          .then(()=>{
            this.initData()
          })
        }
      },
      //下移
      DownData(id){
        //获取下一个
        let ID = this.getIndex(id,2);
        if(ID){
          this.options.UpDataId = id;
          this.options.DownDataId = ID;
          this.$store.dispatch('initDownData',this.options)
          .then(()=>{
            this.initData()
          })
        }
      },
      getIndex(id,num){
        for(var i=0;i<this.hotelImageList.length;i++){
          if(this.hotelImageList[i].ht_hi_ID==id){
            if(num==1){
              //上移
              return this.hotelImageList[i-1].ht_hi_ID
            }else{
              //下移
              return this.hotelImageList[i+1].ht_hi_ID
            }
          }
        }
//        return this.hotelImageList.filter((item,index)=>{
//          if(item.ht_hi_ID==id){
//            return true
//          }
//        })
      },
      //图片上传
      getData(data) {
        if (!this.radioIndex) {
          this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      //修改图片
      updateImage(data) {
        if (!this.updateRadioIndex) {
          this.ImageURL1.push(data.data);
        } else {
          this.ImageURL1.splice(this.updateRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },
      //删除修改对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL1 = this.ImageURL1.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //展示大图
      clickImg(val){
        this.$store.commit('setTranstionFalse');
        this.imgUrl = val;
        this.imgShow = true
      },
      jump(obj){
        let hotelID=sessionStorage.getItem("hotelID")
        window.open('http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/'+hotelID,'_blank')
      },
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
        let uploader = document.querySelector('.uploader-list')
        if(uploader){
          uploader.querySelector('ul').innerHTML = ''
        }
        for(let attr in this.addOptions.data){
          if(typeof this.addOptions.data[attr]=='object'){
            for(let attr1 in this.addOptions.data[attr]){
              this.addOptions.data[attr][attr1] = ''
            }
          }else{
            this.addOptions.data[attr] = ''
          }
        }
        this.ImageURL = [];
        this.ImageURL1 = [];
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
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
      Update(obj){
        this.ImageURL1 = obj.ht_hi_ImageURL;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('updateHotelImage',obj.ht_hi_ID)
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
