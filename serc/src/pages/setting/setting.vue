<template>
  <div class="settingWrap">
    <Myheader title="系统设置"></Myheader>
    <main class="content system-setup">
      <article class="setup-content box-wrap">
        <router-link to="lang">
          <div class="language">
            <div class="leftwarp left">
              <img src="../../assets/img/setting/01.png" alt=""/>
              <span>语言设置</span>
            </div>

            <i></i>
          </div>
        </router-link>
        <router-link to="currency">
          <div class="currency">
            <div class="leftwarp left">
              <img src="../../assets/img/setting/02.png" alt=""/>
              <span>货币单位</span>
            </div>

            <i></i>
          </div>
        </router-link>

      </article>

      <article class="setup-content box-wrap">
        <router-link to="nodes">
          <div class="nodes">
            <div class="leftwarp left">
              <img src="../../assets/img/setting/03.png" alt=""/>
              <span>节点列表</span>
            </div>

            <i class="right"></i>
          </div>
        </router-link>

        <div class="about">
          <div class="leftwarp left">
            <img src="../../assets/img/setting/04.png" alt=""/>
            <span>关于我们</span>
          </div>

          <i class="right"></i>
        </div>
        <div class="vacancy safety">
          <div class="leftwarp left">
            <img src="../../assets/img/setting/05.png" alt=""/>
            <span>安全中心</span>
          </div>

          <i class="right"></i>
        </div>
      </article>
      <div class="btn">
        <router-link to="index">
          <button class="btn-red">切换账号</button>
        </router-link>

      </div>
    </main>

  </div>
</template>

<script>
  import Myheader from "../../components/myheader"

  export default {
    name: "setting",
    components: {
      Myheader
    },
  }
</script>

<style scoped>
  @import "../../assets/css/setting/setting.css";

  .leftwarp {
    line-height: 2.4rem;
  }

  .leftwarp > img {
    width: 1rem;
    vertical-align: middle;
    margin-right: .5rem;
  }

  .system-setup .setup-content > a > div {
    height: 2.4rem;
    line-height: 2.4rem;
    border-bottom: 1px solid #e2e2e2;
    padding: 0 1.3rem 0 .8rem;
  }

  .system-setup .setup-content > a > div > i {
    display: inline-block;
    width: .35rem;
    height: .75rem;
    background: url(../../assets/img/user/user-right.png) center/cover no-repeat;
    float: right;
    margin-top: .85rem;
  }
  .system-setup a{
     color:#000;
  }
</style>
