<template>
  <div>
    <ReceptionHeader></ReceptionHeader>
    <el-table
        :data="order"
        border
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column
          prop="orderId"
          label="订单号">
      </el-table-column>
      <el-table-column
          prop="deskId"
          label="桌号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="orderTime"
          sortable
          label="下单时间">
      </el-table-column>
      <el-table-column
          prop="totalPrice"
          label="总价">
      </el-table-column>
      <el-table-column
          label="详情">
        <template slot-scope="scope">
              <el-button type="text" @click="getorderList(scope.row.orderId);dialogorderList= true">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

      <el-dialog
          title="订单详情"
          :visible.sync="dialogorderList"
          width="500px"
          :before-close="handleClose">
        <el-table
            :data="orderList"
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column
              prop="dishId"
              label="菜品名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="dishPrice"
              label="单价"
              width="160">
          </el-table-column>
          <el-table-column
              prop="dishNum"
              label="数量"
              width="100">
          </el-table-column>
        </el-table>
        <el-button type="warning" plain>确认付款</el-button>
      </el-dialog>
  </div>
</template>

<script>
import ReceptionHeader from "../../components/ReceptionHeader";


export default {
  components: {ReceptionHeader},
  comments:{ReceptionHeader},
  name: "OrderList",
  data() {
    return {
      dialogorderList: false,
      spanArr:[],
      order:[{
        orderId: '',
        orderTime: '',
        deskId: '',
        totalPrice: '',
        Status: ''
      }],
      orderList:[{
        listId:'',
        dishId: '',
        dishNum: '',
        dishPrice: '',
        listStatus: ''
      }]
    }
  },
  methods:{
    getorderList(orderId){
      var path = "/Data/orderList.json"
      this.axios.get(path).then((response)=>{
        console.log(response)
        this.orderList=response.data.data
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },
  mounted() {
    var path = "/Data/order.json"
    this.axios.get(path).then((response)=>{
      this.order=response.data.data
    })
  }
}
</script>

<style scoped>

</style>