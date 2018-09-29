<template>
  <div id="package_details">
    <mt-header fixed title="套餐详情" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
   <!--发货time提醒-->
    <div class="time_goods">
    	<img src="../../img/time-icon.png"/>
      <p>{{packageList[0].num}}月份已发</p>
    </div>
    <!--收货人信息-->
    <div class="collect_information">
      <div class="messages">
        <p class="name">{{packageList[0].receiver}}
          <span class="phone">{{packageList[0].phone}}</span>
        </p>
        <div class="add">
          <img src="../../img/map.png" alt="" class="sign">
          <p class="address">{{packageList[0].city}}</p>  <!--{{province}}{{city}}{{county}}{{detail}}-->
          <span >更换待发货地址</span>
        </div>
      </div>
    </div>
    <!--商品信息-->
    <div class="productInfo">
      <img src="../../img/swiper.png" alt="" class="goodPic">
      <div class="line">
        <p class="name">{{packageInfo[0].goodsName}}</p>
        <p class="guige">{{packageInfo[0].number}}枚/{{packageInfo[0].dateTime}}个月</p>
      </div>
      <p class="money">￥{{packageInfo[0].sellPrice}}</p>
      <p class="number">X{{packageInfo[0].numbers}}</p>
    </div>
    
    <!--用户备注-->
    
    <textarea class="kuang" name="">备注：</textarea>
    
   <!-- 抢蛋福利提示语-->
   
    <p class="word">免费领取30枚蛋将跟随套餐首月订单一起发出</p>
    
    <!--发货-->
    
   <div class="" style="display: none;">
   	 <!--tab选择按钮-->
		    <mt-navbar v-model="selected" class="nav" style="width:10rem;height: 1.9rem;margin: 0.75rem auto;border-radius: 0.9rem;border: 0.0625rem solid #CC3E36;box-sizing: border-box;overflow: hidden;">
		      <mt-tab-item id="0" class="yi" :style="{background:back1,color:color1}">
		      	<div @click="getMyOrder1">已发货</div>
		      </mt-tab-item>
		      <mt-tab-item id="1" class="wei" :style="{background:back2,color:color2}">
		      	<div @click="getMyOrder2">待发货</div>
		      </mt-tab-item>
		    </mt-navbar>
		    
		    <!--列表内容容器下拉-->
		    
		    <mt-tab-container v-model="selected">   <!-- v-model="selected"-->
		    	
		    	<!--已发货列-->
		    	
		    	<mt-tab-container-item id="0" style="display: block;">
		    		
		    			  <div class="already_huo" v-for="(item,index) in yueFenList" :key="index">
		    			  	
							    		<div class="box_one" @click='infoShow'>
								    			 <p>{{item.age}}月份 </p>
								    		   <span>已发货</span>
								    		   <img :src="images"/>
							    		</div>
							    		<p class="order_btn" :style="{display:orderBlock}">订单详情</p>
						    		
							    		<div class="information_exhibition" :style="{display:infoBlock}">
								    		<p>2018/{{item.age}}/3/13:10</p>
								    		<span>订单详情</span>
								    		<span style="color: #999999;border:0.0625rem solid #999999;">立即评价</span>
							    	  </div>
					    	  
				    	 </div>
				    	
		    	
				  </mt-tab-container-item>
				  
				<!--  待发货列-->
				
				  <mt-tab-container-item id="1">
		    	    <div class="stay_huo" v-for="(item,index) in stayFenList" :key="index">
				    		<div class="boxs_one">
					    			 <p>{{item.stay}}月份 </p>
					    		   <span>待发货</span>
				    		</div>
				    	</div>
				  </mt-tab-container-item>
				  
		    </mt-tab-container>
		    
		    <!--订单信息-->
		    <div class="order_information">
		    	<p style="padding-top: 0.8175rem;">订单总计 <span>¥688</span></p>
		    	<p>下单时间 <span>2018/8/23/20:07</span></p>
		    	<p>付款时间 <span>2018/8/23/20:10</span></p>
		    </div>
    
    </div>
    
    <!--去支付状态-->
    
    <div class="pay_staus">
    	
    	<div class="go_paybtn">去支付</div>
    	<div class="pay_information">
		    	<p style="padding-top: 0.8175rem;">订单总计 <span>¥688</span></p>
		    	<p>下单时间 <span>2018/8/23/20:07</span></p>
		  </div>
    	
    </div>
    
    
    
    <!--待发货信息之前版本->
    <!--<div class="shipping_information">
      <p class="title">待发货信息</p>
      <div class="waitInfomation" v-for="(item,key) in packageDetails" :key='key'>
        <p class="monthed">{{item.date}}</p>
        <p class="alreadys">{{item.status}}</p>
      </div>
    </div>-->
    
    <!--客服-->
   <div class="kefu">若订单有疑问请联系公众号客服咨询~</div>
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
      selected: "0",
      number: "",
      sellPrice: "",
      packageDetails: [],
      date: "",
      status: "",
      receiver:"",  //收货人
      phone:"",//手机号
      province:"",//省份
      city:"", //城市
      county:"",  //区
      detail:"",//详细地址
      infoBlock:'none',
      orderBlock:'block',
      butNum:1,
      back1:'#CC3E36',
      back2:'#f5f5f5',
      color1:'#f5f5f5',
      color2:'#CC3E36',
      images:"../../img/arrow-dow.png",
      packageList:[
         {num:'2',receiver:'孙伟伟',phone:'13856564335',city:'上海市闵行区台尚创意园'}
      ],
      packageInfo:[{ goodsName:'翡翠鸡蛋',number:'100',dateTime:'10',sellPrice:'10',numbers:'3'}
      ],
      yueFenList:[
         {age:'1',yue:'1'},
         {age:'2',yue:'0'}
      ],
      stayFenList:[
         {stay:'2'},
         {stay:'3'},
         {stay:'4'},
      ]
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
    getMyOrder1(){
    	this.back1 = '#CC3E36';
    	this.back2 = '#f5f5f5';
    	this.color1 = '#ffffff';
    	this.color2 = '#CC3E36';
    	console.log("000");
    },
    getMyOrder2(){
    	this.back1 = '#f5f5f5';
    	this.back2 = '#CC3E36';
    	this.color1 = '#CC3E36';
    	this.color2 = '#ffffff';
    	console.log("111");
    },
    infoShow(){
    	var num = this.butNum;
    	console.log(num);
    	if(num%2 != 0){
    		  this.infoBlock = 'block';
    		  this.orderBlock = 'none';
    	}else if(num%3 !=1){
    		  this.infoBlock = 'none';
    		  this.orderBlock = 'block';
    	}
    	this.butNum +=1;
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
	 background-color:#F0F0F2;
  .mint-header {
    background: #cc3e36;
  }
  
  /*发货时间*/
  .time_goods{
    margin-top:3rem;
    background: #fff;
    padding: 1.5rem;
    img{
    	margin-left: 37%;
    	width: 1.625rem;
    	height: 1.625rem;
    }
    p {
    	margin-right: 32%;
    	float:right;
    	display: inline-block;
      text-align: center;
      font-size: 0.9rem;
      color: #CC3E36;
      padding-top: 0.2rem;
    } 
  }
  /*收货人信息*/
  .collect_information {
    display: flex;
    align-items: center;
    margin-top: 2px;
    padding: 0.2rem 0.8rem;
    height:6rem;
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
          width: 72%;
          color: #c1c5c8;
        }
        span{
        	font-size: 0.6875rem;
        	color: #CC3E36;
        }
      }
    }
  }
  /*商品信息*/
  .productInfo {
  	background-color: #FFFFFF;
  	margin-top: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 1.75rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    position: relative;
    .goodPic {
      width: 5.7rem;
      margin: 0.5rem 0;
    }
    .line {
      width: 50%;
      padding-left: 1rem;
      .name{
      	padding-top: 1.8rem;
        width: 100%;
        font-size: 0.9rem;
      }
      .guige {
        width: 100%;
        margin-top: 3rem;
        color: #c1c5c8;
        font-size: 0.8rem;
      }
    }
    .money {
      right: 1rem;
      position: relative;
      float: right;
      color: #cc3e36;
      font-size: 0.9rem;
      width: 30%;
      text-align: right;
    }
    .number{
    	position: absolute;
    	z-index: 999;
    	color: #B4B3B3;
    	font-size: 0.75rem;
    	right: 1rem;
    	top:5.5rem;
    	text-align: right;
    }
  }
  /*客户评价*/
 .kuang{
 	  display: block;
 	  padding: 0.5rem 1rem;
 	  margin-top: 0.08rem;
	 	width:91%;
	 	border: none;
	 	min-height:2rem ;
	 	font-size:1rem ;
	 	color:#2A1011;
 }
 .word{
 	  padding: 0 1rem;
 	  /*text-align: center;*/
 	  height: 2rem;
 	  line-height: 2rem;
 	  margin-top: 0.08rem;
	 	font-size:0.9rem;
	 	color:#CC3E36;
	 	background: #FFFFFF;
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
  .already_huo{
  	  background: #FFFFFF;
  	  width: 100%;
  	  position: relative;
  	  margin-bottom:0.625rem;
  	 .box_one{
  	 	padding: 0.875rem 1rem 0.56rem 1rem;
  	 	color: #666666;
  	 	width: 92%;
  	 	border-bottom:0.0625rem solid #C1C5C8;
  	 	/*position: relative;*/
  	 	p{
  	 		display: inline-block;
  	 		font-weight:500;
  	 	  font-size: 0.875rem;
  	 	}
  	 	span{
  	 		 font-size: 0.875rem;
  	 		 text-align: right;
  	 		 float: right;
  	 		 margin-right: 2rem;
  	 	}
  	 	img{
  	 		position: absolute;
  	 		right: 1.1rem;
  	 		top: 1.2rem;
  	 		width: 0.875rem;
  	 		height: 0.5rem;
  	 	}
  	 }
  	 .order_btn{
  	 	  font-size: 0.8125rem;
  	 	  color: #252424;
  	 	  font-weight:500;
  	 	  padding: 0.75rem 1rem 0.4375rem 1rem;
  	 } 
  }
  .stay_huo{
  	  background: #FFFFFF;
  	  width: 100%;
  	  
  	 .boxs_one{
  	 	padding: 0.875rem 1rem 0.56rem 1rem;
  	 	color: #666666;
  	 	width: 92%;
  	 	border-bottom:0.0625rem solid #C1C5C8;
  	 	p{
  	 		display: inline-block;
  	 		font-weight:500;
  	 	  font-size: 0.875rem;
  	 	}
  	 	span{
  	 		 font-size: 0.875rem;
  	 		 text-align: right;
  	 		 float: right;
  	 		 margin-right: 2rem;
  	 	} 	
  	 } 
  }
  .information_exhibition{
  	   /*position: absolute;*/
  	   width:92%;
  	   background: #FFFFFF;
  	   z-index: 9;
  	   /*border-top:0.0625rem solid #C1C5C8;*/
  	   /*height: 3.125rem;*/
  	   top:2.25rem;
  	   padding: 0 1rem;
  	   p {
  	   	 display: inline-block;
  	   	 font-size: 0.75rem;
  	   	 color: #999999;
  	   	 line-height:3.125rem ;
  	   }
  	   span{
  	   	text-align: center;
  	   	line-height: 1.5625rem;
  	   	width: 4.0625rem;
  	   	height: 1.5625rem;
  	   	color: #CC3E36;
  	   	float: right;
  	   	font-size: 0.75rem;
  			border: 0.0625rem solid #CC3E36;
  			border-radius: 0.8125rem;
  			margin-left: 0.375rem;
  			margin-top: 0.725rem;
  	   }
  }
  .order_information{
  	
  	padding: 0 1rem;
  	background: #FFFFFF;
  	font-size: 0.8125rem;
  	color: #999999;
  	p{
  		margin-top: 0.4375rem;
  		span {
  			float: right;
  			
  		}
  	}
  }
  /*去支付*/
 .go_paybtn{
			 	width: 9.375rem;
			 	height: 2.937rem;
			 	background-color: #CC3E36;
			 	border-radius: 1.5rem;
			 	color: #FFFFFF;
			 	font-size: 1.25rem;
			 	text-align: center;
			 	line-height: 2.937rem;
			 	margin: 1rem auto;
 }
 .pay_information{
 	     	padding:0 1rem 3rem  1rem;
		  	background: #FFFFFF;
		  	font-size: 0.8125rem;
		  	color: #999999; 
		    
		  	p {
		  		margin-top: 0.4375rem;
		  		span{
		  			float: right;
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

<style type="text/css">
	.yi{
		padding-top: 0.5rem !important;
		border-radius: 0.9rem 0 0 0.9rem ;
		border-bottom: none !important;
	}
	.wei{
		padding-top: 0.5rem !important;
		border: none;border-radius: 0 0.9rem 0.9rem 0;
	  border-bottom: none !important;
	}
</style>