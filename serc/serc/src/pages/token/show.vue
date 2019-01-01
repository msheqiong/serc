<template>
  <div class="showWrap">
    <Myheader title="交易记录"></Myheader>
    <main class="content particulars">
      <p class="sum">
        <!--<i>+</i>-->
        <span class="value">{{asset}}</span>
        <span class="unit">{{currency}}</span>
      </p>
      <article class="detail">
        <dl class="detail-first">
          <dt>发送方</dt>
          <dd class="sender">{{trs.senderId}}</dd>
          <dt>接收方</dt>
          <dd class="recipient">{{trs.recipientId}}</dd>
          <dt>矿工费用</dt>
          <dd class="fee">{{(trs.fee / Math.pow(10, precision)).toFixed(4) + ' ' +assetName}}</dd>
          <dt>备注</dt>
          <dd class="remark">{{trs.message}}</dd>
        </dl>
        <div class="relative">
          <dl class="detail-last">
            <dt>交易号</dt>
            <dd class="blue id" @click="toShow(trs.id)">{{hideMid}}</dd>
            <dt>区块</dt>
            <dd class="block" @click="toBlock(trs.blockId)">{{trs.blockId | hideen}}</dd>
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
  import {util} from "../../api/api"
  import QRCode from "qrcodejs2"
  import Clipboard from 'clipboard';

  const AschJS = require('asch-js');
  export default {
    name: "show",
    components: {
      Myheader
    },
    data:function(){
      return{
        asset:"",
        currency:"",
        trs:"",
        precision:"",
        assetName:"",
        url:"",
      }
    },
    created: function () {
      var This = this;
      This.precision = util.asset.precision;
      This.assetName = util.asset.name;
      var id = this.$route.query.id//this.$route.query.id;
      //console.log(id)
      axios.get('https://node.servchain.net/api/uia/asset/transaction/'+id,{}).then(function (res) {
        console.log(res.data)
       // console.log(res.data.transaction.asset .uiaTransfert.currency)
        var trs = res.data.transaction;
        This.trs = trs;
        var asset = trs.asset.uiaTransfer;
        var currency = asset.currency;
        if (trs.asset && trs.asset.uiaTransfer) {
          //(asset.amount /Math.pow(10, asset.precision)).toFixed(4)
          This.asset = (trs.asset.uiaTransfer.amount /Math.pow(10, trs.asset.uiaTransfer.precision)).toFixed(4);
      This.currency =currency.split('.')[1];
        }else{
          This.asset  = (trs.amount /Math.pow(10, util.asset.precision)).toFixed(4);
          This.currency =util.asset.name;
        }

        var url = 'http://explorer.servchain.net/#tx?id=' + trs.id;
        This.url = url;
        /*二维码*/
        function qrcode(){
          let qrcode = new QRCode('qrcode',{
            width:83,
            height:83,
            text:url

          })
        }
        qrcode();
        /*点击复制*/
        console.log(Clipboard);
        var clipboard = new Clipboard('.btn-copy')
        clipboard.on('success', e => {
          window.alert('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          window.alert('请点击交易号直接访问');
          // 释放内存
          clipboard.destroy()
        })


      }).catch(function (res) {
        console.log(res)
      })
    },
    methods: {
      toBlock:function(id){
        this.$router.push({
          path:"/block",
          query:{
            id:id
          }
        })
      },
      toShow:function(id){
        //console.log(id);
        this.$router.push({
          path:"/show",
          query:{
            id:id
          }
        })
      },

    },
    computed:{
      hideMid:function(){
        return util.hideMid(this.trs.id)
      },
      timestamp:function(){
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
    filters:{
      hideen:function(s){
        return  util.hideMid(s)
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/token/token.css";
</style>
