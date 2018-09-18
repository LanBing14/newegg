<template>
    <div id="evaluate">
      <mt-header class="bg" fixed title="发表评价" style="font-size:1.2rem;height: 3rem;">
        <mt-button icon="back" slot="left" @click="goBack"></mt-button>
      </mt-header>
      <!--评价等级-->
      <div class="evaluateLevel">
        <img src="../../img/swiper.png" alt="" class="goods">
        <div class="levels">
          <div class="level">
            <img src="../../img/haoping_weixuanzhong.png" alt="" @click="magic1" v-show="isGood1">
            <img src="../../img/haoping_xuanzhong.png" alt="" v-show="isGood2" @click="magic1">
            <p>好评</p>
          </div>
          <div class="level">
            <img src="../../img/zhongping_weixuanzhong.png" alt="" @click="magic2" v-show="isMedium1" style="width: 2.1rem;">
            <img src="../../img/zhongping_xuanzhong.png" alt="" @click="magic2" v-show="isMedium2"style="width: 2.1rem;">
            <p>中评</p>
          </div>
          <div class="level">
            <img src="../../img/chaping_weixuanzhong.png" alt="" @click="magic3" v-show="isBad1">
            <img src="../../img/chaping_xuanzhong.png" alt="" @click="magic3" v-show="isBad2">
            <p>差评</p>
          </div>
        </div>
      </div>
      <!--评价内容-->
      <div class="content">
        <textarea  v-model="introduct"  placeholder="宝贝满足您的期待吗？说说你的心得，分享给想买的他们吧"></textarea>
      </div>
      <!--发表评价-->
      <div class="btn" @click="published">发表评价</div>
    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import { Toast } from "mint-ui";

    export default {
        name: 'evaluate',
        data(){
            return {
              introduct:"",
              isGood1:true,
              isGood2:false,
              isMedium1:true,
              isMedium2:false,
              isBad1:true,
              isBad2:false,
              level:1
            }
        },
        methods: {
          // 返回
          goBack(){
            this.$router.push({path:'/order_details'});
          },
          //好评
          magic1(){
            this.level=1;
            this.isGood1 =!this.isGood1;
            this.isGood2 =!this.isGood2;
            if(this.isGood2 =true){
              this.isGood1 = false;
              this.isGood2 = true;
              this.isMedium1 = true;
              this.isMedium2 = false;
              this.isBad1 = true;
              this.isBad2 = false;
            }
          },
          //中评
          magic2(){
            this.level=2;
            this.isMedium1 =!this.isMedium1;
            this.isMedium2 =!this.isMedium2;
            if(this.isMedium2 = true){
              this.isGood1 = true;
              this.isGood2 = false;
              this.isMedium1 = false;
              this.isMedium2 = true;
              this.isBad1 = true;
              this.isBad2 = false;
            }
          },
          //差评
          magic3(){
            this.level=3;
            this.isBad1 =!this.isBad1;
            this.isBad2 =!this.isBad2;
            if(this.isBad2 = true){
              this.isGood1 = true;
              this.isGood2 = false;
              this.isMedium1 = true;
              this.isMedium2 = false;
              this.isBad1 = false;
              this.isBad2 = true;
            }
          },
          //获取评论数据
          published(){
            if(this.introduct==""){
              Toast({
                message: '评论不能为空',
                duration: 1500
              });
            }else{
              var $this = this;
              var baseUrl=BaseUrl+"api/addGoodsComment";
              var data=qs.stringify({
                id:7,
                openid:"oX6js0WrM2E-Pbz0tg3ltsDdPByY",
                level:this.level,
                content:this.introduct
              });
              axios({
                method: "post",
                url: baseUrl,
                type: 'json',
                data:data
              }).then(function (data) {
                console.log(data);
                let datas=data.data.data;
                if(data.data.status==1){
                  Toast({
                    message: data.data.msg,
                    duration: 1500
                  });
                }else{
                  Toast({
                    message: datas.msg,
                    duration: 1500
                  });
                }
                setTimeout(function() {
                  $this.$router.push({ path: "/myOrder" ,params: {id:datas.id,}});
                }, 1500);
              }).catch(function () {
                //alert("程序异常，联系技术人员")
              });
            }
          }
        },
        mounted(){
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
#evaluate{
  background: #f0f0f2;
  min-height: 41.6rem;
  .mint-header{
    background: #CC3E36;
  }
  /*评价等级*/
  .evaluateLevel{
    background: #ffffff;
    display: flex;
    align-items: center;
    margin-top: 3rem;
    border-bottom: 1px solid #ddd;
    .goods{
      display: block;
      width: 5rem;
      height: 5rem;
      margin: .5rem;
    }
    .levels{
      display: flex;
      align-items: center;
      .level{
        display: flex;
        align-items: center;
        margin-left: 1.5rem;
      }
      img{
        width: 1.8rem;
      }
    }
  }
  /*评价内容*/
  .content{
    width: 100%;
    textarea{
      width: 99%;
      height: 8rem;
      resize:none;
      border:none;
      font-size: 1.1rem;
      /*padding: .5rem;*/
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
  /*发表评价*/
  .btn{
    width: 46%;
    margin: 0 27%;
    border-radius: 2rem;
    font-size: 1.2rem;
    line-height: 3rem;
    text-align: center;
    color: #ffffff;
    background: #CC3E36;
    position: fixed;
    bottom: 2rem;
  }
}
</style >
