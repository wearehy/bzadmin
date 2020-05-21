<template>
     <div class="whAll">
        <div class="back">
            <el-button class="bInfo" icon="el-icon-arrow-left" @click="cancel">返回</el-button>
        </div>
        <el-tree
            ref="tree"
            :getCheckedNodes="true"
            
            :data="list"
            show-checkbox
            node-key="id"
            :default-expanded-keys="expand"
            :default-checked-keys="check"
            :props="defaultProps"
            @check-change="treeFun"
        >
        </el-tree>
        <el-button type='mini'   class="mT10"       @click="cancel" >取消</el-button>
        <el-button type='mini'   class="bInfo mT10" @click="ok" >确认</el-button>
     </div>
     
</template> 
<script>
    export default {  
        data () {
            return {  
                list: null,  
                defaultProps:{
                    label: 'menuname'
                },
                check: [],   //选中
                expand: [],  //展开
            };           
        }, 
        computed: {
        
        },
        props:['rows'],
        methods: {
            load(){
                let data = {
                    roleid: this.rows.id,
                    type:   0
                }
                this.$myAjax.get('/admin/user/menu'+this.$ajaxNull.get(data)).then(res=>{
                    let list = [
                        {id:-1,menuname:'全部',children:res.data.data.menu}
                    ];
                    this.list =  list;
                    
                    this.dg1(list);   //展开expand
                    this.dg2(list);       //选中check
                    
                })
            },
            ok(){
                let data = {
                    roleid: this.rows.id,
                    type: 0,
                    list: this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
                }
                console.log(99,data)
                this.$myAjax.post('/admin/user/menu/give',data).then( res => {
                    // 刷新 /layout 菜单
                    let menuNum = (new Date()).valueOf();
                    this.$store.commit('change_menuNum',menuNum);
                    
                    this.cancel();
                })  
            },
            cancel(){
                this.$emit('handBool',false);
            },
            treeFun(){
                
            },
            // 递归 
            dg1(res){               //展开
                let len_i = res.length;
               
                for(let i=0;i<len_i;i++){
                    if( res[i].children&&res[i].children.length>0 ){
                        let len_j = res[i].children.length;
                        for(let j=0;j<len_j;j++){
                            if(this.expand.indexOf(res[i].children[j].id) == -1){
                                this.expand.push(res[i].children[j].id)
                               
                            }
                            this.dg1(res[i].children);
                        }
                    }
                    
                }
            },
            dg2(res){             //选中
                let len_i = res.length;
               
                for(let i=0;i<len_i;i++){
                    if( res[i].children&&res[i].children.length>0 ){
                        let len_j = res[i].children.length;
                        for(let j=0;j<len_j;j++){
                            this.dg2(res[i].children);
                        }
                    }else{
                        if(this.check.indexOf(res[i].id) == -1&&res[i].checked){
                            this.check.push(res[i].id);
                            console.log(this.check)
                        }
                    }
                    
                }
            },
            
        },
        mounted: function(){
            var that = this; 
            that.load();
            // console.log('rows',this.rows)  
        }
    }
</script>  
<style scoped>
    
</style>