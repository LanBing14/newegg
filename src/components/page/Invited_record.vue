<template>
  <div id="Invited_record" :style="{backgroundImage:'url('+img+')'}">
    <div class="inviteBg">
      <!--我的推荐-->
      <div class="recommend">
        <div class="leftBox">
          <p class="p1">我的分享</p>
          <p class="p2">{{allInvited}}人</p>
        </div>
        <div class="rightBox" @click="makeMoneyBtn">
          <p class="p1">累计赏金 去提现</p>
          <p class="p2">￥{{allMoney}}</p>
        </div>
      </div>
      <!--直接推荐-->
      <div class="recommend" v-for="item in directList" @click="goInvitedDetails(item.several)">
        <div class="left">
          <p class="direct">直接分享</p>
          <p class="peopleNum">
            <span>{{item.invitedNumber}}人</span>
          </p>
          <p class="percent">赏金比例
            <span>{{item.proportion}}</span>
          </p>
        </div>
        <div class="right">
          <p>下单金额
            <span>￥{{item.orderNumber}}</span>
          </p>
          <p>获赏金额
            <span>￥{{item.sumNumber}}</span>
          </p>
        </div>
        <img src="../../img/right.png" alt="" class="rightImg">
      </div>
      <!--间接推荐A-->
      <div class="recommend" v-for="list in indirectList" @click="goInvitedDetails(list.several)">
        <div class="left">
          <p class="direct">间接分享</p>
          <p class="peopleNum">
            <span>{{list.invitedNumber}}人</span>
          </p>
          <p class="percent">赏金比例{{list.proportion}}</p>
        </div>
        <div class="right">
          <p>下单金额
            <span>￥{{list.orderNumber}}</span>
          </p>
          <p>获赏金额
            <span>￥{{list.sumNumber}}</span>
          </p>
        </div>
        <img src="../../img/right.png" alt="" class="rightImg">
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Invited_record",
  data() {
    return {
      allInvited: "",
      allMoney: "",
      list: [],
      invitedNumber: "",
      sumNumber: "",
      orderNumber: "",
      several: "",
      proportion: "",
      directList: [],
      indirectList: [],
      img: require("../../img/bg1-1.png")
    };
  },
  methods: {
    //返回上一界面“赚赏金”
    goBack() {
      this.$router.push({ path: "/make_money" });
    },
    makeMoneyBtn(){
      this.$router.push({ path: "/balance" });
    },
    goInvitedDetails(id) {
      console.log(id);
      this.$router.push({ path: "/invite_details", query: { several: id } });
    },
    getInvitedRecord() {
      var $this = this;
      var baseUrl = BaseUrl + "api/invitedRecord";
      var data = qs.stringify({
        openid: localStorage.getItem("openid"),
        // openid: 'oX6js0S0Pqsh6ijuNs48kDFN3w6s'
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        console.log(data);
        console.log(data.data.data.list,11111);

        let datas = data.data.data;
        if (data.data.status == 1) {
          //  alert(data.data.msg)
          $this.list = datas.list;
          $this.allInvited = datas.allInvited;
          $this.allMoney = datas.allMoney;

          for (var i in $this.list) {
            if ($this.list[i].several == 1) {
              $this.directList.push($this.list[i]);
            } else {
              $this.indirectList.push($this.list[i]);
            }
          }

          $this.invitedNumber = $this.list[0].invitedNumber;
          $this.sumNumber = $this.list[0].sumNumber;
          $this.orderNumber = $this.list[0].orderNumber;
          $this.proportion = $this.list[0].proportion;
        } else {
          alert(datas.msg);
        }
      });
    }
  },
  created() {
    document.title = "邀请记录";
  },
  mounted() {
    this.getInvitedRecord();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#Invited_record {
  background: #e9844d;
  min-height: 41.6rem;
  .mint-header {
    background: #ffffff;
    color: #000;
  }
  .inviteBg {
    background-size: 23.6rem;
    padding: 1rem 0;
    .recommend {
      background: #fff;
      width: 90%;
      margin: 0 auto;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      border-radius: 0.3rem;
      .leftBox {
        width: 50%;
        height: 5rem;
        border-right: 1px solid #cc3e36;
        text-align: center;
        .p1 {
          font-size: 0.9rem;
          line-height: 1.5rem;
          margin-top: 0.8rem;
        }
        .p2 {
          font-size: 1.3rem;
          line-height: 2rem;
          color: #cc3e36;
          overflow: hidden; /*溢出隐藏*/
          white-space: nowrap; /*强制不换行*/
          text-overflow: ellipsis; /*以省略号...显示*/
        }
      }
      .rightBox {
        width: 50%;
        height: 5rem;
        text-align: center;
        .p1 {
          font-size: 0.9rem;
          line-height: 1.5rem;
          margin-top: 0.8rem;
        }
        .p2 {
          font-size: 1.3rem;
          line-height: 2rem;
          color: #cc3e36;
          overflow: hidden; /*溢出隐藏*/
          white-space: nowrap; /*强制不换行*/
          text-overflow: ellipsis; /*以省略号...显示*/
        }
      }
      .left {
        width: 55%;
        font-size: 0.9rem;
        color: #666666;
        .direct {
          margin-top: 1rem;
          padding-left: 1rem;
        }
        .peopleNum {
          padding-left: 1rem;
        }
        .percent {
          margin-top: 0.6rem;
          margin-bottom: 1rem;
          padding-left: 1rem;
        }
        span {
          color: #cc3e36;
        }
      }
      .right {
        width: 45%;
        font-size: 0.9rem;
        text-align: center;
        color: #666666;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          color: #cc3e36;
        }
      }
      .rightImg {
        width: 7%;
      }
    }
  }
}
</style>
