<template>
  <div id="Free_egg_robbing">
    <div class="wholeYe">
      <!-- 头部轮播 -->
      <div class="top" v-if="topSwiper">
        <div class="launch fx">
          <div class="">
            <img :src="activityImg" />
          </div>
          <!--activityImg-->
          <p class="fx-f1 c1">{{activityUsername}}</p>
          <!--我正在发起抢蛋活动-->
        </div>
        <div class="bgt">
        </div>
        <!-- <div class="bgt"><img src="../../img/egg3.jpg" alt=""></div> -->
        <div class="link fx">
          <p class="fx-f1" style="padding-right:1.5rem;"> 翡翠蛋 乌鸡蛋 无抗生素的新鲜绿壳蛋</p>
          <p class="fx fx-jf-c fx-ai-c" @click="goBuy">商品详情
            <img src="../../img/right.png" alt="">
          </p>
        </div>
      </div>
      <div class="top1" v-if="topHelpRob">
        <div class="otherTop">
          <p class="successRob">您已成功帮微信好友
            <span class="specialfont">{{activityUsername}}</span>
          </p>
          <p class="successRob">抢了
            <span class="specialfont">1</span>枚翡翠蛋,您还可以</p>
          <div class="fxThree">
            <div class="leftBuy colf">
              <div class="btnYellow " @click="gobuyClick">去购买</div>
            </div>
            <div class="centerRob colf">

              <div class="btnYellow Bgred" @click="goRobClick">去抢蛋</div>

            </div>
            <div class="rightBuy colf">

              <div class="btnYellow" @click="shareFreJin">赚赏金</div>

            </div>
          </div>
        </div>
      </div>
      <!-- 未关注 -->
      <div class="topTwo" v-if="topGuan">
        <div class="otherTop">
          <p class="successRob">您已成功帮微信好友
            <span class="specialfont">{{activityUsername}}</span>
          </p>
          <p class="successRob">抢了
            <span class="specialfont">1</span>枚翡翠蛋</p>
          <p class="canBuy">Ta已抢到了
            <span class="specialfont">{{eggNumber}}</span>枚</p>
        </div>
        <div style="position: relative" class="commonit">
          <img src="../../img/chicken.png" alt="" class="eggChicken">
          <img src="../../img/code.jpg" alt="" class="imgEr">
          <img src="../../img/robHelpfr.png" alt="" class="reGuan">
        </div>
      </div>
      <!-- 中间部分 -->
      <!-- 进度条框框 -->
      <div class="progress bg1 fx fx-y" v-if="manNum">
        <div class="fx-f1 fx fx-ai-c searchProgress" v-if="proDel">
          <div class="eggprog" style="width:3.5rem;height:4rem;"></div>
          <div class="currprog fx-f1">
            <div :style="{width:progWid}">
              <div style="position:relative;">
                <div class="qp c1" v-show="showQp">{{eggNumber}}枚</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fx" style="position:relative;height: 1rem" v-if="proDel">
          <p class="c2" style="position:absolute;left:2rem;top:-.5rem;font-size:.85rem;">1枚</p>
          <p class="c2" style="position:absolute;right:1.8rem;top:-0.5rem;font-size:.85rem;">{{totalNum}}枚</p>
        </div>

        <div class="butt" @click="helpRobMy" v-if="isbnt == '1'">喊好友帮我抢</div>
        <div class="butt" @click="helpRobTa" v-if="isbnt == '2'">帮TA抢</div>

      </div>

      <!-- 已经满了30没已经关注的内容 -->
      <div class="progressOne bg2 fx fx-y" v-if="isbntMan">
        <p class="text-Ali">您已经成功抢满
          <span>30枚</span> 绿壳无抗翡翠蛋</p>
        <p class="text-Ali font12">您还可以:</p>
        <div class="fx splitY">
          <div @click="knowShare" class="buttOne whiteCol">了解赚赏金</div>
          <div @click="helpLeng" class="buttOne redCol">炫耀一下</div>
        </div>
      </div>

      <div class="bottom" v-if="isMyself == '3'">
        <p class="f1 c3">我的抢蛋分队</p>
        <ul>
          <li class="fx fx-ai-c" v-for="(item,index) in joinArr" :key="index">
            <div><img :src="item.img" alt=""></div>
            <p class="f1">{{item.username}}成功帮我抢到{{item.eggNum}}枚</p>
          </li>
        </ul>
      </div>
      <div class="bottom" v-if="isMyself == '4'">
        <p class="f1 c3">Ta的抢蛋小分队</p>
        <ul>
          <li class="fx fx-ai-c" v-for="(item,index) in joinArr" :key="index">
            <div><img :src="item.img" alt=""></div>
            <p class="f1">{{item.username}}成功帮Ta抢到{{item.eggNum}}枚</p>
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="bottomEWM" v-if="isMyself == '5'">
        <p class="f1 c3 MyTeam">我的抢蛋分队</p>
        <div style="position: relative">
          <img src="../../img/chicken.png" alt="" class="eggChicken">
          <img src="../../img/code.jpg" alt="" class="imgEr">
          <img src="../../img/reGuan.png" alt="" class="reGuan">
        </div>
      </div>

      <div class="bottom" v-if="isMyself == '6'">
        <p class="f1 c3">Ta的抢蛋小分队</p>
        <div class="text-align-font">关注后可查看Ta的抢蛋小分队~!</div>
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
        </div>
        <img src="../../img/code.jpg" alt="" class="Rcode">
      </div>
      <!-- 模态框赏金按钮的 -->
      <div class="box" id="box" @click="shareModel=false" v-if="shareModel"></div>
      <div class="hintBoxShare" v-if="shareModel">
        <img src="../../img/remaindyello.png" alt="" class="mbicon">
        <div class="attenShare">
          <p>最高可赚
            <span class="redBtn">18%</span>的奖金</p>
          <p>已有24938 个小伙伴赚了￥527438.72</p>
        </div>
        <div class="fx quera">
          <div>
            <div class="shareLeft commit">
              <p>赚</p>
              <p>7%</p>
            </div>
            <p class="orderDe">好友下单</p>
          </div>
          <div>
            <div class="shareCente commit">
              <p>赚</p>
              <p>6%</p>
            </div>
            <p class="orderDe">Ta的好友下单</p>
          </div>
          <div>
            <div class="shareRight commit">
              <p>赚</p>
              <p>5%</p>
            </div>
            <p class="orderDe">Ta的好友下单</p>
          </div>
        </div>
        <div class="yeloBtns">
          <span class="cancel" @click="shareMyFridend">分享给好友</span>
        </div>
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
      topGuan: false,
      topSwiper: false,
      shareJin: false,
      proDel: false,
      shareModel: false,
      manNum: false,
      isMyself: "",
      isbntMan: false,
      joinArr: [],
      topHelpRob: false,
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
      activityUsername: "",
      activityImg: ""
    };
  },
  methods: {
    box1Close() {
      this.isPub = false;
    },
    helpLeng() {
      this.$router.push({ path: "/product_details" });
    },
    getQueryString(name, url) {
      url = url || window.location.search.substr(1);
      console.log(url);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = url.match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    shareMyFridend() {
      this.shareModel = false;
      this.isShow = true;
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
                "每人30枚！无抗翡翠蛋免费抢，购买更便宜！我只能帮你到这里了", // 分享标题
              link:
                "http://egg.wufuapp.com/Free_egg_robbing?openid=" +
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
              title:
                "每人30枚！无抗翡翠蛋免费抢，购买更便宜！我只能帮你到这里了", // 分享标题
              desc:
                "绿壳乌鸡蛋、高科技生态养殖、无抗生素，无兽药残留，无重金属，无添加，数量有限，先抢先得，好吃好玩好赚钱！", // 分享描述
              link:
                "http://egg.wufuapp.com/Free_egg_robbing?openid=" +
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
    shareFreJin() {
      this.shareModel = true;
    },
    knowShare() {
      this.shareModel = true;
    },
    goGetNow() {
      this.$router.push({ path: "/" });
    },
    //判断是否是自己
    isMyselfClick() {
      var that = this;
      var baseUrl = BaseUrl + "index/joinActivity";
      var data = qs.stringify({
        activityId: that.activityIdOther || that.$route.query.activityId,
        openid: localStorage.getItem("openid")
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(info => {
        var data = info.data.data;
        console.log(data);

        //判断是自己
        if (data.isMyself == 1) {
          if (data.isSubscribe == 1) {
            if (data.eggNumber == 30) {
              //轮播图显示
              that.topSwiper = true;
              //满30盒子 显示
              that.isbntMan = true;
              //我的抢蛋小分队显示
              that.isMyself = "3";
            } else if (data.eggNumber < 30) {
              // 未满30
              //轮播图显示
              that.topSwiper = true;
              //进度条外面的盒子显示
              that.manNum = true;
              //进度条显示
              that.proDel = true;
              //帮我抢小分队显示
              that.isMyself = "3";
              //好友帮我抢按钮显示
              that.isbnt = "1";
            }
          } else if (data.isSubscribe == 0) {
            // 未关注
            //轮播图显示
            that.topSwiper = true;
            //有进度条外面的盒子显示
            that.manNum = true;
            that.proDel = true;
            //好友帮我抢按钮显示
            that.isbnt = "1";
            //带图片的二维码显示
            that.isMyself = "5";
          }
        } else if (data.isMyself == 0) {
          // 不是自己 判断有没有抢过
          if (data.isClick == 1) {
            //判断有没有关注过
            if (data.isSubscribe == 1) {
              //关注过

              //帮抢显示
              that.topHelpRob = true;
              //ta的小分队显示
              that.isMyself = "4";
            } else if (data.isSubscribe == 0) {
              //未关注
              that.topGuan = true;
              //ta的小分队显示
              that.isMyself = "6";
            }
          } else if (data.isClick == 0) {
            // 没有抢过
            that.topSwiper = true;
            //ta的小分队显示
            that.isMyself = "4";
            //进度条大框显示
            that.manNum = true;
            //进度条显示
            that.proDel = true;
            //帮ta抢显示
            that.isbnt = "2";
            that.eggNumber = data.eggNumber >= 30 ? 29 : data.eggNumber;
            that.progWid = 29 / 30 * 100 + "%";
          }
        }

        that.activityImg = data.activityImg;
        that.activityUsername = data.activityUsername;

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
    },
    gobuyClick() {
      this.$router.push({ path: "/product_details" });
    },
    goRobClick() {
      this.isShow = true;
    },
    RobClick() {
      this.isShow = true;
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
        $this.$router.push({ path: "/product_details" });
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
  background-color: #f1f1f2;
  width: 100%;
  .text-align-font {
    text-align: center;
    font-size: 16px;
    line-height: 10rem;
  }
  .c1 {
    color: #2b0405;
  }
  .wholeYe {
    background-color: #f1f1f1;
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
    width: 100%;
    height: 18rem;
    // background: white;
    position: relative;
    background: url("http://yykj-wufu.oss-cn-beijing.aliyuncs.com/uploads/ueditor/image/20180929/1538208120849636.jpg")
      no-repeat center; //不要改，vue开发环境和生产环境图片路径不同，线上这个路径有图片
    background-size: 100% 18rem;
  }
  .top1 {
    height: 21rem;
    position: relative;
    // background-color: #fff;

    .otherTop {
      text-align: center;
      padding-top: 1.5rem;
      .successRob {
        line-height: 2rem;
        font-size: 1.2rem;
      }

      .fxThree {
        display: flex;
        margin-top: 1.5rem;
        height: 13rem;
        align-content: center;
        justify-content: center;
        text-align: center;

        .colf {
          width: 35%;
          margin: 1%;
          height: 100%;
          align-content: center;
          justify-content: center;
          position: relative;
          border-radius: 0.5rem;
        }
        .leftBuy {
          background-image: url("http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180928/1538121217881795.png");
          background-size: contain;
        }
        .centerRob {
          background-image: url("http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180928/1538121223229741.png");
          background-size: contain;
        }
        .rightBuy {
          background-image: url("http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180928/1538121231598542.png");
          background-size: contain;
        }
        .btnYellow {
          width: 65%;
          height: 2rem;
          line-height: 2rem;
          border: 1px solid #2e0406;
          color: #000;
          border-radius: 1.2rem;
          font-size: 0.8rem;
          text-align: center;
          margin: 2rem auto 0;
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translate(-50%);
        }
        .Bgred {
          background-color: #ffb011;
          border: 1px solid #ffb011;
          border: none;
        }
      }
    }
  }
  // .bgt {
  //   // width: 18rem;
  //   width: 100%;
  //   height: 100%;
  //   margin: 0 auto;
  //   background: url("http://yykj-wufu.oss-cn-beijing.aliyuncs.com/uploads/ueditor/image/20180929/1538208120849636.jpg")
  //     no-repeat center; //不要改，vue开发环境和生产环境图片路径不同，线上这个路径有图片
  //   background-size: contain;
  // }
  .link {
    font-size: 1rem;
    color: #2e0406;
    box-sizing: border-box;
    height: 4.5rem;
    width: 100%;
    background-color: rgba(251, 212, 140, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 22;

    img {
      margin-left: 0.5rem;
      width: 2rem;
      height: 2rem;
    }
  }
  .link > p:first-child {
    width: 60%;
    height: 3.5rem;
    margin: 1rem 0 0 1rem;
    padding: 0 !important;
  }
  .link > p:last-child {
    padding: 1rem 0 0 0;
    font-size: 1rem;
    width: 50%;
    height: 3rem;
    color: #000;
    border-radius: 2rem;
    letter-spacing: 0.05rem;

    span {
      font-size: 28px;
      color: rgb(100, 100, 100);
      margin-left: 5%;
    }
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
    left: 3.5rem;
    top: 0.25rem;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
  }
  .launch > div {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-size: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /*进度条部分样式*/
  .progress {
    min-height: 7.5rem;
    padding-top: 1.5rem;
    background-color: #fff;
  }

  .eggprog {
    background: url("../../img/egg.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    left: 0.5rem;
  }

  .progress .searchProgress {
    padding: 0.85rem 2rem 0 2rem;
  }
  .specialfont {
    color: #840c32 !important;
  }
  .topTwo {
    background: #fff;
    height: 20rem;
    // margin-top: 2.5rem;
    position: relative;
    .commonit {
      margin: 2rem auto 0;
      height: 11rem;
      width: 100%;
      .reGuan {
        position: absolute;
        left: 60%;
        width: 30%;
        height: 18%;
        top: 0.2rem;
      }
      .eggChicken {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 0;
        width: 6rem;
        height: 6rem;
      }
      .imgEr {
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 30%;
      }
    }
    .otherTop {
      text-align: center;
      .successRob {
        line-height: 2rem;
        font-size: 20px;
      }
      .canBuy {
        line-height: 2rem;
        font-size: 18px;
      }
      .guanZhu {
        line-height: 1.5rem;
        font-size: 18px;
      }
      .recodeBuy {
        margin: 0 auto;
        align-items: center;
        justify-content: center;
        img {
          width: 6rem;
          height: 6rem;
          margin: 0 1rem 0.5rem 1rem;
        }
      }
    }
  }
  .progress .butt {
    width: 8rem;
    height: 2.5rem;
    background-color: #ffb011;
    margin: 1.5rem auto;
    color: #2e0406;
    font-size: 0.9rem;
    text-align: center;
    line-height: 2.5rem;
    border-radius: 1.2rem;
  }

  .progressOne {
    height: 10rem;
    margin-top: 1rem;
    background-color: #fff;
    .text-Ali {
      line-height: 2.5rem;
      font-size: 16px;
      text-align: center;
      span {
        font-size: 18px;
        color: #840c32;
      }
    }
    .font12 {
      font-size: 14px;
      line-height: 1rem;
    }
    .splitY {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-left: 1rem;

      .buttOne {
        width: 35%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        margin-top: 2rem;
        margin-right: 1rem;
        background-color: #ffb011;
        border-radius: 1.4rem;
      }
      .whiteCol {
        background-color: #fff;
        border: 1px solid #840c32;
        color: #840c32;
      }
      .redCol {
        background-color: #ffb011;
        border: 1px solid #ffb011;
        color: #2e0406;
      }
    }
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
  .bottomEWM {
    min-height: 4rem;
    box-sizing: border-box;
    margin-top: 0.2rem;
    padding-top: 0.5rem;
    background-color: #fff;
    text-align: center;

    .MyTeam {
      text-align: left;
      line-height: 2rem;
      font-size: 16px;
      padding-left: 1.5rem;
    }

    div {
      margin: 0 auto;
      height: 11rem;
      width: 100%;
      .reGuan {
        position: absolute;
        left: 60%;
        width: 30%;
        height: 18%;
        top: 0.2rem;
      }
      .eggChicken {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 0;
        width: 6rem;
        height: 6rem;
      }
      .imgEr {
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 30%;
      }
    }
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
    left: 0;
    right: 0;
    bottom: 0;
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
  .hintmodel {
    background: #fff;
    width: 70%;
    // height: 13rem;
    margin: 0 auto;
    padding: 1rem;
    color: #0b0b0b;
    font-size: 0.8rem;
    border-radius: 0.7rem;
    z-index: 999;
    position: fixed;
    top: 20%;
    left: 10%;

    .infoTitle {
      text-align: center;
      line-height: 2rem;
      font-size: 18px;
    }
    .inofMoy {
      text-align: center;
      line-height: 2rem;
      font-size: 14px;
      margin-bottom: 1.5rem;
    }
    .infoPer {
      line-height: 1rem;
    }
    .goByBtns {
      width: 100%;
      height: 3rem;
      text-align: center;
      .goByBtnIn {
        width: 40%;
        height: 2rem;
        line-height: 2rem;
        display: block;
        padding: 0.2rem;
        margin: 1rem auto;

        font-size: 14px;
        border-radius: 0.4rem;
        border: 1px solid #000;
      }
    }
  }
  .hintBoxShare {
    text-align: center;
    background: #ffffff;
    width: 70%;
    margin: 0 18% 0 18%;
    color: #0b0b0b;
    font-size: 0.8rem;
    border-radius: 0.6rem;
    z-index: 966;
    position: absolute;
    left: 0;
    top: 20%;
    .mbicon {
      width: 100%;
      height: 100%;
    }
    .attenShare {
      p {
        line-height: 1rem;
        font-size: 14px;
      }
      p:first-child {
        line-height: 2rem;
        font-size: 18px;
      }
      .redBtn {
        color: #bd2021;
        font-size: 20px;
      }
    }
    .quera {
      display: flex;
      width: 100%;
      margin-top: 1rem;

      padding-bottom: 2rem;
      text-align: center;
      div {
        width: 4rem;
        height: 100%;
        margin: 2%;
        margin: 0 auto;

        .commit {
          height: 4rem;
          line-height: 2.5rem;
          width: 100%;
          border-radius: 50%;
          color: #ffb011;
          border: 1px solid #ffb011;
          p:last-child {
            line-height: 0;
            font-size: 16px;
            color: #ffb011;
          }
        }
        .orderDe {
          font-size: 12px;
          margin: -5px !important;
          margin-top: 0.5rem !important;
        }
      }
    }
    .yeloBtns {
      height: 3rem;
      line-height: 3rem;
      font-size: 16px;
      border-top: 0.1rem solid #eee;
      background-color: #fff;
      margin-top: 0.5rem;
      color: #ffb011;
      border-radius: 0.4rem;
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
    left: 0;
    right: 0;
    bottom: 0;
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

  /*领取提醒*/
  .getRemind {
    background: #fff;
    width: 90%;
    height: 15rem;
    color: #000;
    text-align: center;
    position: fixed;
    padding: 0.3rem;
    top: 20%;
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
