<template>
  <div id="myOrder">
    <mt-header class="bg" fixed title="我的订单" style="font-size:1.2rem;height:3rem;z-index: 99;"></mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item @click="getMyOrder" id="">全部</mt-tab-item>
      <mt-tab-item @click="getMyOrder" id="1">待付款</mt-tab-item>
      <mt-tab-item @click="getMyOrder" id="2">待收货</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected"> 
    	<!--全部状态下-->
      <mt-tab-container-item id="">
       <!--待付款列表信息-->
        <div class="orderBox" v-for="(item,index) in obligationList" >   <!--v-for="(item,index) in obligationList" :key="index"-->
          <p class="orderNum">订单编号:<span> {{item.orderSn}} </span></p>

          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p style="font-size: 0.875rem;">{{item.packageInfo.goodsName}}</p> 
              <p style="color: #B4B3B3;line-height:2rem;font-size:0.75rem;">{{item.packageInfo.title}}</p>
              <div class="money">
                <p class="jine" style="color:#252424;">￥{{item.packageInfo.sellPrice}}</p>  
                <p class="shul" style="color:#B4B3B3;">x{{item.number}}</p> 
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计   
              <span>￥{{item.amount}}</span>  
            </p>
          </div>
          <div class="btns">
            <!--<div class="cancelBtn" @click="cancellation(key)">取消订单</div>-->
            <div class="cancelBtn" @click="nextPage(item)">套餐详情</div>
            <div class="goPay" @click="login(item,0)">去支付</div>   <!--状态一-->
            <div class="flag">{{item.status}}</div>
          </div>
        </div>
        
        
       <!--列表信息-->
        <div class="orderBox" v-for="(item,index) in receivingList" >
          <p  class="orderNum">订单编号:<span> {{item.orderSn}} </span></p>

          <div class="goodsInfo" @click="getOrderDetail(item.id)">

            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p style="font-size: 0.875rem;width:50%;">{{item.packageInfo.goodsName}}</p>
              <p style="color: #B4B3B3;line-height:2rem;font-size:0.75rem;">{{item.packageInfo.title}}</p>             
              <div class="money">
                <p class="jine" style="color:#252424;">￥{{item.packageInfo.sellPrice}}</p>
                <p class="shul" style="color:#B4B3B3;">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <!-- <div class="cancelBtn" @click="reqAddress">修改收货地址</div> -->
            <div class="goPay" @click="nextStay(item)">套餐详情</div> <!--状态二-->
            <div class="flag">{{item.status}}</div>
          </div>
        </div>
        
        
       <!--列表信息-->
        <!--<div class="orderBox" :key="index">
          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>000</p>
               <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>
              <div class="flag">000</div>
              <div class="money">
                <p>￥000</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x000</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共000件商品，合计
              <span>￥000</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="deletes(key)">删除订单</div>
            <div class="goPay" @click="details2">订单详情</div>    
          </div>
        </div>          <!--状态三-->
        
      </mt-tab-container-item>
      
      <mt-tab-container-item id="1">
      <!--待付款列表信息-->
        <div class="orderBox" v-for="(item,index) in obligationList" >  <!--obligationList-->
          <p  class="orderNum">订单编号:<span>{{item.orderSn}}</span></p>

          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p style="font-size: 0.875rem;">{{item.packageInfo.goodsName}}</p>
              <p style="color: #B4B3B3;line-height:2rem;font-size:0.75rem;">{{item.packageInfo.title}}</p>
              <div class="money">
                <p class="jine" style="color: #252424;">￥{{item.packageInfo.sellPrice}}</p>
                <p class="shul" style="color: #B4B3B3">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="nextPage(item)">套餐详情</div>
            <div class="goPay" @click="login(item,0)">去支付</div>
            <div class="flag">{{item.status}}</div>
          </div>
        </div>

      </mt-tab-container-item>
      
     <!-- 待收货列表-->
      <mt-tab-container-item id="2">
        <div class="orderBox" v-for="(item,index) in receivingList" >
          <p  class="orderNum">订单编号:<span>{{item.orderSn}}</span></p>
          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p style="font-size: 0.875rem;width:50%;">{{item.packageInfo.goodsName}}</p>
              <p style="color: #B4B3B3;line-height: 2rem;font-size:0.75rem;">{{item.packageInfo.title}}</p>             
              <div class="money">
                <p class="jine">￥{{item.packageInfo.sellPrice}}</p>
                <p class="shul" style="color:#B4B3B3">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <!--<div class="cancelBtn" @click="cancellations(key)">取消订单</div>-->
            <div class="goPay" @click="nextStay(item)">套餐详情</div>
            <div class="flag">{{item.status}}</div>
          </div>
        </div>

      </mt-tab-container-item>
      
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "myOrder",
  data() {
    return {
      openid: "",
      id: "", //订单id
      selected: "",
      packageInfo: [],
      allList: [],
      obligationList: [], //tab 待付款列表信息循环
      receivingList: [], //tab 待收货的列表信息循环
      evaluateList: [], //tab 待评价列表信息循环
      quanbu: [], //全部
      goodsIdAll: "",
      packageIdAll: "",
      numberAll: "",
      totalPriceAll: "",
      aidAll: "",
      orderSnAll: ""
    };
  },
  methods: {
    getOrderDetail(id) {
      this.$router.push({
        path: "/order_details",
        query: {
          orderId: id
        }
      });
    },
    //获得我的订单全部信息
    getMyOrder() {
      var $this = this;
      var baseUrl = BaseUrl + "/api/getOrderList";
      var data = qs.stringify({
        openid: localStorage.getItem("openid"),
        // openid: "oX6js0S0Pqsh6ijuNs48kDFN3w6s",
        type: $this.selected
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        console.log(data);
        let datas = data.data.data;
        $this.id = datas[0].id; //订单id
        if (data.data.status == 1) {
          $this.allList = datas;
          for (var i in datas) {
            $this.quanbu.push(datas[i].status); //全部
            if (datas[i].status == "未支付") {
              datas[i].status = "待付款";
              $this.obligationList.push(datas[i]);
              console.log($this.obligationList);
            } else if (datas[i].status == "待发货") {
              datas[i].status = "待收货";
              $this.receivingList.push(datas[i]);
            } else if (datas[i].status == "部分发货") {
              datas[i].status = "部分发货";
              $this.receivingList.push(datas[i]);
            } else {
              datas[i].status = "待评价";
              $this.evaluateList.push(datas[i]);
            }
          }
        } else {
          Toast({
            message: datas.msg,
            duration: 1500
          });
        }
      });
    },
    //去支付点击
    nextPage(item) {
      var $this = this;
      $this.login(item, 1);
      this.$router.push({
        path: "/package_details",
        query: {
          id: item.status,
          totalPrice: $this.totalPriceAll,
          goodsName: item.packageInfo.goodsName,
          orderSn: item.orderSn,
          packageId: item.packageId,
          orderids: item.id,
          remark: item.remark,
          amount: item.number,
          openid: item.openid,
          goodsId: item.goodsId,
          orderSn: item.orderSn
        }
      });
      console.log(item);
    },
    nextStay(item) {
      this.$router.push({
        path: "/package_details",
        query: {
          id: item.status,
          openid: item.openid,
          orderids: item.id,
          remark: item.remark
        }
      });
      console.log(item);
    },
    details1() {
      this.$router.push({
        path: "/order_details",
        query: {
          id: "待收货",
          orderId: this.id
        }
      });
    },
    details2() {
      this.$router.push({
        path: "/order_details",
        query: {
          id: "待评价",
          orderId: this.id
        }
      });
    },
    reqAddress() {
      this.$router.push({
        path: "/Fullcreate_Address",
        query: {
          openid: localStorage.getItem("openid"),
          orderId: receivingList[i].id //待收货
        }
      });
    },
    templates(i, receivingList) {
      var $this = this;
      var baseUrl = "/api/api/channelOrder";
      var data = qs.stringify({
        openid: localStorage.getItem("openid"),
        id: receivingList[i].id
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
            Toast({
              message: data.data.msg,
              duration: 2000
            });

            $this.set(receivingList.splice(i, i++));
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

    cancellation(i) {
      MessageBox.confirm("确定取消订单?").then(action => {
        this.templates(i, this.obligationList);
      });
    },
    cancellations(i) {
      MessageBox.confirm("确定取消订单?").then(action => {
        this.templates(i, this.receivingList);
      });
    },
    deletes(i) {
      MessageBox.confirm("确定删除订单?").then(action => {
        var $this = this;
        var baseUrl = "/api/api/delOrder";
        var data = qs.stringify({
          openid: localStorage.getItem("openid"),
          id: $this.evaluateList[i].id
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
              Toast({
                message: data.data.msg,
                duration: 1500
              });

              $this.set($this.evaluateList.splice(i, i++));
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
      });
    },

    //以下为支付功能
    login(item, num) {
      //获取当前订单数据
      console.log(num);
      var $this = this;
      var baseUrl = BaseUrl + "api/preOrder";
      var data = qs.stringify({
        goodsId: item.goodsId,
        packageId: item.packageId,
        number: item.amount,
        openid: item.openid
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        //console.log(data);
        let datas = data.data.data;
        if (data.data.status == 1) {
          $this.goodsIdAll = datas.goodsId;
          $this.packageIdAll = datas.packageId;
          $this.numberAll = datas.number;
          $this.totalPriceAll = datas.totalPrice / 100;
          $this.aidAll = datas.address;

          if (num == 0) {
            $this.goPay(item);
          }
        }
      });
    },
    goPay(item) {
      var $this = this;
      axios
        .get(
          "http://wufuapp.com/index.php/api_egg/Weixinpay/index?openid=" +
            item.openid +
            "&price=" +
            $this.totalPriceAll +
            "&remark=" +
            item.packageInfo.goodsName +
            "&orderSn=" +
            item.orderSn
        )
        .then(function(data) {
          //console.log(item.orderSn);
          let datas = data.data.data;
          if (data.data.status == 1) {
            $this.orderSnAll = item.orderSn;
            $this.onBridgeReady(datas);
          } else {
            Toast({
              message: "已支付",
              duration: 1500
            });
          }
        });
    },
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
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            axios
              .get(
                "http://wufuapp.com/index.php/api_egg/Weixinpay/H5Notify?out_trade_no=" +
                  $this.orderSnAll
              )
              .then(function(data) {
                $this.$router.push({
                  path: "pay_success",
                  query: { orderId: $this.orderId, money: $this.totalPriceAll }
                });
              })
              .catch(function() {
                //alert("程序异常，联系技术人员")
              });

            //支付成功，跳转到支付支付成功页面
          }
        }
      );
    }
  },
  mounted() {
    this.getMyOrder();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#myOrder {
  background: #f0f0f2;
  min-height: 41.6rem;
  .mint-header {
    background: #cc3e36;
  }
  .mint-navbar {
    margin-top: 3rem;
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: #cc3e36;
    border-bottom: none;
  }
  .orderBox {
    margin-top: 0.5rem;
    background: #ffffff;
    padding: 0.5rem;
    padding-right: 0;

    .orderNum {
      font-size: 12px;
      color: #79797b;
      margin-bottom: 10px;
      span {
        margin-left: 5px;
      }
    }
    .goodsInfo {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c1c5c8;
      padding-bottom: 0.5rem;
      img {
        width: 20%;
      }
      .name {
        width: 80%;
        padding-left: 0.8rem;
        color: #252424;
        position: relative;
        .money {
          display: flex;
          align-items: center;
          .jine {
            position: absolute;
            width: 30%;
            right: 1rem;
            top: 0.5rem;
            z-index: 9;
            text-align: right;
          }
          .shul {
            position: absolute;
            width: 20%;
            right: 1rem;
            top: 2.5rem;
            text-align: right;
            z-index: 7;
          }
        }
      }
    }
    .total {
      text-align: right;
      color: #252424;
      font-size: 0.75rem;
      p {
        padding-top: 1.0625rem;
        padding-right: 0.5rem;
        span {
          color: #cc3e36;
        }
      }
    }
    .btns {
      font-size: 0.75rem;
      display: flex;
      align-items: right;
      justify-content: flex-end;
      text-align: right;
      height: 2.125rem;
      line-height: 3.625rem;
      margin-top: 0.8rem;
      .cancelBtn {
        width: 5rem;
        line-height: 1.6rem;
        text-align: center;
        color: #79797b;
        border: 1px solid #79797b;
        border-radius: 2rem;
        margin-right: 0.8rem;
      }
      .goPay {
        width: 5rem;
        line-height: 1.6rem;
        text-align: center;
        color: #cc3e36;
        border: 1px solid #cc3e36;
        border-radius: 2rem;
        margin-right: 0.8rem;
      }
      .flag {
        position: absolute;
        left: 1rem;
        text-align: center;
        font-size: 0.75rem;
        color: #cc3e36;
        width: 3rem;
        height: 2rem;
        line-height: 0.8rem;
      }
    }
  }
}
</style>
