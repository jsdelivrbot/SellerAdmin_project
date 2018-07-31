<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">跟团游栏目信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>栏目名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="tourName" auto-complete="off" placeholder="栏目名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="addAdminGroupTour">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="groupTourList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="栏目编码"
          align="center"
          prop="ii_ID">
        </el-table-column>
        <el-table-column
          label="栏目名称"
          align="center"
          prop="ii_ItemName">
        </el-table-column>
        <el-table-column
          label="备注"
          align="center">
          <template slot-scope="scope">
            <el-popover
              ref="popover1"
              placement="top-start"
              width="200"
              trigger="hover"
              :content="scope.row.ii_Remark">
            </el-popover>
            <el-button v-popover:popover1 size="small">移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminGroupTour(scope.row.ii_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminGroupTour(scope.row.ii_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--添加跟团游栏目-->
    <el-dialog title="添加跟团游栏目" :visible.sync="addAdminGroupTourDialog">
      <el-form :model="addOptions">
        <el-form-item label="栏目名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ii_ItemName" placeholder="请输入栏目名称"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ii_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminGroupTourDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdminGroupTourSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!--修改跟团游栏目-->
    <el-dialog title="修改跟团游栏目" :visible.sync="updateAdminGroupTourDialog">
      <el-form :model="updateAdminGroupTourObj">
        <el-form-item label="栏目名称:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminGroupTourObj.ii_ItemName" placeholder="请输入栏目名称"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminGroupTourObj.ii_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminGroupTourDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminGroupTourSubmit(updateAdminGroupTourObj.ii_ID)">确 定</el-button>
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
        formLabelWidth:'120px',
        isLoading:false,
        addAdminGroupTourDialog:false,
        updateAdminGroupTourDialog:false,
        tourName:'',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ii_ItemName": "",
            "ii_Remark": ""
          }
        }
      }
    },
    computed: mapGetters([
      'groupTourList',
      'updateAdminGroupTourObj'
    ]),
    methods: {
      initData(name){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          isDelete:'0',
          groupName:name?name:''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminGroupTour',options)
          .then(()=>{
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        this.initData(this.tourName.trim());
      },
      //添加
      addAdminGroupTour(){
        this.$store.commit('setTranstionFalse');
        this.addAdminGroupTourDialog = true;
      },
      //添加提交
      addAdminGroupTourSubmit(){
        this.$store.dispatch('AddAdminGroupTour',this.addOptions)
          .then(() => {
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
            this.initData(this.tourName.trim())
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addAdminGroupTourDialog = false;
      },
      //修改
      updateAdminGroupTour(id){
        this.$store.commit('setTranstionFalse');
        this.updateAdminGroupTourDialog = true;
        this.$store.commit('initUpdateAdminGroupTourObj',id)
      },
      //修改提交
      updateAdminGroupTourSubmit(id){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ii_ID": id,
            "ii_ItemName": this.updateAdminGroupTourObj.ii_ItemName,
            "ii_Remark": this.updateAdminGroupTourObj.ii_Remark,
          }
        };
        this.$store.dispatch('UpdateAdminGroupTour',updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.tourName.trim())
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateAdminGroupTourDialog = false;
      },
      //删除
      deleteAdminGroupTour(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminGroupTour',deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData(this.tourName.trim())
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
