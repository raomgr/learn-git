<template>
  <div :class="className" :style="{height:height, width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'
import { debounce } from '@/utils/tools'

export default {
  name: 'index',
  data() {
    return {
      stackedChart: null,
      autoResize: {
        type: Boolean,
        default: true
      }
    }
  },
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.chartResizeHandle = debounce(() => {
        this.stackedChart ? this.stackedChart.resize() : null;
      }, 50);
      window.addEventListener("resize", this.chartResizeHandle);
    }

    const sidebarElm = document.getElementsByClassName("el-aside")[0];
    sidebarElm.addEventListener("transitionend", this.chartResizeHandle);
  },
  beforeDestroy() {
    this.stackedChart && this.autoResize
      ? window.removeEventListener('resize', this.pieResizeHandle)
      : null
    this.stackedChart.dispose()
    this.stackedChart = null
  },
  methods: {
    initChart() {
      this.stackedChart = echarts.init(this.$el)
      this.stackedChart.setOption({
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: '#333'
          },
          // 设置tooltip（鼠标悬浮提示框）的阴影
          extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);'
        },
        legend: {
          right: '50px',
          data: ['人工智能', '深度学习']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // 可以将统计图保存为图片
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '2018/12/23', '2018/12/24', '2018/12/25', '2018/12/26', '2018/12/27', '2018/12/28', '2018/12/29'
          ]
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          // Y轴刻度线隐藏
          axisTick: {
            show: false
          },
        },
        series: [
          {
            name: '人工智能',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            lineStyle: {
              color: '#17caaa'
            },
            itemStyle: {
              color: '#17caaa'
            }
          },
          {
            name: '深度学习',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            lineStyle: {
              color: '#6E5CDC'
            },
            itemStyle: {
              color: '#6E5CDC'
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>