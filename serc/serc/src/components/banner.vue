<template>
    <div class="bannerWrap" >
      <div class="swiper-container" :id="swiperid">
        <div class="swiper-wrapper">
          <slot name="swiper-con"></slot>
         </div>

      </div>
    </div>
</template>

<script>
  import  "../assets/swiper/js/swiper.js"
    export default {
        name: "banner",
      props:{
        swiperid:{
            type:String,
            default:''
          },
        directionType:{
            type:String,
          default:'horizontal'
        },
        autoplayNum:{
            type:Number,
          default:2000
        }

      },
      mounted:function(){
          //this ==>vue实例
          var This = this;
          var mySwiper = new Swiper('#'+This.swiperid,{
            loop:true,
            autoplay:This.autoplayNum,
            direction:This.directionType,
            autoplayDisableOnInteraction: false

          })
      }
    }
</script>

<style scoped>
  @import  "../assets/swiper/css/swiper.css";
  .bannerWrap img{width:100%;}
  /*.swiper-slide img{width:100%;}*/
</style>
