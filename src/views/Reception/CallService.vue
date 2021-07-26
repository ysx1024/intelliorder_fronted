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
                  :model="queuelist">
           <el-form-item label="当前 就 餐 序号">
             <div style="font-size: 20px">{{queuelist.queueNow}}</div>
           </el-form-item>
           <el-form-item label="顾客信息">
             <div style="font-size: 20px">{{queuelist.queueList}}</div>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" round @click="queueUpdate()">下一位</el-button>
             <el-button type="primary" round @click="deleteQueue()">清空</el-button>
           </el-form-item>
         </el-form>
       </el-main>
     </el-container>
   </div>
</template>

<script>
import ReceptionHeader from "../../components/ReceptionHeader";
import qs from "qs";
import api from "../../util/api.js"

export default {
  name: "CallService",
  components: {ReceptionHeader},

  data() {
    return {
      queuelist: {
        queueNow:'',
        queueList:[{
          openId: '',
          queueCustomer: '',
          queueStatus: '',
          queueTime: ''
        }]
      },
      callQuset: [{
        callId: '',
        deskId: '',
        callMsg: '',
        callTime: '',
        staffId: '',
        callStatus: ''
      }],
    }
  },
  mounted() {
    var path = api.path + "/call/callquest/showCallquestList"
    this.axios.get(path).then((response) => {
      console.log(response)
      this.callQuset = response.data.data
    })
    var path1 = api.path + "/queue/queuelist/showQueue"
    this.axios.get(path1).then((response) => {
      console.log(response)
      this.queueList = response.data.data
      this.queuelist.queueNow = response.data.queueNow
    })
    //页面自动刷新，10s
    // setTimeout(function(){location.reload()},10000);
  },
  methods: {
    queueUpdate() {
      var path2 = api.path + "/queue/queuelist/changeQueue"
      this.axios.post(path2).then((response) => {
        console.log(response)
        this.queueList = response.data.data
        this.queuelist.queueNow = response.data.queueNow
      })
    },
    deleteQueue() {
      var path3 = api.path + "/queue/queuelist/deleteQueue"
      this.axios.post(path3).then((response) => {
        console.log(response)
        this.queueList = response.data.data
        this.queuelist.queueNow = response.data.queueNow
      })
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