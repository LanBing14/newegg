<template>
  <div id="evaluateAll">
    <mt-header class="bg" fixed title="全部评价" style="font-size:1.2rem;height: 3rem;">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" style="padding: 7px 0;">全部</mt-tab-item>
      <mt-tab-item id="2" style="padding: 7px 0;">好评</mt-tab-item>
      <mt-tab-item id="3" style="padding: 7px 0;">中评</mt-tab-item>
      <mt-tab-item id="4" style="padding: 7px 0;">差评</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->

    <mt-tab-container v-model="selected">
      <!--全部-->
      <mt-tab-container-item id="1">
        <div class="evaluateBox" v-for="item in allList">
          <div class="userEvaluate">
            <img :src=item.img alt="">
            <p class="name">{{item.username}}</p>
          </div>
          <p class="time">{{item.addTime}}</p>

          <p class="content">{{item.content}}</p>
        </div>
      </mt-tab-container-item>
      <!--好评-->
      <mt-tab-container-item id="2">
        <div class="evaluateBox" v-for="item in wellList">
          <div class="userEvaluate">
            <img :src=item.img alt="">
            <p class="name">{{item.username}}</p>
          </div>
          <p class="time">{{item.addTime}}</p>

          <p class="content">{{item.content}}</p>
        </div>
      </mt-tab-container-item>

      <!--中评-->
      <mt-tab-container-item id="3">
        <div class="evaluateBox" v-for="item in centreList">
          <div class="userEvaluate">
            <img :src=item.img alt="">
            <p class="name">{{item.username}}</p>
          </div>
          <p class="time">{{item.addTime}}</p>

          <p class="content">{{item.content}}</p>
        </div>
      </mt-tab-container-item>
      <!--差评-->
      <mt-tab-container-item id="4">
        <div class="evaluateBox" v-for="item in difference">
          <div class="userEvaluate">
            <img :src=item.img alt="">
            <p class="name">{{item.username}}</p>
          </div>
          <p class="time">{{item.addTime}}</p>

          <p class="content">{{item.content}}</p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "axios";
import qs from "qs";

export default {
  name: "evaluateAll",
  data() {
    return {
      selected: "1",
      type: "",
      addTime: "",
      content: "",
      username: "",
      allList: [],
      wellList: [],
      centreList: [],
      difference: []
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.push({ path: "/" });
    },
    getpublished() {
      var $this = this;
      var baseUrl = BaseUrl + "api/getCommentList";
      var data = qs.stringify({
        id: 17,
        openid: "oX6js0WrM2E-Pbz0tg3ltsDdPByY",
        type: 0 //0 所有 1好评 2中评 3差评
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
              datas[i].addTime = $this.timestampToTime(datas[i].addTime);
              if (datas[i].level == "好评") {
                $this.wellList.push(datas[i]);
              } else if (datas[i].level == "中评") {
                $this.centreList.push(datas[i]);
              } else if (datas[i].level == "差评") {
                $this.difference.push(datas[i]);
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

    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes();
      return Y + M + D + h + m;
    }
  },
  mounted() {
    this.getpublished();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#evaluateAll {
  background: #f0f0f2;
  min-height: 41.6rem;
  .mint-header {
    background: #cc3e36;
  }
  .mint-navbar {
    margin-top: 3rem;
    padding: 0 0.5rem;
  }
  .mint-navbar .mint-tab-item {
    padding: 0;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .mint-navbar .mint-tab-item.is-selected {
    background: #cc3e36;
    color: #ffffff;
    border-radius: 2rem;
    border-bottom: none;
  }

  .evaluateBox {
    margin-top: 0.5rem;
    background: #ffffff;
    padding: 0.5rem;
    .userEvaluate {
      display: flex;
      align-items: center;
      img {
        border-radius: 2rem;
        width: 2rem;
      }
      p {
        padding-left: 0.5rem;
      }
    }
    .time {
      color: #666666;
      line-height: 2rem;
      font-size: 0.8rem;
    }
    .content {
      font-size: 0.9rem;
    }
  }
}
</style>
