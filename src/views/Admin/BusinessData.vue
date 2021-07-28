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
              type="daterange"
              value-format="timestamp"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="draw"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-header>
<!--      <el-container>
        <el-aside style="width: 47% ">
          <div id="Histogram" style="width:495px;height:500px;font-size: 12px"></div>
        </el-aside>
        <el-main>
          <div id="Piechart" style="width:538px;height:500px;font-size: 20px"></div>
        </el-main>
      </el-container>-->
      <div id="Histogram" class="Histogram" style="width:900px;height:500px;font-size: 20px"></div>
      <div id="Piechart" class="Piechart" style="width:820px;height:500px;font-size: 20px"></div>

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
      },
      hisoption:{
        title: {
          /*text: '菜品销量图',
          textStyle:{
            fontsize:20
          },*/
          /*subtext: '',
          left: 'center'*/
        },
        tooltip: {
          trigger: 'axis',//触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据
          axisPointer: {//坐标轴指示器，坐标轴触发有效，shadow阴影
            type: 'shadow'
          }
        },
        legend: {
          data:['菜品销量']
        },
        xAxis: {
          type: 'category',
          data: ["米饭","油泼面","酱烧肘子","油焖大虾","红烧鲫鱼","蒜蓉茄子","花香金鱼","夏日冰饮","毛毛菇炒蛋","宫保鸡丁"],
          axisLabel:{interval:0,rotate: 20}//当数量多时也全部显现
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          barWidth:35,
          data: [30, 46, 36, 53, 42, 39,50,83,66,40]
        }]
      },
      pieoption:{
        title: {
          text: '菜品销售利润',
          textStyle:{
            fontsize:30
          },
          subtext: '',
          left: 'center'
        },
        color:['#5470c6','#91cc75','#fac858','#ee6666','#73c0de','#3ba272','#fc8452','#b4a7d6','#a2c4c9','#eea2ad'],
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
            radius: '80%',
            data: [
              {value: 1048, name: '米饭'},
              {value: 735, name: '油泼面'},
              {value: 580, name: '酱烧肘子'},
              {value: 484, name: '红烧鲫鱼'},
              {value: 500, name: '蒜蓉茄子'},
              {value: 340, name: '花香金鱼'},
              {value: 230, name: '夏日冰饮'},
              {value: 672, name: '毛毛菇炒蛋'},
              {value: 620, name: '宫保鸡丁'},
              {value: 535, name: '油焖大虾'}
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
      }
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    draw(){
      console.log(this.timeSection)
      var startdate = this.timeSection[0]
      var enddate = this.timeSection[1]
      let newDate0 = new Date(this.timeSection[0])
      let newDate1 = new Date(this.timeSection[1])
      startdate =newDate0.toLocaleDateString().replace(/\//g, "-") + " " + newDate0.toTimeString().substr(0, 8)
      enddate = newDate1.toLocaleDateString().replace(/\//g, "-") + " " + newDate1.toTimeString().substr(0, 8)
      console.log(startdate)
      console.log(enddate)
      //调用函数
      /*this.hisoption.xAxis.data=
      this.hisoption.series[0].data=
      this.pieoption.series[0].data=*/
      this.$echarts.init(document.getElementById('Histogram')).setOption(this.hisoption)
      this.$echarts.init(document.getElementById('Piechart')).setOption(this.pieoption)
    }
  },
  mounted() {
    this.draw()
  }
}
</script>

<style scoped>
.block{
  display: flex;
  justify-content:space-evenly;
  margin: 50px auto auto auto;
}
.Histogram{
  display: flex;
  justify-content:space-evenly;
  margin: 90px auto auto auto;
}
.Piechart{
  display: flex;
  justify-content:space-evenly;
  margin: 90px auto auto auto;
}
/*.el-aside{
  margin: 120px auto auto 10px;
}
.el-main{
  margin: 120px auto auto auto;
}*/
</style>