/**
 * Created by web on 2018/6/5.
 */
var utils = {
  /* 验证手机号 */
  checkPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
    }
    return true
  },
  /* 获取当前url地址中的参数 */
  getQueryString(name, url) {
    url = url || window.location.search.substr(1);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.match(reg);
    if (r != null)
      return decodeURI(r[2]); return null;

    // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // var r = url.substr(1).match(reg);
    // if (r != null) return unescape(r[2]); return null;
  },
  /* 时间戳的转化 */
  format(time) {
    var date = new Date(time * 1000),
      Y = date.getFullYear() + '-',
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ',
      h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
      m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
      s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return (Y + M + D + h + m + s);
  },
  /* 数组去重 */
  duplicateRemoval(arr1) {
    for (var i = 0; i < arr1.length - 1; i++) {
      for (var j = 1; j < arr1.length; j++) {
        if (i != j) {
          if (this.get_object_first_attribute(arr1[i]) == this.get_object_first_attribute(arr1[j])) {
            arr1.splice(j, 1)
          }
        }
      }
    }
    return arr1;
  },
  /* 获取数组对象的第一个属性值 */
  get_object_first_attribute(data) {
    for (var key in data)
      return data[key];
  },
  /* 验证身份证 */
  checkCard(id_card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (id_card == '') {
      Toast({
        message: '请输入您的身份证！',
        duration: 1500
      });
      return false;
    }
    if (reg.test(id_card) === false) {
      Toast({
        message: '您输入的身份证不合法！',
        duration: 1500
      });
      this.flag = false;
      return false;
    }
    else {
      this.flag = true;
      return true;
    }
  },
};
export default utils
