<template>
  <div class="BusinessData">
    <AdminHeader></AdminHeader>
    <div class="colmenu">
      <el-col style="width: 14% ">
        <el-menu
            :default-active="this.$route.path"
            @select="handleSelect"
            router
            active-text-color=""
            class="menu-vertical">
          <el-menu-item index="/admin/businessdata">
            <i class="el-icon-s-data"></i>
            <span>菜品销量</span>
          </el-menu-item>
          <el-menu-item index="/admin/totalbusiness">
            <i class="el-icon-data-line"></i>
            <span slot="title">营业额&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <el-container>
      <el-header>
        <div class="block">
          <el-date-picker
              v-model="timeSection"
              type="monthrange"
              value-format="timestamp"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              @change="drawLinechart"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-header>
      <el-main>
        <div id="Linechart" style="width:800px;height:400px;font-size: 20px"></div>
      </el-main>
    </el-container>
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
      timeSection:[],
      pickerOptions: {
        disabledDate:(time)=>{
          return this.dealDisabledDate(time);
        },
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      option:{
        title: {
          text: '总销售额',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['一月','二月','三月','四月','五月','六月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [18000,22500,30000,27800,26080,24300],
          type: 'line'
        }]
      }
    }
  },
  methods:{
    dealDisabledDate(time){
      var times=Date.now();
      return time.getTime()>times;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    drawLinechart(){
      if(this.timeSection!==null){
        console.log(this.timeSection)
        var startmonth = this.timeSection[0]
        var endmonth = this.timeSection[1]
        let newDate0 = new Date(this.timeSection[0])
        let newDate1 = new Date(this.timeSection[1])
        startmonth =newDate0.toLocaleDateString().replace(/\//g, "-") + " " + newDate0.toTimeString().substr(0, 8)
        endmonth = newDate1.toLocaleDateString().replace(/\//g, "-") + " " + newDate1.toTimeString().substr(0, 8)
        console.log(startmonth)
        console.log(endmonth)
        //调用函数
        /*this.option.series[0].data=
        this.option.xAxis.data=*/
        this.$echarts.init(document.getElementById('Linechart')).setOption(this.option)
      }
    }
  },
  mounted() {
    this.drawLinechart()
  }
}
</script>

<style scoped>
.block{
  display: flex;
  justify-content:space-evenly;
  margin: 50px auto auto auto;
}
.el-main{
  margin: 100px auto auto auto;
}
</style>