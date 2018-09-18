<template>
    <div id="register">
      <mt-header fixed title="注册" style="font-size:1.2rem;height: 3rem;">
        <mt-button icon="back" slot="left" @click="goBack"></mt-button>
      </mt-header>
      <!--注册信息填写-->
      <div class="registerInfos">
        <input type="number" placeholder="请输入手机号" class="input">
        <input type="text" placeholder="输入密码" class="input">
        <input type="text" placeholder="再次确认密码" class="input">
        <div class="code">
          <input type="text" placeholder="输入验证码">
          <div class="getCode">获取验证码</div>
        </div>
      </div>
      <!--立即注册按钮-->
      <div class="registerNow" @click="regNow">立即注册</div>
      <!--协议-->
      <p class="attention">注册即视为同意<span>《平台使用服务协议》</span></p>
    </div>
</template>

<script>
  import { Header } from 'mint-ui'

    export default {
        name:'register',
        data(){
          return{

          }
        },
        methods:{
          //返回登录界面
          goBack(){
            this.$router.push({path:'/product_details'});
          },
          //点击立即注册
          regNow(){
            this.$router.push({path:'/registerSuccess'});
          }
        },
        mounted(){},
        components:{}
    }
</script>

<style lang="scss" scoped>
#register{
  background: #f0f0f2;
  min-height: 41.7rem;
  .mint-header{
    background: #CC3E36;
  }
  /*注册信息填写*/
  .registerInfos{
    padding-top: 5rem;
    .input{
      background: #fff!important;
      width: 70%;
      margin: 0 auto;
      display: block;
      line-height: 2.5rem;
      margin-bottom: 1rem;
      border-radius: 5rem;
      padding-left: 1.2rem;
      color: #C1C5C8;
      font-size: .9rem;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #C1C5C8;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #C1C5C8;
    }
    input:-ms-input-placeholder{
      color: #C1C5C8;
    }
    input::-webkit-input-placeholder{
      color: #C1C5C8;
    }
    .code{
      width: 70%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 2rem;
      padding-left: 1.2rem;
      font-size: .9rem;
      input{
        width: 60%;
        line-height: 2.5rem;
        font-size: .9rem;
      }
      .getCode{
        font-family: PingFang-SC-Medium;
        font-size: .9rem;
        background: #C9161D;
        color: #ffffff;
        line-height: 2.5rem;
        width: 42%;
        border-radius: 0 2rem 2rem 0;
        text-align: center;
      }
    }
  }
  /*立即注册按钮*/
  .registerNow{
    width:40%;
    font-size: 1.1rem;
    line-height: 3rem;
    text-align: center;
    color: #fff;
    background: #C9161D;
    border-radius: 2rem;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  /*协议*/
  .attention{
    color: #929292;
    font-size: .7rem;
    text-align: center;
    span{
      color: #C9161D;
    }
  }
}
</style>
