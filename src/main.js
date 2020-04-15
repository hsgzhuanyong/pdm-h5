import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugin from '@/plugin';
import directive from '@/directive';
import config from '@/config';
import 'h5-rem';
import '@/styles/index.scss';
import 'animate.css';

// 注册mock
if (config.isDev) {
  require('@/mock');
}

// 注册插件
plugin(Vue);
// 注册指令
directive(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
