<template>
  <div>
    <!--<div>-->
      <!--<p style="font-weight: bold;font-size: 20px;margin-bottom: 20px">添加流程:</p>-->
      <!--<el-tree :data="data" :props="defaultProps" :default-expand-all="isOff"></el-tree>-->
    <!--</div>-->
    <div class="contentBox">
      <!--<div style="margin: 30px 0 30px 0px">-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item to="AdminMerchantProducts">商家产品</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item  @click.native="toLine" style="cursor: pointer;color: #000;font-weight: bold;">产品线路</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>{{name}}</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</div>-->
      <h1>产品线路管理</h1>
      <el-tabs v-model="activeName" @tab-click="tab">
        <el-tab-pane label="产品线路出发城市" name="产品线路出发城市">
          <adminRouteDepartureCity></adminRouteDepartureCity>
        </el-tab-pane>
        <el-tab-pane label="产品线路价格" name="产品线路价格">
          <adminLinePrice></adminLinePrice>
        </el-tab-pane>
        <!--<el-tab-pane label="产品线路特色" name="产品线路特色">-->
          <!--<adminProductFeatures></adminProductFeatures>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="线路日程" name="线路日程">
          <adminLinePrepare></adminLinePrepare>
        </el-tab-pane>
        <!--<el-tab-pane label="费用说明" name="费用说明">-->
          <!--<adminCostsOf></adminCostsOf>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import AdminProductFeatures from './AdminProductFeatures'
  import AdminLinePrepare from './AdminLinePrepare'
  import AdminCostsOf from './AdminCostsOf'
  //产品线路价格
  import AdminLinePrice from './AdminLinePrice'
  import AdminRouteDepartureCity from './AdminRouteDepartureCity'

  export default {
    components: {
      AdminProductFeatures,
      AdminLinePrepare,
      AdminCostsOf,
      AdminLinePrice,
      AdminRouteDepartureCity
    },
    name: '',
    computed: mapGetters([
      'adminProductLineManagementId',
    ]),
    data() {
      return {
        data: [{
          label: '商家产品',
          children: [{
            label: '产品线路',
            children: [
              {
                label: '产品线路出发城市'
              },
              {
                label: '产品线路价格'
              },
              {
                label: '产品线路特色'
              },
              {
                label: '产品线路日程',
                children:[
                  {
                    label: '日程时间',
                    children:[
                      {
                        label: '时间活动',
                        children:[
                          {
                            label:'活动用餐'
                          },
                          {
                            label:'活动景点'
                          },
                          {
                            label:'活动购物'
                          },
                          {
                            label:'活动住宿'
                          },
                          {
                            label:'活动温馨提示'
                          },
                          {
                            label:'活动交通'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                label: '产品线路费用说明'
              }
            ]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isOff:true,
        name:'产品线路城市',
        activeName: '产品线路出发城市'
      }
    },
    created(){
      let name = this.$route.query.name;
      if (name) {
        this.activeName = name;
      }
    },
    methods: {
      toLine(){
        this.$router.push({name:'AdminQueryProductInformation',query:{lineID:this.adminProductLineManagementId}})
      },
      tab(){
        this.name = this.activeName
      },
      initData() {
      },
      search() {
        this.initData()
      }
    },
  }
</script>
<style scoped>
  .contentBox {
    padding: 20px;
  }
  .contentBox>h1 {
    font: bold 20px/2 '微软雅黑';
    margin-bottom: 20px;
  }
</style>
