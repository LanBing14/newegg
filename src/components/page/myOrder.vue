<template>
  <div id="myOrder">
    <mt-header class="bg" fixed title="我的订单" style="font-size:1.2rem;height:3rem;"></mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item @click="getMyOrder" id="">全部</mt-tab-item>
      <mt-tab-item @click="getMyOrder" id="0">待付款</mt-tab-item>
      <mt-tab-item @click="getMyOrder" id="1">待收货</mt-tab-item>
      <mt-tab-item @click="getMyOrder" id="3">待评价</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">

        <div class="orderBox" v-for="(item,index) in obligationList" :key="index">
          <div class="goodsInfo">

            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>{{item.packageInfo.goodsName}}</p>
              <!-- <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>-->
              <div class="flag">{{item.status}}</div>
              <div class="money">
                <p>￥{{item.packageInfo.sellPrice}}</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="cancellation(key)">取消订单</div>
            <!-- <div class="goPay">去支付</div> -->
          </div>
        </div>

        <div class="orderBox" v-for="(item,index) in receivingList" :key="index">
          <div class="goodsInfo" @click="getOrderDetail(item.id)">

            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>{{item.packageInfo.goodsName}}</p>
              <!-- <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>-->
              <div class="flag">{{item.status}}</div>
              <div class="money">
                <p>￥{{item.packageInfo.sellPrice}}</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x{{item.number}}</p>
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
            <div class="goPay">确认收货</div>
          </div>
        </div>
        <div class="orderBox" v-for="(item,index) in evaluateList" :key="index">
          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>{{item.packageInfo.goodsName}}</p>
              <!-- <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>-->
              <div class="flag">{{item.status}}</div>
              <div class="money">
                <p>￥{{item.packageInfo.sellPrice}}</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="deletes(key)">删除订单</div>
            <div class="goPay">去评价</div>
          </div>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="orderBox" v-for="(item,index) in obligationList" :key="index">
          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>{{item.packageInfo.goodsName}}</p>
              <!-- <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>-->
              <div class="flag">{{item.status}}</div>
              <div class="money">
                <p>￥{{item.packageInfo.sellPrice}}</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="cancellation(key)">取消订单</div>
            <div class="goPay">去支付</div>
          </div>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="orderBox" v-for="(item,index) in receivingList" :key="index">
          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>{{item.packageInfo.goodsName}}</p>
              <!-- <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>-->
              <div class="flag">{{item.status}}</div>
              <div class="money">
                <p>￥{{item.packageInfo.sellPrice}}</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="cancellations(key)">取消订单</div>
            <div class="goPay">确认收货</div>
          </div>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="orderBox" v-for="(item,index) in evaluateList" :key="index">
          <div class="goodsInfo">
            <img src="../../img/swiper.png" alt="">
            <div class="name">
              <p>{{item.packageInfo.goodsName}}</p>
              <!-- <p style="color: #B4B3B3;line-height: 2rem;">{{}}克</p>-->
              <div class="flag">{{item.status}}</div>
              <div class="money">
                <p>￥{{item.packageInfo.sellPrice}}</p>
                <p style="color: #B4B3B3;text-align: right;padding-right: .5rem;">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="cancelBtn" @click="deletes(key)">删除订单</div>
            <div class="goPay">去评价</div>
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
      selected: "1",
      packageInfo: [],
      allList: [],
      obligationList: [],
      receivingList: [],
      evaluateList: []
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
        type: $this.selected
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
            $this.allList = datas;
            for (var i in datas) {
              if (datas[i].status == "未支付") {
                datas[i].status = "待付款";
                $this.obligationList.push(datas[i]);
              } else if (datas[i].status == "待发货") {
                datas[i].status = "待收货";
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
        })
        .catch(function() {
          //alert("程序异常，联系技术人员")
        });
    },
    reqAddress() {
      this.$router.push({
        path: "/Fullcreate_Address",
        query: {
          openid: localStorage.getItem("openid"),
          orderId: receivingList[i].id
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
        padding-left: 0.5rem;
        color: #252424;
        .flag {
          background: #cc3e36;
          color: #ffffff;
          width: 1.5rem;
          height: 3.5rem;
          position: absolute;
          margin-top: -3rem;
          right: 1rem;
          text-align: center;
          font-size: 0.8rem;
          border-radius: 0.2rem 0.2rem 1rem 1rem;
        }
        .money {
          display: flex;
          align-items: center;
          p {
            width: 50%;
          }
        }
      }
    }
    .total {
      text-align: right;
      color: #252424;
      border-bottom: 1px solid #c1c5c8;
      p {
        line-height: 3rem;
        padding-right: 0.5rem;
        span {
          color: #cc3e36;
        }
      }
    }
    .btns {
      display: flex;
      align-items: right;
      justify-content: flex-end;
      text-align: right;
      padding-top: 0.8rem;
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
    }
  }
}
</style>
