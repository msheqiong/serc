<template>
    <div class="msgWrap">
      <Myheader title="消息通知" txt="已读"></Myheader>
      <main class="content message">
        <ul>
          <!--<li class="box-wrap">
            <h4>钱包系统维护公告</h4>
            <p class="time">1小时前</p>
            <p>钱包因系统维护，在本周一（5：00-8：00）</p>
          </li>
          <li class="box-wrap">
            <h4>钱包系统维护公告</h4>
            <p class="time">1小时前</p>
            <p>钱包因系统维护，在本周一（5：00-8：00）</p>
          </li>
          <li class="box-wrap">
            <h4>钱包系统维护公告</h4>
            <p class="time">1小时前</p>
            <p>钱包因系统维护，在本周一（5：00-8：00）</p>
          </li>-->
        </ul>
      </main>
    </div>
</template>

<script>
  import Myheader from "../../components/myheader"
    export default {
        name: "msg",
      components: {
        Myheader
      },
    }
</script>

<style scoped>
  @import "../../assets/css/user/msg.css";
</style>
