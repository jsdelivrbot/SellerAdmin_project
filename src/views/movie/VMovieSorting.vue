<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">分类</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" size="small">
          <el-form-item>
            <span>分类名称:</span>
            <el-input type="text" v-model="typeName" auto-complete="off" placeholder="分类名称"  style="width: 250px"></el-input>
          </el-form-item>
                   <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="VMovieTypeList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="分类编号"
          prop="vf_te_ID">
        </el-table-column>
        <el-table-column
          label="分类名称"
          prop="vf_te_Name">
        </el-table-column>
        <el-table-column
          label="分类编号父名称"
          prop="vf_te_ParentName">
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

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {

    data() {
      return {
        typeName:'',
        //是否禁用
        isDisabled: true,
        //修改
        updateDialog: false,
        ImageURL: '',
        ImageURL1: [],
        //数据展示
        isLoading: false,
        //分页
        total: 0,
        //查询
        movieType: '',
        //表单宽度
        formLabelWidth: '120px',
        VMovieCheckTableUpdateObj: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_ve_ID": "",//审核表编码
            "vf_ve_Type": "",//视频类型
            "vf_ve_Content": {
              "vf_vo_Time": "",
              "vf_vo_Size": "",
              "vf_vo_Extend": "",
              "vf_vo_FileURL": "",
              "vf_vo_AuthorID": "",
              "vf_vo_Type": "",
              "vf_vo_Title": "",
              "vf_vo_ImageURL": "",
              "vf_vo_CreateTime": "",
              "vf_vo_Introduce": "",
              "vf_vo_Remark": "",
            },
          }
        },
      }
    },
    computed: mapGetters([
      'VMovieTypeList',
    ]),

    created() {
      this.initData();
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      initData(page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": "",//分类名称
          "vf_te_ParentID": "",//分类编号父编号
          "page": page?page:1,//页码
          "rows": 5 //条数
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
      search() {
        this.initData();
//        this.initData('',this.typeName,'','');
      },
    }
  }

</script>
<style scoped>
</style>
