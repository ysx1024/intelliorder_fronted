<template xmlns:el-main="http://www.w3.org/1999/html">
  <div class="CookerInformation">
    <CookerHeader></CookerHeader>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="编号">
        {{cookData.id}}
      </el-form-item>
      <el-form-item label="员工账号">
      {{cookData.account}}
      </el-form-item>
      <el-form-item label="员工姓名">
        {{cookData.name}}
      </el-form-item>
      <el-form-item label="员工电话">
        {{cookData.phone}}
      </el-form-item>
      <el-form-item label="职位">
        {{cookData.staffType}}
      </el-form-item>
      <el-form-item label="密码">
        {{cookData.password}}
      </el-form-item>
    </el-form>

    <el-button type="text" @click="dialogVisible = true">修改</el-button>
    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="540px"
        :before-close="handleClose">
      <el-form :label-position="labelPosition" style="width: 540px" label-width="80px" :model="formLabelAlign">
        <el-form-item label="编号">
          <el-input style="width: 180px"  v-model="cookData.id":disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工账号">
          <el-input style="width: 180px" v-model="cookData.account"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input style="width: 180px" v-model="cookData.name"></el-input>
        </el-form-item>
        <el-form-item label="员工电话">
          <el-input style="width: 180px" v-model="cookData.phone"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input style="width: 180px" v-model="cookData.staffType"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width: 180px" v-model="cookData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

//cookData是结构体数据，而res.data.data是只包含一个元素的结构体数组，所以赋值的时候应该是cookData=res.data.data[0];

<script>
import CookerHeader from "../../components/CookerHeader";
import api from "@/util/api";

export default {
  components: {CookerHeader},
  comments:{CookerHeader},
  data() {
    return {
      dialogVisible: false,
      cookData: {
        account: "1689376837",
        password: "123456",
        id: "043",
        phone: "1689376837",
        name: "王虎",
        staffType: "厨师"
    }
    }
  },
  mounted() {
    console.log(api.path)
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>
  .CookerInformation{
    margin: 0 auto;
  }
  .el-form{
    margin: 0 auto;
    width: 640px;
  }
  .el-form-item{
    color: 	#CD950C;
  }

</style>