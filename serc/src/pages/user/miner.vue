<template>
  <div class="minerWrap">
    <Myheader title="矿工收益"></Myheader>
    <main class="content earnings">
      <article class="trustee-info box-wrap">
        <div class="name">
          <i class="red">{{isEnable}}</i>
          受托人名称：
          <span class="blue">{{issuer.username}}</span>
        </div>
        <div class="total-revenue">
          总收益
          <b>{{issuer.forged | balance}}</b>
          <span>{{util}}</span>
        </div>
        <ul class="miner-info">
          <li>
            <p>排名</p>
            <span>{{issuer.rate}}</span>
          </li>
          <li>
            <p>生产率</p>
            <span>{{issuer.productivity + '%'}}</span>
          </li>
          <li>
            <p>得票率</p>
            <span>{{issuer.approval + '%'}}</span>
          </li>
        </ul>
      </article>

      <article class="income-details">
        <ul class="box-wrap">
          <li v-for="item in assets" @click="toBlock(item.id)">
            <div>
              ID：<span>{{item.id | hide}}</span>
              <b style="float:right;">{{item.height}}</b>
            </div>
            <div><!--{{item.totalAmount | balanceII}}-->
              交易：<span>{{item.numberOfTransactions+ "/" +(item.totalAmount | balanceII)}}</span>
              费用：<span>{{item.totalFee | balance}}</span>
              奖励：<span>{{item.reward | balanceIII}}</span>
              <i style="float:right;">{{item.timestamp | time}}</i>
            </div>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import {util} from "../../api/api"

  const AschJS = require("asch-js");
  import axios from "axios";

  export default {
    name: "miner",
    components: {
      Myheader
    },
    data: function () {
      return {
        json: "",
        issuer:"",
        util:"",
        isEnable:"",
        assets:"",

      }
    },
    created: function () {
      this.util = util.asset.name;
      var _this = this;
      axios.get('https://node.servchain.net/api/delegates/get', {
        params: {
          publicKey: localStorage.publicKey
        }
      }).then(function (res) {
        console.log(res.data, "成功")
        if (res.data.success) {
          _this.json = res.data;
          var json = res.data;
          _this.issuer = json.delegate;

          /*状态*/
          axios.get('https://node.servchain.net/api/delegates/forging/status',{
            params:{
              publicKey: localStorage.publicKey
            }
          }).then(function(res){
            console.log(res.data,"成功")
            if(res.data.success){
              _this.isEnable = '已启用'
            }else{
              _this.isEnable = '未启用'
            }
          }).catch(function(res){
            console.log(res,"失败")
          })

          /*显示数据*/
          axios.get('https://node.servchain.net/api/blocks',{
            params:{
              generatorPublicKey: localStorage.publicKey,
              orderBy: 'height:desc',
              limit: 20,
              offset: 0
            }
          }).then(function(res){
            console.log(res.data,"成功")
            if (res.data.success) {
              var assets = res.data.blocks;
              _this.assets = assets;

            }


          }).catch(function(res){
            console.log(res,"失败")
          })

        }else {
          _this.$router.push("/minerReg")
        }


      }).catch(function (res) {
        console.log(res, "失败")
      })
    },
    filters:{
      balance:function(s){
        return util.balance(s)
      },
      balanceII:function(s){
        return util.balance(s, 4)
      },
      balanceIII:function(s){
        return util.balance(s, 0)
      },
      hide:function(s){
        return util.hideMid(s)
      },
      time: function (value) {
        // console.log(value)
        var date = new Date(value * 10000);

        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + '  ' : date.getDate() + "   ";
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":";
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var time = Y + M + D + h + m + s;
        return time;

      }
    },
    methods:{
      toBlock:function(id){
        this.$router.push({
          path:"/block",
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/miner/miner.css";
  .earnings .income-details li{
    text-align: left;
  }
  div.name{
    text-align: left;
  }
</style>
