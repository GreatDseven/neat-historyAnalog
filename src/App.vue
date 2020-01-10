<template>
  <div class="wrap">
    <h1>历史模拟量展示图</h1>
    <div class="header">
      <div class="code">
        <el-input v-model="code" placeholder="请输入code"></el-input>
      </div>
      <div class="differ">
        <span>差量值:</span>
        <div class="differfrom">
          <el-input v-model="differFrom"></el-input>
        </div>
        <span>至</span>
        <div class="differto">
          <el-input v-model="differTo"></el-input>
        </div>
      </div>

      <div class="analogType">
        <el-input v-model="analogType" placeholder="请输入模拟量类型"></el-input>
      </div>
      <span>xxx</span>
      <div class="xxx">
        <el-input v-model="xxx" placeholder="请输入模拟量类型"></el-input>
      </div>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-button type="ç" icon="el-icon-search" @click="login">搜索</el-button>
    </div>
    <section>
      <div class="list">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="730"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="occurrTime" label="日期" width="100"></el-table-column>
          <el-table-column prop="code" label="code" width="80"></el-table-column>
          <el-table-column prop="differ" label="differ" width="80"></el-table-column>
        </el-table>
      </div>
      <div id="main"></div>
    </section>
  </div>
</template>

<script>
import echarts from "echarts";
// 组件化开发 把一个项目分成若干个组件       类似于我们之前的公共样式和公共js
export default {
  // 小名 不能和 html 的标签名一样 一般都是小写的，一般是必须的
  name: "app",
  data() {
    return {
      data: [],
      code: "",
      analogType: "135",
      differFrom: "",
      differTo: "",
      value1: "",
      value2: "",
      tableData: [],
      currentRow: null,
      result: "",
      xxx: ""
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("main"));
    this.login();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
      this.result = val.values;
      //console.log(this.tableData);
      var option = {
        tooltip: {
          show: true
        },

        calculable: true,
        xAxis: {
          data: this.result,
          type: "category"
          //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.result,
            type: "line",
            smooth: true
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    open() {
      const h = this.$createElement;

      this.$notify({
        title: "错误信息",
        message: h("i", { style: "color: teal" }, "请填写正确信息")
      });
    },
    login() {
      this.$axios
        .get(
          "http://39.104.187.162:9004/openapi/AnalogHistory/QueryNbAnalogType",
          {
            params: {
              code: this.code
            }
          }
        )
        .then(res => {});
      this.$axios
        .get(
          "http://39.104.187.162:9004/openapi/AnalogHistory/QueryNbHistoryAnalog",
          {
            params: {
              code: this.code,
              analogType: this.analogType,
              differFrom: this.differFrom,
              differTo: this.differTo,
              start: this.value1,
              end: this.value2
            }
          }
        )
        .then(res => {
          this.tableData = res.data.result;
          //this.result = res.data.result[0].values;
          // console.log(this.tableData);
          var option = {
            tooltip: {
              show: true
            },
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 10
              },
              {
                start: 0,
                end: 10,
                handleIcon:
                  "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                handleSize: "80%",
                handleStyle: {
                  color: "#fff",
                  shadowBlur: 3,
                  shadowColor: "rgba(0, 0, 0, 0.6)",
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
                }
              }
            ],
            xAxis: {
              type: "category",
              data: res.data.result
              //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: "value"
            },

            series: [
              {
                data: this.result ? this.result : res.data.result[0].values,
                type: "line",
                smooth: true
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          this.myChart.setOption(option);
        })
        .catch(function(error) {
          // this.$options.methods.open()
          console.log(error);
        });
    }
  },
  components: {}
};
</script>
<style>
/* 样式全部是全局的 */
* {
  margin: 0;
  border: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrap {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
}
h1 {
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding-top: 2%;
  margin-bottom: 2%;
}
.header {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.differ {
  width: 15%;
  display: flex;
  justify-content: space-around;
}
.differ > span {
  display: block;
  width: 10%;
  text-align: center;
  line-height: 2.5rem;
}
.differ > span:first-child {
  width: 30%;
}
.differ > div {
  width: 25%;
}
.analogType {
  width: 15%;
}
.code {
  width: 15%;
}
section {
  height: 80%;

  display: flex;
  justify-content: space-between;
}
#main {
  width: 90%;
  height: 100%;
}
.list {
  margin-left: 5%;
  margin-top: 2%;
  width: 20%;
}
</style>
