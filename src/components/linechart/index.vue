<template>
  <div :class="className" :style="{height: height,width: width}"></div>
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
      default: "100%"
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
    },
    hundred: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
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
        // console.log(val);
        this.setChartOptions(val);
      }
    }
  },
  methods: {
    setChartOptions({ xAxisData = [], seriesData = [] } = {}) {
      let chartOption = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          // X轴对应刻度的文字数据
          data: xAxisData,
          // X轴的显示及颜色
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(40, 53, 80, .8)"
            }
          },
          // 刻度线隐藏
          axisTick: {
            show: false
          },
          // 刻度文字颜色
          axisLabel: {
            color: "#798192"
          }
        },
        yAxis: {
          type: "value",
          nameLoaction: "end",
          // Y轴隐藏
          axisLine: {
            show: false
          },
          // Y轴刻度线隐藏
          axisTick: {
            show: false
          },
          // Y轴的分割线显示,并且为虚线
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          },
          // 刻度文字颜色
          axisLabel: {
            color: "#798192"
          }
        },
        title: {
          // top: '20'
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            // Y轴对应刻度的文字数据
            // data: seriesData,
            type: "line",
            // 区域样式线性颜色渐变,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#17caaf" },
                  { offset: 1, color: "#fff" }
                ]
              }
            },
            // 趋势线的颜色
            lineStyle: {
              color: "#17caaf"
            },
            // 折点的颜色
            itemStyle: {
              color: "#17caaf"
            }
          }
        ],
        tooltip: {
          trigger: "axis",
          // 鼠标投影到XY轴上的文字背景颜色
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          // 折点提示文字的背景颜色
          backgroundColor: "#fff",
          // 折点提示文字的颜色
          textStyle: {
            color: "#283550"
          },
          extraCssText: "box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);",
          formatter: null
        },
        grid: {
          left: "50",
          right: "50"
        }
      };
      if (this.hundred) {
        chartOption.yAxis.axisLabel.formatter = "{value}%";
        chartOption.yAxis.max = 100;
        chartOption.series[0].data = seriesData.map(item => {
          return item * 100 > 100 ? 100 : item * 100;
        });
        // 设置tooltip的显示数据为百分比
        chartOption.tooltip.formatter = function(data) {
          // console.log(data)
          let res = data[0].name + "<br/>"
          let val
          for (let i = 0, length = data.length; i < length; i++) {
              val = data[i].value.toFixed(0)+ "%"
              res += val + "<br/>"
          }
          return res;
        }
      } else {
        chartOption.yAxis.axisLabel.formatter = "{value}";
        chartOption.yAxis.max = null;
        chartOption.series[0].data = seriesData;
        chartOption.tooltip.formatter = null;
      }
      this.chart.setOption(chartOption);
    },
    // 初始化 echarts 函数
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setChartOptions(this.chartData);
    }
  }
};
</script>
