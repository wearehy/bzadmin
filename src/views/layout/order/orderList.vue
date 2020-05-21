<template>
    <div class="whAll">
        <template v-if="!lookBool" >
            <el-row class="search_head" :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple">            
                    <el-input v-model="orderNumber" placeholder="请输入订单编号">
                        <template  slot="prepend">订单编号</template>
                    </el-input>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">            
                    <el-input v-model="user" placeholder="请输入UID或用户昵称">
                        <template  slot="prepend">用户</template>
                    </el-input>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <span class="cTxt1">状态：</span> 
                    <el-select v-model="value"  placeholder="请选择" >                            
                        <el-option
                            v-for="item in orderStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        > 
                        </el-option>
                    </el-select>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">            
                    
                    <el-date-picker
                        v-model="time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </div></el-col>
            </el-row>
            <el-tabs class="mT10 bgWhite" v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="待发货订单" name="2"><ol2 @lookB2="lookB" @orderId2="orderId" :status="activeName" :value2="value" v-if="activeName == 2"></ol2></el-tab-pane>
                <el-tab-pane label="待收货订单" name="3"><ol2 @lookB2="lookB" @orderId2="orderId" :status="activeName" :value2="value" v-if="activeName == 3"></ol2></el-tab-pane>
                <el-tab-pane label="已确认订单" name="4"><ol2 @lookB2="lookB" @orderId2="orderId" :status="activeName" :value2="value" v-if="activeName == 4"></ol2></el-tab-pane>
                <el-tab-pane label="未支付订单" name="1"><ol2 @lookB2="lookB" @orderId2="orderId" :status="activeName" :value2="value" v-if="activeName == 1"></ol2></el-tab-pane>
                <!-- <el-tab-pane label="全部订单" name="5"><ol2 v-if="activeName == 5"></ol2></el-tab-pane>
                <el-tab-pane label="退货处理" name="6"><ol2 v-if="activeName == 6"></ol2></el-tab-pane> -->
            </el-tabs>
        </template>
        
        <template v-if="lookBool">
            <ol3 :orderGuid2="orderGuid" @lookB2="lookB" ></ol3>
        </template>
     
     </div>
</template> 
<script>
    import $ from 'jquery'
    import ol2 from './orderList/orderList2.vue'
    import ol3 from './orderList/orderList3.vue'

    export default {
        data () {
            return {  
                orderGuid: null,
                orderNumber: null,
                user: null,
                activeName: '2',
                lookBool: false,
                
                // 待发货订单状态选择 
                orderStatus: [{
                    value: -1,
                    label: '全部'
                }, {
                    value: 0,
                    label: '未处理'
                }, {
                    value: 1,
                    label: '已推送'
                }],
                value: -1,
                isOption: false,  //是否使用 未处理/已推送的接口
                // 日期 
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                time: null,
            };
            
        }, 
        computed: {},
        components:{
            ol2:ol2,
            ol3:ol3
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            lookB(val){
                this.lookBool = val;
            },
            orderId(val){
                this.orderGuid = val;
            },
            
        },
        mounted: function(){
            var that = this;  
            
        }
    }
</script>  
<style scoped>
    
</style>