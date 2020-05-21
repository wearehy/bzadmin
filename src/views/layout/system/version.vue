<template>
  <div class='whAll'>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="1" label="Android">
        <el-form style="width:1000px;" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="安卓版本：" label-width="150px" :prop="ruleForm.versionName" >
            <el-input v-model="ruleForm.versionName" placeholder="请输入安卓版本"></el-input>
          </el-form-item>
          <el-form-item label="apk下载链接：" label-width="150px" :prop="ruleForm.url" >
            <el-input v-model="ruleForm.url" placeholder="请输入安卓版本"></el-input>
          </el-form-item>
          <el-form-item label="文件大小：" label-width="150px" :prop="ruleForm.size" >
            <el-input v-model="ruleForm.size" placeholder="请输入安卓版本"></el-input>
          </el-form-item>
          <el-form-item label="是否强制更新：" label-width="150px" :prop="ruleForm.platformStr" >
            <!-- update  -->
            <el-radio-group v-model="ruleForm.platformStr">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="版本号：" label-width="150px" :prop="ruleForm.versionCode" >
            <el-input v-model="ruleForm.versionCode" placeholder="请输入安卓版本"></el-input>
          </el-form-item>
          <el-form-item label="更新内容："  label-width="150px" :prop="ruleForm.content" >
            <el-input type="textarea" :rows="6" v-model="ruleForm.content" placeholder="请输入安卓版本"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:50px;">
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="2" label="IOS">
        <el-form style="width:1000px;" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="IOS版本：" label-width="150px" :prop="ruleForm.versionName" >
            <el-input v-model="ruleForm.versionName" placeholder="请输入IOS版本"></el-input>
          </el-form-item>
          <el-form-item label="文件大小：" label-width="150px" :prop="ruleForm.size" >
            <el-input v-model="ruleForm.size" placeholder="请输入IOS版本"></el-input>
          </el-form-item>
          <el-form-item label="更新内容："  label-width="150px" :prop="ruleForm.content" >
            <el-input type="textarea" :rows="6" v-model="ruleForm.content" placeholder="请输入IOS版本"></el-input>
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
      activeName: '1',
    };
  },
  computed: {},
  watch: {},
  methods: {
    load(){
      if(this.activeName == '1'){
        this.$myAjax.get('/admin/app/version?platform=0').then( res => {
          let list = res.data.data;
          // list.update = JSON.stringify(list.update);
          this.list = list;
        
          this.ruleForm = list;
          console.log(this.ruleForm)
        })  
      }else if(this.activeName == '2'){
        this.$myAjax.get('/admin/app/version?platform=1').then( res => {
          let list = res.data.data;
          this.list = list;
        
          this.ruleForm = list;
          console.log(this.ruleForm)
        })  
      }
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$myAjax.put('/admin/app/version',this.ruleForm).then( res => {

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