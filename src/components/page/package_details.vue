<template>
  <div id="package_details">
    <mt-header fixed title="套餐详情" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <!--商品信息-->
    <div class="productInfo">
      <img src="../../img/swiper.png" alt="" class="goodPic">
      <div class="line">
        <p class="name">{{packageInfo.goodsName}}</p>
        <p class="guige">{{packageInfo.number}}枚/{{packageInfo.dateTime}}个月</p>
      </div>
      <p class="money">￥{{packageInfo.sellPrice}}</p>
    </div>
    <!--发货信息-->

    <!--待发货信息-->
    <div class="shipping_information">
      <p class="title">待发货信息</p>
      <div class="waitInfomation" v-for="(item,key) in packageDetails" :key='key'>
        <p class="monthed">{{item.date}}</p>
        <p class="alreadys">{{item.status}}</p>
      </div>
    </div>
    <!--客服-->
    <div class="kefu">若订单有疑问请联系客服热线：17521255679</div>
  </div>
</template>

<script>
import { Header } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
export default {
  name: "package_details",
  data() {
    return {
      packageInfo: "",
      goodsName: "",
      dateTime: "",
      number: "",
      sellPrice: "",
      packageDetails: [],
      date: "",
      status: ""
    };
  },
  methods: {
    //点击跳转上一页面
    goBack() {
      this.$router.push({
        path: "/pay_success",
        query: { orderId: this.$route.query.orderId }
      });
    },
    //点击“已发货”跳转到订单详情
    goOrderDetails() {
      this.$router.push({
        path: "/order_details",
        query: { orderId: this.$route.query.orderId }
      });
    },
    datas() {
      var that = this;
      var baseUrl = BaseUrl + "api/getPackageDetail";
      var data = qs.stringify({
        id: this.$route.query.orderId,
        openid: localStorage.getItem("openid")
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      })
        .then(function(info) {
          console.log(info);
          let datas = info.data;
          if (datas.status == 1) {
            that.packageInfo = datas.data.packageInfo;
            that.packageDetails = datas.data.packageDetails;

            that.date = datas.packageDetails[1].date;
            that.status = datas.packageDetails[1].status;
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
    }
  },
  mounted() {
    this.datas();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#package_details {
  .mint-header {
    background: #cc3e36;
  }
  /*商品信息*/
  .productInfo {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    .goodPic {
      width: 6rem;
      margin: 0.5rem 0;
    }
    .line {
      width: 60%;
      padding-left: 1rem;
      .name {
        width: 100%;
        font-size: 0.9rem;
      }
      .guige {
        width: 100%;
        margin-top: 1rem;
        color: #c1c5c8;
        font-size: 0.8rem;
      }
    }
    .money {
      right: 1rem;
      position: relative;
      float: right;
      color: #cc3e36;
      font-size: 1.3rem;
      width: 30%;
      text-align: right;
    }
  }
  .shipping_information {
    .title {
      background: #f0f0f2;
      font-size: 1rem;
      line-height: 2rem;
      padding-left: 1rem;
    }
    /*发货信息*/
    .goInformation {
      height: 3rem;
      display: flex;
      align-items: center;
      background: #fff;
      font-size: 0.9rem;
      .month {
        width: 60%;
        padding-left: 1rem;
      }
      .already {
        width: 40%;
        text-align: right;
      }
    }
    /*待发货信息*/
    .waitInfomation {
      display: flex;
      align-items: center;
      color: #cc3e36;
      background: #ffffff;
      border-bottom: 1px solid #c1c5c8;
      font-size: 0.9rem;
      line-height: 2.5rem;
      .monthed {
        width: 60%;
        padding-left: 1rem;
      }
      .alreadys {
        width: 50%;
        padding-right: 1rem;
        text-align: right;
      }
    }
  }
  /*客服*/
  .kefu {
    width: 100%;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    line-height: 2rem;
    text-align: center;
    background: #f0f0f2;
  }
}
</style>
