<template>
  <div id="app">
    <Tabbar :isshow="isHide"></Tabbar>
    <router-view/>
  </div>
</template>

<script>
  import Tabbar from "./components/tabbar"

  export default {

    name: 'App',
    components:{
      Tabbar
    },
    data(){
      return{
        //需要头部  的路由
        headerIsHide:[],


        //需要底部  的路由
        footerIsHide:["/home","/news","/user","/addresss","/transfer","/wallet","/verify","/setting",'/currency',"/lang","/nodes","/msg","/issuer","/issues","/issuelog","/minerReg","/miner"],
        isHide:false
      }
    },
    watch:{
      $route(to,from){
        // console.log(to);
        // console.log(from);
        let path = to.path;
        this.isInArray3(this.footerIsHide,path);
      }
    },
    created(){
      // console.log(1);
      let path = this.$route.path;
      this.isInArray3(this.footerIsHide,path);
    },
    methods:{
      isInArray3:function (arr,value) {
        if(arr.indexOf&&typeof(arr.indexOf)=='function'){
          var index = arr.indexOf(value);
          if(index >= 0){
            this.isHide = true;
            return false;
          }
        }
        this.isHide = false;
        return false;
      }
    }
  }
</script>

<style>
  @import  "assets/css/base.css";
  @import  "assets/css/reset.css";
  *{
    padding:0;
    margin:0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}


</style>
