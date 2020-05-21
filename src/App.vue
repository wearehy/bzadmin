<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import '/css/index.css';
@import '/css/head_body_foot.css';
@import '/css/scrollbar.css';
// @import '/css/scss.scss';

.el-menu-item,.el-submenu__title{
  font-size: 13px !important;
}

#nprogress .bar {               //加载进度条
  background: #2d8cf0 !important; //自定义颜色
}
*{
  margin: 0;
  padding: 0;
  border: 0;
  list-style-type:none;
  box-sizing: border-box;
}
#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>

