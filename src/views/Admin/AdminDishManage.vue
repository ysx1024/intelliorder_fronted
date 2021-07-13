<template>
  <div class="AdminDishManage">
    <AdminHeader></AdminHeader>
    <el-table
        style="width: 100%"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center'}"
        :data="tableData"
        stripe
        :default-sort = "{prop: 'dishId', order: 'ascending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="菜品编号">
              <span>{{ props.row.dishId }}</span>
            </el-form-item>
            <el-form-item label="菜品名称">
              <span>{{ props.row.dishName }}</span>
            </el-form-item>
            <el-form-item label="菜品类别">
              <span>{{ props.row.dishType }}</span>
            </el-form-item>
            <el-form-item label="菜品售价">
              <span>{{ props.row.dishPrice }}</span>
            </el-form-item>
            <el-form-item label="菜品描述">
              <span>{{ props.row.dishDesc }}</span>
            </el-form-item>
            <el-form-item label="成本">
              <span>{{ props.row.costPrice }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable label="菜品编号" prop="dishId" width="120">
      </el-table-column>
      <el-table-column label="菜品图片" prop="dishImage" width="200">
      </el-table-column>
      <el-table-column label="菜品名称" prop="dishName" width="200">
      </el-table-column>
      <el-table-column label="菜品售价" prop="dishPrice" width="200">
      </el-table-column>
      <el-table-column label="下架/上架" prop="dishState" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.dishState" active-text=" " inactive-text=" "
                     active-value=true inactive-value=false
          @change="changeSwitch($event,scope.row,scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
// @ is an alias to /src
import AdminHeader from '../../components/AdminHeader.vue'
export default {
  name: 'AdminDishManage',
  components: {
    AdminHeader
  },
  data() {
    return {
      dishState: true,
      tableData: [{
        dishId: '',
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:'',
        dishState:''
      }]
    }
  },
  mounted() {

  },
  methods:{
    changeSwitch(data,b,index){

    }
  }
}
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table{
  margin-top: 50px;
}
</style>