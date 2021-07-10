<template>
  <div>
    <CookerHeader></CookerHeader>
    <el-table
        :data="dishList"
        border
        style="width: 100%">
      <el-table-column
          prop="deskNum"
          label="桌号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="dishId"
          label="菜品名称">
      </el-table-column>
      <el-table-column
          prop="dishNum"
          label="菜品数目"
          width="180">
      </el-table-column>
      <el-table-column
          prop="orderTime"
          label="下单时间"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CookerHeader from "../../components/CookerHeader";
import api from "@/util/api";

export default {
  components: {CookerHeader},
  comments:{CookerHeader},
  name: "CookDishlist",
  data() {
    return {
      dishList: [{
        deskNum: '03',
        dishId: '烧茄子',
        dishNum: '2',
        orderTime:'2021-07-10'
      },
        {
          deskNum: '05',
          dishId: '烧茄子',
          dishNum: '2',
          orderTime:'2021-07-10'
        },
        {
          deskNum: '07',
          dishId: '烧茄子',
          dishNum: '2',
          orderTime:'2021-07-10'
        },
        {
          deskNum: '01',
          dishId: '烧茄子',
          dishNum: '2',
          orderTime:'2021-07-10'
        }]
    }
  },
  mounted() {
    console.log(api.path)
  }
}
</script>

<style scoped>

</style>