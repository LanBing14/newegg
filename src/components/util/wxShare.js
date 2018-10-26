import wx from "weixin-js-sdk";
import qs from "qs";
import axios from "axios";

var wxShare = {
  ajaxReq(baseUrl, LoUrl, obj) {
    var data = qs.stringify({
      originUrl: LoUrl
    });
    axios({
      method: "post",
      url: baseUrl,
      type: "json",
      data: data
    }).then(res => {
      console.log(res);
      var info = res.data.data.signPackage;
      this.wxShare(info, LoUrl, obj);
    });
  },

  wxShare(info, LoUrl, obj) {
    console.log(info, obj);
    wx.config({
      debug: false,
      appId: info.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
      timestamp: info.timestamp, // 必填，生成签名的时间戳
      nonceStr: info.nonceStr, // 必填，生成签名的随机串
      signature: info.signature, // 必填，签名，见附录1
      //需要分享的列表项:发送给朋友，分享到朋友圈，
      jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
    });

    //处理验证失败的信息
    wx.error(function(res) {
      // logUtil.printLog("验证失败返回的信息:", res);
      console.log(res);
    });
    //处理验证成功的信息
    wx.ready(function() {
      //              alert(window.location.href.split('#')[0]);
      //分享到朋友圈
      wx.onMenuShareTimeline({
        title:
          obj.title ||
          "每人30枚、翡翠蛋免费抢，购买更便宜，手速！ 我只能帮你到这里了",
        link: obj.link,
        imgUrl:
          obj.imgUrl ||
          "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180910/1536581455920471.png", // 分享图标
        success: function(infos) {
          console.log("分享成功");
          var paramInfo = qs.stringify({
            url: LoUrl,
            openid: obj.openid
          });
          axios({
            method: "post",
            url: obj.baseUrl,
            type: "json",
            data: paramInfo
          }).then(function(res) {
            console.log(res);
          });
        },
        cancel: function(info) {
          // 用户取消分享后执行的回调函数
          // logUtil.printLog("取消分享到朋友圈返回的信息为:", res);
        }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title:
          obj.title ||
          "每人30枚、翡翠蛋免费抢，购买更便宜，手速！ 我只能帮你到这里了", // 分享标题
        desc:
          obj.desc ||
          "绿壳乌鸡蛋、高科技生态养殖、无抗生素，无兽药残留，无重金属，先抢先得，好吃好玩好赚钱！", // 分享描述
        link: obj.link,
        imgUrl:
          obj.imgUrl ||
          "http://biuimage.oss-cn-qingdao.aliyuncs.com/uploads/ueditor/image/20180910/1536581455920471.png", // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function(infos) {
          console.log("分享成功");
          var paramInfo = qs.stringify({
            url: LoUrl,
            openid: obj.openid
          });
          axios({
            method: "post",
            url: obj.baseUrl,
            type: "json",
            data: paramInfo
          }).then(function(res) {
            console.log(res);
          });
        },
        cancel: function(res) {
          // 用户取消分享后执行的回调函数
          console.log(res);
          // logUtil.printLog("取消分享给朋友返回的信息为:", res);
        }
      });
    });
  }
};
export default wxShare;
