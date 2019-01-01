<template>
     <div class="mapWrap">
       <Myheader title="资产映射"></Myheader>
       <main class="content assets-map">
         <!--<ul class="asset-info box-wrap">
           <li>
             <label>名称：</label>
             <span>washi</span>
           </li>
           <li>
             <label>描述：</label>
             <span>washi tech.</span>
           </li>
         </ul>-->
         <ul class="asset-list box-wrap">
         </ul>
       </main>
     </div>
</template>

<script>
  import Myheader from "../../components/myheader"
    export default {
        name: "maps",
      components:{
        Myheader
      }
    }
</script>

<style scoped>
  @import  "../../assets/css/map/map.css";
</style>
