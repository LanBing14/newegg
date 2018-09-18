<template>
  <div id="make_money">
    <div class="bgBox">
      <div class="box box1">
        <p class="p1">我的好友下单</p>
        <p class="p2">奖7%</p>
      </div>
      <div class="box box2">
        <p class="p1">TA的好友下单</p>
        <p class="p2">奖6%</p>
      </div>
      <div class="box box3">
        <p class="p1">TA的好友下单</p>
        <p class="p2">奖5%</p>
      </div>
    </div>
    <!--滚轮公告-->
    <div class="marquee_box">
      <ul class="marquee_list" :style="{ top: -Num + 'px'}" :class="{marquee_top:Num}">
        <!-- 当显示最后一条的时候（Num=0转换布尔类型为false）去掉过渡效果-->
        <li v-for="(lists,i) in list" :key="i">
          <p>{{lists.username}}邀请{{lists.num}}人成功赚了{{lists.sumNum}}元</p>
        </li>
      </ul>
    </div>
    <!--分享按钮-->
    <div class="share" @click="shareFrend">分享好友赚赏金</div>
    <p class="check" @click="goRecord">查看我的邀请</p>

    <!-- 蒙版 -->
    <div class="Meng" id="box" v-if="isShow" @click="hideToggle"></div>
    <img src="../../img/shareHint.png" alt="" class="shareHint" v-if="isShow" @click="hideToggle">
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import wx from "weixin-js-sdk";
export default {
  name: "make_money",
  data() {
    return {
      list: [],
      num: "",
      sumNum: "",
      username: "",
      Num: 0,
      isShow: false,
      sendOpenid: "",
      marqueeList: [
        {
          name: "1军",
          city: "北京",
          amount: "10"
        },
        {
          name: "2军",
          city: "上海",
          amount: "20"
        },
        {
          name: "3军",
          city: "广州",
          amount: "30"
        },
        {
          name: "4军",
          city: "重庆",
          amount: "40"
        }
      ]
    };
  },
  methods: {
    //返回上一界面“商品详情”
    goBack() {
      this.$router.push({ path: "/" });
    },
    hideToggle() {
      this.isShow = false;
    },
    //点击“查看邀请”跳转到邀请详情页面
    goRecord() {
      this.$router.push({ path: "/Invited_record" });
    },
    showMarquee: function(Num) {
      this.marqueeList.push(this.marqueeList[0]);
      var max = this.marqueeList.length;
      var that = this;
      var marqueetimer = setInterval(function() {
        Num++;
        if (Num >= max) {
          Num = 0;
        }
        that.Num = Num * 30;
      }, 1000);
    },
    //获取公告信息
    getNoticeList() {
      var $this = this;
      var baseUrl = BaseUrl + "api/getIncomeList";
      var data = qs.stringify({
        openid: localStorage.getItem("openid")
      });
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
    getQueryString(name, url) {
      url = url || window.location.search.substr(1);
      console.log(url);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = url.match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    //微信自定义分享 lyt
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
    },
    shareFrend() {
      // alert(1);
      this.isShow = true;
    }
  },
  mounted() {
    document.title = "赚赏金";

    this.sendOpenid = localStorage.getItem("openid");

    this.getNoticeList();
    this.showMarquee(this.Num);
    this.WxZd();
  },
  created() {},
  components: {}
};
</script>

<style lang="scss" scoped>
#make_money {
  background: #e9844d;
  min-height: 41.6rem;
  .mint-header {
    background: #ffffff;
    color: #000;
  }
  .makebg {
    width: 100%;
    display: block;
    margin-top: -0.5rem;
  }
  .bgBox {
    width: 100%;
    background: url("http://egg.wufuapp.com/static/img/makeMoney.ceff3a0.png")
      no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    display: inline-block;
    .box {
      width: 100%;
      .p1 {
        color: #86411c;
        font-size: 1rem;
      }
      .p2 {
        color: #f3e926;
        font-size: 1.1rem;
      }
    }
    .box1 {
      width: 7rem;
      padding-left: 9.5rem;
      display: inline-block;
      margin-top: 12.4rem;
    }
    .box2 {
      width: 7rem;
      padding-left: 17rem;
      margin-top: 2.5rem;
    }
    .box3 {
      margin-top: 3.8rem;
      text-align: right;
      width: 40%;
    }
  }
  /*滚轮公告*/
  .roller_announcement {
    text-align: center;
    width: 76%;
    height: 3.5rem;
    font-size: 0.9rem;
    color: #662908;
    margin: 1rem auto;
    line-height: 1.2rem;
  }

  ul {
    list-style: none;
    width: 100%;
  }
  .marquee_box {
    display: block;
    position: relative;
    width: 100%;
    text-align: center;
    color: #662908;
    margin: 1rem auto;
    height: 4rem; /*关键样式*/
    overflow: hidden;
  }
  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
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
    text-align: center;
  }
  .check {
    width: 25.3%;
    text-align: center;
    margin: 0 auto;
    margin-top: 0.5rem;
    color: #954c24;
    font-size: 0.9rem;
    border-bottom: 1px solid #954b24;
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
