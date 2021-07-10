<template>
  <div>
    <el-menu
        :default-active="activeIndex2"
        class="CookerHeader"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item class="cookerWork" index="2" >工作</el-menu-item>
      <el-menu-item  class="cookerPerson" index="1">个人中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CookerHeader",
  data(){
    return{
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
  .CookerHeader{
    margin: 0 auto;
    width: 640px;
  }
  .cookerWork{
    margin: 0 auto;
    width: 320px;
  }
  .cookerPerson{
    margin: 0 auto;
    width: 320px;
  }
</style>