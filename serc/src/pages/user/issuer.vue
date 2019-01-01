<template>
  <div class="issuerWrap">
    <Myheader title="注册发行商" txt="完成"></Myheader>
    <main class="content issuer">
      <p @click="finish()">111</p>
      <ul class="form box-wrap">
        <li class="form-item">
          <label for="name">发行商名称：</label>
          <input class="flex-6" type="text" name="name" id="name" placeholder="请输入名称" v-model="name"/>
        </li>
        <li class="form-item">
          <label for="desc">发行商简介：</label>
          <input class="flex-6" type="text" name="desc" id="desc" placeholder="此处填写简介" v-model="desc"/>
        </li>
      </ul>
      <div class="hint">
        <p class="blue">&sext; 注册发行商需要支付 <span class="fee">{{1000+assetName}}</span></p>
      </div>
      <!--<div class="btn">
        <button class="btn-blue">提交</button>
      </div>-->
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  import {util} from "../../api/api"
  import "../../assets/jquery-1.10.2.min"

  const AschJS = require("asch-js")


  export default {
    name: "issuer",
    components: {
      Myheader
    },

    data: function () {
      return {
        assetName: "",
        name: "",
        desc: "",
        json: "",

      }
    },
    created: function () {
      this.assetName = util.asset.name;
      var _this = this;
      axios.get('https://node.servchain.net/api/uia/issuers/' + localStorage.address, {}).then(function (res) {
        console.log(res.data, "成功")

        if (res.data.success) {
          _this.$router.push("/issues")
        } else {
          axios.get('https://node.servchain.net/api/accounts',
            {
              params: {
                address: localStorage.address
              }
            }).then(function (res) {
            console.log(res.data, "成功")
            // console.log(AschJS.constants) undefined  //undefined
            _this.json = res.data;
            var account = res.data.account;
            if (account.secondSignature)
              $('.form ul').append('<li><label>交易密码：</label><input type="password" name="password" placeholder="请输入交易密码" class="flex-6" /></li>');


          }).catch(function (res) {

          })
        }
      }).catch(function (res) {
        console.log(res, "失败")

      })

    },
    methods: {
      finish: function () {
        var name = this.name;
        console.log(name)
        var account = this.json.account;
        if (util.isNull(name)) {
          window.alert('请输入发行商名称');
          $('input[name=name]').focus();
          return;
        }

        var desc = this.desc;
        if (util.isNull(desc)) {
          window.alert('请输入简介');
          $('input[name=desc]').focus();
          return;
        }
        var password = '';
        if (account.secondSignature) {
          var password = $('input[name=password]').val();
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
            window.alert('请正确输入交易密码');
            $('input[name=password]').focus();
            return;
          }
        }

        var fee = 100000000000;
        if (localStorage.balance && localStorage.balance < fee) {
          window.alert('余额不足');
          return;
        }
        if (window.confirm('确认注册发行商“' + name + '”？<br/>此操作将消耗 ' + (fee / Math.pow(10, util.asset.precision)).toFixed(0) + ' ' + util.asset.name + '，点击确定继续注册！')) {
          var trs = AschJS.uia.createIssuer(name, desc, localStorage.secret, password);
          console.log(trs);
          util.fetch('peer/transactions', {transaction: trs}, 'post', {
            version: util.version,
            'magic': util.magic
          }, function (json) {
            if (json.success) {
              window.alert('注册发行商成功', function () {
                Backbone.history.navigate('issues', {trigger: true});
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
  @import "../../assets/css/issue/issue.css";
</style>
