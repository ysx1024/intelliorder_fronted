<template>
  <div>
    <el-menu :default-active="this.$route.path" router mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/cook/cookDishlist">
        <i class="el-icon-menu"></i>
        <span>待做菜品</span>
      </el-menu-item>
      <el-menu-item index="/cook/cookerInformation">
        <i class="el-icon-user"></i>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CookerHeader",
}
</script>

<style scoped>

  .el-menu-item{
    margin: 0 auto;
    width: 20%;
    height: 140px;
  }
</style>