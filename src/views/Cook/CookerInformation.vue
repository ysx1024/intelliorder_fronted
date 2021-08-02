<template>
  <div class="CookerInformation">
    <CookerHeader></CookerHeader>
    <img class="img-cook"
        src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7" alt="">
    <el-form class="el-form-1" label-width="200px" :model="cookData">
      <el-form-item class="el-form-item1" label="编号">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{cookData.staffId}}
      </el-form-item>
      <el-form-item class="el-form-item2" label="员工账号">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{cookData.account}}

        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisibleAccout = true" >修改</el-button>
      </el-form-item>
      <el-form-item class="el-form-item3" label="员工姓名">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{cookData.name}}
      </el-form-item>
      <el-form-item class="el-form-item5" label="员工电话">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{cookData.phone}}

        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePhone = true" >修改</el-button>
      </el-form-item>
      <el-form-item class="el-form-item4" label="职位">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{cookData.staffType}}
      </el-form-item>
      <el-form-item class="el-form-item6" size="large" label="密码">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ******
<!--       {{cookData.password}}-->

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
          <el-button type="primary" @click="oneSubmit(); dialogVisibleAccout = false" >提交</el-button>
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
          <el-button type="primary" @click="twoSubmit();dialogVisiblePhone = false">提交</el-button>
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

<!--
cookData是结构体数据，而res.data.data是只包含一个元素的结构体数组，所以赋值的时候应该是cookData=res.data.data[0];
-->

<script>
import CookerHeader from "../../components/CookerHeader";
import api from "../../util/api";
import qs from "qs";

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
        account: "",
        password: "",
        staffId: "",
        phone: "",
        name: "",
        staffType: ""
      }
   }
},
   mounted() {
     let path = api.path + "/user/staff/showStaffInfo";
     this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId")})).then((response)=>{
       this.cookData=response.data.data
       console.log(response)
     })
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
      let  path = api.path + "/user/staff/changePassword"

      this.axios.post(path, qs.stringify({
        "staffId": localStorage.getItem("staffId"),
        "oldPassword": this.ruleForm2.oldPass, "newPassword": this.ruleForm2.checkPass
      })).then((response) => {
        console.log(response)
        if(response.data.status==="200"){
          this.cookData.password = response.data.password
        }
      });

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

  oneSubmit() {
    let path = api.path + "/user/staff/changeAccount"
    this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),
      "account":this.cookData.account,})).then((response) => {
      console.log(response)
    });
    this.dialogVisibleAccount = false;
  },
  twoSubmit() {
    let path = api.path + "/user/staff/changePhone"
    this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),
      "phone":this.cookData.phone,})).then((response) => {
      console.log(response)
    });
    this.dialogVisiblePhone = false;
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
  .el-form-item1{
    width: 580px;
    text-align: justify;
  }
  .el-form-item2{
    width: 638px;
    text-align: justify;
  }
  .el-form-item3{
    width: 650px;
    text-align: justify;
  }
  .el-form-item4{
    width: 610px;
    text-align: justify;
  }
  .el-form-item5{
    width: 745px;
    text-align: justify;
  }
  .el-form-item6{
    width: 710px;
    text-align: justify;
  }
  .el-form-1{
    margin: 0 auto;
    width: 640px;
    color: #556B2F;
    background-color: aliceblue;
    
  }


</style>