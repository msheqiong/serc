<template>
    <div class="langWrap">
      <Myheader title="请选择语言"></Myheader>
      <main class="content lang">
        <ul>
          <li class="active" data-lang="cn">
            <span>简体中文</span>
            <i></i>
          </li>
          <li data-lang="en">
            <span>English</span>
            <i></i>
          </li>
          <!--<li data-lang="kr">
            <span>한국어</span>
            <i></i>
          </li>
          <li data-lang="lt">
            <span>ltaliano</span>
            <i></i>
          </li>
          <li data-lang="de">
            <span>Deutsch</span>
            <i></i>
          </li>
          <li data-lang="es">
            <span>español</span>
            <i></i>
          </li>-->
        </ul>
      </main>
    </div>
</template>

<script>
  import Myheader from "../../components/myheader"
    export default {
        name: "lang",
      components: {
        Myheader
      },
    }
</script>

<style scoped>
  @import "../../assets/css/login/login.css";
</style>
