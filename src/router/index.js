import Vue from "vue";
import Router from "vue-router";

import personInfo from "@/components/page/personInfo";
import product_details from "@/components/page/product_details";
// import register from '@/components/page/register'
// import registerSuccess from '@/components/page/registerSuccess'
import order_confirmation from "@/components/page/order_confirmation";
import create_address from "@/components/page/create_address";
import pay_success from "@/components/page/pay_success";
import package_details from "@/components/page/package_details";
import order_details from "@/components/page/order_details";
import myOrder from "@/components/page/myOrder";
import evaluate from "@/components/page/evaluate";
import evaluateAll from "@/components/page/evaluateAll";
import Help_to_rob1 from "@/components/page/Help_to_rob1";
import Help_to_rob2 from "@/components/page/Help_to_rob2";
import friends_money_details from "@/components/page/friends_money_details";
import make_money from "@/components/page/make_money";
import Invited_record from "@/components/page/Invited_record";
import invite_details from "@/components/page/invite_details";
import Brought_egg_success from "@/components/page/Brought_egg_success";
import Free_egg_robbing from "@/components/page/Free_egg_robbing";
import HongKong_travel from "@/components/page/HongKong_travel";
import balance from "@/components/page/balance";
import balanceDetails from "@/components/page/balanceDetails";
import placeNow from "@/components/page/placeNow";
import Brought_egg_error from "@/components/page/Brought_egg_error";
import blank from "@/components/page/blank";
// import Fullcreate_Address from '@/components/page/Fullcreate_Address'
import place_success from "@/components/page/place_success";
import robEgg from "@/components/page/robEgg";
import ganenAct from "@/components/page/ganenAct";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/personInfo",
      name: "personInfo",
      component: personInfo
    },
    {
      path: "/ganenAct",
      name: "ganenAct",
      component: ganenAct
    },
    {
      path: "/robEgg",
      name: "robEgg",
      component: robEgg
    },
    {
      path: "/product_details",
      name: "product_details",
      component: product_details
    },
    {
      path: "/",
      name: "blank",
      component: blank
    },
    {
      path: "/order_confirmation",
      name: "order_confirmation",
      component: order_confirmation
    },
    {
      path: "/create_address",
      name: "create_address",
      component: create_address
    },
    {
      path: "/pay_success",
      name: "pay_success",
      component: pay_success
    },
    {
      path: "/package_details",
      name: "package_details",
      component: package_details
    },
    {
      path: "/order_details",
      name: "order_details",
      component: order_details
    },
    {
      path: "/myOrder",
      name: "myOrder",
      component: myOrder
    },
    {
      path: "/evaluate",
      name: "evaluate",
      component: evaluate
    },
    {
      path: "/evaluateAll",
      name: "evaluateAll",
      component: evaluateAll
    },
    {
      path: "/Help_to_rob1",
      name: "Help_to_rob1",
      component: Help_to_rob1
    },
    {
      path: "/Help_to_rob2",
      name: "Help_to_rob2",
      component: Help_to_rob2
    },
    {
      path: "/friends_money_details",
      name: "friends_money_details",
      component: friends_money_details
    },
    {
      path: "/make_money",
      name: "make_money",
      component: make_money
    },
    {
      path: "/Invited_record",
      name: "Invited_record",
      component: Invited_record
    },
    {
      path: "/invite_details",
      name: "invite_details",
      component: invite_details
    },
    {
      path: "/Brought_egg_success",
      name: "Brought_egg_success",
      component: Brought_egg_success
    },
    {
      path: "/Free_egg_robbing",
      name: "Free_egg_robbing",
      component: Free_egg_robbing
    },
    {
      path: "/HongKong_travel",
      name: "HongKong_travel",
      component: HongKong_travel
    },
    {
      path: "/balance",
      name: "balance",
      component: balance
    },
    {
      path: "/balanceDetails",
      name: "balanceDetails",
      component: balanceDetails
    },
    {
      path: "/placeNow",
      name: "placeNow",
      component: placeNow
    },
    {
      path: "/place_success",
      name: "place_success",
      component: place_success
    },
    {
      path: "/Brought_egg_error",
      name: "Brought_egg_error",
      component: Brought_egg_error
    }
  ]
});
