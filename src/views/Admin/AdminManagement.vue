<template>
  <div class="AdminManagement">
    <AdminHeader></AdminHeader>
    <!--               form表存放查询和添加操作需要的组件            -->
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline"
                   @click="addStaff">增加</el-button>
      </el-form-item>
      <el-form-item label="员工编号:">
        <el-input prefix-icon="el-icon-search"
                  style="width: 130px"
                  clearable
                  v-model="formInline.staffId" placeholder="员工编号"></el-input>
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
          <el-option label="后厨" value="后厨"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search"
                   @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--            添加员工界面           -->
    <el-dialog
        class="dialog-addStaff"
        title="添加员工"
        :visible.sync="dialogaddVisible"
        @close="closeAdd"
        width=420px>
      <span>
        <el-form ref="addform" :rules="addrules" :model="addForm" label-width="70px" class="form-inline-addForm">
          <el-form-item label="姓名" prop="name">
            <el-input clearable v-model="addForm.name"></el-input>
          </el-form-item>
            <el-form-item label="手机号" prop="phone">
          <el-input clearable v-model.number="addForm.phone"></el-input>
            </el-form-item>
          <el-form-item label="职位" prop="staffType">
            <el-radio-group v-model="addForm.staffType">
              <el-radio label="前台"></el-radio>
              <el-radio label="服务员"></el-radio>
              <el-radio label="厨师"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addConfirm('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--            修改员工信息界面           -->
    <el-dialog
        class="dialog-modifyStaff"
        title="修改信息"
        :visible.sync="dialogmodifyVisible"
        width=450px>
      <span>
        <el-form ref="modifyform" :model="modifyForm" :rules="modifyrules" label-width="100px" class="form-inline-modifyForm">
          <el-form-item label="编号" prop="staffId">
            <el-input :disabled="true" v-model="modifyForm.staffId"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input :disabled="true" v-model="modifyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input clearable v-model.number="modifyForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input clearable v-model="modifyForm.account"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码" prop="password">
            <el-input show-password autocomplete="off" v-model="modifyForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmpwd">
            <el-input show-password autocomplete="off" v-model="modifyForm.confirmpwd"></el-input>
          </el-form-item>
          <el-form-item label="选择职位" prop="staffType">
            <el-radio-group v-model="modifyForm.staffType">
              <el-radio label="前台"></el-radio>
              <el-radio label="服务员"></el-radio>
              <el-radio label="厨师"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="modifyCancel">取 消</el-button>
    <el-button type="primary" @click="modifyConfirm('modifyform')">确 定</el-button>
  </span>
    </el-dialog>
    <!--    表格显示员工信息-->
    <el-table
        style="width: 88%"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}"
        :data="tableDataList"
        stripe
        :default-sort = "{prop: 'staffId', order: 'ascending'}">
      <el-table-column
          prop="staffId" label="员工编号" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="account" label="账号">
      </el-table-column>
      <el-table-column prop="password" label="密码">
      </el-table-column>
      <el-table-column prop="staffType" label="员工类型">
      </el-table-column>
      <el-table-column label="  ">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="editStaff(scope.row)" size="small" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="  ">
        <template slot-scope="scope">
          <el-button type="danger"  size="small" icon="el-icon-delete" circle  @click.native.prevent="deleteStaff(scope.row)" ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="  ">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
// @ is an alias to /src
import AdminHeader from '../../components/AdminHeader.vue'
import api from "../../util/api";
import qs from "qs";
export default {
  name: 'AdminManagement',
  components: {
    AdminHeader
  },
  data() {
    var confirmpwdrule = (rule, value, callback) => {
      if (value !== this.modifyForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogaddVisible: false,
      dialogmodifyVisible:false,
      formInline: {
        staffId: '',
        name: '',
        staffType:''
      },
      addForm:{
        name: '',
        phone:'',
        staffType:''
      },
      modifyForm:{
        staffId:'',
        name:'',
        phone:'',
        account:'',
        password:'',
        confirmpwd:'',
        staffType:''
      },
      tableDataList:[{
        dishId: '',
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:'',
        dishState:true
      }],
      tableData: {
        dishId: '',
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:'',
        dishState:true
      },
      addrules:{
        name:[{required:true,message:'　　　请输入员工姓名', trigger: 'blur'}],
        phone:[{required:true,message:'　　　请输入员工手机号', trigger: 'blur'},
          {type: 'number', message: '　　　手机号必须为数字值', trigger: 'blur'},
          {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: '　　　请输入正确的手机号码', trigger: 'blur'}],
        staffType:[{ required: true, message: '　　　请选择员工类型', trigger: 'change' }]
      },
      modifyrules:{
        account:[{required:true,message:'　　　请输入员工账号', trigger: 'blur'}],
        phone:[{required:true,message:'　　　请输入员工手机号', trigger: 'blur'},
          {type: 'number', message: '　　　手机号必须为数字值', trigger: 'blur'},
          {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: '　　　请输入正确的手机号码', trigger: 'blur'}],
        password:[{ required: true, message: '　　　请输入新密码', trigger: 'blur' }],
        confirmpwd:[{ required: true, message: '　　　请再次输入密码确认', trigger: 'blur' },
          { validator: confirmpwdrule, trigger: 'blur' }],
        staffType:[{ required: true, message: '　　　请选择员工类型', trigger: 'change' }]
      }
    }
  },
  methods:{
    //更新数据请求
    upData (){
      let path = api.path + "/user/staff/showStaffList";
      this.axios.get(path).then((response)=>{
        console.log(response)
        //返回的数据赋值
        this.tableDataList = response.data.data
      })
    },
    /*编辑员工信息按钮点击对应事件*/
    editStaff(row){
      this.dialogmodifyVisible= true
      //调用方法查询详细信息
      console.log(row.staffId)
      //调用后端方法显示修改之前的信息
      let path = api.path + "/user/staff/showStaffInfo";
      this.axios.post(path,qs.stringify({
        "staffId":row.staffId})).then((response)=>{
            //返回的数据赋值
            this.modifyForm.staffId=response.data.data.staffId
            this.modifyForm.name=response.data.data.name
            this.modifyForm.phone=response.data.data.phone
            this.modifyForm.account=response.data.data.account
            this.modifyForm.password=response.data.data.password
            this.modifyForm.staffType=response.data.data.staffType})

    },
    modifyConfirm(formName){
      this.$refs.modifyform.validate((valid) => {
        if (valid) {
          this.dialogmodifyVisible = false

          let path = api.path + "/user/staff/updateStaff";
          this.axios.post(path,qs.stringify({"staffId":this.modifyForm.staffId,"phone":this.modifyForm.phone,
          "account":this.modifyForm.account,"password":this.modifyForm.password,"staffType":this.modifyForm.staffType})).
          then((response)=>{
            //成功后刷新表格数据
            this.upData()
          })
          //刷新表单
          this.$refs.modifyform.resetFields()
          //更新
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    modifyCancel(){
      this.dialogmodifyVisible = false
      this.$refs.modifyform.resetFields()
      this.$message.info('取消修改！')
    },
    /*删除员工按钮点击对应事件*/
    deleteStaff(row){
      this.$confirm('此操作将永久删除该员工，是否继续？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(() => {
            console.log(row.staffId)
            let path = api.path + "/user/staff/deleteById";
            this.axios.post(path,qs.stringify({"staffId":row.staffId})).
            then((response)=>{
              console.log(response)
              //成功后刷新表格数据
              this.upData()
            })
            //调用方法数据库删除员工，参数为row.staffId
          });
    },
    /*添加员工按钮显示form表输入员工信息*/
    addStaff(){
      this.dialogaddVisible= true
    },
    /* 确认添加员工调用后端方法并隐藏form表*/
    addConfirm(formName){
      this.$refs.addform.validate((valid) => {
        if (valid) {
          this.dialogaddVisible = false

          let path = api.path + "/user/staff/addStaff";
          this.axios.post(path,qs.stringify({"name":this.addForm.name,"phone":this.addForm.phone, "staffType":this.addForm.staffType})).
          then((response)=>{
            //成功后刷新表格数据
            this.upData()
          })
          //每次提交之后刷新表单
          this.$refs.addform.resetFields()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    /* 取消添加员工弹出消息提示隐藏form表*/
    addCancel(){
      this.dialogaddVisible = false
      this.$refs.addform.resetFields()
      this.$message('取消添加！')
    },
    closeAdd(){
      this.$refs.addform.resetFields()
    },
    /*搜索按钮点击对应事件*/
    search(){
      let path
      if(this.formInline.staffId ===''){
        if(this.formInline.name===''){
          //调用方法getStaffByType
          path = api.path + "/user/staff/getStaffByType";
          this.axios.post(path,qs.stringify({"staffType":this.formInline.staffType})).then((response) => {
            console.log(response)
            this.tableDataList = response.data.data
          })
        }else {
          //调用方法getStaffByName
          path = api.path + "/user/staff/getStaffByName";
          this.axios.post(path, qs.stringify({"name": this.formInline.name})).then((response) => {
            console.log(response)
            this.tableDataList = response.data.data
          })
        }
      }else {
        //调用方法getStaffById
        path = api.path + "/user/staff/getStaffById";
        this.axios.post(path,qs.stringify({"staffId":this.formInline.staffId})).then((response) => {
          console.log(response)
          this.tableData = response.data.data
          this.tableDataList=[]
          this.tableDataList.push(this.tableData)
        })
      }
    }
  },
  mounted() {
    /*页面渲染时显示所有员工信息*/
    let path = api.path + "/user/staff/showStaffList";
    this.axios.get(path).then((response)=>{
      //返回的数据赋值
      this.tableDataList = response.data.data
    })
  }
}
</script>
<style scoped>
.el-table{
  margin-left: 5.5%;
  margin-top: 10px;
}
.form-inline{
  margin-top: 50px;
  display: flex;
  justify-content:space-evenly;
}
.form-inline-addForm{
}
.el-input{
  width:250px
}
</style>
