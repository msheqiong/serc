<template>
  <div class="logWrap">
    <Myheader title="资产日志"></Myheader>
    <main class="content asset-log">
      <ul>
        <li v-for="item in trs">
          <p>{{type(item)}}</p>
          <p>{{item.timestamp | time}}</p>
        </li>
        <!--<li>
          <p>资产 washi.WS 从 AMSnFrkbZhDPAiJnD6CjLGFXkcCJFybLtS 转账 100000 到 AAwaPPubTFEZ45ixHoUhVdHqy3pQCv556F</p>
          <p>2018/05/02 09:34:31</p>
        </li>
        <li>
          <p>资产 washi.LM 新发行 10000000</p>
          <p>2018/05/02 09:34:31</p>
        </li>
        <li>
          <p>资产 washi.LM 新发行 10000000</p>
          <p>2018/05/02 09:34:31</p>
        </li>
        <li>
          <p>资产 washi.LM 新发行 10000000</p>
          <p>2018/05/02 09:34:31</p>
        </li>
        <li>
          <p>资产 washi.LM 新发行 10000000</p>
          <p>2018/05/02 09:34:31</p>
        </li>-->
      </ul>
      <div class="more">
        <span class="blue" @click="more()">{{text}}</span>
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
    name: "log",
    components: {
      Myheader
    },
    data: function () {
      return {
        trs: "",
        //  p:"",
        json: "",
        pageSize:10,
        text:"查看更多",
      }
    },
    created: function () {
      var _this = this;
      var p = 0;
      p = util.parseInt(p);
      var pageSize = this.pageSize;
      var offset = p * pageSize;
      axios.get('https://node.servchain.net/api/uia/transactions/my/' + localStorage.address, {
        params: {
          orderBy: 't_timestamp:desc',
          limit: pageSize,
          offset: offset
        }
      }).then(function (res) {
        console.log(res.data, "成功")
        if (res.data.success) {
          _this.json = res.data;
          var trs = res.data.transactions;
          _this.trs = trs;
        }


      }).catch(function (res) {
        console.log(res, "失败")
      })
    },
    filters: {
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
    computed: {},
    methods: {
      type: function (trs) {
        var str = "";
        if (trs.type == 9) {
          str = '注册了发行商 ' + trs.asset.uiaIssuer.name
        } else if (trs.type == 10) {
          str = '注册了资产 ' + trs.asset.uiaAsset.name
        } else if (trs.type == 11 && trs.asset.uiaFlags.flagType == 1) {
          var arr = ['黑名单模式', '白名单模式']
          str = '资产 ' + trs.asset.uiaFlags.currency + ' 访问控制设置为 ' + arr[trs.asset.uiaFlags.flag]
        } else if (trs.type == 11 && trs.asset.uiaFlags.flagType == 2) {
          str = '资产 ' + trs.asset.uiaFlags.currency + ' 被注销'
        } else if (trs.type == 12) {
          str = '资产 ' + trs.asset.uiaAcl.currency + ' 更新了访问控制列表'
        } else if (trs.type == 13) {
          str = '资产 ' + trs.asset.uiaIssue.currency + ' 新发行 ' + (trs.asset.uiaIssue.amountShow || '?')
        } else if (trs.type == 14) {
          str = '资产 ' + trs.asset.uiaTransfer.currency + ' 从 ' + trs.senderId + ' 转账 ' + (trs.asset.uiaTransfer.amountShow || '?') + ' 到 ' + trs.recipientId
        }

        return str;
      },//
      more: function () {
        if (this.json.count <= this.pageSize) {
            this.text = "没有更多啦"
        }else{
          this.pageSize +=10;
         // console.log(this.pageSize)
          var _this = this;
          var p = 0;
          p = util.parseInt(p);
          var pageSize = this.pageSize;
          var offset = p * pageSize;
          axios.get('https://node.servchain.net/api/uia/transactions/my/' + localStorage.address, {
            params: {
              orderBy: 't_timestamp:desc',
              limit: pageSize,
              offset: offset
            }
          }).then(function (res) {
            console.log(res.data, "成功")
            if (res.data.success) {
              _this.json = res.data;
              var trs = res.data.transactions;
              _this.trs = trs;
            }


          }).catch(function (res) {
            console.log(res, "失败")
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/issue/issue.css";

  .asset-log li {

    text-align: left;
  }
</style>
