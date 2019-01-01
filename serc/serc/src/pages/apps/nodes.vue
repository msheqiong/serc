<template>
    <div class="nodesWra">
      <Myheader title="节点列表"></Myheader>
      <main class="content node-list">
        <dl>
          <dt>
            <span>IP</span>
            <span>版本</span>
          </dt>
          <!--<dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>
          <dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>
          <dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>
          <dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>
          <dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>
          <dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>
          <dd>
            <span>192.168.123.123</span>
            <span>1.0.1</span>
          </dd>-->
        </dl>
        <div class="more"><span class="blue">查看更多</span></div>
      </main>
    </div>
</template>

<script>
  import Myheader from "../../components/myheader"
    export default {
        name: "nodes",
      components: {
        Myheader
      },
    }
</script>

<style scoped>
@import "../../assets/css/app/app.css";
</style>
