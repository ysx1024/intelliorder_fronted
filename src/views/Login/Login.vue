<template>
<div class="login_context">
<div class="login">
  <el-form ref="logform" label-position="right" :rules="logrules" :model="logForm" label-width="23%" class="form-inline-logForm">
    <el-form-item label="账号" prop="account">
      <el-input clearable style="width: 100%" v-model="logForm.account"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input clearable style="width: 100%" v-model.number="logForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="medium"
                 @click="search">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</div>
</template>

<script>
import qs from "qs";
import api from "../../util/api.js"

export default {
  name: "Login",
  data(){
    return{
      logForm:{
        account:'',
        password:''
      },
      logrules:{
        account:[{required:true,message:'请输入账号', trigger: 'blur'}],
        password:[{required:true,message:'请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    search(){
      var path = api.path+"/user/staff/login"
      this.axios.post(path,qs.stringify({"account":this.logForm.account,"password":this.logForm.password})).then(
          (response)=>{
            console.log(response)
            if (response.data.data.staffType==='管理员'){
              this.$router.push({path:'/admin/admininformation'})
              localStorage.setItem("staffId",response.data.data.staffId)
            }
            if (response.data.data.staffType==='服务员'){
              this.$router.push({path:'/Waiter/WaiterInformation'})
              localStorage.setItem("staffId",response.data.data.staffId)
            }
            if (response.data.data.staffType==='后厨'){
              this.$router.push({path:'/Cook/CookerInformation'})
              localStorage.setItem("staffId",response.data.data.staffId)
            }
            if (response.data.data.staffType==='前台'){
              this.$router.push({path:'/Reception/ReceptionInformation'})
              localStorage.setItem("staffId",response.data.data.staffId)
            }
          })
    }
  }
}
</script>

<style scoped>
.login_context{
  /*background: rgb(172,208,255);*/
  height: 100%;
  width: 100%;
  background-image: url("../../assets/logimage.png");
  background-size: cover;
  background-position: center;
  position: fixed;
}
.login{
  background: black;
  height: 50%;
  width: 25%;
  margin-left: 60%;
  margin-top: 15%;
  display: flex;
  justify-content:space-evenly;
  /*justify-content:center;*/
  align-items:center;
  opacity: 0.7;
}
</style>