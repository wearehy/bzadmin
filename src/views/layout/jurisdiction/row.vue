<template>
     <div class="whAll">
        <template v-if="!handBool">
            <el-button  class="bInfo" @click="addBool=true;ad=true;title=0;allAdd()">添加</el-button>
            <!-- table  -->
            <el-table  class="mT20" border :data="list"  >   
                
                <el-table-column prop="code" label="CODE" align="left" width=""></el-table-column>
                <el-table-column prop="name" label="用户组名" align="left" width=""></el-table-column>
                <el-table-column prop="createtime" label="添加时间" align="left" width=""></el-table-column>
                <el-table-column prop="content" label="角色描述" align="left" width=""></el-table-column>
                <el-table-column  label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="权限" placement="top-start">
                            <el-button  type='mini'   class="bInfo icon  iconfont icon-shouzhang"  @click="row=scope.row;handBool=true;title=1" ></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button type='mini'   class="bGreen" @click="editor(scope.row);addBool=true;ad=false;title=2" icon="el-icon-edit-outline"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                            <el-button type='mini'   class="bRed"   @click="id=scope.row.id;model2=scope.row.name;title=3;del()" icon="el-icon-delete"></el-button>
                        </el-tooltip>
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
                    <li>
                        <!-- CODE  -->
                        <span><b v-if="ad" class="cRed">*</b>CODE：</span>
                        <el-input v-model="model1" placeholder="请输入CODE"></el-input>
                    </li>
                    <li>
                        <!-- 用户组名  -->
                        <span><b v-if="ad" class="cRed">*</b>用户组名：</span>
                        <el-input v-model="model2" placeholder="请输入用户组名"></el-input>
                    </li>
                    <li>
                        <!-- 角色描述  -->
                        <span><b v-if="ad" class="cRed">*</b>角色描述：</span>
                        <el-input v-model="model3" placeholder="请输入角色描述"></el-input>
                    </li>
                </ul>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addBool=false">取消</el-button>
                    <el-button type="primary" @click="add_ok">确认</el-button>
                </div>
            </el-dialog>

        </template>
        <template v-if="handBool">
            <row2 :rows='row' @handBool="handBool2"></row2>
        </template>
     </div>
     
</template> 
<script>
    import row2 from './row/row2.vue'
    export default {
        
        data () {
            return {  
               row: null,
               list: null,
               list2: null, 
               resList: [], 
               addBool: false,
               ad: false,         //添加true,编辑false
               handBool: false,   //查看权限
               title: 0,
               title2: '添加',

               id: null,
               model1: null,
               model2: null,
               model3: null,
               model4: null,
            };
            
        }, 
        watch:{
            title(val){
                switch(val){
                    case 0:
                        this.title2 = '添加';
                        break;
                    case 1:
                        this.title2 = '权限';
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
        components: {
            row2:row2
        },
        computed: {
        
        },
        methods: {
            load(){       
                this.$myAjax.get('/admin/role/all/get').then( res => {
                    this.list = res.data.data;
                })  
            },
         
            // 全局添加
            allAdd(){
                this.model1 = null;
                this.model2 = null;
                this.model3 = null;
            },
            
            editor(opt){  
                this.id     = opt.id;           
                this.model1 = opt.code;
                this.model2 = opt.name;
                this.model3 = opt.content;
            },
            // 确认 
            add_ok(){
                let data = {
                    code: this.model1,
                    name: this.model2,
                    content: this.model3,
                    type: 0  
                }
                if(this.title == 0){
                    this.$myAjax.post('/admin/role/add',this.$ajaxNull.post(data)).then((res)=>{
                        this.addBool = false;
                        this.load();
                    })
                }else if(this.title == 1){

                }else if(this.title == 2){
                    data.id = this.id;
                    this.$myAjax.put('/admin/role/update',this.$ajaxNull.post(data)).then((res)=>{
                        this.addBool = false;
                        this.load();
                    })
                }
            },
            // 删除 
            del(){
                let txt = `此操作将永久删除“${this.model2}”, 是否继续?`;
                this.$confirm(txt, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$myAjax.delete('/admin/role/delete?id='+this.id).then((res)=>{
                        this.load();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
           
            handBool2(val){
                this.handBool = val;
                console.log(33,val)
            }
         
        },
        mounted: function(){
            this.load(); 
             
        }
    }
</script>  
<style scoped>
    
</style>