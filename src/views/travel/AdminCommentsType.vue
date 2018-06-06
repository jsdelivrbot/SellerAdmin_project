<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">评论类型</h1>
    <!--查询-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>评论类型筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="commentsName" auto-complete="off" placeholder="请输入评论类型名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="addAdminCommentsType">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="adminCommentsTypeList"
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        prop="ts_ct_ID"
        align="center"
        label="类型编号"
      >
      </el-table-column>
      <el-table-column
        prop="ts_ct_Type"
        align="center"
        label="类型名称"
      >
      </el-table-column>
      <el-table-column
        prop="ts_ct_Score"
        align="center"
        label="分数"
      >
      </el-table-column>
      <el-table-column
        prop="ts_ct_CommentID"
        align="center"
        label="评论编码"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="内容"
      >
        <template slot-scope="scope">
          <el-popover
            ref="popover1"
            placement="top-start"
            width="200"
            trigger="hover"
            :content="scope.row.ts_ct_Content">
          </el-popover>
          <el-button v-popover:popover1>移入查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
      >
        <template slot-scope="scope">
          <el-popover
            ref="popover1"
            placement="top-start"
            width="200"
            trigger="hover"
            :content="scope.row.ts_ct_Remark">
          </el-popover>
          <el-button v-popover:popover1>移入查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateAdminSystemMenu(scope.row.sm_si_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdminSystemMenu(scope.row.sm_si_ID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        commentsName:'',
        isLoading:false,
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px',
      }
    },
    computed: mapGetters([
      'adminCommentsTypeList'
    ]),
    methods: {
      initData(name){
        if(!name){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "commentID": ''
          };
          this.$store.dispatch('initAdminCommentsType',options)
        }
      },
      //查询
      search(){
        this.initData(this.commentsName)
      },
      //添加
      addAdminCommentsType(){

      }
    },
  }
</script>
<style scoped>

</style>
