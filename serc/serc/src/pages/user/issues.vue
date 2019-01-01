<template>
  <div class="issuesrap">
    <Myheader title="我发行的资产" txt="创建"></Myheader>
    <main class="content assets-issued">
      <ul class="asset-info box-wrap">
        <li>
          <label>名称：</label>
          <span>{{issuer.name}}</span>
        </li>
        <li>
          <label>描述：</label>
          <span>{{issuer.desc}}</span>
        </li>
      </ul>
      <ul class="asset-list box-wrap">
        <li class="clearfix" v-for="(item,index ) in assets" >
          <div class="op" >
            <a href="javascript:;" @click="faxing(item.name,item.maximum,item.quantity,item.precision,index)" data-op="publish">发行</a>
            <a href="javascript:;" @click="toTransfer(item.name)">转账</a>
          </div>
          <h2 class="name">{{item.name.split('.')[1]}}</h2>
          <p style="float: right;">已发行：
            <span>{{item.quantityShow}}</span>
          </p>
          <p>最大发行：<span>{{item.maximumShow}}</span></p>
          <div class="op-form" :class="{on:index==current}">

            <Popup  :sel="isFalse"  :pname="item.name.split('.')[1]" :pmax="max" :fee="fee" @change="get" :assets="item" :selr="current" :index="index" :isif="isShow"></Popup>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import Myheader from "../../components/myheader"
  import Popup from "./popup"
  import axios from "axios"
  import {util} from "../../api/api"
  import "../../assets/jquery-1.10.2.min"


  const AschJS = require("asch-js");

  export default {
    name: "issues",
    components: {
      Myheader,
      Popup
    },
    data: function () {
      return {
        issuer: '',
        account: "",
        assets: "",
        isShow:false,
        isFalse:false,
        name:"1234",
        max:'',
        fee:"",
        pnum:"1234",
        ppassword:"2344",
        current:"",



      }
    },
    created: function () {
      var _this = this;
      this.current =  undefined;
      axios.get('https://node.servchain.net/api/uia/issuers/' + localStorage.address, {}).then(function (res) {
        console.log(res.data, "成功")
        if (res.data.success) {
          _this.issuer = res.data.issuer;

          axios.get('https://node.servchain.net/api/accounts', {
            params: {
              address: localStorage.address
            }
          }).then(function (res) {
            console.log(res.data, "成功");
            if (res.data.success) {

              _this.account = res.data.account;

              _this.asset(_this.issuer.name, _this.account.secondSignature)

            }
          }).catch(function (res) {
            console.log(res, "失败")
          })


        }

      }).catch(function (res) {
        console.log(res, "失败")
      })
    },
    methods: {

      asset: function (issuer, secondSignature) {
        var _this = this;
        axios.get('https://node.servchain.net/api/uia/issuers/' + issuer + '/assets', {
          params: {
            limit: 20,
            offset: 0
          }
        }).then(function (res) {
          console.log(res.data, "成功")
          if (res.data.success) {
            var assets = res.data.assets;
            _this.assets = assets;
          }


        }).catch(function (res) {
          consoloe.log(res, "失败")

        })
      },
      faxing:function(name,max,quantity,precision,index){
        console.log(this.current);
        console.log(index);
        if(this.current == index){
          this.current = undefined;
        }else{
          this.current = index;
        }

      //  console.log(this.isShow);
       // this.isShow = !this.isShow;
        console.log(index);
         var asset = name;
         if (asset.indexOf('.') == -1) {
          window.alert('获取资产名称失败');
          return;
        }
        var assetArr = asset.split('.');
        var box = $(".op-form");


          var max = parseFloat(max) ;
          var quantity = parseFloat(quantity);
          var precision = parseInt(precision);
          if (isNaN(max) || isNaN(quantity) || isNaN(precision)) {
            window.alert('获取资产信息失败');
            return;
          }

          this.max = (max - quantity) / Math.pow(10, precision);
       // var fee = AschJS.constants.fees.issue / Math.pow(10, util.asset.precision) + ' ' + util.asset.name;
        //console.log(fee)  //undefined
        var fee = "100 SERC";
        this.fee = fee;
        if (this.account.secondSignature)
          this.isFalse = true;


      },
      get:function(v){
        console.log(v)
        //this.current = v.
      },
      toTransfer:function(id){
        this.$router.push({
          path:"/transfer",
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/issue/issue.css";

  .assets-issued .asset-info li {
    text-align: left;
  }
  .assets-issued .asset-list li{

    text-align: left;

  }


</style>
