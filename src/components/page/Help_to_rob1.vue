<template>
  <div id="Help_to_rob1">
    <!--商品图片-->
    <div class="goodBox">
      <img src="../../img/swiper.png" alt="">
      <div class="mine">
        <img src="../../img/touxiang.png" alt="">
        <div class="brove">太棒了吧~成功领到30枚鸡蛋</div>
      </div>
    </div>
    <!--标题+去购买-->
    <div class="link fx">
      <p class="fx-f1" style="padding-right:1.5rem;width: 65%;">新鲜鸡蛋 无抗生素鸡蛋无抗生素供港澳鸡蛋</p>
      <p class="fx fx-jf-c fx-ai-c" @click="goBuy">去购买</p>
    </div>
    <!--帮抢按钮-->
    <div class="help" v-if="isMyself" @click="helpRobMy">喊好友帮我抢</div>
    <div class="help" v-if="!isMyself" @click="helpRobTa">帮TA抢</div>
    <!--蒙版-->
    <div class="box" id="box" v-show="isShow" @click="hideToggle"></div>
    <img src="../../img/shareHint.png" alt="" class="shareHint" v-show="isShow" @click="hideToggle">
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import utils from "../common/common.js";
import axios from "axios";
import qs from "qs";
export default {
  name: "Help_to_rob1",
  data() {
    return {
      isShow: false,
      isMyself: false,
      isClick: 1
    };
  },
  methods: {
    //点击分享图标显示
    showShare() {
      this.isShow = !this.isShow;
    },
    //点击蒙版隐藏
    hideToggle() {
      this.isShow = !this.isShow;
    },
    //帮我抢
    helpRobMy() {
      if (this.isClick == 1) {
      } else if (this.isClick == 0) {
      }
    },
    //帮ta抢
    helpRobTa() {
      if (this.isClick == 0) {
        this.isShow = true;
      } else if (this.isClick == 1) {
      }
    },
    //去购买
    goBuy() {
      this.$router.push({ path: "/" });
    },
    isMyselfClick() {
      var that = this;
      var baseUrl = BaseUrl + "index/joinActivity";
      var data = qs.stringify({
        activityId: 12,
        openid: "oX6js0WrM2E-Pbz0tg3ltsDdPByY"
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(info => {
        var data = info.data.data;
        this.isClick = data.isClick;
        // 帮我抢
        if (data.isMyself == 1) {
          that.isMyself = true;
        } else if (data.isMyself == 0) {
          // 帮他抢
          that.isMyself = false;
        }
      });
    }
  },
  created() {
    document.title = "抢蛋免费领";
    this.isMyselfClick();
  },
  mounted() {
    // this.wxShare("仅30枚！鸡蛋免费抢啦~我只能帮你到这了");
    // this.wxShare(
    //   "仅30枚！绿皮无抗乌鸡蛋免费抢啦，我还差一些，就抢满了，大家帮帮我"
    // );
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#Help_to_rob1 {
  background: #30bbac;
  min-height: 41.6rem;
  /*商品图片*/
  .goodBox {
    width: 100%;
    height: 16rem;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
    }
    .mine {
      display: flex;
      align-items: center;
      padding: 1rem;
      position: relative;
      top: -16.5rem;
      z-index: 9;
      img {
        width: 10%;
        height: 2rem;
      }
      .brove {
        background: rgba(238, 238, 238, 1);
        opacity: 0.51;
        border-radius: 1rem;
        margin-left: 0.5rem;
      }
    }
  }
  /*标题+去购买*/
  .link {
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    color: #2e0406;
    box-sizing: border-box;
    height: 5rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 22;
    padding: 1rem;
  }
  .link > p:last-child {
    font-size: 1.1rem;
    padding: 0 1rem;
    width: 5rem;
    background-color: #cc3e36;
    color: white;
    border-radius: 2rem;
    letter-spacing: 0.05rem;
    line-height: 2.5rem;
    text-align: center;
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
