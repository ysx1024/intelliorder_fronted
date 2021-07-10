<template>
  <div class="AdminManagement">
  <AdminHeader></AdminHeader>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="ID"
          label="员工编号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="Name"
          label="姓名"
          width="100">
      </el-table-column>
      <el-table-column
          prop="Phone"
          label="手机号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="Account"
          label="账号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="Password"
          label="密码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="staffTpye"
          label="员工类型"
          width="120">
      </el-table-column>
      <el-table-column
          prop="dishType"
          label="厨师类别"
          width="120">
      </el-table-column>
      <el-table-column
          label="  "
          width="120">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="getrows(scope.row)" type="warning" round>修改</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="  "
          width="120">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="getrows(scope.row)" type="warning" round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
// @ is an alias to /src
import AdminHeader from '../../components/AdminHeader.vue'
export default {
  name: 'AdminManagement',
  components: {
    AdminHeader
  },
  data() {
    return {
      tableData: [{
        ID: '01',
        Name: '吴艳',
        Phone: '186****1234',
        Account:'0',
        Password:'0',
        staffTpye:'0',
        dishType:'0'
      }, {
        ID: '02',
        Name: '徐欣霞',
        Phone: '135****1369',
        Account:'0',
        Password:'0',
        staffTpye:'1',
        dishType:'0'
      }]
    }
  },
  methods:{
    getrows(row){
      console.log(row.ID)
    }
  }

}
</script>
<style scoped>

</style>
