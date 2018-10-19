<template>
  <div id="order_confirmation">
    <mt-header fixed title="订单确认" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <!--收货人信息-->
    <div class="Consignee" @click="goAddress">
      <img src="../../img/map.png" class="sign">
      <div class="messages">
        <p class="name">{{receiver}}
          <span class="phone">{{phone}}</span>
        </p>
        <p class="address">{{province}}{{city}}{{county}}{{detail}}</p>
      </div>
      <img src="../../img/right.png" alt="" class="right">
    </div>
    <!--提示-->
    <div class="hintBox">
      <img src="../../img/jingao.png" alt="" class="jingao">
      <p class="hint">由于鸡蛋的配送的特殊性，部分地区暂时不能购买<br>
        <span>新疆、西藏、青海、海南、港澳地区</span>
      </p>
    </div>
    <!--商品信息-->
    <div class="productInfo">
      <img src="../../img/swiper.png" alt="" class="goodPic">
      <div class="line1">
        <p class="name">{{packageInfo.goodsName}}</p>
        <p class="money">￥{{packageInfo.sellPrice}}</p>
      </div>
      <div class="line2">
        <p class="guige">{{packageInfo.number}}枚/{{packageInfo.dateTime}}个月</p>
        <p class="num">{{number}}</p>
      </div>
    </div>
    <!--商品其他-->
    <div class="others">
      <div class="total">
        <p class="left">商品合计</p>
        <p class="right">￥{{totalPrice}}</p>
      </div>
      <div class="total">
        <p class="left">运费</p>
        <p class="right">{{freight}}</p>
      </div>
      <div class="total">
        <p class="left">买家留言</p>
        <input type="text" class="infos" placeholder="请留言" v-model="sName">
      </div>
    </div>
    <!--支付-->
    <div class="payInfo">
      <div class="txtTips">在上方填写收货地址后付款</div>
      <div class="need">需付金额
        <span>￥{{totalPrice}}</span>
      </div>
      <mt-button class="pay" style="height:60px;border-radius:0" v-if="isPaying" type="danger" @click="goPay">去支付</mt-button>
      <mt-button class="pay2" style="height:60px;border-radius:0" disabled v-else type="default">支付中</mt-button>

      <!--       <button class="pay" style="border:none" readonly @click="goPay">去支付</button>
 -->
    </div>
    <!--蒙版-->
    <!--<div class="box" id="box" v-show="isShow" @click="hideToggle"></div>-->
    <!--支付方式-->
    <!--<div class="payWays" v-show="isShow">
      <div class="line1">
        <p class="needPay">需支付</p>
        <p class="money">￥{{totalPrice}}</p>
      </div>
      <p class="pleaseChoose">请选择支付方式</p>
      <div class="line2">
        <img src="../../img/zhifubao.png" alt="" class="zhifubao">
        <p class="p1">支付宝支付</p>
        <div class="yuan" @click="goChoice1">
          <img src="../../img/gouxuan.png" alt="" class="choice" v-show="gouxuan">
        </div>
      </div>
      <div class="line2 line3">
        <img src="../../img/weixin.png" alt="" class="weixin">
        <p class="p2">微信支付</p>
        <div class="yuan" @click="goChoice2">
          <img src="../../img/gouxuan.png" alt="" class="choice" v-show="weigouxuan">
        </div>
      </div>
      <div class="payNow" @click="goPay">立即支付</div>

    </div>-->
  </div>
</template>

<script>
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "axios";
import qs from "qs";
import wx from "weixin-js-sdk";
export default {
  name: "order_confirmation",
  data() {
    return {
      isShow: false, //支付方式的显示隐藏
      gouxuan: true, //选中
      weigouxuan: false, //未选中
      imposeProvince: [],
      winterLateProvince: [],
      address: "",
      packageInfo: "",
      number: "",
      freight: "",
      totalPrice: "",
      isPaying: true,
      packageId: "",
      goodsId: "",
      openid: "",
      receiver: "", //收货人
      phone: "", //手机号
      province: "", //省份
      city: "", //城市
      county: "", //区
      detail: "", //详细地址
      orderId: "",
      sName: "",
      sellPrice: ""
    };
  },
  methods: {
    //  返回上一级页面
    goBack() {
      this.$router.push({
        path: "/"
      });
    },
    // 点击地址信息块跳转到‘创建地址’页面
    goAddress() {
      this.$router.push({
        path: "/create_address",
        query: {
          packageId: this.packageId,
          statusId: 0,
          number: this.amount,
          openid: this.openid,
          sellPrice: this.sellPrice
        }
      });
    },
    //点击"支付按钮"调用支付接口
    goPay() {
      if (
        this.province == "" ||
        this.phone == "" ||
        this.detail == "" ||
        this.city == "" ||
        this.receiver == "" ||
        this.detail == ""
      ) {
        Toast({
          message: "收货地址不能为空",
          duration: 1500
        });
        return;
      }
      // this.$router.push({path:'/pay_success'});
      var $this = this;
      var baseUrl = BaseUrl + "api/buy";
      var data = qs.stringify({
        goodsId: 17,
        packageId: this.packageId,
        number: this.amount,
        openid: this.openid,
        remark: $this.sName,
        totalPrice: $this.totalPrice,
        aid: this.address.id
      });

      this.packageId = this.$route.query.packageId;
      this.amount = this.$route.query.number;
      this.openid = localStorage.getItem("openid");
      this.sellPrice = this.$route.query.sellPrice;

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        let datas = data.data.data;

        $this.orderSn = data.data.data.orderSn;
        if (data.data.status == 1) {
          $this.orderId = datas.orderId;
          $this.goPays();
        }
      });
    },
    goPays() {
      this.isPaying = false;
      var $this = this;
      axios
        .get(
          "http://wufuapp.com/index.php/api_egg/Weixinpay/index?openid=" +
            this.openid +
            "&price=" +
            this.totalPrice +
            "&remark=" +
            this.packageInfo.goodsName +
            "&orderSn=" +
            this.orderSn
        )
        .then(function(data) {
          let datas = data.data.data;

          if (data.data.status == 1) {
            $this.onBridgeReady(datas);
          }
        });
    },
    //获取订单

    onBridgeReady(data) {
      var $this = this;

      //支付成功，跳转到支付支付成功页面

      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: "MD5", //微信签名方式：
          paySign: data.paySign //微信签名
        },
        function(res) {
          $this.isPaying = true;
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            axios
              .get(
                "http://wufuapp.com/index.php/api_egg/Weixinpay/H5Notify?out_trade_no=" +
                  $this.orderSn
              )
              .then(function(data) {
                $this.$router.push({
                  path: "pay_success",
                  query: { orderId: $this.orderId, money: data.data.data.money }
                });
              })
              .catch(function() {
                //alert("程序异常，联系技术人员")
              });

            //支付成功，跳转到支付支付成功页面
          }
        }
      );
    },
    login: function() {
      var $this = this;
      var baseUrl = BaseUrl + "api/preOrder";
      var data = qs.stringify({
        goodsId: 17,
        packageId: this.packageId,
        number: this.amount,
        openid: this.openid
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        console.log(data);
        let datas = data.data.data;
        if (data.data.status == 1) {
          $this.address = datas.address;
          $this.packageInfo = datas.packageInfo;
          $this.freight = datas.freight;
          $this.totalPrice = datas.totalPrice;

          $this.number = datas.number;
          $this.packageId = datas.packageId;
          $this.goodsId = datas.goodsId;
          $this.imposeProvince = datas.imposeProvince[0];
          $this.winterLateProvince = datas.winterLateProvince[0];
        }
      });
    },
    Address() {
      var $this = this;
      var baseUrl = BaseUrl + "/api/getAddressList";
      var data = qs.stringify({
        openid: this.openid
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        let datas = data.data.data;

        if (data.data.status == 1) {
          for (var i in datas) {
            if (datas[i].isDefault == 1) {
              $this.receiver = datas[i].receiver; //收货人
              $this.phone = datas[i].phone; //手机号
              $this.province = datas[i].province; //省份
              $this.city = datas[i].city; //城市
              $this.county = datas[i].county; //区
              $this.detail = datas[i].detail; //详细地址
            }
          }
        }
      });
    }
  },
  mounted() {
    this.packageId = this.$route.query.packageId;
    this.amount = this.$route.query.number;
    this.openid = localStorage.getItem("openid");
    this.sellPrice = this.$route.query.sellPrice;
    this.login();
    this.Address();
  },
  created() {},
  components: {}
};
</script>

<style lang="scss" scoped>
#order_confirmation {
  background: #f0f0f2;
  .mint-header {
    background: #cc3e36;
  }
  /*收货人信息*/
  .Consignee {
    background: #ffffff;
    display: flex;
    align-items: center;
    margin-top: 3rem;
    padding: 0.5rem 0.5rem;
    border-bottom: 1px solid #c1c5c8;
    .sign {
      width: 1.6rem;
      height: 1.7rem;
    }
    .messages {
      width: 82%;
      padding-left: 0.8rem;
      .name {
        font-size: 1rem;
        .phone {
          margin-left: 1rem;
        }
      }
      .address {
        width: 95%;
        color: #c1c5c8;
        font-size: 0.8rem;
      }
    }
    .right {
    }
  }
  /*提示*/
  .hintBox {
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.7rem;
    .jingao {
      width: 1.3rem;
    }
    .hint {
      width: 80%;
      margin-left: 1rem;
      font-size: 0.9rem;
      span {
        color: #cc3e36;
      }
    }
  }
  /*商品信息*/
  .productInfo {
    background: #ffffff;
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .goodPic {
      width: 5rem;
      margin: 0.5rem;
    }
    .line1 {
      width: 70%;
      font-size: 0.9rem;
      margin-top: -2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        width: 13rem;
        margin-right: 1rem;
      }
      .money {
        position: relative;
        width: 33%;
        text-align: right;
        overflow: hidden;
      }
    }
    .line2 {
      margin-top: -3rem;
      font-size: 0.8rem;
      width: 68%;
      margin-left: 6rem;
      display: flex;
      align-items: left;
      justify-content: left;
      color: #c1c5c8;
      .guige {
        width: 50%;
        margin-right: 4rem;
      }
      .num {
        text-align: right;
        width: 27%;
        right: 0.1rem;
        position: relative;
      }
    }
  }
  /*商品其他*/
  .others {
    background: #ffffff;
    margin-bottom: 3.5rem;
    font-size: 0.9rem;
    margin-top: 1rem;
    .total {
      display: flex;
      align-items: center;
      height: 3rem;
      border-bottom: 1px solid #c1c5c8;
      .left {
        width: 50%;
        text-align: left;
        padding-left: 1rem;
      }
      .right {
        width: 50%;
        text-align: right;
        padding-right: 1rem;
      }
      .infos {
        width: 97%;
        font-size: 0.9rem;
        font-family: PingFang-SC-Medium;
        color: #666666;
        line-height: 1.8rem;
        margin-left: -5rem;
      }
    }
  }
  /*支付*/
  .payInfo {
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    .need {
      width: 70%;
      font-size: 1rem;
      text-align: right;
      padding-right: 1rem;
      span {
        font-size: 1.2rem;
        color: #cc3e36;
      }
    }
    .pay {
      width: 30%;
      background: #cc3e36;
      color: #fff;
      font-size: 1.4rem;
      line-height: 3.5rem;
      text-align: center;
    }
    .pay2 {
      width: 30%;
      font-size: 1.4rem;
      line-height: 3.5rem;
      text-align: center;
    }
    .txtTips {
      position: absolute;
      width: 29%;
      font-size: 14px;
      text-align: center;
      color: #666;
      top: 50%;
      transform: translateY(-50%);
      left: 0px;
    }
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
  }
  /*支付方式*/
  .payWays {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 14rem;
    bottom: 0;
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    .line1 {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c1c5c8;
      font-size: 1.2rem;
      line-height: 3rem;
      .needPay {
        width: 50%;
        padding-left: 1rem;
      }
      .money {
        width: 50%;
        text-align: right;
        color: #cc3e36;
        padding-right: 1rem;
      }
    }
    .pleaseChoose {
      font-size: 0.9rem;
      line-height: 1.5rem;
      color: #c1c5c8;
      padding-left: 1rem;
    }
    .line2 {
      display: flex;
      align-items: center;
      font-size: 1rem;
      padding-left: 1rem;
      .zhifubao {
        width: 2.3rem;
      }
      .weixin {
        width: 2rem;
      }
      .p1 {
        padding-left: 0.5rem;
        width: 76%;
      }
      .p2 {
        padding-left: 0.6rem;
        width: 76.8%;
      }
      .yuan {
        border-radius: 50%;
        border: 1px solid #c1c5c8;
        width: 1.5rem;
        height: 1.5rem;
        .choice {
          width: 1.67rem;
          height: 1.7rem;
          margin-top: -0.1rem;
          margin-left: -0.1rem;
        }
      }
    }
    .line3 {
      padding-left: 1.1rem;
    }
    .payNow {
      width: 100%;
      border-top: 1px solid #c1c5c8;
      color: #cc3e36;
      font-size: 1.2rem;
      position: fixed;
      bottom: 0;
      text-align: center;
      line-height: 3rem;
    }
  }
}
</style>