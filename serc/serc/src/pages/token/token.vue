<template>
  <div class="tokenWrap">
    <Myheader :title="asdII"></Myheader>

    <main class="content token">

      <article class="asset-info">
     <!--   <p>{{qwer|filt}}</p>
        <p @click="fn()">初始 message 是："{{ message }}"</p>
        <p>计算后的翻转 message 是："{{ reversedMessage }}"</p>
        <p>111{{}}</p>-->
        <div class="blue">{{num}}</div>
        <p>&ap;&yen;<span>{{amount}}</span></p>
        <!--<span><i></i>资产</span>
        <span><i></i>数量</span>-->
        <section class="graph">
          <img src="../../assets/img/echart.png"/>
        </section>
      </article>
      <article class="record-list">
        <h5>最近交易记录</h5>
        <!--交易记录-->
        <ul class="trs-list" v-show="!isshow">
          <li v-for="item in dispose" @click="toShow(item.id)">
            <p class="num">
              <span>{{item.id | idFilter}}</span>
              <span><i class="add"></i>{{item.amount}} ({{item.fee}})</span>
            </p>
            <p class="time">
              <span>{{item.timestamp}}</span>
              <span>{{item.type}}</span>
            </p>
          </li>
          <!--<li onclick="location.href='particulars.html'">
            <p class="num">
              <span>0x2103...1a45ae729c</span>
              <span><i class="add">+</i> 100.0000</span>
            </p>
            <p class="time">1 小时前</p>
          </li>
          <li>
            <p class="num">
              <span>0x2103...1a45ae729c</span>
              <span><i class="minus">-</i> 12.0000</span>
            </p>
            <p class="time">2 小时前</p>
          </li>-->
        </ul>
        <div class="load-more" style="display: none;">加载更多</div>
        <!--无交易记录背景-->
        <div class="none-bg empty" v-show="isshow">
          <p>记录空空如也</p>
        </div>
      </article>

      <article class="operation">
        <ul>
          <!--<router-link to="transfer">

          </router-link>-->
          <li class="transfer-btn" @click="transfer(asd)">
            <i></i>
            <span>转账</span>
          </li>

          <li class="address-btn" @click="address(asd)">
            <i></i>
            <span>收款</span>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import {newslist} from '../../api/api'
  import axios from "axios"
  import {util} from "../../api/api"

  export default {
    name: "token",
    components: {
      Myheader
    },
    data: function () {
      return {
        assetName: "",
        asd: "",
        json: "",
        history: '',
        isshow: '',
        num:"",
        amount:"",
        asdII:""


      }
    },
    filters: {
      filt: function (value) {
        value = value + "123"
        return value;
      },
      idFilter: function (id) {
        if (util.isNull(id)) {
          id = util.trsType(id);
        } else {
          id = id.substr(0, 6) + '...' + id.substr(id.length - 10);
        }
        return id;
      }
    },
    methods: {
      transfer: function (id) {
        //this.$router.push("/transfer")
        this.$router.push({
          path: "/transfer",
          query: {
            id: id
          }
        })
      },
      address: function (id) {
        //this.$router.push("/addresss")
        //要传参
        this.$router.push({
          path: "/addresss",
          query: {
            id: id
          }
        })
      },
      toShow: function (id) {
        this.$router.push({
          path: "/show",
          query: {
            id: id
          }
        })
      },
      fn: function () {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + " ";
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":"
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        console.log(date);
        console.log(Y + M + D + h + m + s);
      },



    },
    mounted: function () {
      //方法一
      // this.asd = this.$route.params.id;
      //console.log(this.asd)
      //方法二
    /*  this.asd = this.$route.query.id;
      console.log(this.asd)*/
    },
    created: function () {
      var This = this;
   /*   this.assetName = util.asset.name;
      console.log(this.assetName);*/

      //方法二
      // let params = {address: "ANfe4rs2gpPWA6rsLHDunkrqA7niPzpuE6"};
      // newslist(params).then((res) => {
      //   console.log(res, "成功")
      // })

      //方法一
      //console.log(localStorage.address)
      axios.get('https://node.servchain.net/api/accounts', {
        params: { //请求参数
          // address: "A6WkguuWMB4mVpTo1NMACb8tMAo88ms4Lu"
          address: localStorage.address
        }
      }).then(function (res) {
        console.log(res.data, "成功");
        This.json = res.data;
        console.log(This.json)
        console.log(This.json.account.balance)

      }).catch(function (res) {
        console.log(res, "失败");
      })

      //交易纪录
      /*this.asd = this.$route.query.id;
      console.log(this.asd)*/
      if (util.isNull(this.$route.query.id)) {
        this.asd = util.asset.name;
        this.asdII = util.asset.name;
        axios.get(
          'https://node.servchain.net/api/transactions',
          {
            params: {
              senderPublicKey: localStorage.publicKey,
              recipientId: localStorage.address,
              orderBy: 't_timestamp:desc',
              limit: 20,
              offset: 0
            }
          }
        ).then(function (res) {
          console.log(res.data, "成功")
          if (res.data.transactions.length > 0) {
            This.history = res.data.transactions;
            console.log(This.history);
            This.isshow = false;
          } else {
            This.isshow = true;
          }

        }).catch(function () {
          console.log(res, "失败")
        })


        /*加载总量和总额*/
        axios.get('https://node.servchain.net/api/accounts',
          {params:{
              address: localStorage.address
            }}).then(function(res){
          console.log(res.data,"成功")
          var price = util.balance(res.data.price.price, 2, 4);
          This.num =  util.balance(res.data.account.balance);
          This.amount = (This.num * price).toFixed(2);
        }).catch(function(res){
          console.log(res,"失败")
        })

      } else {
        this.asd = this.$route.query.id;
        this.asdII =this.$route.query.id .split('.')[1];
        axios.get('https://node.servchain.net/api/uia/transactions/my/'+ localStorage.address,
          {
            params: {
              orderBy: 't_timestamp:desc',
              limit: 20,
              offset: 0,
              currency: this.$route.query.id
            }
          }).then(function (res) {
          console.log(res.data, "成功")
          if (res.data.transactions.length > 0) {
            This.history = res.data.transactions;
            console.log(This.history);
            This.isshow = false;
          } else {
            This.isshow = true;
          }
        }).catch(function () {
          console.log(res, "失败")
        })

        /*加载总量和总额*/
        axios.get('https://node.servchain.net/api/uia/user/asset/'+localStorage.address+"/"+this.$route.query.id).then(function(res){
          console.log(res.data,"成功")
          var price = util.balance(res.data.asset.price, 2, 4);
          This.num =  util.balance(res.data.asset.balance);
          This.amount = (This.num * price).toFixed(2);
        }).catch(function(res){
          console.log(res,"失败")
        })

      }


    },//created 结束符
    computed: {
      reversedMessage: function () {
        return this.message.length
      },
      dispose: function () {
        console.log(this.history)
        // console.log(this.history.length)
        //if (util.isNull(id)) id = util.trsType(data[i].type);
        for (var i = 0; i < this.history.length; i++) {
          //if (util.isNull(id)) id = util.trsType(data[i].type);
          this.history[i].fee = util.balance(this.history[i].fee);//date('Y-m-d H:i:s','1477019804')
          // this.history[i].timestamp = date('Y-m-d H:i:s','this.history[i].timestamp')
          this.history[i].type = util.trsTypeText(this.history[i].type)
          // if (util.isNull(this.history[i].id)) this.history[i].id = util.trsType(this.history[i].type);
          // else this.history[i].id = this.history[i].id.substr(0, 6) + '...' + this.history[i].id.substr(this.history[i].id.length - 10);
          if (this.history[i].amount > 0) {
            this.history[i].amount = util.balance(this.history[i].amount)
          } else {
            this.history[i].amount = 0
          }

          /*时间转化*/
          var date = new Date(this.history[i].timestamp);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() < 10 ? '0' + date.getDate() + '  ' : date.getDate() + "   ";
          var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":"
          var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
          var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
          console.log(date);
          //console.log(Y+M+D+h+m+s);

          this.history[i].timestamp = Y + M + D + h + m + s;

        }
        return this.history
        console.log(this.history)
      },


    }
    /*computed:{
      jsonNum:function(){
       //console.log(this.json)
       //console.log(this.json.account.balance)
        return this.json.account.balance/Math.pow(10,8)
      },
     /!* jsonPrice:function(){
         var price = (this.json.price.price/Math.pow(10,4)).toFixed(2);
         var num = this.json.account.balance/Math.pow(10,8)
        return  price*num;
      }*!/
    }*/
  }
</script>

<style scoped>
  @import "../../assets/css/token/token.css";

  .token .record-list li .num {
    text-align: left;
  }

  .token .record-list li .time {
    text-align: left;
  }
</style>
