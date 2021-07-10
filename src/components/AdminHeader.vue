npm<template>
  <div class="AdminHeader">
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1"><a href="https://www.ele.me" target="_blank">菜单管理</a></el-menu-item>
      <el-menu-item index="2"><a href="https://www.ele.me" target="_blank">员工管理</a></el-menu-item>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">发布公告</a></el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">经营数据</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
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

</style>
