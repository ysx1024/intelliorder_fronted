<template xmlns:el-main="http://www.w3.org/1999/html">
  <div class="CookerInformation">
    <CookerHeader></CookerHeader>
    <div>员工编号：{{cookertable.id}}</div>
    <div>姓名：{{cookertable.name}}</div>
    <div>电话号码：{{cookertable.telephone}}</div>
    <div>厨师类别：{{cookertable.cookType}}</div>
  </div>
</template>

<script>
import CookerHeader from "../../components/CookerHeader";

export default {
  components: {CookerHeader},
  comments:{CookerHeader},
  data() {
    return {
      cookertable:{
        id:"005",
        name:"王小虎",
        telephone:"153xxxxx597",
        cookType:"川菜"
      }
    }
  }
}
</script>

<style scoped>


</style>