<template>
  <div id="personInfo">
    <mt-header fixed title="个人资料" style="font-size:1.2rem;height: 3rem;">
      <mt-button slot="right" @click="updateInfo">更改</mt-button>
    </mt-header>
    <div class="makeFri">
      <img :src="erweima" alt="">
      <!-- <img src="../../img/code.jpg" alt=""> -->
      <p class="invitedCode" style="color:#000; font-size: 14px">我的抢蛋邀请码</p>
      <p style="color:#666; font-size: 12px">好蛋免费拿 分享最快乐!</p>
    </div>
    <div class="shareFriden" @click="makeMoney">
      <span style="float:left">分享赏金</span>
      <div style="float:right" class="spanColor">
        <span>去了解</span>
        <img src="../../img/rightL.png" alt="">
      </div>

    </div>
    <div class="personalInfo">
      <div class="touxiang">
        <p>头像</p>
        <img :src="f.src" v-if="f" />
        <img :src="img" @click="add" v-else/>
        <input class="value" style="display:none" type="file" ref="file" accept="image/*" multiple="multiple" @change="getFile($event)" />
      </div>
      <div class="inputs">
        <div class="item">
          <label>昵称</label>
          <input type="text" placeholder="请设置你的昵称" v-model="username">
          <img src="../../img/right.png" alt="">
        </div>
        <div class="item" @click="sexChange">
          <label>性别</label>
          <input type="text" v-model="sex" @blur="showOut" readonly='readonly'>
          <img src="../../img/right.png" alt="">
        </div>
        <div class="item">
          <label>年龄</label>
          <input type="text" placeholder="请输入你的年龄" v-model="age">
          <img src="../../img/right.png" alt="">
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="sexSlots" v-model="popupVisible" @change="onSexChange" v-show="isShow" value-key="sex" :visible-item-count="3" ref='picker'></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Picker } from "mint-ui";
import { Popup } from "mint-ui";
import { Toast } from "mint-ui";
import qs from "qs";
import axios from "axios";
import utils from "../common/common.js";

export default {
  name: "personInfo",
  data() {
    return {
      file: null,
      f: null,
      sex: null,
      erweima: null,
      sexSlots: [
        {
          flex: 1,
          values: ["请选择", "男", "女"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      isShow: false,
      popupVisible: false,
      sexMan: "",
      sexGirl: "",
      age: 0,
      img: null,
      username: ""
    };
  },
  methods: {
    //更改信息
    updateInfo() {
      var sexIndex;
      if (this.sex == "女") {
        sexIndex = 2;
      } else if (this.sex == "男") {
        sexIndex = 1;
      }
      var data = qs.stringify({
        openid: localStorage.getItem("openid"),
        username: this.username,
        age: this.age,
        sex: sexIndex,
        file: this.file
      });
      axios({
        url: BaseUrl + "/index/editUserInfo",
        method: "post",
        data: data,
        type: "json"
      }).then(info => {
        if (info.data.status == 1) {
          //修改成功
          Toast({
            message: info.data.msg,
            duration: 1500
          });
        }
        console.log(info);
      });
    },
    add() {
      this.$refs.file.click();
    },
    makeMoney() {
      this.$router.push("make_money");
    },
    getFile(event) {
      this.file = event.target.files[0];
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      };
      this.html5Reader(this.file, item);
      this.f = item;
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },

    /* 性别的显示隐藏 */
    sexChange(e) {
      e.stopPropagation();
      this.isShow = true;
      this.popupVisible = true;
    },
    /* 下拉框消失 3种*/
    showOut() {
      this.isShow1 = false;
    },
    clickBody() {
      this.isShow1 = false;
      this.isShow2 = false;
    },
    /*选择性别*/
    onSexChange(picker, values) {
      this.sex = values[0];
      this.popupVisible = false;
    },
    //获取个人信息
    getInfoByPer() {
      var data = qs.stringify({
        openid: localStorage.getItem("openid")
      });
      axios({
        url: BaseUrl + "/index/personalCenter",
        method: "post",
        data: data,
        type: "json"
      }).then(info => {
        console.log(info);
        var data = info.data.data;
        this.age = data.age;
        this.username = data.username;
        this.img = data.img;
        var path = "data:image/png;base64," + data.erweima;
        this.erweima = path;
        var sex = data.sex;
        if (sex == 2) {
          //sex的返回值
          this.sex = "女";
        } else {
          this.sex = "男";
        }
      });
    },
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
        //location.href = datas.url;
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
        }
      });
    }
  },
  mounted() {
    if (!localStorage.getItem("openid")) {
      if (utils.getQueryString("code")) {
        this.logins();
      } else {
        this.login();
      }
    }
    this.getInfoByPer();
  },
  components: {
    "mt-picker": Picker,
    "mt-popup": Popup
  }
};
</script>

<style lang="scss" scoped>
#personInfo {
  background: #f0f0f2;
  min-height: 41.6rem;
  .mint-header {
    background: #cc3e36;
  }
  .shareFriden {
    height: 2.5rem;
    font-size: 14px;
    line-height: 2.5rem;
    padding-left: 0.5rem;
    background-color: #fff;
    margin: 0.5rem 0 1.5rem 0;
    padding-right: 0.8rem;

    .spanColor {
      span {
        color: #cc3e36;
        float: left;
        line-height: 2.5rem;
      }
      img {
        width: 0.65rem;
        padding-left: 1rem;
        float: left;
        padding-top: 0.7rem;
      }
    }
  }
  .makeFri {
    width: 100%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 3rem;
    padding: 1rem 0;
    text-align: center;
    img {
      width: 30%;
      // height: 50%;
    }
    p:last-child {
      line-height: 1.2rem;
    }
  }
  .personalInfo {
    // margin-top: 3rem;
    background: #ffffff;
    .touxiang {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0dfdf;
      p {
        width: 88%;
        color: #666666;
        line-height: 2.5rem;
        padding-left: 0.5rem;
      }
      img {
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 2rem;
      }
    }
    .inputs {
      .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0dfdf;
        label {
          width: 25%;
          color: #666666;
          line-height: 2.5rem;
          padding-left: 0.5rem;
        }
        input {
          width: 65%;
          font-size: 1rem;
          text-align: right;
          color: #e0dfdf;
          line-height: 2.5rem;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #e0dfdf;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #e0dfdf;
        }
        input:-ms-input-placeholder {
          color: #e0dfdf;
        }
        input::-webkit-input-placeholder {
          color: #e0dfdf;
        }
        img {
          display: block;
          width: 10%;
        }
      }
    }
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .mint-popup {
    border-radius: 0.4rem;
  }
  .picker {
    width: 100%;
    background: #ffffff;
  }
}
</style>