import axios from "axios"
//axios.defaults.baseURL = '../../static';//配置端口
axios.defaults.baseURL = 'https://node.servchain.net';//node.servchain.net
import "../assets/jquery-1.10.2.min"
var qs = require('qs');//处理参数的模块


//params
/*home*/
export const newslist = (params)=>{
  return axios.get('/api/accounts',{params:params})
    .then(res=>res.data).catch(res=>res.data)
}

export const  util = util || {};

var protocol = 'https:'

util.host = 'mapping.servchain.net';
util.host_port = '';
util.version = '1.0.1';
util.magic = '46677eef';
util.node = 'node.servchain.net';
util.node_port = '';
util.cdn = 'cdn.servchain.net';


util.cdn = protocol + '//' + util.cdn + '/';
util.server = protocol + '//' + util.host + (util.host_port ? ':' + util.host_port : '') + '/';
util.node = protocol + '//' + util.node + (util.node_port ? ':' + util.node_port : '') + '/';


util.randomSort= function(arr){
  var i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};
util.asset = {
  name: 'SERC',
  // fee: 100000000,
  precision: 8,
  chain_name: 'serchain'
};
util.balance = function (balance, digits, precision) {
  balance = parseFloat(balance);
  if (isNaN(balance) || balance == 0) return 0;

  precision = parseInt(precision);
  if (isNaN(precision)) precision = util.asset.precision;

  balance = balance / Math.pow(10, precision);
  return digits ? balance.toFixed(digits) : balance;
};
util.hideMid = function (s, t) {
  if (!t) t = '';
  return s ? s.substr(0, 6) + '...' + s.substr(s.length - 10) : t;
}

export const jsonpGet = function (api, params, callback, fn, err, loading) {
  // if (!loading) window.loading.show()
  return $.ajax({
    dataType: 'jsonp',
    url: util.server + api,
    data: params,
    cache: false,
    success: function (reJson) {
      // if (!loading) window.loading.close();
      if (reJson.code == '11' || reJson.code == '12') {
        window.confirm('会话超时，是否重新登录？', function () {
          Backbone.history.navigate('login', {trigger: true})
        });
      } else if (reJson.code == '0') {
        Backbone.history.navigate('home', {trigger: true})
      } else if (reJson.code == 110) {
        layer.open({
          content: reJson.msg
          , btn: '我知道了'
          , yes: function (index) {
            Backbone.history.navigate('login', {trigger: true});
            layer.close(index);
          }
        });
      } else {
        if (reJson.msg) {
          var msg = reJson.msg
          if (msg.indexOf('|') > -1) reJson.msg = msg.split('|')[0]
        }
        if (fn) fn(reJson)
      }
    },
    error: function (e) {
      // window.loading.close()
      // toast('您的网络异常，请重试')
      if (err) err()
    }
  })
};


/**
 * 映射接口
 * @param api
 * @param params
 * @param callback
 * @param fn
 * @param err
 * @param loading
 * @returns {*}
 */
window.jsonpGet = function (api, params, callback, fn, err, loading) {
  // if (!loading) window.loading.show()
  return $.ajax({
    dataType: 'jsonp',
    url: util.server + api,
    data: params,
    cache: false,
    success: function (reJson) {
      // if (!loading) window.loading.close();
      if (reJson.code == '11' || reJson.code == '12') {
        window.confirm('会话超时，是否重新登录？', function () {
          Backbone.history.navigate('login', {trigger: true})
        });
      } else if (reJson.code == '0') {
        Backbone.history.navigate('home', {trigger: true})
      } else if (reJson.code == 110) {
        layer.open({
          content: reJson.msg
          , btn: '我知道了'
          , yes: function (index) {
            Backbone.history.navigate('login', {trigger: true});
            layer.close(index);
          }
        });
      } else {
        if (reJson.msg) {
          var msg = reJson.msg
          if (msg.indexOf('|') > -1) reJson.msg = msg.split('|')[0]
        }
        if (fn) fn(reJson)
      }
    },
    error: function (e) {
      // window.loading.close()
      // toast('您的网络异常，请重试')
      if (err) err()
    }
  })
};


/**
 * 公链节点接口
 * @param url
 * @param data
 * @param method
 * @param header
 * @param success
 * @param error
 */
util.fetch = function (url, data, method, header, success, error) {
  if (typeof (header) == "function") {
    if (success != undefined) error = success;
    success = header;
    header = {};
  }
  $.ajax({
    url: util.node + url,
    data: data,
    type: method,
    headers: header,
    dataType: 'json',
    // contentType: 'application/json',
    cache: false,
    success: function (result) {
      if (success)
        success(result);
    },
    error: function (e) {
      if (error)
        error(e)
    }
  });
};


util.isNull = function (x) {//判断x 是不是一个空值  如果是  返回 true 否则flase
  return x == null || x == undefined || x == '';
};
util.parseFloat = function (float, digits) {
  float = parseFloat(float);
  if (isNaN(float)) float = 0;

  return digits ? float.toFixed(digits) : float;
};


/**
 * 交易类型
 * @param val
 * @returns {string}
 */
util.trsType = function (val) {
  const TYPE_LABEL = [
    'TRS_TRANSFER',
    'TRS_SECOND_PASSWORD',
    'TRS_DELEGATE',
    'TRS_VOTE',
    'TRS_MULTISIGNATURE',
    'TRS_DAPP',
    'TRS_DEPOSIT',
    'TRS_WITHDRAWAL',
    'TRS_STORAGE',
    'TRS_UIA_ISSUER',
    'TRS_UIA_ASSET',
    'TRS_UIA_FLAGS',
    'TRS_UIA_ACL',
    'TRS_UIA_ISSUE',
    'TRS_UIA_TRANSFER'
  ];
  return val === 100 ? 'TRS_TYPE_LOCK' : TYPE_LABEL[val];
};

/**
 * 交易类型中文
 * @param val
 * @returns {string}
 */
util.trsTypeText = function (val) {
  /*
  // transaction type filter
  TRS_TYPE_TRANSFER: '转账',
  TRS_TYPE_SECOND_PASSWORD: '二级密码',
  TRS_TYPE_DELEGATE: '受托人',
  TRS_TYPE_VOTE: '投票',
  TRS_TYPE_MULTISIGNATURE: '多重签名',
  TRS_TYPE_DAPP: '注册应用',
  TRS_TYPE_DEPOSIT: '应用充值',
  TRS_TYPE_WITHDRAWAL: '应用提现',
  TRS_TYPE_STORAGE: '存储',
  TRS_TYPE_UIA_ISSUER: '注册发行商',
  TRS_TYPE_UIA_ASSET: '注册资产',
  TRS_TYPE_UIA_FLAGS: '资产设置',
  TRS_TYPE_UIA_ACL: '资产访问控制',
  TRS_TYPE_UIA_ISSUE: '资产发行',
  TRS_TYPE_UIA_TRANSFER: '资产转账',
  TRS_TYPE_LOCK: '锁仓'
  */
  const TYPE_LABEL = [
    '转账',
    '设置密码',
    '注册矿工',
    '投票',
    '多重签名',
    '注册应用',
    '应用充值',
    '应用提现',
    '存储',
    '注册发行商',
    '注册资产',
    '资产设置',
    '资产访问控制',
    '发行资产',
    '资产转账'
  ];
  return val === 100 ? '锁仓' : TYPE_LABEL[val];
};

/**
 * 转换 int
 * @param int
 * @returns {number | *}
 */
util.parseInt = function (int) {
  int = parseInt(int);
  if (isNaN(int)) int = 0;
  return int;
};

/**
 * 转换 float
 * @param float
 * @param digits
 * @returns {any}
 */
util.parseFloat = function (float, digits) {
  float = parseFloat(float);
  if (isNaN(float)) float = 0;

  return digits ? float.toFixed(digits) : float;
};


/**
 * 转换余额
 * @param balance 余额
 * @param digits 小数位数
 * @param precision 精度
 * @returns {*}
 */
util.balance = function (balance, digits, precision) {
  balance = parseFloat(balance);
  if (isNaN(balance) || balance == 0) return 0;

  precision = parseInt(precision);
  if (isNaN(precision)) precision = util.asset.precision;

  balance = balance / Math.pow(10, precision);
  return digits ? balance.toFixed(digits) : balance;
};

util.clearHtml = function (html) {
  html = html.replace(/width="\d+"/g, '');
  html = html.replace(/height="\d+"/g, '');
  html = html.replace(/style="(.*?)"/g, '');
  return html;
}






























































































