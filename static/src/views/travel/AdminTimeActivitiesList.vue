<template>
  <div>
    <div class="contentBox">
      <div style="margin: 30px 0 30px 0px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="AdminMerchantProducts">商家产品</el-breadcrumb-item>
          <el-breadcrumb-item  @click.native="toLine">产品线路</el-breadcrumb-item>
          <el-breadcrumb-item  @click.native="toDayLine">日程线路</el-breadcrumb-item>
          <el-breadcrumb-item to="AdminScheduleTime">日程时间</el-breadcrumb-item>
          <el-breadcrumb-item to="AdminTimeActivities">时间活动</el-breadcrumb-item>
          <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h1>时间活动详情</h1>
      <el-tabs v-model="activeName"  @tab-click="tab">
        <el-tab-pane label="活动用餐" name="活动用餐">
          <adminActiveFood></adminActiveFood>
        </el-tab-pane>
        <el-tab-pane label="活动景点" name="活动景点">
          <adminActivitySite></adminActivitySite>
        </el-tab-pane>
        <el-tab-pane label="活动购物" name="活动购物">
          <adminEventShopping></adminEventShopping>
        </el-tab-pane>
        <el-tab-pane label="活动住宿" name="活动住宿">
          <adminActiveHotel></adminActiveHotel>
        </el-tab-pane>
        <el-tab-pane label="活动温馨提示" name="活动温馨提示">
          <adminActiveReminder></adminActiveReminder>
        </el-tab-pane>
        <el-tab-pane label="活动交通" name="活动交通">
          <adminActiveTraffic></adminActiveTraffic>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import AdminActiveFood from './AdminActiveFood'
  import AdminLinePrepare from './AdminLinePrepare'
  import AdminActiveHotel from './AdminActiveHotel'
  import AdminActiveReminder from './AdminActiveReminder'
  import AdminActivitySite from './AdminActivitySite'
  import AdminEventShopping from './AdminEventShopping'
  import AdminActiveTraffic from './AdminActiveTraffic'

  export default {
    components: {
      AdminActiveFood,
      AdminLinePrepare,
      AdminActiveHotel,
      AdminActiveReminder,
      AdminActivitySite,
      AdminEventShopping,
      AdminActiveTraffic
    },
    name: '',

    computed: mapGetters([
      'adminProductLineManagementId'
    ]),
    data() {
      return {
        activeName: '活动用餐',
        name:'活动用餐',
      }
    },
    methods: {
      tab(){
        this.name = this.activeName
      },
    },
  }
</script>
<style scoped>
  .contentBox {
    padding: 20px;
  }

  .contentBox > h1 {
    font: bold 20px/2 '微软雅黑';
    margin-bottom: 20px;
  }
</style>
