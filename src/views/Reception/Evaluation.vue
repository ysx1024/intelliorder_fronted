<template>
  <div>
    <ReceptionHeader></ReceptionHeader>
    <div v-for="feed in feedList" :aria-modal="feed">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="el-col-1">顾客名称：{{feed.openId}} </span>
          <span class="el-col-3">满意度：{{feed.feedLevel}} </span>
          <span class="el-col-2">评价时间：{{feed.feedTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</span>
        </div>
        <div class="text item">
          <el-card class="el-card-feedText">{{feed.feedText}}</el-card>
          <el-card v-if="feed.reply !==null" class="el-card-reply">{{feed.reply}}</el-card>
          <div v-if="replyIf === feed.feedId">
            <el-input class="el-input-1" v-model="feed.replyTemporary" placeholder="请输入回复！"></el-input>
            <el-button class="el-button-2" type="success" @click="replyIf=1;
             replytemporary(feed.feedId,feed.replyTemporary)">提交</el-button>
          </div>
          <el-button v-if="replyIf === 1 " class="el-button-1" type="text" @click="replyIf=feed.feedId">回复</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ReceptionHeader from "@/components/ReceptionHeader";
import qs from "qs";
import api from "../../util/api.js"

export default {
  name: "Evaluation",
  components: {ReceptionHeader},
  data() {
    return {
      replyTemporary :'',
      replyIf:1,
      feedList:[{
        feedId:'',
        openId:'',
        feedTime:'',
        feedText:'',
        feedLevel:'',
        reply:''
      }]
    }
  },
  mounted() {
    let path = api.path + "/bussiness/feedlist/showFeedlistList"
    this.axios.get(path).then((response)=>{
      console.log(response)
      this.feedList=response.data.data
    })
  },
  methods:{
    replytemporary(feedId,replyTemporary) {
      let path = api.path + "/bussiness/feedlist/replyFeed"
      this.axios.post(path,qs.stringify({"feedId":feedId,"reply":replyTemporary})).then((response) => {
        console.log(response)
        this.feedList=response.data.data
      })
    }
  }
}
</script>

<style scoped>
 .el-col-1{
   width: 180px;
 }
 .el-col-2{
   width: 280px;
 }
 .el-col-3{
   width: 130px;
 }
 .text {
   font-size: 14px;
 }

 .clearfix:before,
 .clearfix:after {
   display: table;
   content: "";
 }
 .clearfix:after {
   clear: both
 }

 .box-card {
   width: 70%;
   margin: 0 auto;
 }
 .el-card-feedText{
   width: 80%;
   margin: 0 auto;
 }
 .el-card-reply{
   width: 80%;
   margin: 0 auto;
 }
 .el-button-1{
   margin-left: 80%;
   margin-right: 20%;
 }
 .el-button-2{
   font-size: 10px;
   width: 50px;
 }
.el-input-1{
  width: 75%;
}
</style>