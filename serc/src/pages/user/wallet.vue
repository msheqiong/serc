<template>
  <div class="walletWrap">
    <Myheader title="钱包管理"></Myheader>
    <main class="content wallet">
      <ul class="wallet-menu box-wrap"><!--<router-link to="verify">-->
        <li>
          <div @click="toVerify(text)">备份助记词</div>
        </li>
        <!-- <li><router-link to="verify"><div>导出私钥</div></router-link></li>-->
        <li>导出私钥</li>
      </ul>
    </main>
  </div>

</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  import {util} from "../../api/api"

  export default {
    name: "wallet",
    components: {
      Myheader
    },
    data: function () {
      return {
        text: "export=words",

      }
    },

    methods:{
      toVerify:function(id){
        this.$router.push({
          path:"/verify",
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/wallet/wallet.css";
</style>
