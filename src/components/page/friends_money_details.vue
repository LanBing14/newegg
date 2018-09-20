<template>
  <div id="friends_money_details">
    <img src="../../img/moneyDetails.png" alt="" class="moneyDetails">
    <div class="total">
      <p class="totalTit">累计已赚赏金</p>
      <p class="totalMoney">￥{{allSumNumber ? allSumNumber:0}}</p>
    </div>
    <!--滚轮公告-->
    <div class="marquee_box">
      <ul class="marquee_list" :style="{ top: -Num + 'px'}" :class="{marquee_top:Num}">
        <!-- 当显示最后一条的时候（Num=0转换布尔类型为false）去掉过渡效果-->
        <li v-for="(lists,i) in list">
          <p>{{lists.phone}}成功推荐了{{lists.num}}人赚取赏金{{lists.sumNum}}元</p>
        </li>
      </ul>
    </div>
    <!--头像等信息-->
    <div class="userInfo">
      <img :src="img" alt="">
      <p class="title">累计已赚赏金</p>
      <p class="money">￥{{sumNumber ? sumNumber:0}}</p>
    </div>
    <!--赚赏金按钮-->
    <div class="makeMoney" @click="makeBounty">我也要赚赏金</div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
export default {
  name: "friends_money_details",
  data() {
    return {
      list: [],
      num: "",
      sumNum: "",
      username: "",
      phone: "",
      sumNumber: "",
      allSumNumber: "",
      img: "",
      Num: 0,
      sendOpenid: "",
      marqueeList: [
        {
          name: "1军",
          city: "北京",
          amount: "10"
        },
        {
          name: "2军",
          city: "上海",
          amount: "20"
        },
        {
          name: "3军",
          city: "广州",
          amount: "30"
        },
        {
          name: "4军",
          city: "重庆",
          amount: "40"
        }
      ]
    };
  },
  methods: {
    showMarquee: function(Num) {
      this.marqueeList.push(this.marqueeList[0]);
      var max = this.marqueeList.length;
      var that = this;
      var marqueetimer = setInterval(function() {
        Num++;
        if (Num >= max) {
          Num = 0;
        }
        that.Num = Num * 30;
      }, 1000);
    },
    //获取公告信息
    getNoticeList() {
      var $this = this;
      var baseUrl = BaseUrl + "/index/getIncomeList";
      var data = qs.stringify({
        openid: this.sendOpenid
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
            $this.list = datas;
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
    getQueryString(name, url) {
      url = url || window.location.search.substr(1);
      console.log(url);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = url.match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    //获取累计赏金+头像
    getTotalMoney() {
      var $this = this;
      var baseUrl = BaseUrl + "/api/selectReward";
      var data = qs.stringify({
        openid: this.sendOpenid
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
            $this.img = datas.img;
            $this.sumNumber = datas.sumNumber;
            $this.allSumNumber = datas.allSumNumber;
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
    makeBounty() {
      this.$router.push({ path: "/product_details" });
    }
  },

  created() {
    document.title = "好友赚钱详情";
    if (this.getQueryString("makeMoney") == 100) {
      this.sendOpenid = this.getQueryString("openid");
    } else {
      this.sendOpenid = localStorage.getItem("openid");
    }
    this.getNoticeList();
    this.showMarquee(this.Num);
    this.getTotalMoney();
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
#friends_money_details {
  background: #77e5d9;
  min-height: 41.6rem;
  .moneyDetails {
    display: block;
    width: 95%;
    margin: 0 auto;
    padding-top: 1rem;
  }
  .total {
    position: absolute;
    top: 5rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .totalTit {
      color: #8b0205;
      font-size: 0.9rem;
    }
    .totalMoney {
      color: #941e08;
      font-size: 2rem;
    }
  }
  /*滚轮公告*/
  .roller_announcement {
    width: 76%;
    height: 5.5rem;
    font-size: 0.9rem;
    color: #662908;
    margin: 0 auto;
    line-height: 1.2rem;
  }
  ul {
    list-style: none;
    width: 100%;
    text-align: center;
  }
  .marquee_box {
    display: block;
    position: relative;
    color: #662908;
    width: 90%;
    margin: 1rem auto;
    height: 4rem; /*关键样式*/
    overflow: hidden;
  }
  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
  }

  /*头像等信息*/
  .userInfo {
    width: 100%;
    text-align: center;
    margin-top: 3rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .title {
      color: #3e3209;
      font-size: 0.9rem;
      line-height: 1.2rem;
    }
    .money {
      color: #b41a0b;
      font-size: 1.3rem;
      line-height: 1.6rem;
    }
  }
  /*赚赏金按钮*/
  .makeMoney {
    width: 9rem;
    line-height: 3rem;
    color: #2e0406;
    border-radius: 2rem;
    background: #ffb011;
    margin: 0 auto;
    text-align: center;
    margin-top: 3rem;
  }
}
</style>
