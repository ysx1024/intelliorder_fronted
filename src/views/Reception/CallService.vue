<template>
   <div>
     <ReceptionHeader></ReceptionHeader>
     <el-container>
       <el-aside width="80%">
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
       </el-table>
       </el-aside>


       <el-main>
         <el-form class="el-form-1"
                  :model="queueList">
           <el-form-item label="当前 就 餐 序号">
             <div style="font-size: 20px">{{queueList.queueNow}}</div>
           </el-form-item>
           <el-form-item label="最后一位等待序号">
             <div style="font-size: 20px">{{queueList.queueCustomer}}</div>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" round @click="queueUpdate(queueList)">就餐</el-button>
           </el-form-item>
         </el-form>
       </el-main>
     </el-container>
   </div>
</template>

<script>
import ReceptionHeader from "../../components/ReceptionHeader";
export default {
  name: "CallService",
  components: {ReceptionHeader},

  data() {
    return {
      queueList:{
        openId:'178937',
        queueCustomer:'7',
        queueNow:'2',
        queueTime:'2021-07-17'
      },
      callQuset:[{
        callId:'',
        deskId:'',
        callMsg:'',
        callTime:'',
        id:'',
        callStatus:''
      }],
    }
  },
  mounted() {
    var path = "/Data/serviceList.json"
    this.axios.get(path).then((response)=>{
      console.log(response)
      this.callQuset=response.data.data1
    })

    //页面自动刷新，10s
    //setTimeout(function(){location.reload()},10000);
  },
  methods: {
    queueUpdate(queueList){
      queueList.queueNow=parseInt(queueList.queueNow) + parseInt(1);
    }
  }
}
</script>

<style scoped>
 .el-form-1{
   color: #556B2F;
   background-color: azure;
 }
</style>