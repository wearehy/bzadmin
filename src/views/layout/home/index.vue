<template>
     <div class="widthAll heightAll"> 
        <div class="border-card">
            <el-table  border  :data="tableData" :height="tHeight">
                <el-table-column prop="date" label="日期" width="140">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>   
            </el-table>
            <div class="block">
                <div class="mT15"></div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
                    background
                >
                </el-pagination>
            </div>
        </div>    
            
     </div>
     
</template> 
<script>
    export default {
        data () {
            const item = {
               
               date: '2016-05-02',
               name: 'index',
               address: '上海市普陀区金沙江路 1518 弄'
            };
            return {  
                 tableData: Array(50).fill(item),
                 tHeight: null,
                 currentPage: 1,
                 a:null,
                 b:null
            };
            
        }, 
        watch:{
            
        },
        computed: {
        
        },
        methods: {
            handleSizeChange(){},
            handleCurrentChange(){},
            
            get1() {
                return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                         let a='111';
                         this.a = a;
                        console.log(a)
                        resolve();
                    },5000)
                   
                   
                });
            },
            get2() {
                return new Promise((resolve, reject) => {
                    let b='222';
                    this.b = b;
                    console.log(b)
                    resolve();
                   
                });
            },
            
            async getAllData() {
                let a = "111111111";
                await this.get1();
                await this.get2();
                console.log(a,this.a,this.b)
            }
        },
        mounted: function(){
            this.getAllData();
            var that = this;
            that.tHeight = window.innerHeight - 180;
            window.onresize = function(){
                that.tHeight = window.innerHeight - 180;
            }
           
        }
    }
</script>  
<style scoped>
    
</style>