<template>
    <div class="whAll">
        <!-- 提醒 -->
        <!-- <el-alert :title="'今日新增订单 '+warn+' 项请及时处理'" type="warning" :closable="false" show-icon></el-alert> -->
        <!-- click="orderId2=item.id"dy -->
        <div class="content mT15">
            <div class="title border1 borderT">
                <div class="list1 flex">
                    <div class="list_lft flex">
                        <span class="row1 txtL">商品</span>
                        <span class="row2">数量</span>
                    </div>   
                    <div class="list_rgt flex">
                        <span class="row3">金额标签</span>
                        <span class="row4">物流</span>
                        <span class="row5">状态</span>
                        <span class="row6 txtL">收货人</span>
                        <span class="row7">操作</span>
                    </div>       
                </div>
            </div>
            <div class="container">
                <ul class="list2">
                    <li v-for="(item,num) in list" :key="num" v-loading="loading">
                        <div class="list_top border1 borderT borderB"> 
                            <span class="">订单号：{{item.ordersn}}</span> 
                            <span class="mL15">下单时间：{{$timer.time1(item.inputtime)}}</span> 
                            <span class="mL15">UID：{{item.idnumber}}</span> 
                        </div>
                        <div v-for="(item1,num1) in item.product" :key="num1" class="list_middle border1 overflowHidden flex">
                            <div  class="list_lft flex">
                                <div class="row1 mimg overflowHidden relative borderR border2 flex flexD" >
                                    <div class="relative"   >
                                        <div v-if="item1.clothImage " class="overflowHidden">
                                            <!-- 正面  -->
                                            <div class="imgC img_lft floatL relative" >
                                                <p class="txtC fw900 ">正面缩略图</p>
                                                <template v-if="item1.clothImage.fThumbGc">
                                                    <div :ref="'cf'+num+'w'+num1" @mousemove="mousemove(item1.clothImage,0,$event)" @mouseout="mouseout()"  class="img_cloth relative overflowHidden btn" >
                                                        <img  crossOrigin="anonymous" class="pimg"   v-if="item1.clothImage.fThumbGc"   :src="$img+item1.clothImage.fThumbGc "  >
                                                        <img  crossOrigin="anonymous" class="pimg2"  v-if="item1.clothImage.frontThumb" :src="$img+item1.clothImage.frontThumb"  >
                                                        <!-- 等图片转到佳豪服务器后添加 crossOrigin="anonymous" 实现下载功能 -->
                                                        <!-- <img   crossOrigin="anonymous" class="pimg"  v-if="item1.clothImage.fThumbGc"        :src="'https://file.jiapuji.vip/gateway/file/files/0/b4f53ae5d7d34413bf77c735997cb851.png'  "  >
                                                        <img   crossOrigin="anonymous" class="pimg2" v-if="item1.clothImage.frontThumb"      :src="'https://file.jiapuji.vip/gateway/file/files/0/b4f53ae5d7d34413bf77c735997cb851.png'  "  > -->
                                                    </div> 
                                                    <div class="btns">
                                                        <div class="btn pbtn mT5 mB10 bInfo border4" @click="cloth_load('cf'+num+'w'+num1)">下载</div>
                                                    </div>   
                                                </template>
                                                <p class="txtC" v-if="!item1.clothImage.fThumbGc">无</p>
                                            </div>
                                            <!-- 反面 -->
                                            <div class="imgC img_rgt floatL relative" >
                                                <p class="txtC fw900 ">背面缩略图</p>
                                                <template v-if="item1.clothImage.bThumbGc">
                                                    <div :ref="'cb'+num+'w'+num1" @mousemove="mousemove(item1.clothImage,1,$event)" @mouseout="mouseout()" class="img_cloth relative overflowHidden btn" >
                                                        <img  crossOrigin="anonymous"  class="pimg"  v-if="item1.clothImage.bThumbGc"    :src="$img+item1.clothImage.bThumbGc" alt="">
                                                        <img  crossOrigin="anonymous"  class="pimg2" v-if="item1.clothImage.backThumb"   :src="$img+item1.clothImage.backThumb" >
                                                    </div>
                                                    <div class="btns">
                                                        <div class="btn pbtn mB10 bInfo border4"  @click="cloth_load('cb'+num+'w'+num1)">下载</div>
                                                    </div> 
                                                </template>
                                                <p class="txtC" v-if="!item1.clothImage.bThumbGc">无</p>
                                            </div>
                                            <div class="imgRC absolute" >
                                                <span class="bPurple">x{{item1.number}}</span>
                                                <span class="bRed">{{item1.style}}</span>  
                                                <span class="bYellow">{{item1.material}}</span>
                                                <span class="bGreen">{{item1.sex}}</span>
                                                <span class="bBlue">{{item1.color}}</span>
                                                <span class="bBlack">{{item1.size}}</span>
                                            </div>
                                        </div>
                                        <div v-if="item1.shoesImage" class="myShow overflowHidden">
                                            <div class="top">
                                                <div class="imgS img_lft floatL" >
                                                    <p class="txtC fw900 ">内侧缩略图</p>
                                                </div>
                                                <div class="imgS img_rgt floatL"   >
                                                    <p  class="txtC fw900 ">外侧缩略图</p>
                                                </div>
                                                <div class="imgS img_rgt floatL"   >
                                                    <p class="txtC fw900 ">鞋面缩略图</p>
                                                </div>
                                                <div class="imgS img_rgt floatL">
                                                    <p class="txtC fw900 ">后跟缩略图</p>
                                                </div>
                                            </div>
                                            <div class="middle">
                                                <div class="imgS img_lft floatL" >
                                                    <img  crossOrigin="anonymous" @mousemove="mousemove(item1.shoesImage.screenin,2,$event)" @mouseout="mouseout()" class="pimg"   :src="$img+item1.shoesImage.screenin" alt="">
                                                </div>
                                                <div class="imgS img_rgt floatL"   >
                                                    <img  crossOrigin="anonymous" @mousemove="mousemove(item1.shoesImage.screenout,2,$event)" @mouseout="mouseout()" class="pimg" :src="$img+item1.shoesImage.screenout" alt="">
                                                </div>
                                                <div class="imgS img_rgt floatL"   >
                                                    <img  crossOrigin="anonymous" @mousemove="mousemove(item1.shoesImage.screenfront,2,$event)" @mouseout="mouseout()" class="pimg" :src="$img+item1.shoesImage.screenfront" alt="">
                                                </div>
                                                <div class="imgS img_rgt floatL">
                                                    <img  crossOrigin="anonymous" @mousemove="mousemove(item1.shoesImage.screenback,2,$event)" @mouseout="mouseout()"  class="pimg" :src="$img+item1.shoesImage.screenback" alt="">
                                                </div>
                                            </div>
                                            <div class="bottom">
                                                <div class="imgS2 img_rgt floatL">                  <!--type: type,index: index,item: item -->
                                                    <div class="btns2">
                                                        <createImgChild class="shoesImg" :ref="'left'+num+'w'+num1" :createimg="{type: 'left',index: num1,item: item}" @loading2="loading"></createImgChild>
                                                        <el-button size="mini" type="primary" class="mT5" @click="shoesFun('left'+num+'w'+num1)">下载左脚图片</el-button>
                                                        <!-- <el-row>
                                                            <el-button size="mini" type="primary" class="mT5" @click="createImg('left', num1, item)">生成左脚图片</el-button>
                                                            <el-button size="mini" type="primary" class="mT5" @click="shoes_load">下载</el-button>
                                                        </el-row> -->
                                                    </div> 
                                                </div>
                                                <div class="imgS2 img_rgt floatL">
                                                    <div class="btns2">
                                                        <createImgChild class="shoesImg" :ref="'right'+num+'w'+num1" :createimg="{type: 'right',index: num1,item: item}" @loading2="loading"></createImgChild>
                                                        <el-button size="mini" type="primary" class="mT5" @click="shoesFun('right'+num+'w'+num1)">下载右脚图片</el-button>
                                                        <!-- <el-row>
                                                            <el-button size="mini" type="primary" class="mT5" @click="createImg('right', num1, item)">生成右脚图片</el-button>
                                                            <el-button size="mini" type="primary" class="mT5">下载</el-button>
                                                        </el-row> -->
                                                        
                                                    </div> 
                                                </div>
                                                <div style="width:33%;"  class="imgS2 img_rgt floatL">
                                                    <div class="btns2">
                                                        <createImgChild class="shoesImg" :ref="'all'+num+'w'+num1" :createimg="{type: 'all',index: num1,item: item}" @loading2="loading"></createImgChild>
                                                        <el-button size="mini" type="primary" class="mT5" @click="shoesFun('all'+num+'w'+num1)">下载左脚与右脚图片</el-button>
                                                        <!-- <el-row>
                                                            <el-button size="mini" type="primary" class="mT5" @click="createImg('all', num1, item)">生成左脚与右脚图片</el-button>
                                                            <el-button size="mini" type="primary" class="mT5">下载</el-button>
                                                        </el-row> -->
                                                        
                                                    </div> 
                                                </div>
                                                
                                            </div>
                                          
                                            <div class="imgRS absolute" >
                                                <span class="bPurple" v-if="item1.number">x{{item1.number}}</span>
                                                <span class="bRed" v-if="item1.style">{{item1.style}}</span> 
                                                <span class="bYellow" v-if="item1.material">{{item1.material}}</span> 
                                                <span class="bGreen" v-if="item1.sex">{{item1.sex}}</span>
                                                <span class="bBlue" v-if="item1.color">{{item1.color}}</span>
                                                <span class="bBlack" v-if="item1.size">{{item1.size}}</span>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                                <div class="row2 borderR border2 flex txtC">
                                    <p class="txtC fw900" >
                                        {{item1.number}}
                                    </p>
                                </div> 
                            </div>
                            <div v-if="num1 == 0" class="list_rgt flex" >
                                <div class="row3 borderR border2">
                                    <p class="txtC fw900">￥{{(item.productmoney/100).toFixed(2)}}</p>
                                    <!-- 1支付宝/2微信 -->
                                    <p v-if="item.payType == 1" class="txtC">支付方式：支付宝</p>
                                    <p v-if="item.payType == 2" class="txtC">支付方式：微信</p>
                                </div>
                                <div class="row4 borderR border2">
                                    <p class="txtC fw900">{{item.expressType}}</p>
                                </div>
                                <div class="row5 borderR border2">
                                    <!-- 状态(1:待支付,2:待发货,3:待收货,4:已完成,5:取消) -->
                                    <p v-if="status == 1" class="txtC fw900">待支付</p>
                                    
                                    <div v-if="status == 2" class="txtC fw900"> 
                                        <p>待发货</p> 
                                        <p v-if='item.pushStatus == 0'>未推送</p>
                                        <p v-if='item.pushStatus == 1'>已推送</p>
                                    </div>
                                    


                                    <p v-if="status == 3" class="txtC fw900">待收货</p>
                                    <p v-if="status == 4" class="txtC fw900">已完成</p>
                                    <p v-if="status == 5" class="txtC fw900">取消</p>
                                    <!-- <p v-if="item.payType == 'N/A'" class="txtC fw900">N/A</p>
                                    <p v-if="!item.payType" class="txtC fw900">N/A</p> -->
                                </div>
                                <div class="row6 borderR border2">
                                    <p class="fw900 padL15 padR15 txtL">姓名：{{item.name}}</p>
                                    <p class="fw900 padL15 padR15 txtL">电话：{{item.tel}}</p>
                                    <p class="addressid fw900 padL15 padR15 txtL">地址：{{item.detail}}</p>
                                </div>
                                <div class="row7 borderR border2">
                                    <div @click="btnFun(item,0);lookFun()" class="orderBtn btn bBlue">查看订单</div>
                                    <div @click="btnFun(item,1)" v-if="status == 2" class="orderBtn btn bYellow">推送订单</div>
                                    <div @click="btnFun(item,2)" v-if="status == 3" class="orderBtn btn bYellow">确认订单</div>
                                    <div @click="btnFun(item,3)" v-if="status == 2" class="orderBtn btn bRed">取消订单</div>
                                </div>
                            </div>  
                        </div>
                        <div class="list_bottom border1 borderT borderB"></div>
                    </li>  
                </ul>
            </div>
        </div>
        <div class="block"> 
            
            <div class="mT15"></div>  <!-- 顶部15px -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10,20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                background
            >    
            </el-pagination>
            
        </div>

        
        <div ref="addImage"></div>
        <!-- 衣服放大 -->
        <div   class="cBig fixed" :style="{top:'calc(50% - 288px)',left:mLft+'px'}" v-if="cShow&&cloth_1">
            <img  crossOrigin="anonymous" v-if="cloth_1" class="pimg"  :src="$img+cloth_1" alt="">
            <img  crossOrigin="anonymous" v-if="cloth_2" class="pimg2" :src="$img+cloth_2" alt="">
            <img  crossOrigin="anonymous" class="pimg3" src="/images/xuxian.png" alt="">
        </div>
        <!-- 鞋放大 -->
        <div  class="sBig fixed " :style="{top:'calc(50% - 250px)',left:mLft+'px'}" v-if="sShow">
            <img  crossOrigin="anonymous" v-if="shoe" class="pimg"  :src="$img+shoe" alt="">
        </div>
       
        <!-- 生成鞋子图片  -->
        <!-- <createImgChild class="shoesImg" ref="shoes" :createimg="imgObj" @loading2="loading"></createImgChild> -->
        
        
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleSend" 
            :modal-append-to-body="false">
            <el-select v-model="fId" placeholder="请选择">
                <el-option
                v-for="item in factories"
                :key="item.id"
                :label="item.title"
                :value="item.id">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSend();dialogVisible = false;">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template> 
<script>
    import $ from 'jquery'
    import html2canvas from 'html2canvas';
    import createImgChild from '../../../child/createImg_child.vue'
    export default {
        data () {
            return {
                dialogVisible: false,
                orderId: null,
                fId: null,
                factories: [],
                loading: false,
                orderId2: null,  
                page: 1,
                size: 20,
                total: null,
                list: [],
                warn: 0, 
                
                cShow: false,
                sShow: false,
              
                mLft: 500,

                cloth_1: null,
                cloth_2: null,
                shoe: null,
                imgObj: null,

                xx: 0.2,
            }
        }, 
        watch:{
            status(val){
                this.page = 1;
            },
            value2(val){
                this.page = 1;
                this.load();
            }
        },
        components:{
            createImgChild:createImgChild
        },
        computed:{},
        props:['status','value2'],
        methods: {
           
            load(){
                if(this.status != 2 || (this.status==2 && this.value2 == -1)){
                    let data = {
                        status: this.status,
                        page: this.page,
                        size: this.size
                    }
                    this.$myAjax.get('/admin/order/get'+this.$ajaxNull.get(data)).then( res => {
                        let data = res.data.data;
                        
                        this.total = data.total;
                        this.list = data.list;
                        // this.list = this.$data_null(data.list);
                        // console.log(this.list)
                    })
                }else if(this.status == 2 && this.value2 != -1){
                    let data = {
                        status: this.value2,  // 0 未推送，1 已推送
                        page: this.page,
                        size: this.size
                    }
                    this.$myAjax.get('/admin/order/push/status/get'+this.$ajaxNull.get(data)).then(res => {
                        let data = res.data.data;
                        
                        this.total = data.total;
                        this.list = data.list;
                    })
                };
                
                this.$myAjax.get('/admin/factory/get').then(res => {
                    this.factories = res.data.data;
                    console.log(this.factories)                        
                });
                
            },
            handleSizeChange(val){
                this.size = val;
                this.load();
            },
            handleCurrentChange(val){
                this.page = val;
                this.load();
            },
            handleSend(){ // 推送订单
                var that = this;
               
                this.$confirm('确认推送？').then(_ => {
                    if(this.fId != null&&this.fId != ''){
                        this.$myAjax.post('/admin/order/push',{orderIds:this.orderId,factoryId:this.fId}).then(res => { this.load(); }); 
                         
                    }else{
                      this.$message({
                        showClose: true,
                        message: '工厂信息不为空'
                      });  
                    }
                    
                })
                .catch(_ => {});
            },
            btnFun(val,num){
                //0查看订单,1推送订单,2确认订单,3取消订单
                if(num == 0){
                    this.orderId2 = val.id;
                    this.$emit('orderId2',this.orderId2);
                }else if(num == 1){
                     // 推送订单
                    this.dialogVisible = true;
                    this.orderId = val.id;
                }else if(num == 2){
                   
                    
                }else if(num == 3){

                }
                
            },
            lookFun(){
                this.$emit('lookB2',true);
            },

            mousemove(val,num,e){
               
                // 移入 —— 0 衣正，1 衣反，2 鞋
                if(num == 0){
                    this.mLft =  e.clientX*2.5 - 150;
                    if(!val.fThumbGc) return false;
                    this.cShow = true;
                    this.cloth_1 = val.fThumbGc;
                    this.cloth_2 = val.frontThumb;  
                }else if(num == 1){
                    this.mLft =  e.clientX*2.5 - 150;
                    if(!val.bThumbGc) return false;
                    this.cShow = true;
                    this.cloth_1 = val.bThumbGc;
                    this.cloth_2 = val.backThumb;
                }else if(num == 2){
                    this.mLft =  e.clientX*1.5 + 150;
                    this.sShow = true;
                    this.shoe = val;
                    
                }
             
            },
            mouseout(){
                // 移出
                this.cShow = false;
                this.sShow = false;
            },
            // 下载衣服图片 
            cloth_load(val){
                // console.log(val,eval('this.$refs.'+val)[0])
                html2canvas(eval('this.$refs.'+val)[0],{
            　　　　 useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                    
                }).then( (canvas) => {
                    
                    //this.$refs.addImage.append(canvas);//在下面添加canvas节点
                    let a = document.createElement("a");
                    a.href = canvas.toDataURL();//下载链接
                    if(val.indexOf('cf') != -1){
                        a.setAttribute("download","衣服正面.png");
                    }else if(val.indexOf('cb') != -1){
                        a.setAttribute("download","衣服反面.png");
                    }
                    
                    a.style.display = "none";//a标签隐藏
                    document.body.appendChild(a);
                    a.click();
                });
            },

            // 生成鞋子图片 
            createImg(type,index,item){
                this.imgObj = {
                    type: type,
                    index: index,
                    item: item
                };
                // console.log(this.imgObj)
            },
            shoesFun(val){
             
                // console.log(222,this.$refs)
                html2canvas(eval('this.$refs.'+val)[0].$el,{
                    scale: 0.22,     //缩小图片，否则无法下载
            　　　　 useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                    
                }).then( (canvas) => {
                    
                    let a = document.createElement("a");
                    a.href = canvas.toDataURL();//下载链接
                    if(val.indexOf('left') != -1){
                        a.setAttribute("download","左脚图片.png");
                    }else if(val.indexOf('right') != -1){
                        a.setAttribute("download","右脚图片.png");
                    }else if(val.indexOf('all') != -1){
                        a.setAttribute("download","左脚与右脚图片.png");
                    }
                    
                    a.style.display = "none";//a标签隐藏
                    document.body.appendChild(a);
                    a.click();
                });
            },
            // 下载鞋子图片 
            shoes_load(){
            //    console.log(111,this.$refs.shoes.$el) 
                html2canvas(this.$refs.shoes.$el,{
            　　　　 useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                    
                }).then( (canvas) => {
                    
                    //this.$refs.addImage.append(canvas);//在下面添加canvas节点
                    let a = document.createElement("a");
                    a.href = canvas.toDataURL();//下载链接
                   
                     if(this.imgObj == 'left'){
                        a.setAttribute("download","左脚图片.png");
                    }else if(this.imgObj == 'right'){
                        a.setAttribute("download","右脚图片.png");
                    }else if(this.imgObj == 'all'){
                        a.setAttribute("download","左脚与右脚图片.png");
                    }
                    a.style.display = "none";//a标签隐藏
                    document.body.appendChild(a);
                    a.click();
                });
            },
            loading2(val){
                this.loading = val;
                // console.log(val)
            }
            
        },
        mounted: function(){
            var that = this;
            that.load();
        }
    }

    
</script>  
<style lang="scss" scoped>
    .shoesImg{
        position:fixed;
        /*transform:scale(0.1)*/;
        top:-10000px;  /** 隐藏图片 */
        left:0;
        overflow: hidden;
    }
    .list_lft{
        width: calc(40% + 80px);  
    }
    .list_rgt{
        width: calc(60% - 80px);   
    }
    // 左
    .row1{width: calc(100% - 80px);}
    .row2{width: 80px;}
    // 右
    .row3{width: 20%;}
    .row4{width: 10%;}
    .row5{width: 15%;}
    .row6{width: 35%;}
    .row7{width: 20%;}
    p{width: 100%;margin-bottom: 5px;}
    .list1 span{
        height: 52px;
        padding: 16px 15px;
        display: inline-block;
        font-size: 15px;
        font-weight: 900;
        text-align: center;
    }
    .addressid{
        word-break:break-all;
    }
    .orderBtn{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 110px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-radius: 4px;
        margin-bottom: 10px;
        font-weight: 16px;
    }
    .list2>li{
        text-align: center;
        .list_top,.list_bottom{
            height: 52px;
            padding: 16px 15px;
            background-color: #fafafa;
        }
        .list_bottom{
            margin-bottom: 10px;
        }
        .list_middle{
            padding: 12px 0;
        }
        .mimg{
            min-height: 100px;
        }
        .btns{
            position: relative;
            width: 100%;
            height: 25px;
            
        }
        .btns2{
            position: relative;
            width: 100%;
            height: auto;
            
        }
        .pbtn{   
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin: auto;
            display: inline;
            padding: 5px 10px;
            text-align: center;
            white-space: nowrap;
        }
        .pbtn2{           /**text-align: 鞋子按钮**/
            display: inline-block;
            padding: 5px 10px;
            text-align: center;
            white-space: nowrap;
            margin-right: 10px;
        }

        .imgC{
            width: 22%;
        }
        .imgS{
            width: 17%;
        }
        .imgS2{
            width: 28%;
        }
        
        
        .imgRC{
            width:50%;
            min-height:50px;
            top:33%;right:0;
        }
        .imgRS{
            width:30%;
            min-height:50px;
            top:33%;right:0;
        }
        .imgRC>span,.imgRS>span{
            display: inline-block;
            float: right;
            padding: 5px 10px;
            border-radius: 5px;
            margin-right: 5px;
            margin-bottom: 5px;
            font-weight: 900;
        }
    } 
    .myShow{
        .top,.middle,.bottom{
            width: auto;
            height: auto;
            overflow: hidden;
        }
    }
    
    .pimg{
        width: 100%;
    }
    .pimg2{              /**衣服上图片**/
        position: absolute;
        left: 27.8%;top: 20%;
        width: 44.3%;  
    }

    .cBig{
        width: 500px;
        height: auto;
        overflow: hidden;
        z-index: 9999;
    }
    .sBig{
        width: 500px;
        height: auto;
        background: white;
        overflow: hidden;
        z-index: 9999;
    }
    .pimg3{
        position:absolute;
        top: 0;left: 0;
        width: 100%;

    }
    
</style>