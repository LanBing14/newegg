<template>
    <div id="index">

    </div>
</template>

<script>

  import axios from 'axios'

    export default {
        name:'index',
        data(){

        },
        methods:{
          login: function () {
            var $this = this;
            var wechatid = "oIgTGw0nGRa2KSRjivizZVxJwniU";
            var data = {
              id:16,
              openid: wechatid,
            };

            axios({
              method: "GET",
              url: baseUrl + "/api/productDetail",
              type: 'json',
              data: data
            }).then(function (data) {
              console.log(data)

            }).catch(function () {
              //alert("程序异常，联系技术人员")
            });


          }


        },
        mounted(){
          this.login()

        },
        components:{}
    }
</script>

<style lang="scss" scoped>

</style>
