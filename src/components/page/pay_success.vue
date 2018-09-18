<template>
  <div id="pay_success">
    <mt-header fixed title="支付成功" style="font-size:1.2rem;height: 3rem;"></mt-header>
    <!--支付成功-->
    <div class="paySuccess">
      <img src="../../img/zhifuchenggong.png" alt="" class="success">
      <p class="pay_ture">支付成功</p>
      <div class="mealDetail" @click="goPackageDetails">
        <p class="detail">套餐详情</p>
        <img src="../../img/right.png" alt="">
      </div>
    </div>
    <!--分享好友提醒按钮-->
    <div class="shareFriend" @click="goShare">
      <p>分享好友购买可赚</p>
      <p class="money">￥{{money}}</p>
    </div>
    <!--收入榜单-->
    <div class="incomeList">
      <p class="incomeTitle">收入榜单</p>

      <div class="list" v-for="(lists,i) in lists" :key="i">
        <img src="../../img/swiper.png" alt="" class="touxiang">
        <img src="../../img/huangguan2.png" alt="" style="width: 1.8rem;left: -1.6rem;top: -1.6rem;position: relative;">
        <div class="income incomeBox">
          <p class="phone">{{lists.phone}}</p>
          <p class="shareSuccess">成功分享{{lists.num}}人</p>
        </div>
        <p class="incomeTotal">累计收入 {{lists.sumNum}}元</p>
      </div>

      <div class="list" v-for="(lists,i) in listss" :key="i">
        <img src="../../img/swiper.png" alt="" class="touxiang">
        <img src="../../img/huangguan3.png" alt="" style="width: 1.8rem;left: -1.6rem;top: -1.6rem;position: relative;">
        <div class="income incomeBox">
          <p class="phone">{{lists.phone}}</p>
          <p class="shareSuccess">成功分享{{lists.num}}人</p>
        </div>
        <p class="incomeTotal">累计收入 {{lists.sumNum}}元</p>
      </div>

      <div class="list" v-for="(lists,i) in listsss" :key="i">
        <img src="../../img/swiper.png" alt="" class="touxiang">
        <img src="../../img/huangguan1.png" alt="" style="width: 1.8rem;left: -1.6rem;top: -1.6rem;position: relative;">
        <div class="income incomeBox">
          <p class="phone">{{lists.phone}}</p>
          <p class="shareSuccess">成功分享{{lists.num}}人</p>
        </div>
        <p class="incomeTotal">累计收入 {{lists.sumNum}}元</p>
      </div>

      <div class="list" v-for="(lists,i) in list" :key="i">
        <img src="../../img/swiper.png" alt="" class="touxiang">

        <div class="income incomeBox">
          <p class="phone">{{lists.phone}}</p>
          <p class="shareSuccess">成功分享{{lists.num}}人</p>
        </div>
        <p class="incomeTotal">累计收入 {{lists.sumNum}}元</p>
      </div>

    </div>
  </div>
</template>

<script>
import { Header } from "mint-ui";
import axios from "axios";
import qs from "qs";
import wx from "weixin-js-sdk";

export default {
  name: "pay_success",
  data() {
    return {
      list: [],
      lists: [],
      listss: [],
      listsss: [],
      listssss: [],
      num: "",
      sumNum: "",
      username: "",
      phone: "",
      money: 0
    };
  },
  methods: {
    //点击跳转商品详情
    goPackageDetails() {
      console.log(this.$route.query.orderId);
      this.$router.push({
        path: "/package_details",
        query: { orderId: this.$route.query.orderId }
      });
    },
    //获取榜单信息
    getIncomeList() {
      var $this = this;
      var OPENID = localStorage.getItem("openid");
      var baseUrl = BaseUrl + "index/getIncomeList?openid=" + OPENID;
      //      var data = qs.stringify({
      //        openid: "oX6js0WrM2E-Pbz0tg3ltsDdPByY"
      //      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json"
        //        data: data
      })
        .then(function(data) {
          console.log(data);
          let datas = data.data.data;
          if (data.data.status == 1) {
            var compare = function(prop) {
              return function(obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (val1 > val2) {
                  return -1;
                } else if (val1 < val2) {
                  return 1;
                } else {
                  return 0;
                }
              };
            };
            $this.list = datas.sort(compare("num"));
            if ($this.list.length > 4) {
              $this.lists.push($this.list[0]);
              $this.listss.push($this.list[1]);
              $this.listsss.push($this.list[2]);
              $this.listssss.push($this.list[3]);
              $this.list = $this.list.splice(0, 4);
            } else {
              if ($this.list.length == 1) {
                $this.lists.push($this.list[0]);
              } else if ($this.list.length == 2) {
                $this.lists.push($this.list[0]);
                $this.listss.push($this.list[1]);
              } else if ($this.list.length == 3) {
                $this.lists.push($this.list[0]);
                $this.listss.push($this.list[1]);
                $this.listsss.push($this.list[2]);
              } else if ($this.list.length == 4) {
                $this.lists.push($this.list[0]);
                $this.listss.push($this.list[1]);
                $this.listsss.push($this.list[2]);
                $this.listssss.push($this.list[3]);
              }

              $this.list = [];
            }
            //根据num值判断皇冠排序(4种)
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
    //点击分享
    goShare() {
      //            this.wxShare(title, desc, link, imgUrl);
      this.$router.push({ path: "/" });
    },

    //微信自定义分享
    wxShare(desc) {
      wx.config({
        debug: false,
        appId: "wx1682b43a75def160",
        timestamp: "1536305784",
        nonceStr: "MLQWoT0VkQsUThA2",
        signature: "ddf527bd31f08bd2e722ce350d300c4493b2f57f", // res.data是从后台接口返回的xinxi
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "checkJsApi",
          "startRecord",
          "stopRecord",
          "translateVoice",
          "scanQRCode",
          "openCard"
        ]
      });
      wx.ready(function() {
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: "仅30枚！鸡蛋免费抢啦~我只能帮你到这了", // 分享标题
          desc:
            "绿壳无抗乌鸡蛋，30枚免费抢，数量有限，先抢先得、好吃好玩好赚钱", // 分享描述
          link: "http://egg.wufuapp.com/#/", // 分享链接
          imgUrl:
            "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180907/1536308595897761.png", // 分享图标
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
          title:
            "仅30枚！绿壳无抗乌鸡蛋免费抢啦，数量有限，先抢先得、好吃好玩好赚钱", // 分享标题
          link: "http://egg.wufuapp.com/#/",
          imgUrl:
            "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180907/1536308595897761.png", // 分享图标
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
    }
  },
  mounted() {
    this.money = this.$route.query.money;
    this.getIncomeList();
    this.wxShare("仅30枚！鸡蛋免费抢啦~我只能帮你到这了");
    this.wxShare(
      "仅30枚！绿壳无抗乌鸡蛋免费抢啦，我还差一些，就抢满了，大家帮帮我"
    );
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#pay_success {
  background: #f0f0f2;
  .mint-header {
    background: #cc3e36;
  }
  /*支付成功*/
  .paySuccess {
    width: 100%;
    height: 9rem;
    background: #ffffff;
    margin-top: 3rem;
    padding-top: 1rem;
    .success {
      width: 3rem;
      height: 3rem;
      display: block;
      margin: 1rem auto;
    }
    .pay_ture {
      text-align: center;
      font-size: 1.3rem;
      color: #cc3e36;
      font-weight: normal;
    }
    .mealDetail {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .detail {
        width: 89%;
        padding-left: 1rem;
        color: #c1c5c8;
      }
      img {
        width: 1.5rem;
      }
    }
  }
  /*分享好友提醒按钮*/
  .shareFriend {
    background: #cc3e36;
    color: #ffffff;
    width: 55%;
    text-align: center;
    margin: 2rem auto;
    padding: 0.2rem 0;
    border-radius: 5rem;
    font-size: 0.9rem;
    .money {
      font-size: 1.2rem;
    }
  }
  /*收入榜单*/
  .incomeList {
    margin: 0 auto;
    background: #f0f0f2;
    overflow: hidden;
    min-height: 24.8rem;
    .incomeTitle {
      padding-left: 1rem;
      color: #be700b;
      font-size: 1.2rem;
    }
    .list {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c1c5c8;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.8rem;
      .touxiang {
        width: 13%;
        border-radius: 50%;
      }
      .incomeBox {
        width: 60%;
        padding-left: 1rem;
        color: #c1c5c8;
        .phone {
          width: 100%;
          line-height: 2rem;
        }
        .shareSuccess {
          font-size: 0.8rem;
          width: 100%;
          line-height: 2rem;
        }
      }
      .income {
        padding-left: 0;
        margin-left: -0.8rem;
      }
      .incomeTotal {
        width: 80%;
        text-align: right;
        line-height: 2rem;
        color: #cc3e36;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
