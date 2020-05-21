<template>
     <div class="whAll">
        <el-button  class="bInfo" @click="addBool=true;ad=true;title=0;allAdd()">添加</el-button>

        <!-- table  -->
        <el-table  class="mT20" border @selection-change="checkboxFun" :data="list"  >   
            <el-table-column prop="menuimage" label="图标" align="center" width="80">
                <template slot-scope="scope">
                    <i  :class="['icon','iconfont',scope.row.menuimage]" ></i>
                </template>
            </el-table-column>
            <el-table-column prop="label" label="权限名称" align="left" width=""></el-table-column>
            <el-table-column prop="url" label="控制器方法" align="left" width=""></el-table-column>
            <el-table-column prop="isdisplay" label="菜单状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-switch  active-color="#13ce66" inactive-color="#ff4949" :active-value="Number(0)" :inactive-value="Number(1)" v-model="scope.row.isdisplay" @change="switch1(scope.row)" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="left" width="120"></el-table-column>
            <el-table-column   label="子菜单" align="center" width="80">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="展开" placement="top-start">
                        <el-button type='mini' v-if="scope.row.level == 0"      @click="look(scope.row,scope.$index)" class=" icon  iconfont icon-sitemap" style="background:#22B4F5;color:white" ></el-button>
                        <el-button type='mini' v-else-if="scope.row.level == 1" @click="look(scope.row,scope.$index)" class=" icon  iconfont icon-sitemap" style="background:#3e95b5;color:white" ></el-button>
                        <el-button type='mini' v-else-if="scope.row.level == 2" @click="look(scope.row,scope.$index)" class=" icon  iconfont icon-sitemap" style="background:#41ba9f;color:white" ></el-button>
                        <el-button type='mini' v-else                           @click="look(scope.row,scope.$index)" class=" icon  iconfont icon-sitemap" style="background:#33CC99;color:white" ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column  label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
                        <el-button type='mini'   class="bInfo"  @click="add(scope.row);addBool=true;ad=true,title=1" icon="el-icon-plus"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button type='mini'   class="bGreen" @click="editor(scope.row);addBool=true;ad=false;title=2" icon="el-icon-edit-outline"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button type='mini'   class="bRed"   @click="value=scope.row.id;label=scope.row.label;title=3;del()" icon="el-icon-delete"></el-button>
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
                <li v-if="ad">     <!-- 添加ad=true,编辑ad=false -->
                    <!-- 父级  -->
                    <span><b v-if="ad" class="cRed">*</b>父级：</span>
                    <el-select v-model="value" placeholder="默认顶级" style="width: 300px;">
                        <el-option
                        v-for="item in list2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li v-if="ad == false">
                    <!-- 名称  -->
                    <span><b v-if="ad" class="cRed">*</b>父级：</span>
                    <el-input v-model="label" placeholder="请输入名称" disabled></el-input>
                </li>
                <li>
                    <!-- 权限名称  -->
                    <span><b v-if="ad" class="cRed">*</b>权限名称：</span>
                    <el-input v-model="model1" placeholder="请输入权限名称"></el-input>
                </li>
                <li>
                    <!-- 控制器/方法  -->
                    <span>  <b v-if="ad" class="cRed">*</b>控制器/方法：</span>
                    <el-input v-model="model2" placeholder="请输入控制器/方法"></el-input>
                </li>
                <li>
                    <!-- 图标名称  -->
                    <span>  <b v-if="ad" class="cRed">*</b>图标名称：</span>
                    <el-input v-model="model3" placeholder="请输入图标名称"></el-input>
                </li>
                <li>
                    <!-- 排序  -->
                    <span>  <b v-if="ad" class="cRed">*</b>排序：</span>
                    <el-input type="number" v-model="model4" placeholder="请输入排序"></el-input>
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
    export default {
        
        data () {
            return {  
               list: null,
               list2: null, 
               resList: [], 
               addBool: false,
               ad: false,    //添加true,编辑false
               title: 0,
               title2: '添加',

               value: null,
               label: null,
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
                this.$myAjax.get('/admin/menu/get').then( res => {
                    let list = null;
                    list = this.$data_null(res.data.data);
                    let listLen = list.length;
                    for(let i=0;i<listLen;i++){
                        list[i].value   = list[i].id;
                        list[i].label = list[i].menuname;
                    }
                    this.dg2(list);

                    // 刷新 /layout 菜单
                    let menuNum = (new Date()).valueOf();
                    this.$store.commit('change_menuNum',menuNum);

                    this.list = list;

                    let list2 = list.map(x=>x);
                    list2.unshift({value:null,label:'默认顶级',children:[]});
                    
                    this.all_dg(list2);
                    
                    
                    this.list2 = list2;
                    // console.log('menu.vue/list2',this.list2);
                    
                })  
            },
            switch1(val){
                this.$myAjax.put('/admin/user/menu/update',{id:val.id,isdisplay:val.isdisplay}).then((res)=>{

                })
            },
            look(opt,index){
                let that = this;
                that.resList = [];
                if(opt.children.length > 0){
                    let bool = true;
                    let len = that.list.length;
                    for(let i=0;i<len;i++){
                        if(that.list[i].id === opt.children[0].id){
                           bool = false;        //  已展开
                        }
                    }
                    console.log('index',index)
                    if(bool){ 
                        for(let i = opt.children.length-1; i >= 0;i--){
                            that.list.splice(index+1,0,opt.children[i]) 
                        }    
                    }else{
                        that.dg(opt);
                        for(let j = 0; j < that.list.length;j++){ 
                            for(let k = 0; k < that.resList.length;k++){ 
                                if(that.list[j].id === that.resList[k]){
                                    console.log('id',that.list[j].id,that.resList[k])
                                    that.list.splice(j,1);
                                    
                                }
                                
                            }
                        }    
                    }
                }else{
                    that.$message({
                        message: '没有子菜单！',
                        type: 'error'
                    })
                }
                
            },
            // 全局添加
            allAdd(){
                this.value = null;
                this.model1 = null;
                this.model2 = null;
                this.model3 = null;
                this.model4 = null;
            },
            // 操作 
            add(opt){
                this.value = opt.value;
                this.model1 = null;
                this.model2 = null;
                this.model3 = null;
                this.model4 = null;
            },
            editor(opt){
                this.value = opt.value;
                this.label = opt.label;
                this.model1 = opt.menuname;
                this.model2 = opt.url;
                this.model3 = opt.menuimage;
                this.model4 = opt.sort;
            },
            // 确认 
            add_ok(){
                let data = {
                    
                    menuname: this.model1,
                    url: this.model2,
                    menuimage: this.model3,
                    sort: this.model4
                }
                if(this.title == 0||this.title == 1){
                    data.supermenuid = this.value;
                    this.$myAjax.post('/admin/user/menu/add',this.$ajaxNull.post(data)).then((res)=>{
                        this.addBool = false;
                        this.load();
                    })
                }else if(this.title == 2){
                    data.id = this.value;
                    this.$myAjax.put('/admin/user/menu/update',this.$ajaxNull.post(data)).then((res)=>{
                        this.addBool = false;
                        this.load();
                    })
                }
            },
            // 删除 
            del(){
                let txt = `此操作将永久删除“${this.label}”, 是否继续?`;
                this.$confirm(txt, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$myAjax.delete('/admin/menu/delete?id='+this.value).then((res)=>{
                        this.load();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
           

            //递归
            dg(res){
                let that = this;
                if( res.children.length>0 ){
                    for(let v=0;v<res.children.length;v++){
                        // if( that.resList.indexOf(res.children[v].id) == -1){
                            that.resList.push(res.children[v].id);
                            that.dg(res.children[v]);
                            
                        // }
                    }
                }  
            },
            dg2(data){
                let that = this;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].children) {
                        that.dg2(data[i].children)
                    }
                    for(let j = 0; j< data[i].level;j++){
                        data[i].value = data[i].id;
                        data[i].label = `|— ${data[i].menuname}`
                    }
                        
                }
                return data
            },
            all_dg(data){
                let that = this;
                for(let i=0;i<data.length;i++){
                    if( data[i].children&&data[i].children.length>0 ){
                        for(let v=0;v<data[i].children.length;v++){      
                            data.splice(i+1,0,data[i].children[v]);
                            that.all_dg(data[i].children[v]);      
                        }
                    }
                }
                
                return data;
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