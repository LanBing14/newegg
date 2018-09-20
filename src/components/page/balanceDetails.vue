<template>
  <div id="balanceDetails">
    <mt-header fixed title="明细" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="detailsItems">
      <div class="item" v-for="list in dividendsList">
        <div class="titMoneyTime">
          <p class="tit">赏金</p>
          <p class="Money">+ ￥{{list.money}}</p>
          <p class="Time">{{list.time}}</p>
        </div>
        <div class="etisStaus">
          <p class="etis">{{list.username}}购买了您推荐的{{list.productName}}</p>
          <p class="staus ">{{list.type}}</p>
        </div>
      </div>
      <div class="item" v-for="list in withdrawalList">
        <div class="titMoneyTime">
          <p class="tit">提现</p>
          <p class="Money">- ￥{{list.money}}</p>
          <p class="Time">{{list.time}}</p>
        </div>
        <div class="etisStaus">
          <p class="etis">提现至{{list.type}}</p>
          <p class="staus staused">{{list.status}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "balanceDetails",
  data() {
    return {
      dividendsList: [],
      withdrawalList: []
    };
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({ path: "/balance" });
    },

    goPlace() {
      var $this = this;
      var baseUrl = BaseUrl + "api/applyInfo";
      var datas = qs.stringify({
        openid: localStorage.getItem("openid")
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
          if ((data.data.status = 1)) {
            $this.dividendsList = datas.dividendsList;
            $this.withdrawalList = datas.withdrawalList;
          } else {
          }
        })
        .catch(function() {
          //alert("程序异常，联系技术人员")
        });

      //
    }
  },
  mounted() {
    this.goPlace();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#balanceDetails {
  background: #f0f0f0;
  min-height: 41.6rem;
  .mint-header {
    background: #cc3e36;
  }
  .detailsItems {
    margin-top: 3rem;
    .item {
      margin-top: 0.5rem;
      padding-bottom: 0.6rem;
      background: #ffffff;
      .titMoneyTime {
        width: 100%;
        line-height: 3rem;
        display: flex;
        align-items: center;
        justify-content: left;
        .tit {
          font-size: 1.1rem;
          width: 15%;
          padding-left: 1rem;
        }
        .Money {
          font-size: 1rem;
          color: #cc3e36;
          width: 38%;
        }
        .Time {
          font-size: 0.9rem;
        }
      }
      .etisStaus {
        display: flex;
        align-items: center;
        .etis {
          color: #7c797a;
          font-size: 1rem;
          width: 60%;
          padding-left: 1rem;
          line-height: 1.3rem;
        }
        .staus {
          color: #cc3e36;
          width: 32%;
          text-align: right;
          margin-top: 1rem;
        }
        .staused {
          color: #7c797a;
        }
      }
    }
  }
}
</style>
