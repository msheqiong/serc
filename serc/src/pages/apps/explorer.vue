<template>
  <div class="explorerWrap">
    <Myheader title="区块浏览"></Myheader>
    <main class="content block-list">
      <ul class="box-wrap">
        <li v-for="item in trs" @click="toBlock(item.id)">
          <div>ID：<span>{{item.id | hide}}</span>
            <div class="right">高度：<span>{{item.height}}</span></div>
          </div>
          <div><i style="float:right;">{{item.timestamp |time}}</i>矿工：<span>{{item.generatorId | hide}}</span></div>
        </li>
        <!-- <li>
           <div>ID：<span>f1e0c1...846bda7fdfc</span><div class="right">高度：<span>0001</span></div></div>
           <div>生产者：<span>A5ft7L...6nMCN4DChU</span></div>
           <div>交易：<span>0</span>总金额：<span>0</span>总费用：<span>0</span>奖励：<span>3.5</span></div>
           <div>日期：<span>2018/05/02 15:11:20</span></div>
         </li>-->

        <!--<li>
          <div>ID：<span>f1e0c1...846bda7fdfc</span><div class="right">高度：<span>0001</span></div></div>
          <div>生产者：<span>A5ft7L...6nMCN4DChU</span></div>
          <div>交易：<span>0</span>总金额：<span>0</span>总费用：<span>0</span>奖励：<span>3.5</span></div>
          <div>日期：<span>2018/05/02 15:11:20</span></div>
        </li>-->

      </ul>
      <div class="load-more" @click="load()">{{text}}</div>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import axios from "axios"
  import {util} from "../../api/api"

  export default {
    name: "explorer",
    components: {
      Myheader
    },
    data: function () {
      return {
        trs: "",
        limit:20,
        text:"加载更多"
      }
    },
    created: function () {
      var _this = this;
      var p = 0;
      p = util.parseInt(p);
      axios.get('https://node.servchain.net/api/blocks',
        {
          params: {
            limit: _this.limit, orderBy: 'height:desc', offset: p * 20
          }
        }).then(function (res) {
        console.log(res.data, "成功")
        var trs = res.data.blocks;
        if (trs.length > 0) {
          _this.trs = trs;
        }


      }).catch(function (res) {
        console.log(res, "失败")
      })
    },
    filters: {
      hide: function (s) {
        return util.hideMid(s)
      },
      time: function (value) {
        // console.log(value)
        var date = new Date(value * 10000);

        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + '  ' : date.getDate() + "   ";
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":"
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var time =  M + D + h + m + s;
        return time;

      }

    },
    methods: {
      load:function(){

        if(this.limit <= 80){

          this.limit += 20
          var _this = this;
          var p = 0;
          p = util.parseInt(p);
          console.log(_this.limit)
          axios.get('https://node.servchain.net/api/blocks',
            {
              params: {
                limit: _this.limit, orderBy: 'height:desc', offset: p * 20
              }
            }).then(function (res) {
            console.log(res.data, "成功")
            var trs = res.data.blocks;
            if (trs.length > 0) {
              _this.trs = trs;
            }

          }).catch(function (res) {
            console.log(res, "失败")
          })
        }else{
          this.text = "没有更多啦"
        }

      },
      toBlock:function(id){
        this.$router.push({
          path:"/block",
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/app/app.css";

  .block-list li > div[data-v-e8a1f28a] {

    text-align: left;
  }
</style>
