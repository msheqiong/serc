<template>
    <div class="popupWrap" v-show="bol">
      <p>您正在发行<span class="name">{{pname}}</span>资产，最大可发行量<span class="max">{{pmax}}</span>，该操作不可逆且需要消耗手续费<span class="fee"></span>{{fee}}</p>
      <div>
        <input type="text" name="num"  placeholder="请输入发行数量" v-model="num" />
      </div>
      <div>
        <input type="password" name="password"  placeholder="请输入交易密码" v-show="sel" v-model="password"/>
      </div>

      <button @click="submit()" >提交</button>

    </div>
</template>

<script>
  const AschJS = require('asch-js')
  import {util} from "../../api/api"
    export default {
        name: "popup",
      props:["sel","pname","pmax","fee","assets","index" ,"selr","isif"],
      computed:{
          bol:function(){
            if(this.index == this.selr){
              return true;
            }
            return false;
          }
      },
      data:function(){
          return{
            num:'',
            password:"",

          }
      },
      methods:{
        submit:function(){

         // this.$emit("change",this.precision);//传出mark值
          //console.log(this.precision)
          this.$emit("change",{as:this.assets,ind:this.index});
          console.log(this.assets)
          console.log(this.pmax)
          console.log(this.sel)
          //alert(11111111)
          //console.log(this.num);
          //console.log(this.password)
          var numShow = parseInt(this.num);
          if (isNaN(numShow)) {
            window.alert('请输入发行数量');
            return;
          }
          var name = this.assets.name.split(".")
          var max = parseFloat(this.assets.maximum);
          var quantity = parseFloat(this.assets.quantity);
          var precision = parseInt(this.assets.precision);
          var num = numShow * Math.pow(10, precision);
          var asset = this.assets.name;
          if ((quantity + num) > max) {
            window.alert('发行数量超出最大发行数量');
            return;
          }
          var password = '';
          if(this.sel){
            var password = this.password;
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
              window.alert('请正确输入交易密码');
              $('input[name=password]').focus();
              return;
            }

          }
          // var fee = AschJS.constants.fees.issue / Math.pow(10, util.asset.precision) + ' ' + util.asset.name;
          //console.log(fee)  //undefined
          var fee = "100 SERC";
         if( window.confirm('确认发行 ' + numShow + ' 个 ' + name[1] + '？<br/>此操作不可逆，需要花费 ' + fee + '<br/>确定继续操作？')){
           console.log(asset+num+localStorage.secret+password);
           var trs = AschJS.uia.createIssue(asset, num, localStorage.secret, password);
           console.log(trs);
           util.fetch('peer/transactions', {transaction: trs}, 'post', {
             version: util.version,
             'magic': util.magic
           }, function (json) {
             if (json.success) {
               window.alert('发行资产成功', function () {
                 // Backbone.history.navigate('issues', {trigger: true});
                 location.reload();
               });
             } else {
               window.alert(json.error);
             }
           });
         }



        }
      }
    }
</script>

<style scoped>
  p {
    color: #d9534f;
    line-height: 1.2rem;
  }
  p span {
    padding: 0 .3rem;
  }
   input {
    width: 11rem;
    height: 1rem;
    border: 1px solid #ddd;
    background-color: #faf9f9;
    color: #aaa;
    padding: 6px;
    border-radius: 4px;
    margin-bottom: .3rem;
  }
  button {
    width: 3.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    border-radius: 4px;
  }
</style>
