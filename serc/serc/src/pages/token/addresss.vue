<template>
  <div class="addressWrap">
    <Myheader title="收款码"></Myheader>
    <main class="content address">
      <article class="qr-code box-wrap">
        <input type="text" name="amount" id="amount" placeholder="收款金额"/>
        <div id="qrcode"></div>
      </article>

      <article class="address-copy box-wrap">
        <input name="address" id="address" v-model="address">
        <button class="btn-blue" data-clipboard-target="#address">复制收款地址</button>
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  //import QRCode from 'qrcode'
  import QRCode from 'qrcodejs2'
  import Clipboard from 'clipboard';
  export default {
    name: "addresss",
    components: {
      Myheader
    },
    data:function(){
      return{
        address:""
      }
    },
    created: function () {
      var This = this;
      axios.get('https://node.servchain.net/api/accounts',
        {params:{address: localStorage.address}}).then(function (res) {
        console.log(res.data)
        This.address = res.data.account.address;
        console.log(This.address);
        This.qrcode()
        /*点击复制*/
        var clipboard = new Clipboard('.btn-blue')
        clipboard.on('success', e => {
          window.alert('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          window.alert('请长按地址手动复制');
          // 释放内存
          clipboard.destroy()
        })
      }).catch(function (res) {
        console.log(res)
      })
    },
    mounted () {
    },
    methods: {
       qrcode:function() {
        let qrcode = new QRCode('qrcode', {
          text: localStorage.address,
          width: '100',
          height: '100',
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })

      }


    }//methods
  }
</script>

<style scoped>
  @import "../../assets/css/token/token.css";

</style>
