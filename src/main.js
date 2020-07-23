import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/utils/rem.config" //rem适配
import "@/assets/styles/base.css" //样式重置
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';


Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
