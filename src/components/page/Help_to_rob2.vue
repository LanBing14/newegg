<template>
  <div id="Help_to_rob2">
    <div class="addBg">
      <div class="addbgCen">
        <div class="bgImg">
          <div class="helpSuccess">恭喜您！
            <br/> 成功帮助好友抢得无抗绿壳乌鸡蛋
            <span>一</span> 枚</div>
        </div>
        <div class="userInfo">
          <img src="../../img/egg.png" alt="" class="touxiang">
          <!-- <img :src="img" alt="" class="touxiang"> -->
          <p class="userName">{{name}}</p>
          <p class="alrealy">已经抢到
            <span>{{residueEggNum}}枚</span>鸡蛋</p>
        </div>
        <div class="addEgg">
          <img src="../../img/addEgg.png" alt="">
        </div>
        <!--<div class="joinMy">
          <p class="alJoin">已有
            <span>{{robNumber}}
            </span>个小伙伴加入抢蛋小分队</p>
          <p class="tit">如此好蛋，不容错过，快召唤你的抢蛋小分队吧，将健康安全，营养美味的翡翠蛋，带回家！</p>
        </div>-->
      </div>
      <div class="btns">
        <!-- <div class="help1" @click="goQiang">喊好友帮ta抢</div> -->
        <div class="help2" @click="goFriendQiang">喊好友帮我抢</div>
        <!--加在help2身上的点击函数         @click="goFriendQiang"-->
      </div>
    </div>

    <!--蒙版关注公众号-->
    <!--<div @click="hideToggle"></div>-->
    <!--这个标签原本是一个父元素-->
    <div class="box" id="box" v-show="isShow" @click="hideToggle"></div>
    <!--v-show="isShow" 是box的一个属性-->
    <div class="attention" v-show="isShow">
      <!--v-show="isShow" 是attention的一个属性-->
      <div class="titles">
        <p class="tit1">关注公众号,邀请好友抢蛋</p>
        <!-- <p class="tit2">FOCUS US</p> -->
      </div>
      <img src="../../img/guanzhu.png" alt="">

      <img src="../../img/code.jpg" alt="" class="Rcode">
    </div>

    <!--<div @cick="handleClick"> </div>-->
    <!--这个标签原本是一个父元素-->
    <div class="box" id="box" v-show="isFalse" @click="handleClick"></div>
    <img src="../../img/shareHint.png" alt="" class="shareHint" v-if="isFalse">

  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
import utils from "../common/common.js";
import wx from "weixin-js-sdk";
export default {
  name: "Help_to_rob2",
  data() {
    return {
      isShow: false,
      isFalse: false,
      robNumber: "xx",
      residueEggNum: "xx",
      hasRobEggNum: "xx",
      name: "xx",
      activityId: "",
      isSubscribe: "",
      openid: localStorage.getItem("openid"),
      img: ""
    };
  },
  methods: {
    //点击蒙版，关注公众号的弹框隐藏
    hideToggle() {
      this.isShow = false;
    },
    handleClick() {
      this.isFalse = false;
    },
    //喊好友帮ta抢
    goQiang(desc) {
      this.isFalse = true;
    },
    //喊好友帮我抢
    goFriendQiang() {
      // this.wxShare();
      this.isShow = true;
      this.WxZd();
    },
    WxZd() {
      var $this = this;
      //获取微信请求的字段
      var data = qs.stringify({
        originUrl: window.location.href
      });
      var baseUrl = BaseUrl + "index/getSignPackage";
      axios({
        method: "POST",
        url: baseUrl,
        type: "json",
        data: data
      }).then(
        function(res) {
          var info = res.data.data.signPackage;

          this.appId = info.appId;
          this.nonceStr = info.nonceStr;
          this.timestamp = info.timestamp;
          this.signature = info.signature;
          wx.config({
            debug: false,
            appId: this.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp: this.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.nonceStr, // 必填，生成签名的随机串
            signature: this.signature, // 必填，签名，见附录1
            //需要分享的列表项:发送给朋友，分享到朋友圈，
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
          });

          //处理验证失败的信息
          wx.error(function(res) {
            // logUtil.printLog("验证失败返回的信息:", res);
            console.log(res);
          });
          //处理验证成功的信息
          wx.ready(function() {
            //              alert(window.location.href.split('#')[0]);
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title:
                "每人30枚！无抗翡翠蛋免费抢，购买更便宜！我只能帮你到这里了", // 分享标题
              link:
                "http://egg.wufuapp.com?openid=" +
                $this.openid +
                "&activityId=" +
                $this.activityId,
              imgUrl:
                "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180910/1536581455920471.png", // 分享图标
              success: function(res) {
                // 用户确认分享后执行的回调函数
                // logUtil.printLog("分享到朋友圈成功返回的信息为:", res);
                // console.log(res);
                // _this.showMsg("分享成功!");
                this.isPub = true;
              },
              cancel: function(res) {
                // 用户取消分享后执行的回调函数
                // logUtil.printLog("取消分享到朋友圈返回的信息为:", res);
                console.log(res);
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title:
                "每人30枚！无抗翡翠蛋免费抢，购买更便宜！我只能帮你到这里了", // 分享标题
              desc:
                "绿壳无抗乌鸡蛋，30枚免费抢，数量有限，先抢先得、好吃好玩好赚钱", // 分享描述
              link:
                "http://egg.wufuapp.com?openid=" +
                $this.openid +
                "&activityId=" +
                $this.activityId,
              imgUrl:
                "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180910/1536581455920471.png", // 分享图标
              type: "", // 分享类型,music、video或link，不填默认为link
              dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              success: function(res) {
                // 用户确认分享后执行的回调函数
                // logUtil.printLog("分享给朋友成功返回的信息为:", res);
                // console.log(res);
                this.isPub = true;
              },
              cancel: function(res) {
                // 用户取消分享后执行的回调函数
                console.log(res);
                // logUtil.printLog("取消分享给朋友返回的信息为:", res);
              }
            });
          });
        }.bind(this)
      );
    }
  },
  mounted() {
    //this.wxShare('仅30枚！鸡蛋免费抢啦~我只能帮你到这了');
    //this.wxShare('仅30枚！绿皮无抗乌鸡蛋免费抢啦，我还差一些，就抢满了，大家帮帮我');
    let openid = localStorage.getItem("openid");
    var data = qs.stringify({
      activityId: this.$route.query.activityId,
      openid: openid
    });

    var baseUrl = BaseUrl + "index/robEgg";
    axios({
      method: "post",
      url: baseUrl,
      type: "json",
      data: data
    }).then(res => {
      console.log(res);
      this.hasRobEggNum = res.data.data.hasRobEggNum;
      this.isSubscribe = res.data.data.isSubscribe;
      this.residueEggNum = res.data.data.residueEggNum;
      this.robNumber = res.data.data.robNumber;
      this.name = res.data.data.username;
      this.img = res.data.data.img;
      this.activityId = res.data.data.activityId;

      if (this.isSubscribe == 0) {
        this.isShow = true;
      } else if (this.isSubscribe == 1) {
        this.isShow = false;
      }
    });
  },
  created() {
    document.title = "抢蛋免费领";
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#Help_to_rob2 {
  background: #77e5d9;
  min-height: 41.6rem;
  .addBg {
    background: #77e5d9;
    min-height: 38.2rem;
    padding-top: 12%;
    .addbgCen {
      height: 25rem;
      margin: 0 auto;
      width: 90%;
      border: 1px solid #000;
      position: relative;
      background-color: #ffe326;
      border-radius: 0.4rem;
      margin-bottom: 1.5rem;
      .bgImg {
        margin: 0 auto;
        .helpSuccess {
          height: 5rem;
          line-height: 2rem;
          text-align: center;

          span {
            font-size: 18px;
          }
        }
        img {
          width: 100%;
          margin-top: 1rem;
          margin-bottom: 4rem;
        }
      }
      .userInfo {
        color: #3e3209;
        margin: 0 auto;
        text-align: center;
        width: 100%;
        height: 5.5rem;
        .touxiang {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
        .userName {
          font-size: 1rem;
          line-height: 1.2rem;
        }
        .alrealy {
          font-size: 0.9rem;
          span {
            font-size: 1rem;
            color: #820303;
            font-weight: bold;
          }
        }
      }
      .addEgg {
        width: 8rem;
        margin: 0 auto;
        height: 5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .joinMy {
        background-color: #fff;
        width: 75%;
        margin: 0 auto;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
        border-radius: 0.4rem;
        padding: 0.5rem;
        .alJoin {
          color: #2e2c09;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          span {
            font-size: 1.5rem;
            color: #8b0205;
          }
        }
        .tit {
          color: #941e08;
          font-size: 1rem;
          line-height: 1.7rem;
          padding-bottom: 1rem;
          width: 90%;
          display: inline-block;
        }
      }
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 5%;
      .help1 {
        width: 9rem;
        line-height: 3rem;
        color: #2e0406;
        border-radius: 2rem;
        border: 1px solid #2e0406;
        margin-right: 1rem;
      }
      .help2 {
        width: 10rem;
        line-height: 4rem;
        color: #2e0406;
        border-radius: 2rem;
        background: #ffb011;
      }
    }
  }

  /*蒙版*/
  .box {
    /*display: none;*/
    opacity: 0.56;
    background: #000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
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
  .attention {
    position: fixed;
    width: 100%;
    top: 12rem;
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    img {
      width: 65%;
      display: block;
      margin: 0 auto;
      height: 13rem;
    }
    .titles {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 0.6rem;
      margin: 0 auto;
      text-align: center;
      font-size: 0.9rem;
      .tit1 {
        color: #bd2021;
      }
      .tit2 {
        color: #bc1f21;
      }
    }
    .Rcode {
      display: block;
      width: 40%;
      height: 62%;
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
