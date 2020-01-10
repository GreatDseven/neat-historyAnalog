import Vue from 'vue'
// 导入 整个 App 组件
import App from './App.vue'
import echarts from 'echarts'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/glocal.css'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.use(ElementUI)
// 将 App 组件内的虚拟 dom 结构，转化成真实的 dom  结构，并且把这个真实的 dom 结构挂载到 #app 这个元素身上
// 框架写的是 虚拟 dom
// 获取后台数据 通过原生或者 jq 操作真实 dom 去生成页面并且写上交互效果。直接操作 dom 节点可能会引起浏览器的重绘(重渲)
new Vue({
  render: h => h(App)
}).$mount('#app')
