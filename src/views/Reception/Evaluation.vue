<template>
  <div>
    <ReceptionHeader></ReceptionHeader>
      <el-card style="margin:20px auto; width:1200px;font-family: 微软雅黑">
        <div>
          <el-form :model="feedList" status-icon :rules="rules" ref="feedList">
            <el-row :gutter="10" v-for="(feed,index) in feedList" :key="index">
              <el-col :span="0.8">
                <img src="~@/assets/logimage.png" style="height: 40px; width: 40px; border-radius:50%;" alt="">
              </el-col>
              <el-col :span="4" style="line-height: 18px">
                <el-col :span="24" style="font-size: 15px">{{feed.openId}}</el-col>
                <el-col :span="24" style="font-size: 10px">{{feed.feedTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</el-col>
              </el-col>
              <el-col :span="6">
                <el-rate
                  v-model="feed.feedLevel"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="满意度">
                </el-rate>
              </el-col>
              <el-col :span="24" style="font-size: 15px;line-height: 22px;padding-top: 8px " class="el-card-feedText">
                {{feed.feedText}}
              </el-col>
              <el-col :span="24">
                <div style="border-left: #c7c4c4 solid 3px;margin-left: 6px;margin-top: 8px;padding-left: 15px;font-size:16px ">
                  <div style="border-bottom: #c7c4c4 dashed  1px;padding: 10px 10px">
                    <div style="padding-top: 10px;font-size: 13px;color:#bab7b7 "></div>
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div  class="el-card-feedText2">
                    <span v-if="replyIf === 1 " style="color: #409EFF;cursor:pointer;font-size: 12px" @click="commentHandle (index);replyIf=feed.feedId">回复</span>
                  </div>
                  <div v-if="choice === index">
                    <el-form-item prop="comment">
                      <el-input
                          v-model="feed.replyTemporary"
                          type="textarea"
                          style="width: 80%"
                          :rows="4"
                          maxlength="255"
                          show-word-limit
                          placeholder="请输入回复">
                      </el-input>
                    </el-form-item>
                    <div style="width: 90%;text-align: right;margin-top: 10px">
                      <el-button  @click="commentBack">取消</el-button>
                      <el-button class="el-button-2" type="success"  @click="replyIf=1;replytemporary(feed.feedId,feed.replyTemporary)">发送</el-button>
                    </div>
                  </div>
                </div>
              </el-col>

<!--      <div v-for="feed in feedList" :aria-modal="feed" class="my-reply">-->
<!--      <el-card class="box-card">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span class="el-col-1">顾客名称：{{feed.openId}} </span>-->
<!--          <span class="el-col-3">满意度：{{feed.feedLevel}} </span>-->
<!--          <span class="el-col-2">评价时间：{{feed.feedTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</span>-->
<!--        </div>-->
<!--        <div class="text item">-->
<!--          <el-card class="el-card-feedText">{{feed.feedText}}</el-card>-->
<!--          <el-card v-if="feed.reply !==0" class="el-card-reply">{{feed.reply}}</el-card>-->
<!--          <div v-if="replyIf === feed.feedId">-->
<!--            <el-input class="el-input-1" v-model="feed.replyTemporary" placeholder="请输入回复！"></el-input>-->
<!--            <el-button  class="el-button-2" type="success" @click="replyIf=1;-->
<!--             replytemporary(feed.feedId,feed.replyTemporary)">提交</el-button>-->
<!--          </div>-->
<!--          <el-button v-if="replyIf === 1 " class="el-button-1" type="text" @click="replyIf=feed.feedId">回复</el-button>-->
<!--        </div>-->
<!--      </el-card>-->
          </el-row>
        </el-form>
      </div>
    </el-card>
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
      replyTemporary: '',
      replyIf:1,
      choice: -1,

      feedList:[{
        feedId:'',
        openId:'',
        feedTime:'',
        feedText:'',
        feedLevel:'',
        reply:''
      }],
      rules: {
        feedText: [{required: true, message: '评论不能为空', trigger: 'blur'},
          {min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur'}]
      }
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
    commentHandle (index) {
      if (index !== this.choice) {
        this.$refs['feedList'].resetFields()
        this.choice = index
      }
    },
    commentBack () {
      this.$refs['feedList'].resetFields()
      this.choice = -1
      location.reload()
    },
    replytemporary(feedId,replyTemporary) {
      if (replyTemporary.length!==0){
      let path = api.path + "/bussiness/feedlist/replyFeed"
      this.axios.post(path,qs.stringify({"feedId":feedId,"reply":replyTemporary})).then((response) => {
        console.log(response)
        this.feedList=response.data.data
      })}
      location.reload()
    }
  }
}
</script>


<style scoped>
 .el-card-feedText{
   width: 80%;
   margin-left: 3%;
   margin-top: 2%;
   text-align:justify;
 }
 .el-card-feedText2{
   width: 80%;
   margin-left: 5.5%;
   margin-top: 0;
   margin-bottom: 2%;
   text-align:justify;
 }
 .el-button-2{

 }
</style>
