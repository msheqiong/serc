<template>
    <div class="newsDetailsWrap">
      <Myheader title="资讯详情"></Myheader>
      <main class="content news-details">
        <div class="title">
          <h3></h3>
          <p></p>
        </div>
        <article class="news-content">
        </article>
      </main>
    </div>
</template>

<script>
  import Myheader from "../../components/myheader"
    export default {
        name: "newsDetails",
      components: {
        Myheader
      },
    }
</script>

<style scoped>
 @import "../../assets/css/news/news.css";
</style>
