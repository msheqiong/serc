<template>
  <div class="newShowWrap">
    <Myheader :title="title"></Myheader>
    <main class="content news-details">
      <div class="title">
        <h3>{{data.title}}</h3>
        <p>{{data.addtime |timeF}}</p>
      </div>
      <article class="news-content">
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  import "../../assets/jquery-1.10.2.min"
  import {util} from "../../api/api"

  export default {
    name: "new-show",
    components: {
      Myheader
    },
    data: function () {
      return {
        title: "资讯详情",
        data: "",
        ASD: "<span>123</span>",
      }
    },
    created: function () {
      //ASD:"<span>123</span>"
      var This = this;
      var id = this.$route.query.id;
      window.jsonpGet('news/show', {id: id}, 'news', function (json) {
        console.log(json);
        if (json.code == 1) {
          var data = json.data;
          This.data = data;
          $(".news-content").html("").append(util.clearHtml(data.content));
          $(".news-content img").css("width","100%")


        }
      });
    },
    filters: {
      timeF: function (value) {
        // console.log(value)
        var date = new Date(value * 1000);

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

  }
</script>

<style scoped>
  @import "../../assets/css/news/news.css";
</style>
