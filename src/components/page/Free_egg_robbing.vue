<template>
  <div id="Free_egg_robbing">
    <div class="top">
      <div class="launch fx">
        <div class=""></div>
        <p class="fx-f1 c1">我正在发起抢蛋活动</p>
      </div>
      <div class="bgt"></div>
      <div class="link fx">
        <p class="fx-f1" style="padding-right:1.5rem;"> 翡翠蛋 乌鸡蛋 无抗生素的新鲜绿壳蛋</p>
        <p class="fx fx-jf-c fx-ai-c" @click="goBuy">去购买</p>
      </div>
    </div>
    <div class="progress bg1 fx fx-y">
      <div class="fx-f1 fx fx-ai-c">
        <div class="eggprog" style="width:3.5rem;height:4rem;"></div>
        <div class="currprog fx-f1">
          <div :style="{width:progWid}">
            <div style="position:relative;">
              <div class="qp c1" v-show="showQp">{{eggNumber}}枚</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fx" style="position:relative;">
        <p class="c2" style="position:absolute;left:2rem;top:-1.5rem;font-size:.85rem;">1枚</p>
        <p class="c2" style="position:absolute;right:1.8rem;top:-1.5rem;font-size:.85rem;">{{totalNum}}枚</p>
      </div>

      <div class="butt" @click="helpRobMy" v-if="isbnt == '1'">喊好友帮我抢</div>
      <div class="butt" @click="helpRobTa" v-if="isbnt == '2'">帮TA抢</div>
      <div class="butt" @click="helpRobOn" v-if="isbnt == '3'">立即领取</div>

    </div>
    <div class="bottom" v-if="isMyself">
      <p class="f1 c3">我的抢蛋分队</p>
      <ul>
        <li class="fx fx-ai-c" v-for="(item,index) in joinArr" :key="index">
          <div><img :src="item.img" alt=""></div>
          <p class="f1">{{item.username}}成功帮我抢到{{item.eggNum}}枚</p>
        </li>
      </ul>
    </div>
    <div class="bottom" v-if="!isMyself">
      <p class="f1 c3">ta的抢蛋小分队</p>
      <ul>
        <li class="fx fx-ai-c" v-for="(item,index) in joinArr" :key="index">
          <div><img :src="item.img" alt=""></div>
          <p class="f1">{{item.username}}成功帮ta抢到{{item.eggNum}}枚</p>
        </li>
      </ul>
    </div>

    <!-- 蒙版 -->
    <div class="box" id="box" @click="isShow=false" v-if="isShow"></div>
    <img src="../../img/shareHint.png" @click="isShow=false" alt="" class="shareHint" v-if="isShow">

    <div class="TabRob" @click="isTaRob=false" v-if="isTaRob"></div>
    <div class="hintBox" v-if="isTaRob">
      <img src="../../img/remaind.png" alt="" class="mbicon">
      <div class="attention1">
        <p>市面上的鸡蛋99%都是激素蛋，如今您可帮好友抢得一枚无抗生素、无重金属、无兽药残留、的绿皮乌鸡蛋<br>
        </p>
      </div>
      <div class="btns">
        <div class="cancel" @click="targetTiao">帮Ta抢蛋</div>
      </div>
    </div>
    <!--蒙版关注公众号-->
    <div class="box1" id="box1" @click="isPub=false" v-show="isPub"></div>
    <div class="attention" v-show="isPub">
      <img src="../../img/guanzhu.png" alt="">
      <div class="titles">
        <p class="tit1"> 关注公众号，邀请好友抢蛋</p>
        <!-- <p class="tit2">FOCUS US</p> -->
      </div>
      <img src="../../img/code.jpg" alt="" class="Rcode">
    </div>

    <!--价钱蒙版-->
    <!--领取提醒-->
    <!--蒙版-->
    <div class="box" id="box" @click="isGEtEgg=false" v-show="isGetEgg"></div>
    <div class="getRemind" v-show="isGetEgg">
      <p class="remindTop">领取提醒</p>
      <p class="remindCenter">您需下单购买任一套餐，免费领取30枚绿皮无抗翡翠蛋</p>
      <div class="btns">
        <div class="cancel" @click="hideToggle">下次领取</div>
        <div class="true" @click="goGetNow">立即下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
import utils from "../common/common.js";

export default {
  name: "Free_egg_robbing",
  data() {
    return {
      progWid: "0%",
      showQp: false,
      isMyself: false,
      joinArr: [],
      eggNumber: 2,
      totalNum: 30,
      isClick: 0,
      isShow: false,
      isShow1: false,
      isTaRob: false,
      isSubscribe: 0,
      isPub: false,
      isOrder: 0,
      isGetEgg: false,
      activityIdOther: "",
      activityIdMine: "",
      isbnt: "",
      openid: "",
      isbntMe: true
    };
  },
  methods: {
    box1Close() {
      this.isPub = false;
    },
    getQueryString(name, url) {
      url = url || window.location.search.substr(1);
      console.log(url);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = url.match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    WxZd() {
      var $this = this;
      //获取微信请求的字段
      var data = qs.stringify({
        originUrl: window.location.href
      });
      console.log(data);
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
                "仅30枚！绿壳无抗乌鸡蛋免费抢啦，数量有限，先抢先得、好吃好玩好赚钱", // 分享标题
              link:
                "http://egg.wufuapp.com?openid=" +
                $this.openid +
                "&activityId=" +
                $this.activityIdMine,
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
              title: "仅仅30枚! 鸡蛋免费抢啦~我只能帮你到这了", // 分享标题
              desc:
                "绿壳无抗乌鸡蛋，30枚免费抢，数量有限，先抢先得、好吃好玩好赚钱", // 分享描述
              link:
                "http://egg.wufuapp.com?openid=" +
                $this.openid +
                "&activityId=" +
                $this.activityIdMine,
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
    },
    hideToggle() {
      this.isGetEgg = false;
      this.isShow = false;
    },
    goGetNow() {
      this.$router.push({ path: "/" });
    },
    //判断是否是自己
    isMyselfClick() {
      // alert(localStorage.getItem('openid'))
      var that = this;
      var baseUrl = BaseUrl + "index/joinActivity";
      var data = qs.stringify({
        activityId: that.activityIdOther,
        openid: localStorage.getItem("openid")
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(info => {
        console.log(info);
        var data = info.data.data;

        if (data.isMyself == 1 && data.eggNumber == 30) {
          that.isMyself = true;
          that.isbnt = "3";
        } else if (
          (data.isMyself == 1 && data.eggNumber != 30) ||
          (data.isClick == 1 && data.isSubscribe == 1)
        ) {
          that.isMyself = true;
          that.isbnt = "1";
        } else if (data.isMyself == 0) {
          that.isMyself = false;
          that.isbnt = "2";
          data.eggNumber = data.eggNumber >= 30 ? 29 : data.eggNumber;
        }

        that.eggNumber = data.eggNumber;
        that.progWid = data.eggNumber / 30 * 100 + "%";

        that.isOrder = data.isOrder;
        that.isSubscribe = data.isSubscribe;
        that.isClick = data.isClick;

        that.showQp = true;
        that.joinArr = data.joinArr;
        that.activityIdOther = data.otherActivityId;
        that.activityIdMine = data.selfActivityId;
        that.WxZd();
      });
    },
    goBack: function() {
      this.$router.push({ path: "/" });
    },
    targetTiao() {
      this.$router.push({
        path: "/Help_to_rob2",
        query: {
          activityId: this.activityIdOther,
          openid: localStorage.getItem("openid")
        }
      });
    },
    //点击‘去购买’
    goBuy() {
      this.bindRelat();
      this.$router.push({ path: "/product_details" });
    },

    //绑定关系
    bindRelat() {
      var $this = this;
      var data = qs.stringify({
        activtyId: $this.activityIdOther,
        openid: localStorage.getItem("openid")
      });
      var baseUrl = BaseUrl + "index/bindRelation";
      axios({
        method: "POST",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        console.log(data);
      });
    },

    //首页相关信息+openid存
    login: function() {
      var $this = this;
      var data = qs.stringify({
        paramUrl: window.location.href
      });
      var baseUrl = BaseUrl + "index/getCode";
      axios({
        method: "POST",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        let datas = data.data.data;
        window.location.href = datas.url;
      });
    },

    logins: function() {
      var $this = this;
      var baseUrl = BaseUrl + "index/getUserOpenid";
      var data = qs.stringify({
        code: utils.getQueryString("code")
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        if (data.data.status == 1) {
          $this.openid = data.data.data.openid;
          localStorage.setItem("openid", $this.openid);
          $this.isMyselfClick();
        }
      });
    },
    //立即领取
    helpRobOn() {
      if (this.isOrder == 0) {
        this.isGetEgg = true;
      } else if (this.isOrder == 1) {
        this.isTaRob = true;
      }
    },
    //喊好友帮我抢
    helpRobMy() {
      this.isShow = true;
    },
    //帮ta抢
    helpRobTa() {
      if (this.isClick == 0) {
        // 没抢
        this.isTaRob = true;
      } else if (this.isClick == 1) {
        //已关注
        if (this.isSubscribe == 1) {
          this.isShow = true;
          //没关注
        } else if (this.isSubscribe == 0) {
          this.isPub = true;
        }
      }
    }
  },
  created() {},
  mounted() {
    document.title = "抢蛋免费领";
    this.activityIdOther = this.getQueryString("activityId");

    if (!localStorage.getItem("openid")) {
      if (utils.getQueryString("code")) {
        this.logins();
      } else {
        this.login();
      }
    } else {
      this.isMyselfClick();
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#Free_egg_robbing {
  .c1 {
    color: #2b0405;
  }
  .c2 {
    color: #ffb011;
  }
  .c3 {
    color: #840c32;
  }
  .f1 {
    font-size: 0.85rem;
  }
  .bg1 {
    background-color: white;
  }
  .hh {
    border: 1px solid red;
  }
  .bg {
    background-color: #f1f1f2;
    color: #2b0405;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .top {
    height: 18rem;
    background: white;
    position: relative;
  }
  .bgt {
    width: 18rem;
    height: 18rem;
    margin: 0 auto;
    background: url("/static/img/egg2.png") no-repeat center 10%; //不要改，vue开发环境和生产环境图片路径不同，线上这个路径有图片
    background-size: 100%;
  }
  .link {
    font-size: 0.95rem;
    color: #2e0406;
    box-sizing: border-box;
    height: 5rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    z-index: 22;
    padding: 1rem;
    z-index: 1;
  }
  .link > p:last-child {
    font-size: 1.1rem;
    padding: 0 1rem;
    width: 5rem;
    background-color: #cc3e36;
    color: white;
    border-radius: 2rem;
    letter-spacing: 0.05rem;
  }
  .launch {
    width: 12rem;
    height: 2rem;
    position: absolute;
    top: 0.8rem;
    left: 1rem;
    z-index: 22;
  }
  .launch > p {
    font-size: 0.8rem;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 2.5rem;
    top: 0.25rem;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
  }
  .launch > div {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: url("../../img/touxiang.png") no-repeat center;
    background-size: 100%;
  }
  /*进度条部分样式*/
  .progress {
    height: 12rem;
  }
  .eggprog {
    background: url("../../img/egg.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    left: 0.5rem;
  }
  .progress > div:first-child {
    padding: 0.85rem 2rem 0 2rem;
  }
  .progress > div:last-child {
    width: 8rem;
    height: 2.5rem;
    background-color: #ffb011;
    margin: 0.6rem auto;
    color: #2e0406;
    font-size: 0.9rem;
    text-align: center;
    line-height: 2.5rem;
    border-radius: 1.2rem;
  }
  .currprog {
    height: 2.5rem;
    box-sizing: border-box;
    background-color: #840c32;
    border-radius: 0 2rem 2rem 0;
    padding: 0.2rem 0.2rem 0.2rem 0;
  }
  .currprog > div:first-child {
    height: 100%;
    background-color: #eee326;
    border-radius: 0 2rem 2rem 0;
    transition: width 1s;
  }
  .qp {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    right: -0.5rem;
    bottom: 0.2rem;
    background: url("../../img/qipao.png") no-repeat center;
    background-size: 100%;
    font-size: 0.85rem;
    text-align: center;
    line-height: 2rem;
  }
  .bottom {
    min-height: 3rem;
    box-sizing: border-box;
    background-color: rgb(240, 240, 242);
    padding: 1rem;
  }
  ul > li {
    margin: 0.6rem 0;
  }
  ul > li > div > img {
    width: 2.5rem;
    height: 2.5rem;
    background-size: 100%;
  }
  ul > li > p {
    color: #bdb9b9;
    padding-left: 1.2rem;
  }
  /*弹性盒子*/
  .fx {
    display: flex;
  }
  .fx-f1 {
    flex-grow: 1;
    -webkit-flex-grow: 1;
  }
  .fx-jf-c {
    justify-content: center;
    -webkit-justify-content: center;
  }
  .fx-ai-c {
    align-items: center;
    -webkit-align-items: center;
  }
  .fx-y {
    flex-direction: column;
    -webkit-flex-direction: column;
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
    position: fixed;
    top: 3rem;
    left: 3.3rem;
  }
  .TabRob {
    opacity: 0.56;
    background: #000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .hintBox {
    text-align: center;
    background: #fff;
    width: 80%;
    height: 10rem;
    margin: 0 auto;
    padding-bottom: 1rem;
    color: #0b0b0b;
    font-size: 0.8rem;
    border-radius: 0.7rem;
    z-index: 999;
    position: fixed;
    top: 20%;
    left: 10%;
    .mbicon {
      width: 100%;
      height: 100%;
      // border-radius: 0.4rem;
    }
    .attention1 {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      margin: 0 auto;
      p {
        font-size: 1.2rem;
        line-height: 1.4rem;
      }
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 0 0 0.4rem 0.4rem;
      font-size: 14px;
      padding: 1rem;
      .cancel {
        width: 7rem;
        height: 3rem;
        line-height: 3rem;
        color: #fff;
        font-size: 16px;
        background-color: #f0461b;
        border-radius: 2rem;
        margin-right: 0.5rem;
      }
    }
  }
  .box1 {
    opacity: 0.56;
    background: #000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
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
    // .Rcode {
    //   display: block;
    //   width: 35%;
    //   height: 60%;
    //   position: absolute;
    //   top: 2.1rem;
    //   margin: 0 33.5%;
    // }
  }

  // 弹出框价格
  // .box3 {
  //   opacity: 0.9;
  //   background: #000;
  //   z-index: 9;
  //   width: 100%;
  //   height: 100%;
  //   position: fixed;
  //   top: 0;
  // }
  /*领取提醒*/
  .getRemind {
    background: #fff;
    width: 90%;
    height: 15rem;
    color: #000;
    text-align: center;
    position: fixed;
    padding: 0.3rem;
    top: 40%;
    left: 1rem;
    z-index: 11;
    border-radius: 0.3rem;
    .remindTop {
      font-size: 20px;
      line-height: 3rem;
    }
    .remindCenter {
      height: 3rem;
      line-height: 2rem;
      font-size: 16px;
    }
    .color-choice {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      .color {
        border: 1px solid #79797b;
        color: #000;
        border-radius: 5rem;
        width: 30%;
        margin: 0.5rem 0.3rem;
        line-height: 2.3rem;
        text-align: center;
      }
      .active {
        border: 1px solid #c01a20;
        color: #c01a20;
      }
    }
    .btns {
      width: 100%;
      font-size: 0.9rem;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel {
        width: 40%;
        line-height: 2.5rem;
        border: 1px solid #030000;
        border-radius: 2rem;
        color: #050505;
        margin-right: 2%;
      }
      .true {
        width: 40%;
        line-height: 2.5rem;
        background: #c9161d;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 2%;
      }
    }
  }
}
</style>
