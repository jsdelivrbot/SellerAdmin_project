<template>
  <!--查询完成、删除完成、新增完成、修改完成/修改中的视频上传完成,添加未知有没有成功,或许已经成功了-->
  <div id="wrap" class="clearfix">
    <h1 class="userClass">导览信息</h1>
    <!--查询栏-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>导览名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="siteName" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>


    <!--添加-->
    <el-dialog title="添加地图坐标信息" :visible.sync="addDialog">
      <el-form :model="addOptions">

        <el-form-item label="小景点名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.tm_se_Name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的横坐标:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.tm_se_HandX" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的纵坐标:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.tm_se_HandY" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点介绍:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.tm_se_Intro" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.tm_se_Remark" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点图片:" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="string"
            :on-remove="handleRemove"
            :file-list="fileList"
            :http-request="upload"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="小景点音频:" :label-width="formLabelWidth">
          <a href="javascript:;" class="flie">
            <input type="file" name="" ref="audio" multiple>
          </a>
          <span style="display: inline-block;height: 30px;margin-left:40px;font-size: 18px;">{{AudioNews}}</span>
          <el-form-item size="large">
            <el-button type="primary" size="mini" @click="uploadaudio">立即上传</el-button>
          </el-form-item>
        </el-form-item>

        <el-form-item label="小景点视频:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">选择视频
            <input type="file" name="" ref="UpLoad" multiple>
          </a>
          <span style="display: inline-block;height: 30px;margin-left:40px;font-size: 18px;">{{VideoNameObj}}</span>
          <el-form-item size="large">
            <el-button type="primary" size="mini" @click="UpLoadvideo">立即上传</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="AddSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog title="修改地图坐标信息" :visible.sync="updateDialog">
      <el-form :model="updateOptions">

        <el-form-item label="小景点名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_Name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的横坐标:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_HandX" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手绘图的纵坐标:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_HandY" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点介绍:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_Intro" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点备注:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.tm_se_Remark" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="小景点图片:" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="string"
            :on-remove="handleRemove"
            :file-list="fileList"
            :http-request="upload"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="小景点音频:" :label-width="formLabelWidth">
          <a href="javascript:;" class="flie">
            <input type="file" name="" ref="audio" multiple>
          </a>
          <span style="display: inline-block;height: 30px;margin-left:40px;font-size: 18px;">{{AudioNews}}</span>
          <el-form-item size="large">
            <el-button type="primary" size="mini" @click="uploadaudio">立即上传</el-button>
          </el-form-item>
        </el-form-item>

        <el-form-item label="小景点视频:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">选择视频
            <input type="file" name="" ref="UpLoad" multiple>
          </a>
          <span style="display: inline-block;height: 30px;margin-left:40px;font-size: 18px;">{{VideoNameObj}}</span>
          <el-form-item size="small">
            <el-button type="primary" size="mini" @click="UpLoadvideo">立即上传</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="upDateSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--展示-->
    <el-table
      :data="ticketMapList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="景点编码">
              <span>{{ props.row.tm_se_ID }}</span>
            </el-form-item>
            <el-form-item label="手绘图横坐标">
              <span>{{ props.row.tm_se_HandX}}</span>
            </el-form-item>
            <el-form-item label="手绘图纵坐标">
              <span>{{ props.row.tm_se_HandY }}</span>
            </el-form-item>
            <el-form-item label="景点视频">
              <span>{{ props.row.tm_se_Vedio }}</span>
            </el-form-item>
            <el-form-item label="景点音乐">
              <span>{{ props.row.tm_se_Sound }}</span>
            </el-form-item>
            <el-form-item label="景点图片">
              <span>{{ props.row.tm_se_Image }}</span>
            </el-form-item>
            <el-form-item label="景点介绍">
              <span>{{ props.row.tm_se_Intro }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="小景点编号"
        prop="tm_se_ID">
      </el-table-column>
      <el-table-column
        label="景点名称"
        prop="tm_se_Name">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="tm_se_Remark">
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
            @click="Delete(scope.row.tm_se_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" v-show="total" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        tableData:[],
        formLabelWidth:'120px',
        total: 0,
        siteName: '',
        isLoading: false,
        addDialog: false,//添加弹窗
        updateDialog: false,//修改弹窗
        VideoNameObj:"",
        AudioNews:"",
        //添加
        addOptions: {
          "loginUserID": "huileyou",    //惠乐游用户ID
          "loginUserPass": "123",    //惠乐游用户密码
          "operateUserID": "",    //操作员编码
          "operateUserName": "",    //操作员名称
          "pcName": "",    //机器码
          "data": {
            "tm_se_Code": "002",  //景点编号
            "tm_se_Name": "",  //小景点名称
            "tm_se_HandX": "",  //位于手绘图X
            "tm_se_HandY": "",  //位于手绘图Y
            "tm_se_Vedio": "",  //VR视频
            "tm_se_Sound": "",  //音频
            "tm_se_Intro": "",  //小景点介绍
            "tm_se_Image": "",  //小景点图片
            "tm_se_Remark": "",  //备注
          }
        },
        //修改
        updateOptions:{
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "data":{
            "tm_se_ID": "",  //景区小景点编码
            "tm_se_Code": "002",  //景点编号
            "tm_se_Name": "",  //小景点名称
            "tm_se_HandX": "",  //位于手绘图X
            "tm_se_HandY": "",  //位于手绘图Y
            "tm_se_Vedio": "",  //VR视频
            "tm_se_Sound": "",  //音频
            "tm_se_Intro": "",  //小景点介绍
            "tm_se_Image": "",  //小景点图片
            "tm_se_Remark": ""  //备注
          }
        },
        fileList:[],
        "Imgs":"",
      }
    },
    computed: mapGetters([
      'ticketMapList',
    ]),
    created(){
      this.id = this.$route.query.id;
      this.initData()
    },
    methods: {
      //视频上传
      UpLoadvideo() {
        var fd = new FormData();
        fd.append("fileUploadOss", this.$refs.UpLoad.files[0])
        console.log(2331,this.$refs.UpLoad.files[0])
        let VideoName=this.$refs.UpLoad.files[0].name
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://image.1000da.com.cn/PostImage/PostToOSS");
        xhr.send(fd);
        xhr.onreadystatechange = ()=>{
          if (xhr.readyState == 4 && xhr.status == 200){
            //类型转换,获取视频地址
            let VideoObj=JSON.parse(xhr.responseText);
            this.addOptions.data.tm_se_Vedio=VideoObj.data;
            this.updateOptions.data.tm_se_Vedio=VideoObj.data;
            this.VideoNameObj=VideoName;
          }
        }
      },
      //音频上传
      uploadaudio(){
        var fd =new FormData();
        fd.append('fileUpLoad',this.$refs.audio.files[0])
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://image.1000da.com.cn/PostImage/PostFile");
        xhr.send(fd);
        xhr.onreadystatechange = ()=>{
          if (xhr.readyState == 4 && xhr.status == 200){
            //类型转换,获取视频地址
            let AudioObj=JSON.parse(xhr.responseText);
            this.addOptions.data.tm_se_Sound=AudioObj.data;
            this.updateOptions.data.tm_se_Sound=AudioObj.data;
            this.AudioNews="上传成功"
          }
        }
      },
      //图片上传
      upload(item){
        var fd = new FormData();
        fd.append("fileToUpload", item.file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://image.1000da.com.cn/PostImage/PostFile");
        xhr.send(fd);
        xhr.onreadystatechange = ()=>{
          if (xhr.readyState == 4 && xhr.status == 200) {
            let obj = JSON.parse(xhr.responseText);
            this.fileList.push({
              url:obj.data
            })
            this.addOptions.data.tm_se_Image=obj.data;
            this.updateOptions.data.tm_se_Image=obj.data;
            item.onSuccess('配时文件上传成功')
            console.log(obj)
          }
        }
      },
      handleRemove(file) {
        this.fileList = this.fileList.filter(item=>{
          if(item.uid==file.uid){
            return false;
          }
          return true;
        })
      },
      //分页
      handleCurrentChange(num){
        this.initData(this.siteName,num)
      },
      //查询this.id
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_se_ID": "",//景区小景点编码
          "tm_se_Code": "002",//景点编号
          "tm_se_Name": name?name:'',//小景点名称
          "page": page?page:1,//页码
          "rows": "5"//条数
        };
        this.isLoading = true;
        this.$store.dispatch('initTicketMap',options)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //新增
      addMap(){
        this.$store.dispatch('addTicketMap',this.addOptions)
          .then(suc=>{
            this.initData();
          })
      },
      //删除
      deleteMap(id){
        let deleteOption={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "tm_se_ID": id,//景区小景点编码
          },
        };
        this.$store.dispatch('deleteTicketMap',deleteOption)
          .then(suc=>{
            this.initData();
          })
      },
      //修改
      upDateMap(){
        this.$store.dispatch('upDateTicketMap',this.updateOptions)
          .then(suc=>{
            this.initData();
          })
      },
      //查询
      search(){
        this.initData(this.siteName)
      },
      //添加
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //新增提交
      AddSubmit(){
        this.addMap();
        this.addDialog = false;
      },
      upDateSubmit(){
        this.upDateMap();
        this.updateDialog=false;
      },
      Update(obj){
        this.updateOptions.data.tm_se_ID=obj.tm_se_ID;
        this.updateOptions.data.tm_se_Name=obj.tm_se_Name;
        this.updateOptions.data.tm_se_HandX=obj.tm_se_HandX;
        this.updateOptions.data.tm_se_HandY=obj.tm_se_HandY;
        this.updateOptions.data.tm_se_Intro=obj.tm_se_Intro;
        this.updateOptions.data.tm_se_Remark=obj.tm_se_Remark;
        this.updateOptions.data.tm_se_Image=obj.tm_se_Image;
        this.updateOptions.data.tm_se_Sound=obj.tm_se_Sound;
        this.updateOptions.data.tm_se_Vedio=obj.tm_se_Vedio;
        this.updateDialog=true;
      },
      Delete(id){
        this.deleteMap(id);
      },
    },
  }
</script>
<style>
  .el-upload__input{
    display: none !important;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
