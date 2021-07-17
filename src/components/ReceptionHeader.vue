<template>
  <div>
    <el-menu :default-active="this.$route.path" router mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/reception/orderList">
        <i class="el-icon-menu"></i>
        <span>待付款订单</span>
      </el-menu-item>
      <el-menu-item index="/reception/callService">
        <i class="el-icon-user"></i>
        <span>服务</span>
      </el-menu-item>
      <el-menu-item index="/reception/evaluation">
        <i class="el-icon-user"></i>
        <span>回复评价</span>
      </el-menu-item>
      <el-menu-item index="/reception/receptionInformation">
        <i class="el-icon-user"></i>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "ReceptionHeader"
}
</script>

<style scoped>
  .el-menu-item{
    margin: 0 auto;
    width: 15%;
    height: 140px;
  }
</style>