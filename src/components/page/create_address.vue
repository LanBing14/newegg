<template>
  <div id="create_address" @click="clickBody">
    <mt-header fixed title="收货地址" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
      <mt-button slot="right" @click="changeAddress(1)">完成</mt-button>
    </mt-header>
    <div class="setBox">
      <input type="text" class="infos" placeholder="收货人姓名" v-model="sName">
      <input type="tel" class="infos" placeholder="手机号码" v-model="phone" @blur="checkPhone(phone)">
      <div class="linkage" @click="cityChange">
        <div class="three">
          <input type="text" class="inputStyle" v-model="address" placeholder="选择省" @blur="showOut" readonly='readonly' />
          <img src="../../img/right.png" alt="">
        </div>
      </div>
      <!--<div class="close" v-if="address" @click="resetAddress"></div>-->
    </div>

    <textarea v-model="detailed" placeholder="详细地址"></textarea>
    <div class="default">
      <div class="xuanze" @click="goDefault">
        <img src="../../img/gouxuan.png" alt="" v-show="showChoice">
      </div>
      <p>设为默认地址</p>
    </div>

    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="addressSlots" v-model="popupVisible" @change="onAddressChange" value-key="name" :visible-item-count="5" ref='picker'>
      </mt-picker>
    </mt-popup>

    <!--蒙版-->
    <div class="box" id="box" v-show="hintShow || hintShowSeason" @click="hideToggle"></div>
    <div class="hintBox" v-show="hintShow">
      <img src="../../img/remaind.png" alt="" class="mbicon">
      <div class="attention">
        <!-- <img src="../../img/jingao.png" alt=""> -->
        <p>
          <span class="addressRed">新疆、西藏、青海、海南、港澳地区</span><br> 由于鸡蛋的保质特殊性 您选的地址将不发货
        </p>
      </div>
      <div class="RedBtns">
        <span class="true" @click="goCancel">继续购买</span>
        <span class="cancel" @click="goCancell">重选地址</span>
      </div>
    </div>
    <div class="hintBox" v-if="hintShowSeason">
      <img src="../../img/remaind.png" alt="" class="mbicon">
      <div class="attention">
        <img src="../../img/jingao.png" alt="">
        <p>黑龙江、辽宁、吉林因天气原因,冬季11月-次年2月不发货
          </br>
          春季开始每月补发一箱补满为止
          </br>
          <span>（如果天气提早回暖，会结合实际情况提早发货）</span><br>
        </p>
      </div>
      <div class="btns">
        <div class="cancel" @click="changeAddress(2)">确认地址</div>
        <div class="true" @click="goCancell">重选地址</div>
      </div>
    </div>
  </div>
</template>
<script>
import address from "../common/city.json";
import { Picker } from "mint-ui";
import { Popup } from "mint-ui";
import { Toast } from "mint-ui";

import axios from "axios";
import qs from "qs";
export default {
  name: "create_address",
  data() {
    return {
      address: null,
      isShow: false,
      hintShowSeason: false,
      companyName: "",
      openid: "",
      statusId: 1,
      orderids: "",
      totalPrice: 1,
      amount: "",
      remark: "",
      goodsName: "",
      goodsId: "",
      zhuangtai: "待付款",
      addressSlots: [
        {
          flex: 1,
          defaultIndex: 10,
          values: address,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: address[0].city,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: address[0].city[0].area,
          className: "slot5",
          textAlign: "center"
        }
      ],
      addressProvince: "",
      addressCity: "",
      addressXian: "",
      regionInit: false,
      popupVisible: false,
      showChoice: true, //勾选图标
      hintShow: false, //友情提示弹框
      isMark: false, //友情提示弹框的蒙版
      sName: "",
      phone: "",
      detailed: "",
      sellPrice: "",
      amount: "",
      packageId: ""
    };
  },
  methods: {
    //返回上页面‘订单确认order_confirmation’
    goBack() {
   this.$router.back();
    },
    //点击蒙版：蒙版+弹出框隐藏
    hideToggle() {
      this.hintShow = false;
      this.isMark = false;
    },
    //点击确认+取消，同样的效果：蒙版+弹出框隐藏
    goCancel() {
      this.hintShow = true;
      this.isMark = true;
      this.$router.push({
        path: "/product_details"
      });
    },
    //重选地址
    goCancell() {
      this.hintShow = false;

      this.isMark = false;
      this.hintShowSeason = false;
      this.popupVisible = true;
    },
    //继续购买
    goOnBuy() {
      this.hintShow = !this.hintShow;
      this.isMark = !this.isMark;
    },
    /* 点击完成，两种效果“保存”和“修改” */
    changeAddress(index) {
      //完成
      if (index == 1) {
        //        判断地址，如果是不能发货的地区，禁止保存+修改，不提示Toast，显示hintShow；
        //        如果是可以正常发货的地址，Toast“保存”/“修改”成功

        if (this.sName == "" || this.phone == "" || this.detailed == "") {
          Toast({
            message: "姓名、手机号、详情地址都不能为空",
            duration: 1500
          });
          return false;
        } else {
          if (
            this.address.substring(0, 3) == "青海省" ||
            this.address.substring(0, 2) == "西藏" ||
            this.address.substring(0, 3) == "海南省" ||
            this.address.substring(0, 2) == "新疆" ||
            this.address.substring(0, 2) == "香港" ||
            this.address.substring(0, 2) == "澳门"
          ) {
            // this.goCancel();
            this.hintShow = true;
            this.isMark = true;
            return false;
          }
          if (
            this.address.substring(0, 4) == "黑龙江省" ||
            this.address.substring(0, 3) == "吉林省" ||
            this.address.substring(0, 3) == "辽宁省"
          ) {
            this.hintShowSeason = true;
            this.isMark = true;
          } else {
            var that = this;
            var addresss = new Array(); //定义一数组
            addresss = that.address.split("-"); //字符分割
            var i = 0;
            if (that.showChoice) {
              i = 1;
            }
            that.editAddress(
              addresss[0],
              addresss[1],
              addresss[2],
              that.sName,
              that.phone,
              that.detailed,
              i
            );
          }
        }
      } else {
        //继续购买
        var that = this;
        var addresss = new Array(); //定义一数组
        addresss = that.address.split("-"); //字符分割
        var i = 0;
        if (that.showChoice) {
          i = 1;
        }
        that.editAddress(
          addresss[0],
          addresss[1],
          addresss[2],
          that.sName,
          that.phone,
          that.detailed,
          i
        );
      }
    },
    editAddress(province, city, county, receiver, phone, detail, isDefault) {
      var $this = this;
      var baseUrl = BaseUrl + "api/editAddress";
      var datas = qs.stringify({
        openid: this.openid,
        receiver: receiver,
        phone: phone,
        province: province,
        city: city,
        county: county,
        detail: detail,
        isDefault: isDefault,
        orderId: $this.orderids
      });

      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: datas
      })
        .then(function(data) {
          console.log(data);
          let datas = data.data.data;
          if (data.data.status == 1) {
            Toast({
              message: data.data.msg,
              duration: 1500
            });
            if ($this.statusId == 0) {
              setTimeout(function() {
                $this.$router.push({
                  path: "/order_confirmation",
                  query: {
                    packageId: $this.$route.query.packageId,
                    number: $this.$route.query.number,
                    openid: $this.openid,
                    sellPrice: $this.$route.query.sellPrice,
                    id: datas.id
                  }
                });
              }, 1500);
            } else if ($this.statusId == 1) {
              setTimeout(function() {
                $this.$router.push({
                  path: "/package_details",
                  query: {
                    packageId: $this.$route.query.packageId,
                    number: $this.$route.query.number,
                    openid: $this.openid,
                    sellPrice: $this.$route.query.sellPrice,
                    ids: datas.id,
                    orderids: $this.$route.query.orderids,
                    id: $this.zhuangtai,
                    goodsName: $this.$route.query.goodsName,
                    remark: $this.$route.query.remark,
                    amount: $this.$route.query.amount,
                    totalPrice: $this.$route.query.totalPrice,
                    goodsId: $this.$route.query.goodsId,
                    orderSn: $this.$route.query.orderSn
                  }
                });
              }, 1500);
            }
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
    },

    /* 验证手机号 */
    checkPhone(phone) {
      if (!/^1[34578]\d{9}$/.test(phone)) {
        Toast({
          message: "手机号码不正确",
          duration: 1500
        });
      }
      return true;
    },
    /* 显示 */
    cityChange(e) {
      e.stopPropagation();
      this.isShow = true;
      this.popupVisible = true;
    },
    /* 下拉框消失 */
    showOut() {
      this.isShow = false;
    },
    clickBody() {
      this.isShow = false;
    },
    /* 选择地址 */
    onAddressChange(picker, values) {
      if (!values[0]) {
        this.$nextTick(() => {
          if (this.companyName) {
            // 赋默认值
          } else {
            picker.setValues([
              address[0],
              address[0].city[0],
              address[0].city[0].area[0]
            ]);
          }
        });
      } else {
        picker.setSlotValues(1, values[0].city);
        let town = [];
        if (values[1]) {
          town = values[1].area;
        }
        picker.setSlotValues(2, town);
      }
      if (this.regionInit) {
        this.address =
          values[0]["name"] + "-" + values[1]["name"] + "-" + values[2];
        this.addressProvince = values[0]["name"];
        this.addressCity = values[1]["name"];
        this.addressXian = values[2]["name"];
      } else {
        this.regionInit = true;
      }
    },
    /*设置默认地址*/
    goDefault() {
      this.showChoice = !this.showChoice;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.addressSlots[0].defaultIndex = 0;
      }, 100);
    });
    this.openid = localStorage.getItem("openid");
    // this.openid = 'oX6js0S0Pqsh6ijuNs48kDFN3w6s';

    this.packageId = this.$route.query.packageId;
    this.amount = this.$route.query.number;
    this.sellPrice = this.$route.query.sellPrice;
    this.statusId = this.$route.query.statusId;
    this.zhuangtai = this.$route.query.id;
    this.totalPrice = this.$route.query.totalPrice;
    this.goodsName = this.$route.query.goodsName;
    this.remark = this.$route.query.remark;
    this.orderids = this.$route.query.orderids;
    this.amount = this.$route.query.amount;
    this.goodsId = this.$route.query.goodsId;
  },
  components: {
    "mt-picker": Picker,
    "mt-popup": Popup
  }
};
</script>

<style lang="scss" scoped>
#create_address {
  background: #f0f0f2;
  min-height: 41.6rem;
  .mint-header {
    background: #cc3e36;
  }
  .setBox {
    margin-top: 3rem;
    background: #ffffff;
    .infos {
      width: 97%;
      font-size: 0.9rem;
      font-family: PingFang-SC-Medium;
      color: #666666;
      line-height: 1.8rem;
      margin-top: 0.8rem;
      margin-left: 0.6rem;
      border-bottom: 1px solid #e0dfdf;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #e0dfdf;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #e0dfdf;
    }
    input:-ms-input-placeholder {
      color: #e0dfdf;
    }
    input::-webkit-input-placeholder {
      color: #e0dfdf;
    }
    .linkage {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 0.8rem;
      .three {
        width: 100%;
        margin-left: 0.5rem;
        border-bottom: 1px solid #e0dfdf;
        display: flex;
        align-items: center;
        .inputStyle {
          width: 90%;
          line-height: 2rem;
          color: #0f0f0f;
          font-size: 0.9rem;
        }
        img {
          width: 8%;
        }
        .inputStyle:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #0f0f0f;
        }
        .inputStyle::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #0f0f0f;
        }
        .inputStyle:-ms-input-placeholder {
          color: #0f0f0f;
        }
        .inputStyle::-webkit-input-placeholder {
          color: #0f0f0f;
        }
      }
      .team {
        margin-left: 3.8rem;
      }
    }
  }
  textarea {
    width: 95%;
    font-size: 0.9rem;
    font-family: PingFang-SC-Medium;
    color: #666666;
    padding: 0.55rem;
    resize: none;
    border: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  textarea:-ms-input-placeholder {
    font-size: 0.9rem;
    color: #e0dfdf;
  }
  textarea::-webkit-input-placeholder {
    font-size: 0.9rem;
    color: #e0dfdf;
  }
  .default {
    color: #a8a7a7;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    margin-top: 0.4rem;
    .xuanze {
      width: 0.9rem;
      height: 0.9rem;
      border: 1px solid #aaaaaa;
      border-radius: 50%;
      margin-right: 0.5rem;
      img {
        width: 112%;
        height: 112%;
        display: block;
        margin-top: -0.06rem;
        margin-left: -0.06rem;
      }
    }
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .mint-popup {
    border-radius: 0.4rem;
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
  .hintBox {
    text-align: center;
    background: #ffffff;
    width: 65%;
    margin: 0 18% 0 18%;
    color: #0b0b0b;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    z-index: 9;
    position: absolute;
    left: 0;
    top: 30%;
    .mbicon {
      width: 100%;
      height: 100%;
    }

    .attention {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 1rem;
      padding-bottom: 1.5rem;
      width: 85%;
      margin: 0 auto;
      img {
        width: 0.9rem;
        height: 0.9rem;
      }
      p {
        width: 95%;
        line-height: 1.1rem;
        text-align: left;
        padding-left: 0.1rem;
        span {
          color: #f50808;
          line-height: 1.3rem;
        }
        .addressRed {
          height: 2rem;
          line-height: 2rem;
        }
      }
    }
    .RedBtns {
      width: 100%;
      height: 2.5rem;
      margin-top: 2rem;
      display: flex;
      line-height: 2.5rem;
      text-align: center;
      font-size: 1rem;
      border-top: 1px solid #cccccc;
      .cancel1 {
        width: 100%;
        height: 100%;
        color: #f50808;
        border-left: 1px solid #cccccc;
      }
      .cancel {
        width: 50%;
        height: 100%;
        color: #f50808;
        border-left: 1px solid #cccccc;
      }
      .true {
        width: 50%;
      }
    }

    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      .cancel {
        width: 5rem;
        line-height: 2.5rem;
        border: 1px solid #030000;
        border-radius: 2rem;
        color: #050505;
        margin-right: 0.5rem;
      }
      .true {
        width: 5rem;
        line-height: 2.5rem;
        background: #c9161d;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>