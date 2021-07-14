<template xmlns:el-main="http://www.w3.org/1999/html">
  <div class="CookerInformation">
    <CookerHeader></CookerHeader>
    <img class="img-cook"
        src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7">
    <el-form class="el-form-1" label-width="180px" :model="cookData">
      <el-form-item label="编号">
        {{cookData.id}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item label="员工账号">
      {{cookData.account}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisibleAccout = true" >修改</el-button>
      </el-form-item>
      <el-form-item label="员工姓名">
        {{cookData.name}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item label="员工电话">
        {{cookData.phone}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePhone = true" >修改</el-button>
      </el-form-item>
      <el-form-item label="职位">
        {{cookData.staffType}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item size="large" label="密码">
       {{cookData.password}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePassward = true" >修改</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="修改账号"
        :visible.sync="dialogVisibleAccout"
        width="400px"
        :before-close="handleClose">
      <el-form  label-width="100px" >
        <el-form-item label="账号">
          <el-input type="text" v-model="cookData.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(); dialogVisibleAccout = false" >提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        title="修改电话"
        :visible.sync="dialogVisiblePhone"
        width="400px"
        :before-close="handleClose">
      <el-form  label-width="100px" >
        <el-form-item label="电话">
          <el-input type="text" v-model="cookData.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit();dialogVisiblePhone = false">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisiblePassward"
        width="400px"
        :before-close="handleClose">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

//cookData是结构体数据，而res.data.data是只包含一个元素的结构体数组，所以赋值的时候应该是cookData=res.data.data[0];

<script>
import CookerHeader from "../../components/CookerHeader";
import api from "../../util/api";

export default {
  components: {CookerHeader},
  comments:{CookerHeader},
   data() {
     var validatePass = (rule, value, callback) => {
       if (value === '') {
         callback(new Error('请输入密码'));
       } else {
         if (this.ruleForm2.checkPass !== '') {
           this.$refs.ruleForm2.validateField('checkPass');
         }
         callback();
       }
     };
     var validatePass2 = (rule, value, callback) => {
       if (value === '') {
         callback(new Error('请再次输入密码'));
       } else if (value !== this.ruleForm2.pass) {
         callback(new Error('两次输入密码不一致!'));
       } else {
         callback();
       }
     };
     return {
       //该数据结构保存修改密码的中间变量
      ruleForm2: {
        oldPass:'',
        pass: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
       dialogVisiblePassward: false,
       dialogVisiblePhone: false,
       dialogVisibleAccout: false,
       cookData: {
         account: "16893576837",
         password: "123456",
         id: "043",
         phone: "16893576837",
         name: "王虎",
         staffType: "厨师"
    }
    }
  },
   mounted() {
    console.log(api.path)
  },
   methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cookData.password=this.ruleForm2.checkPass;
          this.dialogVisiblePassward = false;
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     onSubmit() {
       console.log('submit!');
     }
  }
}
</script>

<style scoped>
  .CookerInformation{
    margin: 0 auto;
  }
  .img-cook{
    width: 150px;
    height: 150px;
  }

  .el-form-1{
    margin: 0 auto;
    width: 640px;
    color: #556B2F;
    background-color: azure;
    
  }


</style>