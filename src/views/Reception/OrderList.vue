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
      <el-table-column
          label="收款">
        <template slot-scope="scope">
          <el-button type="success" @click="updateOrderState(scope.row.orderId)">确认付款</el-button>
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
              prop="dishName"
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
        <el-button type="warning" @click="toPay();dialogorderList= true">付款</el-button>
      </el-dialog>
  </div>
</template>

<script>
import ReceptionHeader from "../../components/ReceptionHeader";
import qs from "qs";
import api from "../../util/api.js"

export default {
  components: {ReceptionHeader},
  comments:{ReceptionHeader},
  name: "OrderList",
  data() {
    return {
      orderid:'',
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
        orderId:'',
        dishName: '',
        dishNum: '',
        dishPrice: '',
        listStatus: ''
      }],
      backData:'',
    }
  },
  methods:{
    getorderList(orderId){
      var that =this
      that.orderid=orderId
      let path = api.path+"/order/orderlist/showOrderInfo"
      this.axios.post(path,qs.stringify({"orderId":orderId})).then((response) => {
        console.log(response)
        this.orderList = response.data.data
      })
    },
    updateOrderState(orderId){
      var that =this
      that.orderid=orderId
      let path = api.path+"/order/order/updateOrderState"
      this.axios.post(path,qs.stringify({"orderId":orderId})).then((response) => {
        console.log(response)
        location.reload()
      })
    },

    toPay(){
      let path = api.path+"/order/order/toPay"
      this.axios.post(path,qs.stringify({"orderId":this.orderid})).then((response) => {
        console.log(response)
        this.backData=response.data;
        console.log(this.backData);
        document.write('<html>' +
            '<head></head>' +
            '<body>' +
            this.backData +
            '</body>' +
            '</html>')
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
    let path = api.path+"/order/order/showOrder"
    this.axios.get(path).then((response)=>{
      this.order=response.data.data
    })
  }
}
</script>

<style scoped>

</style>