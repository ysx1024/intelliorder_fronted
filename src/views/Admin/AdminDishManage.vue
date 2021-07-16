<template>
  <div class="AdminDishManage">
    <AdminHeader></AdminHeader>
    <!--               form表存放查询和添加操作需要的组件            -->
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline"
                   @click="addDish">增加</el-button>
      </el-form-item>
      <el-form-item label="菜品编号:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 130px"
                  clearable
                  v-model="formInline.id" placeholder="菜品编号"></el-input>
      </el-form-item>
      <el-form-item label="菜品名称:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 130px"
                  clearable
                  v-model="formInline.name"
                  placeholder="菜品名称"></el-input>
      </el-form-item>
      <el-form-item label="菜品类别:">
        <el-select v-model="formInline.dishType"
                   style="width: 130px"
                   clearable
                   placeholder="菜品类别">
          <el-option label="今日特价" value="今日特价"></el-option>
          <el-option label="人气爆款" value="人气爆款"></el-option>
          <el-option label="夏日果茶" value="夏日果茶"></el-option>
          <el-option label="特色菜肴" value="特色菜肴"></el-option>
          <el-option label="必点小吃" value="必点小吃"></el-option>
          <el-option label="主食" value="主食"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search"
                   @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--               table表显示菜品                -->
    <el-table
        style="width: 100%"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}"
        :data="tableData"
        stripe
        :default-sort = "{prop: 'dishId', order: 'ascending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="菜品编号">
              <span>{{ props.row.dishId }}</span>
            </el-form-item>
            <div>
              <el-form-item label="菜品名称">
                <span>{{ props.row.dishName }}</span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="菜品类别">
                <span>{{ props.row.dishType }}</span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="菜品成本">
                <span>{{ props.row.costPrice }}</span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="菜品售价">
                <span>{{ props.row.dishPrice }}</span>
              </el-form-item>
            </div>
            <el-form-item label="菜品描述">
              <span>{{ props.row.dishDesc }}</span>
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
      <el-table-column label="下架/上架" prop="dishState" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.dishState" active-text=" " inactive-text=" "
                     active-value=true inactive-value=false
                     @change="changeSwitch($event,scope.row,scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="  " width="120">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="editDish(scope.row)" size="small" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="  " width="140">
      </el-table-column>
    </el-table>
    <!--                   添加菜品界面             -->
    <el-dialog
        class="dialog-addDish"
        title="添加菜品"
        :visible.sync="dialogaddVisible"
        @close="closeAdd"
        width=420px>
      <span>
        <el-form ref="addform" :rules="addrules" :model="addForm" label-width="70px" class="form-inline-addForm">
          <el-form-item label="菜品名称" prop="dishName">
            <el-input clearable v-model="addForm.dishName"></el-input>
          </el-form-item>
          <el-form-item label="菜品类别" prop="dishType">
            <el-select v-model="addForm.dishType"
                   style="width: 300px"
                   placeholder="菜品类别">
              <el-option label="今日特价" value="今日特价"></el-option>
              <el-option label="人气爆款" value="人气爆款"></el-option>
              <el-option label="夏日果茶" value="夏日果茶"></el-option>
              <el-option label="特色菜肴" value="特色菜肴"></el-option>
              <el-option label="必点小吃" value="必点小吃"></el-option>
              <el-option label="主食" value="主食"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="菜品图片" prop="dishImage">
          <el-input clearable v-model="addForm.dishImage"></el-input>
          </el-form-item>
          <el-form-item label="菜品成本" prop="costPrice">
          <el-input clearable v-model="addForm.costPrice"></el-input>
          </el-form-item>
          <el-form-item label="菜品价格" prop="dishPrice">
          <el-input clearable v-model="addForm.dishPrice"></el-input>
          </el-form-item>
          <el-form-item label="菜品描述" prop="dishDesc">
          <el-input type="textarea" placeholder="请输入内容"
                    autosize clearable v-model="addForm.dishDesc"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addConfirm('addForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!--            修改菜品信息界面           -->
    <el-dialog
        class="dialog-modifyDish"
        title="修改菜品"
        :visible.sync="dialogmodifyVisible"
        @close="closeModify"
        width=420px>
      <span>
        <el-form ref="modifyform" :rules="modifyrules" :model="modifyForm" label-width="70px" class="form-inline-modifyForm">
          <el-form-item label="编号" prop="dishId">
            <el-input :disabled="true" v-model="modifyForm.dishId"></el-input>
          </el-form-item>
          <el-form-item label="菜品名称" prop="dishName">
            <el-input clearable v-model="addForm.dishName"></el-input>
          </el-form-item>
          <el-form-item label="菜品类别" prop="dishType">
            <el-select v-model="addForm.dishType"
                       style="width: 300px"
                       placeholder="菜品类别">
              <el-option label="今日特价" value="今日特价"></el-option>
              <el-option label="人气爆款" value="人气爆款"></el-option>
              <el-option label="夏日果茶" value="夏日果茶"></el-option>
              <el-option label="特色菜肴" value="特色菜肴"></el-option>
              <el-option label="必点小吃" value="必点小吃"></el-option>
              <el-option label="主食" value="主食"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="菜品图片" prop="dishImage">
          <el-input clearable v-model="addForm.dishImage"></el-input>
          </el-form-item>
          <el-form-item label="菜品成本" prop="costPrice">
          <el-input clearable v-model="addForm.costPrice"></el-input>
          </el-form-item>
          <el-form-item label="菜品价格" prop="dishPrice">
          <el-input clearable v-model="addForm.dishPrice"></el-input>
          </el-form-item>
          <el-form-item label="菜品描述" prop="dishDesc">
          <el-input type="textarea" placeholder="请输入内容"
                    autosize clearable v-model="addForm.dishDesc"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyCancel">取 消</el-button>
        <el-button type="primary" @click="modifyConfirm('modifyform')">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogmodifyVisible:false,
      dialogaddVisible:false,
      formInline: {
        id: '',
        name: '',
        staffType:''
      },
      tableData: [{
        dishId: '',
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:'',
        dishState:''
      }],
      addForm:[{
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:''
      }],
      modifyForm:[{
        dishId:'',
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:''
      }]
    }
  },
  mounted() {
    var path = "/Data/dishmanage.json"
    this.axios.get(path).then((response)=>{
      console.log(response)
      //返回的数据赋值
      this.tableData = response.data.data
    })
  },
  methods:{
    changeSwitch(data,b,index){

    },
    search(){
      if(this.formInline.id ===''){
        if(this.formInline.name===''){
          //调用方法searchBydishType
        }else{
          //调用方法searchByName
        }
      }else {
        //调用方法searchById
        /*var path = "/Data/staffmanage.json"
        this.axios.get(path).then((response)=>{
          console.log(response)
          //返回的数据赋值
          this.tableData = response.data.data
        })*/
      }
    },
    editDish(row){
      this.dialogmodifyVisible= true
      //调用方法查询详细信息
      console.log(row.staffId)
      //调用后端方法显示修改之前的信息
      /*var path = "/Data/dishmanage.json"
      this.axios.get(path).then((response)=>{
            console.log(response)
            //返回的数据赋值
            this.modifyForm= response.data.data})*/
    }, modifyConfirm(formName) {

    },modifyCancel(){
      this.dialogmodifyVisible = false
      this.$refs.modifyform.resetFields()
    }, closeModify(){
      this.$message('取消修改！')
      this.$refs.modifyform.resetFields()
    },addDish(){
      this.dialogaddVisible= true
    },addConfirm(formName){

    },addCancel(){
      this.dialogaddVisible = false
      this.$refs.addform.resetFields()
    },
    closeAdd(){
      this.$message('取消添加！')
      this.$refs.addform.resetFields()
    }
  }
}
</script>
<style scoped>
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand {
  font-size: 0;
}
.el-table{
  margin-left: 20px;
  margin-top: 10px;
}
.form-inline{
  margin-top: 50px;
  display: flex;
  justify-content:space-evenly;
}
.table-expand {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>