<template>
  
  <div class="login" style="">
    <img src="/images/login.gif" class="bgimg">
    <!-- three.js  -->
    <!-- <iframe class="iframe" src="/login_three/index.html" frameborder="0"></iframe> -->
    <div class="login_content">
      <el-form  label-position="top" :model="ruleForm" status-icon :rules="rules" size="big" ref="ruleForm" label-width="20px" class="demo-ruleForm">
        <el-form-item  label="" prop="username">
          <el-input   ref="login1" @keyup.enter.native="changeInput(1)" placeholder="请输入账号" type="text" v-model="ruleForm.username" clearable maxlength="15">
            <template slot="prepend"><i class="el-icon-user" ></i></template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input  ref="login2" @keyup.enter.native="changeInput(2)" placeholder="请输入密码" type="password" v-model="ruleForm.password" show-password clearable  maxlength="15">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="code"  >
          <div class="demo-input-suffix">
            <el-col :span="13">
              <el-input   ref="login3" @keyup.enter.native="submitForm('ruleForm')" placeholder="请输入验证码" v-model="ruleForm.code" clearable maxlength="6" ></el-input>
            </el-col>
            <el-col :span="11"> 
              <!-- <img :src="yzmImg" alt="">    -->
              <el-image @click="imgc"
                style=" height: 40px;width:134px;float:right;"
                :src="yzmImg"
                fit="cover">
              </el-image>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button  size="medium" style="width:137px;"   class="login_mr" type="primary" @click="submitForm('ruleForm')">  提交</el-button>
          <el-button  size="medium" style="width:137px;"  @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>
<script>
  
  export default {
    data() {
      
      var validateusername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateverify = (rule, value, callback) => {
       
        callback();
      };
      return {
        yzmImg: this.$url+'/login/code/get',
    
        ruleForm: {
          username: '',
          password: '',
          code: '',
        },
        rules: {
          username: [
            { validator: validateusername, trigger: 'blur' }
          ],
          password: [
            { validator: validatepassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateverify, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      changeInput(num){
        console.log(num)
        this.$nextTick(()=>{       
          this.$refs['login'+ ++num ].focus();
        })
        
      },
      submitForm(formname) {
        let that = this;
      
        this.$refs[formname].validate((valid) => {
          if (valid) {
            that.$myAjax.post('/login/admin',that.$ajaxNull.post(that.ruleForm)).then( res => {
              this.$store.commit('change_token',res.data.data.token);
              this.$store.commit('change_login',res.data.data);
             

              function fun(menus){          //转menu
                let result = [];
                for(let i=0;i<menus.length;i++){
                  
                  if(menus[i].children[0]&&menus[i].children[0].url){
                    result.push({path: menus[i].url,name: menus[i].menuname,component:eval( () => import("../views"+menus[i].url+".vue")),redirect: menus[i].children[0].url,children:[]})
                    for(let j=0;j<menus[i].children.length;j++){
                      result[i].children.push({path: menus[i].children[j].url,name: menus[i].children[j].menuname,component:eval(() => import("../views"+menus[i].children[j].url+".vue"))})
                    }
                  }else{
                    result.push({path: menus[i].url,name: menus[i].menuname,component:eval( () => import("../views"+menus[i].url+".vue")),children:[]})
                  }
                }
                return result;	
              }
             
              that.$myAjax.get('/admin/user/menu/get').then( res2 => {
                let list = res2.data.data;
                
                this.$router.options.routes = [
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
                    children: fun(list)                         //此处引用JSON.js 里数据
                  },
                  {path:'*',name:"还未创建文件",component: () => import('../views/layout/notFound.vue')}
                ]
                
          
                this.$router.addRoutes(this.$router.options.routes);
                this.$store.commit('change_menu',this.$router.options.routes);
                
                let rou;
                (list.length!=0)&&(rou = list[0].url);
                this.$router.push(rou);
              })
              
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

        

      },
      resetForm(formname) {
        this.$refs[formname].resetFields();

      },
      imgc(){
        this.yzmImg = this.$url+'/login/code/get?id='+ Date.parse(new Date())/1000;
      },
    },
    mounted(){
      let that = this;
      let data = {
        userusername: '',
        password: '',
        code: ''
      }

   
    }
  }
</script>
<style  scoped>
  .login{
    position: relative;
    background-size: auto 100% ;
    height: 100vh;
    width: 100%;
    
  }
  .bgimg{
    position: absolute;
    height: 100vh;
    width: 100vh;
    top: -5%;
    left: 50%;
    transform: translateX(-50%);
  
  }
  .iframe{
    position: fixed;
    top: 0;bottom: 0;left: 0;right: 0;
    width: 100%;
    height: 100%;
  }
  .login_content{
    position: absolute;
    top: 50%;left: 50%;
    text-align: center;
    width: 330px;
    transform: translate(-50%,-70%);
  }
  .login_mr{
    margin-right:45px;
  }
</style>