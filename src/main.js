// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// import mui from 'vue-awesome-mui'
// Vue.use(mui)


import { Header } from 'mint-ui';
Vue.component(Header.name, Header)

import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);

import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import wx from "weixin-js-sdk";

// import utils from "./components/common/common";
// Vue.prototype.$utils = utils

Vue.config.productionTip = false

Vue.use(Mint);
Vue.use(MintUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
