<template>
  <div class="newsWrap ">


    <div class="content news">
      <!--轮播-->
      <Banner swiperid="go" :autoplayNum=5000>
        <div slot="swiper-con" class="swiper-slide">
          <img src="../assets/images/banner.png" alt="">
        </div>
        <div slot="swiper-con" class="swiper-slide">
          <img src="../assets/images/banner.png" alt="">
        </div>
        <div slot="swiper-con" class="swiper-slide">
          <img src="../assets/images/banner.png" alt="">
        </div>

      </Banner>
      <article class="app-wrap">
        <h3>应用</h3>
        <div class="app swiper-container">
          <div class="swiper-wrapper">
            <!--<div class="swiper-slide">
              <img src="../../assets/images/test-head.png" alt=""/>
              <p>应用名称1</p>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/test-head.png" alt=""/>
              <p>应用名称2</p>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/test-head.png" alt=""/>
              <p>appName3</p>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/test-head.png" alt=""/>
              <p>appName4</p>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/test-head.png" alt=""/>
              <p>appName5</p>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/test-head.png" alt=""/>
              <p>应用名称6</p>
            </div>-->
          </div>
        </div>
      </article>
      <article class="article-wrap">
        <h3>文章</h3>
        <ul class="article">
          <!-- <router-link to="newsDetails">-->
          <li v-for="item in data" @click="toShow(item.id)">
            <h4 class="title">{{item.title}}</h4>
            <p>
              <span>{{item.source}}</span>
              <span>{{item.addtime | timeF}}</span>
            </p>
          </li>
          <!--  </router-link>-->

          <!--  <li>
              <h4 class="title">通知：以太坊网络拥堵硬气打包超市说明通知：以太坊网络拥堵硬气打包超市说明</h4>
              <p>
                <span>token.im</span>
                <span>2018-3-23</span>
              </p>
            </li>
            <li>
              <h4 class="title">通知：以太坊网络拥堵硬气打包超市说明</h4>
              <p>
                <span>token.im</span>
                <span>2018-3-23</span>
              </p>
            </li>
            <li>
              <h4 class="title">通知：以太坊网络拥堵硬气打包超市说明</h4>
              <p>
                <span>token.im</span>
                <span>2018-3-23</span>
              </p>
            </li>-->
        </ul>
        <div class="more">
          <span @click="more()">{{moretext}}</span>
        </div>
      </article>
    </div>

  </div>
</template>

<script>
  import Banner from "../components/banner"
  import axios from "axios"
  import {newslist, jsonget} from "../api/api"
  import {jsonpGet} from "../api/api"
  import "../assets/jquery-1.10.2.min"
  //import "../assets/js/vue-resource.js"


  export default {
    name: "news",

    components: {
      Banner

    },
    data: function () {
      return {
        data: "",
        length: "",
        last_page: "",
        pageSize: 5,
        moretext: "",

      }
    },
    created: function () {
      var This = this;

      var page = 1;
      window.jsonpGet('news/index', {page: page, pageSize: This.pageSize}, 'apps', function (json) {
        console.log(json);
        if (json.code == 1) {
          var data = json.data;
          var last = data.last_page;
          This.length = data.total;
          This.last_page = data.last_page;
          data = data.data;
          This.data = data;
          This.moretext = "查看更多"

          // console.log(This.data)
          if (last > page) {

          }
        }
      });


      /*axios.get('https://mapping.servchain.net/news/index', {
        params: { //请求参数
          page: 1, pageSize: 5
        }
      }).then(function (res) {
        console.log(res, "成功");
      }).catch(function (res) {
        console.log(res, "失败");
      })*/

      /*post*/
      /* axios.post('news/index', {
         page: 1,
         pageSize: 5
       })
         .then(function (response) {
           console.log(response,"成功");
         })
         .catch(function (error) {
           console.log(error,"失败");
         });*/

      /* axios.post('https://mapping.servchain.net/news/index?', {
         page: 1, pageSize: 5
       })
         .then(function (res) {
           console.log(res, "成功");
         })
         .catch(function (res) {
           console.log(res, "失败");
         });*/


    },//created结束符
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
    methods: {
      more: function () {
        // console.log(this.last_page)


        if (this.last_page > 1) {

          this.pageSize += 5
          var This = this;
          window.jsonpGet('news/index', {page: 1, pageSize: This.pageSize}, 'apps', function (json) {
            console.log(json);
            if (json.code == 1) {
              var data = json.data;
              var last = data.last_page;
              This.length = data.total;
              This.last_page = data.last_page;
              data = data.data;
              This.data = data;
            }
          });
        } else {
          this.moretext = "没有更多啦";

        }
      },
      toShow:function(id){
        console.log(id)
        this.$router.push({
          path:"/newShow",
          query:{
            id:id
          }
        })
      }
    }

  }
</script>

<style scoped>
  @import "../assets/css/news/news.css";

  .news .app-wrap {
    text-align: left;
  }

  .news .article-wrap > h3 {
    text-align: left;
  }

  .news .article h4 {
    text-align: left;
  }

  .news .article p {
    text-align: left;
  }
</style>
