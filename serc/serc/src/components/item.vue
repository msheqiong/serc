<template>
  <div class="itemWrap" @click="fn()">
    <span v-show="!bol"><slot name="normalImg"></slot></span>
    <span v-show="bol"><slot name="activeImg"></slot></span>

    <p :class="{active:bol}">{{txt}}</p>

  </div>
</template>

<script>
  export default {
    name: "item",
    props:["txt","mark","sel"],
    computed:{
      bol:function(){
        if(this.mark==this.sel){
          return true;
        }
        return false;
      }
    },
    methods:{
      fn:function(){
        this.$emit("change",this.mark);//传出mark值
        this.$router.push("/"+this.mark)
      }
    }


  }
</script>

<style scoped>
  .itemWrap{
    width:33.333333%;
    float:left;
    text-align: center;
    margin-top:3.5px;
  }
  .itemWrap img{
    width:28px;
  }
  .itemWrap p{
    font-size: .64rem;
    color:grey;
  }
  .itemWrap p.active{
    color:#000;
  }
</style>

