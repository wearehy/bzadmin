<template>
     <div class="whAll">
         
         <div class="top" v-if="list1_u">
             <div class="top_lft" >
                 <img class="img" v-if="list1_u.thumb"  :src="pic+list1_u.thumb" alt="">
             </div>
             <div class="top_rgt">
                <h1 class="fs18 mB10">{{list1_u.nickname}}</h1>
                <el-row :gutter="20">
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">UID：{{list1_u.idnumber}} </div></el-col>
                    <el-col :span="8"><div class="widthAll grid-content bg-purple"></div></el-col>
                    <el-col :span="8"><div class="widthAll grid-content bg-purple"></div></el-col> 
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">性别：<span v-if="list1_u.sex == 1">男</span><span v-if="list1_u.sex == 2">女</span> </div></el-col>
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">创建时间：{{$timer.time2(list1_u.inputtime)}}</div></el-col>
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">用户组：<span v-if="list1_u.usertype==1">普通用户</span><span v-if="list1_u.usertype==2">设计师</span><span v-if="list1_u.usertype==3">商户</span></div></el-col> 
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">手机号码：{{list1_u.phone}} </div></el-col>
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">最后登录时间：{{$timer.time2(list1_u.lasttime)}}</div></el-col>
                    <el-col :span="8"><div class="widthAll grid-content bg-purple">简介：{{list1_u.summary}}</div></el-col> 
                </el-row>
             </div>
             <div class="fix_t_r">
                 <el-button class="bGreen" @click="editor=true;editorFun()" icon="el-icon-edit">修改</el-button>
             </div>
         </div>
         <div class="bottom">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="详情" name="1"> 
                    <xq :rows1='list1' ></xq> 
                </el-tab-pane>
                <el-tab-pane label="商品" name="2">商品</el-tab-pane>
            </el-tabs>
         </div>

        <!-- 修改弹窗 -->
        <el-dialog  class="dialog_bottom  dInput"  
            width="600px"
            title="修改"
            :visible.sync="editor"
            append-to-body
        >
            <ul>
                <li>
                    <!-- 账户名称  -->
                    <span>  账户名称：</span>
                    <el-input v-model="editor_model1" placeholder="请输入手机号"></el-input>
                </li>
                <li>
                    <!-- 昵称  -->
                    <span>  昵称：</span>
                    <el-input v-model="editor_model2" placeholder="请输入昵称"></el-input>
                </li>
                <li class="userGroup">
                    <!-- 用户组  -->
                    <span>  用户组：</span>
                    <el-radio-group style="text-align:center" v-model="editor_model3" size="mini">
                        <el-radio-button label="1">普通用户</el-radio-button>
                        <el-radio-button label="2">设计师</el-radio-button>
                        <el-radio-button label="3">商户</el-radio-button>
                        
                    </el-radio-group>
                </li>
                <li>
                    <!-- 性别  -->
                    <span>  性别：</span>
                    <el-radio-group style="text-align:center" v-model="editor_model4" size="mini">
                        <el-radio-button label="1">男</el-radio-button>
                        <el-radio-button label="2">女</el-radio-button>
                    </el-radio-group>
                </li>
                <li>
                    <!-- 密码  -->
                    <span> 密码：</span>
                    <el-input type="password" v-model="editor_model5" placeholder="请输入密码"></el-input>
                </li>
                <li>
                    <!-- 重复密码  -->
                    <span> 重复密码：</span>
                    <el-input type="password" v-model="editor_model6" placeholder="请输入重复密码"></el-input>
                </li>
                <li>
                    <!-- 简介  -->
                    <span class="textarea"> 简介：</span>
                    <el-input  type="textarea" rows="6" v-model="editor_model7" placeholder="请输入简介"></el-input>
                </li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editor_cancel()">取消</el-button>
                <el-button type="primary" @click="editor_ok()">确定</el-button>
            </div>
        </el-dialog>
     </div>
     
</template> 
<script>
    import xq from './list/xq.vue'
    import { Loading } from 'element-ui';
    export default {
        data () {
            return { 
              
              id:null,
              activeName: '1',  //切换页面
              pic: 'http://apipic.boomake.com/',
              editor: false,  //editor弹窗
              list1: null,
              list1_a: null,
              list1_u: null,

              editor_model1:null,
              editor_model2:null,
              editor_model3:null,
              editor_model4:null,
              editor_model5:null,
              editor_model6:null,
              editor_model7:null,
            };  
        }, 
        watch:{
            rows(val){
                this.id = val.id;
                this.load()
            }
        },
        components: {
            xq:xq
        },
        computed: {
        
        },
        props:['rows','sxs'],
        methods: {
            load(){
                let data = {
                    id: this.id
                    // id: 2
                }
                this.$myAjax.get('/admin/user/info/get'+this.$ajaxNull.get(data)).then( res => {
                    this.list1 = this.$data_null(res.data.data);
                    this.list1_a = this.$data_null(res.data.data.address);
                    this.list1_u = this.$data_null(res.data.data.userInfo);
                    console.log(33,this.list1)
                })  
            },
           
            // 添加 
            editorFun(){
                this.editor_model1 = this.list1_u.phone;
                this.editor_model2 = this.list1_u.nickname;
                this.editor_model3 = this.list1_u.usertype;
                this.editor_model4 = this.list1_u.sex;
                this.editor_model5 = null;   
                this.editor_model6 = null;   
                this.editor_model7 = this.list1_u.summary;   
               console.log(this.editor_model3)
            },
           
            // 确定 
            editor_ok(){
                if(this.editor_model5 != this.editor_model6){
                    this.$message({
                        message: '密码不一致！',
                        type: 'error'
                    })
                    return;
                }
              
                let data = {
                    id: this.list1_u.id,
                    phone: this.editor_model1,
                    nickname: this.editor_model2,
                    usertype: this.editor_model3,
                    sex: this.editor_model4,
                    password: this.editor_model6,
                    summary: this.editor_model7
                }
                this.$myAjax.put('/admin/user/update',this.$ajaxNull.post(data)).then(()=>{
                    this.load();
                    this.$emit('sx2Fun',!this.sxs);
                    this.editor = false;
                })
                
            },
            // 取消 
            editor_cancel(){
               this.editor = false;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        mounted: function(){
            var that = this;
            this.id = this.rows.id;
            that.load();
            
            
        }
    }
</script>  
<style scoped>
   .top{
       position: relative;
       overflow: hidden;
       margin-bottom: 20px;
   }
   .top_lft,.top_rgt{
       float: left;
       width: auto;
       min-height: 50px;
       overflow: hidden;
       padding-right: 10px;
   }
    .top_rgt{
        width:600px;
    }
    .top_lft img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
    }

    .el-row {
        margin-bottom: 5px;
    }
    
    .fix_t_r{
        position: absolute;
        top: 0;
        right: 0;
    }
    
</style>