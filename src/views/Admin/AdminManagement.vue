<template>
  <div class="AdminManagement">
  <AdminHeader></AdminHeader>
<!--               form表存放查询和添加操作需要的组件            -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline"
                   @click="addStaff">增加</el-button>
      </el-form-item>
      <el-form-item label="员工编号:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 130px"
                  clearable
                  v-model="formInline.id" placeholder="员工编号"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 130px"
                  clearable
                  v-model="formInline.name"
                  placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="员工职位:">
        <el-select v-model="formInline.staffType"
                   style="width: 130px"
                   clearable
                   placeholder="员工职位">
          <el-option label="前台" value="前台"></el-option>
          <el-option label="服务员" value="服务员"></el-option>
          <el-option label="厨师" value="厨师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search"
                   @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
<!--            添加员工界面           -->
    <el-dialog
        title="添加员工"
        :visible.sync="dialogVisible"
        width="60%">
      <span>
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item label="员工姓名">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
            <el-form-item label="员工手机号">
          <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
          <el-form-item label="员工职位">
            <el-radio-group v-model="addForm.staffTpye">
              <el-radio label="前台"></el-radio>
              <el-radio label="服务员"></el-radio>
              <el-radio label="厨师"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addStaffCancel">取 消</el-button>
    <el-button type="primary" @click="addStaffConfirm">确 定</el-button>
  </span>
    </el-dialog>
    <!--    表格显示员工信息-->
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
      <el-table-column prop="staffTpye" label="员工类型" width="180">
      </el-table-column>
      <el-table-column label="  " width="140">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="editStaff(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="  " width="80">
        <template slot-scope="scope">
          <el-button type="danger"  icon="el-icon-delete" circle  @click.native.prevent="deleteStaff(scope.row)" ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
// @ is an alias to /src
import AdminHeader from '../../components/AdminHeader.vue'
import api from "../../util/api";
export default {
  name: 'AdminManagement',
  components: {
    AdminHeader
  },
  data() {
    return {
      dialogVisible: false,
      formInline: {
        id: '',
        name: '',
        staffType:''
      },
      addForm:{
        name: '',
        phone:'',
        staffTpye:''
      },
      tableData:[{
        id:'',
        name:'',
        phone:'',
        account:'',
        password:'',
        staffTpye:''
      }]
    }
  },
  methods:{
    /*编辑员工信息按钮点击对应事件*/
    editStaff(row){
      //调用方法查询详细信息
      console.log(row.id)
    },
    /*删除员工按钮点击对应事件*/
    deleteStaff(row){
      this.$confirm('此操作将永久删除该员工，是否继续？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      })
          .then(() => {
            console.log(row.id)
            //调用方法数据库删除员工
            /*if(response.data.status==='200'){
              this.$message({
                message: '删除成功!',
                type: 'success'
              })
            }else if(response.data.status==='404'){
              this.$message.error('找不到员工信息！')
            }else{
              this.$message.error('发生错误！')
            }*/
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                  ? '取消删除！'
                  : '取消删除！'
            })
          });
    },
    /*添加员工按钮显示form表输入员工信息*/
    addStaff(){
      this.dialogVisible= true
    },
   /* 确认添加员工调用后端方法并隐藏form表*/
    addStaffConfirm(){
      this.dialogVisible = false
      //调用方法数据库添加员工
      /*if(response.data.status==='200'){
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
      }else if(response.data.status==='404'){
        this.$message.error('请求失败！')
      }else{
        this.$message.error('发生错误！')
      }*/
    },
    /* 取消添加员工弹出消息提示隐藏form表*/
    addStaffCancel(){
      this.dialogVisible = false
      this.$message('取消添加！')
    },
    /*搜索按钮点击对应事件*/
    search(){
      if(this.formInline.id ===''){
        if(this.formInline.name===''){
          //调用方法searchByStaffType
        }else{
          //调用方法searchByName
        }
      }else {
        //调用方法searchById
        var path = "/Data/staffmanage.json"
        this.axios.get(path).then((response)=>{
          console.log(response)
          //返回的数据赋值
          this.tableData = response.data.data
        })
      }
    }
  },
  mounted() {
    /*页面渲染时显示所有员工信息*/
    var path = "/Data/staffmanage.json"
    this.axios.get(path).then((response)=>{
      console.log(response)
      //返回的数据赋值
      this.tableData = response.data.data
    })
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
