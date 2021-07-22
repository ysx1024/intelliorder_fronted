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
              v-model="datevalue"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width: 51% ">
          <div id="Histogram" style="width:400px;height:500px;font-size: 20px"></div>
        </el-aside>
        <el-main>
          <div id="Piechart" style="width:400px;height:500px;font-size: 20px"></div>
        </el-main>
      </el-container>
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
    },
    drawHistogram(){
      this.$echarts.init(document.getElementById('Histogram')).setOption({
        title: {

        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    drawPiechart(){
      this.$echarts.init(document.getElementById('Piechart')).setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })

    }
  },
  mounted() {
    this.drawHistogram();
    this.drawPiechart()
  }
}
</script>

<style scoped>
.block{
  display: flex;
  justify-content:space-evenly;
  margin: 50px auto auto auto;
}
.el-aside{
  margin: 120px auto auto 10px;
}
.el-main{
  margin: 120px auto auto auto;
}
</style>