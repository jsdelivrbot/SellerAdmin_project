<template>
  <div>
    <textarea id="mytextarea">Hello, World!</textarea>
    <el-button type="primary" @click="getContent">获取内容</el-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {}
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {
      getContent(){
        console.log(tinymce.activeEditor.getContent())

      }
    },
    mounted(){
      tinymce.init({
        selector: '#mytextarea',
        language_url: '/static/langs/zh_CN.js',
        language: 'zh_CN',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        images_upload_handler: function (blobInfo, success, failure) {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', getNewStr + '/OSSFile/PostToOSS');
          xhr.onload = function() {
            var json;

            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.data != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            success(json.data);
          };
          formData = new FormData();
          formData.append('fileToUpload', blobInfo.blob());
          xhr.send(formData);
        }
      });
    }
  }
</script>
<style scoped>

</style>
