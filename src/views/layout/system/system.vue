<template>
  <div class='whAll'>
    <el-tabs type="border-card">
      <el-tab-pane label="基础设置">
        <el-form style="width:1000px;" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="item.name+'：'"  label-width="150px" :prop="item.code" v-for="(item,num) in list" :key="num">
            <el-input v-model="ruleForm[item.code]" :placeholder="'请输入'+item.name"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:50px;">
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      ruleForm: {},
      
    };
  },
  computed: {},
  watch: {},
  methods: {
    load(){
       this.$myAjax.get('/admin/system/info').then( res => {
        let list = res.data.data;
        this.list = list;
       
        let len = list.length;
        let ruleForm = {};
        for(let i=0;i<len;i++){
          ruleForm[list[i].code] = this.list[i].value;
        }
        this.ruleForm = ruleForm;
        console.log(ruleForm)
      })  
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let put_data = [];
          let len = this.list.length;
         
          put_data = this.list;
          
          for(let i=0;i<len;i++){
              put_data[i].value = this.ruleForm[put_data[i].code] 
          }
          console.log(111,put_data);
          
          this.$myAjax.put('/admin/system/update',put_data).then( res => {

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.load();
      // this.$refs[formName].resetFields();
    }
  },
  created() {

  },
  mounted() {
    this.load();
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
}
</script>

<style lang='scss' scoped>

</style>