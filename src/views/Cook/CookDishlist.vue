<template>
  <div>
    <CookerHeader></CookerHeader>
    <el-table
        :data="dishList" border style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :default-sort = "{prop: 'orderTime', order: 'ascending'}">
      <el-table-column
          prop="orderId"
          label="订单号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="deskId"
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
      <el-table-column
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="determine(scope.row)" type="warning" round>制作完成</el-button>
        </template>
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
        orderId: "0926786151",
        orderTime: "2021-07-12-12-30",
        dishId: "烧茄子",
        dishNum: "1",
        openId: "某位顾客",
        deskId: "07",
        price: "36",
        totalPrice: "79",
        Status: "0"
        },
        {
          orderId: "0926781751",
          orderTime: "2021-07-14-18-30",
          dishId: "烧茄子",
          dishNum: "1",
          openId: "某位顾客",
          deskId: "07",
          price: "36",
          totalPrice: "79",
          Status: "0"
        },
        {
          orderId: "0926986751",
          orderTime: "2021-07-12-14-30",
          dishId: "烧茄子",
          dishNum: "1",
          openId: "某位顾客",
          deskId: "07",
          price: "36",
          totalPrice: "79",
          Status: "0"
        },
        {
          orderId: "0926785751",
          orderTime: "2021-07-12-11-30",
          dishId: "烧茄子",
          dishNum: "1",
          openId: "某位顾客",
          deskId: "07",
          price: "36",
          totalPrice: "79",
          Status: "0"
        }]
    }
  },
  mounted() {
    console.log(api.path)
  },
  methods:{
    determine(row){
      console.log(row.orderId)
    }
  }
}
</script>

<style scoped>

</style>