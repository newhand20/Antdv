<template>
  <div >
    <Chart :option="chartOption"></Chart>
  </div>
</template>

<script>
import Chart from "../../components/chart.vue"
import random from 'lodash/random'
import {onMounted, ref,reactive} from "vue"
export default {
  setup(){
    let chartOption = reactive({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]      
    })

    const Interval = ()=> setInterval(()=>{
        chartOption.series[0].data = chartOption.series[0].data.map(()=>random(100))
        
        chartOption = {...chartOption}
        console.log("计时器",chartOption.series[0].data)
      }, 3000)
    onMounted(()=>{
      Interval()
    })
    return {
      chartOption
    }
  },
  components:{
    Chart
  }
};
</script>
  