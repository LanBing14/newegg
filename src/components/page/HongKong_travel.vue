<template>
    <div id="HongKong_travel">
      <div class="hongkong" :style="{backgroundImage:'url('+img+')'}">
        <div class="synopsis syno">
          <p class="title">—伍福港澳之旅—</p>
          <p class="content">亲爱的伍福之人，感谢您对伍福事业的支持，伍福国际落户香港，我们诚挚的邀请您一起分享这份喜悦和收获9月25日-29日 深圳-香港</p>
        </div>
        <div class="synopsis rule">
          <p class="title">—报名规则—</p>
          <ul>
            <li><div class="circle"></div>必须抢满30枚绿壳无抗乌鸡蛋</li>
            <li><div class="circle"></div>必须下单无抗乌鸡蛋</li>
          </ul>
        </div>
        <!--申请按钮-->
        <div class="apply" @click="goApply">申请报名</div>

        <!--蒙版-->
        <div class="box" id="box" v-show="isShow" @click="hideToggle"></div>
        <div class="hintBox" v-show="hintShow">
          <div class="attention">
            <p class="title"><img src="../../img/jingao.png" alt="">您还未满足报名条件</p>
            <p class="light">1. 未抢满30枚绿壳无抗乌鸡蛋</p>
            <p class="light">2. 未下单绿皮无抗乌鸡蛋</p>
          </div>
          <div class="btns">
            <div class="cancel" @click="hideToggle">取消</div>
            <div class="true" @click="goProductDetails">查看鸡蛋详情</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
    export default {
        name:'HongKong_travel',
        data(){
          return{
            isShow:false,
            hintShow:false,
            img:require('../../img/HongKong.png')
          }
        },
        methods:{
          //点击蒙版：蒙版+弹框隐藏
          hideToggle(){
            this.isShow = !this.isShow;
            this.hintShow = !this.hintShow;
          },
          //点击申请按钮
          goApply(){
            //进行判断：
            //如果没抢满30枚鸡蛋 + 未下单，则显示弹窗
           // this.isShow = !this.isShow;
            //this.hintShow = !this.hintShow;
            //如果满足这两个条件Toast‘申请成功’,并跳转到'https://a.eqxiu.com/s/aw5tBwS4?eqrcode=1&share_level=1&from_user=6d05469e-cddf-4244-a2fd-53bb336e3d6c&from_id=b361d25a-13fa-48ed-b17d-b86496f18f6d&share_time=1535964527489&from=singlemessage'


            var $this = this;
            var baseUrl = BaseUrl+"api/getUserQualification";
            var datas = qs.stringify({
             // openid: "oX6js0WrM2E-Pbz0tg3ltsDdPByY",
              //openid: "oX6js0WrM2E-Pbz0tg3ltsDdPByY",
              openid: "oX6js0S0Pqsh6ijuNs48kDFN3w6s",

            });

            axios({
              method: "post",
              url: baseUrl,
              type: "json",
              data: datas
            }).then(function(data) {
              let datas = data.data.data;



              if ((data.data.status == 1)) {
                 window.location.href='https://a.eqxiu.com/s/aw5tBwS4?eqrcode=1&share_level=1&from_user=6d05469e-cddf-4244-a2fd-53bb336e3d6c&from_id=b361d25a-13fa-48ed-b17d-b86496f18f6d&share_time=1535964527489&from=singlemessage'

              } else {

                $this.isShow = !$this.isShow;
                $this.hintShow = !$this.hintShow;

              }
            })
              .catch(function() {
                //alert("程序异常，联系技术人员")
              });



            //this.goProductDetails();
          },
          //点击'查看鸡蛋详情'
          goProductDetails(){
            this.$router.push({path:'/'});
          }
        },
        created(){
          document.title="港澳之旅";
        },
        mounted(){},
        components:{}
    }
</script>

<style lang="scss" scoped>
#HongKong_travel{
  min-height: 41.6rem;
  .hongkong{
    width:100%;
    min-height: 48.6rem;
    position: relative;
    top: -6.5rem;
  }
  .synopsis{
    width: 76%;
    background: #ffffff;
    opacity: 0.9;
    border-radius: .5rem;
    display: inline-block;
    position: relative;
    margin: 0 10%;
    padding: .5rem;
    .title{
      color: #34405E;
      font-size: 1rem;
      line-height: 2rem;
    }
    .content{
      color: #143C44;
      margin-top: .3rem;
      font-size: .9rem;
      line-height: 1.3rem;
    }
    ul{
      width: 100%;
      margin: .5rem 0;
      list-style-type: none;
      padding: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      li{
        font-size: .9rem;
        display: flex;
        align-items: center;
        color: #B12942;
        .circle{
          width: .5rem;
          height: .5rem;
          margin: 0 .6rem;
          border-radius: 50%;
          background: #B12942;
        }
      }
    }
  }
  .syno{
    margin: 12rem 12% 0 12%;
    padding-bottom: 2rem;
  }
  .rule{
    margin: 2rem 12% 0 12%;
    padding-bottom: .5rem;
  }
  /*申请按钮*/
  .apply{
    width:13.5rem;
    font-size: 1.3rem;
    line-height: 3.5rem;
    background: #EF3C69;
    color: #fff;
    border-radius: 2rem;
    margin: 0 auto;
    margin-top: 10rem;
    text-align: center;
  }
  /*蒙版*/
  .box{
    opacity:.2;
    background:#040000;
    z-index:9;
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    /*display:none*/
  }
  .hintBox{
    position:fixed;
    top:13rem;
    z-index:999;
    overflow-y:auto;
    overflow-x:hidden;
    text-align: center;
    background: #ffffff;
    width: 80%;
    margin: 0 10%;
    padding-bottom: 1rem;
    color:#0B0B0B;
    font-size: .8rem;
    border-radius: .4rem;
    .attention{
      padding-top: 1rem;
      padding-bottom: 1.5rem;
      width: 85%;
      margin: 0 auto;
      .title{
        line-height: 1.1rem;
        display: flex;
        align-items: center;
        color: #000000;
        text-align: left;
        padding-left: 2.8rem;
        img{
          width: .9rem;
          height: .9rem;
          margin: .5rem;
        }
      }
      .light{
        color: #666666;
        line-height: 1.3rem;
        text-align: left;
        padding-left: 3.5rem;
      }
    }
    .btns {
      width: 100%;
      font-size: .9rem;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel {
        width: 40%;
        line-height: 2.5rem;
        border: 1px solid #030000;
        border-radius: 2rem;
        color: #050505;
        margin-right: 2%;
      }
      .true {
        width: 40%;
        line-height: 2.5rem;
        background: #C9161D;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 2%;
      }
    }
  }
}
</style>
