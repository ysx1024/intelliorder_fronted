<template>
  <div>
    <el-menu :default-active="this.$route.path" router mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path">
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CookerHeader",
  data() {
    return {
      navList:[
        {path:'/cook/cookDishlist',name:'待做菜品'},
        {path:'/cook/cookerInformation',name:'个人中心'}
      ]
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

  .el-menu-item{
    margin: 0 auto;
    width: 50%;
  }
</style>