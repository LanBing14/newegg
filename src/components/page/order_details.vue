<template>
  <div id="order_details">
    <mt-header fixed title="订单详情" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    
  <!--  待收货模块-->
      <div class="collect_momdel" v-if="show1" style="display: none;">
	    <!--等待买家收货提醒-->
			    <div class="waitReceiving">
			    	<img src="../../img/stay_icon.png"/>
			      <p>{{zhuangtai}}</p>
			      <div class="btns">
			        <div class="applyBtn applyFor">申请退款</div>
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
			          <p class="address">{{address}}</p>
			          <img src="../../img/right.png" alt="" class="right">
			        </div>
			      </div>
			     
			    </div>
			    <!--商品信息-->
			    <div class="productInfo">
			      <img src="../../img/swiper.png" alt="" class="goodPic" >
			      <div class="line1">
			        <p class="name">{{packageInfo.goodsName}}</p>
			        <p class="money">￥{{packageInfo.sellPrice}}</p>
			      </div>
			      <div class="line2">
			        <p class="guige"></p>
			        <p class="num">30枚</p>
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
			        <p class="p2">{{packageInfo.addTime}}</p>
			      </div>
			      <div class="line">
			        <p class="p1">付款时间</p>
			        <p class="p2">{{packageInfo.payTime}}</p>
			      </div>
			    </div>
			    <!--订单信息end-->
	    </div>
  <!--待收货模块end-->
  
  <!--待评价模块-->
     <div class="review_momdel" v-if="show2">
     	
	    <!--等待买家收货提醒-->
			    <div class="waitReceiving">
			    	<img src="../../img/review-icons.png"/>
			      <p>{{zhuangtai}}</p>
			      <!--<div class="btns">
			        <div class="applyBtn applyFor">申请退款</div>
			        <div class="applyBtn active" @click="goEvaluate">确认收货</div>
			      </div>-->
			    </div>
			    
			    <!--物流信息-->
			      <div class="logistics_information">
			      	  <img src="../../img/car.png"/>  
			      	  <p style="padding-top: 1.25rem;">物流信息:<span>{{KdName}}</span></p>
			      	  <p >快递单号：<input id="copyObj" :value="kdNo" /> <span class="single_number" @click="copyNum">复制单号</span></p>
			      </div>
			    <!--物理信息end-->
			    
			    <!--收货人信息-->
			    <div class="Consignee">
			      <div class="messages">
			        <p class="name">{{receiver}}
			          <span class="phone">{{phone}}</span>
			        </p>
			        <div class="add">
			          <img src="../../img/map.png" alt="" class="sign">
			          <p class="address">{{address}}</p>
			          <!--<img src="../../img/right.png" alt="" class="right">-->
			        </div>
			      </div>
			     
			    </div>
			    <!--商品信息-->
			    <div class="productInfo">
			      <img src="../../img/swiper.png" alt="" class="goodPic" style="width: 5.6875rem;height: 6.5625rem;">
			      <div class="line1">
			        <p class="name">{{packageInfo.goodsName}}</p>
			        <p class="money" style="margin-top: 1.5rem;">￥{{packageInfo.sellPrice}}</p>
			      </div>
			      <div class="line2">
			        <p class="guige" style="margin: 1rem;"></p>
			        <p class="num">30枚</p>
			      </div>
			    </div>
			  <!--备注信息-->
			    <div class="remarks_information">备注:{{remark}}</div>
			   <!-- 备注信息end-->
			    <!--订单信息-->
			    <div class="orderDetails">
			       <div class="title">订单信息</div>
			       <p class="line" style="padding-top:0.5rem ;">发货时间<span class="p2">{{sendTime}}</span></p>
			    </div>
			    <!--订单信息end-->
			    
	    </div>
  <!--待评价模块end-->
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
      packageInfo: "",
      goodsName: "",
      dateTime: "",
      number: "",
      sellPrice: "",
      freight: "",
      amount: "",
      addTime: "",
      discount: "",
      payTime: "",
      addTime: "",
      remark: "",
      receiver: "", //收货人
      phone: "", //手机号
      address: "",
      show1: false,
      show2: true,
      zhuangtai: "",
      kdNo: "",
      sendTime: "",
      KdName: ""
    };
  },
  methods: {
    //返回上一级
    goBack() {
      this.$router.back();
    },
    //点击地址信息一块👉'create_address'
    goAddress() {
      this.$router.push({
        path: "/create_address",
        query: { orderId: this.$router.query.orderId }
      });
    },
    // 点击确认收货
    goEvaluate() {
      //  先弹出是否确认收货的弹框，再跳转到评价
      MessageBox.confirm("", {
        message: "是否确认收货",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showCancelButton: true
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            this.$router.push({ path: "/evaluate" });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
            console.log(2);
          }
        });
    },
    datas: function() {
      this.zhuangtai = this.$route.query.name;
      this.KdName = this.$route.query.kdNames;
      this.kdNo = this.$route.query.kdNos;
      this.sendTime = this.$route.query.shi;
      if (this.zhuangtai == "已发货") {
        //  		 this.show1 = false;
        this.show2 = true;
      } else if (this.zhuangtai == "待评价") {
        //  		 this.show1 = false;
        this.show2 = true;
      }
      var $this = this;
      var baseUrl = BaseUrl + "api/getOrderDetail";
      var data = qs.stringify({
        id: $this.$route.query.orderId, //335

        openid: localStorage.getItem("openid")
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
            $this.receiver = datas.name;
            $this.phone = datas.phone;
            $this.remark = datas.remark;
            $this.address = datas.address;
            $this.packageInfo = datas.packageInfo;
            $this.amount = datas.amount;
            $this.addTime = datas.addTime;
            $this.payTime = datas.payTime;
            $this.discount = datas.discount;
            $this.freight = datas.freight;
          } else {
            alert(datas.msg);
          }
        })
        .catch(function() {});
    },
    Address() {
      var $this = this;
      var baseUrl = BaseUrl + "api/getAddressList";
      var data = qs.stringify({
        //            openid:'oX6js0S0Pqsh6ijuNs48kDFN3w6s',
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
            for (var i in datas) {
              if ((datas[i].isDefault = 1)) {
                ($this.receiver = datas[i].receiver), //收货人
                  ($this.phone = datas[i].phone); //手机号
                $this.address = datas.address;
              }
            }
          } else {
            alert(datas.msg);
          }
        })
        .catch(function() {
          //alert("程序异常，联系技术人员")
        });
    },
    copyNum() {
      var url = document.querySelector("#copyObj");
      url.select(); // 选择对象
      document.execCommand("Copy");
    }
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
  height: 42rem;
  .mint-header {
    background: #cc3e36;
  }
  /*等待买家收货提醒*/
  .waitReceiving {
    margin-top: 3rem;
    background: #fff;
    padding: 1.5rem;
    img {
      margin-left: 38%;
      width: 1.625rem;
      height: 1.625rem;
    }
    p {
      margin-right: 38%;
      float: right;
      display: inline-block;
      text-align: center;
      font-size: 0.9rem;
      color: #cc3e36;
      padding-top: 0.2rem;
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
  /*物流信息*/
  .logistics_information {
    height: 4.125rem;
    background-color: #ffffff;
    margin-top: 0.4375rem;

    img {
      display: block;
      width: 1.6875rem;
      height: 1.3125rem;
      float: left;
      margin: 1.4375rem 1.3125rem 1.4375rem 1.8125rem;
    }
    p {
      font-size: 0.75rem;
      color: #999999;
      .single_number {
        color: #cc3e36;
        font-size: 0.75rem;
      }
    }
  }
  /*收货人信息*/
  .Consignee {
    display: flex;
    align-items: center;
    margin-top: 0.4375rem;
    padding: 0.2rem 0.8rem;
    height: 6rem;
    background: #fff;
    .messages {
      width: 100%;
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
    img {
      width: 24px;
      height: 28px;
    }
  }
  /*商品信息*/
  .productInfo {
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #ffffff;
    border-bottom: 1px solid #c1c5c8;
    .goodPic {
      width: 3.75rem;
      height: 3.75rem;
      margin: 0.9rem;
    }
    .line1 {
      width: 65%;
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
  /*备注信息*/
  .remarks_information {
    padding: 0.375rem 0 0 1.1875rem;
    height: 3.4375rem;
    background-color: #ffffff;
    color: #8b8989;
    font-size: 0.75rem;
  }
  /*其他*/
  .other {
    background: #ffffff;
    padding-left: 1rem;
    font-size: 0.925rem;
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
      font-size: 1rem;
      span {
        color: #cc3e36;
      }
    }
  }
  /*订单详情*/
  .orderDetails {
    height: 10rem;
    background: #fff;
    margin-top: 0.25rem;
    /*padding: 0 1rem;*/
    font-size: 0.8125rem;
    .title {
      background-color: #ffffff;
      padding: 0 1rem;
      line-height: 2.5rem;
      border-bottom: 2px solid #f2f2f2;
    }
    .line {
      color: #c1c5c8;
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      line-height: 1.2rem;
      padding: 0 1rem;
    }
  }
}
</style>
