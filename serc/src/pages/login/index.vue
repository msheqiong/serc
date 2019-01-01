<template>
    <div class="indexWrap">

      <main class="content login-index">
        <div>

            <router-link to="register">
              <button class="btn-register">新用户注册</button>
            </router-link>

          <router-link to="login">
            <button class="btn-login">恢复账号</button>
          </router-link>

          <p class="language"><span>切换语言</span></p>
        </div>
      </main>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
 @import "../../assets/css/login/login.css";
</style>
