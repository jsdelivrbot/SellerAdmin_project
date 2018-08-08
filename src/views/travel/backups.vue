<template>
  <div>



<!--添加-->
    <!--<el-form-item label="产品推荐理由:" :label-width="formLabelWidth" required>-->
    <!--<el-button type="primary" size="small" @click="RecommendedReason">添加推荐理由</el-button>-->
    <!--<div v-show="buyReason.length" v-for="item,index in buyReason">-->
    <!--<span style="margin: 10px 20px 10px 0">推荐理由{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateBuyReason(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteBuyReason(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品介绍:" :label-width="formLabelWidth" required>-->
    <!--<el-button type="primary" size="small" @click="addGoodIntroduce">添加产品介绍</el-button>-->
    <!--<div v-show="goodIntroduce.length" v-for="item,index in goodIntroduce">-->
    <!--<span style="margin: 10px 20px 10px 0">产品介绍{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateGoodIntroduce(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteGoodIntroduce(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品费用包含:" :label-width="formLabelWidth" required>-->
    <!--<el-button type="primary" size="small" @click="addFeeInfoList">添加费用包含</el-button>-->
    <!--<div v-show="feeInfoList.length" v-for="item,index in feeInfoList">-->
    <!--<span style="margin: 10px 20px 10px 0">费用包含{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateFeeInfoList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteFeeInfoList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品费用不包含:" label-width="140px" required>-->
    <!--<el-button type="primary" size="small" @click="addFeeNotInList">添加费用不包含</el-button>-->
    <!--<div v-show="feeNotInList.length" v-for="item,index in feeNotInList">-->
    <!--<span style="margin: 10px 20px 10px 0">费用不包含{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateFeeNotInList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteFeeNotInList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品预订须知:" :label-width="formLabelWidth" required>-->
    <!--<el-button type="primary" size="small" @click="addBookList">添加预订须知</el-button>-->
    <!--<div v-show="bookList.length" v-for="item,index in bookList">-->
    <!--<span style="margin: 10px 20px 10px 0">预订须知{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateBookList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteBookList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品退改政策:" :label-width="formLabelWidth" required>-->
    <!--<el-button type="primary" size="small" @click="addBackRuleList">添加退改政策</el-button>-->
    <!--<div v-show="backRuleList.length" v-for="item,index in backRuleList">-->
    <!--<span style="margin: 10px 20px 10px 0">退改政策{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateBackRuleList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteBackRuleList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->


    <!--<el-form-item label="成团地点:" :label-width="formLabelWidth" required>-->
    <!--<el-select v-model="addData.ts_tg_GroupSite" placeholder="请选择省份" @change="changeProvice">-->
    <!--<el-option-->
    <!--v-for="item in proviceList"-->
    <!--:key="item.sm_af_AreaName"-->
    <!--:label="item.sm_af_AreaName"-->
    <!--:value="item.sm_af_AreaID">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->

    <!--修改-->
    <!--<el-form-item label="产品推荐理由:" :label-width="formLabelWidth">-->
    <!--<el-button type="primary" size="small" @click="RecommendedReason">添加推荐理由</el-button>-->
    <!--<div v-show="updateAdminMerchantProductsObj.buyReason.length"-->
    <!--v-for="item,index in updateAdminMerchantProductsObj.buyReason">-->
    <!--<span style="margin: 10px 20px 10px 0">推荐理由{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateBuyReason(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteBuyReason(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="产品介绍:" :label-width="formLabelWidth">-->
    <!--<el-button type="primary" size="small" @click="addGoodIntroduce">添加产品介绍</el-button>-->
    <!--<div v-show="updateAdminMerchantProductsObj.goodIntroduce.length"-->
    <!--v-for="item,index in updateAdminMerchantProductsObj.goodIntroduce">-->
    <!--<span style="margin: 10px 20px 10px 0">产品介绍{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateGoodIntroduce(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteGoodIntroduce(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="产品费用包含:" :label-width="formLabelWidth">-->
    <!--<el-button type="primary" size="small" @click="addFeeInfoList">添加费用包含</el-button>-->
    <!--<div v-show="updateAdminMerchantProductsObj.feeIn.length"-->
    <!--v-for="item,index in updateAdminMerchantProductsObj.feeIn">-->
    <!--<span style="margin: 10px 20px 10px 0">费用包含{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateFeeInfoList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteFeeInfoList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品费用不包含:" :label-width="formLabelWidth">-->
    <!--<el-button type="primary" size="small" @click="addFeeNotInList">添加费用不包含</el-button>-->
    <!--<div v-show="updateAdminMerchantProductsObj.feeNotIn.length"-->
    <!--v-for="item,index in updateAdminMerchantProductsObj.feeNotIn">-->
    <!--<span style="margin: 10px 20px 10px 0">费用不包含{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateFeeNotInList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteFeeNotInList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品预订须知:" :label-width="formLabelWidth">-->
    <!--<el-button type="primary" size="small" @click="addBookList">添加预订须知</el-button>-->
    <!--<div v-show="updateAdminMerchantProductsObj.bookKnow.length"-->
    <!--v-for="item,index in updateAdminMerchantProductsObj.bookKnow">-->
    <!--<span style="margin: 10px 20px 10px 0">预订须知{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateBookList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteBookList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品退改政策:" :label-width="formLabelWidth">-->
    <!--<el-button type="primary" size="small" @click="addBackRuleList">添加退改政策</el-button>-->
    <!--<div v-show="updateAdminMerchantProductsObj.backRule.length"-->
    <!--v-for="item,index in updateAdminMerchantProductsObj.backRule">-->
    <!--<span style="margin: 10px 20px 10px 0">退改政策{{index+1}} : {{item.ts_gi_Name}}</span>-->
    <!--<el-button type="success" size="small" @click="updateBackRuleList(item,index)">修改</el-button>-->
    <!--<el-button type="danger" size="small" @click="deleteBackRuleList(item,index)">删除</el-button>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="产品标题:" :label-width="formLabelWidth">-->
    <!--<el-input v-model="updateAdminMerchantProductsObj.ta_tg_Title" placeholder="请输入产品标题"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="所属国家:" :label-width="formLabelWidth">-->
    <!--<el-input v-model="updateAdminMerchantProductsObj.ts_tg_Country" placeholder="所属国家"></el-input>-->
    <!--</el-form-item>-->



    <!--推荐理由弹窗-->
    <el-dialog title="添加推荐理由" :visible.sync="addBuyReasonDialog">
      <el-form>
        <el-form-item label="推荐理由:" :label-width="formLabelWidth">
          <el-input v-model="recommendedReasonContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBuyReasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBuyReasonSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改推荐理由" :visible.sync="updateBuyReasonDialog">
      <el-form :model="updateBuyReasonObj">
        <el-form-item label="推荐理由:" :label-width="formLabelWidth">
          <el-input v-model="updateBuyReasonObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBuyReasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateBuyReasonSubmit(updateBuyReasonObj)">确 定</el-button>
      </div>
    </el-dialog>


    <!--产品介绍弹窗-->
    <el-dialog title="添加产品介绍" :visible.sync="addGoodIntroduceDialog">
      <el-form>
        <el-form-item label="产品介绍:" :label-width="formLabelWidth">
          <el-input v-model="goodIntroduceContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoodIntroduceDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGoodIntroduceSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改产品介绍" :visible.sync="updateGoodIntroduceDialog">
      <el-form :model="updateGoodIntroduceContentObj">
        <el-form-item label="产品介绍:" :label-width="formLabelWidth">
          <el-input v-model="updateGoodIntroduceContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateGoodIntroduceDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateGoodIntroduceSubmit(updateGoodIntroduceContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--费用包含弹窗-->
    <el-dialog title="添加费用包含" :visible.sync="addFeeInfoListDialog">
      <el-form>
        <el-form-item label="费用包含:" :label-width="formLabelWidth">
          <el-input v-model="feeInfoListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeInfoListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFeeInfoListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改费用包含" :visible.sync="updateFeeInfoListDialog">
      <el-form :model="updateFeeInfoListContentObj">
        <el-form-item label="费用包含:" :label-width="formLabelWidth">
          <el-input v-model="updateFeeInfoListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFeeInfoListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateFeeInfoListSubmit(updateFeeInfoListContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--费用不包含弹窗-->
    <el-dialog title="添加费用不包含" :visible.sync="addFeeInNotListDialog">
      <el-form>
        <el-form-item label="费用不包含:" :label-width="formLabelWidth">
          <el-input v-model="feeNotInListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeInNotListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFeeInNotListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改费用不包含" :visible.sync="updateFeeInNotListDialog">
      <el-form :model="updateFeeNotInListContentObj">
        <el-form-item label="费用不包含:" :label-width="formLabelWidth">
          <el-input v-model="updateFeeNotInListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFeeInNotListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateFeeInNotListSubmit(updateFeeNotInListContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--预订须知弹窗-->
    <el-dialog title="添加预订须知" :visible.sync="addBookListDialog">
      <el-form>
        <el-form-item label="预订须知:" :label-width="formLabelWidth">
          <el-input v-model="bookListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBookListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBookListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改预订须知" :visible.sync="updateBookListDialog">
      <el-form :model="updateBookListContentObj">
        <el-form-item label="预订须知:" :label-width="formLabelWidth">
          <el-input v-model="updateBookListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBookListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateBookListSubmit(updateBookListContentObj)">确 定</el-button>
      </div>
    </el-dialog>

    <!--退改政策弹窗-->
    <el-dialog title="添加退改政策" :visible.sync="addBackRuleListDialog">
      <el-form>
        <el-form-item label="退改政策:" :label-width="formLabelWidth">
          <el-input v-model="backRuleListContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBackRuleListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBackRuleListSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改退改政策" :visible.sync="updateBackRuleListDialog">
      <el-form :model="updateBackRuleListContentObj">
        <el-form-item label="退改政策:" :label-width="formLabelWidth">
          <el-input v-model="updateBackRuleListContentObj.ts_gi_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBackRuleListDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateBackRuleListSubmit(updateBackRuleListContentObj)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {}
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {
      //添加退改政策
      addBackRuleList(){
        this.backRuleListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addBackRuleListDialog = true;
      },
      //添加退改政策提交
      addBackRuleListSubmit(){
        if (this.updateAdminMerchantProductsObj.backRule) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "6",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.backRuleListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 6)
            .then(data => {
              this.updateAdminMerchantProductsObj.backRule = data
            })
          }, err => {

          })
        } else {
          this.backRuleList.push({
            ts_gi_Name: this.backRuleListContent
          });
        }
        this.addBackRuleListDialog = false;
      },
      //修改退改政策
      updateBackRuleList(item, index){
        item.index = index;
        this.updateBackRuleListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateBackRuleListDialog = true;
      },
      //修改退改政策提交
      updateBackRuleListSubmit(item){
        if (this.updateAdminMerchantProductsObj.backRule) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateBackRuleListDialog = false;
          }, err => {

          })
        } else {
          this.updateBackRuleListDialog = false;
        }
      },
      //删除退改政策
      deleteBackRuleList(item, index){
        if (this.updateAdminMerchantProductsObj.backRule) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 6)
            .then(data => {
              this.updateAdminMerchantProductsObj.backRule = data
            })
          }, err => {

          })
        } else {
          this.backRuleList = this.backRuleList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },


      //添加预订须知多个须知
      addBookList(){
        this.bookListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addBookListDialog = true;
      },
      //添加预订须知提交
      addBookListSubmit(){
        if (this.updateAdminMerchantProductsObj.bookKnow) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "5",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.bookListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 5)
            .then(data => {
              this.updateAdminMerchantProductsObj.bookKnow = data
            })
          }, err => {

          })
        } else {
          this.bookList.push({
            ts_gi_Name: this.bookListContent
          });
        }
        this.addBookListDialog = false;
      },
      //修改预订须知
      updateBookList(item, index){
        item.index = index;
        this.updateBookListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateBookListDialog = true;
      },
      //修改预订须知提交
      updateBookListSubmit(item){
        if (this.updateAdminMerchantProductsObj.bookKnow) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateBookListDialog = false;
          }, err => {

          })
        } else {
          this.updateBookListDialog = false;
        }
      },
      //删除预订须知
      deleteBookList(item, index){
        if (this.updateAdminMerchantProductsObj.bookKnow) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 5)
            .then(data => {
              this.updateAdminMerchantProductsObj.bookKnow = data
            })
          }, err => {

          })
        }
        else {
          this.bookList = this.bookList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },


      //添加费用不包含多个费用
      addFeeNotInList(){
        this.feeNotInListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addFeeInNotListDialog = true;
      },
      //添加费用不包含提交
      addFeeInNotListSubmit(){

        if (this.updateAdminMerchantProductsObj.feeNotIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "4",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.feeNotInListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 4)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeNotIn = data
            })
          }, err => {

          })
        } else {
          this.feeNotInList.push({
            ts_gi_Name: this.feeNotInListContent
          });
        }
        this.addFeeInNotListDialog = false;
      },
      //修改费用不包含
      updateFeeNotInList(item, index){
        item.index = index;
        this.updateFeeNotInListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateFeeInNotListDialog = true;
      },
      //修改费用不包含提交
      updateFeeInNotListSubmit(item){
        if (this.updateAdminMerchantProductsObj.feeNotIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateFeeInNotListDialog = false;
          }, err => {

          })
        } else {
          this.updateFeeInNotListDialog = false;
        }
      },
      //删除费用不包含
      deleteFeeNotInList(item, index){
        if (this.updateAdminMerchantProductsObj.feeNotIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 4)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeNotIn = data
            })
          }, err => {

          })
        } else {
          this.feeNotInList = this.feeNotInList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },


      //添加费用包含多个费用
      addFeeInfoList(){
        this.feeInfoListContent = '';
        this.$store.commit('setTranstionFalse');
        this.addFeeInfoListDialog = true;
      },
      //添加费用包含提交
      addFeeInfoListSubmit(){
        if (this.updateAdminMerchantProductsObj.feeIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "3",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.feeInfoListContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 3)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeIn = data
            })
          }, err => {

          })
        } else {
          this.feeInfoList.push({
            ts_gi_Name: this.feeInfoListContent
          });
        }
        this.addFeeInfoListDialog = false;
      },
      //修改费用包含
      updateFeeInfoList(item, index){
        item.index = index;
        this.updateFeeInfoListContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateFeeInfoListDialog = true;
      },
      //修改费用包含提交
      updateFeeInfoListSubmit(item){
        if (this.updateAdminMerchantProductsObj.feeIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateFeeInfoListDialog = false;
          }, err => {

          })
        } else {
          this.updateFeeInfoListDialog = false;
        }

      },
      //删除费用包含
      deleteFeeInfoList(item, index){
        if (this.updateAdminMerchantProductsObj.feeIn) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 3)
            .then(data => {
              this.updateAdminMerchantProductsObj.feeIn = data
            })
          }, err => {

          })
        } else {
          this.feeInfoList = this.feeInfoList.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },

      //添加产品多个介绍
      addGoodIntroduce(){
        this.goodIntroduceContent = '';
        this.$store.commit('setTranstionFalse');
        this.addGoodIntroduceDialog = true;
      },
      //添加产品介绍提交
      addGoodIntroduceSubmit(){
        if (this.updateAdminMerchantProductsObj.goodIntroduce) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "2",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.goodIntroduceContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 2)
            .then(data => {
              this.updateAdminMerchantProductsObj.goodIntroduce = data
            })
          }, err => {

          })
        } else {
          this.goodIntroduce.push({
            ts_gi_Name: this.goodIntroduceContent
          });
        }
        this.addGoodIntroduceDialog = false;
      },
      //修改产品介绍
      updateGoodIntroduce(item, index){
        item.index = index;
        this.updateGoodIntroduceContentObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateGoodIntroduceDialog = true;
      },
      //修改产品介绍提交
      updateGoodIntroduceSubmit(item){
        if (this.updateAdminMerchantProductsObj.goodIntroduce) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateGoodIntroduceDialog = false;
          }, err => {

          })
        } else {
          this.updateGoodIntroduceDialog = false;
        }

      },
      //删除产品介绍
      deleteGoodIntroduce(item, index){
        if (this.updateAdminMerchantProductsObj.goodIntroduce) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 2)
            .then(data => {
              this.updateAdminMerchantProductsObj.goodIntroduce = data
            })
          }, err => {

          })
        } else {
          this.goodIntroduce = this.goodIntroduce.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }
      },

      //添加推荐理由
      RecommendedReason(){
        this.recommendedReasonContent = '';
        this.$store.commit('setTranstionFalse');
        this.addBuyReasonDialog = true;
      },
      //添加推荐理由提交
      addBuyReasonSubmit(){
        if (this.updateAdminMerchantProductsObj.buyReason) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_GoodID": this.updateAdminMerchantProductsObj.ta_tg_ID,//产品编号
              "ts_gi_ParentID": "1",//父编码 1.推荐理由 2.产品介绍  3.费用包含 4.费用不包含 5.预定须知 6.退订政策 7活动内容 8活动图片
              "ts_gi_Name": this.recommendedReasonContent,//类型名称
            }
          };
          this.$store.dispatch('AddRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 1)
            .then(data => {
              this.updateAdminMerchantProductsObj.buyReason = data
            })
          }, err => {

          })
        } else {
          this.buyReason.push({
            ts_gi_Name: this.recommendedReasonContent
          });
        }

        this.addBuyReasonDialog = false;
      },
      //修改推荐理由
      updateBuyReason(item, index){
        item.index = index;
        this.updateBuyReasonObj = item;
        this.$store.commit('setTranstionFalse');
        this.updateBuyReasonDialog = true;
      },
      //修改推荐理由提交
      updateBuyReasonSubmit(item){
        if (this.updateAdminMerchantProductsObj.buyReason) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": item
          };
          this.$store.dispatch('UpdateRecommendedReason', options)
          .then(() => {
            this.updateBuyReasonDialog = false;
          }, err => {

          })
        } else {
          this.updateBuyReasonDialog = false;
        }
      },
      //删除推荐理由
      deleteBuyReason(item, index){
        if (this.updateAdminMerchantProductsObj.buyReason) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "data": {
              "ts_gi_ID": item.ts_gi_ID,//产品信息ID
            }
          }
          this.$store.dispatch('DeleteRecommendedReason', options)
          .then(() => {
            this.selectInitData(this.updateAdminMerchantProductsObj.ta_tg_ID, 1)
            .then(data => {
              this.updateAdminMerchantProductsObj.buyReason = data
            })
          }, err => {

          })
        } else {
          this.buyReason = this.buyReason.filter((item, v) => {
            if (index == v) {
              return false;
            }
            return true;
          })
        }


      },
    },
  }
</script>
<style scoped>

</style>
