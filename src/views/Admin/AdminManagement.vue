<template>
  <div class="AdminManagement">
  <AdminHeader></AdminHeader>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工编号:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 160px"
                  clearable
                  v-model="formInline.id" placeholder="员工编号"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 160px"
                  clearable
                  v-model="formInline.name"
                  placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="员工职位:">
        <el-select v-model="formInline.staffType"
                   style="width: 160px"
                   clearable
                   placeholder="员工职位">
          <el-option label="前台" value="前台"></el-option>
          <el-option label="服务员" value="服务员"></el-option>
          <el-option label="厨师" value="厨师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-search"
                   @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
        style="width: 100%"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center'}"
        :data="tableData"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}">
      <el-table-column
          prop="id" label="员工编号" sortable width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="account" label="账号" width="140">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="160">
      </el-table-column>
      <el-table-column prop="staffTpye" label="员工类型" width="140">
      </el-table-column>
      <el-table-column
          label="  " width="80">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="getrows(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="  " width="140">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle  @click.native.prevent="getrows(scope.row)" ></el-button>
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
      formInline: {
        id: '',
        name: '',
        staffType:''
      },
      tableData: [{
        id: '01',
        name: '吴艳',
        phone: '186****1234',
        account:'0',
        password:'0',
        staffTpye:'0'
      }, {
        id: '02',
        name: '徐欣霞',
        phone: '135****1369',
        account:'0',
        password:'0',
        staffTpye:'1'
      },{
        id: '03',
        name: '吴珩',
        phone: '183****1494',
        account:'0',
        password:'0',
        staffTpye:'1'
      },{
        id: '04',
        name: '李明',
        phone: '186****1234',
        account:'0',
        password:'0',
        staffTpye:'0'
    }]
    }
  },
  methods:{
    getrows(row){
      console.log(row.id)
    },
    search() {
      console.log('submit!');
    }
  }

}
</script>
<style scoped>
.el-table{
  margin-left: 20px;
  margin-top: 10px;
}
.el-form{
  margin-top: 50px;
  display: flex;
  justify-content:space-evenly;
}
</style>
