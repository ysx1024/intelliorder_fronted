<template>
  <div>
    <AdminHeader></AdminHeader>
    <img class="img-reception" src="https://pic34.photophoto.cn/20150110/0010023268300231_b.jpg">
    <el-form class="el-form-1" label-width="180px" :model="adminData">
      <el-form-item label="编号">
        {{adminData.id}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item label="账号">
        {{adminData.account}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisibleAccout = true" >修改</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        {{adminData.name}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item label="电话">
        {{adminData.phone}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePhone = true" >修改</el-button>
      </el-form-item>
      <el-form-item label="职位">
        {{adminData.staffType}}&nbsp;&nbsp;
      </el-form-item>
      <el-form-item size="large" label="密码">
        {{adminData.password}}
        &nbsp;&nbsp;
        <el-button class="el-button-1"
                   type="text" icon="el-icon-edit"
                   @click="dialogVisiblePassward = true" >修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AdminHeader from "../../components/AdminHeader";

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
        id: '',
        phone: '',
        name:'',
        staffType: ''
      }
    }
  },
  mounted() {
    this.axios.get('http://10.128.135.182:8088')
  }
}
</script>

<style scoped>
.el-form-1{
  margin-left: 300px;
  width: 640px;
  color: #556B2F;
  background-color: azure;
}
.img-reception{
  width: 150px;
  height: 150px;
}
.el-button-1{
  width: 100px;
}
</style>