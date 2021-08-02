<template>
  <div>
    <AdminHeader></AdminHeader>
    <img class="img-reception" src="https://pic34.photophoto.cn/20150110/0010023268300231_b.jpg" alt="">
    <el-form class="el-form-1"  label-width="180px" :model="adminData" >
      <el-form-item  class="el-form-item1" label="编号" >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{adminData.staffId}}
      </el-form-item>
      <el-form-item class="el-form-item2" label="账号">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{adminData.account}}
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisibleAccout = true" >修改</el-button>
      </el-form-item>
      <el-form-item class="el-form-item3" label="姓名">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{adminData.name}}
      </el-form-item>
      <el-form-item class="el-form-item5" label="电话">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{adminData.phone}}
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePhone = true" >修改</el-button>
      </el-form-item>
      <el-form-item class="el-form-item4" label="职位">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{adminData.staffType}}
      </el-form-item>
      <el-form-item class="el-form-item6" size="large" label="密码">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ******

        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePassward = true" >修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AdminHeader from "../../components/AdminHeader";
import qs from "qs";
import api from "../../util/api.js"

export default {
  name: "AdminInformation",
  components: {
    AdminHeader
  },
  data(){
    return{
      adminData: {
        account: '',
        password: '',
        staffId: '',
        phone: '',
        name:'',
        staffType: ''
      }
    }
  },
  mounted() {
    let path = api.path + "/user/staff/showStaffInfo";
    this.axios.post(path,qs.stringify({
      "staffId":localStorage.getItem("staffId")})).then((response)=>{
      this.adminData=response.data.data
    })
  }
}
</script>

<style scoped>
.el-form-1{
  margin-left: 300px;
  width: 640px;
  color: #556B2F;
  /*background-color: azure;*/
  background-color:aliceblue
}
.img-reception{
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
.el-button-1{
  width: 100px;
}
</style>