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
               name: 'loginLog',
               address: '上海市普陀区金沙江路 1518 弄'
            };
            return {  
                 tableData: Array(50).fill(item),
                 currentPage: 1,
                 tHeight: null,
            };
            
        }, 
        computed: {
        
        },
        methods: {
            handleSizeChange(){

            },
            handleCurrentChange(){

            }
        },
        mounted: function(){
            var that = this;
            that.tHeight = window.innerHeight - 150;
            window.onresize = function(){
                that.tHeight = window.innerHeight - 150;
            }
          
        }
    }
</script>  
<style scoped>
    
</style>