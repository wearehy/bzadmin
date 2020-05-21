<template>
     <div class="management whAll">
        <div class="mB15 mL10">
            
            <el-row class="search_head" :gutter="20">
                <span>时间范围：</span>
                <el-date-picker
                v-model="times"
                type="daterange"
                range-separator="至"
                :start-placeholder="data1.start"
                :end-placeholder="data1.end"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="time_c"
                >
                </el-date-picker>
            </el-row> 
            
        </div>
        
        
        <!-- table  -->
        <!-- {{data1.list}} -->
        <el-table class="m_table"  border @selection-change="handleSelectionChange" :data="data1.list" :height="tHeight"  >
            <el-table-column
                type="selection"
                width="39">
            </el-table-column>
            <el-table-column prop="ordersn" label="订单号" align="center" width="180">
                <template slot-scope="scope">
                    {{scope.row.ordersn || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.username || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="style" label="款式" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.style || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.sex || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="colour" label="颜色" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.colour || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="material" label="材质" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.material || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="size" label="尺寸" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.size || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="num" label="数量(件)" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.num || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="money" label="金额(元)" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.money || 'N/A'}}
                </template>
            </el-table-column>
            <el-table-column prop="time" label="时间" align="center" width="">
                <template slot-scope="scope">
                    {{scope.row.time || 'N/A'}}
                </template>
            </el-table-column>
            
        </el-table>
        <div class="mT15 widthAll" style="height:50px">
            <el-button type="warning"  @click="batch">批量删除</el-button>
            <div class="floatR">
                <div> <span class="inlineB wp100 fs14 txtR">总订单数：</span> <span class="inlineB wp150 fs14">{{data1.all.orderCount}}</span> </div>
                <div> <span class="inlineB wp100 fs14 txtR">总件数：</span> <span class="inlineB wp150 fs14">{{data1.all.orderNum}}</span> </div>
                <div> <span class="inlineB wp100 fs16 txtR">总金额：</span> <span class="inlineB wp150 cRed fs16">{{data1.all.orderMoney}} (元)</span> </div>
            </div>
            
        </div>
        <div class="block"> 
            <div class="mT15"></div>  <!-- 顶部15px -->

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="data1.page"
                :page-sizes="[10,20,30,50]"
                :page-size="data1.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="data1.total"
                background
            >
                
            </el-pagination>
        </div>

     </div>
</template> 
<script>
   
    export default {
        data () {
            return {
                tHeight: null, 
                search:{
                    time: ''
                },
                data1: {
                    all: {},
                    list: [],
                    start: '',
                    end: '',
                    page: 1,
                    size: 20,
                    total: 0
                },
                times:'',
                checks: [],  //批量选中
        
                
            };  
        }, 
        watch:{
          
        },
        
        computed: {
        
        },
        methods: {
            load(){
                
                let data = {
                    page: this.data1.page,
                    size: this.data1.size,
                    start: this.data1.start,
                    end: this.data1.end
                }
                
                this.$myAjax.get('/analogy/data/get'+this.$ajaxNull.get(data)).then( res => {
               
                    // this.list = this.$data_null(res.data.data.list);
                    this.data1.all = res.data.data;
                    this.data1.list = this.data1.all.pageInfo.list;
                    this.data1.total = this.data1.all.pageInfo.total;
                    console.log(this.data1.list)
                })  
            },
            handleSelectionChange(val) {   //批量选择             //被选中的多选框
                let checks = [];
                let len = val.length;
                for(let i = 0;i<len;i++){
                    checks.push(val[i].id)
                }
                this.checks = checks;

                // console.log(this.checks)
            },
            handleSizeChange(val){          //切换每页多少条
                this.data1.size = val;

            },
            handleCurrentChange(val){      //当前选中页
                this.data1.page = val;
                this.load();
            },
            time_c(val){
                this.data1.start = val[0];
                this.data1.end = val[1];
                console.log(this.data1.start,this.data1.end)
                this.load();
            },
            batch(){
                console.log(this.checks)
                this.$myAjax.post('/analogy/data/deletes',this.checks).then((res)=>{
                    this.load();
                })
               
            }
           
          
        },
        mounted: function(){
            
            this.data1.start = this.end = this.$moment().subtract(59, 'days').format('YYYY-MM-DD');
            this.data1.end = this.end = this.$moment().format("YYYY-MM-DD");
            this.load();
            
            this.tHeight = window.innerHeight - 260;
            window.onresize = function(){
                this.tHeight = window.innerHeight - 260;
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