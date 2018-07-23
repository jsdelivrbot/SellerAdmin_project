<template>
  <uploader :options="options" :file-status-text="statusText" class="uploader-example" ref="uploader"
            @file-success="fileSuccess">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>上传文件</p>
      <uploader-btn :attrs="attrs">点击上传</uploader-btn>
      <uploader-btn :attrs="attrs" v-show="attrs.accept== 'image/*'">选中替换</uploader-btn>
      <!--<uploader-btn :attrs="attrs">select images</uploader-btn>-->
      <!--<uploader-btn :directory="true">select folder</uploader-btn>-->
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'

  export default {
    name: '',
    props: ['attrs'],
    data() {
      return {
        options: {
          // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
          target: getNewStr + '/OSSFile/PostToOSS',
          fileParameterName: 'fileToUpload',
          testChunks: false
        },
//        categoryMap:{image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],},
//        attrs: {
//          accept: 'video/*'
//        },
        statusText: {
          success: '上传成功',
          error: '上传出错',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        }
      }
    },
//    created(){
//      this.options.categoryMap = this.categoryMap
//    },
    computed: {},
    methods: {
      //上传成功的事件
      fileSuccess (rootFile, file, message, chunk) {
        var obj = JSON.parse(message)
        this.$emit('getData',obj);
      },
    },
    mounted() {
      // 获取uploader对象
      this.$nextTick(() => {
        window.uploader = this.$refs.uploader.uploader
      })
    }
  }
</script>
<style scoped>
  .uploader-example {
    /*width: 580px;*/
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
