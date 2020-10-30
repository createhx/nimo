import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 

//导入Mint UI
import MintUI from 'mint-ui';
//导入样式文件
import 'mint-ui/lib/style.min.css';
//注册为Vue的插件
import Calendar from 'vue-mobile-calendar'
// swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import "swiper/dist/css/swiper.css";
//导入模块
import axios from 'axios';
//配置服务器的基础地址,代表已经确定了WEB服务器的地址及端口号
axios.defaults.baseURL = 'http://127.0.0.1:3000';
//原生链扩展属性 
Vue.prototype.axios = axios;
import Vant from 'vant';
import "vant/lib/index.css"
import './styles/index.css'


Vue.use(VueAwesomeSwiper)
Vue.use(Calendar)
Vue.use(MintUI)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
