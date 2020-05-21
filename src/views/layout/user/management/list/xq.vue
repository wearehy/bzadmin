<template>
     <div class="whAll " v-if="rows1">
        <div v-if="rows1.userInfo">
            <h1 class="fs14 mB10">用户信息</h1>
            <el-row :gutter="20">
                <el-col :span="8"><div class="widthAll grid-content bg-purple">用户姓名：{{rows1.userInfo.nickname}} </div></el-col>
                <el-col :span="8"><div class="widthAll grid-content bg-purple">身份证照：<span class="mR5 cInfo btn cInfo cursor" @click="title='正面';picFun(11)">正面</span><span class="mR5 cInfo btn cInfo cursor" @click="title='反面';picFun(12)">反面</span><span class="mR5 cInfo btn cInfo cursor" @click="title='手持';picFun(13)">手持</span> </div></el-col>
                <el-col :span="8"><div class="widthAll grid-content bg-purple">营业执照：<span class="mR5 cInfo btn cInfo cursor" @click="title='商标';picFun(21)">商标</span><span class="mR5 cInfo btn cInfo cursor" @click="title='工商营业执照';picFun(22)">工商营业执照</span></div></el-col> 
            </el-row> 
            <el-row :gutter="20"> 
                <el-col :span="8"><div class="widthAll grid-content bg-purple">身份证号：{{rows1.userInfo.idCard}} </div></el-col>    
            </el-row> 

            <h1 class="fs14 mB10 mT15">商品组</h1>
            <el-row :gutter="20">
                <el-col :span="8"><div class="widthAll grid-content bg-purple">作品数：{{rows1.userInfo.works}} </div></el-col>
                <el-col :span="8"><div class="widthAll grid-content bg-purple">粉丝数：{{rows1.userInfo.fans}} </div></el-col>
                <el-col :span="8"><div class="widthAll grid-content bg-purple">累计下单：{{rows1.userInfo.order}}</div></el-col> 
            </el-row> 
                <el-row :gutter="20">
                <el-col :span="8"><div class="widthAll grid-content bg-purple">收藏作品：{{rows1.userInfo.collectionWorks}} </div></el-col>
                <el-col :span="8"><div class="widthAll grid-content bg-purple">关注量：{{rows1.userInfo.follow}} </div></el-col>
            </el-row>
        </div>

        <div v-if="rows1.address">
            <h1 class="fs14 mB10 mT15">信息组</h1>
            <div class="address_top fw900">收货地址</div>
            <div class="address_middle xqh">
                <ul>
                    <li  v-for="item in rows1.address" :key="item.id">
                        <h1 class="fs14 mB10 "> <span v-if="item.isdefault==0"> 非默认</span><span v-if="item.isdefault==1"> 默认收货</span></h1>
                        <el-row :gutter="20">
                            <el-col :span="8"><div class="widthAll grid-content bg-purple">收货人：{{item.name}} </div></el-col>
                            <el-col :span="8"><div class="widthAll grid-content bg-purple">手机号：{{item.tel}} </div></el-col>
                            <el-col :span="8"><div class="widthAll grid-content bg-purple">编辑时间：{{$timer.time2(item.inputtime)}} </div></el-col> 
                        </el-row> 
                        <el-row :gutter="20">  
                            <el-col :span="16"><div class="widthAll grid-content bg-purple">收货地址：{{item.detail}} </div></el-col>   
                        </el-row> 
                        <!-- <el-divider></el-divider> -->
                    </li>
                </ul>
            </div>
        </div>
        
        <el-dialog  class="dialog_bottom "  
            width="500px"
            :title="title"
            :visible.sync="pic"
            append-to-body
        >
           <img class="tanImg"  :src="img" alt="">
        </el-dialog>
     </div>   
</template> 
<script>
    export default {
        data () {
            return { 
                title: null,
                htp:'http://apipic.boomake.com/',
                pic:false,   //开启图片
                img: null,
            }
        }, 
        components: {
          
        },
        computed: {
        
        },
        props:['rows1'],
        methods: {
            picFun(num){
                this.pic = true;
                switch(num){
                    case 11:
                        this.img = this.$img + this.rows1.userInfo.idFontImage;
                        break;
                    case 12:
                        this.img = this.$img + this.rows1.userInfo.idBackImage;
                        break;
                    case 13:
                        this.img = this.$img + this.rows1.userInfo.idHandImage;
                        break;
                    case 21:
                        this.img = this.htp + this.rows1.userInfo.brandFile;
                        break;
                    case 22:
                        this.img = this.htp + this.rows1.userInfo.licenseFile;
                        break;
                    
                }
            }
        },
        mounted: function(){
            var that = this;
        
        }
    }
</script>  
<style scoped>
    .xqh{
        height: 300px;
        overflow-y: auto;
    }
   .el-row{
       margin-bottom: 5px;
   }
   .address_top,.address_middle{
       padding: 0 15px;
   }
   .address_top{
       box-sizing: border-box;
       width: 100%;
       height: 30px;
       line-height: 30px;
       background-color:#fafafa;
       border: 1px solid #f1f1f1;
   }
   .address_middle{
       border: 1px solid #f1f1f1;
       border-top: none;
   }
   .address_middle ul{
       padding: 0;
   }
   .address_middle ul>li{
       border-bottom:1px solid #f1f1f1
   }
   .tanImg{
       width: 100%;
   }
</style>