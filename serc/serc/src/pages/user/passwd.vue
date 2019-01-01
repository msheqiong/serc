<template>
  <div class="passwdWrap">
    <Myheader txt="确认" title="设置交易密码"></Myheader>

    <main class="content user-passwd">
      <ul class="form box-wrap none">
        <li>
          <label>交易密码：</label>
          <input type="password" name="passwd" id="passwd" placeholder="请输入交易密码" class="flex-6"/>
        </li>
        <li>
          <label>确认密码：</label>
          <input type="password" name="confirm" id="confirm" placeholder="再次输入交易密码" class="flex-6"/>
        </li>
      </ul>
      <div class="hint none">
        <p class="blue">&sext; 设置交易密码需要手续费 <span class="fee"></span></p>
      </div>
      <div class="has-set none">
        <img src="assets/img/exclam.png" />
        <div class="text">您的交易密码已设置。</div>
      </div>
    </main>
  </div>
</template>

<script>
  import "../../assets/jquery-1.10.2.min"
  import Myheader from "../../components/myheader"
  import {newslist} from "../../api/api"
  import {util} from "../../api/api"
  const AschJS = require('asch-js');

  export default {
    name: "passwd",
    components: {
      Myheader
    },
    data: function () {
      return {}
    },
    created: function () {
    },
    methods: {

    }//methods

  }
</script>

<style scoped>
  @import "../../assets/css/user/user.css";
</style>
