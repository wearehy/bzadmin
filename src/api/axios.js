import axios from 'axios'
import router from '../router/index.js'
import store from '../store/index.js' ;//引入状态管理 store
import common from '@/api/common.vue';

// axios.defaults.baseURL = 'http://192.168.9.52:8060'    
axios.defaults.baseURL = common.url;   
 

axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
　　// 在发送请求之前做些什么
    let token = store.state.token;
    if(token){
        config.headers['Authorization'] = 'Bearer ' +  token;
    }
　　return config;
}, function (error) {
　　// 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
   
　　// 对响应数据做点什么
　　return response
}, function (error) {
　　// 对响应错误做点什么
    
    router.push({path:'/'});
　　 return Promise.reject(error)
});



