import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js' ;//引入状态管理 store

Vue.use(VueRouter) 
console.log('菜单',fun(store.state.menu))

function fun(res){
  let result = [];
  for(let i=0;i<res.length;i++){
    if(res[i].children[0]&&res[i].children[0].url){
      result.push({path: res[i].url,name: res[i].name,component:eval( () => import("../views"+res[i].url+".vue")),redirect: res[i].children[0].url,children:[]})
      for(let j=0;j<res[i].children.length;j++){
        result[i].children.push({path: res[i].children[j].url,name: res[i].children[j].name,component:eval(() => import("../views"+res[i].children[j].url+".vue"))})
      }
    }else{
      result.push({path: res[i].url,name: res[i].name,component:eval( () => import("../views"+res[i].url+".vue")),children:[]})
    }
  }
  return result;	
}



const routes = [

  {
    path: '/',
    name: '登录',
    component: () => import('../views/login.vue')
  },
  {
    path: '/layout',
    name: '主体',
    component: () => import('../views/layout.vue'),
    redirect: "/layout/user",
    children: fun(store.state.menu)                         //此处引用JSON.js 里数据
  },
  {path:'*',name:"还未创建文件",component: () => import('../views/layout/notFound.vue')}
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
