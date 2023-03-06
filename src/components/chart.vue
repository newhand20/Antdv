<template>
  <div ref="chartDom" style="height: 400px;"></div>
</template>

<script>
import echarts from "echarts"
import {onMounted, watch, ref, reactive, onBeforeUnmount} from "vue"
export default {
  props: {
    option:{
      type:Object,
      default:()=>{}
    }
  },

  setup(props,context){
    var myCharts = ref(null)
    const chartDom = ref(null)
    const renderChart = (val) =>{
      
      myCharts.setOption(val,true)
      console.log("props.option",val)
    }

    watch(
      ()=>props.option,
      (val)=> {
        console.log("触发刷新")
        renderChart(val)
      },
      { deep: true }
    )

    onMounted(() => {
      myCharts = echarts.init(chartDom.value)
      renderChart(props.option)
    });

    onBeforeUnmount(()=>{
      myCharts.dispose()
      myCharts = null
    })

    return{
      renderChart,
      myCharts,
      chartDom
    }
  },
  
};
</script>
