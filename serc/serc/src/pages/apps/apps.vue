<template>
    <div class="appsWrap">
      <Myheader  title="应用中心"></Myheader>
      <main class="content application">
        <div class="tab-header">
          <div  :class='{active:!bol}' @click="content()"><span>应用列表</span></div>
          <div  :class='{active:bol}' @click="contentII()"  ><span>已安装应用</span></div>
        </div>
        <!--应用列表-->
        <article class="app-install none">
          <ul>
            <!--<li>
              <div class="icon">
                <img src="../../assets/images/test-head.png" alt="">
              </div>
              <div class="message">
                <p><span>应用名称</span></p>
                <p><span>应用简介应用简介应用简介</span></p>
              </div>
              <div class="operation">
                <span>安装</span>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/images/test-head.png" alt="">
              </div>
              <div class="message">
                <p><span>应用名称</span></p>
                <p><span>应用简介应用简介应用简介应用简介应用简介应用简介</span></p>
              </div>
              <div class="operation">
                <span>安装</span>
              </div>
            </li>-->
          </ul>
        </article>
        <!--已安装应用-->
        <article class="app-uninstall">
          <ul>
            <!--<li>
              <div class="icon">
                <img src="../../assets/images/test-head.png" alt="">
              </div>
              <div class="message">
                <p><span>应用名称</span></p>
                <p><span>应用简介应用简介应用简介</span></p>
              </div>
              <div class="operation">
                <span>卸载</span>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/images/test-head.png" alt="">
              </div>
              <div class="message">
                <p><span>应用名称</span></p>
                <p><span>应用简介应用简介应用简介应用简介应用简介应用简介</span></p>
              </div>
              <div class="operation">
                <span>卸载</span>
              </div>
            </li>-->
          </ul>
        </article>
      </main>
    </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import '../../assets/jquery-1.10.2.min'
    export default {
        name: "apps",
      components:{
        Myheader
      },
      data:function(){
         return{
           bol:true,

         }
      },
      methods:{
        content:function(){
           this.bol = false;

        },
        contentII:function(){
          this.bol = true;
        }
      }
    }
</script>

<style scoped>
 @import "../../assets/css/app/app.css";
 .tab-header > div.active {
   color: #3574fa;
   border-bottom: 1px solid #3574fa;
 }

</style>
