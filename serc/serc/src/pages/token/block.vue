<template>
  <div class="blockWrap">
    <Myheader :title="title"></Myheader>
    <main class="content particulars">
      <!--<p class="sum">
        &lt;!&ndash;<i>+</i>&ndash;&gt;
        <span class="value">0.0000</span>
        <span class="unit"></span>
      </p>-->
      <article class="detail">
        <dl class="detail-first">
          <dt>生产者</dt>
          <dd class="generator">{{trs.generatorId}}</dd>
          <dt>生产者公钥</dt>
          <dd class="generatorKey">{{trs.generatorPublicKey | hide}}</dd>
          <dt>版本</dt>
          <dd class="version">{{trs.version}}</dd>
          <dt>高度</dt>
          <dd class="height">{{trs.height}}</dd>
          <dt>奖励</dt>
          <dd class="reward">{{(trs.reward / Math.pow(10, util.asset.precision)).toFixed(4) + ' ' + util.asset.name}}
          </dd>
          <dt>交易数/总额</dt>
          <dd class="trans">{{trs.numberOfTransactions + '/' + (trs.totalAmount / Math.pow(10,
            util.asset.precision)).toFixed(4) + (trs.totalFee > 0 ? '(' + (trs.totalFee / Math.pow(10,
            util.asset.precision)) + ')' : '') + ' ' + util.asset.name}}
          </dd>
        </dl>
        <div class="relative">
          <dl class="detail-last">
            <dt>ID</dt>
            <dd class="blue id" @click="toShow(trs.id)">{{trs.id | hide}}</dd>
            <dt>摘要</dt>
            <dd class="payload">{{trs.payloadHash | hide}}</dd>
            <dt>上一区块</dt>
            <dd class="previous" @click="toBlock(trs.previousBlock)">{{trs.previousBlock | hide}}</dd>
            <dt>交易时间</dt>
            <dd class="timestamp">{{timestamp}}</dd>
          </dl>
          <div class="QR-code">
            <div id="qrcode"></div>
            <p class="btn-copy" :data-clipboard-text="url">复制 URL</p>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  import QRCode from "qrcodejs2"
  import Clipboard from "clipboard"
  import {util} from "../../api/api"

  export default {
    name: "block",
    components: {
      Myheader
    },
    data: function () {
      return {
        title: "区块记录",
        trs: "",
        util: "",
        url: "",


      }
    },
    created: function () {
      var id = this.$route.query.id;
      this.util = util;
      //console.log(id)
      var This = this;
      axios.get('https://node.servchain.net/api/blocks/get',
        {
          params: {
            id: id
          }
        }).then(function (res) {
        console.log(res.data, "成功")
        var trs = res.data.block;
        This.trs = trs;
        var url = 'http://explorer.servchain.net/#block?height=' + trs.height;
        This.url = url;
        /*二维码*/
      function qrcode(){
        let qrcode = new QRCode('qrcode',{
          text:url,
          width:83,
          height:83,
        })
      }
        qrcode();
      /*复制*/
      var clipboard = new Clipboard('.btn-copy')
        clipboard.on("success",function(e){
          window.alert('复制成功');
          clipboard.destroy()
        })
        clipboard.on('error',function(e){
          window.alert('请点击交易号直接访问');
          clipboard.destroy()
        })

      }).catch(function (res) {
        console.log(res, "失败")
      })
    },//created
    filters: {//filters
      hide: function (s) {
        return util.hideMid(s)
      }
    },
    computed: {
      /*时间*/
      timestamp: function () {
        var date = new Date(this.trs.timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + '  ' : date.getDate() + "   ";
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":"
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var time = Y + M + D + h + m + s;
        return time;
      }

    },
    methods: {
   /*   toShow: function (id) {
        console.log(id)
        this.$router.push({
          path: "/show",
          query: {
            id: id
          }
        })
      },*/
      /*toBlock: function (id) {
        console.log(id)
         this.$router.push({
           path:"/block",
           query:{
             id:id
           }
         })
      }*/
    }

  }
</script>

<style scoped>
  @import "../../assets/css/token/token.css";
</style>
