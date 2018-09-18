<template>
    <div id="registerSuccess">
      <mt-header fixed title="注册成功" style="font-size:1.2rem;height: 3rem;">
        <mt-button icon="back" slot="left" @click="goBack"></mt-button>
      </mt-header>
      <!--注册成功-->
      <div class="regSuccess">
        <img src="../../img/zhifuchenggong.png" alt="" class="success">
        <p class="reg_ture">注册成功</p>
        <p class="youtId">您的账号 13955540146416</p>
      </div>
      <!--完善资料+首页按钮-->
      <div class="btns">
        <p class="zhuyi">完善您的个人信息  可获得10积分奖励哦~！</p>
        <div class="button">
          <div class="perfect">完善资料</div>
          <div class="goIndex">去首页</div>
        </div>
      </div>
    </div>
</template>

<script>
  import { Header } from 'mint-ui'

    export default {
        name:'registerSuccess',
        data(){
          return{

          }
        },
        methods:{
          //返回注册界面
          goBack(){
            this.$router.push({path:'/register'});
          },
        },
        mounted(){},
        components:{}
    }
</script>

<style lang="scss" scoped>
#registerSuccess{
  background: #f0f0f2;
  min-height: 41.7rem;
  .mint-header{
    background: #CC3E36;
  }
  /*注册成功*/
  .regSuccess{
    width: 100%;
    height: 9rem;
    background: #ffffff;
    margin-top: 3rem;
    padding-top: 1rem;
    .success{
      width:3rem;
      height:3rem;
      display: block;
      margin: 1rem auto;
    }
    .reg_ture{
      font-family: PingFang-SC-Bold;
      font-weight:bold;
      text-align: center;
      font-size: 1.3rem;
      color: #CC3E36;
      font-weight: normal;
    }
    .youtId{
      text-align: center;
      font-size: .9rem;
      color: #454444;
      font-weight: normal;
    }
  }
  /*完善资料+首页按钮*/
  .btns{
    .zhuyi{
      font-size: 1rem;
      color: #454444;
      text-align: center;
      margin-top: 2rem;
    }
    .button{
      display: flex;
      align-items: center;
      margin-top: 1rem;
      .perfect{
        width:40%;
        font-size: 1.1rem;
        line-height: 3rem;
        text-align: center;
        color: #fff;
        background: #C9161D;
        border-radius: 2rem;
        margin: 0 auto;
      }
      .goIndex{
        width:40%;
        font-size: 1.1rem;
        line-height: 3rem;
        text-align: center;
        color: #fff;
        background: #C9161D;
        border-radius: 2rem;
        margin: 0 auto;
      }
    }
  }
}
</style>
