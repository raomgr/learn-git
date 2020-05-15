<template>
  <div 
    :class="className" 
    :style="{height: height,width: width}">
  </div>
</template>

<script>
import echarts from "echarts";
// import "echarts/theme/macarons";
// import "echarts/theme/xdycp";
import { debounce, randomIntegerInRange } from "@/utils/tools";

// const xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "96%"
    },
    height: {
      type: String,
      default: "430px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    },
    days: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      chart: null,
      
    };
  },
  mounted() {
    // 初始化eCharts
    this.initChart();

    // 图表自动缩放
    if (this.autoResize) {
      this.chartResizeHandle = debounce(() => {
        this.chart ? this.chart.resize() : null;
      }, 50);
      window.addEventListener("resize", this.chartResizeHandle);
    }

    // 如果侧边栏收起,图表也会进行缩放
    const sidebarElm = document.getElementsByClassName("el-aside")[0];
    sidebarElm.addEventListener("transitionend", this.chartResizeHandle);

    let { xAxisData, seriesData } = this.chartData;

    // xAxisData.shift();
    // seriesData.shift();
    // xAxisData.push(randomIntegerInRange(2000, 4600));
    // seriesData.push(randomIntegerInRange(2000, 4600));

    // this.chart.setOption({
    //   series: [
    //     {
    //       name: "PS4 Player",
    //       data: PS4PlayerData
    //     },
    //     {
    //       name: "NS Player",
    //       data: NSPlayerData
    //     }
    //   ]
    // });
  },
  beforeDestroy() {
    this.chart && this.autoResize
      ? window.removeEventListener("resize", this.chartResizeHandle)
      : null;

    const sidebarElm = document.getElementsByClassName("el-aside")[0];
    sidebarElm
      ? sidebarElm.removeEventListener("transitionend", this.chartResizeHandle)
      : null;

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setChartOptions(val);
      }
    }
  },
  methods: {
    setChartOptions({ xAxisData, seriesData } = {}) {
      this.chart.setOption({
        color: ['#17caaf'],
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴指示器，坐标轴触发有效
            type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#283550'
          },
          extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);'
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : xAxisData,
            axisTick: {
              // alignWithLabel: true,
              show: false,
              
            },
            axisLabel: {
              color: '#798192'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(40,53,80,.6)'
              }
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#798192'
            }
          }
        ],
        series : [
          {
            type:'bar',
            barWidth: '8px',
            data: seriesData
          }
        ],
        itemStyle: {
          barBorderRadius: [10,10,0,0]
        }
      });
    },
    // 初始化 echarts 函数
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setChartOptions(this.chartData);
    }
  }
};
</script>
