<template>
    <div id="Brought_egg_error">
      <!--抢蛋失败-->
      <div class="hints">
        <p class="congratulation">手慢咯~</p>
        <p>Ta的好友已成功为Ta抢满30枚</p>
      </div>
      <div class="friedsItem">
        <img src="../../img/touxiang.png" alt="">
        <p>好友冬日暖洋洋，已抢30枚，您可以为自己抢蛋哦！</p>
      </div>
      <div class="help" @click="goShare" v-model="share">{{share}}</div>
      <!--<div class="help" @click="goShare">喊好友帮我抢</div>-->

      <!--蒙版-->
      <div class="box" id="box" v-show="isShow" @click="hideToggle"></div>
      <img src="../../img/shareHint.png" alt="" class="shareHint" v-show="isShow" @click="hideToggle">
    </div>
</template>

<script>
    export default {
        name:'Brought_egg_error',
        data(){
          return{
            isShow:false,
            share:'分享好友赚赏金',
          }
        },
        methods:{
          //当按钮信息为‘喊好友帮我抢’时，点击蒙版隐藏显示‘分享提示弹层’
          hideToggle() {
            this.isShow = !this.isShow;
          },
          goShare(){
            //当好友推荐的分享 可抢数量为0时,按钮信息为“喊好友帮我抢”点击弹出分享提示弹层
            if('可抢数量为0'){
              this.share='喊好友帮我抢';
              this.isShow = !this.isShow;
            }
          },
        },
        created(){
          document.title="抢蛋失败";
        },
        mounted(){},
        components:{}
    }
</script>

<style lang="scss" scoped>
#Brought_egg_error{
  background: #a6ffd7;
  min-height: 41.7rem;
  .hints{
    padding-top: 3rem;
    width: 90%;
    margin: 0 auto;
    font-size: 1.3rem;
    line-height: 2rem;
    text-align: center;
    .congratulation{
      color: #CC3E36;
    }
    p{
      color: #420909;
    }
  }
  .friedsItem{
    width:100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #dfdfdf;
    img{
      width:3rem;
      height:2.5rem;
      display: block;
      margin-left: .5rem;
    }
    p{
      font-size: 1rem;
      padding: 0.5rem;
    }
  }
  /*帮抢按钮*/
  .help {
    width: 50%;
    line-height: 3.56rem;
    background: rgba(255, 176, 17, 1);
    border-radius: 3rem;
    color: #2e0406;
    text-align: center;
    margin: 0 auto;
    margin-top: 5rem;
  }
  /*蒙版*/
  .box {
    opacity: 0.56;
    background: #000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    /*display:none*/
  }
  .shareHint {
    width: 80%;
    margin: 0 auto;
    display: block;
    z-index: 999;
    position: absolute;
    top: 3rem;
    left: 3.3rem;
  }
}
</style>
