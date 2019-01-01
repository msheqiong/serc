<template>
    <div class="userListWrap" v-bind:class="{marginBotoom:isshow}">
        <div class="left">
         <!-- <img src="../assets/img/user/icon/10.png" alt="">-->
          <slot></slot>
          <span>{{txt}}</span>
        </div>

         <i class="right"></i>

    </div>
</template>

<script>
    export default {
      name: "user-list",
      props:["txt","isshow"]

    }
</script>

<style scoped>
   .userListWrap{
     background-color: white;
     border-bottom: 1px solid #e1e1e1;
     height: 2.6rem;
     line-height: 2.6rem;
     padding: 0 1.3rem 0 1.3rem;
     position: relative;
     display: table;
     width: 100%;
     box-sizing: border-box;
     background-image: url(../assets/img/user/user-right.png);
     background-position: 95% center;
     background-repeat: no-repeat;
     -webkit-background-size: 2%;
     background-size: 2%;
   }
   .userListWrap>div>img{
     width: 1.1rem;
     vertical-align: -12%;
   }
   .userListWrap>div>span {
     margin-left: .6rem;
   }
  .marginBotoom{
    margin-bottom:.5rem;
  }
</style>
