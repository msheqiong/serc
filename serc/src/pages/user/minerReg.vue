<template>
  <div class="minerRegWrap">
    <Myheader title="注册矿工" txt="完成" @refreshList="registerMiner"></Myheader>
    <main class="content miner-reg">
      <!--<p @click="miner()">1111</p>-->
      <ul class="form box-wrap">
        <li>
          <label>矿工名称：</label>
          <input type="text" name="name" id="name" placeholder="请输入矿工名称" class="flex-6" v-model="name"/>
        </li>
        <li v-show="isShow">
          <label>交易密码：</label><input type="password" name="password" placeholder="请输入交易密码" class="flex-6"  v-model="password"/>
        </li>
      </ul>
      <div class="hint">
        <p class="blue">&sext; 需要支付 <span class="fee">{{fee}}</span></p>
      </div>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import {util} from "../../api/api"

  const AschJS = require("asch-js");
  import axios from "axios";

  export default {
    name: "miner-reg",
    components: {
      Myheader
    },
    data: function () {
      return {
        isShow:false,
        fee:"10000 SERC",
        name:"",
        password:"",
        account:"",
      }
    },
    created: function () {
      var _this = this;
      axios.get('https://node.servchain.net/api/delegates/get', {
        params: {
          publicKey: localStorage.publicKey
        }
      }).then(function (res) {
        console.log(res.data, "成功")
        if (res.data.success) {
          _this.$router.push("/miner")
        } else {
          axios.get('https://node.servchain.net/api/accounts',{
            params:{
              address: localStorage.address
            }
          }).then(function (res) {
            console.log(res.data, "成功")
            if (res.data.success) {
              var account = res.data.account;
              _this.account = account;
              if (account.secondSignature){
                _this.isShow = true;
              }
            }
          }).catch(function (res) {
            console.log(res, "失败")
          })


        }


      }).catch(function (res) {
        console.log(res, "失败")
      })
    },
    methods: {
      /*miner:function(){
        var _this = this;
        var name = this.name;
        if (util.isNull(name)) {
          window.alert('请输入矿工名称');
          $('input[name=name]').focus();
          return;
        }
        var password = '';
        if (this.isShow) {
          var password = this.password;
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
            window.alert('请正确输入交易密码');
            $('input[name=password]').focus();
            return;
          }
        }

        var fee = 1000000000000;
        if (localStorage.balance && localStorage.balance < fee) {
          window.alert('余额不足');
          return;
        }
        if(window.confirm('确认注册矿工“' + name + '”？<br/>此操作将消耗 ' + (fee / Math.pow(10, util.asset.precision)).toFixed(0) + ' ' + util.asset.name + '，点击确定继续注册！')){
          var trs = AschJS.delegate.createDelegate(name, localStorage.secret, password);
          console.log(trs);
          util.fetch('peer/transactions', {transaction: trs}, 'post', {
            version: util.version,
            'magic': util.magic
          }, function (json) {
            // console.log(json);
            if (json.success) {
              window.alert('注册矿工成功', function () {
                _this.$router.push("/miner")
              });
            } else {
              window.alert(json.error);
            }
          });
        }

      },*/
      registerMiner:function(){
        var _this = this;
        var name = this.name;
        if (util.isNull(name)) {
          window.alert('请输入矿工名称');
          $('input[name=name]').focus();
          return;
        }
        var password = '';
        if (this.isShow) {
          var password = this.password;
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
            window.alert('请正确输入交易密码');
            $('input[name=password]').focus();
            return;
          }
        }

        var fee = 1000000000000;
        if (localStorage.balance && localStorage.balance < fee) {
          window.alert('余额不足');
          return;
        }
        if(window.confirm('确认注册矿工“' + name + '”？<br/>此操作将消耗 ' + (fee / Math.pow(10, util.asset.precision)).toFixed(0) + ' ' + util.asset.name + '，点击确定继续注册！')){
          var trs = AschJS.delegate.createDelegate(name, localStorage.secret, password);
          console.log(trs);
          util.fetch('peer/transactions', {transaction: trs}, 'post', {
            version: util.version,
            'magic': util.magic
          }, function (json) {
            // console.log(json);
            if (json.success) {
              window.alert('注册矿工成功', function () {
                _this.$router.push("/miner")
              });
            } else {
              window.alert(json.error);
            }
          });
        }
      }
    }

  }
</script>

<style scoped>
  @import "../../assets/css/miner/miner.css";
  .miner-reg .hint{
    text-align: left;
  }

</style>
