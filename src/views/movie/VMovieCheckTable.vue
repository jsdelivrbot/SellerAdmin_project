<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">微电影审核表</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="mini">
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="Add">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="VMovieCheckTableList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
              <el-form-item label="审核表编号:">
                <span>{{props.row.vf_ve_ID}}</span>
              </el-form-item>
              <el-form-item label="视频类型:">
                <span>{{props.row.vf_ve_TypeName}}</span>
              </el-form-item>
              <el-form-item label="创建视频时间:">
                <span>{{props.row.vf_ve_Content.vf_vo_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="分类名称:">
                <span>{{props.row.vf_ve_Content.vf_te_IDNames}}</span>
              </el-form-item>
              <el-form-item label="时长:">
                <span>{{props.row.vf_ve_Content.vf_vo_Time}}</span>
              </el-form-item>
              <el-form-item label="首页大图:">
                <img :src="props.row.vf_ve_Content.vf_vo_TomImageURL" alt="" style="width: 100px;height: 100px">
              </el-form-item>
              <el-form-item label="大小:">
                <span>{{props.row.vf_ve_Content.vf_vo_Size}}</span>
              </el-form-item>
              <el-form-item label="文件扩展名:">
                <span>{{props.row.vf_ve_Content.vf_vo_Extend}}</span>
              </el-form-item>
              <el-form-item label="作者:">
                <span>{{props.row.vf_ve_Content.vf_vo_AuthorName}}</span>
              </el-form-item>
              <el-form-item label="标题:">
                <span>{{props.row.vf_ve_Content.vf_vo_Title}}</span>
              </el-form-item>
              <el-form-item label="简介:">
                <span>{{props.row.vf_ve_Content.vf_vo_Introduce}}</span>
              </el-form-item>
              <el-form-item label="视频图片:">
                <img :src="props.row.vf_ve_Content.vf_vo_ImageURL" alt="" style="width: 100px;height: 100px">
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{props.row.vf_ve_Content.vf_vo_Remark}}</span>
              </el-form-item>
              <el-form-item label="视频:">
                <video :src="props.row.vf_ve_Content.vf_vo_FileURL"  width="320" height="240" controls="controls"></video>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="审核表编号"
          prop="vf_ve_ID">
        </el-table-column>
        <el-table-column
          label="视频类型">
          <template slot-scope="scope">
            {{ scope.row.vf_ve_TypeName }}
          </template>
        </el-table-column>

        <el-table-column
          label="创建审核表时间"
          prop="vf_ve_CreateTime">
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
              @click="Delete(scope.row.vf_ve_ID)">删除
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
      <el-dialog title="添加" :visible.sync="addDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="addOptions">

          <el-form-item label="请选择视频:" :label-width="formLabelWidth">
            <span>视频不超过600M</span>
            <Upload @getData="passVideo" :attrs="videoObj"></Upload>
            <!--<a href="javascript:;" class="file">选择视频-->
              <!--<input type="file" name="" ref="upload1" multiple>-->
            <!--</a>-->
            <!--<el-form-item size="large">-->
              <!--<el-button type="primary" size="mini" @click="uploadFile">立即上传</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item size="large">-->
              <!--<video id="addVideo" :src="addVideoSrc"  width="320" height="240" controls="controls"></video>-->
            <!--</el-form-item>-->

          </el-form-item>
          <el-form-item label="电影类型筛选:" :label-width="formLabelWidth">
            <el-select v-model="parentTypeId" multiple placeholder="请选择电影类型" @change="addParentChange">
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID"
                         v-for="item in VMovieTypeList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth" v-show="isVisible">
            <el-select v-model="categoriesName" multiple placeholder="请选择分类名称">
              <el-option
                v-for="item in VMovieChildTyeList"
                :key="item.vf_te_ID"
                :label="item.vf_te_Name"
                :value="item.vf_te_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.vf_ve_Content.vf_vo_Title" placeholder="标题"></el-input>
          </el-form-item>

          <el-form-item label="首页大图:" :label-width="formLabelWidth">

            <span>图片不超过2M,且只上传一张图片</span>
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

            <!--<a href="javascript:;" class="file">-->
              <!--首页大图上传-->
              <!--<input type="file" name="" ref="addBigImgUpload" accept="image/*">-->
            <!--</a>-->
            <!--<img :src="addOptions.data.vf_ve_Content.vf_vo_TomImageURL"-->
                 <!--v-show="addOptions.data.vf_ve_Content.vf_vo_TomImageURL"-->
                 <!--style="width: 100px;height: 100px">-->

          </el-form-item>

          <el-form-item label="视频图片:" :label-width="formLabelWidth">
            <span>图片不超过2M,且只上传一张图片</span>

            <Upload @getData="getDataOne" :attrs="imageObj"></Upload>

            <div class="imgWapOne">
              <p v-for="item,index in ImageURLOne"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURLOne(item)">X</span>
                <em>
                  <el-radio v-model="radioIndexOne" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageURLOne.length"
                >
              </p>
            </div>



            <!--<a href="javascript:;" class="file">-->
              <!--视频图片上传-->
              <!--<input type="file" name="" ref="addFilmImg" accept="image/*">-->
            <!--</a>-->
            <!--<img :src="addOptions.data.vf_ve_Content.vf_vo_ImageURL"-->
                 <!--v-show="addOptions.data.vf_ve_Content.vf_vo_ImageURL"-->
                 <!--style="width: 100px;height: 100px">-->

          </el-form-item>
          <el-form-item label="简介:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.vf_ve_Content.vf_vo_Introduce" placeholder="简介"></el-input>
          </el-form-item>
          <el-form-item label="详情:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.vf_ve_Content.vf_vo_Remark" placeholder="详情"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
          <!--<el-button @click="addDialog = false">取 消</el-button>-->
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="VMovieCheckTableUpdateObj">

          <el-form-item label="审核表编码:" :label-width="formLabelWidth">
            <el-input v-model="VMovieCheckTableUpdateObj.data.vf_ve_ID" placeholder="请输入审核表编码" :disabled="isDisabled">>
            </el-input>
          </el-form-item>
          <el-form-item label="电影类型筛选:" :label-width="formLabelWidth">
            <el-select v-model="updateFilmType" multiple placeholder="请选择电影类型" @change="updateParentChange">
              <el-option :key="item.vf_te_ID" :label="item.vf_te_Name" :value="item.vf_te_ID"
                         v-for="item in VMovieTypeList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth">
            <el-select v-model="updateCategoriesName" multiple placeholder="请选择分类名称">
              <el-option
                v-for="item in VMovieChildTyeList"
                :key="item.vf_te_ID"
                :label="item.vf_te_Name"
                :value="item.vf_te_ID">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="首页大图:" :label-width="formLabelWidth">

            <span>图片不超过2M,且只上传一张图片</span>
            <Upload @getData="getUpdateData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="item,index in ImageUpdateURL"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURL(item)">X</span>
                <em>
                  <el-radio v-model="radioUpdateIndex" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageUpdateURL.length"
                >
              </p>
            </div>




            <!--<a href="javascript:;" class="file">-->
              <!--首页大图上传-->
              <!--<input type="file" name="" ref="updateBigImg" accept="image/*">-->
            <!--</a>-->
            <!--<img  :src="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL"-->
                 <!--v-show="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL"-->
                 <!--style="width: 100px;height: 100px">-->
            <!---->
          </el-form-item>
          <el-form-item label="视频图片:" :label-width="formLabelWidth">
            <span>图片不超过2M,且只上传一张图片</span>

            <Upload @getData="getUpdateDataOne" :attrs="imageObj"></Upload>

            <div class="imgWapOne">
              <p v-for="item,index in ImageUpdateURLOne"
                 style="display: inline-block;position: relative;margin-right: 70px">
                <span style="color: #f60" @click="deleteImageURLOne(item)">X</span>
                <em>
                  <el-radio v-model="radioUpdateIndexOne" :label="index+1">替换</el-radio>
                </em>
                <img
                  :src="item"
                  width="280"
                  height="125"
                  v-show="ImageUpdateURLOne.length"
                >
              </p>
            </div>

            <!--<a href="javascript:;" class="file">-->
              <!--视频图片上传-->
              <!--<input type="file" name="" ref="updateFilmImg" accept="image/*">-->
            <!--</a>-->
            <!--<img  :src="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ImageURL"-->
                 <!--v-show="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ImageURL"-->
                 <!--style="width: 100px;height: 100px">-->

          </el-form-item>
          <el-form-item label="上传视频:" :label-width="formLabelWidth">

            <span>视频不超过600M</span>
            <video :src="updateOptions.data.tm_se_Vedio" v-show="updateOptions.data.tm_se_Vedio" controls
                   width="100"></video>
            <Upload @getData="updateVideo" :attrs="videoObj"></Upload>

            <!--<a href="javascript:;" class="file">选择视频-->
              <!--<input type="file" name="" ref="updateFilm" multiple>-->
            <!--</a>-->
            <!--<video id="addVideo1" :src="updateVideo"  width="320" height="240" controls="controls"></video>-->

          </el-form-item>
          <!--<el-form-item size="large" :label-width="formLabelWidth">-->
            <!--<el-button type="primary" size="mini" @click="uploadFileUpdate">立即上传</el-button>-->
          <!--</el-form-item>-->
          <el-form-item label="标题:" :label-width="formLabelWidth">
            <el-input v-model="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="简介:" :label-width="formLabelWidth">
            <el-input v-model="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Introduce" placeholder="简介"></el-input>
          </el-form-item>
          <el-form-item label="详情:" :label-width="formLabelWidth">
            <el-input v-model="VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Remark" placeholder="详情"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cacheForm">取 消</el-button>
          <!--<el-button @click="updateDialog = false">取 消</el-button>-->
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'
  export default {
    name: '',
    components: {
      Upload
    },
    data() {
      return {
        isUploaNode:true,
        categoriesName:[],
        value11: [],
        updateChildType: [],
        updateCategoriesName: [],
        updateFilmType: [],
        value5:'',
        typeID:'',
        parentTypeId:'',
        updateVideo:'',//修改视频播放
        addVideoSrc:'',
        num:'',
        "Imgs": "",
        radioIndex: '',
        radioIndexOne:'',
        updateMovieType:'',
        typeId:'',
        isVisible:false,
        percentage:0,
        videoData:{
          "vedioName":''
        },
        videoObj: {
          accept: 'video/*'
        },
        imageObj: {
          accept: 'image/*'
        },

        isNewUploaNode: true,
        isNewUploaNodeOne: true,
        //是否禁用
        isDisabled: true,
        //修改
        updateDialog: false,
        ImageURL: [],
        ImageURLOne:[],
        ImageUpdateURL:[],
        ImageUpdateURLOne:[],
        // ImageURL1: '',
        //数据展示
        isLoading: false,
        //分页
        total: 0,
        //查询
        movieType: '',
        //修改上传的视频文件
        updateFilmfile: [],
        radioUpdateIndexOne:0,
        radioUpdateIndex:0,
        //添加
        addDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": {
            "vf_ve_Type": "2",//视频类型(微电影)
            "vf_ve_Content": {
              "vf_vo_ID":"",//视频编号（添加视频时传空，修改视频时传入视频编号）
              "vf_vo_Time": "",  //时长（秒）
              "vf_vo_Size": "",  //大小（MB）
              "vf_vo_Extend": "mp4",  //文件扩展名
              "vf_vo_FileURL": "",  //文件地址
              "vf_vo_AuthorID": JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',  //作者
              "vf_vo_Title": "",  //标题
              "vf_vo_ImageURL": "",  //视频图片
              "vf_vo_TomImageURL": "",  //首页大图
              "vf_vo_CreateTime": "",  //创建时间
              "vf_vo_Introduce": "",  //简介
              "vf_vo_Remark": "",  //详情
              "vf_te_IDs": ""//子分类们

            },
          }
        },
        //表单宽度
        formLabelWidth: '120px',
        VMovieCheckTableUpdateObj: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_ve_ID": "",  //审核表编号
            "vf_ve_Type": "2",//视频类型1广告2微电影3教育
            "vf_ve_Content": {  //审核表内容
              "vf_vo_ID": "",//视频编号（添加视频时传空，修改视频时传入视频编号）
              "vf_vo_Time": "",  //时长（秒）
              "vf_vo_Size": "",  //大小（MB）
              "vf_vo_Extend": "",  //文件扩展名
              "vf_vo_FileURL": "",  //文件地址
              "vf_vo_AuthorID": JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',  //作者
              "vf_vo_Title": "",  //标题
              "vf_vo_ImageURL": "",  //视频图片
              "vf_vo_TomImageURL": "",  //首页大图
              "vf_vo_CreateTime": "",  //创建时间
              "vf_vo_Introduce": "",  //简介
              "vf_vo_Remark": "",  //详情
              "vf_te_IDs": ""//分类编号s
            },
          }
        },
      }
    },
    computed: mapGetters([
      'VMovieCheckTableList',
      'VMovieParentTypeList',
      'UploadVideoList',
      'VMovieTypeList',
      'VMovieChildTyeList',
    ]),
    created() {
      this.initData();
    },
    methods: {
      //视频上传
      passVideo(data) {
        this.addOptions.data.vf_ve_Content.vf_vo_FileURL = data.data;
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
      //上传视频图片
      getDataOne(data) {
        if (!this.radioIndexOne) {
          this.ImageURLOne.push(data.data);
        } else {
          this.ImageURLOne.splice(this.radioIndexOne - 1, 1, data.data);
          this.radioIndexOne = '';
        }
      },

      getUpdateData(data) {
       if (!this.radioUpdateIndex) {
             this.ImageUpdateURL.push(data.data);
          } else {
             this.ImageUpdateURL.splice(this.radioUpdateIndex - 1, 1, data.data);
             this.radioUpdateIndex = '';
        }
       },
      getUpdateDataOne(data) {
        if (!this.radioUpdateIndex) {
          this.ImageUpdateURLOne.push(data.data);
        } else {
          this.ImageUpdateURLOne.splice(this.radioUpdateIndex - 1, 1, data.data);
          this.radioUpdateIndex = '';
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
      //
      deleteImageURLOne(val) {
        this.isNewUploaNodeOne = false
        this.ImageURLOne = this.ImageURLOne.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },





      closeDialog(){
        this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL = '';
        this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = '',
        this.addDialog = false,
        this.updateDialog = false
      },
      cacheForm(){
        this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL = '';
        this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = '',
          this.addDialog = false,
          this.updateDialog = false
      },
      updateParentChange() {
        this.updateCategoriesName=[];//改变父分类时子分类清空
        this.VMovieCheckTableUpdateObj.data.vf_ve_Type=this.updateFilmType.join(",");//最新父分类视频编号
        this.childTypeData(this.updateFilmType.join(","));
      },
      //当新增父分类改变时
      addParentChange() {
        this.childTypeData(this.parentTypeId.join(','));
        this.isVisible=true;
        //如果父分类选择首页大图则没有子选项
        if(this.parentTypeId=='5'||this.parentTypeId==''){
          this.isVisible=false;
        };
      },

      childTypeData(typeParentName){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID":"",//分类编号
          "vf_te_Name":"",//分类名称
          "vf_te_ParentIDs": typeParentName?typeParentName:"0",//分类编号父编号
        };
        this.$store.dispatch("childTypeData", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      childTypeData2(typeParentName) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentIDs": typeParentName ? typeParentName : "0",//分类编号父编号
        };
        this.$store.dispatch("childTypeData2", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //分页
      handleCurrentChange(num) {
        this.initData('', num)
        this.num=num;
      },
      //初始化视频类型
      intTypeData(typeName,typeParentName){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID":typeName?typeName:"",//分类编号
          "vf_te_Name":"",//分类名称
          "vf_te_ParentIDs": typeParentName?typeParentName:"0",//分类编号父编号
        };
        this.$store.dispatch("initVMovieSorting", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //初始化数据
      initData(name, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_ve_ID": "",//审核表编号
          "vf_vo_AuthorID": JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'',//作者ID
          "vf_ve_Type": name ? name : "2",//视频类型
          "page": page ? page : 1,//页码
          "rows": 5//条数
        };
        this.$store.dispatch("initVMovieCheckTable", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //查询
      search() {
        this.initData(this.movieType);
      },

      Add() {
        console.log(this.VMovieCheckTableList)
        this.ImageURL = [];
        this.ImageURLOne = [];
        this.intTypeData();
        let content = this.addOptions.data.vf_ve_Content;
        for (let i in content) {
          content[i] = "";
        };
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //新增提交
      addSubmit() {
        this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL = this.ImageURL.join(',')
        this.addOptions.data.vf_ve_Content.vf_vo_ImageURL = this.ImageURLOne.join(',')

        let date = new Date();
        let day = date.getDay();
        Date.prototype.Format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        };
        this.addOptions.data.vf_ve_Content.vf_vo_CreateTime = new Date().Format("yyyy/MM/dd hh:mm:ss");
        this.addOptions.data.vf_ve_Content.vf_te_IDs=this.categoriesName.join(",");
//        this.addOptions.data.vf_ve_Type=this.parentTypeId.join(",");
        this.addOptions.data.vf_ve_Content.vf_vo_AuthorID=JSON.parse(sessionStorage.getItem('admin')).sm_ui_ID +'';

        this.$store.dispatch("addVMovieCheckTable", this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: "success"
            })
            this.initData();
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
        this.initData();
        this.addDialog = false;
      },
      //删除
      Delete(id) {
        let deleteOption = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "vf_ve_ID": id,//申请广告编码
          }
        };
        this.$store.dispatch('DeleteVMovieCheckTable', deleteOption)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.movieType,this.num);
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            })
      },
      //修改
      Update(obj) {
        this.VMovieCheckTableUpdateObj=obj,
        this.VMovieCheckTableUpdateObj.data.vf_ve_ID = obj.vf_ve_ID; //审核编码

        // /*电影类型筛选(-start-)*/
        // this.updateFilmType=[];//清空电影类型
        // this.intTypeData();
        // var updateTypeList = obj.vf_ve_Type.split(",");
        // for(let item in updateTypeList){
        //   this.updateFilmType.push(Number(updateTypeList[item]));
        // };
        // /*电影类型筛选(-end-)*/
        // /*分类名称(-start-)*/
        // this.updateCategoriesName=[];//清空子分类名称
        // this.childTypeData(obj.vf_ve_Type); //调取当前行的子分类
        // var IDsList = obj.vf_ve_Content.vf_te_IDs.split(",");
        // //字符串数组转化成数字数组
        // for(let item in IDsList){
        //   this.updateCategoriesName.push(Number(IDsList[item]))//子分类显示当前行的分类名称
        // };
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_te_IDs=obj.vf_ve_Content.vf_te_IDs;//原来的子分类名称
        // /*分类名称(-end-)*/
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL=obj.vf_ve_Content.vf_vo_TomImageURL;//首页大图
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ImageURL=obj.vf_ve_Content.vf_vo_ImageURL;//视频图片
        // this.updateVideo=obj.vf_ve_Content.vf_vo_FileURL;//显示视频
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Title=obj.vf_ve_Content.vf_vo_Title;//标题
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Introduce=obj.vf_ve_Content.vf_vo_Introduce; //简介
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Remark=obj.vf_ve_Content.vf_vo_Remark;//详情
        // /*下面是未显示部分但要上传*/
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_AuthorID=obj.vf_ve_Content.vf_vo_AuthorID;//作者(不变)
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ID=obj.vf_ve_Content.vf_vo_ID//原来的视频编号(不变)
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_FileURL=obj.vf_ve_Content.vf_vo_FileURL;//原来的视频真实地址
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_CreateTime=obj.vf_ve_Content.vf_vo_CreateTime;//原来的创建视频时间
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Extend=obj.vf_ve_Content.vf_vo_Extend;//原来的视频扩展名
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Size=obj.vf_ve_Content.vf_vo_Size;//原来的视频大小
        // this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Time=obj.vf_ve_Content.vf_vo_Time;//原来的视频时长

        console.log(obj)

        this.ImageUpdateURL = obj.vf_ve_Content.vf_vo_TomImageURL.split(",");
        this.ImageUpdateURLOne = obj.vf_ve_Content.vf_vo_ImageURL.split(",");

        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //修改提交
      updateSubmit() {
        this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_te_IDs=this.updateCategoriesName.join(",");//最新子分类名称
        this.$store.dispatch("updateVMovieCheckTable", this.VMovieCheckTableUpdateObj)
          .then(
            (suc) => {
              this.$notify({
                message: suc,
                type: "success"
              });
              this.initData(this.movieType,this.num);
            }
            , (err) => {
              this.$notify({
                message: err,
                type: "error"
              })
            });
        this.updateDialog = false;
      },
    }
  }

</script>
<style scoped>

  .imgWap {

  }
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
  .imgWapOne span {
    position: absolute;
    right: -15px;
    top: -6px;
  }

  .imgWapOne em {
    position: absolute;
    right: -55px;
    top: 30px;
    font-style: normal;
    color: #42b983;
  }
</style>
