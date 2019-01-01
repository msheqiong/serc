<template>
  <div class="loginWrap">
    <Myheader title="输入私银助记词" txt="导入"  mark="home"></Myheader>
    <main class="content login">

      <article class="word-wrap">
        <p @click="alert()">111</p>
        <div class="box-wrap">
          <section class="word-box">
          </section>
          <div class="word-btns clearfix">
            <button class="word-clear">清除</button>
            <button class="word-confirm" @click="confirm()">确认</button>
          </div>
        </div>
      </article>

      <article class="search-wrap">
        <div class="search-box">
          <input type="text" name="word" id="word" placeholder="按顺序，一次输入一个单词"/>
        </div>
        <ul class="search-list">
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"

  export default {
    name: "login",
    components: {
      Myheader
    },
    created:function(){

    },
    methods:{
      alert:function(){
        this.$router.push("/import");
      }
    },
    confirm:function(){

    }

  }
</script>

<style scoped>
  @import "../../assets/css/login/login.css";
</style>
