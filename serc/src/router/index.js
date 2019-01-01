import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
/*登录页面*/
import Index from '../pages/login/index'
import Register from '../pages/login/register'
import Login from '../pages/login/login'
import Import from '../pages/login/import'
/*主页面*/
import Home from '../pages/home'
import User from '../pages/uesr'
import News from '../pages/news'
/*主页面的子页面*/
import Apps from '../pages/apps/apps'
import Explorer from '../pages/apps/explorer'
import Issuer from '../pages/user/issuer'
import Issues from '../pages/user/issues'
import Lock from '../pages/user/lock'
import Log from '../pages/user/log'
import Map from '../pages/user/map'
import MinerReg from '../pages/user/minerReg'
import Miner from '../pages/user/miner'
import Passwd from '../pages/user/passwd'
import Wallet from '../pages/user/wallet'
/*子页面*/
import Token from '../pages/token/token'
import Transfer from '../pages/token/transfer'
import Addresss from '../pages/token/addresss'
import Show from '../pages/token/show'
import Verify from '../pages/wallet/verify'
import Setting from '../pages/setting/setting'
import Lang from '../pages/login/lang'
import Currency from '../pages/setting/currency'
import Nodes from '../pages/apps/nodes'
import Msg from '../pages/user/msg'
import NewsDetails from '../pages/news/newsDetails'
import Block from '../pages/token/block'
import NewShow from '../pages/news/newShow'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
     /* name: 'HelloWorld',*/
      component: User
    },
    /*主页面*/
    {path: '/home', component: Home },
    {path: '/news',component: News},
    {path: '/user', component: User},

    /*登录*/
    {path:'/index',component:Index},
    {path:'/register',component:Register},
    {path:'/login',component:Login},

    /*user 页面跳转*/
    {path:'/apps',component:Apps},
    {path:'/explorer',component:Explorer},
    {path:'/issuer',component:Issuer},
    {path:'/lock',component:Lock},
    {path:'/log',component:Log},
    {path:'/map',component:Map},
    {path:'/minerReg',component:MinerReg},
    {path:'/passwd',component:Passwd},
    {path:'/wallet',component:Wallet},
    {path:'/miner',component:Miner},
    /* 子页面*/
    {path:'/token',name:'Token',component:Token},
    {path:'/transfer',component:Transfer},
    {path:'/addresss',component:Addresss},
    {path:'/show',component:Show},
    {path:'/verify',component:Verify},
    {path:'/setting',component:Setting},
    {path:'/lang',component:Lang},
    {path:'/currency',component:Currency},
    {path:'/nodes',component:Nodes},
    {path:'/msg',component:Msg},
    {path:'/newsDetails',component:NewsDetails},
    {path:'/import',component:Import},
    {path:'/block',component:Block},
    {path:'/newShow',component:NewShow},
    {path:'/issues',component:Issues},//




  ]
})
