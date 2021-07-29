<template>
  <div>
    <CookerHeader></CookerHeader>
    <el-table
        :data="dishList" border style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :default-sort = "{prop: 'orderTime', order: 'ascending'}">
      <el-table-column
          prop="listId"
          label="序号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="deskId"
          label="桌号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="dishName"
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
          label="接单"
          width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.listStatus=='0'"
                     @click.native.prevent="acceptOrder(scope.row)"
                     style="width:100px" type="warning" round>
            接单</el-button>
          <el-button v-if="scope.row.listStatus=='1'"
                     style="width:100px" type="success" round>
            已接单</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="完成"
          width="180">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="orderCompleted(scope.row)" type="warning" round>完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

//菜单发生变化时，界面给出提示音

<script>
import CookerHeader from "../../components/CookerHeader";
import api from "@/util/api";
import qs from "qs";

export default {
  components: {CookerHeader},
  comments:{CookerHeader},
  name: "CookDishlist",
  data() {
    return {
      dishList: []
    }
  },
  mounted() {
    let path = api.path + "/order/orderlist/showOrderlist"
    this.axios.get(path).then((response) => {
      this.dishList = response.data.data
    })
  },
  methods:{
    acceptOrder(row){
      let path = api.path + "/order/orderlist/receiveOrderlist"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),"listId":row.listId})).then((response) => {
        if(response.data.status==='200') {
          location.reload()
        }
      })
      //向后端传参数：订单明细序号，厨师Id，状态值=1
    },
    orderCompleted(row){
      //向后端传参数：订单明细序号，厨师Id，状态值=2
      let path = api.path + "/order/orderlist/completeOrderlist"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),"listId":row.listId})).then((response) => {
        if(response.data.status==='200') {
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>