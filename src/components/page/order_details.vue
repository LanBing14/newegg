<template>
  <div id="order_details">
    <mt-header fixed title="订单详情" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <!--等待买家收货提醒-->
    <div class="waitReceiving">
      <p>等待买家收货</p>
      <div class="btns">
        <!--<div class="applyBtn applyFor">申请退款</div>-->
        <div class="applyBtn active" @click="goEvaluate">确认收货</div>
      </div>
    </div>
    <!--收货人信息-->
    <div class="Consignee">
      <div class="messages">
        <p class="name">{{receiver}}
          <span class="phone">{{phone}}</span>
        </p>
        <div class="add">
          <img src="../../img/map.png" alt="" class="sign">
          <p class="address">{{province}}{{city}}{{county}}{{detail}}</p>
        </div>
      </div>
      <!--<img src="../../img/right.png" alt="" class="right">-->
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
        <p class="num">x1</p>
      </div>
    </div>
    <!--其他-->
    <div class="other">
      <p>配送方式：快递 ￥{{freight}}</p>
      <p>积分抵扣：{{discount? discount:0}}</p>
      <p>买家留言：<input type="text" placeholder="选填" style="width: 75%;font-size: 1rem;line-height: 1.1rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"></p>
    </div>
    <!--合计-->
    <div class="total">
      <p>总计
        <span>￥{{packageInfo.sellPrice}}</span>
      </p>
    </div>
    <!--订单信息-->
    <div class="orderDetails">
      <div class="title">订单信息</div>
      <div class="line">
        <p class="p1">下单时间</p>
        <p class="p2">{{addTime}}</p>
      </div>
      <div class="line">
        <p class="p1">付款时间</p>
        <p class="p2">{{payTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from "mint-ui";
import { MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
export default {
  name: "order_details",
  data() {
    return {
      packageInfo:'',
      goodsName:'',
      dateTime:'',
      number:'',
      sellPrice:'',
      freight:'',
      amount:'',
      addTime:'',
      payTime:'',
      receiver:"",  //收货人
      phone:"",//手机号
      province:"",//省份
      city:"", //城市
      county:"",  //区
      detail:"", //详细地址
    };
  },
  methods: {
    //返回上一级
    goBack() {
      this.$router.push({ path: "/package_details",query:{orderId:this.$route.query.orderId}});
    },
    //点击地址信息一块👉'create_address'
    goAddress() {
      this.$router.push({ path: "/create_address",query:{orderId:this.$router.query.orderId} });
    },
    // 点击确认收货
    goEvaluate() {
      //  先弹出是否确认收货的弹框，再跳转到评价
      MessageBox.confirm('', {
        message: '是否确认收货',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        showCancelButton: true
      }).then(action => {
        if (action == 'confirm') {     //确认的回调
          this.$router.push({ path: "/evaluate" });
        }
      }).catch(err => {
        if (err == 'cancel') {     //取消的回调
          console.log(2);
        }
      });
    },
    datas: function() {
      var $this = this;
      var baseUrl =BaseUrl+"api/getOrderDetail";
      var data = qs.stringify({
        id: this.$route.query.orderId,
        openid: localStorage.getItem("openid")
      });
      console.log(data)
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
         
          let datas = data.data.data;
          if (data.data.status == 1) {
            $this.packageInfo=datas.packageInfo;
            $this.amount=datas.amount;
            $this.addTime=datas.addTime;
            $this.payTime=datas.payTime;
            $this.discount=datas.discount;
            $this.freight=datas.freight;
          } else {
            alert(datas.msg);
          }
        })
        .catch(function() {

        });
    },
    Address(){
      var $this = this;
      var baseUrl=BaseUrl+"api/getAddressList";
      var data=qs.stringify({
              openid:localStorage.getItem("openid"),
      });
      axios({
        method: "post",
        url: baseUrl,
        type: 'json',
        data:data
      }).then(function (data) {
        let datas=data.data.data;
        if(data.data.status==1){
          for (var i in datas){
            if(datas[i].isDefault=1){

              $this.receiver=datas[i].receiver,  //收货人
                $this.phone=datas[i].phone //手机号
              $this.province=datas[i].province //省份
              $this.city=datas[i].city //城市
              $this.county=datas[i].county  //区
              $this.detail=datas[i].detail //详细地址
            }
          }
        }else{
          alert(datas.msg);
        }
      }).catch(function () {
        //alert("程序异常，联系技术人员")
      });
    },
  },
  mounted() {
    this.Address();
    this.datas();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#order_details {
  background: #f0f0f2;
  .mint-header {
    background: #cc3e36;
  }
  /*等待买家收货提醒*/
  .waitReceiving {
    margin-top: 3rem;
    background: #fff;
    padding: 2rem;
    p {
      text-align: center;
      font-size: 1.3rem;
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 65%;
      margin: 0 auto;
      margin-top: 1rem;
      .applyFor {
        margin-right: 0.5rem;
      }
      .applyBtn {
        border: 1px solid #bbb;
        border-radius: 5rem;
        font-size: 0.9rem;
        line-height: 1.8rem;
        width: 6rem;
        text-align: center;
      }
      .active {
        border: 1px solid #cc3e36;
        color: #cc3e36;
      }
    }
  }
  /*收货人信息*/
  .Consignee {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5rem 0.5rem;
    background: #fff;
    .messages {
      width: 95%;
      .name {
        font-size: 1rem;
        .phone {
          margin-left: 1rem;
        }
      }
      .add {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        .sign {
          width: 1.2rem;
          height: 1.3rem;
        }
        .address {
          width: 95%;
          color: #c1c5c8;
        }
      }
    }
  }
  /*商品信息*/
  .productInfo {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #ffffff;
    border-bottom: 1px solid #c1c5c8;
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
        width: 70%;
        margin-right: 1.5rem;
      }
      .money {
        position: relative;
        text-align: right;
        width: 35%;
      }
    }
    .line2 {
      margin-top: -3rem;
      width: 68%;
      margin-left: 6rem;
      display: flex;
      align-items: left;
      justify-content: left;
      color: #c1c5c8;
      .guige {
        width: 50%;
        margin-right: 3rem;
        font-size: 0.8rem;
      }
      .num {
        text-align: right;
        width: 35%;
        position: relative;
        font-size: 0.8rem;
      }
    }
  }
  /*其他*/
  .other {
    background: #ffffff;
    padding-left: 1rem;
    font-size: 1rem;
    border-bottom: 1px solid #c1c5c8;
    padding-bottom: 1rem;
    p {
      line-height: 2.5rem;
      display: flex;
      align-items: center;
    }
  }
  /*合计*/
  .total {
    background: #fff;
    text-align: right;
    padding-right: 1rem;
    line-height: 2.5rem;
    p {
      font-size: 1.2rem;
      span {
        color: #be700b;
      }
    }
  }
  /*订单详情*/
  .orderDetails {
    margin-top: 1rem;
    background: #fff;
    .title {
      font-size: 1.2rem;
      line-height: 2.5rem;
      padding-left: 1rem;
      border-bottom: 1px solid #c1c5c8;
    }
    .line {
      color: #c1c5c8;
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      line-height: 2rem;
      .p1 {
        width: 30%;
        padding-left: 1rem;
      }
      .p2 {
        width: 70%;
        text-align: right;
        padding-right: 1rem;
      }
    }
  }
}
</style>
