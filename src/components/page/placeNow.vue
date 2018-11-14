<template>
  <div id="placeNow">
    <mt-header fixed title="提现" style="font-size:1.2rem;height: 3rem;"></mt-header>
    <!-- <input type='number' pattern="[1-9]*" v-model="withdraw" placeholder="输入提现金额" class="money"  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" > -->
    <input type='number' pattern="[0-9]*" v-model="withdraw" placeholder="输入提现金额" class="money"  @keyup="changeNumber" >
    <p class="tiMony">提现金额必须大于等于100</p>
    <p class="withdrawNum">可提现余额
      <span> ￥{{balance}}</span>
    </p>

    <div class="apply_for" @click="hideToggle">确认提现</div>

    <!--蒙版-->
    <div class="box" id="box" v-show="isShow" @click="isShow == false"></div>

    <div class="hintBox" v-show="hintShow">
      <div class="attention">

        <!--       <input type="text" placeholder="选择入账方式" class="atten">-->
        <!-- <select class="attens" v-model="slects" @change="switcher(slects)"> -->
          <!-- <option value="" style="display: none">选择入账方式</option>
          <option value="1">微信</option>
            <option value="0">支付宝</option>-->
          <!-- <option value="2">银行</option> --> 
        <!-- </select> -->

        <!-- <div v-show="wxShow">
          <input type="text" v-model="accounts" placeholder="输入微信号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div> -->

        <!-- <div v-show="AlipayShow">
          <input type="text" v-model="accounts" placeholder="输入支付号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div> -->

        <!-- <div v-show="bankShow">
          <select class="attens">
            <option value="" style="display: none" readonly>工商银行</option>
            <option value="1">农业银行</option>
            <option value="0">建设银行</option>-->
          <!-- </select>
          <input type="text" v-model="bankName" placeholder="输入您的开户名称" class="atten">
          <input type="text" v-model="accounts" placeholder="输入银行开户卡号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten"> -->
          <!--<input type="text" v-model="phone" placeholder="输入您的手机号" class="atten">-->
        <!-- </div> --> 

         <div v-show="bankShow">
          <select class="attens">
            <option value="" style="display: none" readonly >微信红包</option>
          </select>
           <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div>
        <p class="remind" v-if="weiBang">为确保您账户安全<br/>
          请获取您的账户{{tel1}}验证码</p>
        <div class="phoneCode" v-if="weiBang">
          <input type="text" v-model="codeMy" placeholder="输入验证码" class="codeInput">
          <button class="getCode" @click="getCodeTo" :disabled="dis">获取验证码 <span v-if="isTrue">({{promptTo}}s)</span></button>
        </div>
      </div>
      <div class="btns">
        <div class="cancel" @click="cancel">取消</div>
        <div class="true" @click="goPlace">确认无误，立即提现</div>
      </div>
    </div>
    
    <!-- 蒙版用户未绑定  弹层-->
    
    <div class="bindingBox" v-show="phoneMsg"  >
      <div class="phoneBox">
          <h2>手机号绑定</h2>
          <input type="text" v-model="phone" placeholder="请输入手机号"/>
          <div class="phoneCode">
              <input type="text" v-model="codes" placeholder="输入验证码" class="codeInput">
            <button class="getCode" @click="getCode" :disabled="dis">获取验证码 <span v-if="isTrue">({{prompt}}s)</span></button>
          </div>
          <span class="cancleBtn" @click="cancel">取消</span>
          <span class="confirmBtn" @click="nexteps">立即绑定</span>
      </div>
    </div>
    
    <!-- 蒙版用户未下单  弹层-->
    
    
    
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
      isTrue: false,
      hintShow: false,
      weiBang: true,
      codeMy: "",
      phoneMsg: false,
      tel1: "",
      wxShow: false, //微信填写
      AlipayShow: false, //zhifubao
      bankShow: false, //银行
      balance: "",
      withdraw: "",
      openid: "",
      slects: "",
      bankName: "",
      accounts: "",
      names: "",
      id: "", //提现方式 id  0 1 2
      codes: "",
      phone: "",
      myPhone: "",
      prompt: 60,
      promptTo: 60,
      dis: false //为true禁用
    };
  },
  methods: {
    changeNumber() {
      var re = /^(0|\+?[1-9][0-9]*)$/;
      if (!re.test(this.withdraw)) {
        this.withdraw = " ";
        Toast({
          message: "请输入整数",
          duration: 1000
        });
      }
    },
    goBack() {
      this.$router.push({
        path: "/balance"
      });
    },
    //立即绑定
    nexteps() {
      if (this.phone == "") {
        Toast({
          message: "手机号不能为空",
          duration: 1500
        });
        return false;
      }
      if (this.codes == "") {
        Toast({
          message: "验证码不能为空",
          duration: 1500
        });
        return false;
      }
      var data = qs.stringify({
        openid: localStorage.getItem("openid"),
        username: "",
        age: "",
        sex: "",
        file: "",
        phone: this.phone,
        smscode: this.codes
      });
      axios({
        url: BaseUrl + "/index/editUserInfo",
        method: "post",
        data: data,
        type: "json"
      }).then(info => {
        //修改成功
        this.myPhone = this.phone;
        this.weiBang = false;
        this.phoneMsg = false;
        this.hintShow = true;
        this.isShow = true;
        this.bankShow = true;
      });
    },
    cancel() {
      this.phoneMsg = false;
      this.isShow = false;
      this.hintShow = false;
      this.bankShow = false;
    },
    //点击'确认提现',蒙版，'取消'，显示信息框
    hideToggle() {
      var $this = this;

      if ($this.withdraw.length == 0) {
        Toast({
          message: "提现金额不能空",
          duration: 1500
        });
        return false;
      }
      if ($this.withdraw < 100) {
        Toast({
          message: "可提现金额必须大于或等于100",
          duration: 1500
        });
        return false;
      } else if ($this.withdraw > 2000) {
        Toast({
          message: "每日提现金额不能大于2000",
          duration: 1500
        });
        return false;
      } else {
        if (parseFloat($this.withdraw) > parseFloat($this.balance)) {
          Toast({
            message: "提现金额不能大于可提现金额",
            duration: 1500
          });
        } else {
          if ($this.myPhone == "") {
            //未绑定手机
            $this.phoneMsg = true;
          } else {
            $this.weiBang = true;
            $this.isShow = true;
            $this.hintShow = true;
            $this.bankShow = true;
          }
        }
      }
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
      this.isTrue = true;

      //倒计时
      let sec = 60;
      this.prompt = sec;
      var timer = setInterval(() => {
        sec--;
        this.prompt = sec;
        if (sec < 0) {
          this.prompt = "0";
          clearInterval(timer);
          this.isTrue = false;
          this.dis = false;
        }
      }, 1000);
      //倒计时
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
        if (data.data.status == 1) {
          console.log(data.data);
          Toast({
            message: "发送成功",
            duration: 1500
          });
        }
      });
    },
    //工商银行获取验证码
    getCodeTo() {
      this.dis = true;
      this.isTrue = true;
      //倒计时
      let sec = 60;
      this.promptTo = sec;
      var timer = setInterval(() => {
        sec--;
        this.promptTo = sec;
        if (sec < 0) {
          this.promptTo = "0";
          clearInterval(timer);
          this.isTrue = false;
          this.dis = false;
        }
      }, 1000);
      //倒计时
      var baseUrl = BaseUrl + "index/getSms";
      var datas = qs.stringify({
        phone: this.myPhone,
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
        if (data.data.status == 1) {
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
      var baseUrl = BaseUrl + "api/applyWithdrawal";
      if ($this.codes != "" || $this.codeMy != "") {
        var datas = qs.stringify({
          openid: localStorage.getItem("openid"),
          money: $this.withdraw, //string  提现金额
          account: "", //string  （微信/支付宝/银行卡）账号
          realnamg: $this.names, //string 真实姓名
          type: 1, //string 0=支付宝 1=微信 2=银行转账
          bankofdeposit: "",
          phone: $this.myPhone,
          smscode: $this.codes || $this.codeMy
        });
        axios({
          method: "post",
          url: baseUrl,
          type: "json",
          data: datas
        }).then(function(data) {
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
        });
      } else {
        Toast({
          message: "验证码不能为空",
          duration: 1500
        });
      }
    },
    goApply() {
      var $this = this;
      var baseUrl = BaseUrl + "api/getUserPhone";
      var datas = qs.stringify({
        openid: localStorage.getItem("openid")
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: datas
      }).then(function(data) {
        $this.myPhone = data.data.data.phone;

        var tel = $this.myPhone;
        tel = "" + tel;
        var reg = /(\d{3})\d{4}(\d{4})/;
        $this.tel1 = tel.replace(reg, "$1****$2");
      });
    }

    // switcher(slects) {
    //   // console.log(slects);
    //   this.id = slects;
    //   if (slects == "0") {
    //     this.wxShow = false;
    //     this.AlipayShow = true;
    //     this.bankShow = false;
    //   } else if (slects == "1") {
    //     this.wxShow = true;
    //     this.AlipayShow = false;
    //     this.bankShow = false;
    //   } else {
    //     this.wxShow = false;
    //     this.AlipayShow = false;
    //     this.bankShow = true;
    //   }
    // }
  },
  created() {
    this.openid = localStorage.getItem("openid");
    this.goApply();
    // this.openid = "oX6js0S0Pqsh6ijuNs48kDFN3w6s";
    this.balance = this.$route.query.balances;
  },
  mounted() {},
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
    line-height: 2rem;
    margin: 0 7.5%;
  }
  .money {
    color: #666666;
    line-height: 3rem;
    font-size: 1.4rem;
    width: 80%;
    margin: 0 7.5%;
    margin-top: 6rem;
    padding-left: 1rem;
    display: inline-block;
    border-bottom: 2px solid #c9161d;
    // border-radius: 12px;
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
    width: 38%;
    line-height: 2.5rem;
    font-size: 1rem;
    text-align: center;
    margin: 2rem auto;
    border-radius: 1.5rem;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    background: #ffffff;
    width: 90%;
    // margin: 0 5%;
    padding-bottom: 1rem;
    color: #0b0b0b;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    .attention {
      width: 100%;
      line-height: 2rem;
      padding: 1rem 0 0rem 0;
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
        background: #eee;
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
        width: 80%;
        margin: 0 10% 0.5rem 10%;
        font-size: 0.8rem;
        line-height: 1.2rem;
        text-align: left;
      }
      .phoneCode {
        display: flex;
        align-items: center;
        justify-content: center;
        .codeInput {
          width: 47%;
          margin-right: 0.3rem;
          font-size: 0.9rem;
          border: 1px solid #c1c5c8;
          line-height: 2rem;
          overflow: hidden;
          outline: none;
          border-radius: 5px;
        }
        .getCode {
          width: 32%;
          border-radius: 2rem;
          height: 2.3rem;
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
      margin-top: 0.5rem;
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
  /* 未绑定样式*/
  .bindingBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    z-index: 66;
    text-align: center;

    .phoneBox {
      width: 86%;
      position: fixed;
      top: 25%;
      left: 50%;
      transform: translate(-50%);
      height: 20rem;
      background: #ffffff;
      border-radius: 5%;
      text-align: center;
      h2 {
        font-size: 1.25rem;
      }
      input {
        display: inline-block;
        width: 85%;
        height: 3rem;
        padding-left: 1rem;
        line-height: 3rem;
        border: 1px solid #cccccc;
      }
      .phoneCode {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        .codeInput {
          width: 54%;
          font-size: 0.9rem;
          border: 1px solid #c1c5c8;
          line-height: 2rem;
          overflow: hidden;
          outline: none;
        }
        .getCode {
          width: 30%;
          height: 3.2rem;
          // height: 2rem;
          background: #c9161d;
          border: 1px solid #c9161d;
          color: #ffffff;
          outline: none;
          border: none;
        }
      }
    }
    .cancleBtn {
      display: inline-block;
      width: 30%;
      height: 2.5rem;
      text-align: center;
      line-height: 2.5rem;
      background: #cc3e36;
      border-radius: 5%;
      margin-top: 3rem;
      color: #ffffff;
    }
    .confirmBtn {
      display: inline-block;
      width: 30%;
      height: 2.5rem;
      text-align: center;
      line-height: 2.5rem;
      background: #cc3e36;
      border-radius: 5%;
      margin-top: 3rem;
      margin-left: 1rem;
      color: #ffffff;
    }
  }

  /*未下单样式*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input[type="number"] {
    -moz-appearance: textfield; /* firefox */
  }
}
</style>
>