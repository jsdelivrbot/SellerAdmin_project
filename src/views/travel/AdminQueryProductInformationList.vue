<template>
  <div>
    <div class="contentBox">
      <h1>当前线路:{{LineName}}</h1>
      <el-tabs v-model="activeName" @tab-click="tab" >
        <el-tab-pane label="预订须知" name="预订须知">
          <adminBookingInstructions :id="id"></adminBookingInstructions>
        </el-tab-pane>
        <el-tab-pane label="费用说明" name="费用说明">
          <adminCostDescription :id="id"></adminCostDescription>
        </el-tab-pane>
        <el-tab-pane label="产品线路出发城市" name="产品线路出发城市">
          <adminRouteDepartureCity :id="id"></adminRouteDepartureCity>
        </el-tab-pane>
        <el-tab-pane label="产品线路价格" name="产品线路价格">
          <adminLinePrice :id="id"></adminLinePrice>
        </el-tab-pane>
        <el-tab-pane label="线路日程" name="线路日程">
          <adminLinePrepare :id="id"></adminLinePrepare>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import AdminLinePrepare from './AdminLinePrepare'
  //产品线路价格
  import AdminLinePrice from './AdminLinePrice'
  import AdminRouteDepartureCity from './AdminRouteDepartureCity'
  import AdminBookingInstructions from './AdminBookingInstructions'//预订须知
  import AdminCostDescription from './AdminCostDescription'//费用说明

  export default {
    components: {
      AdminLinePrepare,
      AdminLinePrice,
      AdminRouteDepartureCity,
      AdminCostDescription,
      AdminBookingInstructions
    },
    name: '',
    computed: mapGetters([
      'adminProductLineManagementId',
    ]),
    data() {
      return {
        LineName:'',
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
        activeName: '预订须知',
        id:''
      }
    },
    created(){
      this.id = this.$route.params.id

      // sessionStorage.setItem('index',2)
      // sessionStorage.getItem(index)
      let name = sessionStorage.getItem('AdminQueryProductInformationListName')
      if (name) {
        this.activeName = name;
      }
    },
    methods: {
      toLine(){
        this.$router.push({path: '/travel/AdminQueryProductInformation',query:{lineID:this.adminProductLineManagementId}})
        //this.$router.push({name:'AdminQueryProductInformation',query:{lineID:this.adminProductLineManagementId}})
      },
      tab(){
        this.name = this.activeName
        sessionStorage.setItem('AdminQueryProductInformationListName',this.activeName)
      },
      initData() {
      },
      search() {
        this.initData()
      }
    },
    mounted(){
      this.LineName = JSON.parse(sessionStorage.getItem('lineObj')).ts_pt_Name
    }
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
