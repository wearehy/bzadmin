import Vue from 'vue';
import  './element-ui.js';
import App from './App.vue';
import router from './router/index.js';
import "../public/font/baozaoIcon/iconfont.css";  
import store from './store/index.js';
import axios from 'axios';
import '@/api/axios.js';
import 'babel-polyfill';


import  '@/api/sjsc.js';      //随机生成数据



import global from './common.vue';     //全局变量
Vue.prototype.$common = global;

Vue.prototype.$ajax = axios;
// 自己封装axios请求
import myAjax from '@/api/myAjax.js';
Vue.prototype.$myAjax = myAjax;

// 自己封装ajax 的data 中有键值为 null 
import ajax_null from '@/api/ajax_data_null.js';
Vue.prototype.$ajaxNull = ajax_null;
// 自己封装转换时间戳
import timer from '@/api/timer.js';
Vue.prototype.$timer = timer;
// 获取的数据为null,自动转为 "N/A"
import data_null from '@/api/data_null.js';
Vue.prototype.$data_null = data_null;

Vue.config.productionTip = false


// 时间
import moment from 'moment';
Vue.prototype.$moment = moment;
//页面加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

// 全局变量
Vue.prototype.$img = 'http://apipic.boomake.com/'

import common from '@/api/common.vue';
Vue.prototype.$url = common.url

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
