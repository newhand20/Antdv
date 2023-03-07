<template>
  <div >
    <Chart :option="chartOption"></Chart>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from "../../components/chart.vue"
import random from 'lodash/random'
import {onMounted, onBeforeMount, ref,reactive} from "vue"
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
                data: []
              }
            ]
     })
    const getChartData=()=>{
      axios
        .get("/api/dashboard/chart",{ params:{id: 123456}} )
        .then((res)=>{
          chartOption.series[0].data = res.data
        })
    }

    // const Interval = ()=> setInterval(()=>{
    //   getChartData()
    //   // console.log("计时器",chartOption.series[0].dasta)
    // }, 3000)

    onMounted(() => {
      getChartData()
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
  