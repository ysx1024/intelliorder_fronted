<template>
  <div class="BusinessData">
  <AdminHeader></AdminHeader>
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
  <el-date-picker
      v-model="mounth"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
  </el-date-picker>
      </el-form-item>
      <el-form-item>
  <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
  </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AdminHeader from "../../components/AdminHeader";

export default {
  name: "BusinessData",
  components: {
    AdminHeader
  },
  data(){
    return{
      date:'',
      month:''
    }
  }
}
</script>

<style scoped>
.form-inline{
  margin-top: 30px;
  display: flex;
  justify-content:space-evenly;
}
</style>