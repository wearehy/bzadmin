<template>
     <div  class="widthAll heightAll txtC " style="margin-top: 18vh;font-size: 5vh">
         <h1 style="font-size:10vh;color:red">登录信息被清除或文件未配置！</h1>
         <br><br>
         <div @click="back" class="btn" style="padding:60px">
            <i  class="el-icon-back" style="font-size:8vh;color:blue">返回</i>
         </div>
         
     </div>
     
</template> 
<script>
    export default {
        name:'notFound',
        data () {
            return {  
                 
            };
            
        }, 
        computed: {
        
        },
        methods: {
           back(){
               
               if( this.$router.options.routes[1].children.length == 0 ){
                   this.$router.push('/')
               }else{
                   this.$router.go(-1);
               }
               
           },
          
        },
        mounted: function(){
            var that = this;
            
        }
    }
</script>  
<style scoped>
    
</style>