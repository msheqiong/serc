<template>
  <div class="importWrap">
    <Myheader title="输入私银助记词" txt="输入"></Myheader>
    <main class="content login">
      <article class="word-wrap">
        <div class="box-wrap">
          <input type="text">
          <textarea class="word-box" contenteditable="true" name="words" id="words" placeholder="请输入或粘贴全部助记词"
                    v-model="zhi"></textarea>
          <div class="word-btns clearfix">
            <button class="word-clear" @click="clear()">清除</button>
            <button class="word-confirm" @click="confirm()">确认</button>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import {util} from "../../api/api"

  const AschJS = require('asch-js');
  import {newslist} from "../../api/api"
  import axios from "axios"

  export default {
    name: "import",

    components: {
      Myheader
    },
    data: function () {
      return {
        zhi: ""
      }
    },
    created: function () {

    },
    methods: {
      clear: function () {
        localStorage.secret = '';
        localStorage.publicKey = '';
        this.zhi = ""
      },
      confirm: function () {
        console.log(this.zhi);
        var This = this;
        var publicKey = AschJS.crypto.getKeys(this.zhi).publicKey;
        console.log(publicKey);
        if (this.zhi == null || this.zhi == undefined || this.zhi == '') {
          window.alert('请输入或粘贴全部助记词');
          return;
        }
        if (this.zhi.split(/\s+/).length != 12) {
          window.alert('助记词数量不正确');
          return;
        }
        var qs = require('qs');
        axios.post("https://node.servchain.net/api/accounts/open2",
          qs.stringify({publicKey: publicKey})
        ).then(function (json) {
          console.log(json)
          localStorage.address = json.data.account.address;
          localStorage.secret = This.zhi;
          localStorage.publicKey = publicKey;
          //console.log(localStorage.address);
          //  console.log(localStorage.secret);
          // console.log(localStorage.publicKey);
          localStorage.isLogin = true;
          This.$router.push("/home");
          // window.location.href="http://localhost:1234/#/home"

        }).catch(function (json) {
          console.log(json)
          window.alert(json.error);
          This.clear();
        })

      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/login/login.css";
</style>
