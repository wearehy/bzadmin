<template>
  <div class='whAll'>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="1" label="微信支付">
        <el-form style="width:1000px;" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="item.name+'：'" label-width="150px" :prop="item.code" v-for="(item,num) in list" :key="num">
            <el-input v-model="ruleForm[item.code]" :placeholder="'请输入'+item.name"></el-input>
          </el-form-item>
          <!-- <el-form-item style="margin-left:50px;">
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item> -->
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="2" label="支付宝支付">
        <el-form style="width:1000px;" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="item.name+'：'" label-width="150px" :prop="item.code" v-for="(item,num) in list" :key="num">
            <el-input v-if="num == 0"  v-model="ruleForm[item.code]" :placeholder="'请输入'+item.name"></el-input>
            <el-input v-if="num !== 0" type="textarea" :rows="8"  v-model="ruleForm[item.code]" :placeholder="'请输入'+item.name"></el-input>
          </el-form-item>
          <!-- <el-form-item style="margin-left:50px;">
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item> -->
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
      activeName: '1',
    };
  },
  computed: {},
  watch: {},
  methods: {
    load(){
        if(this.activeName == '1'){
          this.$myAjax.get('/admin/system/wechat/info').then( res => {
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
        }else if(this.activeName == '2'){
          this.$myAjax.get('/admin/system/ali/info').then( res => {
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
        }
       
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$myAjax.put('/admin/system/update').then( res => {

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
      this.load();
      console.log(this.activeName)
      console.log(tab, event);
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