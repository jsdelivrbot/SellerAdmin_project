<template>
  <div id="wrap">
    <!--<div class="wrapper">-->
      <!--&lt;!&ndash;<ul class="functionTypeList clearfix" id="functionTypeList" v-model="activeName">&ndash;&gt;-->
        <!--&lt;!&ndash;<li v-for="item,index in functionTypeList" :name="item.value" :class="{active:index==n}">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<router-link :to="'/home/adminAllFunction2/'+ item.link">{{item.name}}</router-link>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<a href="javascript:;">{{item.name}}</a>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
      <!--&lt;!&ndash;</ul>&ndash;&gt;-->
    <!--</div>-->
    <div v-loading="isLoading">
      <router-view name="Content"></router-view>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([
      'adminMerchantProductsId'
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
        n:0,
        functionTypeList: [
//          {
//            name: '商家信息管理',
//            value: '0',
//            link: 'adminBusinessInformation'
//          },
          {
            name: '商家产品管理',
            value: '1',
            link: 'adminMerchantProducts'
          },
          {
            name: '产品线路管理',
            value: '2',
            link: 'adminQueryProductInformation'
          },
          {
            name: '产品详情管理',
            value: '3',
            link: 'adminQueryProductInformationList'
          },
//          {
//            name: '产品特色管理',
//            value: '3',
//            link: 'adminProductFeatures'
//          },
//          {
//            name: '线路日程管理',
//            value: '4',
//            link: 'adminLinePrepare'
//          },
          {
            name: '日程时间管理',
            value: '4',
            link: 'adminScheduleTime'
          },
          {
            name: '时间活动管理',
            value: '5',
            link: 'adminTimeActivities'
          },
          {
            name: '时间活动详情管理',
            value: '6',
            link: 'adminTimeActivitiesList'
          },
        ],
        isLoading: false,
        activeName:0,
      }
    },
    methods: {
      clickChageType(index) {
        this.activeName = index;
        this.isLoading = true;
        var lis = document.getElementById('functionTypeList').children;
        for (var i = 0; i < lis.length; i++) {
          lis[i].className = '';
        }
        lis[index].className = 'active'
        sessionStorage.setItem('index', index)
        this.isLoading = false;
      },
    },
    updated(){
      let num = sessionStorage.getItem('index');
      let ulEle= document.getElementById('functionTypeList')
      if(ulEle){
        var lis = ulEle.children;
        for (var i = 0; i < lis.length; i++) {
          lis[i].className = '';
        }
        lis[num].className = 'active';
      }
    },
    mounted() {
      let aIndex = sessionStorage.getItem('index');
      if(Number(aIndex)<=0){
        sessionStorage.setItem('index',0);
        this.n = 0
      }else{
        this.n = aIndex
      }
      var _this = this;
      if (window.history && window.history.pushState) {

        $(window).on('popstate', function () {
          let index = sessionStorage.getItem('index');
          index--;
          let newIndex = (Number(index))>0?(Number(index)):0;
          sessionStorage.setItem('index',newIndex)
          _this.n = newIndex;
//          window.location.reload()
        });
      }
//      let num = sessionStorage.getItem('index')
//      var lis = document.getElementById('functionTypeList').children;
//      lis[num].className = 'active';
//      let scroll = new BScroll('.wrapper',{
//        scrollX: true,
//        click: true
//      })
    },
  }
</script>
<style scoped>
  .wrapper{
    height: 44px;
    overflow: hidden;
  }
  ul{
    width: 100000px;
  }
  .functionTypeList {
    font: 14px/3 "微软雅黑";
    border: 1px solid #ccc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .functionTypeList li {
    background-color: #fff;
    float: left;
    padding: 0 15px;
    border: 1px solid #ccc;
    margin: -1px 0 -1px -1px;
  }

  .functionTypeList .active {
    border-bottom: 1px solid #fff;
  }

  .functionTypeList .active a {
    color: #409EFF;
  }

  .functionTypeList li a {
    color: #000;
    display: block;
  }
</style>
