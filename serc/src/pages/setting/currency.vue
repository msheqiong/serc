<template>
    <div class="currencyWrap">
      <Myheader title="货币单位"></Myheader>
      <main class="content monetary-unit">
        <ul>
          <li class="active">
            <span>CNY</span>
            <i></i>
          </li>
          <li class="">
            <span>AUD</span>
            <i></i>
          </li>
          <li class="">
            <span>HKD</span>
            <i></i>
          </li>
          <li class="">
            <span>TWD</span>
            <i></i>
          </li>
        </ul>
      </main>
    </div>
</template>

<script>
  import Myheader from "../../components/myheader"
    export default {
        name: "currency",
      components: {
        Myheader
      },
    }
</script>

<style scoped>
  @import "../../assets/css/setting/setting.css";
</style>
