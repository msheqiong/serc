<template>
  <div class="userWrap">
    <main class="content user">
      <div class="top-operation clearfix">
        <i class="setting" @click="router()"></i>
        <i class="msgs" @click="routerII()"><!--<span>1</span>--></i>
      </div>
      <div class="info">
        <i><img src="../assets/img/avatar/0.png" alt=""/></i>
        <p>{{address}}</p>
      </div>
      <ul class="else">
        <!-- <div> <router-link to="passwd">124424</router-link></div>-->
        <li class="passwd">
          <router-link to="passwd">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/10.png" alt=""/>
              <span>交易密码</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <li class="vacancy lock">
          <router-link to="lock">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/11.png" alt=""/>
              <span>锁仓信息</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <li class="app">
          <router-link to="apps">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/01.png" alt=""/>
              <span>应用中心</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <li class="vacancy explorer">
          <router-link to="explorer">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/02.png" alt=""/>
              <span>区块浏览</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <!--<li class="contact">
          <img src="../assets/img/user/icon/03.png" alt=""/>
          <span>联系人</span>
          <i class="right"></i>
        </li>-->
        <!--<li onclick="location.href='trading-record.html'">
          <img src="../assets/img/user/user-05.png" alt=""/>
          <span>交易记录</span>
          <i class="right"></i>
        </li>-->
        <li class="vacancy wallet">
          <router-link to="wallet">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/05.png" alt=""/>
              <span>钱包管理</span>
              <i class="right"></i>
            </div>
          </router-link>


        </li>
        <!---->
        <li class="issue">
          <router-link to="issuer">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/08.png" alt=""/>
              <span>资产发行</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <li class="issue-log">
          <router-link to="log">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/09.png" alt=""/>
              <span>资产日志</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <li class="miner vacancy">
          <router-link to="miner">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/06.png" alt=""/>
              <span>矿工收益</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
        <!--<li class="vacancy vote">
          <img src="../assets/img/user/icon/07.png" alt=""/>
          <span>矿工投票</span>
          <i class="right"></i>
        </li>-->
        <li class="vacancy map">
          <router-link to="map">
            <div class="left leftwarp">
              <img src="../assets/img/user/icon/07.png" alt=""/>
              <span>资产映射</span>
            </div>
          </router-link>


          <i class="right"></i>
        </li>
      </ul>
    </main>
    <!-- <main class="content user">
       <div class="top-operation clearfix">
         <i class="setting"></i>
         <i class="msgs">&lt;!&ndash;<span>1</span>&ndash;&gt;</i>
       </div>
       <div class="info">
         <i><img src="../../assets/img/avatar/0.png" alt=""></i>
         <p>ANfe4r...A7niPzpuE6</p>
       </div>
      &lt;!&ndash; <ul class="else">
         <li class="passwd">
           <img src="../../assets/img/user/icon/10.png" alt="">
           <span>交易密码</span>
           <i class="right"></i>
         </li>
         <li class="vacancy lock">
           <img src="../../assets/img/user/icon/11.png" alt="">
           <span>锁仓信息</span>
           <i class="right"></i>
         </li>
         <li class="app">
           <img src="../../assets/img/user/icon/01.png" alt="">
           <span>应用中心</span>
           <i class="right"></i>
         </li>
         <li class="vacancy explorer">
           <img src="../../assets/img/user/icon/02.png" alt="">
           <span>区块浏览</span>
           <i class="right"></i>
         </li>
         &lt;!&ndash;<li class="contact">
           <img src="../../assets/img/user/icon/03.png" alt=""/>
           <span>联系人</span>
           <i class="right"></i>
         </li>&ndash;&gt;
         &lt;!&ndash;<li onclick="location.href='trading-record.html'">
           <img src="../../assets/img/user/user-05.png" alt=""/>
           <span>交易记录</span>
           <i class="right"></i>
         </li>&ndash;&gt;
         <li class="vacancy wallet">
           <img src="../../assets/img/user/icon/05.png" alt="">
           <span>钱包管理</span>
           <i class="right"></i>
         </li>
         &lt;!&ndash;&ndash;&gt;
         <li class="issue">
           <img src="../../assets/img/user/icon/08.png" alt="">
           <span>资产发行</span>
           <i class="right"></i>
         </li>
         <li class="issue-log">
           <img src="../../assets/img/user/icon/09.png" alt="">
           <span>资产日志</span>
           <i class="right"></i>
         </li>
         <li class="miner vacancy">
           <img src="../../assets/img/user/icon/06.png" alt="">
           <span>矿工收益</span>
           <i class="right"></i>
         </li>
         &lt;!&ndash;<li class="vacancy vote">
           <img src="../../assets/img/user/icon/07.png" alt=""/>
           <span>矿工投票</span>
           <i class="right"></i>
         </li>&ndash;&gt;
         <li class="vacancy map">
           <img src="../../assets/img/user/icon/07.png" alt="">
           <span>资产映射</span>
           <i class="right"></i>
         </li>
       </ul>&ndash;&gt;
       <div><router-link to="map">电影</router-link></div>
       &lt;!&ndash;<UserList txt="交易密码">
         <img src="../../assets/img/user/icon/10.png" alt="">
       </UserList>
       <UserList txt="锁仓信息">
         <img src="../../assets/img/user/icon/11.png" alt="">
       </UserList>
       <UserList txt="应用中心">
         <img src="../../assets/img/user/icon/01.png" alt="">
       </UserList>
       <UserList txt="区块浏览">
         <img src="../../assets/img/user/icon/02.png" alt="">
       </UserList>
       <UserList txt="钱包管理">
         <img src="../../assets/img/user/icon/05.png" alt="">
       </UserList>
       <UserList txt="资产发行">
         <img src="../../assets/img/user/icon/08.png" alt="">
       </UserList>
       <UserList txt="资产日志">
         <img src="../../assets/img/user/icon/09.png" alt="">
       </UserList>
       <UserList txt="矿工收益">
         <img src="../../assets/img/user/icon/06.png" alt="">
       </UserList>
       <UserList txt="资产映射">
         <img src="../../assets/img/user/icon/07.png" alt="">
       </UserList>&ndash;&gt;
     </main>-->
  </div>
</template>

<script>
  import {util} from "../api/api"

  export default {
    name: "uesr",
    data: function () {
      return {
        address: "A6WkguuWMB4mVpTo1NMACb8tMAo88ms4Lu"
      }
    },
    methods: {
      router: function () {
        this.$router.push("/setting")
      },
      routerII: function () {
        this.$router.push("/msg")
      }
    },
    created: function () {//s.substr(0, 6) + '...' + s.substr(s.length - 10)

      //var address = "A6WkguuWMB4mVpTo1NMACb8tMAo88ms4Lu"
      //var sd = address.substr(0, 6) + '...' + address.substr(address.length - 10);
      // console.log(sd)
      /*   this.address = this.address.substr(0, 6) + '...' + this.address.substr(this.address.length - 10);*/
      var This = this;
      this.address = this.address.substr(0, 6) + '...' + this.address.substr(this.address.length - 10);
      console.log( this.address)

    }


  }
</script>

<style scoped>


  @import "../assets/css/user/user.css";

  .leftwarp {
    line-height: 2.6rem;
  }

  .leftwarp > img[data-v-72b4f48d] {
    width: 1.1rem;
    vertical-align: -12%;
  }
</style>
