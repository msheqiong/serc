<template>
  <div class="tabbarWrap" v-if="isshow">
    <Item txt="资产" mark="home" :sel="selected" @change="getValue">
      <img src="../assets/images/footer/property.png" alt="" slot="normalImg">
      <img src="../assets/images/footer/property-active.png" alt="" slot="activeImg">
    </Item>
    <Item txt="资讯" mark="news" :sel="selected" @change="getValue">
      <img src="../assets/images/footer/news.png" alt="" slot="normalImg">
      <img src="../assets/images/footer/news-active.png" alt="" slot="activeImg">
    </Item>
    <Item txt="个人" mark="user" :sel="selected" @change="getValue">
      <img src="../assets/images/footer/user.png" alt="" slot="normalImg">
      <img src="../assets/images/footer/user-active.png" alt="" slot="activeImg">
    </Item>

  </div>
</template>

<script>
  import Item from './item'
  export default {
    name: "tabbar",
    props:["isshow"],
    components:{
      Item
    },
    data:function(){
      return{
        selected:"home"
      }
    },
    methods:{
      getValue:function(v){
        this.selected = v;
      }
    }
  }
</script>

<style scoped>
  .tabbarWrap{
    width:100%;
    height:3rem;
    /*border-top: 1px solid #ccc;*/
    position:fixed;
    bottom:0px;
    background-color: white;
    z-index: 99999;
  }
</style>
