<template>
  <div>
    <WaiterHeader></WaiterHeader>
    <img class="img-waiter"
         src="https://pic34.photophoto.cn/20150110/0010023268300231_b.jpg" alt="">
    <el-form class="el-form-1" label-width="200px" :model="waiterData">
      <el-form-item class="el-form-item1" label="编号">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{waiterData.staffId}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item class="el-form-item1" label="员工账号">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{waiterData.account}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisibleAccout = true" >修改</el-button>
      </el-form-item>
      <el-form-item class="el-form-item1" label="员工姓名">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{waiterData.name}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item class="el-form-item1" label="员工电话">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{waiterData.phone}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePhone = true" >修改</el-button>
      </el-form-item>
      <el-form-item class="el-form-item1" label="职位">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{waiterData.staffType}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item class="el-form-item1" size="large" label="密码">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ******
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
          <el-input type="text" v-model="waiterData.account"></el-input>
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
          <el-input type="text" v-model="waiterData.phone"></el-input>
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

<script>
import WaiterHeader from "../../components/WaiterHeader";
import api from "../../util/api";
import qs from "qs";

export default {
  components: {WaiterHeader},

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
      waiterData: {
        account: '',
        password: '',
        staffId: '',
        phone: '',
        name: '',
        staffType: ''
      }
    }
  },
  mounted() {
    let path = api.path + "/user/staff/showStaffInfo"
    this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId")})).then((response) => {
      this.waiterData = response.data.data
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
          "oldPassword": this.ruleForm2.oldPass, "newPassword": this.ruleForm2.checkPass})).then((response) => {
          console.log(response)
          if(response.data.status==="200"){
            this.waiterData.password = response.data.password
          }
        });

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.waiterData.password=this.ruleForm2.checkPass;
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
        "account":this.waiterData.account,})).then((response) => {
        console.log(response)
      });
      this.dialogVisibleAccount = false;
    },
    twoSubmit() {
      let path = api.path + "/user/staff/changePhone"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),
        "phone":this.waiterData.phone,})).then((response) => {
        console.log(response)
      });
      this.dialogVisiblePhone = false;
    }
  }
}
</script>

<style scoped>
.el-form-1{
  margin: 0 auto;
  width: 640px;
  color: #556B2F;
  background-color: aliceblue;
}

.img-waiter{
  width: 150px;
  height: 150px;
}

.el-form-item1{
  width: 710px;
  text-align: justify;
}

.el-button-1{
  width: 100px;
}

</style>