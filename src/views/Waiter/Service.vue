<template>
  <div>
    <WaiterHeader></WaiterHeader>
    <el-container>
      <el-aside width="50%">
        <el-table
        class="el-table-dish" width="100%"
        :data="serviceList" border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :default-sort = "{prop: 'orderTime', order: 'ascending'}">
        <el-table-column
          prop="deskId"
          label="桌号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dishId"
          label="菜品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dishNum"
          label="菜品数目"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          label="接受服务"
          width="140"
          align="center">
          <template slot-scope="scope">
          <el-button v-if="scope.row.listStatus=='2'"
                     @click.native.prevent="acceptService(scope.row)"
                     style="width:100px" type="warning" round>
            准备上菜</el-button>
            <el-button v-if="scope.row.listStatus=='3'"
                     @click.native.prevent="acceptService(scope.row)"
                     style="width:100px" type="success" round>
              正在上菜</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="完成"
          width="100"
            align="center">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="serviceCompleted(scope.row)" type="warning" round>完成</el-button>
          </template>
       </el-table-column>
    </el-table>
      </el-aside>
      <el-main >
        <el-table
        class="el-table-call" width="100%"
        :data="callQuset" border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :default-sort = "{prop: 'callTime', order: 'ascending'}">
      <el-table-column
          prop="deskId"
          label="桌号"
          width="80"
          align="center">
      </el-table-column>
      <el-table-column
          prop="callMsg"
          label="请求消息"
          align="center">
      </el-table-column>
      <el-table-column
          prop="callTime"
          label="呼叫时间"
          align="center">
      </el-table-column>
      <el-table-column
          label="接受服务"
          width="140"
          align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.callStatus=='0'"
                     @click.native.prevent="acceptCall(scope.row)"
                     style="width:100px" type="warning" round>
            等待服务</el-button>
          <el-button v-if="scope.row.callStatus=='1'"
                     @click.native.prevent="acceptCall(scope.row)"
                     style="width:100px" type="success" round>
            正在服务</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="完成"
          width="100"
          align="center">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="callCompleted(scope.row)" type="warning" round>完成</el-button>
        </template>
      </el-table-column>
    </el-table>
      </el-main>
    </el-container>
  </div>
</template>


<script>

import WaiterHeader from "../../components/WaiterHeader";

export default {
  name: "Service",
  components: {WaiterHeader},
  data() {
    return {
        serviceList: [{
          orderId: '',
          orderTime: '',
          openId: '',
          deskId: '',
          id: '',
          listId:'',
          dishId: '',
          dishNum: '',
          dishPrice: '',
          listStatus: ''
        }],
      callQuset:[{
        callId:'',
        deskId:'',
        callMsg:'',
        callTime:'',
        id:'',
        callStatus:''
      }]
    }
  },
  mounted() {
    var path = "/Data/serviceList.json"
    this.axios.get(path).then((response)=>{
      console.log(response)
      this.serviceList=response.data.data
      this.callQuset=response.data.data1
    })
  },
  methods:{
    acceptService(row){
      //向后端传参数：订单明细序号，厨师Id，状态值=1
      console.log(row.listId)
      row.listStatus="3"
    },
    serviceCompleted(row){
      //向后端传参数：订单明细序号，厨师Id，状态值=2
      console.log(row.listId)
    },
    acceptCall(row){
      //向后端传参数：订单明细序号，厨师Id，状态值=1
      console.log(row.deskId)
      row.callStatus="1"
    },
    callCompleted(row){
      //向后端传参数：订单明细序号，厨师Id，状态值=2
      console.log(row.deskId)
    }
  }
}
</script>

<style scoped>
.el-table-dish{
  margin-top: 20px;
}
</style>