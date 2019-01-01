<template>
  <div class="myheaderWrap">
    <header>
      <i @click="back()" class="icon-back back"></i>
      <i class="icon-fun ok" @click="fn()">{{txt}}</i>
      <span>{{title}}</span>
    </header>
  </div>
</template>

<script>
  export default {
    name: "myheader",
    props: ["txt", "title", "mark"],
    data:function(){
      return{
        anli:"qwqerty",
      }
    },
    methods: {
      back: () => {
        window.history.back();
      },
      fn:function(){
        //alert(111)
        this.$emit('refreshList');
      }
    }//methods
  }
</script>

<style scoped>

</style>
