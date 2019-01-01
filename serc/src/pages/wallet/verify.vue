<template>
  <div class="verifyWrap">
    <Myheader title="验证私银助记词"></Myheader>
    <main class="content verify-word">
      <p>请根据你记下的私钥助记词，按顺序点击，验证你备 份的私钥助记词正确无误</p>
      <article class="word-box box-wrap">
       <!-- <li  v-for="(item,index) in wordsII" v-show="isshow">{{index}}{{item}}</li>-->

      </article>
      <ul class="word-list clearfix" >
        <li  v-for="(item,index) in words" @click="up(index)" :class="{'bg':bol}">{{index}}{{item}}</li>
        <!--<li class="bg"><span>bbb</span></li>
        <li class="bg"><span>ccc</span></li>
        <li class="bg"><span>ddd</span></li>
        <li class="bg"><span>eee</span></li>
        <li class="bg"><span>fff</span></li>
        <li class="bg"><span>ggg</span></li>
        <li class="bg"><span>hhh</span></li>
        <li class="bg"><span>iii</span></li>
        <li class="bg"><span>jjj</span></li>
        <li class="bg"><span>kkk</span></li>
        <li class="bg"><span>lll</span></li>
        <li class="bg"><span>mmm</span></li>
        <li class="bg"><span>nnn</span></li>
        <li class="bg"><span>ooo</span></li>-->
      </ul>
      <button class="btn-blue">完成验证</button>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import {util} from '../../api/api'

  export default {
    name: "verify",
    components: {
      Myheader
    },
    data: function () {
      return {
        words: [],
        isshow:true,
        bol:false,
        wordsII:["engine", "enjoy", "tribe", "poem", "humble", "nerve", "renew", "exhibit", "pledge", "bench", "solution", "citizen"],


      }
    },
    created: function () {//created: function () {
      var This = this;
      console.log(localStorage.newSecret.split(/\s/g))
      var words = util.randomSort(localStorage.newSecret.split(/\s/g))
      console.log(words)
      This.words = words;
      //This.wordsII = words;
      $('button').prop('disabled', true);

    },
    methods:{
      up:function(e){
        var obj = $(e.currentTarget);
       obj.addClass('bg')
       // obj.siblings().removeClass("bg")
       // console.log(obj.index())
        //var sd = obj.index();
         //$(".word-box li:eq(1)")
       // this.words.splice(key,1)



      /*  $('.word-box').append('<li data-idx="' + obj.index() + '">' + obj.text() + '</li>');

        if ($('.word-box span').length == 12) $('button').prop('disabled', false);*/
      },

    }
  }
</script>

<style scoped>
  @import "../../assets/css/login/login.css";
</style>
