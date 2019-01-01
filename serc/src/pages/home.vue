<template>
  <!-- <div class="homeWrap content  property">
     &lt;!&ndash; <div class="header">&ndash;&gt;

        <article class="total-assets" >
          <div>
            <h5>总资产</h5>
            <p class="blue">≈ <span class="amount">0.00</span></p>
            <p>总资产 ( ¥ )</p>
            <div class="addr">
              <span>ANfe4rs2gpPWA6rsLHDunkrqA7niPzpuE6</span>
              <img src="assets/img/icon/qr.png" alt="">
            </div>
            &lt;!&ndash;<ul>
              <li>
                <p>锁仓中的资产</p>
                <span class="locked">0</span>
              </li>
              <li>
                <p>可用资产</p>
                <span class="available">0</span>
              </li>
            </ul>&ndash;&gt;
            &lt;!&ndash;<i class="icon"></i>&ndash;&gt;
          </div>
        </article>

     <article class="detail-assets">
       <ul>
         <li data-name="serc">
           <div class="icon">
             <img src="../assets/img/token/SERC.png" alt=""/>
           </div>
           <div class="name">
             <p></p>
             <p>&yen; <span class="price">0.00</span></p>
           </div>
           <div class="sum">
             <p class="num">0.0000</p>
             <p>&ap;&yen; <span class="amount">0.00</span></p>
           </div>
         </li>
       </ul>
       <ul>
       </ul>
     </article>
      </div>-->
  <div class="homeWrap">
    <main class="content property">
      <article class="total-assets">
        <div>
          <h5 @click="cc()">总资产</h5>
          <p class="blue">&ap; <span class="amount">{{dispose}}</span></p>
          <p>总资产 ( &yen; )</p>
          <div class="addr" @click="addr()">
            <span>{{address}}</span>
            <img src="../assets/img/icon/qr.png" alt=""/>
          </div>
          <!--<ul>
            <li>
              <p>锁仓中的资产</p>
              <span class="locked">0</span>
            </li>
            <li>
              <p>可用资产</p>
              <span class="available">0</span>
            </li>
          </ul>-->
          <!--<i class="icon"></i>-->
        </div>
      </article>
      <article class="detail-assets">
        <ul>
          <router-link to="token">
            <li data-name="serc">
              <div class="icon">
                <img src="../assets/img/token/SERC.png" alt=""/>
              </div>
              <div class="name">
                <p>{{name}}</p><!--util.asset.name-->
                <p>&yen; <span class="price">{{price}}</span></p>
              </div>
              <div class="sum"><!--account.balance-->
                <p class="num">{{num}}</p>
                <p>&ap;&yen; <span class="amount">{{amount}}</span></p>
              </div>
            </li>
          </router-link>

        </ul>
        <ul>
          <li v-for="(item,index) in data" @click="toToken(item.currency)">
            <div class="icon"><img src="http://cdn.servchain.net/token/' + currency[1] + '.png" alt=""/></div>
            <div class="name"><p>{{item.currency.split(".")[1]}}</p>
              <p>&yen; <span class="price">{{(item.price/Math.pow(10, 4)).toFixed(2)}}
                <!--' + util.balance(data[i].price, 2, 4) + '--></span></p></div>
            <div class="sum"><p class="num"><!--' + util.balance(data[i].balance, 4) + '-->{{(item.balance/Math.pow(10,
              8)).toFixed(4)}}</p>
              <p>&ap;&yen; <span class="amount"><!--' + amount.toFixed(2) + '-->{{((item.price/Math.pow(10, 4)).toFixed(2)*(item.balance/Math.pow(10, 8)).toFixed(4)).toFixed(2)}}</span>
              </p></div>
            <h1>{{a[index] = (item.balance/Math.pow(10, 8)).toFixed(4)}}</h1>

          </li>
          <!--<h2>{{a}}</h2>-->
         <!-- <h2>{{cc()}}</h2>-->
        </ul>
      </article>
    </main>

  </div>


</template>

<script>
  //import {newslist} from '../api/api'
  import axios from "axios"
  import {util} from '../api/api'

  export default {
    name: "home",
    data: function () {
      return {
        address: "",
        name: "",
        price: "",
        num: "",
        amount: "",
        data: "",
        a: [],
      }
    },
    computed: {
      /*  sel: function () {
          console.log(this.a)
          console.log(this.a[0])
          var sum = 0;
          for (var i = 0; i < this.a.length; i++) {
            sum += parseInt(this.a[i]);
          }
          return sum;
        }*///[__ob__: Observer] 无法获取 this.a 的长度

      dispose:function(){//a[index] = (item.balance/Math.pow(10, 8)).toFixed(4)}}
        var sum = 0;
        for(var i =0;i<this.data.length;i++){
          sum += parseInt((this.data[i].balance/Math.pow(10, 8)).toFixed(4))
        }
        return sum
      }

    },

    created: function () {
      this.name = util.asset.name;

      var This = this;
      if (!localStorage.isLogin) {
        This.$router.push("/index")
        return;
      }
      console.log(localStorage.address);

      axios.get('https://node.servchain.net/api/accounts', {
        params: { //请求参数
          address: localStorage.address
        }
      }).then(function (response) {
        console.log(response.data);//请求正确时执行的代码
        This.address = response.data.account.address
        This.price = util.balance(response.data.price.price, 2, 4);
        localStorage.balance = response.data.account.balance;
        This.num = util.balance(response.data.account.balance);
        var amount = This.num * This.price
        This.amount = amount.toFixed(2);
        console.log(This.amount);


      }).catch(function (response) {
        console.log(response);//发生错误时执行的代码
      })

      /*  加载资产*/
      var limit = 20;
      var str = "How are you doing today?";
      var n = str.split("o");
      console.log(n)
      console.log(n.length)
      axios.get('https://node.servchain.net/api/uia/user/assets/' + localStorage.address, {
        params: { //请求参数
          limit: 20,
          offset: 0

        }
      }).then(function (response) {
        console.log(response.data);
        This.data = response.data.assets;
        console.log(This.data)
        console.log(This.data.length)

        //This.data.price = util.balance(This.data.price, 2, 4)

      }).catch(function (response) {
        console.log(response);
      })

    },//created结束符

    methods: {
      addr: function () {
        this.$router.push("/addresss")
      },
      cc: function () {
        console.log(this.a);
        console.log(this.a.length);
        var sum = 0;
        for (var i = 0; i < this.a.length; i++) {
          sum += parseInt(this.a[i]);
        }

        return sum.toFixed(2)
      },
      toToken(id) {
        //  this.$router.push("/token/id")
        // console.log(id)
        //方法一
        /* this.$router.push({
           name: 'Token',
           params:{
            id:id
           }
         })*/
        //方法二
        this.$router.push({
          path:"/token",
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/home/home.css";

  /*.header{
    width:100%;
    height:10.7rem;
    background:url("../assets/images/home/topbg.png") no-repeat;
    background-size: 100% 100%;
  }


 .homeWrap article:nth-child(1){
   width:100%;
   height:10.7rem;
   background:url("../assets/images/home/topbg.png") no-repeat;
   background-size: 100% 100%;
 }
  .property {
    padding: 0 0 2.5rem 0;
  }

  !*.property .total-assets {
    width: 100%;
    height: 9.9rem;
    background: url("../../../assets/img/home/topbg.png");
    background-size: cover;
    padding: 2.6rem .7rem 0 .7rem;
    box-sizing: border-box;
  }

  .property .total-assets > div {
    background-color: white;
    border-radius: 5px;
    padding: .4rem .5rem;
    color: #666666;
    box-shadow: 0 2px 4px 0 #cccccc;
    position: relative;
  }*!

  .property .total-assets {
    width: 100%;
    !* height: 9.9rem; *!
    background: url(../assets/img/home/topbg.png);
    background-size: cover;
    padding: 1rem .7rem;
    box-sizing: border-box;
    !* position: relative; *!
  }

  .property .total-assets > div {
    background-color: white;
    border-radius: 5px;
    padding: .4rem .5rem;
    color: #666666;
    box-shadow: 0 2px 4px 0 #cccccc;
    position: relative;
    !*bottom: -1.3rem;*!
  }

  !*收款地址*!
  .property .total-assets > div div.addr {
    text-align: center;
    margin: .5rem 0;
  }

  .property .total-assets > div div.addr img {
    width: .8rem;
    vertical-align: -16%;
    margin-left: .3rem;
  }

  .property .total-assets > div > .icon {
    position: absolute;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url(../assets/img/home/plus.png);
    background-size: cover;
    top: .5rem;
    right: .6rem;
  }

  .property .total-assets > div > h5 {
    color: #333333;
  }

  .property .total-assets > div > p {
    text-align: center;
  }

  .property .total-assets > div > p:nth-of-type(1) {
    font-size: 1.6rem;
    margin-top: .2rem;
  }

  .property .total-assets > div > p:nth-of-type(2) {
    font-size: 0.6rem;
  }

  .property .total-assets > div ul {
    display: flex;
    text-align: center;
    border-top: 1px solid #dfdfdf;
    margin-top: .3rem;
  }

  .property .total-assets > div li {
    padding-top: .4rem;
    flex: 1;
  }

  .property .total-assets > div li > span {
    color: #3574fa;
    font-size: .9rem;
  }

  .property .detail-assets {
    !*margin-top: 2rem;*!
    background-color: white;
    box-shadow: 0 1px 8px -3px #cccccc;
  }

  .property .detail-assets li {
    padding: .5rem 1.2rem .5rem 1.2rem;
    border-bottom: 1px solid #e6e6e6;
    height: 2.7rem;
    line-height: 1.4rem;
    color: #999999;
  }

  .property .detail-assets li .icon {
    width: 2.2rem;
    height: 2.2rem;
    border: 1px solid #e6eaf3;
    border-radius: 50%;
    float: left;
    !* text-align: center; *!
    position: relative;
  }

  .property .detail-assets li .icon img {
    width: 1.4rem;
    margin: auto;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .property .detail-assets li .name > p:first-of-type,
  .property .detail-assets li .sum > p:first-of-type {
    font-size: .9rem;
    color: #333333;
    !*font-weight: bolder;*!
  }

  .property .detail-assets li .name {
    float: left;
    margin-left: .5rem;
  }

  .property .detail-assets li .sum {
    float: right;
    text-align: right;
  }

  .newroperty {
    padding: 4rem .7rem 0;

  }

  .newroperty .selected > input {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    border-radius: 10px;
    text-indent: 2.5rem;
    color: #666666;
    font-size: .7rem;
    background: #eaeaea url("../assets/img/search.png") .8rem center/5% no-repeat;
  }

  .newroperty .newroperty-content {
    width: 100%;
    margin-top: 1rem;
  }

  .newroperty .newroperty-content li {
    width: 29.7%;
    float: left;
    height: 2.3rem;
    line-height: 2.3rem;
    margin-bottom: .5rem;
    padding-left: .5rem;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .newroperty .newroperty-content li.active {
    background: url("../assets/img/home/border.png") center/100% 100% no-repeat;
    border-radius: 0;
  }

  .newroperty .newroperty-content li:nth-of-type(3n+2) {
    margin: 0 1rem;
  }

  .newroperty .newroperty-content li > i {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #e5e9f2;
    border-radius: 50%;
    margin: .25rem .2rem 0 0;
    text-align: center;
    float: left;
  }

  .newroperty .newroperty-content li img {
    width: .9rem;
    vertical-align: top;
    margin-top: .2rem;
  }*/

</style>
