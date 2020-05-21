<template>
     <div class="management whAll">
         <el-row class="search_head" :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">            
                <el-input v-model="UID" @keyup.enter.native="search()" placeholder="请输入内容">
                    <template  slot="prepend">账户/UID</template>
                </el-input>
            </div></el-col>
           
            <el-col :span="6"><div class="grid-content bg-purple">            
                <el-button class="bBlue"   @click="search()" icon="el-icon-search">搜索</el-button>
                <el-button class="bYellow" @click="searchNull()" icon="el-icon-delete-solid">清空</el-button>
            </div></el-col>
        </el-row>

        <el-row class="search_head" :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-select v-model="sort" placeholder="请选择排序方式" class="floatL" >
                    <el-option
                        v-for="item in sorts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-button class="bBlue" @click="add=true;addFun()" icon="el-icon-plus">添加</el-button>
                <!-- <el-button class="bYellow" @click="batchFun()"  >批量操作</el-button> --> 
            </div></el-col>
        </el-row>


        <!-- table  -->
        <el-table class="m_table"  border @selection-change="handleSelectionChange" :data="list" :height="tHeight" >
            <!-- <el-table-column type="selection"  width="35"></el-table-column> -->
            <el-table-column prop="idnumber" label="UID" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.idnumber || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.phone || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" align="center" width=""></el-table-column>
            <el-table-column prop="usertype" label="用户组" align="center" width="">
                <template slot-scope="scope">
                    {{ scope.row.usertype == 1?'普通用户':(scope.rowusertype == 2?'设计师':'商户')}}
                   
                </template>
            </el-table-column>
            <el-table-column prop="wokes" label="作品数" align="center" width=""></el-table-column>
            <el-table-column prop="fans" label="粉丝数" align="center" width=""></el-table-column>
            <el-table-column prop="order" label="订单数" align="center" width=""></el-table-column>
            <el-table-column prop="wxid" label="三方登录" align="center" width="120">
                <template slot-scope="scope">
                    <el-image class="table_img" :src="scope.row.wxid?sanfang.url+sanfang.wx2:sanfang.url+sanfang.wx1" fit="contain" alt=""></el-image>
                    <el-image class="table_img" :src="scope.row.qqid?sanfang.url+sanfang.qq2:sanfang.url+sanfang.qq1" fit="contain" alt=""></el-image>
                    <el-image class="table_img" :src="scope.row.sinaid?sanfang.url+sanfang.sina2:sanfang.url+sanfang.sina1" fit="contain" alt=""></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="isBrand" label="推荐" align="center" width="80">
                <template slot-scope="scope">
                    <el-switch  active-color="#13ce66" inactive-color="#ff4949" :active-value="Number(1)" :inactive-value="Number(0)" v-model="scope.row.isBrand" @change="switch_isBrand(scope.row)" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" align="center" width="80">
                <template slot-scope="scope">
                    <el-switch  active-color="#13ce66" inactive-color="#ff4949" :active-value="Number(0)" :inactive-value="Number(1)" v-model="scope.row.delete" @change="switch_delete(scope.row)" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column  prop="lasttime" label="最后登录时间" align="center" min-width="75">
                <template slot-scope="scope">
                    <span>{{$timer.time1(scope.row.lasttime)}}</span>
                </template>
            </el-table-column>

            <el-table-column  prop="btn"  label="操作" align="center" min-width="120">
                <template slot-scope="scope">
                    <el-button @click="row=scope.row;editor=true;" class="bGreen" size="mini">查看 / 编辑</el-button>
                </template>
            </el-table-column>   
        </el-table>
        <div class="block"> 
            <div class="mT15"></div>  <!-- 顶部15px -->

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10,20, 30, 40]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                background
            >
                
            </el-pagination>
        </div>


        <!-- 添加弹窗 -->
        <el-dialog  class="dialog_bottom  dInput"  
            width="600px"
            title="添加"
            :visible.sync="add"
            append-to-body
        >
            <ul>
                <li>
                    <!-- 账户名称  -->
                    <span> <b  class="cRed">*</b> 账户名称：</span>
                    <el-input v-model="add_model1" placeholder="请输入手机号"></el-input>
                </li>
                <li>
                    <!-- 昵称  -->
                    <span> <b  class="cRed">*</b> 昵称：</span>
                    <el-input v-model="add_model2" placeholder="请输入昵称"></el-input>
                </li>
                <li>
                    <!-- 性别  -->
                    <span> <b  class="cRed">*</b> 性别：</span>
                    <el-radio-group style="text-align:center" v-model="add_model3" size="mini">
                        <el-radio-button label="1">男</el-radio-button>
                        <el-radio-button label="2">女</el-radio-button>
                        
                    </el-radio-group>
                </li>
                <li>
                    <!-- 密码  -->
                    <span><b  class="cRed">*</b> 密码：</span>
                    <el-input type="password" v-model="add_model4" placeholder="请输入密码"></el-input>
                </li>
                <li>
                    <!-- 重复密码  -->
                    <span><b  class="cRed">*</b> 重复密码：</span>
                    <el-input type="password" v-model="add_model5" placeholder="请输入重复密码"></el-input>
                </li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add_cancel()">取消</el-button>
                <el-button type="primary" @click="add_ok()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 查看/编辑 弹窗 -->
        <el-dialog  class="dialog_bottom  dInput"  
            width="1200px"
            title="查看/编辑"
            :visible.sync="editor"
            append-to-body
        >
            <list :rows='row' :sxs='sx' @sx2Fun="sxFun"></list>
            
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="editor=false">取消</el-button> -->
                <el-button type="primary" @click="editor=false">关闭</el-button>
            </div>
        </el-dialog>
         
         
     </div>
</template> 
<script>
    import list from './management/list.vue'
   
    export default {
        data () {
            return { 
                sx: false,  //子页面刷新本页

                add_model1: null,
                add_model2: null,
                add_model3: null,
                add_model4: null,
                add_model5: null,
               
              
                search_bool: true,
                row: null,
                row2: null,  
        
                add: false,     // 添加弹窗
                editor: false,  // 查看/编辑
              
                UID:null,
                
                multipleSelection: [],  //多选
               
                // 排序方式
                sort: '0',
                sorts: [
                   {value: '0',label: '按注册时间排序'},    //注册时间排序
                   {value: '1',label: '按粉丝数量排序'},
                   {value: '2',label: '按订单数量排序'},
                   {value: '3',label: '按作品数量排序'},
                ],
               
                page: 1,
                size: 20,
                total: 0,
                list: [],


                tHeight: null,
              
                sanfang:{
                    url: '/images/',
                    wx1: 'ic_weixin_1.png',
                    wx2: 'ic_weixin_2.png',
                    qq1: 'ic_qq_1.png',
                    qq2: 'ic_qq_2.png',
                    sina1: 'ic_sina_1.png',
                    sina2: 'ic_sina_2.png',
                }
                
            };  
        }, 
        watch:{
            sort(val){
                this.load();
            },
           
        },
        components: {
            list:list
        },
        computed: {
        
        },
        methods: {
            load(){
                let data = {
                    type: Number(this.sort),
                    page: this.page,
                    size: this.size
                }
                this.$myAjax.get('/admin/user/list/order/get'+this.$ajaxNull.get(data)).then( res => {
                    
                    // this.list = this.$data_null(res.data.data.list);
                    this.list = res.data.data.list;
                    this.total = res.data.data.total
                })  
            },
            search_load(){
                let data = {
                    name: this.UID,
                    page: this.page,
                    size: this.size,
                }
                this.$myAjax.get('/admin/user/vague/name/get'+this.$ajaxNull.get(data)).then((res)=>{
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                })
            },
            toggleSelection(rows) {    //操作被选中项
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {               //被选中的多选框
                this.multipleSelection = val;
                console.log(val)
            },
            handleSizeChange(val){          //切换每页多少条
                this.size = val;
                if(this.search_bool){
                    this.load();
                }else{
                    this.search_load();
                }
                
            },
            handleCurrentChange(val){      //当前选中页
                this.page = val;
                if(this.search_bool){
                    this.load();
                }else{
                    this.search_load();
                }
            },
            
         
           
            batchFun(){   //批量操作

            },
            switch_isBrand(row){
                let data = {
                    id: row.id,
                    isBrand: row.isBrand
                }
                this.$myAjax.put('/admin/user/update',data).then(()=>{

                })
            },
            switch_delete(row){
                let data = {
                    id: row.id,
                    delete: row.delete
                }
                this.$myAjax.put('/admin/user/update',data).then(()=>{

                })
            },
            search(){
                
                this.page = 1;this.search_bool=false;
                this.search_load();
            },
            searchNull(){
                this.UID = null;
                this.page = 1;this.search_bool=true;
                this.load();
            },
            // 添加 
            addFun(){
                this.add_model1 = null;
                this.add_model2 = null;
                this.add_model3 = 1;
                this.add_model4 = null;
                this.add_model5 = null;   
               console.log(this.add_model3)
            },
           
            // 确定 
            add_ok(){
                if(this.add_model4 != this.add_model5){
                    this.$message({
                        message: '密码不一致！',
                        type: 'error'
                    })
                    return;
                }
              
                let data = {
                    
                    phone: this.add_model1,
                    nickname: this.add_model2,
                    sex: this.add_model3,
                    password: this.add_model5
                }
                this.$myAjax.post('/admin/user/add',data).then(()=>{
                    if(this.search_bool){
                        this.load();
                    }else{
                        this.search_load();
                    }
                    this.add = false;
                })
                
            },
            // 取消 
            add_cancel(){
               this.add = false;
            },
            
            sxFun(data){
                this.sx = data;
                if(this.search_bool){
                    this.load();
                }else{
                    this.search_load();
                }
            }
          
        },
        mounted: function(){
            var that = this;
            that.load();
            
            that.tHeight = window.innerHeight - 235;
            window.onresize = function(){
                that.tHeight = window.innerHeight - 235;
            }  

            
        }
    }
</script>  
<style scoped>
    .table_img{
        width: 24px;
        height: 24px;
        margin: 0 3px;
    }
</style>   