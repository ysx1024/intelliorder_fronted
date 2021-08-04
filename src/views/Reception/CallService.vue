<template>
   <div>
     <ReceptionHeader></ReceptionHeader>
     <el-container>
       <el-aside width="60%">
         <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
         <div>
           <span>呼叫服务列表</span>
         </div>
         <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
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
                        size="small"
                        style="width:100px" type="warning" round>
               等待服务</el-button>
             <el-button v-if="scope.row.callStatus=='1'"
                        @click.native.prevent="acceptCall(scope.row)"
                        size="small"
                        style="width:100px" type="success" round>
               正在服务</el-button>
           </template>
         </el-table-column>
       </el-table>
       </el-aside>


       <el-main>
         <div>
           <span>排队叫号列表</span>
         </div>
         <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
         <el-form class="el-form-1"
                  :model="queuelist">
           <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
           <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
           <el-form-item class="el-form-item" label="当前就餐序号">
             <span style="font-size: 40px">{{queuelist.queueNow}}</span>
           </el-form-item>
           <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
           <el-form-item label="等待顾客序号">
             <div v-if="queuelist.queueList.length!==0" style="font-size: 40px">{{queuelist.queueList.toString()}}</div>
           </el-form-item>
           <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
           <el-form-item class="el-form-item2">
             <el-button type="success" round size="small" @click="queueUpdate()">下一位</el-button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <el-button type="danger" icon="el-icon-delete" round size="small" @click="deleteQueue()">清空</el-button>
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
          queueCustomer:'',
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
  created () {
    this.getData()
  },

  mounted() {
    var path = api.path + "/call/callquest/showCallquestList"
    this.axios.get(path).then((response) => {
      this.callQuset = response.data.data
    })
    let path1 = api.path + "/queue/queuelist/showQueue"
    this.axios.get(path1).then((response1) => {
      console.log(response1)
      this.queuelist.queueList = response1.data.data
      this.queuelist.queueNow = response1.data.queueNow
    })
    //页面自动刷新，10s
    // setTimeout(function(){location.reload()},10000);
  },
  methods: {
    queueUpdate() {
      let path = api.path + "/queue/queuelist/changeQueue"
      this.axios.post(path).then((response) => {
        let path1 = api.path + "/queue/queuelist/showQueue"
        this.axios.get(path1).then((response1) => {
          console.log(response1)
          this.queuelist.queueList = response1.data.data
          this.queuelist.queueNow = response1.data.queueNow
        })
      })
    },
    deleteQueue() {
      let path = api.path + "/queue/queuelist/deleteQueue"
      this.axios.post(path).then((response) => {
        let path1 = api.path + "/queue/queuelist/showQueue"
        this.axios.get(path1).then((response1) => {
          console.log(response1)
          this.queuelist.queueList = response1.data.data
          this.queuelist.queueNow = response1.data.queueNow
        })
      })
    },

    async getData () {
      let  path = api.path + "/call/callquest/showCallquestList"
      this.axios.get(path).then((response) => {
        this.callQuset = response.data.data
      })
    },
    // 定时器
    timer () {
      return setTimeout(() => {
        this.getData()
      }, 10000)
    }
  },

  watch: {
    // watch就是用来监控数据变化，只有变化了才会调用定时器的变化
    callQuset () {
      // 调用定时器
      this.timer()
    }
  },
  // 页面销毁后 停止计时器
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
 .el-form-1{
   color: #556B2F;
   background-color: aliceblue;
   height: 260px;
 }
 .el-form-item{
   margin-left: 60px;
 }
 .el-form-item2{
   margin-left: 60px;
   text-align: justify;
 }
</style>