import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue";
import {popper} from "@popperjs/core";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.config.productionTip = false
Vue.use(popper)
Vue.use(BootstrapVue);
new Vue({
  render: h => h(App),
  data:{color: '#2c3e50'},
}).$mount('#app')
