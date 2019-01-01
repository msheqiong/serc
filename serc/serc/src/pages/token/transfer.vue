<template>
  <div class="transferWrap">
    <Myheader :title="assetName"></Myheader>
    <main class="content transfer">
      <article class="money box-wrap">
        <div class="head">
          <img :src="src" alt=""/><!--src="../../assets/img/token/SERC.png":src="src"-->
        </div>
        <div class="info">
          <p>{{assetName}}</p>
          <p>{{balance}}</p>
        </div>
        <input type="hidden" name="currency" v-model="inputCur"/>
      </article>
      <article class="form box-wrap">
        <ul>
          <li>
            <label>发送账户：</label>
            <p class="flex-6 sender">{{assetInfo.address}}</p>
          </li>
          <li>
            <label>收款地址：</label>
            <input type="text" name="to" placeholder="请输入地址" class="flex-5" v-model="inputTo"/>
            <i><img src="../../assets/img/icon/contacts.png" alt=""/></i>
          </li>
          <li>
            <label>发送数量：</label>
            <input type="number" name="amount" placeholder="填写发送量" class="flex-6" @keyup="amount()"
                   v-model="inputAmount"/>
          </li>
          <li>
            <label>矿工费用：</label>
            <p class="flex-6" style="color: #f00;"><b class="fee">{{fee}}</b> <span
              class="name">{{utilAssetName}}</span><span
              style="float: right; color: gray;">余额：<b>{{Totalbalance}}</b></span></p>
            <input type="hidden" name="fee" value="1"/>
          </li>
          <li>
            <label>转账备注：</label>
            <input type="text" name="remark" placeholder="备注（选填）" class="flex-6" v-model="inputRemark"/>
          </li>
        </ul>
      </article>

      <div class="btn">
        <button class="btn-blue send" @click="send()">发送</button>
      </div>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import {util} from "../../api/api"
  import axios from "axios"
  import "../../assets/jquery-1.10.2.min"
  //import "../../plugins/sercjs/browserify-serc"
  import "../../plugins/require"
  const AschJS = require('asch-js');
console.log(AschJS)

  export default {
    name: "transfer",
    components: {
      Myheader
    },
    data: function () {
      return {
        assetName: "",
        assetInfo: "",
        src: "",
        utilAssetName: "",
        balance: "",
        Totalbalance: "",
        inputAmount: "",
        inputTo: "",
        fee: "",
        inputCur: "",
        inputPrecision: "",
        inputRemark: "",
        ppp: '123143'

      }
    },
    created: function () {

      var This = this;
      This.utilAssetName = util.asset.name;
      /*公用的*/
      axios.get('https://node.servchain.net/api/accounts',
        {
          params: {
            address: localStorage.address
          }
        }).then(function (res) {
        console.log(res.data, "成功")
        var account = res.data.account;
        This.assetInfo = account
        if (This.$route.query.id == util.asset.name) {
          This.balance = util.balance(account.balance);
        }
        This.Totalbalance = util.balance(account.balance);

        if (account.secondSignature) {
          localStorage.secondSignature = true;
          localStorage.secondPublicKey = account.secondPublicKey;
          $('.form ul').append('<li><label>交易密码：</label><input type="password" name="password" placeholder="请输入交易密码" class="flex-6" /></li>');
        }

        localStorage.balance = account.balance;

      }).catch(function (res) {
        console.log(res, "失败")
      })


      if (This.$route.query.id == util.asset.name) {
        This.assetName = this.$route.query.id;

      } else {
        This.assetName = This.$route.query.id.split(".")[1];
        axios.get('https://node.servchain.net/api/uia/user/asset/' + localStorage.address + '/' + This.$route.query.id,
          {}).then(function (res) {
          console.log(res.data, "成功")
          var asset = res.data.asset;
          This.balance = util.balance(asset.balance, 4, asset.precision);

          This.inputCur = asset.currency;
          This.inputPrecision = asset.precision;
          localStorage.assetBalance = asset.balance;
          localStorage.assetPrecision = asset.precision;


        }).catch(function (res) {
          console.log(res.data, "失败")
        })
      }


    },
    mounted: function () {

    },
    methods: {
      fn: function () {
        if (window.confirm("请确认")) {
          console.log(this.inputCur)
        }

      },
      amount: function () {

        if (util.parseFloat(this.inputAmount) <= 0) {
          this.inputAmount = 0;
          this.fee = 1;
          return;
        }
        this.inputAmount = util.parseFloat(this.inputAmount);

        var fee = this.inputAmount * Math.pow(10, util.asset.precision);
        fee = AschJS.transaction.calculateFee(fee) / Math.pow(10, util.asset.precision - 1);
        this.fee = fee;
      },
      send: function () {
        var to = this.inputTo;
        if (util.isNull(this.inputTo)) {
          window.alert('请输入收款地址');
          return;
        }
        if (this.inputTo == localStorage.address) {
          window.alert('不能转账给自己');
          return;
        }
        if (!AschJS.crypto.isAddress(this.inputTo)) {
          window.alert('收款地址不正确');
          return;
        }
        var amountShow = util.parseFloat(this.inputAmount);
        if (util.parseFloat(this.inputAmount) <= 0) {
          window.alert('请输入转账金额');
          return;
        }

        /*余额 */
        var currency = this.inputCur;
        var assetName = util.asset.name;
        var amount = 0, fee = 0;
        if (util.isNull(currency)) {// 主链资产
          currency = '';
          amount = amountShow * Math.pow(10, util.asset.precision);
          ;
          fee = AschJS.transaction.calculateFee(amount);
          if ((amount + fee) > localStorage.balance) {
            window.alert(assetName + '余额不足');
            return;
          }
        } else { // 侧链资产
          assetName = currency.split('.')[1];
          var precision = util.parseInt(this.inputPrecision);
          if (precision == 0) {
            window.alert('获取资产精度错误');
            return;
          }


          amount = amountShow * Math.pow(10, precision);
          if (amount > localStorage.assetBalance) {
            window.alert(assetName + '余额不足');
            return;
          }

          fee = AschJS.transaction.calculateFee(amount);

          if (fee > localStorage.balance) {
            window.alert(util.asset.name + '余额不足以支付矿工费用');
            return;
          }
        }
        /*密码*/

        var password = '';
        if (localStorage.secondSignature) {
          password = $('input[name=password]').val();
          if (util.isNull(password)) {
            window.alert('请输入钱包密码');
            return;
          }
        }
        /*备注*/
        var remark = this.inputRemark;
        if (util.isNull(remark)) remark = '';

        var feeShow = fee / Math.pow(10, 8);

        /*弹框*/

        if (window.confirm('请仔细确认转账信息：<br/>转账资产：' + assetName + '<br/>转账数量：' + amountShow + ' ' + assetName + '<br/>矿工费用：' + feeShow + ' ' + util.asset.name + '<br/>收款账户：<br/>' + to + '<br/><br/>请确保转信息正确，此操作无法撤销！')) {


          var transaction = util.isNull(currency)
            ? AschJS.transaction.createTransaction(to, amount, remark, localStorage.secret, password)
            : AschJS.uia.createTransfer(currency, amount, to, remark, localStorage.secret, password);

          console.log(transaction)


          var qs = require('qs');
          axios({//  qs.stringify({publicKey: publicKey})
            method: 'post',
            url: "https://node.servchain.net/peer/transactions",
            //data: {"transaction": transaction},
            data:qs.stringify({transaction: transaction}) ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              version: util.version,
              'magic': util.magic
            }
           // headers: {version: util.version, 'magic': "util.magic"}
          })  .then(function (response) {
              console.log(response.data);

            }).catch(function (error) {
            console.log(error);
          });


            /*   util.fetch('peer/transactions', {transaction: transaction}, 'post', {
                 version: util.version,
                 'magic': util.magic
               }, function (json) {
                 console.log(json)
                 if (json.success) {
                   console.log(json)
                 } else {
                   window.alert(json.error);
                 }
               });*/


        }

      }


    },

  }//methods
</script>

<style scoped>
  @import "../../assets/css/token/token.css";

  .transfer .money .info p {
    text-align: left;
  }
</style>
