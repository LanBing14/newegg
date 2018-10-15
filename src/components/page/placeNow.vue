<template>
  <div id="placeNow">
    <mt-header fixed title="提现" style="font-size:1.2rem;height: 3rem;"></mt-header>
    <input type="text" v-model="withdraw" placeholder="输入提现金额" class="money" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}">
    <p class="tiMony">提现金额必须大于或等于100</p>
    <p class="withdrawNum">可提现余额
      <span> ￥{{balance}}</span>
    </p>

    <div class="apply_for" @click="hideToggle">确认提现</div>

    <!--蒙版-->
    <div class="box" id="box" v-show="isShow" @click="hideToggle"></div>

    <div class="hintBox" v-show="hintShow">
      <div class="attention">

        <!--       <input type="text" placeholder="选择入账方式" class="atten">-->
        <select class="attens" v-model="slects" @change="switcher(slects)">
          <option value="" style="display: none">选择入账方式</option>
          <!--<option value="1">微信</option>
            <option value="0">支付宝</option>-->
          <option value="2">银行</option>
        </select>

        <div v-show="wxShow">
          <input type="text" v-model="accounts" placeholder="输入微信号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div>

        <div v-show="AlipayShow">
          <input type="text" v-model="accounts" placeholder="输入支付号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div>

        <div v-show="bankShow">
          <select class="attens">
            <option value="" style="display: none" readonly>工商银行</option>
            <!--<option value="1">农业银行</option>-->
            <!--<option value="0">建设银行</option>-->
          </select>
          <input type="text" v-model="bankName" placeholder="输入您的开户名称" class="atten">
          <input type="text" v-model="accounts" placeholder="输入银行开户卡号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
          <input type="text" v-model="phone" placeholder="输入您的手机号" class="atten">
        </div>

        <!--<p class="remind">为确保您的账户安全，请获取您的账户000***00验证码</p>-->
        <div class="phoneCode">
          <input type="text" v-model="codes" placeholder="输入验证码" class="codeInput">
          <button class="getCode" @click="getCode" :disabled="dis">获取验证码({{prompt}}s)</button>
          <!--<div class="getCode">重新获取(60s)</div>-->
        </div>
      </div>
      <div class="btns">
        <div class="cancel" @click="hideToggle">取消</div>
        <div class="true" @click="goPlace">确认无误，立即提现</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import qs from "qs";
import axios from "axios";

export default {
  name: "placeNow",
  data() {
    return {
      isShow: false,
      hintShow: false,
      wxShow: false, //微信填写
      AlipayShow: false, //zhifubao
      bankShow: false, //银行
      balance: "",
      withdraw:"",
      slects: "",
      bankName: "",
      accounts: "",
      names: "",
      id: "", //提现方式 id  0 1 2
      codes: "",
      phone: "",
      prompt: 60,
      dis: false //为true禁用
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/balance"
      });
    },
    //点击'确认提现',蒙版，'取消'，显示信息框
    hideToggle() {
    	var $this = this;
    	axios
        .get(
          "http://wufuapp.com/index.php/api_egg/api/checkUserPermissions/index?openid=" +
                $this.openid +
            "&money=" +
                $this.withdraw  
        )
      .then(function(data){
      	console.log(data);
      	if(data.data.status == 0){
      		 Toast({
			          message: "请先绑定手机号",
			          duration: 1500
	            });
	           return false;
      	}else if ($this. withdraw.length == 0) {
	        Toast({
	          message: "提现金额不能空",
	          duration: 1500
	        });
	        return false;
      } else if($this. withdraw < 100) {
	        Toast({
	          message: "可提现金额必须大于或等于100",
	          duration: 1500
	        });
	        return false;
      } else {
        if (parseFloat($this. withdraw) > parseFloat($this.balance)) {
	          Toast({
	            message: "提现金额不能大于可提现金额",
	            duration: 1500
	          });
        } else {
             $this.isShow = !$this.isShow;
             $this.hintShow = !$this.hintShow;
        }
      }
         
      })
    },
    
      //获取验证码
    getCode() {
      if (this.phone == "") {
        Toast({
          message: "手机号不能为空",
          duration: 1500
        });
        return false;
      }
      this.dis = true;
      //倒计时
      let sec = 60;
      this.prompt = sec;
      var timer = setInterval(() => {
        sec--;
        this.prompt = sec;
        if (sec <= 0) {
          this.prompt = "0";
          clearInterval(timer);
          this.dis = false;
        }
      }, 1000);
      //倒计时
      console.log(this.phone);
      var baseUrl = BaseUrl + "index/getSms";
      var datas = qs.stringify({
        phone: this.phone.toString(),
        openid: localStorage.getItem("openid"),
        type: "1"
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: datas
      }).then(function(data) {
        console.log(data);
        let datas = data.data.data;
        if ((data.data.status = 1)) {
          console.log(data.data);
          Toast({
            message: "发送成功",
            duration: 1500
          });
        }
      });
    },

    goPlace() {
      var $this = this;

      if ($this.id == "2") {
        if ($this.bankName == "") {
          Toast({
            message: "开户行名称不能为空",
            duration: 1500
          });
          return false;
        }
      }
      if ($this.accounts == "") {
        Toast({
          message: "提现账号不能为空",
          duration: 1500
        });
        return false;
      } else {
        if ($this.names == "") {
          Toast({
            message: "真实姓名不能为空",
            duration: 1500
          });
          return false;
        } else {
          if ($this.phone == "") {
            Toast({
              message: "手机号不能为空",
              duration: 1500
            });
            return false;
          } else if ($this.codes == "") {
            Toast({
              message: "验证码不能为空",
              duration: 1500
            });
            return false;
          } else {
            var baseUrl = BaseUrl + "api/applyWithdrawal";
            var datas = qs.stringify({
              openid: localStorage.getItem("openid"),
              money: $this.withdraw, //string  提现金额
              account: $this.accounts, //string  （微信/支付宝/银行卡）账号
              realnamg: $this.names, //string 真实姓名
              type: $this.id, //string 0=支付宝 1=微信 2=银行转账
              bankofdeposit: $this.bankName,
              phone: $this.phone,
              smscode: $this.codes
            });
            axios({
              method: "post",
              url: baseUrl,
              type: "json",
              data: datas
            })
              .then(function(data) {
                let datas = data.data.data;
                if (data.data.status == 1) {
                  $this.$router.push({
                    path: "/place_success",
                    query: {
                      balances: $this.withdraw
                    }
                  });
                } else {
                  Toast({
                    message: data.data.msg,
                    duration: 1500
                  });
                }
              })
              .catch(function() {
                //alert("程序异常，联系技术人员")
              });
          }
        }
      }

      //this.$router.push({path:'/place_success'});
    },

    switcher(slects) {
      console.log(slects);
      this.id = slects;
      if (slects == "0") {
        this.wxShow = false;
        this.AlipayShow = true;
        this.bankShow = false;
      } else if (slects == "1") {
        this.wxShow = true;
        this.AlipayShow = false;
        this.bankShow = false;
      } else {
        this.wxShow = false;
        this.AlipayShow = false;
        this.bankShow = true;
      }
    }
  },
  mounted() {
    this.balance = this.$route.query.balances;
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#placeNow {
  /*position: fixed;*/
  width: 100%;
  .mint-header {
    background: #cc3e36;
  }
  .tiMony {
    color: #cc3e36;
    font-size: 0.9rem;
    width: 85%;
    line-height: 2rem;

    margin: 0 7.5%;
  }
  .money {
    color: #666666;
    line-height: 3rem;
    font-size: 1.4rem;
    width: 85%;
    margin: 0 7.5%;
    margin-top: 6rem;
    padding-left: 1rem;
    display: inline-block;
    border: 1px solid #030000;
    border-radius: 12px;
  }
  .withdrawNum {
    color: #060606;
    width: 85%;
    margin: 0 7.5%;
    font-size: 1rem;
    line-height: 2rem;
    span {
      color: #cc3e36;
    }
  }
  .apply_for {
    width: 40%;
    line-height: 2.5rem;
    font-size: 1.2rem;
    text-align: center;
    margin: 2rem auto;
    border-radius: 0.3rem;
    border: 1px solid #0b0b0b;
  }
  /*蒙版*/
  .box {
    opacity: 0.2;
    background: #040000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    /*display:none*/
  }
  .hintBox {
    position: fixed;
    top: 4rem;
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    background: #ffffff;
    width: 90%;
    margin: 0 5%;
    padding-bottom: 1rem;
    color: #0b0b0b;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    .attention {
      width: 100%;
      line-height: 2rem;
      padding: 1rem 0 1.5rem 0;
      text-align: center;
      justify-content: center;
      .atten {
        width: 80%;
        margin: 0.5rem auto;
        font-size: 0.9rem;
        border: 1px solid #c1c5c8;
        line-height: 2rem;
        overflow: hidden;
        outline: none;
        border-radius: 5px;
      }
      .attens {
        background: #fff;
        color: #0b0b0b;
        width: 80%;
        opacity: 0.5;
        text-align: center;
        // border-radius:15px;
        padding: 5px;
        margin: 0.5rem auto;
        font-size: 14px;
        height: 34px;
        -webkit-appearance: none;
        overflow: hidden;
        outline: none;
      }
      .remind {
        font-size: 0.8rem;
        width: 100%;
        text-align: center;
      }
      .phoneCode {
        display: flex;
        align-items: center;
        justify-content: center;
        .codeInput {
          width: 49%;
          margin-right: 0.3rem;
          font-size: 0.9rem;
          border: 1px solid #c1c5c8;
          line-height: 2rem;
          overflow: hidden;
          outline: none;
        }
        .getCode {
          width: 30%;
          line-height: 2rem;
          border-radius: 2rem;
          background: #c9161d;
          color: #ffffff;
          outline: none;
          border: none;
        }
      }
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c9c9c9;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c9c9c9;
    }
    input:-ms-input-placeholder {
      color: #c9c9c9;
    }
    input::-webkit-input-placeholder {
      color: #c9c9c9;
    }
    .btns {
      width: 100%;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel {
        width: 30%;
        line-height: 2.5rem;
        border: 1px solid #030000;
        border-radius: 2rem;
        color: #050505;
        margin-right: 2%;
      }
      .true {
        width: 50%;
        line-height: 2.5rem;
        background: #c9161d;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 2%;
      }
    }
  }
}
</style>
>