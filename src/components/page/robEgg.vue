<template>

</template>
<script>
import { Header } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

import utils from "../common/common.js";

export default {
  name: "product_details",
  data() {
    return {
      openid: "",
      activityId: 12
    };
  },
  methods: {
    //首页相关信息+openid存
    login: function() {
      var $this = this;
      var data = qs.stringify({
        paramUrl: window.location.href
      });
      var baseUrl = BaseUrl + "index/getCode";
      axios({
        method: "POST",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        let datas = data.data.data;
        location.href = datas.url;
      });
    },
    //获取openid
    logins: function() {
      var $this = this;
      var baseUrl = BaseUrl + "index/getUserOpenid";
      var data = qs.stringify({
        code: utils.getQueryString("code")
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(function(data) {
        if (data.data.status == 1) {
          $this.openid = data.data.data.openid;
          localStorage.setItem("openid", $this.openid);
          $this.moun();
        }
      });
    },
    moun() {
      var $this = this;
      var baseUrl = BaseUrl + "api/productDetail";
      var data = qs.stringify({
        id: 17,
        openid: localStorage.getItem("openid")
      });
      axios({
        method: "post",
        url: baseUrl,
        type: "json",
        data: data
      }).then(info => {
        $this.activityId = info.data.data.activityId;
        $this.$router.push({
          path: "/Free_egg_robbing",
          query: {
            activityId: $this.activityId,
            openid: localStorage.getItem("openid")
          }
        });
      });
    }
  },
  created() {},
  mounted() {
    if (!localStorage.getItem("openid")) {
      if (utils.getQueryString("code")) {
        this.logins();
      } else {
        this.login();
      }
    } else {
      this.moun();
    }
  }
};
</script>
