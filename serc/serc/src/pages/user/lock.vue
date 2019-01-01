<template>
  <div class="lockWrap">
    <Myheader txt="确认" title="锁仓信息"></Myheader>

    <main class="content user-lock">
      <P @click="lock()">111</P>
      <ul class="form box-wrap " v-show="!isShow"><!--none-->
        <li>
          <label>区块高度：</label>
          <input type="number" name="height" id="height" placeholder="请输入解锁区块高度" class="flex-6" v-model="height"/>
        </li>
      </ul>
      <div class="unlock"></div>
      <div class="hint" v-show="!isShow"><!--none-->
        <p class="blue">&sext; 当前区块高度为 <span class="height">{{length}}</span>，只有区块高度达到设置的锁仓区块高度后，账户才会解锁。此操作需要消耗 <span
          class="fee">1 SERC</span></p>
      </div>
      <div class="has-set " v-show="isShow">
        <img src="../../assets/img/exclam.png"/>
        <div class="text">{{text}}</div>
      </div>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  import {util} from "../../api/api"

  const AschJS = require('asch-js');
  //const SercJS = require('../../plugins/sercjs/browserify-serc');
 // console.log(SercJS);

  export default {
    name: "lock",
    components: {
      Myheader
    },
    data: function () {
      return {
        isShow:false,
        json: "",
        length:"",
        height:"",
        text:"",


      }
    },
    created: function () {
      var _this = this;
      util.fetch('api/accounts', {address: localStorage.address}, 'get', function (json) {
        console.log(json);
        if (json.success) {
          _this.json = json;
          var account = json.account;
          if (!account.lockHeight || (account.lockHeight && account.lockHeight <= json.latestBlock.height)) {
            _this.isShow = false;
            _this.length = json.latestBlock.height
            if (account.secondSignature){
              $('ul.form').append('<li><label>交易密码：</label><input type="password" name="password" placeholder="请输入交易密码" class="flex-6" /></li>');
            }


          }else {
            _this.isShow = true;
            console.log(_this.isShow)
            _this.text =  _this.count(account.lockHeight, json.latestBlock.height)
          }
        }
      });
    },
    filters: {},
    computed: {
      fee: function () {
        console.log(AschJS.constants)
        //console.log(AschJS.constants.fees.secondsignature)
        // return (AschJS.constants.fees.secondsignature / Math.pow(10, util.asset.precision)) + ' ' + util.asset.name
      }
    },
    methods: {
      lock:function(){

        var height = this.height;
        if (!height) {
          window.alert('请输入解锁区块高度');
          $('input[name=height]').focus();
          return;
        }
        var diff = height - this.json.latestBlock.height;
        if (diff <= 0 || diff >= 10000000) {
          window.alert('锁仓高度必须大于当前区块高度，并且锁仓周期少于 10000000 个区块间隔');
          $('input[name=height]').focus();
          return;
        }
        var password = '';
        var account = this.json.account;
        if (account.secondSignature) {
          var password = $('input[name=password]').val();
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
            window.alert('请正确输入交易密码');
            $('input[name=password]').focus();
            return;
          }
        }
       // var fee = AschJS.constants.fees.lock;
        var fee = 100000000;
        if (account.balance && account.balance < fee) {
          window.alert('余额不足');
          return;
        }

        if(window.confirm('确认账户锁定到区块高度为“' + height + '”后解锁？<br/>锁仓后账户转账等操作将无法使用，此操作还将消耗 ' + (fee / Math.pow(10, util.asset.precision)).toFixed(0) + ' ' + util.asset.name + '，点击确定继续！')){
          var trs =AschJS.transaction.createLock(height, localStorage.secret, password)
          console.log(trs);
          util.fetch('peer/transactions', {transaction: trs}, 'post', {
            version: util.version,
            'magic': util.magic
          }, function (json) {
            console.log(json);
            if (json.success) {
              window.alert('锁仓成功', function () {
                // Backbone.history.navigate('miner', {trigger: true});
                location.reload();
              });
            } else {
              window.alert(json.error);
            }
          });
        }

      },
      count: function (height, current) {
        height = util.parseInt(height);
        var diff = height - util.parseInt(current);
        if (diff > 0 && diff < 10000000) {
          var sec = diff * 10; // 10 秒产生一个区块
          var min = 0, hour = 0, days = 0;
          if (sec > 60) {
            min = Math.floor(sec / 60);
            sec = sec % 60;
            if (min > 60) {
              hour = Math.floor(min / 60);
              min = min % 60;
              if (hour > 24) {
                days = Math.floor(hour / 24);
                hour = hour % 24;
              }
            }
          }
          return '锁仓大约在' + (days > 0 ? days + '天' : '') + (hour > 0 ? hour + '时' : '') + (min > 0 ? min + '分' : '') + (sec > 0 ? sec + '秒' : '') + '后释放';
        }
        return '';
      },
    }
  }
</script>

<style scoped>
  @import "../../assets/css/user/user.css";
</style>
