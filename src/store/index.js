import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    login: null,
    menu:'',
    menuNum:''
  },
  getters:{
    is_change_token(state){
      return state.token
    },
    is_change_login(state){
      return state.login
    },
    is_change_menu(state){
      return state.menu
    },
    is_change_menuNum(state){
      return state.menuNum
    },
  },
  mutations: {
    change_token(state,data){
      state.token = data
    },
    change_login(state,data){
      state.login = data
    },
    change_menu(state,data){
      state.menu = data
    },
    change_menuNum(state,data){
      state.menuNum = data
    },
  },
  // 缓存插件
  // 缓存插件
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
