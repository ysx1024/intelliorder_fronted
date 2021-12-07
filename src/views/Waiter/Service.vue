<template>
  <div>
    <WaiterHeader></WaiterHeader>
    <el-container>
      <el-aside width="50%">
        <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div  style="position:absolute;width:50%;">
          <i class="el-icon-dish-1"></i>&nbsp&nbsp
          <span>上菜列表</span>
        </div>
        <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <el-table
        class="el-table-dish" width="100%"
        :data="serviceList" border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :default-sort = "{prop: 'orderTime', order: 'ascending'}">
        <el-table-column
          prop="deskId"
          label="桌号"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dishName"
          label="菜品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dishNum"
          label="菜品数目"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          align="center">
        </el-table-column>
        <el-table-column
          label="接受服务"
          width="140"
          align="center">
          <template slot-scope="scope">
          <el-button v-if="scope.row.listStatus=='2'"
                     @click.native.prevent="acceptService(scope.row)"
                     style="width:100px" size="small" type="warning" round >
            准备上菜</el-button>
            <el-button v-if="scope.row.listStatus=='3'"
                     @click.native.prevent="acceptService(scope.row)"
                     style="width:100px" size="small" type="success" round >
              正在上菜</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="完成"
          width="100"
            align="center">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="serviceCompleted(scope.row)" type="warning" size="small" round>完成</el-button>
          </template>
       </el-table-column>
    </el-table>
      </el-aside>

      <el-main>
        <div>
          <i class="el-icon-water-cup"></i>&nbsp&nbsp
          <span>呼叫服务列表</span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <el-table
        class="el-table-call" width="100%"
        :data="callQuset" border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :default-sort = "{prop: 'callTime', order: 'ascending'}">
      <el-table-column
          prop="deskId"
          label="桌号"
          width="60"
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
                     style="width:100px" type="warning" size="small" round>
            等待服务</el-button>
          <el-button v-if="scope.row.callStatus=='1'"
                     @click.native.prevent="acceptCall(scope.row)"
                     style="width:100px" type="success" size="small" round>
            正在服务</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="完成"
          width="100"
          align="center">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="callCompleted(scope.row)" type="warning" size="small" round>完成</el-button>
        </template>
      </el-table-column>
    </el-table>
      </el-main>
    </el-container>
  </div>
</template>


<script>

import WaiterHeader from "../../components/WaiterHeader";
import api from "../../util/api";
import qs from "qs";

export default {
  name: "Service",
  components: {WaiterHeader},
  data() {
    return {
        serviceList: [],
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
    let path1 = api.path + "/order/orderlist/serveList";
    this.axios.get(path1).then((response)=>{
      this.serviceList=response.data.data
      console.log(response)
    })
    let path2 = api.path + "/call/callquest/showCallquestList";
    this.axios.get(path2).then((response)=>{
      console.log(response)
      this.callQuset=response.data.data
    })
  },
  methods:{
    acceptService(row){
      let path = api.path + "/order/orderlist/receiveServe"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),"listId":row.listId})).then((response) => {
        if(response.data.status==='200') {
          location.reload()
        }
      })
    },
    serviceCompleted(row){
      let path = api.path + "/order/orderlist/completeServe"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),"listId":row.listId})).then((response) => {
        if(response.data.status==='200') {
          location.reload()
        }
      })
    },
    acceptCall(row){
      let path = api.path + "/call/callquest/receiveCallquest"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),"callId":row.callId})).then((response) => {
        if(response.data.status==='200') {
          location.reload()
        }
      })
    },
    callCompleted(row){
      let path = api.path + "/call/callquest/completeCallquest"
      this.axios.post(path,qs.stringify({"staffId":localStorage.getItem("staffId"),"callId":row.callId})).then((response) => {
        if(response.data.status==='200') {
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>
.el-table-dish{
  margin-top: 20px;
}
</style>