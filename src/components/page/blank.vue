<template>
	<div id="balance">

	</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "balance",
  data() {
    return {
      urls: ""
    };
  },
  methods: {
    getQueryString(name, url) {
      url = url || window.location.search.substr(1);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = url.match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  },
  mounted() {},
  created() {
    this.$router.push({
      path: "/product_details",
      query: {}
    });
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#balance {
  min-height: 41.6rem;
}
</style>