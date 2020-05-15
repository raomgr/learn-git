<template>
  <div :class="className" :style="{height:height, width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'
import { debounce } from '@/utils/tools'

export default {
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
      default: '230px'
    },
    name: {
      type: String
    },
    chartData: {
      type: Array
    },
    shape: {
      type: String,
      default: 'polygon'
    },
    indicatorList: {
      type: Array,
      default() {
        return []
      }
    },
    startAngle: {
      type: String,
      default: '90'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    radarSize: {
      type: String,
      default: '70%'
    }
    // legendData: {
    //   type: Array
    // }
  },
  data() {
    return {
      radarchart: null,
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.chartResizeHandle = debounce(() => {
        this.radarchart ? this.radarchart.resize() : null;
      }, 50);
      window.addEventListener("resize", this.chartResizeHandle);
    }

    const sidebarElm = document.getElementsByClassName("el-aside")[0];
    sidebarElm.addEventListener("transitionend", this.chartResizeHandle);
  },
  beforeDestroy() {
    this.radarchart && this.autoResize
      ? window.removeEventListener('resize', this.pieResizeHandle)
      : null
    this.radarchart.dispose()
    this.radarchart = null
  },
  methods: {
    initChart() {
      this.radarchart = echarts.init(this.$el)
      this.radarchart.setOption({
        tooltip: {
          show: false
          // trigger: 'axis',
          // extraCssText: 'box-shadow: 0 2 8px rgba(0, 0, 0, 0.3);'
        },
        legend: {
          left: 'center',
          data: []
        },
        radar: [
          {
            radius: this.radarSize,
            center: ['48%', '50%'],
            // 设置雷达图形状
            shape: this.shape,
            // areaStyle: {
            //   color: '#fff'
            // },
            // 设置坐标轴角度
            startAngle: this.startAngle,
            // 设置分隔区域相关样式
            splitArea: {
              areaStyle: {
                color: '#fff',
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 2
              }
            },
            // 设置分割线的样式
            splitLine: {
              lineStyle: {
                color: '#eaeaea',
                type: 'dashed'
              }
            },
            indicator: this.indicatorList,
            name: {
              textStyle: {
                color: '#798192'
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'cross'
              },
              padding: [10],
              // 设置tooltip的背景色
              backgroundColor: '#fff',
              // borderColor: '#eee',
              // borderWidth: 1,
              // 设置tooltip的文字颜色
              textStyle: {
                color: '#333'
              },
              // 设置tooltip（鼠标悬浮提示框）的阴影
              extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);'
            },

            lineStyle: {
              color: '#17caaf'
            },
            color: '#17caaf',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'liner',
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 2,
                    colorStops: [
                      { offset: 0, color: '#17caaf' },
                      { offset: 1, color: '#fff' }
                    ]
                  },
                  borderColor: '#17caaf'
                }
              }
            },
            data: [
              {
                value: this.chartData,
                name: this.name
              }
            ]
          }
        ]
      })
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.initChart()
      }
    }
  }
}
</script>
