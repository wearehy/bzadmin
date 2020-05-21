<template>
  <div class="layout">
    <el-dialog class="logo" title="icon图标" :visible.sync="icon_tan" custom-class="layoutDialog" fullscreen>
      <iframe src="/font/baozaoIcon/demo_index.html" class="dialog_iframe"   width="100%"  frameborder="0" scrolling="auto"></iframe>
    </el-dialog>
    <el-container class="fixed position0">
      <el-aside  class="widthMenu cWhite7" :style="{background:backgroundColor}" >
        <div class="relative widthAll height60 zIndex9999" @click="(loginAll.admin.username == 'huangyue') && (icon_tan = true)">
          <el-image 
            class="fixed positonTL0 height60 widthMenu whAll bWhite"
            src="/images/logo.png"
            fit="cover">
          </el-image>
        </div>
        <el-menu class="borderR0 layoutIcon" 
          router   
          unique-opened 
          collapse-transition
          :default-active="$route.path"
          :background-color="backgroundColor"
          :text-color="textColor"
          :active-text-color="activeTextColor"
          
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu   v-for="(item,num) in this.lft_btns" :index="item.url" :key="num">
            <template slot="title"><i  :class="['icon','iconfont',item.menuimage]" ></i>{{item.menuname}}</template>  
            <el-menu-item v-for="(item2,num2) in item.children"  :key="num2" :index="item2.url"><i  :class="['icon','iconfont',item2.menuimage]"></i>{{item2.menuname}}</el-menu-item>
            
          </el-submenu>
        </el-menu>
      </el-aside> 
      <el-container>
        <el-header class="txtR fs12 cWhite7 flex flexR" style="background:#49B691">
          <div class="relative  inline-flex flexCenter" >
            <el-avatar  class="mR15" :size="30" v-if="loginAll.admin&&loginAll.admin.thumb" :src="loginAll.admin.thumb"></el-avatar>
            <el-avatar  class="mR15" :size="30" v-if="loginAll.admin&&!loginAll.admin.thumb" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <span class="mR15" v-if="loginAll.admin">{{loginAll.admin.username}}</span>
          <el-dropdown>
            <i class="el-icon-setting  cWhite7" ></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item> <span @click="goLogin()">退出</span> </el-dropdown-item>
              <!-- <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          
        </el-header>
        
        <el-main class="wraper">
          <router-view></router-view>
          <!-- 返回顶部 -->
          <template>
            <el-backtop target=".wraper">
                <div class="whAll borderCircle overflowHidden">             
                  <div class="bInfo whAll flexCenter" ><i  class="icon iconfont icon-huojian" ></i></div>
                </div>
            </el-backtop>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import { mapState,mapMutations,mapGetters } from 'vuex';
  import Router from 'vue-router'
  import axios from 'axios'
  export default {
    data(){
      return {
      
        //选择icon
        icon_tan:  false, 
        // 左侧按钮背景色、未选中文字、选中文字
        backgroundColor: '#515A6E',                      
        textColor: 'rgba(255,255,255,.7)',
        activeTextColor: '#2d8cf0',
        //路由   
        lft_btns: [],

        // 头像 
        // headImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        headImg: 'https://file.jiapuji.vip/gateway/file/files/img/memorial/scene/bg/dd60949770fd4f8e9b6c00431ff6a4be.jpg',

        loginAll: {},
      }
    },
    watch:{
      // '$route':function(to,from){
      //     this.lft_btns = to.path;
      // },
      is_change_menuNum(val){
        this.load();
      }
    },
    computed: {
      is_change_menuNum(){     
          return this.$store.getters.is_change_menuNum
      },
    },
    methods: {
      load(){
        let that = this;
        that.$myAjax.get('/admin/user/menu/get').then( res => {
          let list = res.data.data,list2 = [],len=list.length;
          for(let i=0;i<len;i++){
             list2.push( {name:list[i].menuname,url:list[i].url,children:[]} );
             for(let j=0;j<list[i].children.length;j++){
               list2[i].children.push({name:list[i].children[j].menuname,url:list[i].children[j].url})
             }
          }
          
          this.$store.commit('change_menu',list2);
          // console.log(this.$store.state.menu)
          that.lft_btns = list;
        })
         
         
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      goLogin(){
        this.$router.push('/');
      }
      
    },
    mounted(){
      let that = this;
      this.load();
      
      // 阻止重复点击报错
      const originalPush = Router.prototype.push
      Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }

      this.loginAll = this.$store.state.login;
      
    }
  }
</script>
<style scoped >
  .logo .main{
    padding: 0 100px !important;
  }

  .layoutIcon .iconfont {         /*** iconfont操控字体 (此处为layoutIcon里的iconfont) ***/
    font-size: 15px!important;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {   /** 左侧导航 **/
    width: 200px;
    min-height: 200px;
  }
  .el-header {
    line-height: 60px;
  }
  
  .el-aside {
    text-align: left;
    color: #333;
  }
  
  

  /* 左上角弹窗 */
  .dialog_iframe{
    height: calc(95vh - 100px);
    overflow: auto;
  }

</style>