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
import api from "../../util/api.js"
import qs from "qs";

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
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          name:'营业额',
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
        //临时图表数据数组
        let xAxisData = []
        let seriesData = []



        var startmonth = this.timeSection[0]
        var endmonth = this.timeSection[1]
        //时间戳转换日期格式
        let newDate0 = new Date(this.timeSection[0])
        let newDate1 = new Date(this.timeSection[1])

        let year0 = newDate0.getFullYear()
        let month0 = newDate0.getMonth()+1
        let day0 = newDate0.getDate()
        let hour0 = newDate0.getHours()
        let minute0 = newDate0.getMinutes()
        let second0 = newDate0.getSeconds()
        month0 = month0 < 10 ? "0"+month0:month0
        day0 = day0 < 10 ? "0"+day0:day0
        hour0 = hour0 <10 ? "0"+hour0:hour0
        minute0 = minute0 <10?"0"+minute0:minute0
        second0 = second0 <10?"0"+second0:second0

        let year1 = newDate1.getFullYear()
        let month1 = newDate1.getMonth()+1
        let day1 = newDate1.getDate()
        let hour1 = newDate1.getHours()
        let minute1 = newDate1.getMinutes()
        let second1 = newDate1.getSeconds()
        month1 = month1 < 10 ? "0"+month1:month1
        day1 = day1 < 10 ? "0"+day1:day1
        hour1 = hour1 <10 ? "0"+hour1:hour1
        minute1 = minute1 <10?"0"+minute1:minute1
        second1 = second1 <10?"0"+second1:second1

        startmonth = year0+ '-' +month0+ '-' +day0+ ' ' +hour0+ ':' +minute0+ ':' +second0
        endmonth = year1+ '-' +month1+ '-' +day1+ ' ' +hour1+ ':' +minute1+ ':' +second1

        console.log(startmonth)
        console.log(endmonth)
        //调用函数
        /*this.option.series[0].data=
        this.option.xAxis.data=*/
        let  path = api.path + "/bussiness/bussinessdata/queryTotal"
        this.axios.post(path, qs.stringify({
          "startMonth":startmonth,
          "endMonth":endmonth,
        })).then((response) => {
          console.log(response.data.data)
          if(response.data.status==='200'){
            for (let i=0;i<response.data.data.length;i++){
              seriesData = seriesData.concat(parseInt(response.data.data[i].dishProfit))
              let time = response.data.data[i].startDay
              let timearr = time.replace(" ",":").replace(/\:/g,"-").split("-")
              let timestr = timearr[0]+'/'+Number(timearr[1])
              xAxisData = xAxisData.concat(timestr)
            }
            console.log(seriesData)
            this.option.series[0].data=seriesData
            console.log(this.option.series[0].data)
            this.option.xAxis.data=xAxisData

            this.$echarts.init(document.getElementById('Linechart')).setOption(this.option)
          }
        })
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