<template>
     <div class="whAll">
        <el-button  class="bInfo" @click="addBool=true;ad=true;title=0;allAdd()">添加</el-button>

        <!-- table  -->
        <el-table  class="mT20" size="small" border @selection-change="checkboxFun" :data="list"  >   
            <el-table-column prop="userName" label="用户" align="left" width=""></el-table-column>
            <el-table-column prop="name" label="用户组名" align="left" width=""></el-table-column>
            <el-table-column prop="nickName" label="昵称" align="left" width=""></el-table-column>
            <el-table-column prop="userImage" label="头像" align="center" width="60">
                <template slot-scope="scope">
                    <img  class="table_img"  v-if="scope.row.userImage == 'N/A'" src="/images/head_01.png">  
                    <img  class="table_img"  v-else src="scope.row.userImage">  
                </template>
            </el-table-column>
            <el-table-column prop="createtime" label="添加时间" align="left" width=""></el-table-column>
            <el-table-column prop="lasttime" label="最后登录时间" align="left" width="">
                <template slot-scope="scope">
                    {{$timer.time1(scope.row.lasttime)}}
                </template>
            </el-table-column>
            <el-table-column prop="lastip" label="最后登录IP" align="left" width=""></el-table-column>
            <el-table-column  label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button type='mini'   class="bGreen" @click="editor(scope.row);addBool=true;ad=false;title=2" icon="el-icon-edit-outline"></el-button>
                    <el-button type='mini'   class="bRed"   @click="value=scope.row.id;userid=scope.row.userid;userName=scope.row.userName;title=3;del()" icon="el-icon-delete"></el-button>      
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加 -->
        <el-dialog  class="dialog_bottom  dInput"  
            width="600px"
            :title="title2"
            :visible.sync="addBool"
            append-to-body
        >
            <ul>
                <li>     <!-- 添加ad=true,编辑ad=false -->
                    <!-- 用户组  -->
                    <span><b v-if="ad" class="cRed">*</b>用户组：</span>
                    <el-select v-model="value" placeholder="请选择" style="width: 300px;">
                        <el-option
                        v-for="(item,index) in list2"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <!-- 用户名  -->
                    <span><b v-if="ad" class="cRed">*</b>用户名：</span>
                    <el-input v-if="ad" v-model="model1" placeholder="请输入用户名"></el-input>
                    <el-input v-if="!ad" v-model="model1" placeholder="请输入用户名" disabled></el-input>
                </li>
                <li>
                    <!-- 用户密码  -->
                    <span><b v-if="ad" class="cRed">*</b>用户密码：</span>
                    <el-input v-model="model2" placeholder="请输入用户密码"></el-input>
                </li>
                <li>
                    <!-- 头像  -->
                    <span><b v-if="ad" class="cRed">*</b>头像：</span>
                    <el-button class="bInfo">上传图片</el-button>
                </li>
                <li>
                    <!-- 昵称  -->
                    <span><b v-if="ad" class="cRed">*</b>昵称：</span>
                    <el-input v-model="model3" placeholder="请输入昵称"></el-input>
                </li>
                
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addBool=false">取消</el-button>
                <el-button type="primary" @click="add_ok">确认</el-button>
            </div>
        </el-dialog>

        
     </div>
     
</template> 
<script>
    import { mapState,mapMutations,mapGetters } from 'vuex';
    export default {
        
        data () {
            return {  
               list: null,
               list2: [], 
               resList: [], 
               addBool: false,
               ad: false,    //添加true,编辑false
               delBool: false,
               title: 0,
               title2: '添加',

               userName: null,

               value: null,
               userid: null,
               model1: null,
               model2: null,
               model3: null
            };
            
        }, 
        watch:{
            title(val){
                switch(val){
                    case 0:
                    case 1:
                        this.title2 = '添加';
                        break;
                    case 2:
                        this.title2 = '编辑';
                        break;
                    case 3:
                        this.title2 = '删除';
                        break;     
                }
            }
        },
        computed: {
        
        },
        methods: {               
            load(){       
                this.$myAjax.get('/admin/user/role/get').then( res => {
                    this.list = this.$data_null(res.data.data)
                })  
                this.$myAjax.get('/admin/role/all/get').then( res => {
                    let list2 = res.data.data;
                    this.list2 = [];
                    let list2Len = list2.length;
                    for(let i = 0;i<list2Len;i++){
                        this.list2.push({value: list2[i].id,label: list2[i].name})
                    }
                  
                })  
            },
    
            // 全局添加
            allAdd(){
                this.value = 4;
                this.model1 = null;
                this.model2 = null;
                this.model3 = null;
            },
            
            editor(opt){
                console.log(22,opt)
                this.value = opt.roleid;
                this.userid = opt.userid;
                this.model1 = opt.userName;
                this.model2 = null;
                this.model3 = opt.nickName;
            },
            // 确认 
            add_ok(){
                let data = {
                    type: 0,
                    username: this.model1,
                    password: this.model2,
                    nickname: this.model3,
                    thumb: null         //图片
                }
                if(this.title == 0||this.title == 1){
                    data.roleid = this.value;
                    this.$myAjax.post('/admin/create/admin',this.$ajaxNull.post(data)).then((res)=>{
                        this.addBool = false;
                        this.load();
                    })
                }else if(this.title == 2){
                    data.roleid = this.value;
                    data.userid = this.userid;
                    data.username = null;
                    this.$myAjax.put('/admin/update/admin',this.$ajaxNull.post(data)).then((res)=>{
                        this.addBool = false;
                        this.load();
                    })
                }
            },
            // 删除 
            del(){
                let txt = `此操作将永久删除“${this.userName}”, 是否继续?`;
                this.$confirm(txt, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$myAjax.delete('/admin/delete/admin?userid='+this.userid+'&type=0').then((res)=>{
                        this.load();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 批量操作
            checkboxFun(){

            },
        },
        mounted: function(){
            this.load(); 
             
        }
    }
</script>  
<style scoped>
    
</style>