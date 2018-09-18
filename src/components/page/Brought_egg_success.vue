<template>
    <div id="Brought_egg_success">
      <!--抢蛋成功-->
      <div class="success">
        <img src="../../img/lindanSuccess.png" alt="">
      </div>
      <div class="hints">
        <p class="congratulation">恭喜你</p>
        <p>成功领取无抗鸡蛋一份！将会在下月与您套餐 一同发送给您，请注意查收~！</p>
      </div>
      <div class="orderBtn" @click="goOrder">
        查看我的订单
      </div>  
    </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
import utils from "../common/common.js";
    export default {
        name:'Brought_egg_success',
        data(){
          return{

          }
        },
        methods:{
          goOrder(){
            this.$router.push('/myOrder')
          }
        },
        created(){
          document.title="抢蛋成功";
              var data = qs.stringify({
          number:30,
          openid: localStorage.getItem('openid')
        });
        

        var baseUrl = BaseUrl + "api/applyEgg";
       
        axios({
          method: "post",
          url: baseUrl,
          type: "json",
          data: data
        }).then(res => {
            
        });

        },
        mounted(){},
        components:{}
    }
</script>

<style lang="scss" scoped>
#Brought_egg_success{
  background: #a6ffd7;
  min-height: 41.7rem;
  .success{
    width:100%;
    img{
      width: 100%;
      height: 25rem;
    }
  }
  .orderBtn{
    width:80%;
    height:40px;
    line-height:40px;
    border-radius:30px;
    margin:auto;
    background-color: rgb(253,175,47);
    margin-top:20px;
    text-align:center;
    color:#fff;
  }
  .hints{
    width: 90%;
    margin: 0 auto;
    font-size: 1.3rem;
    text-align: center;
    .congratulation{
      color: #CC3E36;
    }
    p{
      color: #420909;
    }
  }
}
</style>
