<template>
  <div class="registerWrap">
    <Myheader title="私银助记词"></Myheader>
    <main class="content new-words">
      <h2>请抄写好以下助记词</h2>
      <p>您只可以用这些单词恢复账户！一旦丢失，<br/>资产将无法找回！一旦泄露，资产将有被盗风险！</p>
      <article class="word-box box-wrap">
        <span v-for="item in words">{{item}} </span>
        <!--<span>relax</span>
        <span>relax</span>
        <span>relax</span>
        <span>relaxasasdsadsa</span>
        <span>relax</span>
        <span>relax</span>
        <span>relax</span>
        <span>ax</span>
        <span>relax</span>
        <span>relax</span>
        <span>relax</span>
        <span>relax</span>
        <span>relax</span>-->
      </article>
      <article class="hint">
        <h5>提示 :</h5>
        <p><span>&sext;</span> 建议手写或保存在离线设备中</p>
        <p><span>&sext;</span> 建议注册后立即恢复一次，以确保安全</p>
        <!--<div style="display: none;"><input type="text" id="secret" name="secret" value=""/></div>-->
        <!--<button class="btn-blue save" data-clipboard-target="#secret">复制</button>-->
        <button class="btn-blue next" @click="fn">下一步</button>
      </article>
    </main>
  </div>
</template>

<script>
  const AschJS = require('asch-js');
  console.log(AschJS);
  import Myheader from "../../components/myheader"
  //import "../../pages/plugins/bip39"
  // import "../../pages/plugins/words"
  import "../../assets/jquery-1.10.2.min"
  import {Mnemonic} from "../../plugins/bip39"

  export default {
    name: "register",
    components: {
      Myheader
    },
    data: function () {
      return {
        words: []
      }
    },

    created: function () {
      var _this = this;
      var mnemonic = new Mnemonic();
      localStorage.newSecret = mnemonic.generate(12 / 3 * 32);
      console.log(localStorage.newSecret);

      var words = localStorage.newSecret.split(/\s/g);

      _this.words = words;
      console.log(words)
      localStorage.newPublicKey = AschJS.crypto.getKeys(localStorage.newSecret).publicKey;
      console.log(localStorage.newPublicKey);
    },
    methods: {
      fn: function () {
        //this.$router.push("/verify")
        if (window.confirm('<span class="blue">助记词一但丢失，您钱包里的资产将会无法找回！</span>建议注册后立即恢复一次，并设置好交易密码，以确保安全！<span class="red">请确认已经安全的保存了助记词？</span>',
          )) {
          this.$router.push("/verify")
        }
      }
    }

  }
</script>

<style scoped>
  @import "../../assets/css/login/login.css";

  .word-box {
    word-break: keep-all;
  }

  .word-box > span {
    margin-right: 1rem;
  }
</style>
