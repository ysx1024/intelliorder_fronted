<template>
  <div class="BusinessData">
  <AdminHeader></AdminHeader>
    <div class="colmenu">
    <el-col style="width: 14% ">
      <el-menu
          :default-active="this.$route.path"
          @select="handleSelect"
          default-active="1"
          router
          class="menu-vertical">
        <el-menu-item index="/admin/businessdata">
          <i class="el-icon-menu"></i>
          <span>菜品销量</span>
        </el-menu-item>
        <el-menu-item index="/admin/businessdata">
          <i class="el-icon-zoom-in"></i>
          <span slot="title">营业额&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </div>
    <div class="block">
      <el-date-picker
          v-model="datevalue"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
      </el-date-picker>
    </div>
  </div>


</template>

<script>
import AdminHeader from "../../components/AdminHeader";

export default {
  name: "BusinessData",
  components: {
    AdminHeader
  },
  data(){
    return{
      datevalue:'',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.block{
  margin: 30px auto auto 50px;
}
</style>