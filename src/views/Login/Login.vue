<!--<template>-->
<!--<div class="login_context">-->
<!--<div class="login">-->
<!--  <el-form ref="logForm" label-position="left" :rules="logRules" :model="logForm" label-width="23%" class="form-inline-logForm">-->
<!--    <el-form-item label="账号" prop="account">-->
<!--      <el-input clearable style="width: 100%" v-model="logForm.account"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="密码" prop="password">-->
<!--      <el-input clearable style="width: 100%" v-model.number="logForm.password"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item>-->
<!--      <el-button type="primary" size="medium"-->
<!--                 @click="search">登录</el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<template>
  <div>
    <div class="login_context">
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content:center;margin-top: 150px">
      <!--element ui组件card,设置透明度0.8-->
      <el-card style="width: 400px ; opacity:0.9">
        <div slot="header" class="clearfix" style="font-size: larger">
          <span>喋喋不休点餐系统登录</span>
        </div>
        <table>
          <tr>
            <td>账号 ：</td>
            <td>
              <el-input v-model="logForm.account" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码 ：</td>
            <td>
              <el-input
                  type="password" v-model.number="logForm.password" placeholder="请输入密码" @keydown.enter.native="search">
              </el-input>
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <el-button style="width: 300px" type="primary" @click="search">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
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
      logRules:{
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
              this.$router.push({path:'/Admin/AdminInformation'})
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
  height: 90%;
  width: 100%;
  background-image: url("../../assets/logimage1.jpg");
  background-size: cover;
  background-position: center;
  position: fixed;
}
/*.login{*/
/*  background:black;*/
/*  height: 50%;*/
/*  width: 25%;*/
/*  margin-left: 66%;*/
/*  margin-top: 19%;*/
/*  display: flex;*/
/*  justify-content:space-evenly;*/
/*  !*justify-content:center;*!*/
/*  align-items:center;*/
/*  opacity: 0.7;*/
/*}*/
</style>