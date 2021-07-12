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
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品类别">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="菜品名称">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="菜品上架时间">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="菜品价格">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="菜品描述">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="成本">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="菜品售价">
              <span>{{ props.row.address }}</span>
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
      <el-table-column label="菜品价格" prop="dishPrice" width="200">
      </el-table-column>
      <el-table-column
          label="菜品状态" width="240">
        <template slot-scope="scope">
          <el-switch
              v-model="dishState"
              active-text="上架"
              inactive-text="下架">
          </el-switch>
<!--          <el-button  @click.native.prevent="getrows(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>-->
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
      //返回的数组，因为还没有返回所以是空的
      //BookList:[],
      //假数据在table里显示
      dishState: true,
      tableData: [{
        dishId: '01',
        dishName: '吴艳',
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
  mounted() {
    //post请求，没有参数
    //var path = api.path+"";
    //this.axios.post(path).then((response)=>{
      //console.log(response)
      //返回的数据赋值
      //this.BookList = response.data.data.rows
    //})
  },
  methods:{
    //getrows(row){
      //console.log(row.ID)
   // }
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