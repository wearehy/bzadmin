<template>
    <div class="whAll" v-if='list'>
        <div class="back">
            <el-button class="bInfo" icon="el-icon-arrow-left" @click="closeFun()">返回</el-button>
        </div>
        <div class="top">  
            <div class="lft">
                <div style="color:#409EFF;" class="floatL mR15 logo fs26 icon iconfont icon-quxiao"></div>
                <div class="floatL fs22">&nbsp;&nbsp;订单-订单信息</div>
            </div>
            
        </div>
        <div class="nav mT15">
            <el-steps :active="step"  align-center>
                <el-step  title="提交订单" :description="$timer.time1(list.inputtime)"></el-step>
                <el-step  title="支付订单" :description="$timer.time1(list.paytime)"></el-step>
                <el-step  title="商家接单" :description="$timer.time1(list.pushTime)"></el-step>
                <el-step  title="商家发货" :description="$timer.time1(list.delivertime)"></el-step>
                <el-step  title="确认收货" :description="$timer.time1(list.confirmtime)"></el-step>
            </el-steps>
        </div>

        <!-- 基本信息 -->
        <div class="ul_list ul_list1 mT20" >
            <span class="title">基本信息</span>
            <el-row :gutter="10">
                <el-col :span="4">订单号：</el-col>
                <el-col :span="4">购货人：</el-col>
                <el-col :span="4">支付方式：</el-col>
                <el-col :span="4">下单时间：</el-col>
                <el-col :span="4">发货时间</el-col>
                <el-col :span="4">商家接单：</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">{{list.ordersn}}</el-col>
                <el-col :span="4">{{list.nickname}}</el-col>

                <el-col v-if="list.payType == 1" :span="4">支付宝</el-col>
                <el-col v-if="list.payType == 2" :span="4">微信</el-col>

                <el-col :span="4">{{$timer.time1(list.inputtime)}}</el-col>
                <el-col :span="4">{{$timer.time1(list.delivertime)}}</el-col>
                <el-col :span="4">{{$timer.time1(list.pushTime)}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">订单状态：</el-col>
                <el-col :span="4">配送方式：</el-col>
                <el-col :span="4">付款时间</el-col>
                
            </el-row>
            <el-row :gutter="10">         
                <el-col v-if="list.status == 1" :span="4">提交订单</el-col>
                <el-col v-if="list.status == 2" :span="4">支付订单</el-col>
                <el-col v-if="list.status == 3" :span="4">商家接单</el-col>
                <el-col v-if="list.status == 4" :span="4">商家发货</el-col>
                <el-col v-if="list.status == 5" :span="4">确认收货</el-col>
            
                <el-col :span="4">{{list.expressType}}</el-col>
                <el-col :span="4">{{$timer.time1(list.paytime)}}</el-col>
                
            </el-row>
        </div>
        <!-- 收货人信息 -->
        <div class="ul_list ul_list2" >
            <span class="title">收货人信息</span>
            <el-row :gutter="10">
                <el-col :span="4">收货人：</el-col>
                <el-col :span="4">手机号码：</el-col>
                
                <el-col :span="4">收货地址：</el-col>   
                
            </el-row>
            <el-row :gutter="10">
                <el-col :span="4">{{list.name}}</el-col>
                <el-col :span="4">{{list.tel}}</el-col>
                
                <el-col :span="4">{{list.detail}}</el-col>   
                  
            </el-row>
        </div>
        
        <!-- 商品信息 -->
        <div class="ul_list ul_list3" v-if="list.product">
            <span class="title">商品信息</span>
            <!-- 衣服 -->
            <template v-if="list.product[0].clothImage">
                <el-row :gutter="10">
                    <el-col :span="2">种类：</el-col>
                    <el-col :span="2">尺寸大小：</el-col>
                    <el-col :span="2">颜色：</el-col>
                    <el-col :span="2">面料：</el-col>
                    <el-col :span="3">商品图片：</el-col>
                    <el-col :span="2">价格：</el-col>
                    <el-col :span="2">数量：</el-col>
                    <el-col :span="5">委托人：</el-col>
                    <el-col :span="2">小计：</el-col>
                    <el-col :span="2">操作：</el-col>
                </el-row>
                <div v-for="(item,num) in list.product" :key="num">
                    <el-row :gutter="10">
                        
                        <el-col :span="2">{{item.style}}</el-col>
                        <el-col :span="2">{{item.size}}</el-col>
                        <el-col :span="2">{{item.color}}</el-col>
                        <el-col :span="2">{{item.material}}</el-col>
                        <el-col :span="3">
                            <el-button  class="bInfo" size="mini" @click="pic=true;picLook=item;">查看衣服</el-button>
                        </el-col>
                        <el-col :span="2">￥{{(item.price/100).toFixed(2)}}</el-col>
                        <el-col :span="2">{{item.number}}</el-col>
                        <el-col :span="5">{{list.title?list.title:'N/A'}}</el-col>
                        <el-col :span="2">￥{{((item.price*item.number)/100).toFixed(2)}}</el-col>
                        

                        <el-col v-if="list.status == 1" :span="2">提交订单</el-col>
                        <el-col v-if="list.status == 2" :span="2">支付订单</el-col>
                        <el-col v-if="list.status == 3" :span="2">商家接单</el-col>
                        <el-col v-if="list.status == 4" :span="2">商家发货</el-col>
                        <el-col v-if="list.status == 5" :span="2">确认收货</el-col>
                    </el-row>
                </div>
            </template>
            <!-- 鞋子 -->
            <template v-if="list.product[0].shoesImage">
                <el-row :gutter="10">
                    <el-col :span="2">种类：</el-col>
                    <el-col :span="2">分类：</el-col>
                    <el-col :span="2">尺寸：</el-col>
                    <el-col :span="2">性别：</el-col>
                    
                    <el-col :span="3">商品图片：</el-col>
                    <el-col :span="2">价格：</el-col>
                    <el-col :span="2">数量：</el-col>
                    <el-col :span="5">委托人：</el-col>
                    <el-col :span="2">小计：</el-col>
                    <el-col :span="2">操作：</el-col>
                </el-row>
                <div v-for="(item,num) in list.product" :key="num">
                    <el-row :gutter="10">
                        <el-col :span="2">鞋子</el-col>
                        <el-col :span="2">帆布鞋</el-col>
                        <el-col :span="2">{{item.size}}</el-col>
                        <el-col :span="2">{{item.sex}}</el-col>
                        <el-col :span="3">
                            <el-button  class="bInfo" size="mini" @click="pic=true;picLook=item;">查看鞋子</el-button>
                        </el-col>
                        <el-col :span="2">￥{{(item.price/100).toFixed(2)}}</el-col>
                        <el-col :span="2">{{item.number}}</el-col>
                        <el-col :span="5">{{list.title?list.title:'N/A'}}</el-col>
                        <el-col :span="2">￥{{((item.price*item.number)/100).toFixed(2)}}</el-col>
                        

                        <el-col v-if="list.status == 1" :span="2">提交订单</el-col>
                        <el-col v-if="list.status == 2" :span="2">支付订单</el-col>
                        <el-col v-if="list.status == 3" :span="2">商家接单</el-col>
                        <el-col v-if="list.status == 4" :span="2">商家发货</el-col>
                        <el-col v-if="list.status == 5" :span="2">确认收货</el-col>
                    </el-row> 
                </div>
            </template>
                
                
            <el-row class="totalc" :gutter="10">
                <el-col :span="4" :offset="20"> <b>合计：<span class="cRed">￥{{totalPrice}}</span></b> </el-col>
            </el-row>
        </div>
        <el-dialog  class="dialog_bottom  dInput"  
            width="1000px"
            title="查看图片"
            :visible.sync="pic"
            append-to-body
        >
            
            <!-- 衣服  -->
            <div class="overflowHidden" v-if="picLook&&picLook.clothImage">
                <div   class="img_cloth relative overflowHidden" >
                    <img class="pimg"   v-if="picLook.clothImage.fThumbGc"        :src="$img+picLook.clothImage.fThumbGc ">
                    <img class="pimg2"  v-if="picLook.clothImage.frontThumb"      :src="$img+picLook.clothImage.frontThumb">
                </div> 
                <div   class="img_cloth relative overflowHidden" >
                    <img class="pimg"   v-if="picLook.clothImage.bThumbGc"       :src="$img+picLook.clothImage.bThumbGc">
                    <img class="pimg2"  v-if="picLook.clothImage.backThumb"      :src="$img+picLook.clothImage.backThumb">
                </div> 
            </div>
            <!-- 鞋子 -->
            <div class="overflowHidden" v-if="picLook&&picLook.shoesImage">
                <ul class="xie">
                    <li> <img :src="$img+picLook.shoesImage.screenin" alt=""> </li>
                    <li> <img :src="$img+picLook.shoesImage.screenout" alt=""> </li>
                    <li> <img :src="$img+picLook.shoesImage.screenfront" alt=""> </li>
                    <li> <img :src="$img+picLook.shoesImage.screenback" alt=""> </li>
                </ul>
            </div>
            <!-- 底部按钮 -->
            <div  slot="footer" class="borderT border1 padT20 dialog-footer">
                <el-button class="bInfo" @click="pic = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>  
</template> 
<script>
    export default {
        data () {
            return {  
                orderId: null,
                step: 1,
                list: [],  
                totalPrice: 0,
                pic: false,
                picLook: null,
            }   
        }, 
        computed: {
        
        },
        props:['orderGuid2'],
        methods: {
            load(){
                this.$myAjax.get('/admin/order/info/get?orderId='+this.orderGuid2).then(res => {
                   let ajax = [];
                   ajax.push(res.data.data);
                   
                   let ajax2 = this.$data_null(ajax)[0];
                   console.log(ajax2)
                   if(ajax2.status < 3){
                        this.step = ajax2.status; 
                   }else{
                        this.step = ajax2.status+1; 
                   } 
                   this.list = ajax2;
                   
                   let totalPrice = 0;
                   let product = this.list.product;
                   let len = product.length;
                   for(let i=0;i<len;i++){
                       totalPrice += product[i].price*product[i].number;
                   }
                   this.totalPrice = (totalPrice/100).toFixed(2);

                })
            },
            closeFun(){
                this.$emit('lookB2',false)
            } 
        },
        mounted: function(){
            this.orderId = this.orderGuid2;
            if(this.orderId){
                this.load(); 
            }
              
        }
    }
</script>  
<style lang="scss" scoped>
    
    .top{
        height: 60px;
        line-height: 60px;
    }
    
    .totalc{
        height: 60px;
        line-height: 41px;
        font-size: 18px;
    }
    .totalc span{
        font-size: 20px;
    }
    // 详情页图片查看
    .img_cloth{
        float: left;
        width: 50%;
    }
    .pimg{
        width: 100%;
    }
    .pimg2{              /**衣服上图片**/
        position: absolute;
        left: 27.8%;top: 20%;
        width: 44.3%;  
    }
    .xie{
        width: 100%;
       
        height: auto;
        overflow: hidden;
    }
    .xie li{
        float: left;
        width: 50%;
        padding: 0 80px;
    }
    .xie li img{
        width: 100%;
    }
</style>