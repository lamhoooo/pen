// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import home from './components/home/home'
import collections from './components/collections/collections'
import explore from './components/explore/explore'
import login from './components/loginAndSign/login'
import sign from './components/loginAndSign/sign'
import personalCenter from './components/personalCenter/personalCenter'
import sharePic from './components/sharePic/sharePic'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {path: '/', redirect: 'home'},
  {path: '/home', name: 'home', component: home},
  {path: '/collections', name: 'collections', component: collections},
  {path: '/explore', name: 'explore', component: explore},
  {path: '/login', name: 'login', component: login},
  {path: '/sign', name: 'sign', component: sign},
  {path: '/personalCenter', name: 'personalCenter', component: personalCenter},
  {path: '/sharePic', name: 'sharePic', component: sharePic}
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  extends: App,
  router
}).$mount('#app')
