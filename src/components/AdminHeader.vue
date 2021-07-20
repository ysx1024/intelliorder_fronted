npm<template>
  <div class="AdminHeader">
    <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="/admin/admindishmanage">
        <i class="el-icon-dish-1"></i>
        <span>菜单管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/adminmanagement">
        <i class="el-icon-setting"></i>
        <span>员工管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/businessdata">
        <i class="el-icon-bank-card"></i>
        <template slot="title">经营数据</template>
      </el-menu-item>
      <el-menu-item index="/admin/admininformation">
        <i class="el-icon-user-solid"></i>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-item{
  width:180px
}
</style>
