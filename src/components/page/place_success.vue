<template>
    <div id="place_success">
      <mt-header fixed title="提现成功" style="font-size:1.2rem;height: 3rem;">
        <mt-button slot="left" @click="goBack"></mt-button>
      </mt-header>
      <div class="successInfo">
        <p class="success">您已经成功申请提现</p>
        <p class="cont">我们会在3个工作日审核您的提现申请，请您及时关注公众号微信红包的消息提醒</p>
        <p class="money">￥{{balance}}</p>
      </div>
      <div class="apply_for" @click="goBalanceDetails">查看明细</div>
    </div>
</template>

<script>
export default {
  name: "place_success",
  data() {
    return {
      balance: ""
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/balance" });
    },
    goBalanceDetails() {
      this.$router.push({ path: "/balanceDetails" });
    }
  },
  mounted() {
    this.balance = this.$route.query.balances;
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#place_success {
  position: fixed;
  width: 100%;
  .mint-header {
    background: #cc3e36;
  }
  .successInfo {
    width: 100%;
    margin-top: 6rem;
    line-height: 2rem;
    text-align: center;
    .success {
      font-size: 1.1rem;
    }
    .cont {
      padding: 0.6rem;
      font-size: 0.9rem;
      line-height: 1.5rem;
      color: #6b6a6a;
      background-color: #eee;
      margin: 0.5rem auto;
    }
    .money {
      font-size: 1.5rem;
      color: #cc3e36;
      margin-top: 1rem;
    }
  }
  .apply_for {
    width: 40%;
    line-height: 2.5rem;
    font-size: 1rem;
    text-align: center;
    margin: 2rem auto;
    border-radius: 1.5rem;
    border: 1px solid #0b0b0b;
  }
}
</style>
