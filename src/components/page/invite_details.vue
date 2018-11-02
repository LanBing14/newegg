<template>
  <div id="invite_details" :style="{backgroundImage:'url('+img+')'}">
    <img src="../../img/bg1.png" alt="" class="caizhi">
    <!--邀请-->
    <div class="inviteBg">
      <div class="invite inviteTop" v-for="(lists,i) in list">
        <ul>
          <li style="text-align: center;">
            <div class="circle"></div>
            <p class="name">微信昵称：{{lists.username}}</p>
          </li>
          <li>
            <div class="circle"></div>
            <div class="phoneInfo">
              <!--<p class="phone">131*******1111</p>-->
              <p class="phone">{{lists.phone}}</p>
              <p class="money">下单金额
                <span>￥{{lists.orderNumber}}</span>
              </p>
            </div>
          </li>
          <li>
            <div class="circle"></div>
            <div class="phoneInfo">
              <p class="phone">TA推荐
                <span>{{lists.invitedNumber}}</span>人</p>
              <p class="money">获得赏金
                <span>￥{{lists.sumNumber}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--分享按钮-->
    <div class="share" @click="shareFr">分享好友赚赏金</div>

     <!-- 蒙版 -->
    <div class="Meng" id="box" v-if="isShow" @click="hideToggle"></div>
    <img src="../../img/shareHint.png" alt="" class="shareHint" v-if="isShow" @click="hideToggle">
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
import qs from "qs";
import wx from "weixin-js-sdk";
export default {
  name: "invite_details",
  data() {
    return {
      list: [],
      sumNumber: "",
      orderNumber: "",
      username: "",
      phone: "",
      invitedNumber: "",
      img: require("../../img/bg1-1.png"),
      sendOpenid: "",
      isShow: false
    };
  },
  methods: {
    //返回上一界面“邀请明细”
    goBack() {
      this.$router.push({ path: "/" });
    },
    shareFr() {
      this.isShow = true;
    },
    hideToggle() {
      this.isShow = false;
    },
    getInviteDetails() {
      var $this = this;
      var baseUrl = BaseUrl + "/api/invitedInfo";
      var data = qs.stringify({
        openid: localStorage.getItem("openid"),
        several: this.$route.query.several
      });
      console.log(data);
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      })
        .then(function(data) {
          console.log(data);

          let datas = data.data.data;
          if (data.data.status == 1) {
            //                  alert(data.data.msg)
            $this.list = datas;
          } else {
            Toast({
              message: datas.msg,
              duration: 1500
            });
          }
        })
        .catch(function() {
          //alert("程序异常，联系技术人员")
        });
    },
    //微信自定义分享
    WxZd() {
      //获取微信请求的字段
      const openid = localStorage.getItem("openid");

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
          var $this = this;
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
          wx.ready(function() {
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title: "大家请看我今天赚了多少钱", // 分享标题
              desc: "我就分享了一下伍福世嘉的绿色无抗鸡蛋就狠赚了一笔", // 分享描述
              link:
                "http://egg.wufuapp.com?openid=" +
                $this.sendOpenid +
                "&makeMoney=100&onlyMine=100",
              imgUrl:
                "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180912/1536745700851746.png", // 分享图标
              type: "", // 分享类型,music、video或link，不填默认为link
              dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              success: function() {
                console.log("已分享给朋友");
              },
              cancel: function() {
                console.log("取消分享朋友");
                // 用户取消分享后执行的回调函数
              },
              fail: function(res) {
                window.alert(JSON.stringify(res));
              }
            });
            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: "厉不厉害？大家看我今天赚了多少钱", // 分享标题
              link:
                "http://egg.wufuapp.com?openid=" +
                $this.sendOpenid +
                "&makeMoney=100&onlyMine=100",
              imgUrl:
                "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180912/1536745700851746.png", // 分享图标
              success: function() {
                console.log("已分享到朋友圈");
              },
              cancel: function() {
                console.log("取消分享朋友圈");
              },
              fail: function(res) {
                window.alert(JSON.stringify(res));
              }
            });
          });
        }.bind(this)
      );
    }
  },
  created() {
    document.title = "邀请明细";
  },
  mounted() {
    this.getInviteDetails();
    this.sendOpenid = localStorage.getItem("openid");
    this.WxZd();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#invite_details {
  background: #e9844d;
  min-height: 41.6rem;
  .caizhi {
    width: 100%;
    display: block;
  }
  .inviteBg {
    min-height: 15.6rem;
    background-size: 23.6rem;
    .invite {
      background: #fff;
      width: 90%;
      margin: 0 auto;
      margin-top: 0.2rem;
      display: flex;
      align-items: center;
      border-radius: 0.3rem;
      ul {
        width: 100%;
        margin: 0.5rem 0;
        list-style-type: none;
        padding: 0;
        overflow: hidden; /*溢出隐藏*/
        white-space: nowrap; /*强制不换行*/
        text-overflow: ellipsis;
        li {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          .name {
            width: 100%;
            font-size: 1rem;
            text-align: center;
          }
          .circle {
            width: 0.6rem;
            height: 0.6rem;
            margin: 0 0.6rem;
            border-radius: 50%;
            background: #e9844d;
          }
          .phoneInfo {
            width: 100%;
            display: flex;
            align-items: center;
            color: #666666;
            font-size: 0.9rem;
            .phone {
              width: 50%;
            }
            .money {
              width: 50%;
              text-align: right;
              padding-right: 0.5rem;
            }
            span {
              color: #cc3e36;
            }
          }
        }
      }
    }
    .inviteTop {
      margin-top: 0.5rem;
    }
  }
  /*分享按钮*/
  .share {
    width: 13.5rem;
    font-size: 1.3rem;
    line-height: 3.5rem;
    background: #ef3c69;
    color: #fff;
    border-radius: 2rem;
    margin: 0 auto;
    margin-top: 6rem;
    text-align: center;
  }
  .Meng {
    opacity: 0.56;
    background: #000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
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
}
</style>
