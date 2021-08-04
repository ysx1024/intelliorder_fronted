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
        <el-select v-model="formInline.type"
                   style="width: 130px"
                   clearable
                   placeholder="菜品类别">
          <el-option label="招牌必点" value="招牌必点"></el-option>
          <el-option label="开胃凉菜" value="开胃凉菜"></el-option>
          <el-option label="地方名吃" value="地方名吃"></el-option>
          <el-option label="特色主食" value="特色主食"></el-option>
          <el-option label="精致甜点" value="精致甜点"></el-option>
          <el-option label="新鲜水果" value="新鲜水果"></el-option>
          <el-option label="夏日饮品" value="夏日饮品"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search"
                   @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--               table表显示菜品                -->
    <el-table
        style="width: 88%"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}"
        :data="tableDataList"
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
      <el-table-column sortable label="菜品编号" prop="dishId">
      </el-table-column>
      <el-table-column
          prop="dishImage"
          label="菜品图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.dishImage" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="菜品名称" prop="dishName">
      </el-table-column>
      <el-table-column label="菜品售价" prop="dishPrice">
      </el-table-column>
      <el-table-column label="下架/上架" prop="dishState">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.dishState" active-text=" " inactive-text=" "
                     @change="changeSwitch($event,scope.row,scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="  ">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="editDish(scope.row)" size="small" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="  ">
      </el-table-column>
    </el-table>
    <!--                   添加菜品界面             -->
    <el-dialog
        class="dialog-addDish"
        title="添加菜品"
        :visible.sync="dialogAddVisible"
        @close="closeAdd"
        width=420px>
      <span>
        <el-form ref="addform" :rules="addRules" :model="addForm" label-width="100px" class="form-inline-addForm">
          <el-form-item label="菜品名称" prop="dishName">
            <el-input clearable v-model="addForm.dishName"></el-input>
          </el-form-item>
          <el-form-item label="菜品类别" prop="dishType">
            <el-select v-model="addForm.dishType"
                       style="width: 280px"
                       placeholder="菜品类别">
              <el-option label="招牌必点" value="招牌必点"></el-option>
              <el-option label="开胃凉菜" value="开胃凉菜"></el-option>
              <el-option label="地方名吃" value="地方名吃"></el-option>
              <el-option label="特色主食" value="特色主食"></el-option>
              <el-option label="精致甜点" value="精致甜点"></el-option>
              <el-option label="新鲜水果" value="新鲜水果"></el-option>
              <el-option label="夏日饮品" value="夏日饮品"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="菜品图片" prop="dishImage">
            <el-upload
                class="avatar-uploader"
                action="http://upload-z2.qiniup.com"
                :data="postData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
                :before-upload="beforeAvatarUpload">
                <el-image v-if="imageUrl" :src="imageUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

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
        :visible.sync="dialogModifyVisible"
        @close="closeModify"
        width=420px>
      <span>
        <el-form ref="modifyform" :rules="modifyRules" :model="modifyForm" label-width="100px" class="form-inline-modifyForm">
          <el-form-item label="编号" prop="dishId">
            <el-input :disabled="true" v-model="modifyForm.dishId"></el-input>
          </el-form-item>
          <el-form-item label="菜品名称" prop="dishName">
            <el-input clearable v-model="modifyForm.dishName"></el-input>
          </el-form-item>
          <el-form-item label="菜品类别" prop="dishType">
            <el-select v-model="modifyForm.dishType"
                       style="width: 280px"
                       placeholder="菜品类别">
              <el-option label="招牌必点" value="招牌必点"></el-option>
              <el-option label="开胃凉菜" value="开胃凉菜"></el-option>
              <el-option label="特色主食" value="特色主食"></el-option>
              <el-option label="精致甜点" value="精致甜点"></el-option>
              <el-option label="新鲜水果" value="新鲜水果"></el-option>
              <el-option label="夏日饮品" value="夏日饮品"></el-option>
              <el-option label="地方名吃" value="地方名吃"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="菜品图片" prop="dishImage">
            <el-upload
                class="avatar-uploader"
                action="http://upload-z2.qiniup.com"
                :data="postData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
                :before-upload="beforeAvatarUpload">
                <el-image v-if="imageUrl" :src="imageUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="菜品成本" prop="costPrice">
          <el-input clearable v-model="modifyForm.costPrice"></el-input>
          </el-form-item>
          <el-form-item label="菜品价格" prop="dishPrice">
          <el-input clearable v-model="modifyForm.dishPrice"></el-input>
          </el-form-item>
          <el-form-item label="菜品描述" prop="dishDesc">
          <el-input type="textarea" placeholder="请输入内容"
                    autosize clearable v-model="modifyForm.dishDesc"></el-input>
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
import api from "@/util/api";
import qs from "qs";

export default {

  name: 'AdminDishManage',

  components: {
    AdminHeader
  },

  data() {
    return {

      dialogModifyVisible:false,
      dialogAddVisible:false,

      imageUrl: '',
      domainName: 'http://qx39axhir.hn-bkt.clouddn.com/',
      postData: {
        // 填写你的Token
        token: 'KKzyOI0xy6nFemdh4dyeomGOIOCx_GEgUcgvGOdC:rKmMc8qle1aMjkQhkIds385pkxU=:eyJzY29wZSI6ImludGVsbGlvcmRlciIsImRlYWRsaW5lIjoxNjI3ODg4NTM4fQ==',
      },
      formInline: {
        id: '',
        name: '',
        type:''
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
      addForm:{
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:''
      },
      modifyForm:{
        dishId:'',
        dishName: '',
        dishType:'',
        dishPrice:'',
        dishImage: '',
        dishDesc:'',
        costPrice:''
      },
      addRules:{
        dishName:[{required:true,message:'请输入菜品名称', trigger: 'blur'}],
        dishType:[{ required: true, message: '请选择菜品类型', trigger: 'change' }],
        dishImage:[{message:'请添加菜品图片', trigger: 'blur'}],
        costPrice:[{required:true,message:'请输入菜品成本', trigger: 'blur'}],
        dishPrice:[{required:true,message:'请输入菜品价格', trigger: 'blur'}],
        dishDesc:[{message:'请输入菜品描述', trigger: 'blur'}]
      },
      modifyRules:{
        dishName:[{required:true,message:'请输入菜品名称', trigger: 'blur'}],
        dishType:[{  message: '请选择菜品类型', trigger: 'change' }],
        dishImage:[{message:'请添加菜品图片', trigger: 'blur'}],
        costPrice:[{message:'请输入菜品成本', trigger: 'blur'}],
        dishPrice:[{message:'请输入菜品价格', trigger: 'blur'}],
        dishDesc:[{message:'请输入菜品描述', trigger: 'blur'}]
      }
    }
  },


  mounted() {
    this.update()
  },

  methods:{

    handleAvatarSuccess(res, file) {
      console.log('上传成功');
      this.$message({
        message: '上传成功!',
        type: 'success'
      })
      console.log(res);
      this.imageUrl=this.domainName+res.key;
      console.log(this.imageUrl);
      this.modifyForm.dishImage=this.imageUrl
      this.addForm.dishImage=this.imageUrl
    },

    beforeAvatarUpload(file) {
      const isImage = file.type.includes("image");
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传的格式必须是图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },

    handleError(){
      this.$message.error("上传失败,请重新上传图片!");
    },



    changeSwitch(event,row,index){
      let path = api.path + "/dish/dish/updateDishState";
      this.axios.post(path,qs.stringify({"dishId":row.dishId})).then((response) => {
        console.log(response)

        if(response.data.status==='200'){
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
        }else if(response.data.status==='404'){
          this.$message.error('请求失败！')
        }else{
          this.$message.error('发生错误！')
        }
        this.update()
      })

    },

    update(){
      let path = api.path + "/dish/dish/showDishList";
      this.axios.get(path).then((response)=>{
        console.log(response)
        //返回的数据赋值
        this.tableDataList = response.data.data
      })
    },

    search(){
      let path
      if(this.formInline.id ===''){
        if(this.formInline.name===''){
          //调用方法getDishType
          path = api.path + "/dish/dish/getDishType";
          this.axios.post(path,qs.stringify({"dishType":this.formInline.type})).then((response) => {
            console.log(response)
            this.tableDataList = response.data.data
          })
        }else {
          //调用方法getDishName
          path = api.path + "/dish/dish/getDishName";
          this.axios.post(path, qs.stringify({"dishName": this.formInline.name})).then((response) => {
            console.log(response)
            this.tableDataList = response.data.data
          })
        }
      }else {
        //调用方法getDishId
        path = api.path + "/dish/dish/getDishId";
        this.axios.post(path,qs.stringify({"dishId":this.formInline.id})).then((response) => {
          console.log(response)
          this.tableData = response.data.data
          this.tableDataList=[]
          this.tableDataList.push(this.tableData)
        })
      }
    },

    editDish(row){
      this.dialogModifyVisible= true
      //调用方法查询详细信息
      let path = api.path + "/dish/dish/getDishId";
      this.axios.post(path,qs.stringify({"dishId":row.dishId})).then((response) => {
        console.log(response)
        this.modifyForm = response.data.data
        this.imageUrl=response.data.data.dishImage
      })
      //调用后端方法显示修改之前的信息
    },

    modifyConfirm() {
      let path = api.path + "/dish/dish/updateDish";
      this.axios.post(path,qs.stringify({
        "dishId":this.modifyForm.dishId,
        "dishName":this.modifyForm.dishName,
        "dishType":this.modifyForm.dishType,
        "dishPrice":this.modifyForm.dishPrice,
        "dishImage":this.modifyForm.dishImage,
        "dishDesc":this.modifyForm.dishDesc,
        "costPrice":this.modifyForm.costPrice
      })).then((response) => {
        console.log(response)
        this.dialogModifyVisible = false
        if(response.data.status==='200'){
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
        }else if(response.data.status==='404'){
          this.$message.error('请求失败！')
        }else if(response.data.status==='304'){
          this.$message({
            message: '信息无变动！',
            type: 'warning'
          })
        }else{
          this.$message.error('发生错误！')
        }
      })

    },

    modifyCancel(){
      this.dialogModifyVisible = false
      this.$refs.modifyform.resetFields()
      this.$message.info('取消修改！')
    },

    closeModify(){
      this.$refs.modifyform.resetFields()
      this.imageUrl=''
      this.update()
    },

    addDish(){
      this.dialogAddVisible= true
    },

    addConfirm(){
      let path = api.path + "/dish/dish/addDish";
      this.axios.post(path,qs.stringify({
        "dishName":this.addForm.dishName,
        "dishType":this.addForm.dishType,
        "dishPrice":this.addForm.dishPrice,
        "dishImage":this.addForm.dishImage,
        "dishDesc":this.addForm.dishDesc,
        "costPrice":this.addForm.costPrice
      })).then((response) => {
        console.log(response)
      })
      this.dialogAddVisible = false
      this.update()
    },

    addCancel(){
      console.log(this.imageUrl)
      this.dialogAddVisible = false
      this.$refs.addform.resetFields()
      this.$message('取消添加！')
      this.update()
    },

    closeAdd(){
      this.$refs.addform.resetFields()
      this.imageUrl=''
      this.update()
    }
  }
}
</script>
<style scoped>
.el-table{
  margin-left: 5.5%;
  margin-top: 10px;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
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
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar1-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar1-uploader:hover {
  border-color: #409EFF;
}
.avatar1-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar1 {
  width: 178px;
  height: 178px;
  display: block;
}
</style>